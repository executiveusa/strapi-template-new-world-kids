# Design and copy audit: ELI5 and i-have-adhd (flags only, nothing changed)

Skills used: DreambigOu/ELI5 (explain at the audience's level) and ayghri/i-have-adhd (shape output so a reader
with ADHD can act). Readers tested: a 16 year old, a parent or guardian, a host program lead, a funder.
Reading grades are Flesch-Kincaid estimates on the live copy. Fix order is at the bottom.

## ELI5 flags: is it clear for each reader?

| #   | Where                                    | Finding                                                                                                                                                 | Severity |
| --- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| E1  | `first-12` "Paid work and the law" intro | Grade 14.6, 27 words in one sentence. Too hard for a 16 year old or parent.                                                                             | High     |
| E2  | Transparency page                        | "Fiscal sponsor", "public charity", "EIN", "UBI", "governor" are never explained. Funders know them; parents do not.                                    | High     |
| E3  | Homepage `firstTitle`                    | "matching 12 local participants with mentors for a pilot program" is grade 9 and uses "participants" and "pilot program". "12 young people" is plainer. | Medium   |
| E4  | Whole site                               | Mixed words for the same people: "participants", "young people", "youth", "kids". Pick one for each reader.                                             | Medium   |
| E5  | No teen-facing page                      | Every call to action speaks to adults. A 16 year old who finds the site has no "what is in it for me" and no plain "ask your counselor to refer you".   | High     |
| E6  | Hero headline                            | "turn interest into opportunity" is abstract. It does not say youth, paid, or Seattle in the first line.                                                | Medium   |
| E7  | Pathway names                            | "Built for Good", "Beyond the Game", "Ground Up", "Make Your Mark" are English-only brand names on Spanish pages, with no plain gloss on the page.      | Low      |
| E8  | FundRazr copy                            | "Help prove the First 12" is unclear.                                                                                                                   | Low      |
| E9  | Spanish pages                            | Not reading-level tested. Needs a native review.                                                                                                        | Medium   |
| E10 | Footer HSI disclosure                    | Dense legal sentence at 12 px. HSI requires the English text, so add a one-line plain gloss above it.                                                   | Low      |

## i-have-adhd flags: can a reader act on it?

| #   | Where                           | Finding                                                                                                                                                                             | Severity |
| --- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- |
| A1  | `first-12` page                 | The one action ("Refer a young person") sits in section 3 of 8. The page opens with explanation, not the action.                                                                    | High     |
| A2  | `first-12` page, end            | Ends with three equal links. The skill says finish with one next action.                                                                                                            | Medium   |
| A3  | `first-12` page                 | Eight sections with no jump list. Add a short list at the top.                                                                                                                      | Medium   |
| A4  | Transparency page               | Opens with who-is-who. The reader's action (give, verify) is below the fold.                                                                                                        | Medium   |
| A5  | "By check" instructions         | One paragraph. Should be numbered: 1 write, 2 memo line, 3 mail.                                                                                                                    | Medium   |
| A6  | Mentor, project, referral forms | No time estimate on the form itself (referral says "about 3 minutes" only on the First 12 page). Mentor form is about 10 fields.                                                    | Medium   |
| A7  | Success pages                   | "We will review it and write to you" has no time. Give a number of days once you can keep it.                                                                                       | Medium   |
| A8  | Error panel                     | "Check the required fields" does not say which field. Native browser messages only.                                                                                                 | Medium   |
| A9  | Long paragraphs                 | First-12 "who it is for" is 4 sentences at grade 9. Break into two lines.                                                                                                           | Low      |
| A10 | Idioms                          | "turn interest into opportunity", "Ground Up", "Make Your Mark", "Where it started". The skill replaces idioms with literal actions. These are brand lines, so decide deliberately. | Low      |
| A11 | Giant "12"                      | Decorative ghost number at 12% opacity carries no information and sits where a skimmer looks.                                                                                       | Low      |
| A12 | All headings                    | Every heading is the same heavy weight and size family, so skimming cannot tell levels apart.                                                                                       | Medium   |
| A13 | Eyebrow labels                  | 11 to 12 px all-caps tracked labels. Hard to scan at length.                                                                                                                        | Low      |
| A14 | Visible wins                    | Good: the operating board shows each seat's status. Keep it.                                                                                                                        | Strength |
| A15 | Matter-of-fact tone             | Good: no "oops" copy anywhere. Keep it.                                                                                                                                             | Strength |

## Suggested fix order (when you approve changes)

1. A1, A2, A3: move the refer button to the top of `/first-12`, end with one link, add a jump list.
2. E5: write one short teen-facing page.
3. E1, E2: split the law intro; add plain one-line glosses for EIN, UBI, fiscal sponsor, governor.
4. A5, A6, A8: numbered check steps, time estimates, field-level errors.
5. E4, E3: pick one noun and apply it.
6. A12: vary heading weight by level.
