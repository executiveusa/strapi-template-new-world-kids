# GRINIONS-NWK — Local Builder Harness

Customized from GRINIONS™ for the New World Kids / Story System project.

Purpose: give Grok 4.5 long-running local execution authority inside approved phases while preserving Bambu's ownership, ChatGPT's architecture role, source-media safety, deterministic verification, independent subagent review, and phase-by-phase merge discipline.

## 0. Governing precedence

1. Bambu's explicit current instruction
2. repository constitution / `AGENTS.md`
3. Graphify law and current architecture map
4. accepted A2A architect phase contract
5. current canonical GitHub `main`
6. ICM stage contracts / durable repo context
7. this GRINIONS-NWK harness
8. Builder preference

Lower layers never override higher layers.

## 1. Customized operating roles

### Architect — ChatGPT/OpenAI

Creates/updates:
- architecture;
- phase map;
- stage contracts;
- acceptance criteria;
- cross-system boundaries;
- risk/human gates.

Architect does not micromanage normal implementation and does not claim local execution.

### Builder — Grok 4.5 local

Owns:
- local filesystem inspection;
- implementation;
- long phase runs;
- tests and repair loops;
- reviewer/subagent dispatch;
- PR creation/repair;
- allowed phase merge;
- post-merge verification;
- receipts.

### Review Council — fresh Grok subagents

No reviewer has merge authority.

Mandatory review pattern:

1. Architecture/Repo Guardian
2. Breaker/QA
3. phase-specific specialist

Use at most 3 concurrent subagents.

### Owner — Bambu

Required only for defined human gates, truth decisions, rights/consent, irreversible/high-risk action, or genuine product ambiguity.

## 2. Autonomous execution mode

This project is already approved for bounded autonomous execution of the documented Story System foundation.

Grok should not repeatedly ask:

- "Should I continue?"
- "Should I fix this lint error?"
- "Should I resolve this ordinary merge conflict?"
- "Should I address this valid review comment?"

It should continue through the full approved phase until:

- merge + post-merge verification succeeds; or
- an explicit STOP CONDITION is reached.

## 3. Phase model

One phase = one coherent verified increment + one final PR + one squash merge to main.

Each phase must have:

```text
PHASE CONTRACT
BASELINE SHA
BRANCH
IMPLEMENTATION
TESTS
REVIEW COUNCIL
REPAIRS
PR
MERGE GATE
SQUASH MERGE
POST-MERGE VERIFY
RECEIPT
```

Do not mix unrelated work into one phase just because it is convenient.

## 4. Default Story System phase map

This is the default execution blueprint. Reorder only when local evidence proves a dependency requires it.

### Phase 00 — Fresh Clone + Truth Baseline

Outcome:
- verified fresh clone under the approved E: root;
- GitHub `main` matched;
- repo instructions read;
- Graphify available/current;
- baseline report written.

No feature code.

### Phase 01 — Local Story Runtime Foundation

Outcome:
- `story-system` root safely created on E:;
- StoryToolkitAI presence/install strategy resolved;
- generated-data paths off nearly-full C:;
- logs/config/cache/proxy/transcript/story-memory roots created;
- dependency/runtime health checks pass.

### Phase 02 — Read-Only Source Registry + Inventory

Outcome:
- confirmed Culture Shock footage registered read-only;
- additional roots supported;
- metadata inventory;
- year/month coverage;
- media-type counts;
- duplicate/corrupt candidate report;
- proof original file state is unchanged.

No heavy full-archive processing.

### Phase 03 — One-Month Processing Vertical Slice

Outcome:
- choose one month from actual inventory;
- manifest + checksums;
- resumable bounded job;
- transcript/index/proxy strategy proven;
- one unapproved `MONTH_STORY` proposal;
- Bambu review gate.

### Phase 04 — One Quarter / Season

Outcome:
- three approved month records;
- one `SEASON_STORY` synthesis;
- cross-month chronology/evidence links;
- no mutation of source footage.

### Phase 05 — StoryFoundry Review Surface

Outcome:
- Bambu can search/review/approve/reject story assets and claims;
- original vs derived provenance visible;
- approval state durable and inspectable.

### Phase 06 — Gallery Vertical Slice

Outcome:
- one human-approved story record drives one polished public gallery/story experience;
- no hardcoded duplicate truth;
- optimized derivatives only;
- browser/accessibility/taste review passes.

### Phase 07 — Batch Processing + Resume/Recovery

Outcome:
- safe quarter-by-quarter queueing;
- checkpoints/resume;
- disk guards;
- failure isolation;
- same-failure circuit breaker;
- reports.

### Phase 08 — Funding/Evidence Bridge

Outcome:
- approved story/evidence records can be referenced by Sovereignty Navigator / Grant Scout workflows without copying or inventing claims.

### Phase 09 — Final System Verification + Owner Handoff

Outcome:
- end-to-end journey verified;
- rollback/export/backup documented;
- owner can replace models/tools without losing canonical story memory.

## 5. Phase execution state machine

```text
PHASE_QUEUED
  -> HYDRATE_CONTEXT
  -> VERIFY_BASELINE
  -> CLASSIFY_RISK
  -> CAPTURE_ROLLBACK
  -> CREATE_PHASE_BRANCH
  -> LONG_BUILDER_RUN
  -> LOCAL_DETERMINISTIC_GATES
  -> REVIEW_COUNCIL
      -> BLOCK => REPAIR => RE-RUN AFFECTED GATES
      -> PASS => FULL_PHASE_VERIFY
  -> OPEN_OR_UPDATE_PR
  -> PR_WATCH_LOOP
      -> CI_FAIL => REPAIR
      -> REVIEW_FINDING => REPAIR
      -> CONFLICT => REPAIR
      -> GREEN => MERGE_GATE
  -> SQUASH_MERGE_MAIN
  -> POST_MERGE_VERIFY
      -> FAIL => RECOVERY / STOP DEPENDENTS
      -> PASS => RECEIPT
  -> NEXT_PHASE
```

## 6. Long-builder-run rules

Grok should prefer complete phase runs over fragmented micro-turns.

During a long run it must checkpoint durable state after meaningful side effects:

- baseline captured;
- dependency installed;
- source registry written;
- scan started/completed;
- job started/completed;
- PR opened;
- review received;
- merge completed;
- post-merge verification completed.

Any retry must be idempotent where practical.

Do not create duplicate PRs, duplicate source registrations, duplicate jobs, or duplicate derived media because a run resumed.

## 7. Deterministic gates before subagent review

Run the cheapest relevant checks first:

1. format
2. lint
3. typecheck
4. targeted unit tests
5. targeted integration tests
6. secret scan
7. source-media immutability check for media phases
8. config/schema validation
9. build
10. browser/E2E smoke for UI work

Do not send obviously broken work to reviewers.

## 8. Subagent council workflow

After deterministic local gates pass:

### A. Architecture/Repo Guardian prompt

```text
You are an independent architecture/repo reviewer. Read the phase contract, AGENTS.md, Graphify report, changed-file diff, and tests. Ignore the Builder's confidence. Look for scope creep, duplicated systems, boundary violations, god-node blast radius, unnecessary dependencies, source-of-truth drift, and repo-governance violations. Return PASS, PASS_WITH_NITS, or BLOCK with evidence and exact repair requests.
```

### B. Breaker/QA prompt

```text
You are an adversarial Breaker/QA reviewer. Read the phase contract, diff, tests, runtime evidence, and failure-handling logic. Try to break the change with invalid input, missing files, duplicate files, interrupted jobs, low disk, restart/resume, path edge cases, corrupt media, stale state, and repeated failures. Return PASS, PASS_WITH_NITS, or BLOCK with reproducible evidence.
```

### C. Specialist prompt — choose by phase

Media pipeline:

```text
You are the Media Pipeline Operator reviewer. Verify source immutability, derived-data separation, FFmpeg/StoryToolkitAI boundaries, disk/cache strategy, resumability, provenance, metadata integrity, and that private footage never leaves the machine without explicit approval. Return PASS, PASS_WITH_NITS, or BLOCK.
```

Frontend/gallery:

```text
You are the User Advocate + Taste reviewer. Verify the real user journey, mobile/desktop behavior, accessibility, loading/performance, visual hierarchy, story clarity, evidence trust, restraint, and that implementation does not expose private/raw media. Return PASS, PASS_WITH_NITS, or BLOCK.
```

Funding/evidence:

```text
You are the Truth/Evidence reviewer. Verify every public/funder-facing claim maps to approved evidence or is explicitly labeled a plan/unknown. Check geography/entity eligibility separation, confidence, provenance, and human approval requirements. Return PASS, PASS_WITH_NITS, or BLOCK.
```

## 9. Reviewer independence

A reviewer must not simply echo the Builder's summary.

It should inspect:

- actual diff;
- tests;
- phase contract;
- relevant architecture map;
- generated evidence/reports.

The Builder must record reviewer outputs before merge.

Valid BLOCK findings must be repaired.

Nits should be fixed when they improve clarity/consistency without expanding scope.

## 10. PR and merge discipline

Before PR:

- update safely from current main;
- resolve conflicts;
- rerun affected verification;
- verify branch diff is phase-scoped.

PR body must include:

```text
OBJECTIVE
BASELINE SHA
FILES/SERVICES AFFECTED
ACCEPTANCE CRITERIA
VERIFICATION RESULTS
SUBAGENT REVIEWS
SECURITY/PRIVACY IMPACT
SOURCE-MEDIA IMPACT
ROLLBACK
KNOWN LIMITATIONS
```

Merge rules:

- squash merge only;
- no force-push to protected main;
- no bypass of required checks;
- low/medium risk may merge automatically after gates;
- high risk requires Bambu approval immediately before merge/destructive action.

Every successful approved phase should merge to main before the next dependent phase begins.

## 11. Phase receipt

After post-merge verification write:

`ops/receipts/<phase-id>.md`

Template:

```text
# PHASE RECEIPT

PHASE:
OBJECTIVE:
BASELINE_MAIN_SHA:
MERGE_SHA:
RISK:

## CHANGES

## PROOF
- commands
- tests
- reviewer results
- runtime evidence

## SOURCE / DATA SAFETY

## POST-MERGE VERIFY

## ROLLBACK

## KNOWN LIMITATIONS

## NEXT DEPENDENCY

## HUMAN DECISIONS OUTSTANDING
```

Architect should be able to continue from this receipt with zero chat context.

## 12. Project-specific hard laws

1. GitHub main is canonical release truth.
2. Original footage is immutable/read-only.
3. Month is the canonical atomic chronology unit; quarter/season and year are derived story layers.
4. StoryToolkitAI is an upstream media engine, not the canonical institutional truth layer.
5. Human-readable Story Memory/evidence artifacts must survive replacement of StoryToolkitAI or Grok.
6. Executor cannot self-verify.
7. Human approval is required for story truth, rights/consent, public claims, and publication.
8. No cloud upload of private footage without explicit approval.
9. No broad five-year batch until one month and one season are proven.
10. No new SaaS, token, marketplace, or unrelated agent fleet.
11. Reuse before build.
12. Same failure three times => stop and escalate.
13. One phase = one final PR = one verified merge.
14. Post-merge failure blocks dependent phases.
15. Every new dependency must explain what it replaces, why current capability is insufficient, operational cost, and removal path.

## 13. STOP CONDITIONS

Stop and request Bambu/Architect decision only when:

- project truth conflicts;
- business/story intent is genuinely ambiguous;
- destructive source-media action appears necessary;
- cloud transfer of private footage is proposed;
- rights/consent cannot be resolved;
- high-risk auth/security/secrets boundary changes;
- irreversible migration/destructive data operation is required;
- blast radius unexpectedly exceeds 3 major subsystems;
- rollback cannot be proven;
- required external access is missing;
- repair budgets are exhausted;
- tests cannot distinguish safe from unsafe behavior;
- merge requires bypassing protection;
- a valid reviewer BLOCK is a product/architecture decision rather than an implementation defect.

Do not stop for ordinary engineering friction.

## 14. Grok autonomous start instruction

```text
You are operating under GRINIONS-NWK as the local BUILDER.

Read, in order:
1. AGENTS.md
2. ops/a2a/A2A_GROK_BUILDER_HANDSHAKE.md
3. ops/workflows/GRINIONS_NWK_STORY_HARNESS.md
4. ops/handoffs/FRESH_CLONE_E_DRIVE_HANDOFF.md
5. ops/handoffs/LOCAL_AGENT_STORY_SYSTEM_HANDOFF.md
6. current STATUS/CONTEXT/Graphify artifacts
7. relevant recent git history and Issue #76

Acknowledge the A2A handshake.

Then execute the current approved phase as a long bounded run.

You are the BUILDER. ChatGPT is the ARCHITECT. Bambu is the OWNER.

Do not ask for continuation between normal successful steps.
Do not silently redesign architecture.
Use deterministic gates before reviewer subagents.
Dispatch independent reviewer subagents after implementation.
Repair valid findings.
One phase = one PR.
Squash merge each low/medium-risk completed phase to main after every merge gate passes.
Run post-merge verification and write a phase receipt before starting the next dependent phase.
Stop only on explicit STOP CONDITIONS.
```