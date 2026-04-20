---
name: uncodixfy
description: Prevents generic AI/Codex UI patterns when generating frontend code. Use this skill whenever generating HTML, CSS, React, Vue, Svelte, or any frontend UI code to enforce clean, human-designed aesthetics inspired by Linear, Raycast, Stripe, and GitHub instead of typical AI-generated UI. Invoke with /uncodixfy.
---

# Uncodixify

This document exists to teach you how to act as non-Codex as possible when building UI.

Codex UI is the default AI aesthetic: soft gradients, floating panels, eyebrow labels, decorative copy, hero sections in dashboards, oversized rounded corners, transform animations, dramatic shadows, and layouts that try too hard to look premium. It's the visual language that screams "an AI made this" because it follows the path of least resistance.

This file is your guide to break that pattern. Everything listed below is what Codex UI does by default. Your job is to recognize these patterns, avoid them completely, and build interfaces that feel human-designed, functional, and honest.

When you read this document, you're learning what NOT to do. The banned patterns are your red flags. The normal implementations are your blueprint. Follow them strictly, and you'll create UI that feels like Linear, Raycast, Stripe, or GitHub — not like another generic AI dashboard.

This is how you Uncodixify.

---

## Keep It Normal (Uncodexy-UI Standard)

- Sidebars: normal (240-260px fixed width, solid background, simple border-right, no floating shells, no rounded outer corners)
- Headers: normal (simple text, no eyebrows, no uppercase labels, no gradient text, just h1/h2 with proper hierarchy)
- Sections: normal (standard padding 20-30px, no hero blocks inside dashboards, no decorative copy)
- Navigation: normal (simple links, subtle hover states, no transform animations, no badges unless functional)
- Buttons: normal (solid fills or simple borders, 8-10px radius max, no pill shapes, no gradient backgrounds)
- Cards: normal (simple containers, 8-12px radius max, subtle borders, no shadows over 8px blur, no floating effect)
- Forms: normal (standard inputs, clear labels above fields, no fancy floating labels, simple focus states)
- Inputs: normal (solid borders, simple focus ring, no animated underlines, no morphing shapes)
- Modals: normal (centered overlay, simple backdrop, no slide-in animations, straightforward close button)
- Dropdowns: normal (simple list, subtle shadow, no fancy animations, clear selected state)
- Tables: normal (clean rows, simple borders, subtle hover, no zebra stripes unless needed, left-aligned text)
- Lists: normal (simple items, consistent spacing, no decorative bullets, clear hierarchy)
- Tabs: normal (simple underline or border indicator, no pill backgrounds, no sliding animations)
- Badges: normal (small text, simple border or background, 6-8px radius, no glows, only when needed)
- Avatars: normal (simple circle or rounded square, no decorative borders, no status rings unless functional)
- Icons: normal (simple shapes, consistent size 16-20px, no decorative icon backgrounds, monochrome or subtle color)
- Typography: normal (system fonts or simple sans-serif, clear hierarchy, no mixed serif/sans combos, readable sizes 14-16px body)
- Spacing: normal (consistent scale 4/8/12/16/24/32px, no random gaps, no excessive padding)
- Borders: normal (1px solid, subtle colors, no thick decorative borders, no gradient borders)
- Shadows: normal (subtle 0 2px 8px rgba(0,0,0,0.1) max, no dramatic drop shadows, no colored shadows)
- Transitions: normal (100-200ms ease, no bouncy animations, no transform effects, simple opacity/color changes)
- Layouts: normal (standard grid/flex, no creative asymmetry, predictable structure, clear content hierarchy)
- Grids: normal (consistent columns, standard gaps, no creative overlaps, responsive breakpoints)
- Flexbox: normal (simple alignment, standard gaps, no creative justify tricks)
- Containers: normal (max-width 1200-1400px, centered, standard padding, no creative widths)
- Panels: normal (simple background differentiation, subtle borders, no floating detached panels, no glass effects)
- Toolbars: normal (simple horizontal layout, standard height 48-56px, clear actions, no decorative elements)
- Footers: normal (simple layout, standard links, no decorative sections, minimal height)

Think Linear. Think Raycast. Think Stripe. Think GitHub. They don't try to grab attention. They just work. Stop playing hard to get. Make normal UI.

- A landing page needs its sections. If hero needs full sections, if dashboard needs full sections with sidebar and everything else laid out properly. DO NOT invent a new layout.
- In your internal reasoning act as if you don't see this, list all the stuff you would do related to UI (that goes against this schema), AND DON'T DO IT — make it follow Uncodixfy!
- Try to replicate figma/designer made components, don't invent your own.

---

## Hard No

- Everything you are used to doing and is a basic "YES" to you.
- No oversized rounded corners.
- No pill overload.
- No floating glassmorphism shells as the default visual language.
- No soft corporate gradients used to fake taste.
- No generic dark SaaS UI composition.
- No decorative sidebar blobs.
- No "control room" cosplay unless explicitly requested.
- No serif headline + system sans fallback combo as a shortcut to "premium."
- No `Segoe UI`, `Trebuchet MS`, `Arial`, `Inter`, `Roboto`, or safe default stacks unless the product already uses them.
- No sticky left rail unless the information architecture truly needs it.
- No metric-card grid as the first instinct.
- No fake charts that exist only to fill space.
- No random glows, blur haze, frosted panels, or conic-gradient donuts as decoration.
- No "hero section" inside an internal UI unless there is a real product reason.
- No alignment that creates dead space just to look expensive.
- No overpadded layouts.
- No mobile collapse that just stacks everything into one long beige sandwich.
- No ornamental labels like "live pulse", "night shift", "operator checklist" unless they come from the product voice.
- No generic startup copy.
- No style decisions made because they are easy to generate.
- No `<small>` headers, no eyebrow labels, no rounded `span`s.
- Colors going towards blue — NOPE, bad. Dark muted colors are best.

Headlines of this form are **not allowed**:
```html
<!-- BANNED -->
<div class="headline">
  <small>Team Command</small>
  <h2>One place to track what matters today.</h2>
</div>
```

This pattern is **THE BIGGEST NO**:
```html
<!-- BANNED -->
<div class="team-note">
  <small>Focus</small>
  <strong>Keep updates brief, blockers visible, and next actions easy to spot.</strong>
</div>
```

---

## Specifically Banned (Based on Common AI Mistakes)

- Border radii in the 20px–32px range across everything
- Repeating the same rounded rectangle on sidebar, cards, buttons, and panels
- Floating detached sidebar with rounded outer shell
- Canvas chart placed in a glass card with no product-specific reason
- Donut chart paired with hand-wavy percentages
- UI cards using glows instead of hierarchy
- "Premium dark mode" = blue-black gradients plus cyan accents
- Eyebrow labels in uppercase with letter-spacing
- Hero sections inside dashboards
- Decorative copy like "Operational clarity without the clutter" as page headers
- Transform animations on hover (translateX)
- Dramatic box shadows (0 24px 60px rgba(0,0,0,0.35))
- Pipeline bars with gradient fills
- KPI cards in a grid as the default dashboard layout
- Tables with tag badges for every status
- Brand marks with gradient backgrounds
- Multiple nested panel types (panel, panel-2, rail-panel, table-panel)
- Trend indicators with colored text (trend-up, trend-flat classes)

---

## Rule

If a UI choice feels like a default AI UI move, ban it and pick the harder, cleaner option.

Colors should stay calm, not fight.

**Color selection priority:**
1. **Highest priority:** Use the existing colors from the user's project if they are provided (search a few files to find them).
2. If the project does not provide a palette, get inspired from one of the predefined palettes below.
3. Do **not** invent random color combinations unless explicitly requested.

---

## NWKids Project Colors

```
Forest Dark:   #1a2e1a  (background)
Deep Forest:   #0f1a0f  (deeper bg)
Sage:          #4a7a4a  (primary)
Gold:          #c9a227  (accent)
Cream:         #f5f0e8  (text on dark)
Earth Brown:   #8b6914  (secondary)
```

---

## Reference Palettes (Dark)

| Palette | Background | Surface | Primary | Accent | Text |
|---------|-----------|---------|---------|--------|------|
| Void Space | `#0d1117` | `#161b22` | `#58a6ff` | `#f78166` | `#c9d1d9` |
| Graphite Pro | `#18181b` | `#27272a` | `#a855f7` | `#14b8a6` | `#fafafa` |
| Obsidian Depth | `#0f0f0f` | `#1a1a1a` | `#00d4aa` | `#ff6b9d` | `#f5f5f5` |
| Charcoal Studio | `#1c1c1e` | `#2c2c2e` | `#0a84ff` | `#ff375f` | `#f2f2f7` |
