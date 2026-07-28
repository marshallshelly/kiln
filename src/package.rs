use std::path::{Path, PathBuf};

use anyhow::{Context, Result, bail};

pub struct Options {
    pub name: String,
    pub identifier: String,
    pub version: String,
    pub out: PathBuf,
    pub sign: Option<String>,
    pub dmg: bool,
    pub deb: bool,
    pub msi: bool,
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

    let html =
        std::fs::read_to_string(entry).with_context(|| format!("read {}", entry.display()))?;
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
    std::fs::create_dir_all(&options.out)
        .with_context(|| format!("create {}", options.out.display()))?;

    if cfg!(target_os = "linux") {
        return linux(entry, dom, options);
    }
    if cfg!(target_os = "windows") {
        return windows(entry, dom, options);
    }
    macos(entry, dom, options)
}

/// Copy the page and everything it references into `root`, with the entry
/// renamed so a packaged app always looks for the same file.
fn stage_assets(entry: &Path, dom: &crate::dom::Dom, root: &Path) -> Result<()> {
    std::fs::create_dir_all(root).with_context(|| format!("create {}", root.display()))?;
    for (from, relative) in assets(entry, dom)? {
        let to = root.join(&relative);
        if let Some(parent) = to.parent() {
            std::fs::create_dir_all(parent)
                .with_context(|| format!("create {}", parent.display()))?;
        }
        std::fs::copy(&from, &to).with_context(|| format!("copy {}", from.display()))?;
    }
    Ok(())
}

fn slug(name: &str) -> String {
    name.to_lowercase()
        .chars()
        .map(|ch| if ch.is_ascii_alphanumeric() { ch } else { '-' })
        .collect::<String>()
        .trim_matches('-')
        .to_string()
}

/// `usr/lib/<slug>/` holds the runtime and its assets together, with a symlink
/// from `usr/bin`. Keeping them together is what lets the binary find its page
/// beside itself rather than guessing at an install prefix.
fn linux(entry: &Path, dom: &crate::dom::Dom, options: &Options) -> Result<PathBuf> {
    let slug = slug(&options.name);
    let staging = options.out.join(format!("{slug}-tree"));
    let _ = std::fs::remove_dir_all(&staging);

    let libdir = staging.join("usr/lib").join(&slug);
    std::fs::create_dir_all(&libdir).with_context(|| format!("create {}", libdir.display()))?;

    let runtime = std::env::current_exe().context("locate the kiln binary")?;
    std::fs::copy(&runtime, libdir.join(&slug)).context("copy the runtime")?;
    stage_assets(entry, dom, &libdir.join("app"))?;

    let bindir = staging.join("usr/bin");
    std::fs::create_dir_all(&bindir).context("create usr/bin")?;
    #[cfg(unix)]
    std::os::unix::fs::symlink(format!("../lib/{slug}/{slug}"), bindir.join(&slug))
        .context("link usr/bin")?;

    let apps = staging.join("usr/share/applications");
    std::fs::create_dir_all(&apps).context("create applications dir")?;
    std::fs::write(
        apps.join(format!("{slug}.desktop")),
        format!(
            "[Desktop Entry]\nType=Application\nName={}\nExec=/usr/bin/{slug}\nCategories=Utility;\nTerminal=false\n",
            options.name
        ),
    )
    .context("write .desktop entry")?;

    if !options.deb {
        println!("  {}", staging.display());
        return Ok(staging);
    }

    let control = staging.join("DEBIAN");
    std::fs::create_dir_all(&control).context("create DEBIAN")?;
    std::fs::write(
        control.join("control"),
        format!(
            "Package: {slug}\nVersion: {}\nSection: utils\nPriority: optional\nArchitecture: {}\nMaintainer: {}\nDescription: {}\n",
            options.version,
            debian_arch(),
            options.identifier,
            options.name
        ),
    )
    .context("write DEBIAN/control")?;

    let deb = options
        .out
        .join(format!("{slug}_{}_{}.deb", options.version, debian_arch()));
    let _ = std::fs::remove_file(&deb);
    let status = std::process::Command::new("dpkg-deb")
        .args(["--build", "--root-owner-group"])
        .arg(&staging)
        .arg(&deb)
        .status()
        .context("run dpkg-deb — install dpkg-dev")?;
    if !status.success() {
        bail!("dpkg-deb failed for {}", deb.display());
    }

    println!("  {}", deb.display());
    Ok(deb)
}

fn debian_arch() -> &'static str {
    match std::env::consts::ARCH {
        "x86_64" => "amd64",
        "aarch64" => "arm64",
        other => other,
    }
}

/// A directory holding the runtime and its assets. `--msi` wraps it with WiX,
/// which has to be on PATH.
fn windows(entry: &Path, dom: &crate::dom::Dom, options: &Options) -> Result<PathBuf> {
    let dir = options.out.join(&options.name);
    let _ = std::fs::remove_dir_all(&dir);
    std::fs::create_dir_all(&dir).with_context(|| format!("create {}", dir.display()))?;

    let runtime = std::env::current_exe().context("locate the kiln binary")?;
    std::fs::copy(&runtime, dir.join(format!("{}.exe", options.name)))
        .context("copy the runtime")?;
    stage_assets(entry, dom, &dir.join("app"))?;

    if !options.msi {
        println!("  {}", dir.display());
        return Ok(dir);
    }

    let wxs = options.out.join(format!("{}.wxs", slug(&options.name)));
    std::fs::write(&wxs, wix_source(options, &dir)?).context("write WiX source")?;

    let msi = options
        .out
        .join(format!("{}-{}.msi", slug(&options.name), options.version));
    let status = std::process::Command::new("wix")
        .arg("build")
        .arg(&wxs)
        .arg("-o")
        .arg(&msi)
        .status()
        .context("run wix — install the WiX Toolset (dotnet tool install --global wix)")?;
    if !status.success() {
        bail!("wix build failed for {}", msi.display());
    }

    println!("  {}", msi.display());
    Ok(msi)
}

fn wix_source(options: &Options, payload: &Path) -> Result<String> {
    let mut files = String::new();
    let mut id = 0usize;
    collect_wix_files(payload, payload, &mut id, &mut files)?;

    Ok(format!(
        r#"<Wix xmlns="http://wixtoolset.org/schemas/v4/wxs">
  <Package Name="{name}" Manufacturer="{identifier}" Version="{version}"
           UpgradeCode="{upgrade}" Scope="perUser">
    <MajorUpgrade DowngradeErrorMessage="A newer version is already installed." />
    <StandardDirectory Id="LocalAppDataFolder">
      <Directory Id="INSTALLFOLDER" Name="{name}" />
    </StandardDirectory>
    <ComponentGroup Id="AppFiles" Directory="INSTALLFOLDER">
{files}    </ComponentGroup>
    <Feature Id="Main">
      <ComponentGroupRef Id="AppFiles" />
    </Feature>
  </Package>
</Wix>
"#,
        name = options.name,
        identifier = options.identifier,
        version = options.version,
        upgrade = upgrade_code(&options.identifier),
    ))
}

fn collect_wix_files(root: &Path, dir: &Path, id: &mut usize, out: &mut String) -> Result<()> {
    let mut entries: Vec<_> = std::fs::read_dir(dir)
        .with_context(|| format!("read {}", dir.display()))?
        .filter_map(Result::ok)
        .map(|entry| entry.path())
        .collect();
    entries.sort();

    for path in entries {
        if path.is_dir() {
            collect_wix_files(root, &path, id, out)?;
            continue;
        }
        *id += 1;
        let relative = path.strip_prefix(root).unwrap_or(&path);
        let subdir = relative.parent().map(|p| p.to_string_lossy().into_owned());
        let subdir = subdir.filter(|s| !s.is_empty());
        let sub = subdir
            .map(|s| format!(r#" Subdirectory="{}""#, s.replace('\\', "/")))
            .unwrap_or_default();
        out.push_str(&format!(
            "      <Component Id=\"C{id}\"{sub}>\n        <File Id=\"F{id}\" Source=\"{}\" />\n      </Component>\n",
            path.display()
        ));
    }
    Ok(())
}

/// WiX wants a stable GUID per product. Derive one from the identifier so
/// upgrades line up without storing state.
fn upgrade_code(identifier: &str) -> String {
    let mut hash: u128 = 0xcbf2_9ce4_8422_2325;
    for byte in identifier.bytes() {
        hash ^= u128::from(byte);
        hash = hash.wrapping_mul(0x1000_0000_01b3);
    }
    let hex = format!("{hash:032x}");
    format!(
        "{}-{}-{}-{}-{}",
        &hex[0..8],
        &hex[8..12],
        &hex[12..16],
        &hex[16..20],
        &hex[20..32]
    )
}

fn macos(entry: &Path, dom: &crate::dom::Dom, options: &Options) -> Result<PathBuf> {
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

    std::fs::write(contents.join("Info.plist"), info_plist(options)).context("write Info.plist")?;
    std::fs::write(contents.join("PkgInfo"), "APPL????").context("write PkgInfo")?;

    stage_assets(entry, dom, &resources)?;

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
        .args([
            "--force",
            "--deep",
            "--options",
            "runtime",
            "--sign",
            identity,
        ])
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
        .args([
            "notarytool",
            "submit",
            "--wait",
            "--keychain-profile",
            profile,
        ])
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
