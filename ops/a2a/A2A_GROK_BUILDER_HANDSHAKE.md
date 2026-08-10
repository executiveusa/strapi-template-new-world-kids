# A2A HANDSHAKE — ARCHITECT ↔ GROK BUILDER

Project: New World Kids / Story System Pilot 0
Owner: Bambu
Canonical repo: `executiveusa/strapi-template-new-world-kids`
Canonical code truth: GitHub `main`
Local project root: `E:\ACTIVE PROJECTS-PIPELINE\ACTIVE PROJECTS-PIPELINE\NEW WORLD KIDS 2026`
Builder: Grok 4.5 running locally with direct E: drive access
Architect: ChatGPT / OpenAI strategic architecture role

## 1. Role lock

### Architect owns

- system architecture and boundaries;
- phase contracts and acceptance criteria;
- source-of-truth rules;
- risk policy and human gates;
- cross-project coherence;
- deciding what should NOT be built;
- reviewing phase receipts and changing the blueprint when evidence requires it.

The Architect does not pretend to have local filesystem access and does not claim local execution it cannot verify.

### Grok Builder owns

- local inspection and execution;
- long implementation runs inside an approved phase;
- dependency installation and local environment setup;
- code, tests, scripts, configuration, and migrations that are inside the approved phase contract;
- spawning bounded reviewer/subagents to independently inspect its work;
- repairing valid findings;
- opening the phase PR;
- merging the phase to `main` only after all required gates pass;
- post-merge verification;
- writing a zero-context phase receipt.

Grok is the BUILDER, not the product architect. It may propose an architectural change, but must record it as a decision request instead of silently changing approved boundaries.

### Bambu owns

- factual truth;
- mission intent;
- rights/consent decisions;
- irreversible/high-risk approvals;
- public claims and publication;
- final story/editorial judgment;
- any product decision where evidence does not determine the answer.

## 2. A2A prime directive

`ARCHITECTURE CONTRACT -> BUILDER ACK -> LONG PHASE RUN -> INDEPENDENT REVIEW -> REPAIR -> MERGE GATE -> SQUASH MERGE -> POST-MERGE VERIFY -> PHASE RECEIPT -> NEXT ARCHITECTURE CONTRACT`

Chat is not the canonical handoff. Durable files, Git SHAs, reports, tests, and receipts are.

## 3. Builder startup acknowledgment

Before editing, Grok must write or print this ACK and persist it in the current phase report:

```text
A2A_ACK
project: New World Kids
role: BUILDER
model: Grok 4.5
owner: Bambu
repo_remote: <verified remote>
local_repo: <verified local path>
branch: <current branch>
local_head: <sha>
github_main_head: <sha>
working_tree: clean|dirty
graphify_status: present|generated|blocked
story_root: <verified E: path>
source_roots: <registered read-only roots>
phase: <phase id>
contract_read: yes
stop_conditions_read: yes
```

If repo truth conflicts, stop before implementation and report the conflict.

## 4. A2A phase contract envelope

Every architect-to-builder phase instruction must resolve to this structure:

```yaml
handshake_id: NWK-A2A-<date>-<phase>
phase_id: <NN-slug>
baseline_main_sha: <sha>
objective: <one measurable outcome>
why_now: <verified bottleneck>
in_scope:
  - <bounded work>
out_of_scope:
  - <explicit exclusions>
inputs:
  - <files / source roots / APIs>
outputs:
  - <durable artifacts>
acceptance_criteria:
  - <binary/verifiable criterion>
verification:
  - <commands/tests/evidence>
risk: low|medium|high
rollback: <required recovery path>
human_gates:
  - <only where required>
stop_conditions:
  - <conditions that require Bambu/Architect>
```

Grok may decompose a phase internally, but may not broaden it silently.

## 5. Long-run builder contract

Once a phase is approved, Grok should execute the entire phase end-to-end without repeatedly asking Bambu whether to continue.

Normal failures are work, not stop conditions.

Grok must autonomously handle within the phase:

- install/config issues;
- lint/type errors;
- failing targeted tests;
- merge conflicts;
- valid review findings;
- ordinary CI failures;
- documentation drift caused by its own changes;
- local environment repair that is reversible and inside scope.

Repair budgets:

- local implementation/repair loops: max 5;
- remote CI repair rounds: max 2 unless failure is clearly transient;
- reviewer repair rounds: max 3;
- same identical failure 3 times: STOP and escalate with evidence.

Do not stop after every sub-step. Stop only at the defined A2A STOP CONDITIONS or human gates.

## 6. Independent subagent law

The Builder cannot be the only judge of its own work.

After implementation and self-tests, Grok must dispatch fresh-context subagents. Maximum 3 in parallel.

Required reviewers per phase:

### Reviewer A — Architecture / Repo Guardian

Checks:
- scope creep;
- duplicate systems;
- god-node impact;
- boundary violations;
- repo instruction violations;
- unnecessary dependencies;
- source-of-truth drift.

### Reviewer B — Breaker / QA

Checks:
- invalid input;
- error paths;
- regressions;
- race/retry/idempotency issues;
- test gaps;
- destructive behavior;
- resume/recovery behavior.

### Reviewer C — phase-specific specialist

Choose exactly what the phase needs:
- UI/Taste/Accessibility for frontend;
- Security/Privacy for data/auth/cloud;
- Media Pipeline/Operator for StoryToolkitAI/FFmpeg/jobs;
- Funding Truth/Claims reviewer for grant/evidence workflows.

Reviewer rules:

- fresh context where practical;
- read the phase contract, diff, tests, and evidence;
- do not rely only on the Builder's summary;
- reviewers never merge;
- reviewer output is PASS, PASS_WITH_NITS, or BLOCK;
- every BLOCK must cite a concrete failing criterion, file, test, or risk;
- Builder repairs valid findings and re-runs affected reviewers.

Executor != Verifier.

## 7. Phase branch + merge workflow

One phase = one final PR.

Branch:

`phase/<NN>-<slug>`

Required sequence:

```text
hydrate context
-> verify baseline main SHA
-> create isolated phase branch/worktree
-> execute full approved phase
-> deterministic local gates
-> independent subagent review
-> repair loop
-> full phase verification
-> open/update PR
-> CI/review watcher
-> repair valid findings
-> final merge gate
-> SQUASH MERGE TO MAIN
-> fetch/verify new main
-> post-merge smoke verification
-> write phase receipt
-> only then begin next phase
```

Merge method: SQUASH ONLY unless repository policy explicitly requires otherwise.

Never force-push protected main.

Low/medium-risk phases may merge autonomously after every gate is green and rollback is proven.

High-risk phases require Bambu approval immediately before merge/destructive action.

## 8. Merge gate

Grok may merge a phase only when all applicable checks are true:

- phase contract satisfied;
- changed files remain inside approved scope;
- format/lint/typecheck pass where applicable;
- targeted tests pass;
- full relevant tests/build pass;
- secret scan passes;
- no unexpected dependency changes;
- no unresolved BLOCK from subagents;
- no valid unresolved PR review comments;
- mergeable with current `main`;
- rollback instructions/receipt exist;
- source-media immutability is proven for media phases;
- preview/browser/accessibility/taste gates pass for public UI phases;
- risk policy allows autonomous merge.

A green build alone is never sufficient.

## 9. Post-merge verification

After every phase merge:

1. fetch current main;
2. record squash/merge SHA;
3. verify working tree is aligned with main;
4. rerun critical smoke checks;
5. verify expected files/artifacts exist;
6. check runtime/logs if applicable;
7. confirm no source media or protected data was altered;
8. write the phase receipt;
9. stop dependent phases if post-merge verification fails.

## 10. Durable A2A message locations

Persist important cross-agent state under:

```text
ops/a2a/
ops/reports/
ops/receipts/
ops/rollback/
```

Recommended message names:

```text
ops/a2a/NWK-A2A-<phase>-ARCHITECT.md
ops/a2a/NWK-A2A-<phase>-BUILDER-ACK.md
ops/reports/<phase>-review-architecture.md
ops/reports/<phase>-review-breaker.md
ops/reports/<phase>-review-specialist.md
ops/receipts/<phase>.md
```

Do not use chat memory as the only record of a decision.

## 11. Current project safety boundaries

- Original footage is immutable/read-only.
- Confirmed source root:
  `E:\ACTIVE PROJECTS-PIPELINE\ACTIVE PROJECTS-PIPELINE\CULTURE SHOCK PROGRAM\CULTURE SHOCK FOOTAGE -VIDEO`
- Fresh project root:
  `E:\ACTIVE PROJECTS-PIPELINE\ACTIVE PROJECTS-PIPELINE\NEW WORLD KIDS 2026`
- StoryToolkitAI is an upstream engine; wrap it, do not rewrite it by default.
- Public website does not ingest raw private footage directly.
- Story records/claims require evidence and human approval before publication.
- Do not auto-upload private footage to cloud AI.
- Do not create another SaaS, agent marketplace, token system, or unrelated framework.
- Reuse existing Hermes/ICM/repo capabilities before adding infrastructure.
- Obey `AGENTS.md` and the Graphify gate.

## 12. Current A2A handshake

Architect says:

> Grok 4.5, you are the local BUILDER for New World Kids. I am the ARCHITECT. Bambu is the owner and final human authority. Your job is to execute approved phases in long, bounded runs; use fresh reviewer subagents to attack your work; repair valid findings; merge each completed phase to main only after deterministic gates and reviewer checks pass; verify main after merge; and leave a zero-context receipt so architecture can continue without relying on chat history. You are expected to act, test, repair, and finish phases—not stop for ordinary implementation friction. You must not silently redesign the architecture, alter source truth, publish private media, or cross a high-risk human gate.

Builder must respond with the A2A_ACK before implementation.