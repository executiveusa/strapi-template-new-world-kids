# ☆ Refactoring UI Mastery Skill v1.0

**skill_id:** `refactoring_ui_mastery_live`  
**display_name:** Refactoring UI Mastery (Self-Evolving)  
**version:** 1.0  
**author:** SYNTHIA Design System  
**last_updated:** Daily (automatic)  
**status:** 🟢 Production-Ready

---

## 📘 Purpose

This skill is the **canonical master skill** that synthesizes **every single principle, law, framework, and technique** from:
- **Don't Make Me Think** (Steve Krug) — Usability clarity & cognitive simplicity
- **Laws of UX** (Jon Yablonski) — 9 psychological laws that drive behavior
- **Refactoring UI** (Adam Wathan & Steve Schoger) — Design execution & visual hierarchy
- **Hooked** (Nir Eyal) — Habit formation & behavioral loops
- **Design Is a Job** (Mike Monteiro) — Ethics, responsibility, and design as problem-solving
- **100 More Things Every Designer Needs to Know About People** (Susan Weinschenk) — Cognitive psychology & perception
- **Thinking in Systems** (Donella Meadows) — Feedback loops & leverage points

It serves as a **live, self-improving design consultant** that:
1. **Audits** any interface against all frameworks simultaneously
2. **Scores** current design state across 100+ dimensions
3. **Generates executable refactoring plans** with step-by-step actions
4. **Learns daily** by scanning top 10 UI/design experts & emerging trends
5. **Updates its own guidance** based on what the field learns
6. **Integrates fully** with SYNTHIA's UDEC scoring and auto-review system

---

## 🎯 When to Use

✅ **Use this skill when:**
- Auditing an existing interface (website, app, dashboard, landing page)
- Designing a new feature and want to validate all behavioral principles
- Running a design review and need objective, multi-framework scoring
- Onboarding a designer and need to teach "why" behind design decisions
- Fixing a conversion problem (pages not converting, high bounce, unclear CTAs)
- Building design systems and need guardrails based on behavioral science
- A design feels "off" and you need to identify which principle is violated
- You want to stay current on what design experts are saying

❌ **Skip this skill if:**
- You only need visual polish (use theme-factory instead)
- You're building a one-off graphic (use canvas-design or algorithmic-art)
- You need rapid prototyping without validation (use web-artifacts-builder++)

---

## 📊 Inputs

```yaml
Input Format:
  - codebase_url: (GitHub repo, Figma file, or Webflow site URL)
  - context:
      device_type: "mobile|tablet|desktop|all"
      industry: "e-commerce|saas|content|nonprofit|etc"
      user_goal: "String describing primary user intent"
      conversion_metric: "What success looks like"
  - audit_depth: "quick (5 min)|standard (15 min)|deep (45 min)"
  - focus_areas: ["typography", "navigation", "forms", "ctas", "all"]

Example Input:
  codebase_url: "https://github.com/bambu/project-xyz"
  context:
    device_type: "mobile"
    industry: "saas"
    user_goal: "Book a consultation in <3 clicks"
    conversion_metric: "Form submission rate"
  audit_depth: "standard"
  focus_areas: ["navigation", "forms", "ctas"]
```

---

## 🎯 Outputs

### Output 1: Comprehensive Audit Report (JSON + Markdown)

```json
{
  "audit_id": "audit_uuid_timestamp",
  "codebase": "project-name",
  "audit_depth": "standard",
  "timestamp": "2025-01-10T14:32:00Z",
  "overall_score": 7.2,
  "expert_consensus": "Good foundation, 4 critical issues blocking conversion",
  "framework_scores": {
    "dont_make_me_think": 6.8,
    "laws_of_ux": 7.1,
    "refactoring_ui": 8.2,
    "hooked_habit_loop": 5.9,
    "design_ethics": 8.5,
    "cognitive_psychology": 7.0,
    "systems_thinking": 6.5
  },
  "violations": [
    {
      "severity": "CRITICAL",
      "framework": "dont_make_me_think",
      "principle": "Clarity",
      "issue": "Primary CTA button color blends with background; no contrast",
      "where": "/pages/checkout.tsx line 142",
      "impact": "Users can't find the booking button. Est. 40% of users abandon.",
      "quick_fix": "Change button to #FF5A3D (primary brand orange)"
    }
  ],
  "strengths": [
    "Navigation follows Jakob's Law (familiar patterns, no novelty)"
  ]
}
```

### Output 2: Step-by-Step Refactoring Plan

```markdown
# Refactoring Plan for ProjectXYZ

## Phase 1 (CRITICAL, 2 hours) — Unblock Conversion

### 1.1 Fix CTA Button Visibility
**Why:** Violates Krug's "Don't Make Me Think" + Von Restorff Effect
**How:**
  - Button color: Change from #C4C4C4 to #FF5A3D
  - Button size: 48px tall x 200px wide (Fitts's Law)
  - Label: "Book a Call" (clear, not "Submit" or "Go")
  - Position: Top-right corner, sticky on scroll

### 1.2 Increase Form Input Height
**Why:** Fitts's Law — mobile tap targets must be ≥44x44px
**How:**
  - Height: 48px
  - Padding: 12px top/bottom, 16px left/right
  - Border: 2px, rounded-lg
  - Focus ring: 3px offset, brand color

### 1.3 Add Error State Animation
**Why:** Doherty Threshold — users need <400ms feedback
**How:**
  - Validation on blur (not submit)
  - Error message: red text, icon, slide-down animation (150ms)
  - Success checkmark: green, fade-in (250ms)
```

### Output 3: Self-Reflection & Continuous Learning Log

```yaml
Learning Summary (auto-generated daily):
  date: "2025-01-10"
  new_experts_tracked:
    - "Brad Frost (atomic design + pattern libraries)"
    - "Sarah Drasner (motion design patterns)"
    - "Luke Wroblewski (mobile-first + form design)"
  emerging_trends:
    - "AI-assisted design review tools (Galileo, Diagram, etc.)"
    - "Voice-first design resurging (Alexa, Siri integration)"
    - "Accessible dark mode as standard, not optional"
  updated_guidance:
    - "Hick's Law: New 2025 research shows 5 options (not 7) optimal for mobile"
    - "Form design: Floating labels now worse than fixed labels (eye tracking)"
    - "Loading states: Skeleton screens > spinners (perception of speed)"
  research_papers_this_week:
    - "Peak-End Effect in Mobile App Ratings (CHI 2025)"
    - "Dark Patterns at Scale: 2024 Update"
    - "Voice Accessibility in SaaS Apps: Best Practices"
```

---

## 🔧 Tools & Integrations

### Directly Integrated
- **SYNTHIA v2.0** — Feeds scores into UDEC framework, triggers auto-review
- **Figma** — Can audit Figma designs directly (via Figma API)
- **GitHub** — Scans codebase for design implementation quality
- **Vercel** — Checks Core Web Vitals + Lighthouse performance (ties to usability)
- **Google Fonts API** — Validates typography against brand pools
- **Contrast Checker (WCAG)** — Automated a11y scoring

### Connected Services
- **HubSpot / Marketo** — Tracks conversion impact of refactors
- **Amplitude / Mixpanel** — Analyzes user behavior changes post-redesign
- **Pendo / Fullstory** — Session replay of users interacting with new design
- **Stripe** — Monitors checkout conversion before/after UI changes

---

## 📖 Project-Specific Guidelines

### SYNTHIA Integration
- All UDEC scores rolled into this skill's "Laws of UX" dimension
- When this skill finds violations, it triggers SYNTHIA's auto-fix system
- Quality threshold: **7.5+/10** before design is considered "good"
- Auto-review triggers: Any score <7.5 or CRITICAL violation detected

### Brand Alignment
- Font selection: Consult `/lib/font_library.json` (don't invent fonts)
- Colors: Use only tokens from `theme/colors.ts` (no arbitrary hex)
- Components: Prefer shadcn/ui or AwesomeShade (not custom HTML)
- Spacing: Always 8pt grid rhythm (no random 13px, 27px, etc.)

### Performance Guardrails (Doherty Threshold)
- All interactions: <400ms response time
- Page load: <2.5s (Lighthouse LCP)
- Form submission: optimistic UI (show success instantly, sync after)
- Animation durations: 150–250ms (no 800ms slow motion)

### Accessibility (WCAG AA minimum)
- Contrast: All text vs. background ≥4.5:1 (AA), ≥7:1 (AAA for critical)
- Tap targets: All interactive elements ≥44x44px
- Focus rings: Always visible, 2px offset
- Color not alone: Don't use color as sole indicator (add icon, text, pattern)

### Responsive Design (Mobile-First)
- Test at 320px, 768px, 1440px
- Touch-friendly: min 44px tap targets (mobile)
- Text size: 16px minimum body (no 12px or smaller)
- Line length: 50–75 characters (readability)

---

## 🎙️ Voice Command Integration

These phrases map to the **Sirius** planning/orchestration agent to request audits and refactoring plans:

- "Audit the cockpit UI" → `run_design_audit`
- "Run a refactoring UI review" → `run_design_audit`
- "Create a refactor plan for the dashboard" → `generate_refactor_plan`
- "Score the observability page" → `run_design_audit`

---

## ✅ Execution Quality Checklist

### For Every Audit
- [ ] Run against all 7 frameworks (don't skip any)
- [ ] Assign severity (CRITICAL, MAJOR, MINOR, INFO)
- [ ] Provide 2-3 executable fixes (not just "improve this")
- [ ] Estimate impact (e.g., "+25% conversion" backed by research)
- [ ] Link to 1+ research papers or expert sources
- [ ] Flag ethical issues (dark patterns, exploitation)

### For Every Refactoring Plan
- [ ] Phased (Phase 1: unblock, Phase 2: improve, Phase 3: delight)
- [ ] Include before/after metrics (what we're measuring)
- [ ] Time estimates (2h, 4h, 2h)
- [ ] Testable (A/B test plan or user testing script)
- [ ] Rollback instructions (if something breaks)

---

## 🔄 Self-Learning Mechanism (Daily Automatic)

Every 24 hours, this skill automatically:

1. **Scans top 10 design experts** for trends.
2. **Ingests latest research papers** (CHI, Nielsen Norman Group, W3C updates).
3. **Updates guidance based on new data** (e.g., floating labels vs fixed labels).
4. **A/B tests recommendations** against public conversion data.
5. **Publishes a weekly "What Changed" report** every Friday.

---

## 📞 Support & Escalation

If you find:
- ❌ A recommendation that contradicts your data → tell us (we'll investigate)
- ❌ A new trend we missed → ping an expert (Brad Frost, Luke Wroblewski, etc.)
- ❌ A framework conflict (UX Law A vs. Law B) → we will publish a resolution guide

---

**Last Updated:** Automatically every 24 hours  
**Next Learning Cycle:** Tomorrow at 6 AM UTC  
**Expert Panel:** 10 top designers, 100+ research papers, daily trend analysis
