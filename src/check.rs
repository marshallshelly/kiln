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
    /// The rule this came from. For generated CSS the selector is the thing the
    /// author actually wrote — a Tailwind utility — so it is what we report.
    pub origin: Option<String>,
    /// The file this came from, when it is not the file being checked.
    pub source: Option<String>,
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
        "position" if value.trim() == "fixed" => Some((
            "KC1202",
            "inside a positioned ancestor it resolves against that, not the viewport",
        )),
        "text-overflow" if value.trim().starts_with("ellipsis") => Some((
            "KC1210",
            "clips without an ellipsis — truncate the text yourself",
        )),
        "display" if value.trim().starts_with("table") => Some(("KC1102", "use flexbox or grid")),
        "grid-template-columns" if value.contains("subgrid") => {
            Some(("KC1103", "subgrid is not supported — restate the tracks"))
        }
        "transform" | "translate" if value.contains("3d") || value.contains("perspective") => {
            Some((
                "KC1320",
                "3D transforms are not supported — use the 2D subset",
            ))
        }
        _ => None,
    }
}

fn selector_rule(selector: &str) -> Option<(&'static str, &'static str)> {
    if selector.contains(":has(") {
        return Some(("KC1002", "not supported — restructure or use a class"));
    }
    // Only when it is the whole selector. Preflight resets
    // `*, ::before, ::after, ::backdrop` together, and the rest of that rule
    // applies perfectly well — flagging it would over-claim.
    if selector.trim() == "::backdrop" {
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
    /// The first class in the prelude, taken from the token rather than the
    /// rendered text: cssparser decodes `\:` into the ident, so
    /// `.hover\:bg-amber-400:hover` is textually indistinguishable from a
    /// pseudo-class by the time it reaches the string.
    class: Option<String>,
    expect_class: bool,
}

impl Buffer {
    fn mark(&mut self, location: cssparser::SourceLocation) {
        if self.text.trim().is_empty() {
            self.line = location.line + 1;
            self.column = location.column;
        }
    }

    fn take(&mut self) -> String {
        self.expect_class = false;
        std::mem::take(&mut self.text)
    }
}

/// Accumulate raw text until a `{` (which makes it a selector) or a `;` / `}`
/// (which makes it a declaration). Everything else is just text.
fn walk(parser: &mut Parser<'_, '_>, report: &mut Report) {
    walk_in(parser, None, report);
}

fn walk_in(parser: &mut Parser<'_, '_>, selector: Option<&str>, report: &mut Report) {
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
                        origin: None,
                        source: None,
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
                            origin: None,
                            source: None,
                        });
                    }
                }

                let inside = buffer.class.take();
                let _ = parser.parse_nested_block(|nested| {
                    walk_in(nested, inside.as_deref(), report);
                    Ok::<(), cssparser::ParseError<'_, ()>>(())
                });
            }
            Token::Semicolon => {
                let text = buffer.take();
                record(&text, buffer.line, buffer.column, selector, report);
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
            Token::Delim('.') if buffer.text.trim().is_empty() => {
                buffer.mark(location);
                buffer.expect_class = true;
                buffer.text.push('.');
            }
            Token::Ident(ref name) if buffer.expect_class => {
                buffer.expect_class = false;
                buffer.class = Some(name.to_string());
                buffer.text.push_str(name);
            }
            ref other => {
                buffer.mark(location);
                push_token(other, &mut buffer.text);
            }
        }
    }

    let text = buffer.take();
    record(&text, buffer.line, buffer.column, selector, report);
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

fn record(text: &str, line: u32, column: u32, selector: Option<&str>, report: &mut Report) {
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
            origin: selector.map(str::to_string),
            source: None,
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

/// Every class the markup actually uses. Generated CSS ships utilities a page
/// never references, and reporting those would be noise.
fn classes_used(html: &str) -> std::collections::HashSet<String> {
    let mut used = std::collections::HashSet::new();
    let mut rest = html;

    while let Some(at) = rest.find("class") {
        let after = &rest[at + 5..];
        rest = after;
        let Some(quote) = after.find(['"', '\'']) else {
            continue;
        };
        if after[..quote].trim_start().trim_start_matches('=').trim() != "" {
            continue;
        }
        let ch = after.as_bytes()[quote] as char;
        let value = &after[quote + 1..];
        let Some(end) = value.find(ch) else {
            continue;
        };
        for name in value[..end].split_whitespace() {
            used.insert(name.to_string());
        }
        rest = &value[end..];
    }

    used
}

/// Local stylesheets a page links to. Generated CSS usually lives in one.
pub fn linked_stylesheets(html: &str, base: &Path) -> Vec<std::path::PathBuf> {
    let mut out = Vec::new();
    let mut rest = html;

    while let Some(start) = rest.find("<link") {
        let Some(end) = rest[start..].find('>') else {
            break;
        };
        let tag = &rest[start..start + end];
        rest = &rest[start + end..];

        if !tag.contains("stylesheet") {
            continue;
        }
        let Some(href) = tag.find("href").and_then(|at| {
            let after = &tag[at + 4..];
            let quote = after.find(['"', '\''])?;
            let ch = after.as_bytes()[quote] as char;
            let value = &after[quote + 1..];
            value.find(ch).map(|end| &value[..end])
        }) else {
            continue;
        };
        if href.starts_with("http://") || href.starts_with("https://") {
            continue;
        }
        out.push(base.join(href));
    }

    out
}

pub fn check_path(path: &Path) -> Result<Report> {
    let source =
        std::fs::read_to_string(path).with_context(|| format!("read {}", path.display()))?;
    let mut report = Report::default();

    if path.extension().and_then(|ext| ext.to_str()) == Some("css") {
        check_css(&source, &mut report);
        return Ok(report);
    }

    check_css(&extract_style_blocks(&source), &mut report);

    let base = path.parent().unwrap_or_else(|| Path::new("."));
    let used = classes_used(&source);

    for sheet in linked_stylesheets(&source, base) {
        let Ok(css) = std::fs::read_to_string(&sheet) else {
            continue;
        };

        let mut linked = Report::default();
        check_css(&css, &mut linked);

        report.declarations += linked.declarations;
        for mut finding in linked.findings {
            // A utility the markup never references is not the author's problem.
            if let Some(utility) = &finding.origin
                && !used.contains(utility)
            {
                continue;
            }
            finding.source = Some(sheet.display().to_string());
            report.findings.push(finding);
        }
    }

    check_containing_blocks(path, &mut report);

    Ok(report)
}

/// `position: absolute` is only mispositioned when the containing block is not
/// the direct parent, which no amount of CSS reading can determine — so this
/// one rule resolves the document and asks the tree.
fn check_containing_blocks(path: &Path, report: &mut Report) {
    let Ok(html) = std::fs::read_to_string(path) else {
        return;
    };
    let dom = crate::dom::Dom::from_html(
        &html,
        Some(path),
        crate::DEFAULT_WIDTH,
        crate::DEFAULT_HEIGHT,
        1.0,
    );

    for element in dom.absolutes_resolved_against_the_wrong_box() {
        report.findings.push(Finding {
            code: "KC1203",
            declaration: "position: absolute".to_string(),
            hint: "resolves against the parent, not the nearest positioned ancestor",
            line: 0,
            column: 0,
            origin: Some(element),
            source: None,
        });
    }
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

    type Group = (
        usize,
        &'static str,
        u32,
        u32,
        Option<String>,
        Option<String>,
    );
    let mut grouped: BTreeMap<(&str, String), Group> = BTreeMap::new();
    for finding in &report.findings {
        let key = (finding.code, finding.declaration.clone());
        let entry = grouped.entry(key).or_insert((
            0,
            finding.hint,
            finding.line,
            finding.column,
            finding.origin.clone(),
            finding.source.clone(),
        ));
        entry.0 += 1;
    }

    for ((code, declaration), (count, hint, line, column, origin, source)) in grouped {
        // Generated CSS is not what anyone edits, so lead with the utility.
        let subject = match &origin {
            Some(utility) => utility.clone(),
            None => declaration.clone(),
        };
        let _ = writeln!(out, "    ×{count:<3} {subject:<34} {code}  {hint}");
        if origin.is_some() {
            let _ = writeln!(out, "         {declaration}");
        }
        // A structural finding comes from the tree rather than a stylesheet, so
        // it has no line to point at.
        if line > 0 {
            let where_ = source.unwrap_or_else(|| path.display().to_string());
            let _ = writeln!(out, "         {where_}:{line}:{column}");
        }
    }

    let _ = writeln!(out);
    out
}
