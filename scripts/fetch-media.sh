#!/usr/bin/env bash
# Download the Higgsfield source videos for the homepage and turn them into
# scroll frames. Run from the project root: scripts/fetch-media.sh
set -euo pipefail
command -v ffmpeg >/dev/null || { echo "ffmpeg is required (macOS: brew install ffmpeg)"; exit 1; }

mkdir -p .media-src
fetch() { # <name> <url>
  [ -f ".media-src/$1.mp4" ] || curl -fL --retry 3 -o ".media-src/$1.mp4" "$2"
  scripts/extract-frames.sh ".media-src/$1.mp4" "$1" 24 1600
}

# v6 hero: server opening into layers (Seedance 2.5, 1080p, 8 s)
fetch server-explode "https://d8j0ntlcm91z4.cloudfront.net/user_3Du4TH5tab7GWcTfMVKchMwZxDp/hf_20261031_184513_51276d9f-f925-4f8a-8a5e-a392d8d3943e.mp4"
# v7 reach: light lines spreading from Dhaka over the night-side Earth (Seedance 2.5, 1080p, 8 s)
fetch earth-reach "https://d8j0ntlcm91z4.cloudfront.net/user_3Du4TH5tab7GWcTfMVKchMwZxDp/hf_20261101_075030_644be3aa-2f88-4632-aea5-ccc8302f39ef.mp4"
# v6 speed/security: fiber-optic light tunnel (Seedance 2.5, 720p, 8 s)
fetch light-tunnel "https://d8j0ntlcm91z4.cloudfront.net/user_3Du4TH5tab7GWcTfMVKchMwZxDp/hf_20261031_184518_a1686098-062c-4600-a281-ba3b416fdc42.mp4"
