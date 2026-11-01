#!/usr/bin/env bash
# Turn a video into a WebP frame sequence for the scroll-scrubbed sections.
#
# Usage: scripts/extract-frames.sh <video file or URL> <name> [fps] [desktop width]
# Example: scripts/extract-frames.sh ~/Downloads/server.mp4 server-explode 24 1600
#
# Writes public/media/<name>/desktop/0001.webp ..., public/media/<name>/mobile/0001.webp ...
# and public/media/<name>/manifest.json, which <ScrollFrames name="..."> reads.
set -euo pipefail

src="$1"
name="$2"
fps="${3:-24}"
width="${4:-1600}"
mobile_fps=$(( fps / 2 > 0 ? fps / 2 : 1 ))
out="public/media/$name"

rm -rf "$out/desktop" "$out/mobile"
mkdir -p "$out/desktop" "$out/mobile"

ffmpeg -hide_banner -loglevel error -y -i "$src" -an \
  -vf "fps=$fps,scale=$width:-2:flags=lanczos" -c:v libwebp -quality 74 -compression_level 5 \
  "$out/desktop/%04d.webp"
ffmpeg -hide_banner -loglevel error -y -i "$src" -an \
  -vf "fps=$mobile_fps,scale=900:-2:flags=lanczos" -c:v libwebp -quality 66 -compression_level 5 \
  "$out/mobile/%04d.webp"

count_d=$(find "$out/desktop" -name '*.webp' | wc -l | tr -d ' ')
count_m=$(find "$out/mobile" -name '*.webp' | wc -l | tr -d ' ')
size=$(ffprobe -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "$out/desktop/0001.webp")

cat > "$out/manifest.json" <<JSON
{ "desktop": { "count": $count_d, "size": "$size" }, "mobile": { "count": $count_m } }
JSON

echo "Wrote $count_d desktop and $count_m mobile frames to $out ($(du -sh "$out" | cut -f1))"
