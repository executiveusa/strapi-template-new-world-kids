# 01_fundraising — build a compliant FundRazr campaign

One job: turn an approved program need into a FundRazr campaign draft that is ready for owner/HSI review and launch.

## Inputs

- Reference: `../_shared/mission.md`
- Reference: `../_shared/legal-and-fiscal-sponsor.md`
- Reference: `../_shared/resources.md`
- Reference: `../_shared/agent-automation-policy.md`
- Working: a program need, budget, fundraising goal, approved photos/video, and source notes.

## Process

1. Define one concrete campaign outcome and one funding goal; do not invent impact units.
2. Draft the story as problem → real work → what the funds enable → evidence → call to action.
3. Prepare title, short description, long story, media checklist, campaign updates, SEO description, sharing copy, and UTM plan.
4. Configure FundRazr only through supported features; use browser control only under the automation policy.
5. Submit the proposed fundraising sources/materials to HSI for the prior written approval required by the fiscal-sponsorship agreement.
6. Record HSI's written approval in the campaign record before any public launch.
7. Record the canonical FundRazr campaign URL once HSI/account setup confirms it.

## Outputs

- `output/campaign-brief.md`
- `output/campaign-copy.md`
- `output/launch-checklist.md`

## Human checks and launch gate

Launch is blocked until both conditions are recorded:

- `hsi_fundraising_approval: approved`, with the written approval reference/date; and
- `owner_approved: true` after the owner verifies every factual claim, goal, image right, campaign destination, and HSI-required disclosure.

No agent may treat owner approval alone as sufficient to publish or launch fundraising material that requires HSI prior written approval.
