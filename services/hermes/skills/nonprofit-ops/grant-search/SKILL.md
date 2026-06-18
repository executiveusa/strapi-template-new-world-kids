---
name: hermes-grant-search
description: Use when Hermes needs to discover, qualify, and track grants for a nonprofit or social-purpose organization.
---

# Grant Search

Hermes uses this skill to find grant opportunities, score fit, and prepare a clean approval-ready summary.

## What this skill solves

- Funding instability and the need to find reliable support
- Too much grant research scattered across docs, inboxes, and browser tabs
- Staff burnout caused by manual searching and repeated rework
- Difficulty telling whether an opportunity is worth the application effort

## Primary sources

Search public or already-authenticated sources first:

- Grants.gov and Simpler.Grants.gov
- Candid and funder profile pages
- Foundation and community foundation websites
- TechSoup grant-finding resources when available
- Skip or other platform-specific grant directories when configured

## Workflow

1. Define the target filters:
   - mission fit
   - geography
   - funding size
   - eligibility
   - due date
   - reporting burden
2. Search public sources with the browser harness or command-code workflow.
3. Record each opportunity in the grant board.
4. Score fit with a simple rubric:
   - mission alignment
   - geography alignment
   - timing
   - likely award size
   - admin burden
   - chance of success
5. Flag anything requiring human approval.
6. Update the learning log and graph with stable patterns after verification.

## Safety gates

- Never submit an application without explicit approval.
- Never impersonate a human or use credentials unsafely.
- Never store secrets in the repo.
- Never duplicate an opportunity that is already on the board.
- Any application over the configured approval threshold stays in review until approved.

## Browser use

Use the browser harness when a source requires login, page verification, or a screenshot of the opportunity.
If the page is public, prefer a direct open and copy the relevant details into the board.

## Outputs

Each search run should end with:

- a short list of matched opportunities
- a fit score for each one
- deadline and eligibility notes
- any approval required before the next step

## Learning

When a search pattern works repeatedly, write it to the learning log and connect it in the graph so Hermes can reuse it without re-discovering the same path.
