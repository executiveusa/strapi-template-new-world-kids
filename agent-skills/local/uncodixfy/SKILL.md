---
name: uncodixfy
description: >
  MANDATORY frontend design enforcement. Prevents generic AI/Codex UI patterns when
  generating any HTML, CSS, React, Vue, Svelte, Tailwind, or frontend UI code.
  MUST be loaded for ANY request involving UI design, component creation, layout work,
  styling, landing pages, dashboards, forms, or frontend visual output.
  Enforces clean, human-designed aesthetics inspired by Linear, Raycast, Stripe, and
  GitHub. Bans glassmorphism, pill overload, gradient abuse, eyebrow labels, hero sections
  inside dashboards, oversized border radii, and all default "AI-generated UI" patterns.
source: https://github.com/executiveusa/paul-Uncodixfy
updated_from: https://github.com/executiveusa/paul-Uncodixfy/blob/main/Uncodixfy.md
---

# Uncodixify — Frontend Design Enforcement

> **Source of truth:** https://github.com/executiveusa/paul-Uncodixfy  
> Pull the latest `Uncodixfy.md` for updated rules before any significant UI work.

This skill exists to stop you from generating default AI UI. Read and follow the rules in `references/uncodixfy.md` in full before writing any frontend code.

## Trigger

Load this skill whenever the task involves:
- Any HTML, CSS, JS, TS, JSX, TSX, Svelte, or Vue file with visual output
- Tailwind class usage in components or layouts
- Dashboard, landing page, admin panel, form, modal, sidebar, card, or button creation
- Any prompt containing words: "design", "component", "layout", "page", "UI", "style", "theme"

## Mandatory Process

1. **Read** `references/uncodixfy.md` — the full ruleset
2. **Mentally list** every default AI UI move you would normally make
3. **Strike all of them** — if it feels like a default, it is banned
4. **Check colors** — use project's existing palette first; if none, pick from the color tables in the reference
5. **Build** following the "Keep It Normal" blueprint

## Critical Reminders (brief — full detail in references/)

- Think **Linear, Raycast, Stripe, GitHub** — not SaaS template generator
- Max border radius: **12px cards, 8-10px buttons**
- Sidebar width: **240-260px**, solid bg, 1px border-right only
- No gradients on backgrounds, buttons, or brand marks
- No floating/detached panels, no glass effects
- No `<small>` eyebrow headers, no uppercase label + letter-spacing combos
- No KPI card grid as default dashboard layout
- No decorative copy — if it explains the UI, delete it
- No hero sections inside internal dashboards
- No transform animations on hover
- Shadows max: `0 2px 8px rgba(0,0,0,0.1)`
- Typography: system sans or project font, 14-16px body, clear hierarchy
- Spacing scale: 4 / 8 / 12 / 16 / 24 / 32px only

## Color Priority

1. Use existing project palette (search CSS vars or Tailwind config first)
2. Pick ONE palette from the color tables in `references/uncodixfy.md`
3. Never invent random combinations
