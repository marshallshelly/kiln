use std::path::Path;

use anyhow::{Context, Result, bail};

use crate::dom::{Dom, Mutation};
use crate::script::Script;

/// One recorded interaction. Deliberately the same vocabulary as the CLI
/// flags, so a trace reads like the command that produced it.
pub enum Step {
    Click(String),
    Type(String),
    Press(String),
    Scroll(String, f64, f64),
    At(f64),
}

impl Step {
    fn parse(line: &str) -> Option<Self> {
        let (verb, rest) = line.split_once(char::is_whitespace)?;
        let rest = rest.trim();
        match verb {
            "click" => Some(Self::Click(rest.to_string())),
            "type" => Some(Self::Type(rest.to_string())),
            "press" => Some(Self::Press(rest.to_string())),
            "at" => rest.parse().ok().map(Self::At),
            "scroll" => {
                let mut parts = rest.split(',');
                let selector = parts.next()?.trim().to_string();
                let dx = parts.next()?.trim().parse().ok()?;
                let dy = parts.next()?.trim().parse().ok()?;
                Some(Self::Scroll(selector, dx, dy))
            }
            _ => None,
        }
    }

    fn render(&self) -> String {
        match self {
            Self::Click(selector) => format!("click {selector}"),
            Self::Type(text) => format!("type {text}"),
            Self::Press(key) => format!("press {key}"),
            Self::At(seconds) => format!("at {seconds}"),
            Self::Scroll(selector, dx, dy) => format!("scroll {selector},{dx},{dy}"),
        }
    }
}

pub fn parse(source: &str) -> Vec<Step> {
    source
        .lines()
        .map(str::trim)
        .filter(|line| !line.is_empty() && !line.starts_with('#'))
        .filter_map(Step::parse)
        .collect()
}

pub fn render(steps: &[Step]) -> String {
    let mut out = String::from("# kiln trace\n");
    for step in steps {
        out.push_str(&step.render());
        out.push('\n');
    }
    out
}

fn apply(step: &Step, dom: &Dom, script: &Script) -> Result<()> {
    match step {
        Step::Click(selector) => {
            let node = dom
                .query_selector(selector)
                .with_context(|| format!("no element matches {selector}"))?;
            let (x, y) = dom
                .center_of(node)
                .with_context(|| format!("{selector} has no layout box"))?;
            for event in [
                crate::events::pointer_button(
                    x,
                    y,
                    winit::event::MouseButton::Left,
                    winit::event::ElementState::Pressed,
                ),
                crate::events::pointer_button(
                    x,
                    y,
                    winit::event::MouseButton::Left,
                    winit::event::ElementState::Released,
                ),
            ] {
                for dispatch in dom.drive(event) {
                    script.dispatch(&dispatch)?;
                }
            }
        }
        Step::Type(text) => {
            for ch in text.chars() {
                let ch = ch.to_string();
                for pressed in [true, false] {
                    for dispatch in dom.drive(crate::events::text_key(&ch, pressed)) {
                        script.dispatch(&dispatch)?;
                    }
                }
            }
        }
        Step::Press(key) => {
            for pressed in [true, false] {
                let event = crate::events::named(key, pressed)
                    .with_context(|| format!("unknown key {key}"))?;
                for dispatch in dom.drive(event) {
                    script.dispatch(&dispatch)?;
                }
            }
        }
        Step::Scroll(selector, dx, dy) => {
            let node = dom
                .query_selector(selector)
                .with_context(|| format!("no element matches {selector}"))?;
            let (x, y) = dom
                .center_of(node)
                .with_context(|| format!("{selector} has no layout box"))?;
            for dispatch in dom.drive(crate::events::pointer_move(x, y)) {
                script.dispatch(&dispatch)?;
            }
            for dispatch in dom.drive(crate::events::wheel_pixels(x, y, *dx, *dy)) {
                script.dispatch(&dispatch)?;
            }
            let anchor = dom.hover_node();
            for dispatch in dom.scroll(anchor, -dx, -dy) {
                script.dispatch(&dispatch)?;
            }
        }
        Step::At(seconds) => dom.set_time(*seconds),
    }

    dom.settle(script);
    Ok(())
}

/// A fingerprint of everything the document did, not just where it ended up.
/// Two runs that reach the same tree by different routes are not the same run,
/// and record/replay is only an oracle if it can tell them apart.
fn fingerprint(dom: &Dom) -> String {
    use std::fmt::Write;

    let journal = dom.journal().borrow();
    let mut out = String::new();

    for record in journal.since(0) {
        match &record.mutation {
            Mutation::ChildList {
                parent,
                added,
                removed,
                ..
            } => {
                let _ = writeln!(
                    out,
                    "{} childList {parent} +{} -{}",
                    record.seq,
                    added.len(),
                    removed.len()
                );
            }
            Mutation::Attribute { target, name, .. } => {
                let _ = writeln!(out, "{} attribute {target} {name}", record.seq);
            }
            Mutation::CharacterData { target, .. } => {
                let _ = writeln!(out, "{} characterData {target}", record.seq);
            }
        }
    }

    out
}

/// The journal says how the document got somewhere; it does not say where.
/// Clicking increment three times and clicking it twice then decrementing
/// touch the same nodes in the same order, so without the end state a replay
/// oracle would call them identical.
fn digest(text: &str) -> String {
    let mut hash: u64 = 0xcbf2_9ce4_8422_2325;
    for byte in text.bytes() {
        hash ^= u64::from(byte);
        hash = hash.wrapping_mul(0x1_0000_01b3);
    }
    format!("{hash:016x}")
}

pub struct Outcome {
    pub steps: usize,
    pub mutations: usize,
    pub fingerprint: String,
}

pub fn run(input: &str, steps: &[Step]) -> Result<Outcome> {
    let (dom, script, _native) = crate::load(input)?;

    // Register before anything runs, so the observer's cursor cannot retain
    // records this recorder has not seen.
    let _consumer = dom.journal().borrow_mut().register();
    dom.settle(&script);

    for step in steps {
        apply(step, &dom, &script)?;
    }

    let snapshot = dom.snapshot();
    let mut fingerprint = fingerprint(&dom);
    let mutations = fingerprint.lines().count();
    fingerprint.push_str(&format!("= tree {}\n", digest(&snapshot)));

    Ok(Outcome {
        steps: steps.len(),
        mutations,
        fingerprint,
    })
}

pub fn record(input: &str, steps: &[Step], out: &Path) -> Result<Outcome> {
    let outcome = run(input, steps)?;

    let mut trace = render(steps);
    trace.push_str("\n# fingerprint\n");
    for line in outcome.fingerprint.lines() {
        trace.push_str("# ");
        trace.push_str(line);
        trace.push('\n');
    }

    std::fs::write(out, trace).with_context(|| format!("write {}", out.display()))?;
    Ok(outcome)
}

pub fn replay(input: &str, trace: &Path) -> Result<Outcome> {
    let source =
        std::fs::read_to_string(trace).with_context(|| format!("read {}", trace.display()))?;

    let expected: String = source
        .lines()
        .filter_map(|line| line.strip_prefix("# "))
        .filter(|line| {
            line.starts_with('=') || line.chars().next().is_some_and(|c| c.is_ascii_digit())
        })
        .map(|line| format!("{line}\n"))
        .collect();

    let outcome = run(input, &parse(&source))?;

    if !expected.is_empty() && expected != outcome.fingerprint {
        let expected_lines = expected.lines().count();
        let actual_lines = outcome.fingerprint.lines().count();
        let first = expected
            .lines()
            .zip(outcome.fingerprint.lines())
            .find(|(a, b)| a != b)
            .map(|(a, b)| format!("\n  recorded: {a}\n  replayed: {b}"))
            .unwrap_or_default();
        bail!(
            "replay diverged: {expected_lines} recorded mutations, {actual_lines} on replay{first}"
        );
    }

    Ok(outcome)
}
