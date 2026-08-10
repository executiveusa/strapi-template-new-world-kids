# A2A ARCHITECT CONTRACT — Phase 03: One-Month Vertical Slice

**Architect:** ChatGPT/OpenAI  
**Builder:** Grok 4.5 local  
**Owner:** Bambu  
**Repo:** `executiveusa/strapi-template-new-world-kids`  
**Baseline:** `457537f076f655715f3fe6f210aac7ebc589dd62`  
**Status:** `BLOCKED_PENDING_OWNER_MONTH_APPROVAL`

## Architect decision

Phases 00–02 are accepted as the verified baseline.

For the first **engineering validation**, the Architect recommends **`2024-05`** because the inventory shows 49 files / 48 videos / ~7 GB: large enough to prove the full circuit, but materially cheaper and safer to debug than the richer ~26.3 GB July candidate.

This is not a declaration that May is the strongest eventual public story. `2024-07` remains the richer editorial alternate.

The Builder must not start heavy Phase 03 processing until Bambu explicitly approves a month, e.g.:

```text
APPROVE 2024-05
```

The approved month becomes the only permitted heavy-processing scope for Phase 03.

---

## Purpose

Prove one complete local circuit:

```text
READ-ONLY ORIGINALS
→ MONTH MANIFEST + SHA-256
→ LIGHTWEIGHT MEDIA INTELLIGENCE
→ BOUNDED TRANSCRIPTION / INDEXING
→ EVIDENCE-LINKED STORY PROPOSAL
→ INDEPENDENT REVIEW
→ UNAPPROVED MONTH STORY
→ BAMBU STORY / RIGHTS GATE
```

No publishing, quarter processing, archive-wide heavy processing, or gallery redesign in this phase.

---

## Hard boundaries

### Original media

Allowed: read, stat, hash, ffprobe/metadata extraction, audio extraction to derived storage, proxy/thumbnail/contact-sheet generation to derived storage, local transcription/indexing to derived storage.

Forbidden: rename, move, delete, overwrite, alter source metadata, write sidecars into source folders, or upload private footage to cloud services without explicit Bambu approval.

`source_files_modified` must remain **0**.

### Public-repo privacy

The GitHub repo is public. Never commit raw footage, proxies, private thumbnails/contact sheets, private transcripts, absolute local paths, sensitive filenames, local indexes containing private content, StoryToolkitAI caches/models, or rights/consent assumptions.

Exact manifests, hashes, transcripts, indexes, derivatives, and `MONTH_STORY.md` stay local on E:. GitHub receives only implementation code, tests, sanitized aggregate reports, schemas/templates, and receipts. Use source aliases such as `culture-shock-primary` in committed reports.

---

## Canonical local state

Canonical source registry:

```text
story-system/config/sources.json
```

Treat early `story-system/registry/` as legacy/non-canonical. Do not create a third registry.

The approved month must be explicit in one canonical run config, e.g. `NWK_PILOT_MONTH=YYYY-MM`, or equivalent CLI parameter recorded in the local run receipt.

---

## Safety precondition — harden broad scan

Before heavy processing, any command capable of transcription, proxy generation, indexing, month hashing, or StoryToolkitAI submission must:

1. require an explicit approved month;
2. reject empty/wildcard/all-archive scope;
3. print resolved source alias, month, file count, and estimated bytes;
4. support dry-run/preflight;
5. stop if resolved scope differs from approved month.

Archive-wide **read-only inventory** may remain available. Archive-wide heavy processing may not.

---

# Phase 03 execution stages

These are internal stages of **one Phase 03 branch and one final Phase 03 PR**.

## 03A — Preflight + baseline

- fetch/verify latest `main`;
- record baseline SHA;
- create `phase/03-month-vertical-slice`;
- confirm clean tree and exact approved month;
- confirm canonical registry;
- confirm E: free space;
- keep temp/cache/derivatives on E: where practical;
- verify no output path resolves inside a source root;
- run dry-run with exact month count/size;
- apply broad-scan hardening before heavy work.

Pilot safety guards:

- abort heavy generation if E: free space drops below **100 GB**;
- default derived-data budget for the approved month: **25 GB**;
- exceeding that budget requires stop/report.

These are Pilot 0 safeguards, not permanent product limits.

## 03B — Immutable month manifest + real dedupe

For every file in the approved month, record locally:

- stable media ID;
- source alias;
- privacy-safe local reference;
- byte size;
- filesystem timestamps;
- media type;
- duration where applicable;
- embedded capture timestamp where available;
- SHA-256;
- duplicate group based on actual SHA-256.

Suggested local outputs:

```text
story-system/story-memory/YYYY/QN/MM-month/
  SOURCE_MANIFEST.json
  DEDUPE_MAP.json
```

Capture before-state and revalidate the complete approved-month set at phase end:

```text
files_added_to_source = 0
files_removed_from_source = 0
files_renamed_in_source = 0
source_files_modified = 0
```

For this bounded pilot, revalidate the SHA-256 set before final receipt.

## 03C — Lightweight intelligence pass

Do not run expensive AI over every full-resolution file by default.

For the approved month:

1. ffprobe/media metadata;
2. duration, dimensions, codec, audio presence, technical failures;
3. low-cost derivatives as needed: thumbnails/contact sheets, low-res proxies, extracted audio;
4. skip exact SHA-256 duplicates from redundant processing;
5. identify candidates for deeper processing.

No facial identity recognition or unsupported person inference.

## 03D — StoryToolkitAI bridge proof

StoryToolkitAI remains an upstream engine.

Decision tree:

```text
STAI runnable
→ use thin bridge for bounded pilot

STAI present but dependency-broken
→ repair only minimum runtime/dependency issue

STAI unavailable after bounded repair budget
→ do not rewrite STAI
→ preserve deterministic outputs
→ mark bridge BLOCKED with evidence
→ never fake success
```

Benchmark a representative sample before scaling. Record model/tool, clip duration, wall-clock time, quality notes, RAM/disk observations, and local/cloud boundary.

Prefer a small/fast local transcription model first. Do not run/download a large local LLM merely to generate narrative prose.

Minimum proof when spoken footage exists:

- at least one spoken clip transcribed/indexed locally;
- searchable/indexed result demonstrated;
- provenance links back to stable media IDs.

Process only enough material to support a credible Month Story proposal; do not spend compute without evidence value.

## 03E — Evidence-linked Month Story

Produce locally:

```text
MONTH_STORY.md
```

Header must say:

```text
UNAPPROVED — AI/AGENT PROPOSAL — REQUIRES BAMBU REVIEW
```

Include:

- month and capture-date range;
- source count;
- observable events/themes;
- strongest visual candidates;
- strongest spoken candidates/quotes where available;
- before/after candidates when supported;
- program/location/Core Four tags only when supported;
- duplicate handling;
- evidence quality;
- rights/consent as `known`, `unknown`, `restricted`, or `needs review`;
- claims requiring owner verification;
- proposed story beats;
- proposed public assets;
- evidence IDs for factual assertions derived from media.

Truth classes:

```text
OBSERVED
Directly supported by media/metadata.

INFERRED
Agent interpretation; not established fact.

OWNER-VERIFICATION REQUIRED
Historical/contextual claim requiring Bambu or documentary evidence.
```

Never promote `INFERRED` to `OBSERVED` silently.

## 03F — Independent review council

Executor cannot self-verify.

### Reviewer A — Architecture / Repo Guardian

Check source-of-truth boundaries, registry duplication, STAI boundary, unnecessary dependencies, Graphify/GOD NODE impact, public/private data boundary, and scope.

### Reviewer B — Breaker / Safety QA

Attempt invalid/missing month, path escape, output-inside-source, low disk, duplicates, interrupted run, resume/re-run, corrupt media, STAI unavailable, repeated failure, and accidental archive-wide heavy run.

### Reviewer C — Media Evidence / Story Steward

Check provenance, SHA-256 dedupe, evidence linkage, transcript/index proof, observed-vs-inferred separation, rights/consent uncertainty, unsupported claims, and unapproved status.

Each returns exactly:

```text
PASS
PASS_WITH_NITS
BLOCK
```

Valid `BLOCK` findings must be repaired and re-reviewed before merge.

---

## Deterministic verification gates

Run applicable checks in this order:

1. format;
2. lint;
3. typecheck where applicable;
4. targeted tests;
5. path/scope safety tests;
6. source mutation tests;
7. resume/idempotency tests;
8. secret scan;
9. build if repo code changed;
10. repo checks required by `AGENTS.md`;
11. Graphify update when CLI is available; if still unavailable, record stale-graph limitation honestly.

Do not disable tests to pass.

---

## PR / merge policy

One final Phase 03 PR. Commit only safe code/tests/templates/sanitized reports/receipt. Do not commit private local Story System outputs.

PR must include:

- approved month;
- baseline SHA;
- changed files;
- verification results;
- three reviewer verdicts;
- sanitized benchmark summary;
- source mutation proof = 0;
- STAI bridge result;
- rollback/removal instructions;
- known limitations.

Merge method: **SQUASH ONLY**.

Engineering merge does not equal story/publication approval. The local Month Story remains UNAPPROVED after merge.

---

## Acceptance criteria

Phase 03 engineering is complete only when:

1. exactly one Bambu-approved month was processed;
2. heavy commands cannot accidentally run archive-wide without explicit scope;
3. canonical registry is `story-system/config/sources.json`;
4. approved-month originals have local SHA-256 provenance;
5. true duplicates use SHA-256;
6. source files modified = 0;
7. no generated output is inside source folders;
8. local month manifest exists;
9. lightweight media intelligence ran;
10. STAI bridge is honestly demonstrated as WORKING or evidence-backed BLOCKED;
11. at least one spoken clip is transcribed/indexed locally when spoken footage exists;
12. outputs link to stable media IDs;
13. local `MONTH_STORY.md` exists and is clearly UNAPPROVED;
14. observed/inferred/owner-verification classes are separated;
15. rights/consent uncertainty is explicit;
16. private media/transcripts/paths are absent from public GitHub;
17. no unresolved reviewer BLOCK remains;
18. Phase 03 PR is squash-merged and post-merge verified;
19. sanitized Phase 03 receipt is on main;
20. Builder stops for Bambu story/rights review before Phase 04.

---

## Stop conditions

Stop rather than improvising when:

- no owner-approved month exists;
- resolved scope differs from approved month;
- source mutation is detected;
- output would write inside source root;
- E: free space falls below guard;
- derived budget would be exceeded;
- private footage would need cloud upload;
- STAI repair requires deep fork/rewrite;
- identical failure occurs 3 times;
- corruption/rights ambiguity prevents safe interpretation;
- source immutability cannot be proven;
- merge requires bypassing protection;
- a destructive/high-risk action becomes necessary.

---

## Builder → Architect completion report

```text
PHASE 03 STATUS
APPROVED MONTH
BASELINE / MERGE SHA

SOURCE PROOF
- files
- bytes
- SHA-256 count
- true duplicate groups
- source mutations = 0

STAI BRIDGE
- status
- benchmark
- local/cloud boundary

DERIVED OUTPUTS
- manifest
- transcript/index proof
- proxy/contact-sheet counts
- local disk consumed

MONTH STORY
- status = UNAPPROVED
- evidence linkage quality
- claims needing owner verification
- rights/consent unknowns

REVIEWS
- Architecture verdict
- Breaker verdict
- Media Evidence verdict
- repairs completed

PR / MERGE
- PR
- squash SHA
- post-merge verification

RISKS / LIMITATIONS

HUMAN GATE
STOP for Bambu story/rights approval before Phase 04.
```

## Architect recommendation to Bambu

Approve the smallest top-tier technical pilot first:

```text
APPROVE 2024-05
```

After the circuit is proven end-to-end, use richer editorial months such as `2024-07` with substantially less implementation risk.
