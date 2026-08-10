# FRESH CLONE E: DRIVE HANDOFF — NEW WORLD KIDS 2026

## SOURCE OF TRUTH

GitHub `main` is the verified source of truth for code, website, agents, architecture, and handoff documents.

Repository:
`https://github.com/executiveusa/strapi-template-new-world-kids.git`

Do not trust, delete, or merge any unknown prior local copy unless it is first inspected and compared to GitHub.

## FRESH LOCAL ROOT

Create the new working root exactly here:

`E:\ACTIVE PROJECTS-PIPELINE\ACTIVE PROJECTS-PIPELINE\NEW WORLD KIDS 2026`

Recommended layout:

```text
E:\ACTIVE PROJECTS-PIPELINE\ACTIVE PROJECTS-PIPELINE\NEW WORLD KIDS 2026\
  repo\
    strapi-template-new-world-kids\
  story-system\
    StoryToolkitAI\
    config\
    story-memory\
    transcripts\
    indexes\
    thumbnails\
    proxies\
    temp\
    exports\
    logs\
  reports\
  backups\
```

The fresh Git clone should be:

`E:\ACTIVE PROJECTS-PIPELINE\ACTIVE PROJECTS-PIPELINE\NEW WORLD KIDS 2026\repo\strapi-template-new-world-kids`

StoryToolkitAI and all generated media-analysis data should be under:

`E:\ACTIVE PROJECTS-PIPELINE\ACTIVE PROJECTS-PIPELINE\NEW WORLD KIDS 2026\story-system`

Keep code and generated media data separate.

## CONFIRMED FOOTAGE SOURCE ROOT 1

Register this existing footage folder as a READ-ONLY source root:

`E:\ACTIVE PROJECTS-PIPELINE\ACTIVE PROJECTS-PIPELINE\CULTURE SHOCK PROGRAM\CULTURE SHOCK FOOTAGE -VIDEO`

Policy:
- read: allowed
- hash/checksum: allowed
- metadata extraction: allowed
- indexing: allowed
- proxy/transcript generation: allowed only into `NEW WORLD KIDS 2026\story-system`
- rename originals: forbidden
- move originals: forbidden
- delete originals: forbidden
- overwrite originals: forbidden
- modify embedded metadata: forbidden

Two additional footage roots may be supplied later. The system must support multiple read-only source roots without restructuring originals.

## WHY THIS FRESH START

We do not currently have a verified local clone. Starting fresh avoids accidentally treating an old local folder as authoritative.

Truth boundaries:

```text
GitHub main
= source of truth for code and architecture

Original footage folders
= source of truth for raw historical media

story-system outputs
= derived/rebuildable indexes, transcripts, proxies, Story Memory
```

## FIRST ACTIONS FOR THE LOCAL AGENT

1. Verify `E:` is mounted and the target parent folder exists.
2. Create `NEW WORLD KIDS 2026` subfolders shown above if missing.
3. Fresh clone GitHub `main` into the exact `repo\strapi-template-new-world-kids` path.
4. Verify:
   - remote URL
   - current branch
   - HEAD SHA vs GitHub main
   - clean working tree
5. Read, in this order:
   - `AGENTS.md`
   - `ops/handoffs/LOCAL_AGENT_STORY_SYSTEM_HANDOFF.md`
   - this file: `ops/handoffs/FRESH_CLONE_E_DRIVE_HANDOFF.md`
   - repo `STATUS.md` / `CONTEXT.md` if present
   - `graphify-out/GRAPH_REPORT.md` if present
6. Obey the Graphify gate in `AGENTS.md`. If the graph is missing, regenerate it before architectural/code changes.
7. Inspect existing repo architecture before creating any new orchestration layer.
8. Detect whether StoryToolkitAI is already installed anywhere useful. Reuse if safe; otherwise install under the fresh `story-system\StoryToolkitAI` path.
9. Register the confirmed Culture Shock footage root in a human-readable source registry.
10. Perform a READ-ONLY inventory first. Do not begin bulk AI processing yet.

## LOCAL MACHINE FACTS

Device: `TABLET-RV7J0DA1`

- Windows x64
- Intel Core i7-1065G7
- 16 GB RAM
- Intel Iris Plus integrated graphics
- no CUDA-capable NVIDIA GPU
- C: nearly full
- E: external ~1 TB drive

Design consequences:

- keep new runtime/generated data on E:
- benchmark before choosing transcription models
- avoid large local LLMs in first slice
- use lightweight proxies/contact sheets where useful
- extract audio before speech transcription where practical
- add resumable jobs and disk-space guards
- do not run uncontrolled five-year processing

## STORY ARCHITECTURE

Canonical hierarchy:

```text
FILE
-> MONTH STORY
-> QUARTER / SEASON STORY
-> YEAR STORY
-> 5-YEAR MASTER STORY
```

Year breakdown:

- Q1 / Season 1 = Jan, Feb, Mar
- Q2 / Season 2 = Apr, May, Jun
- Q3 / Season 3 = Jul, Aug, Sep
- Q4 / Season 4 = Oct, Nov, Dec

Original folder structure plus embedded capture metadata is the chronology source. Do not reorganize originals.

## STORYTOOLKITAI ROLE

StoryToolkitAI is the local media-intelligence engine, not the canonical application architecture.

Use it for:
- transcription
- indexing/search
- semantic retrieval
- speaker/story selections where available
- NLE/export integration where useful

Do not rewrite/fork it unless a thin adapter cannot solve a proven requirement.

Preferred boundary:

```text
StoryFoundry / Bambu review UI
-> local Story Agent / MediaOps
-> thin StoryKit Bridge
-> StoryToolkitAI
-> original footage + derived metadata
```

## FIRST VERIFIED MEDIA SLICE

Do not process everything.

First prove one bounded month or one clearly identified subset from the confirmed footage source.

If the archive contains October 2023 footage, prefer October 2023 as the initial story slice because it can test chronology, event reconstruction, evidence, and narrative around Hurricane Lidia.

If October 2023 is not present in the confirmed Culture Shock source, do not invent it. Instead:

1. inventory the confirmed source;
2. report years/months detected;
3. identify the best first month based on actual media present;
4. stop for Bambu approval before heavy processing.

Proof pipeline:

```text
REGISTER SOURCE
-> READ-ONLY SCAN
-> SOURCE_MANIFEST.json
-> DEDUPE MAP
-> METADATA CHRONOLOGY
-> SELECT ONE MONTH
-> TRANSCRIBE/INDEX SELECTED MEDIA
-> MONTH_STORY.md proposal
-> BAMBU REVIEW
-> APPROVED STORY RECORD
```

## REQUIRED LOCAL SOURCE REGISTRY

Create a human-readable registry under:

`...\NEW WORLD KIDS 2026\story-system\config\sources.json`

Conceptual example:

```json
{
  "sources": [
    {
      "id": "culture-shock-footage-video",
      "path": "E:\\ACTIVE PROJECTS-PIPELINE\\ACTIVE PROJECTS-PIPELINE\\CULTURE SHOCK PROGRAM\\CULTURE SHOCK FOOTAGE -VIDEO",
      "mode": "read-only",
      "status": "active"
    }
  ]
}
```

Never commit private local absolute paths into public website runtime code. Local paths belong only in local config ignored by Git or in clearly non-secret machine-local config templates.

## NEW WORLD KIDS AGENT/ICM WORK

After Graphify inspection, implement/reuse the minimal human-readable sovereignty workflow described in `LOCAL_AGENT_STORY_SYSTEM_HANDOFF.md`.

Minimal logical roles only:

1. Sovereignty Navigator
2. Grant Scout
3. Relationship Steward
4. Story Steward

For the first local phase, Story Steward / local Story Agent is the active implementation focus.

Do not create an agent swarm or new SaaS.

## WEBSITE / GALLERY

The existing `/gallery` is not the canonical truth source.

Do not redesign the entire gallery first.

First prove:

```text
one raw source item
-> indexed
-> evidence-linked story record
-> human approval
-> one gallery/public story render
```

Then scale the gallery into month/season/year storytelling.

## DAVINCI / EDITOR RULE

Do not make DaVinci Resolve a blocker for the first slice.

If already installed and usable:
- keep app installation where Windows/Resolve expects it
- configure cache/proxies/exports to E: where practical
- preserve StoryToolkitAI export/NLE handoff capability

This laptop's integrated GPU may constrain Resolve. The story system must remain useful without Resolve.

## HUMAN-IN-THE-LOOP

Agent may:
- inspect
- scan
- hash
- transcribe
- index
- rank
- suggest
- draft story structures
- generate derived media

Bambu controls:
- factual truth
- story interpretation
- rights/consent
- public claims
- final selections
- publishing
- external uploads
- destructive actions

No private raw footage may be uploaded to cloud AI without explicit approval describing exactly what data leaves the laptop.

## HANDOFF CONTEXT THE NEXT MODEL MUST READ

The next local model should treat these as required context sources:

1. `AGENTS.md`
2. `ops/handoffs/FRESH_CLONE_E_DRIVE_HANDOFF.md`
3. `ops/handoffs/LOCAL_AGENT_STORY_SYSTEM_HANDOFF.md`
4. Issue #76: `Phase 0 — New World Kids Sovereignty + StoryFoundry foundation`
5. current Git history / recent website-gallery commits
6. canonical copy/docs in the New World Kids repo
7. Graphify report after regeneration
8. Veronika strategic briefing repo context as a founding strategy source, but do not couple the repos

Strategic context to preserve:

- New World Kids is the real Pilot 0, not a demo SaaS.
- The system goal is `proof -> relationships -> opportunities -> funding -> programs -> evidence -> more funding`.
- AI is infrastructure, not the mission.
- The Story system turns years of footage into institutional memory, evidence, and public narrative.
- The funding/relationship/story systems must remain human-reviewed.
- Culture Shock (Seattle) and Indigo Azul (Mexico) are distinct programs with distinct legal/funding contexts.
- Do not claim internal Pilot 0 work as external revenue validation.

## START PROMPT FOR THE LOCAL MODEL

Paste this as the first instruction after opening the fresh clone:

> You are the local execution agent for New World Kids Pilot 0 on Bambu's Windows laptop. GitHub main is the verified source of truth for code and architecture. This is a fresh local environment at `E:\ACTIVE PROJECTS-PIPELINE\ACTIVE PROJECTS-PIPELINE\NEW WORLD KIDS 2026`. Read `AGENTS.md`, `ops/handoffs/FRESH_CLONE_E_DRIVE_HANDOFF.md`, and `ops/handoffs/LOCAL_AGENT_STORY_SYSTEM_HANDOFF.md` before making changes. Obey the Graphify gate. Verify the fresh clone against GitHub main. Build/reuse the local Story system under the specified `story-system` folder, keep all original footage immutable/read-only, register `E:\ACTIVE PROJECTS-PIPELINE\ACTIVE PROJECTS-PIPELINE\CULTURE SHOCK PROGRAM\CULTURE SHOCK FOOTAGE -VIDEO` as the first source root, perform a read-only inventory, and report exactly what years/months/media are present before heavy processing. Do not process the full archive. Do not publish, upload private footage, send external messages, or make destructive changes. Work one verifiable stage at a time and stop at defined human approval gates.

## REQUIRED FIRST REPORT

Before any heavy media processing, return:

### CLONE VERIFICATION
- local path
- remote URL
- branch
- local HEAD SHA
- GitHub main SHA
- clean/dirty status

### REPO ARCHITECTURE
- Graphify status
- GOD NODES / relevant communities
- existing components to reuse

### LOCAL STORY SYSTEM
- StoryToolkitAI detected/installed status
- exact runtime path
- free disk space
- source registry path

### SOURCE INVENTORY
- confirmed source roots
- total files
- media type counts
- detected year/month ranges
- duplicate candidates
- unreadable/corrupt files

### RECOMMENDED FIRST MONTH
- exact month
- reason
- estimated file count / duration
- expected processing approach

### HUMAN APPROVAL
Stop and ask Bambu to approve the first processing month before beginning heavy transcription/indexing.
