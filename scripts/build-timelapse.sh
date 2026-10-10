#!/usr/bin/env bash
# Build the homepage hero timelapse from dated photos.
#
#   scripts/build-timelapse.sh <photo-folder> [seconds-per-photo]
#
# Name photos so they sort by date, for example 2020-03_planting.jpg, 2021-06_rows.jpg ... 2026-09_full.jpg.
# Use photos taken from the same spot and angle if you can: the growth reads best that way.
# Each photo shows for a few seconds with a soft crossfade and a small year label (taken from the file name).
# Output: apps/ui/public/videos/hero-timelapse.mp4 and .webm, plus hero-timelapse-poster.jpg.
# Keep it under about 3 MB; the script uses 1280x720, 24 fps, no audio.
set -euo pipefail

dir="${1:?photo folder required}"
per="${2:-3}"
fade=1
out="$(cd "$(dirname "$0")/.." && pwd)/apps/ui/public/videos"
mkdir -p "$out"

mapfile -t files < <(find "$dir" -maxdepth 1 -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.webp' \) | sort)
n=${#files[@]}
((n >= 2)) || { echo "need at least 2 photos in $dir" >&2; exit 1; }

inputs=(); filters=(); labels=()
for i in "${!files[@]}"; do
  f="${files[$i]}"
  year="$(basename "$f" | grep -oE '^(19|20)[0-9]{2}' || true)"
  inputs+=(-loop 1 -t $((per + fade)) -i "$f")
  filters+=("[$i:v]scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,setsar=1,fps=24,format=yuv420p${year:+,drawtext=text='$year':fontcolor=white:fontsize=36:x=w-tw-32:y=h-th-28:alpha=0.85}[v$i]")
done

chain="[v0]"; offset=0
for ((i = 1; i < n; i++)); do
  offset=$((offset + per))
  filters+=("${chain}[v$i]xfade=transition=fade:duration=$fade:offset=$offset[x$i]")
  chain="[x$i]"
done

ffmpeg -y "${inputs[@]}" -filter_complex "$(IFS=';'; echo "${filters[*]}")" -map "$chain" -an \
  -c:v libx264 -crf 28 -preset slow -movflags +faststart "$out/hero-timelapse.mp4"
ffmpeg -y -i "$out/hero-timelapse.mp4" -c:v libvpx-vp9 -crf 38 -b:v 0 -an "$out/hero-timelapse.webm"
ffmpeg -y -i "$out/hero-timelapse.mp4" -frames:v 1 -update 1 -q:v 3 "$out/hero-timelapse-poster.jpg"
ls -la "$out"/hero-timelapse*
