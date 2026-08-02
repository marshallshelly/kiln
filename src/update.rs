use std::path::{Path, PathBuf};

use anyhow::{Context, Result, bail};

/// What a release feed says is available.
///
/// Tier 1 only: this replaces the `app/` directory, never the runtime binary.
/// `minimum_runtime` is how a bundle says it needs an engine newer than the one
/// running it, rather than rendering wrong and leaving the user to guess.
pub struct Manifest {
    pub version: semver::Version,
    pub assets: String,
    pub signature: String,
    pub minimum_runtime: Option<semver::VersionReq>,
}

impl Manifest {
    pub fn parse(source: &str) -> Result<Self> {
        let value: serde_json::Value =
            serde_json::from_str(source).context("parse update manifest")?;

        let field = |name: &str| -> Result<String> {
            value[name]
                .as_str()
                .map(str::to_string)
                .with_context(|| format!("manifest has no {name}"))
        };

        let version = semver::Version::parse(&field("version")?).context("manifest version")?;
        let minimum_runtime = match value["minimum_runtime"].as_str() {
            Some(text) => {
                Some(semver::VersionReq::parse(text).context("manifest minimum_runtime")?)
            }
            None => None,
        };

        Ok(Self {
            version,
            assets: field("assets")?,
            signature: field("signature")?,
            minimum_runtime,
        })
    }

    /// Whether this release should be installed over `current`.
    ///
    /// Refusing to move sideways or backwards is a security rule, not tidiness:
    /// a feed that can serve an old version can undo a fix.
    pub fn supersedes(&self, current: &semver::Version) -> bool {
        self.version > *current
    }

    pub fn runtime_is_new_enough(&self, runtime: &semver::Version) -> bool {
        match &self.minimum_runtime {
            Some(required) => required.matches(runtime),
            None => true,
        }
    }
}

/// Rejects a bundle whose bytes are not the ones the release key signed.
///
/// TLS says which host answered, not whose bytes arrived, so the signature is
/// the only thing standing between a compromised update host and arbitrary code
/// in someone's app. The public key is baked in at package time; a key fetched
/// alongside the bundle would verify nothing.
pub fn verify(bundle: &[u8], signature: &str, public_key: &str) -> Result<()> {
    let key = minisign_verify::PublicKey::from_base64(public_key.trim())
        .context("update public key is not a valid minisign key")?;
    let signature =
        minisign_verify::Signature::decode(signature).context("update signature is malformed")?;

    key.verify(bundle, &signature, false)
        .map_err(|_| anyhow::anyhow!("update signature does not match the bundle"))
}

/// Where a `.tar.gz` entry is allowed to land.
///
/// A tar can name `../../etc/passwd`. This is the same rule the module resolver
/// applies to imports: resolve, then insist the result is still inside.
fn contained(root: &Path, entry: &Path) -> Result<PathBuf> {
    let mut out = root.to_path_buf();
    for part in entry.components() {
        match part {
            std::path::Component::Normal(name) => out.push(name),
            std::path::Component::CurDir => {}
            _ => bail!("update bundle contains an unsafe path: {}", entry.display()),
        }
    }
    Ok(out)
}

fn unpack(bundle: &[u8], into: &Path) -> Result<()> {
    let decoder = flate2::read::GzDecoder::new(bundle);
    let mut archive = tar::Archive::new(decoder);

    for entry in archive.entries().context("read update bundle")? {
        let mut entry = entry.context("read update bundle entry")?;
        let path = entry
            .path()
            .context("update bundle entry path")?
            .to_path_buf();
        let target = contained(into, &path)?;

        if entry.header().entry_type().is_dir() {
            std::fs::create_dir_all(&target)
                .with_context(|| format!("create {}", target.display()))?;
            continue;
        }
        if let Some(parent) = target.parent() {
            std::fs::create_dir_all(parent)
                .with_context(|| format!("create {}", parent.display()))?;
        }
        entry
            .unpack(&target)
            .with_context(|| format!("write {}", target.display()))?;
    }
    Ok(())
}

/// Replace `app_dir` with the contents of a verified bundle.
///
/// Takes bytes rather than a URL so the whole of this is testable without a
/// network: the download is one seam, on the other side of it.
///
/// The swap is two renames, so a crash leaves either the old tree or the new
/// one and never a half-written mixture. The previous tree is kept as
/// `<app>.old` for the caller to remove once it is no longer running from it.
pub fn apply(app_dir: &Path, bundle: &[u8]) -> Result<()> {
    let parent = app_dir
        .parent()
        .context("app directory has no parent to stage in")?;
    let name = app_dir
        .file_name()
        .context("app directory has no name")?
        .to_string_lossy()
        .into_owned();

    let incoming = parent.join(format!("{name}.incoming"));
    let previous = parent.join(format!("{name}.old"));
    let _ = std::fs::remove_dir_all(&incoming);
    let _ = std::fs::remove_dir_all(&previous);

    std::fs::create_dir_all(&incoming).with_context(|| format!("create {}", incoming.display()))?;

    let staged = unpack(bundle, &incoming).and_then(|()| {
        // A bundle that unpacks but has no entry point would leave the app
        // unable to start, which is worse than refusing the update.
        if incoming.join("index.html").is_file() {
            Ok(())
        } else {
            bail!("update bundle has no index.html")
        }
    });

    if let Err(error) = staged {
        let _ = std::fs::remove_dir_all(&incoming);
        return Err(error);
    }

    if app_dir.exists() {
        std::fs::rename(app_dir, &previous)
            .with_context(|| format!("move aside {}", app_dir.display()))?;
    }
    if let Err(error) = std::fs::rename(&incoming, app_dir) {
        // Put the old tree back rather than leaving the app with nothing.
        let _ = std::fs::rename(&previous, app_dir);
        let _ = std::fs::remove_dir_all(&incoming);
        return Err(error).with_context(|| format!("install {}", app_dir.display()));
    }

    Ok(())
}

/// Remove a tree left behind by a previous `apply`. Safe to call at startup.
pub fn discard_previous(app_dir: &Path) {
    let Some(parent) = app_dir.parent() else {
        return;
    };
    let Some(name) = app_dir.file_name() else {
        return;
    };
    let _ = std::fs::remove_dir_all(parent.join(format!("{}.old", name.to_string_lossy())));
}

/// Written beside the executable at package time, next to `app/` rather than
/// inside it. A key that lived in `app/` could be replaced by an update, which
/// would let one compromised release authorise every release after it.
pub struct Config {
    pub url: String,
    pub key: String,
    pub version: semver::Version,
}

impl Config {
    pub fn path_for(app_dir: &Path) -> PathBuf {
        app_dir.with_file_name("update.json")
    }

    pub fn load(app_dir: &Path) -> Option<Self> {
        let source = std::fs::read_to_string(Self::path_for(app_dir)).ok()?;
        let value: serde_json::Value = serde_json::from_str(&source).ok()?;
        Some(Self {
            url: value["url"].as_str()?.to_string(),
            key: value["key"].as_str()?.to_string(),
            version: semver::Version::parse(value["version"].as_str()?).ok()?,
        })
    }

    pub fn save(&self, app_dir: &Path) -> Result<()> {
        let body = serde_json::json!({
            "url": self.url,
            "key": self.key,
            "version": self.version.to_string(),
        });
        std::fs::write(Self::path_for(app_dir), serde_json::to_vec_pretty(&body)?)
            .context("write update.json")
    }
}

fn fetch(url: &str) -> Result<Vec<u8>> {
    // The one place Kiln reaches the network, and only when an app was packaged
    // with an update URL. Everything else still refuses out loud.
    let mut response = ureq::get(url)
        .call()
        .with_context(|| format!("fetch {url}"))?;
    let mut body = Vec::new();
    std::io::Read::read_to_end(&mut response.body_mut().as_reader(), &mut body)
        .with_context(|| format!("read {url}"))?;
    Ok(body)
}

/// The release a feed is offering, if it is newer than what is installed.
pub fn check(config: &Config, runtime: &semver::Version) -> Result<Option<Manifest>> {
    let manifest = Manifest::parse(&String::from_utf8_lossy(&fetch(&config.url)?))?;

    if !manifest.supersedes(&config.version) {
        return Ok(None);
    }
    if !manifest.runtime_is_new_enough(runtime) {
        bail!(
            "update {} needs a newer Kiln runtime than {runtime}",
            manifest.version
        );
    }
    Ok(Some(manifest))
}

/// Download, verify and install. The version is recorded only after the swap
/// succeeds, so a failed install is not remembered as a success.
pub fn install(config: &Config, manifest: &Manifest, app_dir: &Path) -> Result<()> {
    let bundle = fetch(&manifest.assets)?;
    verify(&bundle, &manifest.signature, &config.key)?;
    apply(app_dir, &bundle)?;

    Config {
        url: config.url.clone(),
        key: config.key.clone(),
        version: manifest.version.clone(),
    }
    .save(app_dir)
}

/// The app directory of a packaged app, which is where `update.json` sits
/// beside. `None` when running from source, so the JS surface reports that
/// updates are not configured rather than pretending.
pub fn installed_app_dir() -> Option<PathBuf> {
    let exe = std::env::current_exe().ok()?;
    let beside = exe.parent()?;
    [
        beside.join("app"),
        beside.parent()?.join("Resources").join("app"),
    ]
    .into_iter()
    .find(|candidate| candidate.join("index.html").is_file())
}

fn runtime_version() -> semver::Version {
    semver::Version::parse(env!("CARGO_PKG_VERSION")).unwrap_or(semver::Version::new(0, 0, 0))
}

pub fn check_binding() -> Option<String> {
    let app_dir = installed_app_dir()?;
    let config = Config::load(&app_dir)?;
    match check(&config, &runtime_version()) {
        Ok(Some(manifest)) => Some(manifest.version.to_string()),
        Ok(None) => None,
        Err(error) => {
            eprintln!("update check: {error:?}");
            None
        }
    }
}

pub fn apply_binding() -> bool {
    let Some(app_dir) = installed_app_dir() else {
        return false;
    };
    let Some(config) = Config::load(&app_dir) else {
        return false;
    };

    let outcome = check(&config, &runtime_version()).and_then(|manifest| match manifest {
        Some(manifest) => install(&config, &manifest, &app_dir).map(|()| true),
        None => Ok(false),
    });

    match outcome {
        Ok(applied) => applied,
        Err(error) => {
            eprintln!("update: {error:?}");
            false
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn bundle(files: &[(&str, &str)]) -> Vec<u8> {
        let mut tar = tar::Builder::new(Vec::new());
        for (name, body) in files {
            let mut header = tar::Header::new_gnu();
            header.set_size(body.len() as u64);
            header.set_mode(0o644);
            header.set_cksum();
            tar.append_data(&mut header, name, body.as_bytes()).unwrap();
        }
        let archive = tar.into_inner().unwrap();

        let mut encoder = flate2::write::GzEncoder::new(Vec::new(), flate2::Compression::default());
        std::io::Write::write_all(&mut encoder, &archive).unwrap();
        encoder.finish().unwrap()
    }

    fn app_dir(name: &str) -> PathBuf {
        let dir = std::env::temp_dir().join(name);
        let _ = std::fs::remove_dir_all(&dir);
        std::fs::create_dir_all(dir.join("app")).unwrap();
        std::fs::write(dir.join("app/index.html"), "<h1>old</h1>").unwrap();
        dir
    }

    #[test]
    fn applying_a_bundle_replaces_the_tree() {
        let dir = app_dir("kiln-update-apply");
        let app = dir.join("app");

        apply(
            &app,
            &bundle(&[
                ("index.html", "<h1>new</h1>"),
                ("lib/x.js", "export const a = 1;"),
            ]),
        )
        .unwrap();

        assert_eq!(
            std::fs::read_to_string(app.join("index.html")).unwrap(),
            "<h1>new</h1>"
        );
        assert!(app.join("lib/x.js").is_file(), "nested entries land too");
        assert!(
            dir.join("app.old").join("index.html").is_file(),
            "the previous tree is kept until the caller discards it"
        );

        discard_previous(&app);
        assert!(!dir.join("app.old").exists());
        let _ = std::fs::remove_dir_all(&dir);
    }

    #[test]
    fn a_bundle_without_an_entry_point_leaves_the_app_alone() {
        // Worse than refusing an update is installing one that cannot start.
        let dir = app_dir("kiln-update-noentry");
        let app = dir.join("app");

        let error = apply(&app, &bundle(&[("readme.txt", "nothing here")])).unwrap_err();
        assert!(error.to_string().contains("index.html"), "{error}");

        assert_eq!(
            std::fs::read_to_string(app.join("index.html")).unwrap(),
            "<h1>old</h1>",
            "the working tree survives a refused update"
        );
        assert!(!dir.join("app.incoming").exists(), "staging is cleaned up");
        let _ = std::fs::remove_dir_all(&dir);
    }

    /// tar-rs refuses to *write* a `..` path, so a hostile archive has to be
    /// assembled by hand — which is the only way to prove the defence works
    /// against one.
    fn hostile_bundle(name: &str, body: &str) -> Vec<u8> {
        let mut header = [b'\0'; 512];
        header[..name.len()].copy_from_slice(name.as_bytes());
        header[100..108].copy_from_slice(b"0000644\0");
        header[108..116].copy_from_slice(b"0000000\0");
        header[116..124].copy_from_slice(b"0000000\0");
        header[124..136].copy_from_slice(format!("{:011o}\0", body.len()).as_bytes());
        header[136..148].copy_from_slice(b"00000000000\0");
        header[148..156].copy_from_slice(b"        ");
        header[156] = b'0';
        header[257..263].copy_from_slice(b"ustar\0");
        header[263..265].copy_from_slice(b"00");

        let sum: u32 = header.iter().map(|b| u32::from(*b)).sum();
        header[148..156].copy_from_slice(format!("{sum:06o}\0 ").as_bytes());

        let mut archive = header.to_vec();
        let mut data = body.as_bytes().to_vec();
        data.resize(data.len().div_ceil(512) * 512, 0);
        archive.extend(data);
        archive.extend([0u8; 1024]);

        let mut encoder = flate2::write::GzEncoder::new(Vec::new(), flate2::Compression::default());
        std::io::Write::write_all(&mut encoder, &archive).unwrap();
        encoder.finish().unwrap()
    }

    #[test]
    fn a_bundle_cannot_escape_the_app_directory() {
        let dir = app_dir("kiln-update-escape");
        let app = dir.join("app");
        let outside = dir.join("stolen.txt");

        let error = apply(&app, &hostile_bundle("../stolen.txt", "owned")).unwrap_err();

        assert!(error.to_string().contains("unsafe path"), "{error}");
        assert!(!outside.exists(), "nothing was written outside the app");
        assert_eq!(
            std::fs::read_to_string(app.join("index.html")).unwrap(),
            "<h1>old</h1>"
        );
        let _ = std::fs::remove_dir_all(&dir);
    }

    fn keypair() -> (minisign::KeyPair, String) {
        let pair = minisign::KeyPair::generate_unencrypted_keypair().unwrap();
        let public = pair.pk.to_base64();
        (pair, public)
    }

    fn sign(pair: &minisign::KeyPair, data: &[u8]) -> String {
        minisign::sign(None, &pair.sk, data, None, None)
            .unwrap()
            .to_string()
    }

    #[test]
    fn a_signature_admits_only_the_bytes_it_signed() {
        let (pair, public) = keypair();
        let good = bundle(&[("index.html", "<h1>new</h1>")]);
        let signature = sign(&pair, &good);

        verify(&good, &signature, &public).expect("the signed bundle verifies");

        // One flipped byte is the whole point: a bundle that arrives altered
        // must not install, however it was altered.
        let mut tampered = good.clone();
        let last = tampered.len() - 1;
        tampered[last] ^= 0x01;
        assert!(verify(&tampered, &signature, &public).is_err());

        // And a bundle signed by somebody else's key is not ours.
        let (other, _) = keypair();
        assert!(verify(&good, &sign(&other, &good), &public).is_err());
    }

    #[test]
    fn an_update_cannot_replace_the_key_that_authorises_it() {
        // The trust chain depends on this: if the public key lived inside
        // app/, one compromised release could sign every release after it.
        let dir = app_dir("kiln-update-key");
        let app = dir.join("app");

        let config = Config {
            url: "https://example.com/feed.json".into(),
            key: "RWQf6LRCGA9i53mlYecO4IzT51TGPpvWucNSCRrqxCJfWlOZC79TS9nu".into(),
            version: semver::Version::parse("1.0.0").unwrap(),
        };
        config.save(&app).unwrap();

        let stored = Config::path_for(&app);
        assert!(
            !stored.starts_with(&app),
            "{} must sit beside the app tree, not in it",
            stored.display()
        );

        // A bundle that tries to ship its own key cannot: it only ever lands
        // inside app/, where nothing reads it.
        let error = apply(
            &app,
            &hostile_bundle("../update.json", "{\"key\":\"attacker\"}"),
        )
        .unwrap_err();
        assert!(error.to_string().contains("unsafe path"), "{error}");

        let survived = Config::load(&app).expect("the key is still readable");
        assert_eq!(survived.key, config.key, "the key was not replaced");
        let _ = std::fs::remove_dir_all(&dir);
    }

    #[test]
    fn manifest_refuses_to_move_backwards() {
        let manifest = Manifest::parse(
            r#"{"version":"1.4.0","assets":"https://example.com/a.tar.gz","signature":"x"}"#,
        )
        .unwrap();

        assert!(manifest.supersedes(&semver::Version::parse("1.3.9").unwrap()));
        assert!(!manifest.supersedes(&semver::Version::parse("1.4.0").unwrap()));
        assert!(
            !manifest.supersedes(&semver::Version::parse("2.0.0").unwrap()),
            "a feed that can serve an older release can undo a fix"
        );
        assert!(manifest.runtime_is_new_enough(&semver::Version::parse("0.1.0").unwrap()));
    }

    #[test]
    fn a_bundle_can_require_a_newer_runtime() {
        let manifest = Manifest::parse(
            r#"{"version":"2.0.0","assets":"a","signature":"x","minimum_runtime":">=0.5.0"}"#,
        )
        .unwrap();

        assert!(!manifest.runtime_is_new_enough(&semver::Version::parse("0.4.0").unwrap()));
        assert!(manifest.runtime_is_new_enough(&semver::Version::parse("0.5.0").unwrap()));
    }
}
