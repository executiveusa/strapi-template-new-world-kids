# New World Kids — fundraising and grants pipeline

The flow in one line: prove the need → choose the right funding path → draft from evidence → get HSI approval → publish/submit → measure and learn.

| Stage                 | Job                                | Input                                         | Output                       | Human check                                      |
| --------------------- | ---------------------------------- | --------------------------------------------- | ---------------------------- | ------------------------------------------------ |
| `01_fundraising`      | Build compliant FundRazr campaigns | mission proof + approved fundraising language | campaign brief/draft         | Owner confirms story, goal, media, destination   |
| `02_grant-research`   | Find and qualify grants            | program needs + public/authorized sources     | opportunity record           | Owner confirms strategic fit                     |
| `03_grant-drafting`   | Draft evidence-backed application  | qualified opportunity + source docs           | grant draft                  | Owner confirms facts/budget                      |
| `04_hsi-review`       | Prepare sponsor review package     | final draft + required attachments            | HSI review packet            | HSI staff approval is required before submission |
| `05_campaign-traffic` | Drive qualified donor traffic      | approved campaign + content assets            | channel plan + content queue | Owner approves outbound campaign                 |
| `06_reporting`        | Reconcile results and learn        | FundRazr/grant/channel results                | report + lessons             | Owner verifies numbers and next decision         |

Factory (stable every run): `_shared/`
Product (new each run): stage `output/` files.

## State

A stage is complete only when its required output exists and its human gate has been recorded. Agents may prepare work ahead, but may not bypass the HSI or owner gates described in the contracts.
