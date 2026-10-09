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
