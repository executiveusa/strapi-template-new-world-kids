# Uncodixify — Full Design Ruleset

> **Canonical source:** https://github.com/executiveusa/paul-Uncodixfy/blob/main/Uncodixfy.md  
> This file is a snapshot. Pull the repo for the absolute latest rules.

---

## What Codex UI Is (and why you must avoid it)

Codex UI = the default AI aesthetic: soft gradients, floating panels, eyebrow labels, decorative copy, hero sections in dashboards, oversized rounded corners, transform animations, dramatic shadows, and layouts that try too hard to look premium.

It screams "an AI made this." Your job is to break that pattern entirely.

Goal: build interfaces that feel like **Linear, Raycast, Stripe, GitHub** — designed by humans, functional, honest.

---

## Keep It Normal — Full Component Spec

| Component | Rule |
|-----------|------|
| Sidebars | 240-260px fixed width, solid background, simple border-right, no floating shells, no rounded outer corners |
| Headers | Simple text, no eyebrows, no uppercase labels, no gradient text, h1/h2 with proper hierarchy only |
| Sections | Standard padding 20-30px, no hero blocks inside dashboards, no decorative copy |
| Navigation | Simple links, subtle hover states, no transform animations, no badges unless functional |
| Buttons | Solid fills or simple borders, 8-10px radius max, no pill shapes, no gradient backgrounds |
| Cards | Simple containers, 8-12px radius max, subtle borders, no shadows over 8px blur, no floating effect |
| Forms | Standard inputs, clear labels above fields, no fancy floating labels, simple focus states |
| Inputs | Solid borders, simple focus ring, no animated underlines, no morphing shapes |
| Modals | Centered overlay, simple backdrop, no slide-in animations, straightforward close button |
| Dropdowns | Simple list, subtle shadow, no fancy animations, clear selected state |
| Tables | Clean rows, simple borders, subtle hover, no zebra stripes unless needed, left-aligned text |
| Lists | Simple items, consistent spacing, no decorative bullets, clear hierarchy |
| Tabs | Simple underline or border indicator, no pill backgrounds, no sliding animations |
| Badges | Small text, simple border or background, 6-8px radius, no glows, only when needed |
| Avatars | Simple circle or rounded square, no decorative borders, no status rings unless functional |
| Icons | Simple shapes, consistent size 16-20px, no decorative icon backgrounds, monochrome or subtle color |
| Typography | System fonts or simple sans-serif, clear hierarchy, no mixed serif/sans combos, readable sizes 14-16px body |
| Spacing | Consistent scale 4/8/12/16/24/32px, no random gaps, no excessive padding |
| Borders | 1px solid, subtle colors, no thick decorative borders, no gradient borders |
| Shadows | Subtle `0 2px 8px rgba(0,0,0,0.1)` max, no dramatic drop shadows, no colored shadows |
| Transitions | 100-200ms ease, no bouncy animations, no transform effects, simple opacity/color changes |
| Layouts | Standard grid/flex, no creative asymmetry, predictable structure, clear content hierarchy |
| Grids | Consistent columns, standard gaps, no creative overlaps, responsive breakpoints |
| Flexbox | Simple alignment, standard gaps, no creative justify tricks |
| Containers | max-width 1200-1400px, centered, standard padding, no creative widths |
| Panels | Simple background differentiation, subtle borders, no floating detached panels, no glass effects |
| Toolbars | Simple horizontal layout, standard height 48-56px, clear actions, no decorative elements |
| Footers | Simple layout, standard links, no decorative sections, minimal height |
| Breadcrumbs | Simple text with separators, no fancy styling, clear hierarchy |

---

## Hard No — Absolute Bans

- Oversized rounded corners (>12px on cards, >10px on buttons)
- Pill overload
- Floating glassmorphism shells as default visual language
- Soft corporate gradients used to fake taste
- Generic dark SaaS UI composition
- Decorative sidebar blobs
- "Control room" cosplay unless explicitly requested
- Serif headline + system sans fallback combo as "premium" shortcut
- `Segoe UI`, `Trebuchet MS`, `Arial`, `Inter`, `Roboto` safe defaults unless project already uses them
- Sticky left rail unless information architecture truly needs it
- Metric-card grid as first instinct
- Fake charts that exist only to fill space
- Random glows, blur haze, frosted panels, or conic-gradient donuts as decoration
- Hero section inside internal UI without real product reason
- Alignment that creates dead space just to look expensive
- Overpadded layouts
- Mobile collapse that stacks everything into one long beige sandwich
- Ornamental labels like "live pulse", "night shift", "operator checklist" unless from product voice
- Generic startup copy
- Style decisions made because they are easy to generate
- Colors going toward blue — **bad**. Dark muted colors are best.

### Banned HTML Patterns

This pattern is **NOT allowed**:
```html
<div class="headline">
  <small>Team Command</small>
  <h2>One place to track what matters today.</h2>
  <p>The layout stays strict and readable.</p>
</div>
```

This is **THE BIGGEST NO**:
```html
<div class="team-note">
  <small>Focus</small>
  <strong>Keep updates brief, blockers visible, and next actions easy to spot.</strong>
</div>
```

- `<small>` headers: **NOT allowed**
- Rounded `span`s: **NOT allowed**

---

## Specifically Banned Patterns (From Known Mistakes)

- Border radii in the 20-32px range across everything
- Repeating same rounded rectangle on sidebar, cards, buttons, and panels
- Sidebar ~280px with brand block on top and nav links below
- Floating detached sidebar with rounded outer shell
- Canvas chart placed in glass card with no product reason
- Donut chart paired with hand-wavy percentages
- UI cards using glows instead of hierarchy
- Mixed alignment logic where content hugs left edge and floats center-ish
- Overuse of muted gray-blue text that weakens contrast
- "Premium dark mode" = blue-black gradients + cyan accents
- UI typography that feels like a template instead of a brand
- Eyebrow labels: "MARCH SNAPSHOT" uppercase with letter-spacing
- Hero sections inside dashboards with full hero-strip and decorative copy
- Decorative copy like "Operational clarity without the clutter" as page headers
- Section notes and mini-notes everywhere explaining what the UI does
- Transform animations on hover (e.g. `translateX(2px)` on nav links)
- Dramatic box shadows (e.g. `0 24px 60px rgba(0,0,0,0.35)`)
- Status indicators with `::before` pseudo-elements creating colored dots
- Muted labels with uppercase + letter-spacing
- Pipeline bars with gradient fills (e.g. `linear-gradient(90deg, var(--primary), #4fe0c0)`)
- KPI cards in a grid as the default dashboard layout
- "Team focus" or "Recent activity" panels with decorative internal copy
- Tables with tag badges for every status
- Workspace blocks in sidebar with call-to-action buttons
- Brand marks with gradient backgrounds (e.g. `linear-gradient(135deg, #2a2a2a, #171717)`)
- Nav badges showing counts or "Live" status
- Quota/usage panels with progress bars
- Footer lines with meta information (e.g. "Northstar dashboard • dark mode • single-file HTML")
- Trend indicators with colored text (trend-up, trend-flat classes)
- Rail panels on the right side with "Today" schedule
- Multiple nested panel types (panel, panel-2, rail-panel, table-panel)

---

## The Rule

> If a UI choice feels like a default AI UI move, ban it and pick the harder, cleaner option.

- Colors should stay calm, not fight.
- In your internal reasoning: list all the default moves you would make — then don't do any of them.
- Try to replicate Figma/designer-made components. Don't invent your own.
- A landing page needs its sections. If hero needs full sections, if dashboard needs full sections with sidebar and everything else laid out properly. **DO NOT invent a new layout.**

---

## Color Selection — Priority Order

1. **Highest priority:** Use the existing colors from the user's project (search CSS vars, Tailwind config, or existing stylesheets)
2. If no project palette exists, get inspired from one of the predefined palettes below
3. **Do NOT invent random color combinations** unless explicitly requested
4. Do not always choose the first palette — select one that fits the project mood

---

## Dark Color Palettes

| Palette | Background | Surface | Primary | Secondary | Accent | Text |
|---------|-----------|---------|---------|-----------|--------|------|
| Midnight Canvas | `#0a0e27` | `#151b3d` | `#6c8eff` | `#a78bfa` | `#f472b6` | `#e2e8f0` |
| Obsidian Depth | `#0f0f0f` | `#1a1a1a` | `#00d4aa` | `#00a3cc` | `#ff6b9d` | `#f5f5f5` |
| Slate Noir | `#0f172a` | `#1e293b` | `#38bdf8` | `#818cf8` | `#fb923c` | `#f1f5f9` |
| Carbon Elegance | `#121212` | `#1e1e1e` | `#bb86fc` | `#03dac6` | `#cf6679` | `#e1e1e1` |
| Deep Ocean | `#001e3c` | `#0a2744` | `#4fc3f7` | `#29b6f6` | `#ffa726` | `#eceff1` |
| Charcoal Studio | `#1c1c1e` | `#2c2c2e` | `#0a84ff` | `#5e5ce6` | `#ff375f` | `#f2f2f7` |
| Graphite Pro | `#18181b` | `#27272a` | `#a855f7` | `#ec4899` | `#14b8a6` | `#fafafa` |
| Void Space | `#0d1117` | `#161b22` | `#58a6ff` | `#79c0ff` | `#f78166` | `#c9d1d9` |
| Twilight Mist | `#1a1625` | `#2d2438` | `#9d7cd8` | `#7aa2f7` | `#ff9e64` | `#dcd7e8` |
| Onyx Matrix | `#0e0e10` | `#1c1c21` | `#00ff9f` | `#00e0ff` | `#ff0080` | `#f0f0f0` |

## Light Color Palettes

| Palette | Background | Surface | Primary | Secondary | Accent | Text |
|---------|-----------|---------|---------|-----------|--------|------|
| Cloud Canvas | `#fafafa` | `#ffffff` | `#2563eb` | `#7c3aed` | `#dc2626` | `#0f172a` |
| Pearl Minimal | `#f8f9fa` | `#ffffff` | `#0066cc` | `#6610f2` | `#ff6b35` | `#212529` |
| Ivory Studio | `#f5f5f4` | `#fafaf9` | `#0891b2` | `#06b6d4` | `#f59e0b` | `#1c1917` |
| Linen Soft | `#fef7f0` | `#fffbf5` | `#d97706` | `#ea580c` | `#0284c7` | `#292524` |
| Porcelain Clean | `#f9fafb` | `#ffffff` | `#4f46e5` | `#8b5cf6` | `#ec4899` | `#111827` |
| Cream Elegance | `#fefce8` | `#fefce8` | `#65a30d` | `#84cc16` | `#f97316` | `#365314` |
| Arctic Breeze | `#f0f9ff` | `#f8fafc` | `#0284c7` | `#0ea5e9` | `#f43f5e` | `#0c4a6e` |
| Alabaster Pure | `#fcfcfc` | `#ffffff` | `#1d4ed8` | `#2563eb` | `#dc2626` | `#1e293b` |
| Sand Warm | `#faf8f5` | `#ffffff` | `#b45309` | `#d97706` | `#059669` | `#451a03` |
| Frost Bright | `#f1f5f9` | `#f8fafc` | `#0f766e` | `#14b8a6` | `#e11d48` | `#0f172a` |
