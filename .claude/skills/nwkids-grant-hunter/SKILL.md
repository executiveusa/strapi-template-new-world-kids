---
name: nwkids-grant-hunter
description: Autonomous grant research and application workflow for New World Kids. Covers funder discovery, fit assessment, LOI drafting, deadline tracking, and Supabase logging. Run when a new grant opportunity is identified or a deadline is within 30 days.
---

# NWKids Grant Hunter

## About NWKids (for grant applications)

**Organization:** New World Kids  
**EIN:** 46-4779591  
**Fiscal Sponsor:** Healthy Schools Initiative (HSI)  
**Locations:** Seattle, WA + Puerto Vallarta, MX  
**Mission:** Expand opportunity for youth in underserved communities through nature-based education, digital storytelling, and community leadership programs.  
**Population served:** Youth ages 8–18 from low-income families, primarily Latino and immigrant communities  
**Annual budget:** ~$85,000 (fiscal year)  
**Staff:** 2 FTE + volunteers  

---

## Workflow

### Step 1: Funder Research

When a grant opportunity is identified, gather:
- Funder name, website, and program page URL
- Funding priorities and focus areas
- Geographic restrictions (must include WA or MX)
- Eligibility: 501c3 or fiscal sponsor accepted?
- Award range: min/max/typical
- Deadline: letter of inquiry (LOI) and full proposal dates
- Past grantees (check for mission alignment)

### Step 2: Fit Assessment

Score the opportunity on:

| Criterion | Weight | Notes |
|-----------|--------|-------|
| Mission alignment | 40% | Does it match youth, education, environmental, Latino focus? |
| Geographic match | 20% | Seattle or Puerto Vallarta in scope? |
| Award size | 20% | $5K–$75K sweet spot for NWKids scale |
| Fiscal sponsor accepted | 10% | HSI as fiscal sponsor must be eligible |
| Deadline feasibility | 10% | At least 14 days to apply? |

Score > 70% → recommend applying. Score 50–70% → flag for ED review.

### Step 3: Log to Supabase

```sql
INSERT INTO agent_actions (
  agent_id, action_type, description, payload, status
) VALUES (
  'grant-hunter',
  'grant_tracked',
  'Identified: <Funder Name> — <Program Name>',
  '{
    "funder": "...",
    "program": "...",
    "url": "...",
    "deadline": "YYYY-MM-DD",
    "award_range": "...",
    "fit_score": 85,
    "recommendation": "apply"
  }',
  'completed'
);
```

### Step 4: Draft LOI

If fit score > 70%, draft a 1-page Letter of Inquiry:

**Structure:**
1. Opening paragraph — who we are and why we're writing (2-3 sentences)
2. Problem statement — specific, data-backed, community-rooted (1 paragraph)
3. Proposed project — what we'll do, for whom, where (1 paragraph)
4. Budget ask — specific dollar amount and use of funds (2-3 sentences)
5. Closing — outcome, alignment with funder priorities, next step (2-3 sentences)

**Voice:** Specific, mission-forward, youth-centered. No NGO-speak. No buzzwords. Youth are protagonists.

**Always include:**
- EIN: 46-4779591
- Fiscal sponsor: Healthy Schools Initiative
- Geographic specificity: neighborhood names, not just "Seattle"

### Step 5: Log Draft

```sql
INSERT INTO agent_actions (
  agent_id, action_type, description, payload, status
) VALUES (
  'grant-hunter',
  'grant_draft',
  'LOI drafted: <Funder Name>',
  '{"loi_text": "...", "word_count": 450, "deadline": "YYYY-MM-DD"}',
  'pending'  -- pending = awaiting human review
);
```

---

## Grant Database (Priority Funders)

Search these sources first:
- Grants.gov (federal)
- WA State Department of Commerce — Youth Development
- Seattle Office of Economic Development
- King County Youth Activity Fund
- Robert Wood Johnson Foundation
- Marguerite Casey Foundation (Seattle-based)
- Fondo Semillas (Mexico-focused)
- Packard Foundation (conservation + youth)

---

## Deadline Alert Rule

Run weekly check:
```sql
SELECT payload->>'funder', payload->>'deadline'
FROM agent_actions
WHERE action_type = 'grant_tracked'
  AND status != 'archived'
  AND (payload->>'deadline')::date BETWEEN NOW() AND NOW() + INTERVAL '30 days';
```

If any row returned → trigger full application workflow for that grant.
