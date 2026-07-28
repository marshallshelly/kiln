use std::collections::BTreeMap;
use std::path::Path;

use anyhow::{Context, Result};
use cssparser::{Parser, ParserInput, Token};

pub struct Finding {
    pub code: &'static str,
    pub declaration: String,
    pub hint: &'static str,
    pub line: u32,
    pub column: u32,
}

#[derive(Default)]
pub struct Report {
    pub declarations: usize,
    pub findings: Vec<Finding>,
}

impl Report {
    pub fn supported(&self) -> usize {
        self.declarations.saturating_sub(self.findings.len())
    }

    pub fn percent(&self) -> u32 {
        if self.declarations == 0 {
            return 100;
        }
        ((self.supported() as f64 / self.declarations as f64) * 100.0).round() as u32
    }
}

fn property_rule(property: &str, value: &str) -> Option<(&'static str, &'static str)> {
    match property {
        "float" => Some(("KC1101", "use flexbox or grid")),
        "backdrop-filter" => Some(("KC1340", "filter: blur() on a sibling layer")),
        "mix-blend-mode" => Some(("KC1341", "not supported — composite the colours yourself")),
        "writing-mode" => Some(("KC1150", "not supported")),
        "contain" => Some(("KC1160", "not supported — no effect on layout")),
        "position" if value.trim() == "sticky" => {
            Some(("KC1201", "use a fixed header plus scroll padding"))
        }
        "text-overflow" if value.trim().starts_with("ellipsis") => {
            Some(("KC1210", "clips without an ellipsis — truncate the text yourself"))
        }
        "display" if value.trim().starts_with("table") => {
            Some(("KC1102", "use flexbox or grid"))
        }
        "grid-template-columns" if value.contains("subgrid") => {
            Some(("KC1103", "subgrid is not supported — restate the tracks"))
        }
        "transform" | "translate" if value.contains("3d") || value.contains("perspective") => {
            Some(("KC1320", "3D transforms are not supported — use the 2D subset"))
        }
        _ => None,
    }
}

fn selector_rule(selector: &str) -> Option<(&'static str, &'static str)> {
    if selector.contains(":has(") {
        return Some(("KC1002", "not supported — restructure or use a class"));
    }
    if selector.contains("::backdrop") {
        return Some(("KC1003", "not supported"));
    }
    None
}

fn at_rule_rule(name: &str) -> Option<(&'static str, &'static str)> {
    match name {
        "container" => Some(("KC1401", "not supported — use @media or a resize observer")),
        "scope" => Some(("KC1402", "not supported — scope with a class")),
        _ => None,
    }
}

pub fn check_css(source: &str, report: &mut Report) {
    let mut input = ParserInput::new(source);
    let mut parser = Parser::new(&mut input);
    walk(&mut parser, report);
}

#[derive(Default)]
struct Buffer {
    text: String,
    line: u32,
    column: u32,
}

impl Buffer {
    fn mark(&mut self, location: cssparser::SourceLocation) {
        if self.text.trim().is_empty() {
            self.line = location.line + 1;
            self.column = location.column;
        }
    }

    fn take(&mut self) -> String {
        std::mem::take(&mut self.text)
    }
}

/// Accumulate raw text until a `{` (which makes it a selector) or a `;` / `}`
/// (which makes it a declaration). Everything else is just text.
fn walk(parser: &mut Parser<'_, '_>, report: &mut Report) {
    let mut buffer = Buffer::default();

    loop {
        let location = parser.current_source_location();
        let token = match parser.next_including_whitespace_and_comments() {
            Ok(token) => token.clone(),
            Err(_) => break,
        };

        match token {
            Token::CurlyBracketBlock => {
                let prelude = buffer.take();
                let prelude = prelude.trim();
                if let Some((code, hint)) = selector_rule(prelude) {
                    report.findings.push(Finding {
                        code,
                        declaration: prelude.to_string(),
                        hint,
                        line: buffer.line,
                        column: buffer.column,
                    });
                }
                if let Some(name) = prelude.strip_prefix('@') {
                    let name = name.split_whitespace().next().unwrap_or("");
                    if let Some((code, hint)) = at_rule_rule(name) {
                        report.findings.push(Finding {
                            code,
                            declaration: format!("@{name}"),
                            hint,
                            line: buffer.line,
                            column: buffer.column,
                        });
                    }
                }

                let _ = parser.parse_nested_block(|nested| {
                    walk(nested, report);
                    Ok::<(), cssparser::ParseError<'_, ()>>(())
                });
            }
            Token::Semicolon => {
                let text = buffer.take();
                record(&text, buffer.line, buffer.column, report);
            }
            Token::Function(ref name) => {
                buffer.mark(location);
                buffer.text.push_str(name);
                buffer.text.push('(');
                let mut inner = String::new();
                let _ = parser.parse_nested_block(|nested| {
                    collect(nested, &mut inner);
                    Ok::<(), cssparser::ParseError<'_, ()>>(())
                });
                buffer.text.push_str(&inner);
                buffer.text.push(')');
            }
            Token::ParenthesisBlock => {
                buffer.mark(location);
                buffer.text.push('(');
                let mut inner = String::new();
                let _ = parser.parse_nested_block(|nested| {
                    collect(nested, &mut inner);
                    Ok::<(), cssparser::ParseError<'_, ()>>(())
                });
                buffer.text.push_str(&inner);
                buffer.text.push(')');
            }
            ref other => {
                buffer.mark(location);
                push_token(other, &mut buffer.text);
            }
        }
    }

    let text = buffer.take();
    record(&text, buffer.line, buffer.column, report);
}

fn collect(parser: &mut Parser<'_, '_>, out: &mut String) {
    while let Ok(token) = parser.next_including_whitespace_and_comments() {
        let token = token.clone();
        match token {
            Token::Function(ref name) => {
                out.push_str(name);
                out.push('(');
                let mut inner = String::new();
                let _ = parser.parse_nested_block(|nested| {
                    collect(nested, &mut inner);
                    Ok::<(), cssparser::ParseError<'_, ()>>(())
                });
                out.push_str(&inner);
                out.push(')');
            }
            ref other => push_token(other, out),
        }
    }
}

fn record(text: &str, line: u32, column: u32, report: &mut Report) {
    let text = text.trim();
    if text.is_empty() {
        return;
    }
    let Some((property, value)) = text.split_once(':') else {
        return;
    };

    let property = property.trim().to_ascii_lowercase();
    let value = value.trim();
    if property.is_empty() || value.is_empty() {
        return;
    }

    report.declarations += 1;
    if let Some((code, hint)) = property_rule(&property, value) {
        report.findings.push(Finding {
            code,
            declaration: format!("{property}: {value}"),
            hint,
            line,
            column,
        });
    }
}

fn push_token(token: &Token<'_>, out: &mut String) {
    match token {
        Token::Ident(name) => out.push_str(name),
        Token::AtKeyword(name) => {
            out.push('@');
            out.push_str(name);
        }
        Token::Hash(name) | Token::IDHash(name) => {
            out.push('#');
            out.push_str(name);
        }
        Token::Function(name) => {
            out.push_str(name);
            out.push('(');
        }
        Token::QuotedString(text) => out.push_str(text),
        Token::Dimension { value, unit, .. } => {
            out.push_str(&format!("{value}{unit}"));
        }
        Token::Number { value, .. } => out.push_str(&format!("{value}")),
        Token::Percentage { unit_value, .. } => {
            out.push_str(&format!("{}%", unit_value * 100.0));
        }
        Token::Delim(ch) => out.push(*ch),
        Token::WhiteSpace(_) => out.push(' '),
        Token::Comma => out.push(','),
        Token::Colon => out.push(':'),
        _ => {}
    }
}

fn extract_style_blocks(html: &str) -> String {
    let mut out = String::new();
    let mut rest = html;

    while let Some(start) = rest.find("<style") {
        let Some(open) = rest[start..].find('>') else {
            break;
        };
        let body = start + open + 1;
        let Some(end) = rest[body..].find("</style>") else {
            break;
        };

        // Preserve line numbers by keeping the newlines that came before.
        let skipped = rest[..body].matches('\n').count();
        out.push_str(&"\n".repeat(skipped.saturating_sub(out.matches('\n').count())));
        out.push_str(&rest[body..body + end]);
        rest = &rest[body + end..];
    }

    out
}

pub fn check_path(path: &Path) -> Result<Report> {
    let source = std::fs::read_to_string(path)
        .with_context(|| format!("read {}", path.display()))?;

    let css = match path.extension().and_then(|ext| ext.to_str()) {
        Some("css") => source,
        _ => extract_style_blocks(&source),
    };

    let mut report = Report::default();
    check_css(&css, &mut report);
    Ok(report)
}

pub fn render_report(path: &Path, report: &Report) -> String {
    use std::fmt::Write;

    let mut out = String::new();
    let _ = writeln!(out, "  {}", path.display());
    let _ = writeln!(out, "    declarations   {:>8}", report.declarations);
    let _ = writeln!(
        out,
        "    supported      {:>8}  ({}%)",
        report.supported(),
        report.percent()
    );

    if report.findings.is_empty() {
        let _ = writeln!(out);
        return out;
    }

    let _ = writeln!(out);

    let mut grouped: BTreeMap<(&str, String), (usize, &str, u32, u32)> = BTreeMap::new();
    for finding in &report.findings {
        let key = (finding.code, finding.declaration.clone());
        let entry = grouped.entry(key).or_insert((
            0,
            finding.hint,
            finding.line,
            finding.column,
        ));
        entry.0 += 1;
    }

    for ((code, declaration), (count, hint, line, column)) in grouped {
        let _ = writeln!(
            out,
            "    ×{count:<3} {declaration:<34} {code}  {hint}",
        );
        let _ = writeln!(out, "         {}:{}:{}", path.display(), line, column);
    }

    let _ = writeln!(out);
    out
}
