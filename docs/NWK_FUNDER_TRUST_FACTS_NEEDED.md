# Facts needed to finish "Funder and trust"

The site now renders every fact below only when it is filled in `apps/ui/src/content/facts.ts`.
Until then, the pages say plainly that it is not available yet. Nothing here is guessed.

## Answer these (owner: New World Kids; legal items need counsel and HSI)

| #   | Question                                                                                                                 | Where it will appear           | Notes                                                                                                                              |
| --- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Participant age range (for example 16 to 24)?                                                                            | First 12 page, "At a glance"   | Drives every legal answer below                                                                                                    |
| 2   | Cost to participants (free?)                                                                                             | First 12 page                  |                                                                                                                                    |
| 3   | Schedule (hours per week, start and end dates)?                                                                          | First 12 page                  |                                                                                                                                    |
| 4   | When do applications open, and where do people apply?                                                                    | First 12 page, "How to apply"  | Set `applyOpen.href`                                                                                                               |
| 5   | Who is the employer of record: New World Kids, HSI, or each project host?                                                | First 12 page, "Pay"           | Counsel and HSI                                                                                                                    |
| 6   | Pay rate, and how many hours per week? Washington minor work rules (permits, hours) apply if any participant is under 18 | First 12 page, "Pay"           | Counsel; Washington Labor and Industries                                                                                           |
| 7   | Workers' compensation and liability insurance in place?                                                                  | Transparency page              | HSI may cover this; ask                                                                                                            |
| 8   | Safeguarding policy approved?                                                                                            | First 12 page, safety          | Draft is in `docs/drafts/NWK_SAFEGUARDING_POLICY_DRAFT.md`. Publish the approved version as a PDF and set `safeguardingPolicyHref` |
| 9   | Targets for the four outcomes (for example "10 of 12 complete")?                                                         | First 12 page                  | Set `targets`                                                                                                                      |
| 10  | Is Proyecto Indigo Azul a program of New World Kids, or a separate entity in Mexico? Who owns the land and runs it?      | Transparency page              | Currently described only as "our project"                                                                                          |
| 11  | Other people to list: founder title, advisers, a second governor?                                                        | Transparency page              | Add to `team` with the exact role and permission to publish                                                                        |
| 12  | Do you want participant language like "justice system, foster care, housing instability" kept public?                    | First 12 page, "Who it is for" | It is person-first today; your FundRazr copy is blunter                                                                            |

## Already verified and now on the site

- 12 participants over 1 year, Seattle, 2027, matched with a mentor and a project (FundRazr).
- What donations pay for (FundRazr).
- WA nonprofit corporation, UBI 604 917 764, Active; one governor, Jeremy Bowers (WA record, 2026-10-09).
- Program manager is Jeremy Bowers; HSI is Grantor; quarterly reports to HSI (signed agreement dated 2023-04-13; HSI member page).
- Mentor screening acknowledgement and project review for safety and supervision (intake forms).

## Needs HSI sign-off before launch

Sponsorship agreement section 3: fundraising text needs HSI's prior written approval. That covers
the Transparency, First 12, Donate and Privacy pages.

## Answered 2026-10-09

- Ages 16 to 19; King, Snohomish, Pierce, Skagit counties; referral only; free to the 12 selected.
- Outcome targets: to be set after the first 12 finish (the page now says so).
- Still open: schedule, employer of record and pay, the second person's name and role, board names,
  and whether Proyecto Indigo Azul is a program of New World Kids or a separate Mexican entity.
- See `docs/NWK_BOARD_AND_GOVERNANCE_PLAN.md` and `docs/NWK_YOUTH_EMPLOYMENT_COMPLIANCE.md`.

## Answered 2026-10-09 (second round)

- Pay: applicable minimum wage plus $3 an hour. Hours: set together by the young person, their parent or guardian,
  and the host program; all three must agree. Published on First 12, Projects, Opportunity, Safeguards.
- Employer of record: you proposed New World Kids, because you pay the wages. Recommended, pending HSI's written OK.
  It means New World Kids needs the minor work permit endorsement and an L&I workers' compensation account.
- Insurance: stated as a pre-payment step on the First 12 page. Add liability insurance details when bought.
- Safeguards: published at /safeguarding. Counsel and HSI should review.
- Goal: all 12 places filled within 2027, after launch. Results targets come after the pilot.
- Proyecto Indigo Azul: demonstration food forest built by New World Kids starting in 2020, designed to become a
  learning center and cultural exchange program. A dated gallery is still to build.
- Participant language: not required, but supported. Page says so.
- Saved for the end: item 11 (people, advisers, second governor). Still open.

## Answered 2026-10-09 and 2026-10-10 (third round)

- Team: Stacy McSwain, sports mentor program lead, is listed. Get her written OK to be named publicly.
- Employer: New World Kids pays wages. The site calls this "the plan" and says details are being finalized with HSI,
  so it stays accurate while the HSI written OK is pending. Remove "the plan" wording once HSI approves.
- Schedule: set per host program (sports, art, and so on) by the young person, parent or guardian, and the host.
  No fixed schedule is published.
- Safeguarding policy: published as a labelled draft at `/safeguarding/policy` (English and Spanish), with every
  undecided item marked "open". Replace it with the adopted version once the board and HSI approve.
- Privacy policy: rewritten from a plain-language model (NTEN's policy structure). Retention periods are marked as to be
  published. Needs counsel and HSI review.
- Plant list: to come from you; the gallery has a collapsed "plant list" slot ready (`apps/ui/src/content/gallery.ts`).
- Referrals come first from adults (coaches, mentors, counselors). No teen-facing page for the first test, by decision.
- Photos and the 7-year timelapse: to come from you. See `docs/NWK_HERO_TIMELAPSE_PLAN.md`.
- Database: schema applied to the Supabase project on 2026-10-10 (schema `nwkids`; four migrations).
  The site needs `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` set on the host. Never commit them.
