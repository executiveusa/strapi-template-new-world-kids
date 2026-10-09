# Fixing the Washington Secretary of State record (suggestions, counsel to confirm)

Record read 2026-10-09 (UBI 604 917 764, Active, expires 2027-05-31). Three things look incomplete or risky.

## 1. "Charitable Corporation" is blank

A funder reading the record sees an empty field. What to do:

1. Confirm the articles of incorporation state a charitable purpose. The 2024 annual report lists the nature of
   business as agricultural, educational, cultural.
2. File an **amended annual report** on ccfs.sos.wa.gov to set the charitable corporation field, and confirm whether
   the "Public Benefit Designation" applies. Ask Secretary of State staff or counsel which answer is correct.
3. Ask HSI whether New World Kids needs its own charitable solicitation registration, or whether HSI's registration
   covers the fundraising done through HSI (HSI posts state fundraising certificates on its member page).

## 2. One governor, who is also the registered agent

Add at least two more governors (see `docs/NWK_BOARD_AND_GOVERNANCE_PLAN.md`). When you add them:

- File the update on CCFS, and tell HSI in writing (agreement section 9: change in key staff).
- Update `apps/ui/src/content/facts.ts` with each person's name and role, with their written permission.

## 3. A home address is public

The record lists the registered agent's apartment address and a phone number, and it is a public record.
Change the registered agent to a commercial registered agent service or an office address, then file the
change on CCFS. This is a privacy and safety step for you; it does not change legal status.

## After the fix

Re-check the record, update the date on the Transparency page, and note it in `docs/NWK_FUNDER_TRUST_FACTS_NEEDED.md`.
