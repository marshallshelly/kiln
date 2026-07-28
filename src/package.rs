use std::path::{Path, PathBuf};

use anyhow::{Context, Result, bail};

pub struct Options {
    pub name: String,
    pub identifier: String,
    pub version: String,
    pub out: PathBuf,
    pub sign: Option<String>,
    pub dmg: bool,
    /// A `notarytool` keychain profile, created once with
    /// `xcrun notarytool store-credentials`.
    pub notarize: Option<String>,
}

/// Everything the app needs at runtime: the entry page renamed to
/// `index.html`, plus every local file it references.
fn assets(entry: &Path, dom: &crate::dom::Dom) -> Result<Vec<(PathBuf, String)>> {
    let base = entry.parent().unwrap_or_else(|| Path::new("."));
    let mut out = vec![(entry.to_path_buf(), "index.html".to_string())];

    for source in dom.scripts() {
        if let crate::dom::Script::Src(src) = source {
            out.push((base.join(&src), src));
        }
    }

    let html = std::fs::read_to_string(entry).with_context(|| format!("read {}", entry.display()))?;
    for sheet in crate::check::linked_stylesheets(&html, Path::new("")) {
        let relative = sheet.to_string_lossy().into_owned();
        out.push((base.join(&relative), relative));
    }

    Ok(out)
}

fn info_plist(options: &Options) -> String {
    let Options {
        name,
        identifier,
        version,
        ..
    } = options;
    format!(
        r#"<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>CFBundleName</key>            <string>{name}</string>
  <key>CFBundleDisplayName</key>     <string>{name}</string>
  <key>CFBundleIdentifier</key>      <string>{identifier}</string>
  <key>CFBundleVersion</key>         <string>{version}</string>
  <key>CFBundleShortVersionString</key> <string>{version}</string>
  <key>CFBundleExecutable</key>      <string>{name}</string>
  <key>CFBundlePackageType</key>     <string>APPL</string>
  <key>CFBundleInfoDictionaryVersion</key> <string>6.0</string>
  <key>LSMinimumSystemVersion</key>  <string>11.0</string>
  <key>NSHighResolutionCapable</key> <true/>
  <key>NSSupportsAutomaticGraphicsSwitching</key> <true/>
</dict>
</plist>
"#
    )
}

pub fn bundle(entry: &Path, dom: &crate::dom::Dom, options: &Options) -> Result<PathBuf> {
    if !cfg!(target_os = "macos") {
        bail!("packaging is only implemented for macOS app bundles so far");
    }

    let app = options.out.join(format!("{}.app", options.name));
    let contents = app.join("Contents");
    let macos = contents.join("MacOS");
    let resources = contents.join("Resources").join("app");

    if app.exists() {
        std::fs::remove_dir_all(&app).with_context(|| format!("clear {}", app.display()))?;
    }
    std::fs::create_dir_all(&macos).with_context(|| format!("create {}", macos.display()))?;
    std::fs::create_dir_all(&resources)
        .with_context(|| format!("create {}", resources.display()))?;

    let runtime = std::env::current_exe().context("locate the kiln binary")?;
    let executable = macos.join(&options.name);
    std::fs::copy(&runtime, &executable).with_context(|| format!("copy {}", runtime.display()))?;

    std::fs::write(contents.join("Info.plist"), info_plist(options))
        .context("write Info.plist")?;
    std::fs::write(contents.join("PkgInfo"), "APPL????").context("write PkgInfo")?;

    for (from, relative) in assets(entry, dom)? {
        let to = resources.join(&relative);
        if let Some(parent) = to.parent() {
            std::fs::create_dir_all(parent)
                .with_context(|| format!("create {}", parent.display()))?;
        }
        std::fs::copy(&from, &to).with_context(|| format!("copy {}", from.display()))?;
    }

    if let Some(identity) = &options.sign {
        sign(&app, identity)?;
    }
    let image = options.dmg.then(|| disk_image(&app, options)).transpose()?;

    if let Some(profile) = &options.notarize {
        let target = image.as_deref().unwrap_or(app.as_path());
        notarize(target, profile)?;
    }

    Ok(app)
}

fn sign(app: &Path, identity: &str) -> Result<()> {
    let status = std::process::Command::new("codesign")
        .args(["--force", "--deep", "--options", "runtime", "--sign", identity])
        .arg(app)
        .status()
        .context("run codesign — is it on PATH?")?;

    if !status.success() {
        bail!("codesign failed for {}", app.display());
    }
    println!("  signed with {identity}");
    Ok(())
}

/// Submit to Apple and staple the ticket, so the app opens on a machine that
/// has never seen it. Requires a stored `notarytool` profile.
fn notarize(target: &Path, profile: &str) -> Result<()> {
    let status = std::process::Command::new("xcrun")
        .args(["notarytool", "submit", "--wait", "--keychain-profile", profile])
        .arg(target)
        .status()
        .context("run xcrun notarytool — are the Xcode command line tools installed?")?;
    if !status.success() {
        bail!("notarization failed for {}", target.display());
    }

    let status = std::process::Command::new("xcrun")
        .arg("stapler")
        .arg("staple")
        .arg(target)
        .status()
        .context("run xcrun stapler")?;
    if !status.success() {
        bail!("stapling failed for {}", target.display());
    }

    println!("  notarized and stapled");
    Ok(())
}

fn disk_image(app: &Path, options: &Options) -> Result<PathBuf> {
    let dmg = options.out.join(format!("{}.dmg", options.name));
    let _ = std::fs::remove_file(&dmg);

    let status = std::process::Command::new("hdiutil")
        .args(["create", "-volname", &options.name, "-srcfolder"])
        .arg(app)
        .args(["-ov", "-format", "UDZO"])
        .arg(&dmg)
        .stdout(std::process::Stdio::null())
        .status()
        .context("run hdiutil")?;

    if !status.success() {
        bail!("hdiutil failed for {}", dmg.display());
    }
    println!("  {}", dmg.display());
    Ok(dmg)
}
