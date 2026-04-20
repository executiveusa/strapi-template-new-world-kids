---
name: cinematic-components
description: 30 single-file GSAP + ScrollTrigger animation modules for cinematic web experiences. Reference this skill when adding scroll animations, entrance effects, cursor interactions, or ambient motion to NWKids pages. Each module is self-contained HTML. Import patterns shown for Next.js dynamic loading.
---

# Cinematic Site Components

**Source:** `executiveusa/cinematic-site-components`  
30 single-file HTML modules using GSAP + ScrollTrigger.

---

## Module Index

### Scroll-Driven
| Module | File | When to use |
|--------|------|-------------|
| Text Mask | `text-mask.html` | Hero section — text reveals through a mask on scroll |
| Sticky Stack | `sticky-stack.html` | Timeline sections — cards stack as you scroll |
| Zoom Parallax | `zoom-parallax.html` | Image sections — zoom effect tied to scroll position |
| Horizontal Scroll | `horizontal-scroll.html` | Feature rows — horizontal panning within vertical scroll |
| Sticky Cards | `sticky-cards.html` | Program features — cards pin sequentially |
| SVG Draw | `svg-draw.html` | Paths and icons — SVG strokes animate in on scroll |
| Curtain Reveal | `curtain-reveal.html` | Section transitions — content reveals behind a curtain |
| Split Scroll | `split-scroll.html` | Two-column layouts — left/right panels scroll at different rates |
| Color Shift | `color-shift.html` | Background color transitions tied to scroll position |

### Cursor / Hover
| Module | File | When to use |
|--------|------|-------------|
| Cursor Reactive | `cursor-reactive.html` | Elements that react to cursor proximity |
| Cursor Reveal | `cursor-reveal.html` | Hidden content revealed under cursor |
| Image Trail | `image-trail.html` | Images follow cursor path (gallery pages) |
| Magnetic Grid | `magnetic-grid.html` | Grid items attracted to cursor |
| Spotlight Border | `spotlight-border.html` | Cards with border that tracks cursor |

### Click / Tap
| Module | File | When to use |
|--------|------|-------------|
| Accordion Slider | `accordion-slider.html` | FAQ and content expansion |
| Flip Cards | `flip-cards.html` | Program cards with back-side detail |
| Drag Pan | `drag-pan.html` | Draggable content carousels |
| View Transitions | `view-transitions.html` | Page-to-page morphing transitions |
| Particle Button | `particle-button.html` | CTA buttons with particle burst on click |

### Ambient / Auto
| Module | File | When to use |
|--------|------|-------------|
| Odometer | `odometer.html` | Impact numbers that count up on enter |
| Coverflow | `coverflow.html` | 3D rotating card carousel |
| Dynamic Island | `dynamic-island.html` | Morphing notification component |
| Dock Nav | `dock-nav.html` | macOS-style magnifying navigation |
| Text Scramble | `text-scramble.html` | Text that scrambles then resolves |
| Kinetic Marquee | `kinetic-marquee.html` | Scrolling marquee with velocity physics |
| Mesh Gradient | `mesh-gradient.html` | Animated CSS mesh gradient backgrounds |
| Circular Text | `circular-text.html` | Text arranged in rotating circle |
| Glitch | `glitch.html` | CSS glitch effect for hero text |
| Typewriter | `typewriter.html` | Classic typewriter character-by-character reveal |
| Gradient Stroke | `gradient-stroke.html` | SVG text with animated gradient stroke |

---

## NWKids Recommended Modules

For the NWKids homepage:

| Section | Recommended Module | Notes |
|---------|-------------------|-------|
| Hero entrance | `text-mask` | Mission statement reveals through forest texture |
| Impact numbers | `odometer` | Youth served, grants won, years running |
| Program timeline | `sticky-stack` | Programs stack as user scrolls |
| Donate CTA button | `particle-button` | Burst on click encourages engagement |
| Background ambient | `mesh-gradient` | Forest greens, earth tones — set to NWKids colors |

---

## Next.js Dynamic Import Pattern

GSAP must be client-only. Use dynamic imports:

```tsx
// apps/ui/src/components/homepage/HeroAnimation.tsx
'use client'
import { useEffect, useRef } from 'react'

export default function HeroAnimation({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: gsap.Context

    async function init() {
      const { gsap } = await import('gsap')
      const { ScrollTrigger } = await import('gsap/ScrollTrigger')
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        // text-mask pattern
        gsap.from('.hero-word', {
          y: '110%',
          opacity: 0,
          stagger: 0.08,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
          }
        })
      }, ref)
    }

    init()
    return () => ctx?.revert()
  }, [])

  return <div ref={ref}>{children}</div>
}
```

Install GSAP:
```bash
pnpm add gsap --filter=@nwkids/ui
```

---

## NWKids Color Tokens for Animations

Use these instead of hardcoded values:

```js
const COLORS = {
  forestDark: '#1a2e1a',
  deepForest: '#0f1a0f',
  sage: '#4a7a4a',
  gold: '#c9a227',
  cream: '#f5f0e8',
  earth: '#8b6914',
}
```

---

## Uncodixfy Rules for Animations

- Animations should **enhance content**, not distract
- No animations on interactive controls (buttons, forms) unless tied to user intent
- `ScrollTrigger` start: `"top 80%"` — don't wait until element is fully in view
- Duration: 0.6–1.0s. Ease: `power3.out` or `expo.out`. No bounce.
- Always check `prefers-reduced-motion`:

```js
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // run animation
}
```
