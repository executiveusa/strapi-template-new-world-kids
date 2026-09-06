# New World Kids — Photo Archive / Graph / ICM Handoff

Status: READY FOR NEXT PHASE

## Objective

Turn the existing New World Kids / Proyecto Indigo Azul media archive into a verified, queryable evidence graph that can safely feed the website, Field Journal, social publishing, montage production, and future agent workflows.

## Governing rule

No media becomes public proof until it has provenance.

Every asset must preserve:

- WHO
- WHERE
- WHEN
- PROJECT / COMMUNITY
- ORIGINAL SOURCE
- WHAT THE ASSET PROVES
- WHAT THE ASSET DOES NOT PROVE
- RIGHTS / USAGE STATUS
- REVIEW STATUS

Proyecto Indigo Azul and Seattle / First 12 remain distinct evidence domains. Indigo footage must never be used to imply Seattle outcomes. Nature footage may establish place, continuity, atmosphere, or stewardship, but not youth participation unless the frame itself verifies that participation.

## ICM structure

### I — Inputs

Primary source archive:

`NEW WORLD KIDS — MEDIA ACCESS`

Current media funnel:

1. `00_INBOX`
2. `01_PROOF_INDIGO_AZUL`
3. `02_FIRST_12_SEATTLE`
4. `03_MENTORS_PROJECTS`
5. `04_SITE_SELECTS`
6. `05_MONTAGE_SELECTS`
7. `99_ARCHIVE`

Known legacy Indigo source includes `One Drive Total Dump → Documents → Culture Shock Backup Footage` and the later Indigo Azul archive. Files must be inspected rather than classified from filenames alone.

### C — Classification / Context

Each asset receives a manifest record with:

```text
asset_id
source_file_id
source_path
filename
media_type
captured_at
location
community
people
project
source_platform
source_url
rights_status
visual_summary
proof_class
proof_statement
non_proof_statement
narrative_lane
website_candidate
journal_candidate
social_candidate
montage_candidate
review_status
reviewed_by
checksum
```

Proof classes:

- VERIFIED_PROOF
- CONTEXT
- ATMOSPHERE
- UNKNOWN
- REJECT

Narrative lanes:

- WE_STARTED_HERE — Proyecto Indigo Azul history
- STILL_GROWING — place / nature / continuity
- BRING_IT_HOME — Seattle / First 12 / mentors / opportunities
- BUILDING_IN_PUBLIC — current progress, interviews, setbacks, next steps

### M — Memory / Map

Build a graph that links:

`ASSET → PERSON → PLACE → DATE → PROJECT → COMMUNITY → EVENT → TOPIC → CLAIM → PUBLICATION`

The graph should make questions answerable without rewatching the entire archive, for example:

- Which verified Indigo clips show youth + community participation?
- Which Seattle assets are safe to use for First 12 recruitment?
- Which assets support a specific Journal article?
- Which people or institutions appear repeatedly across the archive?
- Which clips are approved for a 12–15 second hero montage?
- Which claims have no visual proof yet?

## Execution loop

`INGEST → HASH → EXTRACT METADATA → VISUAL REVIEW → CLASSIFY → GRAPH → HUMAN VERIFY → SELECT → PUBLISH → TRACE BACK`

### 1. Ingest

Index file metadata without moving or deleting originals.

### 2. Hash

Generate stable checksums so duplicates can be detected without losing provenance.

### 3. Extract metadata

Capture filename, path, timestamps, file type, dimensions, duration, and available embedded metadata.

### 4. Visual review

Inspect actual frames / media. Do not infer content from filenames.

### 5. Classify

Assign proof class, narrative lane, people/place/project links, and candidate destinations.

### 6. Graph

Create relationships only from verified evidence. Unknown relationships remain explicitly unknown.

### 7. Human verify

Any asset used publicly as proof receives a final review before publication.

### 8. Select

Copy approved assets forward through the funnel:

`archive → proof folder → site selects → montage selects`

No destructive reorganization.

### 9. Publish

Website, Journal, Postiz / social, and montage workflows consume only approved manifest records.

### 10. Trace back

Every public use must be traceable to the original asset and source location.

## Graph model

Recommended node types:

- Asset
- Person
- Organization
- Place
- Community
- Project
- Event
- Date
- Topic
- Claim
- Publication

Recommended edges:

- `CAPTURED_AT`
- `SHOWS_PERSON`
- `SHOWS_PLACE`
- `BELONGS_TO_PROJECT`
- `RELATES_TO_COMMUNITY`
- `DOCUMENTS_EVENT`
- `SUPPORTS_CLAIM`
- `DOES_NOT_SUPPORT_CLAIM`
- `SELECTED_FOR`
- `PUBLISHED_IN`
- `DERIVED_FROM`
- `DUPLICATE_OF`

## Website integration

Current reserved media surfaces are intentional. Replace them only with verified assets from the manifest.

Priority order:

1. Homepage hero montage
2. `NEW WORLD KIDS X INDIGO AZUL PROJECT`
3. `NEW WORLD KIDS X FIRST 12`
4. Build-in-public archive
5. Field Journal supporting media

The visual system should not be redesigned during media ingestion. Photography and film now provide the primary color and emotional energy.

## First execution slice

Start with one bounded source folder rather than the entire archive.

Recommended first slice:

`Culture Shock Backup Footage → 2019-09`

For each file:

1. enumerate
2. inspect
3. create manifest record
4. classify proof vs atmosphere
5. add graph relationships
6. human-review candidates
7. copy only verified selects into `01_PROOF_INDIGO_AZUL`
8. promote strongest candidates to `04_SITE_SELECTS`
9. promote montage candidates to `05_MONTAGE_SELECTS`

## Acceptance gate

The archive system is not considered operational until:

- every selected public asset has source provenance
- Indigo / Seattle provenance cannot be accidentally merged
- duplicate detection exists
- original files remain untouched
- graph relationships are reviewable
- unknown facts remain unknown
- a public asset can be traced back to its source file
- the hero montage can be assembled entirely from approved manifest records

## Next action

Index and visually review the first bounded Indigo Azul folder, produce the initial manifest + graph slice, and return a ranked shortlist of verified media candidates for the homepage and Story archive.
