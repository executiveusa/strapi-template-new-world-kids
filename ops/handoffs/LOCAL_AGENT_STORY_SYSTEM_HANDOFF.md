# LOCAL AGENT HANDOFF — New World Kids Story System

**Owner:** Bambu / New World Kids  
**Repo:** `executiveusa/strapi-template-new-world-kids`  
**Mode:** Brownfield, local-first, human-in-the-loop  
**Priority:** Higher than Moltbook/Open-Molt expansion until Pilot 0 proves the system  

## Mission

Build the first working local New World Kids Story System on Bambu's Windows laptop without creating another SaaS, replacing the existing site, or rewriting StoryToolkitAI.

The system must turn Bambu's already-organized month-by-month footage archive into this hierarchy:

`FILE -> MONTH STORY -> QUARTER/SEASON STORY -> YEAR STORY -> 5-YEAR MASTER STORY`

The same approved story/evidence records must later support:

- the New World Kids public website;
- the gallery;
- documentary/video editing;
- donor/funder proof;
- grant applications;
- social and press assets.

## Local machine facts

- Device: `TABLET-RV7J0DA1`
- Windows x64
- CPU: Intel Core i7-1065G7
- RAM: 16 GB
- GPU: Intel Iris Plus integrated graphics; no CUDA-capable NVIDIA GPU
- C: is nearly full (~14 GB free at handoff time)
- E: is an external ~1 TB drive and contains footage

### Hard local-storage rule

Install/store all new Story System runtime data on `E:` unless a dependency absolutely requires a small launcher on `C:`.

Preferred root:

`E:\NWK_STORY_SYSTEM\`

Suggested generated-data layout:

```text
E:\NWK_STORY_SYSTEM\
  StoryToolkitAI\
  story-memory\
  transcripts\
  indexes\
  thumbnails\
  proxies\
  temp\
  exports\
  config\
  logs\
```

Do not move, rename, overwrite, or delete any original footage.

## Source footage

Bambu already has footage organized month-by-month and metadata includes dates.

The Story Agent must support multiple read-only source roots. At least three roots are expected:

1. the main footage root on `E:`;
2. a second footage folder;
3. a third footage folder.

Do not invent the two unknown paths. If they are not discoverable from existing config, ask Bambu once for the exact paths, then persist them in a human-readable source registry such as:

`E:\NWK_STORY_SYSTEM\config\sources.json`

Each source root must be treated as read-only.

Allowed:
- read;
- hash;
- index;
- extract metadata;
- create proxies/transcripts/derived files under `E:\NWK_STORY_SYSTEM`.

Forbidden:
- rename originals;
- move originals;
- delete originals;
- overwrite originals;
- modify embedded source metadata.

## Existing repo laws — obey before implementation

Read `AGENTS.md` first.

The repo's Graphify Law is non-negotiable. `graphify-out/GRAPH_REPORT.md` was missing when this handoff was created.

### Gate 0

Before architecture or code changes:

1. verify whether `graphify-out/GRAPH_REPORT.md` now exists;
2. if missing, run the repo-prescribed Graphify workflow;
3. inspect GOD NODES and communities;
4. commit/update `graphify-out/` as required;
5. only then modify architecture/code.

Do not bypass this gate.

## Reuse before build

Inspect before creating anything.

Existing repo boundaries from `AGENTS.md`:

- `apps/ui` — donor-facing public site/trust layer
- `apps/blog` — field journal / proof
- `services/hermes` — backend harness and agent orchestration
- `packages/shared-data` — shared mission/trust/taxonomy data
- `agent-skills` — curated skills
- `ops/reports` — durable reports

Strapi is not the intended runtime.

Do not create a second orchestration stack if Hermes or existing local ICM infrastructure can own the function safely.

## Local execution preference

Use the existing ICM/local-agent harness already installed in Bambu's workflow where applicable.

Preferred execution pattern:

1. inspect current `STATUS.md`, `CONTEXT.md`, repo instructions, and graph;
2. turn work into one bounded stage/ticket;
3. execute;
4. verify;
5. write artifacts/evidence;
6. update status/context;
7. stop at the human gate.

Do not start an unbounded autonomous loop over five years of footage.

## StoryToolkitAI role

StoryToolkitAI is an upstream/local media-intelligence engine.

Use it for capabilities it already provides, such as:

- transcription;
- indexing/search;
- semantic retrieval;
- speaker/story selections where available;
- NLE/export integration where useful.

### Critical architectural rule

Do not fork or rewrite StoryToolkitAI unless a minimal adapter cannot solve the requirement.

Preferred boundary:

```text
Bambu / StoryFoundry UI
        -> MediaOps / local Story Agent
        -> StoryKit Bridge (thin adapter)
        -> StoryToolkitAI
        -> original footage + derived metadata
```

If StoryToolkitAI is already installed on the laptop, detect and reuse it. Do not blindly reinstall.

If it must be installed or relocated, prefer `E:\NWK_STORY_SYSTEM\StoryToolkitAI` and keep generated caches on `E:`.

## Canonical chronology

Bambu's existing monthly folder organization plus original capture metadata is the chronology source.

Do not reorganize the originals.

Canonical story hierarchy:

```text
YEAR
  Q1 / Season 1: Jan-Feb-Mar
  Q2 / Season 2: Apr-May-Jun
  Q3 / Season 3: Jul-Aug-Sep
  Q4 / Season 4: Oct-Nov-Dec
```

Each month produces exactly one canonical Month Story record.

Suggested human-readable derived layout:

```text
E:\NWK_STORY_SYSTEM\story-memory\
  2023\
    Q4\
      10-october\
        SOURCE_MANIFEST.json
        MONTH_STORY.md
        transcripts\
        analysis\
        selections\
      11-november\
      12-december\
      SEASON_STORY.md
```

Month is the canonical history/storage unit.
Story arcs may span multiple months.

## Minimal Story Agent v0.1

Build only enough to prove one vertical slice.

Capabilities:

1. register multiple read-only source roots;
2. scan source folders;
3. extract file metadata and capture dates;
4. compute stable checksums for deduplication/provenance;
5. classify by year/month/quarter without moving originals;
6. create a source manifest;
7. queue one month for StoryToolkitAI processing;
8. generate/store transcripts and derived indexes under `E:\NWK_STORY_SYSTEM`;
9. produce one `MONTH_STORY.md` proposal;
10. stop for Bambu review/approval.

### Do not build yet

- broad dashboard platform;
- generic multi-tenant SaaS;
- marketplace;
- token/NFT features;
- autonomous publishing;
- autonomous external messaging;
- five-year batch ingestion before one month is proven.

## Media processing strategy for this laptop

This machine has no CUDA GPU and only 16 GB RAM.

Design for selective/local processing:

- scan metadata first;
- avoid full-resolution AI processing when not needed;
- extract audio for spoken footage before transcription;
- generate lightweight proxies/contact sheets for visual review;
- use a small/fast transcription model first and benchmark accuracy/speed;
- escalate only important clips to heavier models;
- keep large local LLMs out of the first slice;
- add disk-space guards and resumable jobs;
- avoid simultaneous heavy StoryToolkitAI + NLE + large-model workloads.

Do not guess performance. Benchmark one real clip/month and record timing.

## First pilot media mission

**Pilot:** `STORY-MISSION-0001`

Start with **October 2023 only**.

Why: it is part of the known Hurricane Lidia story and provides a strong test of chronology, evidence, visual change, and narrative reconstruction.

### October 2023 proof slice

```text
REGISTER SOURCES
-> READ-ONLY SCAN
-> SOURCE MANIFEST
-> DEDUPE MAP
-> METADATA CHRONOLOGY
-> TRANSCRIBE/INDEX SELECTED MEDIA
-> MONTH STORY PROPOSAL
-> BAMBU REVIEW
-> APPROVED STORY RECORD
```

Only after October passes:

- process November 2023;
- process December 2023;
- synthesize `2023 Q4 / Season 4`.

Then stop and review before earlier years.

## Month Story contract

Each month should eventually summarize:

- source file count;
- capture-date range;
- photos/videos/audio counts;
- duplicate count;
- major events detected;
- strongest visual moments;
- strongest spoken moments/quotes;
- before/after candidates;
- people/places/program tags;
- Core Four tags: Food, Water, Energy, Shelter;
- evidence quality;
- rights/consent status where known;
- uncertainty/claims requiring human verification;
- recommended public assets;
- possible story beats;
- human approval state.

Do not publish or convert an AI interpretation into a factual claim without human approval/evidence.

## New World Kids metadata layer

Keep institutional/story metadata separate from StoryToolkitAI internals so the upstream tool can be upgraded/replaced.

Minimum conceptual fields:

```text
source_id
checksum
original_path
captured_at
year
quarter
month
program
location
people
core_four_tags
story_events
rights_status
consent_status
claim_ids
evidence_ids
editorial_status
public_status
```

Prefer human-readable JSON/Markdown as canonical artifacts.
SQLite may be used as a disposable/rebuildable local job/cache index, not as the only source of truth.

## Human-in-the-loop law

The agent may:

- scan;
- transcribe;
- index;
- rank;
- suggest;
- generate rough story structures;
- generate derived media;
- draft captions/metadata.

Bambu controls:

- factual truth;
- story interpretation;
- rights/consent decisions;
- public claims;
- final selections;
- publication;
- final edits.

## Gallery/public-site boundary

The current `/gallery` implementation is hardcoded and is not the source of truth.

Do not immediately redesign it.

First prove one approved Story Record.
Then wire one approved story item into the gallery as the first vertical slice.

Target eventual gallery model:

- month/season/year chapters;
- real aspect ratios rather than forced square dumps;
- before/during/after evidence;
- filters by year/program/theme/location/media type;
- Story Steward proposals + human approval;
- optimized derivatives only; originals remain untouched.

## DaVinci / editor handling

Do not make DaVinci Resolve a hard dependency for the first Story Agent slice.

If Resolve is already installed and usable, configure cache/proxy/export storage on `E:` rather than filling `C:`.

The local machine's integrated Intel GPU may limit recent Resolve performance. StoryToolkitAI/StoryFoundry must remain useful independently of Resolve.

Preserve export paths for EDL/XML or other NLE handoff where supported.

## Safety and failure guards

Required:

- source roots are read-only by policy;
- no destructive original-media operations;
- minimum free-space threshold before proxy/cache generation;
- resumable jobs;
- checksum-based duplicate/provenance tracking;
- same failure 3x => stop/escalate, do not loop indefinitely;
- logs under `E:\NWK_STORY_SYSTEM\logs`;
- no secrets committed;
- no automatic upload of private raw footage to cloud services.

If any cloud AI is proposed, pause for explicit Bambu approval and explain exactly what data would leave the laptop.

## ICM stage contracts to add after Graphify gate

Under the existing repo, add or reuse a human-readable workflow equivalent to:

```text
systems/sovereignty/
  00_truth/
  01_needs/
  02_opportunity_discovery/
  03_qualification/
  04_relationship_mapping/
  05_outreach/
  06_application/
  07_followup/
  08_awards_and_commitments/
  09_learning/
```

For story/media, create a similarly bounded local workflow rather than mixing all media logic into those funding folders.

Every stage contract must declare:

- INPUTS
- PURPOSE
- ALLOWED TOOLS/ACTIONS
- PROHIBITED ACTIONS
- OUTPUTS
- HUMAN GATE
- NEXT STAGE

## Minimal agent roles

Do not create an agent swarm.

Use/extend existing Hermes/worker patterns for four logical roles:

1. **Sovereignty Navigator** — overall need -> opportunity -> relationship -> approved action orchestration.
2. **Grant Scout** — funding research/evidence; cannot self-attest qualification.
3. **Relationship Steward** — maps needs to contacts and drafts asks; never sends without approval.
4. **Story Steward** — chronology, evidence-linked story proposals, captions, editorial state; cannot silently rewrite approved history.

For this handoff, implement only the Story Steward/local Story Agent slice needed for October 2023 plus the ICM/sovereignty scaffolding required by repo architecture.

## Acceptance criteria for first local slice

Do not claim completion until all are demonstrated:

1. `E:\NWK_STORY_SYSTEM` exists and generated data is kept off nearly-full `C:` where practical.
2. Three read-only source roots can be registered without moving originals.
3. A read-only scan completes and produces an inventory.
4. Checksums identify duplicates across roots.
5. October 2023 media is identified by folder and/or embedded date metadata.
6. One bounded processing job can be started, stopped, resumed, and logged.
7. At least one spoken clip can be transcribed/indexed locally.
8. `SOURCE_MANIFEST.json` is produced.
9. `MONTH_STORY.md` is produced as a proposal, clearly marked unapproved.
10. No original media changed.
11. Bambu can review the output before any publishing step.
12. Exact verification commands and evidence are recorded in `ops/reports` or the ICM output artifact.

## Required final handoff from local agent

When the first slice is complete, report exactly:

### DECISION
What architecture was actually used and why.

### CHANGES
Files/folders/scripts/config created or changed.

### PROOF
Commands run, scan counts, hashes/manifest location, transcript test, job-resume test, disk usage, and evidence that originals were untouched.

### STATUS
What works now vs. what remains proposed.

### RISKS
Performance, disk, upstream StoryToolkitAI issues, rights/consent gaps.

### ROLLBACK
How to remove generated system data without touching originals.

### NEXT
One bounded next slice only.

### HUMAN APPROVAL
Anything Bambu must decide before proceeding.

## Start instruction for local Codex/agent

> You are now the local execution agent for New World Kids Story System Pilot 0. Read `AGENTS.md`, this handoff, current repo `STATUS.md`/`CONTEXT.md` if present, and the Graphify map before modifying architecture or code. Obey the Graphify gate. Inspect and reuse existing Hermes/ICM infrastructure before creating new components. Your first goal is not to process five years of media. Your first goal is to prove the smallest safe end-to-end slice for October 2023 on Bambu's Windows laptop, with all generated data on `E:\NWK_STORY_SYSTEM` where practical and all original footage treated as immutable/read-only. Work one verifiable stage at a time, update durable status/evidence artifacts, and stop at human approval gates. Do not publish, send, upload private footage, or make destructive changes autonomously.
