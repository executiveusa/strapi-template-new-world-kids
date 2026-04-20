---
name: nwkids-content-engine
description: Bilingual content creation and scheduling workflow for New World Kids. Produces Instagram/Facebook posts in English and Spanish using NWKids brand voice, queues them in Postiz, and logs to Supabase. Run on the weekly content calendar cadence.
---

# NWKids Content Engine

## Brand Voice

**Personality:** Warm, direct, mission-driven, youth-centered.  
**Tone:** Conversational but purposeful. Stories over statistics. Youth are protagonists, not subjects.  
**Languages:** Always bilingual — English + Spanish side by side or in sequence.  
**Avoid:** Corporate jargon, NGO-speak, guilt-tripping, savior narratives.

---

## Content Pillars

| Pillar | Frequency | Description |
|--------|-----------|-------------|
| Youth Stories | 2x/week | A specific young person's experience or achievement |
| Program Glimpse | 1x/week | Behind-the-scenes of a current program activity |
| Impact Snapshot | 1x/week | A single concrete outcome (number, quote, moment) |
| Community Voice | 1x/week | Quote or story from a parent, teacher, or partner |
| Call to Action | 1x/week | Donate, volunteer, share, or apply |

---

## Weekly Content Workflow

### Step 1: Pull Program Context

Check `impact_projects` table for active programs:
```sql
SELECT name, description, location, status, impact_metrics
FROM impact_projects
WHERE status = 'active'
ORDER BY updated_at DESC
LIMIT 5;
```

### Step 2: Draft Post

For each content pillar slot, generate a post:

**Format:**
```
[EN]
<2-3 sentences, specific, vivid, action-oriented>

[ES]
<Accurate translation — not Google Translate, culturally adapted>

#NewWorldKids #YouthLeadership #NaturalezaYLiderazgo
```

**Character limits:**
- Instagram caption: 2,200 chars (aim for 150-200 for engagement)
- Facebook post: 63,206 chars (aim for 80-150 for best reach)

**Image guidance (include in payload for human to source):**
- Youth-facing, smiling, action shots
- Nature settings (forest, garden, water)
- No stock photos — real program photos only

### Step 3: Queue in Postiz

```bash
curl -X POST http://localhost:3200/api/v1/posts \
  -H "Authorization: Bearer ${POSTIZ_API_KEY}" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "...",
    "platforms": ["instagram", "facebook"],
    "scheduledAt": "2024-01-15T15:00:00Z",
    "status": "draft"
  }'
```

Posts are always created as `draft` — a human approves before publishing.

### Step 4: Log to Supabase

```sql
INSERT INTO agent_actions (
  agent_id, action_type, description, payload, status
) VALUES (
  'content-engine',
  'content_draft',
  'Weekly content batch — <YYYY-WW>',
  '{
    "posts": [
      {"pillar": "youth_story", "en": "...", "es": "...", "postiz_id": "..."},
      {"pillar": "program_glimpse", "en": "...", "es": "...", "postiz_id": "..."}
    ],
    "week": "YYYY-WW",
    "platforms": ["instagram", "facebook"]
  }',
  'pending'
);
```

---

## Sample Posts by Pillar

### Youth Story (EN/ES)
```
[EN]
Maria came to our forest camp not speaking a word of English. By week three, she was leading trail identification for her whole group — teaching the names of native plants she'd learned in both English and Spanish.

[ES]
María llegó a nuestro campamento en el bosque sin hablar ni una palabra de inglés. Para la tercera semana, ya lideraba la identificación de senderos para todo su grupo — enseñando los nombres de las plantas nativas que había aprendido en inglés y español.

#NewWorldKids #BilingualLeadership #ForestSchool
```

### Impact Snapshot
```
[EN]
47 youth completed our 6-week leadership program this summer. 100% reported feeling more confident speaking in front of their community.

[ES]
47 jóvenes completaron nuestro programa de liderazgo de 6 semanas este verano. El 100% reportó sentirse más seguro al hablar frente a su comunidad.

#ImpactReport #YouthLeadership #CommunityStrong
```

---

## Hashtag Bank

**English:** #NewWorldKids #YouthLeadership #NatureBased #CommunityEmpowerment #ForestSchool #UnderservedCommunities #NonprofitWork #YouthDevelopment

**Spanish:** #NuevoMundoNiños #LiderazgoJuvenil #NaturalezaYLiderazgo #EducaciónAlAireLibre #ComunidadFuerte #JóvenesLíderes
