# Hero timelapse: Proyecto Indigo Azul, 2020 to 2027

Goal: a short, silent loop on the homepage that shows the food forest growing over seven years. It must be real.
Trust rules: footage is only ever labelled as Proyecto Indigo Azul (Puerto Vallarta), with the years it covers; it is
never presented as Seattle activity. Do not generate or composite images of the place: a funder will treat that as a
fabrication.

## What I need from you

1. Dated photos of the same place across the years. One per season is plenty; at least one per year, 2020 to 2026.
   Same spot and angle where possible (the first camera position you can find again). Phone photos are fine.
2. Any existing drone or video clips (a few seconds each) and their dates.
3. A yes on rights: you or New World Kids own the images, and nobody identifiable appears without consent.

## How it gets built

1. Put the photos in one folder named by date: `2020-03_planting.jpg`, `2021-06_rows.jpg`, ... `2026-09_full.jpg`.
2. Run `scripts/build-timelapse.sh <folder> 3` (ffmpeg). It makes 1280x720 `hero-timelapse.mp4` and `.webm` plus a
   poster, with a soft crossfade and the year in the corner. Target 3 MB or less.
3. Fill in `apps/ui/src/content/hero.ts` (file names and the caption in English and Spanish).
4. The hero already supports it: autoplay, muted, loop, no audio, hidden for visitors who prefer reduced motion
   (they see the poster), poster shown while loading.

## Why this and not a heavier video

Mobile data and speed matter for the people we serve and for search ranking. The current unused
`public/videos/hero-garden.mp4` is 5.4 MB; the new file should be smaller.
