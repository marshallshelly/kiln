#!/usr/bin/env bash
# Measures the three numbers the README publishes. Run from the repo root:
#
#     bench/run.sh
#
# Everything here is wall-clock on one machine, which is why the README prints
# the machine alongside the numbers. Treat these as a floor to improve on and a
# regression check, not as a benchmark against other toolkits — nothing here
# runs Electron or Tauri, so no comparison is claimed.
set -euo pipefail

cd "$(dirname "$0")/.."

case "$(uname -s)" in
  Darwin) rss_of_run() { /usr/bin/time -l "$@" 2>&1 >/dev/null | awk '/maximum resident/ {printf "%.1f", $1/1048576}'; } ;;
  Linux)  rss_of_run() { /usr/bin/time -v "$@" 2>&1 >/dev/null | awk '/Maximum resident/ {printf "%.1f", $6/1024}'; } ;;
  *)      echo "unsupported platform: $(uname -s)" >&2; exit 1 ;;
esac

echo "building release…"
cargo build --release --quiet

BIN=target/release/kiln
bytes_of() { wc -c < "$1" | tr -d ' '; }
mb() { awk -v b="$1" 'BEGIN { printf "%.1f", b/1048576 }'; }

cp "$BIN" /tmp/kiln-bench-stripped
strip /tmp/kiln-bench-stripped 2>/dev/null || true

echo
echo "  machine   $(uname -sm), $(sysctl -n machdep.cpu.brand_string 2>/dev/null || echo "$(nproc 2>/dev/null || echo '?') cores")"
echo "  kiln      $(git rev-parse --short HEAD 2>/dev/null || echo 'unknown')"
echo

printf '  %-34s %s MB\n' "binary, as built"  "$(mb "$(bytes_of "$BIN")")"
printf '  %-34s %s MB\n' "binary, stripped"  "$(mb "$(bytes_of /tmp/kiln-bench-stripped)")"
rm -f /tmp/kiln-bench-stripped

# Peak RSS, in increasing order of what is initialised: no GPU, then the
# renderer, then a real window with a swapchain.
printf '  %-34s %s MB\n' "peak RSS, check (no GPU)"      "$(rss_of_run "$BIN" check examples/counter.html)"
printf '  %-34s %s MB\n' "peak RSS, headless render"     "$(rss_of_run "$BIN" render examples/counter.html /tmp/kiln-bench.png)"

# Headless render: parse, cascade, layout, paint and PNG encode.
best=""
for _ in 1 2 3 4 5; do
  start=$(python3 -c 'import time; print(time.time())')
  "$BIN" render examples/counter.html /tmp/kiln-bench.png >/dev/null 2>&1
  end=$(python3 -c 'import time; print(time.time())')
  ms=$(awk -v a="$start" -v b="$end" 'BEGIN { printf "%.0f", (b-a)*1000 }')
  if [ -z "$best" ] || [ "$ms" -lt "$best" ]; then best=$ms; fi
done
printf '  %-34s %s ms\n' "headless render, best of 5" "$best"

# Time to first paint in a real window. KILN_TIMING marks it from the top of
# main, so this includes reading the page, parsing, running its scripts, wgpu
# and surface creation — not just the frame.
if [ "${KILN_BENCH_WINDOW:-1}" = "1" ]; then
  paints=""
  for _ in 1 2 3; do
    log=$(mktemp)
    KILN_TIMING=1 "$BIN" open examples/counter.html >"$log" 2>&1 &
    pid=$!
    sleep 6
    kill "$pid" 2>/dev/null || true
    wait "$pid" 2>/dev/null || true
    v=$(grep -o 'first paint at [0-9.]*' "$log" | awk '{print $4}')
    [ -n "$v" ] && paints="$paints $v"
    rm -f "$log"
  done
  if [ -n "$paints" ]; then
    printf '  %-34s %s ms\n' "window, first paint (warm)" \
      "$(echo "$paints" | tr ' ' '\n' | grep -v '^$' | sort -n | head -1)"
  else
    echo "  window, first paint                 (no window could be opened)"
  fi

  # What a running app actually costs, which is the number the memory target
  # is about — peak during a headless render leaves out the swapchain.
  "$BIN" open examples/counter.html >/dev/null 2>&1 &
  pid=$!
  sleep 6
  idle=$(ps -o rss= -p "$pid" 2>/dev/null | awk '{printf "%.1f", $1/1024}')
  kill "$pid" 2>/dev/null || true
  wait "$pid" 2>/dev/null || true
  [ -n "$idle" ] && printf '  %-34s %s MB\n' "window, idle RSS" "$idle"
  echo
  echo "  Note: the first launch of a freshly built binary is several times"
  echo "  slower than the numbers above — see the README."
fi

rm -f /tmp/kiln-bench.png
