# BlackSync — Design System (v2)

Direction: **Light + Bold Contrast** (Vercel / Linear energy). Warm-white canvas,
oversized confident headlines, generous whitespace, crisp 1px borders, bold
terracotta as the single hero accent. No flat/zeroed shadows — real, soft depth.

## Tokens (see client/src/index.css)
- Canvas: warm white `--background`, near-black warm `--foreground`.
- Accent: one bold terracotta `--primary` (#D2522B-ish). Used sparingly for CTAs,
  the highlighted word in headlines, active states. Never wallpaper with it.
- `--secondary`: soft neutral chip (light bg, dark text) — used for eyebrows/badges.
- Radius: 0.875rem base → rounded, modern cards & buttons.
- Shadows: layered, low-opacity, warm-tinted.

## Typography
- Display headings: `font-display` (Space Grotesk), tight tracking, weight 600-700.
- Body / UI: `font-sans` (Geist).
- Mono eyebrows/labels: `font-mono` (Geist Mono) — uppercase, tracked out.
- Serif italic accent: `font-serif` (Playfair) — rare, recolored terracotta.

## Section pattern (use everywhere for rhythm)
- Vertical padding: `py-20 md:py-28` (hero/CTA larger).
- Max width: `max-w-6xl` content, `max-w-7xl` wide grids, centered.
- Eyebrow: `<SectionEyebrow>` mono uppercase pill.
- Heading: `text-4xl md:text-5xl font-display font-semibold tracking-tight`,
  highlight word via `.text-accent-grad` or `text-primary`.
- Reveal: framer `whileInView` fade-up, `once: true`, stagger 0.06.

## Components
- Cards: `rounded-2xl border bg-card shadow-sm hover:shadow-md transition`.
- Primary CTA: terracotta, semibold, `shadow-sm`, subtle lift on hover.
- Keep ALL data, copy, links, forms, Stripe URLs, API calls and `data-testid`s intact.
</content>
</invoke>
