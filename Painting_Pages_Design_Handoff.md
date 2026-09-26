# Design Handoff: Period Painting Pages

**Purpose:** Everything needed to reproduce the exact current live appearance and structure of the five non-Medieval "Painting" domain pages on *Of Imagination All Compact* (the AP Literature companion site).

**Scope — the five pages covered by this handoff:**

| # | Unit | Live URL | Anchor text |
|---|------|----------|-------------|
| 1 | Renaissance & Reformation | `/units/01-renaissance/art` | *Hamlet* |
| 2 | The Baroque | `/units/02-baroque/art` | *Paradise Lost* |
| 3 | The Enlightenment | `/units/03-enlightenment/art` | *Pride and Prejudice* |
| 4 | Romanticism | `/units/04-romanticism/art` | *Moby-Dick* |
| 5 | Modernism | `/units/05-modernism/art` | *Invisible Man* |

Medieval (`/units/00-medieval/art`) is explicitly excluded from this handoff.

Live site: https://ap-lit-site.tmurphy-ef9.workers.dev

**Source of truth:** All five pages render from **one shared template**, `src/pages/units/[unit]/[domain].astro`, parameterized by unit + domain frontmatter. There is no per-unit page file — reproducing this template plus the five content files reproduces all five pages exactly. Reference paths given throughout so Claude Design can pull exact values/strings directly from the repo rather than relying on transcription.

---

## 1. Page anatomy (top → bottom)

1. **Topbar** — site brand (italic serif) + nav links (Timeline / People / Compare / Painting / Sculpture / Music), all caps, letter-spaced, bottom-rule divider.
2. **Header band** — full-bleed decorative SVG strip, unique per unit (see §5, "role 6" motif).
3. **Breadcrumb** — `Home / Unit 0X · [Period Name] / Painting`, monospace, uppercase, 11px.
4. **Unit strip** — 4-column grid: giant unit number (e.g. "01") in accent color · title block (eyebrow "Unit · Anchor text" + period name h2) · date range · a small circular per-unit sigil ("role 5" motif).
5. **Thread tabs** — 4-column tab bar: Philosophy · **Painting** (active) · Sculpture · Music, each with a 20×20 mini line-icon. Active tab gets raised background + colored bottom border + accent-colored label.
6. **Page head** — large bordered sigil box (diamond icon for Painting) + eyebrow "Thread II · Painting" + h1 `Painting: *[Period Name]*` (period name in italic muted color).
7. **Section terminator** — centered decorative SVG rule, unique per unit ("role 3" motif).
8. **Hero plate** — the unit's `hero_painting`: full-width bordered image on a tinted crosshatch background, artist stamp overlaid bottom-left on the image, caption bar below with title (italic) + byline (left) and date/medium/location (right, monospace).
9. **Two-column layout** — prose column (flex 1, right-padded) + a vertical decorative motif divider ("role 2") + a 300px sticky sidebar.
10. **Prose column** (rendered from the unit's `.mdx` body):
    - MDX `# h1` and first `## Introduction` heading are hidden by CSS; the Introduction's paragraph becomes the lede.
    - Lede paragraph: larger (21px), brighter ink color, with a large serif drop-cap in the accent color.
    - Three sub-thread sections (Figure & Space / Light & Shadow / Brushwork & Surface), each a `##` heading that JS turns into a 3-column grid: icon box (auto-numbered "01 — Sub-thread" etc.) + heading text (colored per sub-thread) + a per-unit medallion ornament ("role 1" motif) at top-right.
    - Immediately under each sub-thread heading, an italicized guiding question paragraph (auto-styled via `:has(> em:only-child)`) in the accent color.
    - `### Connection to *[Core Text]*` headings render as the top half of a two-part callout card; the paragraph immediately after becomes the bottom half — both share a left accent-colored bar.
    - Body paragraphs beginning with `**bold label:**` (e.g. "Looking forward:") get the same callout-card treatment automatically.
    - Blockquotes: left accent border, italic, with optional `<cite>` byline.
    - `<PullQuote>` component: centered, no border, italic serif quote flanked by hairline brackets (period-specific bracket ornament, "role 4" motif, or a neutral fallback).
    - Final `## Looking Forward` heading (last `h2` in the doc) is styled as an italic transitional headline, not a numbered sub-thread section.
11. **Sidebar** (sticky, 24px from top):
    - "Analytical Threads" card — 3 colored list items (icon + label + italic gloss), one per thread, tinted with that thread's sub-accent color and a left accent bar.
    - "Works Discussed" card — one entry per `gallery_paintings[]` item: thumbnail image (max-height 160px, object-fit contain, on a sunken background), italic title, small-caps byline.
12. **Pager** — two-column footer nav: "← Previous thread" (Philosophy) / "Next thread →" (Sculpture), arrows colored in accent.
13. **Footer** — colophon ("Of Imagination All Compact · AP Literature") left, "Unit 0X / Painting" right.
14. **Bio modal** (hidden by default) — triggered by inline `BioLink` buttons in prose; portrait + field + name + dates header, bio paragraph, italic significance paragraph below a rule. Vanilla JS, not React, on these pages (the `/people` page has a separate React implementation).

---

## 2. Design tokens (exact values, from the `<style is:global>` block in `[domain].astro`)

```css
:root {
  --bg: #F4EDDF;
  --bg-raised: #EBE2D0;
  --bg-sunken: #FAF4E6;
  --ink: #1B1714;
  --ink-mute: #4a4138;
  --ink-soft: #6a6053;
  --rule: #C9BDA5;
  --rule-strong: #A89978;

  --font-display: 'Spectral', Georgia, serif;
  --font-ui: 'IBM Plex Sans', system-ui, sans-serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, monospace;

  --gutter: clamp(24px, 4vw, 72px);
  --measure: 62ch;
}
```

Google Fonts loaded: `Spectral:ital,wght@0,300;0,400;0,500;1,400;1,500`, `IBM+Plex+Sans:wght@300;400;500;600`, `IBM+Plex+Mono:wght@400;500`.

Body: 18px `--font-display`, line-height 1.6, max-width 1280px centered, side padding = `--gutter`.

### Per-unit accent color (`--thread-acc`)

**Important:** this is the value actually used on the live art pages today. It differs from the accent table in this repo's `CLAUDE.md`, which documents an older/aspirational palette (e.g. CLAUDE.md says Renaissance = `#e8a820` gold; the live page renders Renaissance in `#B54C3A` rust-red). For an *exact* reproduction, use the values below — they come directly from the `ACCENTS` map in `[domain].astro`, and on every unit the `art` domain shares the *same* accent as `philosophy`, `sculpture`, and `music` for that unit (the accent is per-unit, not per-domain):

| Unit | `--thread-acc` (primary) | Sub-thread palette (`subThreads`, used for the 3 sub-thread headings/sidebar chips in rotation) |
|---|---|---|
| 01-renaissance | `#B54C3A` | `#B54C3A`, `#943828`, `#D06050` |
| 02-baroque | `#B07028` | `#B07028`, `#8C5818`, `#CC8838` |
| 03-enlightenment | `#698BA1` | `#698BA1`, `#4A7088`, `#88A8BE` |
| 04-romanticism | `#3D5A6D` | `#3D5A6D`, `#2A4458`, `#506882` |
| 05-modernism | `#A03828` | `#A03828`, `#802818`, `#C04838` |

Additionally, the **Painting** domain specifically uses its own 3-color rotation for sub-thread sigils/headings/sidebar-thread-icons (`DOMAIN_THREAD_COLORS.art`), applied in order across the 3 threads regardless of unit:
```
art: ['#75435B', '#94586E', '#B58193']   // muted plum / rose / dusty pink
```
(Philosophy uses `['#3A332B','#5A5046','#857A6B']`; Sculpture `['#4F6B4D','#5F8060','#7B9883']`; Music `['#574878','#6F5E95','#8C80AE']` — included for context, not needed for the Painting pages themselves.)

### Ornament palette (`--mark-*`, separate from `--thread-acc`)

The decorative SVG motifs (header band, section terminator, sidebar divider, medallions, sigils) use their *own* color variables set inline on `<body>`, distinct from `--thread-acc`:

| Unit | `--mark-primary` | `--mark-highlight` | `--mark-spot` |
|---|---|---|---|
| 01-renaissance | `#B54C3A` | `#C68A7A` | `#2C4A82` |
| 02-baroque | `#B07028` | `#D49432` | `transparent` |
| 03-enlightenment | `#698BA1` | `#A2B7C8` | `transparent` |
| 04-romanticism | `#3D5A6D` | `#8AA3B5` | `#A85428` |
| 05-modernism | `#A03828` | `#D49A8C` | `#A07820` |

Fixed regardless of unit: `--mark-ink:#2C2820; --mark-cream:#F6F1E8; --mark-tile:#EDE8DC; --mark-rule:#C8C0B0; --mark-muted:#6B6355;`

---

## 3. Key component CSS (verbatim, condensed to the selectors that matter for Painting pages)

Full source: `src/pages/units/[unit]/[domain].astro` (single `<style is:global>` block, ~1100 lines). Key excerpts:

**Unit strip number:**
```css
.unit-strip .num { font-family: var(--font-display); font-weight: 300; font-size: 72px; line-height: 0.85; color: var(--thread-acc); letter-spacing: -0.03em; }
```

**Page head h1:**
```css
.page-head h1 { font-family: var(--font-display); font-weight: 300; font-size: clamp(36px, 5vw, 64px); line-height: 1; letter-spacing: -0.02em; max-width: 22ch; }
.page-head h1 em { font-style: italic; color: var(--ink-mute); }
```

**Hero plate (art hero specifically renders full-bleed, not cropped):**
```css
figure.hero-plate { margin: 40px 0 48px; border: 1px solid var(--rule); background: var(--bg-raised); }
figure.hero-plate .img {
  background:
    repeating-linear-gradient(135deg, rgba(0,0,0,0.018) 0 14px, rgba(0,0,0,0.035) 14px 28px),
    linear-gradient(180deg, color-mix(in oklab, var(--thread-acc) 34%, #F4EDDF), color-mix(in oklab, var(--thread-acc) 10%, #F4EDDF));
}
.hero-img-full { display: block; width: 100%; max-height: 640px; object-fit: contain; }
figure.hero-plate .stamp { position: absolute; left: 18px; bottom: 14px; font-family: var(--font-mono); font-size: 11px; color: var(--ink-mute); }
figure.hero-plate .caption { padding: 22px 28px; display: grid; grid-template-columns: 1fr auto; border-top: 1px solid var(--rule); }
figure.hero-plate .caption .title { font-family: var(--font-display); font-style: italic; font-size: 20px; }
figure.hero-plate .caption .byline { font-family: var(--font-ui); font-size: 11.5px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink-soft); }
figure.hero-plate .caption .meta { font-family: var(--font-mono); font-size: 10.5px; text-align: right; white-space: pre-line; }
```
*Note:* the hero uses `object-fit: contain` (whole painting always visible, letterboxed against the tinted gradient) — inline `<Plate>` images later in the prose (none used on the current 5 Painting pages' bodies, but available) use `object-fit: cover` inside a fixed 4:3 box instead. Sidebar gallery thumbnails use `object-fit: contain`, `max-height: 160px`.

**Two-column grid:**
```css
.layout { display: grid; grid-template-columns: minmax(0, 1fr) 28px 300px; gap: 48px 0; padding: 48px 0 32px; }
.layout > .prose { padding-right: 48px; }
@media (max-width: 1100px) { .layout { grid-template-columns: 1fr; } .motif-rule { display: none; } }
```

**Prose lede + drop cap:**
```css
.prose p:first-of-type { font-size: 21px; line-height: 1.55; color: var(--ink); margin-bottom: 36px; }
.prose p:first-of-type::first-letter { float: left; font-family: var(--font-display); font-weight: 300; font-size: 78px; line-height: 0.85; color: var(--thread-acc); padding: 8px 14px 0 0; }
.prose h1 { display: none; }
.prose h2:first-of-type { display: none; } /* hides "## Introduction" */
```

**Sub-thread heading grid** (populated by client-side JS, see §4):
```css
.prose h2:not(:first-of-type):not(:last-of-type) {
  display: grid; grid-template-columns: 56px 1fr 64px; grid-template-rows: auto auto;
  column-gap: 20px; margin: 56px 0 0; padding-top: 48px; border-top: 1px solid var(--rule);
  font-family: var(--font-display); font-size: 32px; line-height: 1.1;
}
.prose h2 .sigil-box { width:56px; height:56px; border:1px solid color-mix(in oklab, var(--sub-acc) 40%, var(--rule-strong)); background: color-mix(in oklab, var(--sub-acc) 5%, var(--bg-sunken)); }
.prose h2 .sub-idx { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--ink-soft); }
.prose h2 .sub-title { color: var(--sub-acc, var(--ink)); }
.prose h2 .section-medallion { width: 64px; height: 64px; justify-self: end; }
```

**Final "Looking Forward" heading:**
```css
.prose h2:last-of-type { font-style: italic; font-weight: 300; font-size: 36px; margin: 56px 0 24px; padding-top: 48px; border-top: 1px solid var(--rule); }
```

**Guiding-question paragraph (auto-detected: `<h2> + <p>` containing only an `<em>`):**
```css
.prose h2 + p:has(> em:only-child) { font-family: var(--font-display); font-style: italic; font-size: 19px; color: var(--thread-acc); max-width: 52ch; }
```

**Connection-to-text callout (`<h3>` + following `<p>`):**
```css
.prose h3 { font-family: var(--font-ui); font-size: 10.5px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--thread-acc); padding: 16px 22px 0; background: var(--bg-raised); border: 1px solid var(--rule); border-bottom: 0; position: relative; }
.prose h3::before { content:''; position:absolute; left:-1px; top:-1px; bottom:0; width:3px; background: var(--thread-acc); }
.prose h3 + p { padding: 10px 22px 18px; background: var(--bg-raised); border: 1px solid var(--rule); border-top: 0; font-size: 16.5px; }
```

**"Looking forward:"-style bold-led callout paragraph:**
```css
.prose p:has(> strong:first-child) { position: relative; margin: 36px 0 8px; padding: 22px 26px 24px; background: var(--bg-raised); border: 1px solid var(--rule); }
.prose p:has(> strong:first-child)::before { content:''; position:absolute; left:-1px; top:-1px; bottom:-1px; width:3px; background: var(--thread-acc); }
.prose p:has(> strong:first-child) > strong:first-child { display:block; font-family: var(--font-ui); font-size: 10.5px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--thread-acc); }
```

**Sidebar cards:**
```css
.card { border: 1px solid var(--rule); background: var(--bg-raised); padding: 22px 22px 20px; }
.card h4 { font-family: var(--font-ui); font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--ink-soft); border-bottom: 1px solid var(--rule); padding-bottom: 12px; }
aside .threads-list li { border: 1px solid color-mix(in oklab, var(--c) 32%, var(--rule)); background: color-mix(in oklab, var(--c) 5%, var(--bg)); display: grid; grid-template-columns: 36px 1fr; gap: 12px; padding: 14px 16px 14px 18px; }
aside .threads-list li::before { content:''; position:absolute; left:-1px; top:-1px; bottom:-1px; width:3px; background: var(--c); } /* --c = --sub-acc per item */
.gallery-img { max-height: 160px; object-fit: contain; }
.gallery-title { font-family: var(--font-display); font-style: italic; font-size: 13.5px; }
.gallery-by { font-family: var(--font-ui); font-size: 10.5px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--ink-soft); }
```

For the complete, unabridged CSS (pager, footer, bio modal, mobile breakpoints, etc.) pull directly from `src/pages/units/[unit]/[domain].astro` — it is one continuous global stylesheet shared by all 24 unit/domain pages, so nothing in it is Painting-specific beyond the selectors already excerpted above.

---

## 4. Behavior / interactivity

1. **Sub-thread heading decoration (client JS, inline `<script>` at bottom of page):** On `DOMContentLoaded`, finds all `<h2>` in `article.prose`, drops the first (Introduction, hidden) and last (Looking Forward), and for each remaining `<h2>` (the 3 sub-threads) injects, in order: a `.sigil-box` (SVG icon in that thread's rotation color), a `.sub-idx` label (`"01 — Sub-thread"`, `"02 — Sub-thread"`, `"03 — Sub-thread"`), the original heading text wrapped in `.sub-title`, and a `.section-medallion` (the per-unit "role 1" ornament). Sets `--sub-acc` inline per heading.
2. **Bio modal:** global click listener on `.bio-link-btn[data-bio-id]` anywhere in the document body; looks up the person in the `PEOPLE` array (from `BiographyPanel.jsx`, passed to the page as serialized JSON via `define:vars`) and populates `#bio-name`, `#bio-dates`, `#bio-field`, `#bio-bio`, `#bio-significance`, `#bio-portrait`. Closes on backdrop click, close button, or Escape.
3. **Sticky sidebar:** `position: sticky; top: 24px` on `aside`, disabled below 1100px viewport width (becomes static, stacks below prose).
4. **Responsive breakpoints:** tabs go 4-col → 2-col at 700px; page-head and two-column layout collapse to single column at ≤1100–720px (motif divider hidden entirely below 1100px).

---

## 5. Decorative SVG motif system (`PeriodMotif.astro` / `period-motifs.ts`)

Every unit has its own hand-tuned set of 6 SVG ornaments, keyed by "role":

| Role | Used where | Description |
|---|---|---|
| 1 | Sub-thread heading, top-right | Small circular medallion |
| 2 | Vertical divider between prose and sidebar | Tall thin vertical motif |
| 3 | Below the page-head, above the hero | Wide horizontal terminator rule |
| 4 | Inside `<PullQuote>` (when a `unit` prop is passed) | Bracket-shaped flourish |
| 5 | Unit strip, top-right | Small circular sigil |
| 6 | Full-bleed header band under the topbar | Long horizontal repeating pattern |

These are pre-rendered, parameterized SVG strings (using `var(--mark-primary)`, `var(--mark-highlight)`, `var(--mark-ink)`, etc.) stored per-unit in `src/data/period-motifs.ts` (auto-generated file, ~1,700 lines, one block per unit — do not hand-transcribe; pull the exact `<svg>...</svg>` string for each of the 5 units × 6 roles directly from that file for pixel-exact reproduction). Rendered via the tiny wrapper `src/components/PeriodMotif.astro`, which just does `<Fragment set:html={PERIOD_MOTIFS[unit][role]} />`.

Each unit's motif set is geometrically distinct (e.g. Medieval uses an 8-point compass rose / gothic tracery motif; Renaissance uses a rotated-square/circle "vitruvian" motif) — this is bespoke per-unit ornamentation, not a shared icon recolored. Claude Design should treat `period-motifs.ts` as the canonical asset source for these.

---

## 6. Thread icons (sidebar "Analytical Threads" card + tab bar mini-icons)

Defined in `src/components/threadIcons.ts`, rendered via `src/components/ThreadIcon.astro` (a thin wrapper: `<svg viewBox width height style="color:{color}" set:html={icon.content}>`, so the SVG strokes use `currentColor`).

The three Painting threads (same 3 across all 5 units — only their `period_summary` text changes per unit):

- **`figure-space`** — viewBox `0 0 40 40`, default color `#D9A842`: two stick-figure outlines with a baseline and scattered dots.
- **`light-shadow`** — viewBox `0 0 40 40`, default color `#C94C7C`: sunburst (circle + 8 radiating rays, 4 full-opacity cardinal + 4 half-opacity diagonal).
- **`brushwork-surface`** — viewBox `0 0 40 40`, default color `#4AB39A`: a bordered square with a 3×3 dot grid and a dashed inner square.

Full `<path>`/`<circle>`/`<line>` markup for each is in `threadIcons.ts` — copy verbatim.

Note: on the live Painting pages, the sidebar actually recolors these using the domain's rotation (`#75435B / #94586E / #B58193`, see §2) rather than each icon's own default color — the `color` prop passed to `<ThreadIcon>` overrides `icon.color`.

The tab-bar mini-icon for "Painting" (used identically on every unit) is a 40×40 rotated square with a center dot, drawn inline in the template (not from `threadIcons.ts`):
```html
<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
  <rect x="8" y="8" width="24" height="24" transform="rotate(45 20 20)" />
  <circle cx="20" cy="20" r="1.5" style="fill:currentColor;stroke:none;" />
</svg>
```
The large page-head sigil box uses the same icon at 48×48 inside an 88×88 bordered box tinted `var(--bg-sunken)`, stroked in `var(--thread-acc)`.

---

## 7. Content — frontmatter + body, all 5 pages

Content source files: `src/content/units/{01-renaissance,02-baroque,03-enlightenment,04-romanticism,05-modernism}/art.mdx`. Schema enforced by `src/content.config.ts` (`units` collection, `domain: 'art'` branch: `hero_painting{title,artist,date,medium,dimensions,location,image}`, `gallery_paintings[]{title,artist,date,threads[],image}`, `threads[]{id,label,period_summary}`).

Body structure is identical across all 5: `## Introduction` (2 paragraphs, hidden heading) → `## Figure & Space` (guiding question + body + `### Connection to *[Text]*` callout) → `## Light & Shadow` (same pattern) → `## Brushwork & Surface` (same pattern) → `## What to Notice` (references the hero + gallery images by name) → `## Looking Back` (compares to previous unit's hero painting) → `## Looking Forward` (transitions to next unit).

### 7.1 Renaissance & Reformation (`01-renaissance/art.mdx`)

```yaml
unit: "01-renaissance"
period: "Renaissance & Reformation"
dates: "c. 1400–1700"
core_text: "Hamlet"
author: "Shakespeare"
domain: art
threads:
  - id: figure-space
    label: "Figure & Space"
    period_summary: "Linear perspective creates measurable, rational space — the viewer looks through a window into a navigable world where human figures stand on solid ground."
  - id: light-shadow
    label: "Light & Shadow"
    period_summary: "Light becomes naturalistic — it comes from a specific direction, casts real shadows, and reveals form through sfumato and tonal modeling."
  - id: brushwork-surface
    label: "Brushwork & Surface"
    period_summary: "Oil painting enables invisible, controlled brushwork — the surface disappears into seamless illusion, declaring that the rational mind can reproduce reality."
hero_painting:
  title: "The Creation of Adam"
  artist: "Michelangelo Buonarroti"
  date: 1511
  medium: "Fresco"
  dimensions: "height: 9 ft 2 in; width: 18 ft 8 in"
  location: "Sistine Chapel, Vatican"
  image: "/images/paintings/01-renaissance/michelangelo-creation-of-adam.jpg"
gallery_paintings:
  - title: "The Alba Madonna"
    artist: "Raphael"
    date: 1510
    threads: [figure-space, light-shadow]
    image: "/images/paintings/01-renaissance/raphael-alba-madonna.jpg"
  - title: "The Last Supper"
    artist: "Leonardo da Vinci"
    date: 1498
    threads: [figure-space, light-shadow]
    image: "/images/paintings/01-renaissance/leonardo-last-supper.jpg"
  - title: "The School of Athens"
    artist: "Raphael"
    date: 1511
    threads: [figure-space]
    image: "/images/paintings/01-renaissance/raphael-school-of-athens.jpg"
  - title: "The Ambassadors"
    artist: "Hans Holbein the Younger"
    date: 1533
    threads: [figure-space, brushwork-surface]
    image: "/images/paintings/01-renaissance/holbein-ambassadors.jpg"
compare_back: "medieval"
compare_forward: "baroque"
```

Body (full text, BioLink targets noted inline as `[[id]]`):

> **Introduction** — The Renaissance represents one of the most dramatic shifts in the history of European art. Painters developed sophisticated techniques to make paintings look like windows onto the three-dimensional, physical world. This was not just a technical achievement but a philosophical revolution. To paint a measurable space with individual human beings standing in it was to declare that the physical world, and the individual's experience of it, mattered.
>
> This is the visual art of Hamlet's intellectual world: the world of the soliloquies, of a mind that insists on examining itself and its surroundings with relentless rational attention. Where Medieval painting served the certainties of faith, Renaissance painting reflects the inquiries of humanism.
>
> **Figure & Space** *(guiding question: "How is the human figure placed within the pictorial space?")* — The great invention of the Renaissance was linear perspective — a mathematical system for creating the illusion of depth on a flat surface. Parallel lines converge at a vanishing point on the horizon, and figures diminish in size as they recede. For the first time, the viewer is positioned at a specific point in space, looking into the painting as if through a window. The human figure now stands on solid ground in a rational, navigable world, the visual equivalent of humanism. The individual now has a place, a body, a point of view.
>
> *Connection to Hamlet* — Hamlet is [[shakespeare]]'s most Renaissance character, a Wittenberg student who insists on seeing for himself, testing claims against evidence, and locating himself precisely within the world he inhabits. The intense interiority of the soliloquies in which Hamlet examines his own thoughts and motives is the literary equivalent of perspective: a single consciousness positioned at a specific point, looking outward and trying to make sense of what it sees. But notice the tension: Hamlet inherits a medieval world of duty, honor, and ghostly commands, while possessing a Renaissance mind that questions everything. He is caught between the gold-ground certainty of his father's world and the perspectival complexity of his own.
>
> **Light & Shadow** *("How does the painting use light — its source, quality, and emotional effect?")* — Renaissance light becomes naturalistic. It comes from a specific direction and casts real shadows. [[leonardo]] developed sfumato, a technique of softly blending tones to create an atmospheric haze that gives figures a mysterious, living quality. Light now reveals form: it curves around a cheek, catches an eye, models the folds of drapery. The world has become something that can be directly seen and measured, rather than something received on faith.
>
> *Connection to Hamlet* — Renaissance light is the light of rational inquiry — it illuminates by falling on objects from a particular angle, revealing their three-dimensional reality. Hamlet, too, seeks to illuminate: "I know not 'seems,'" he insists, demanding that appearances yield to truth. Yet in the play, the things most worth seeing — Claudius's guilt, Gertrude's complicity, Hamlet's own motives — remain stubbornly resistant to clear illumination. The play is full of scenes of watching and being watched (the play-within-the-play, the eavesdropping scenes), as if the Renaissance confidence that light reveals truth is being tested and found insufficient.
>
> **Brushwork & Surface** *("What is the physical character of the paint itself?")* — Renaissance painters developed oil painting, which allowed far greater subtlety than tempera. Oils could be blended smoothly, layered in translucent glazes, and worked over long periods. The brushwork is controlled and largely invisible, seeking to create a seamless illusion. A great painting should look like the world, not like paint applied to a flat surface.
>
> Holbein's *The Ambassadors* is the supreme demonstration of Northern Renaissance oil technique. Two French diplomats stand in a space packed with objects — globes, instruments, a lute, an open hymnal — rendered with such microscopic precision that the surfaces of silk, fur, wood, and metal are individually convincing. The painting also quietly presents a contradiction of everything it seems to represent at first glance. Stretched diagonally across the lower foreground is a large anamorphic skull — visible as a skull only if the painting is viewed from an extreme angle — which can only be seen correctly when you step aside from the painting's own rational vantage point. The technique that renders the world perfectly legible also allows an oblique reminder that legibility has limits, delivered by an image that pointedly references the medieval memento mori.
>
> *Connection to Hamlet* — The smooth, invisible surface of Renaissance painting — the surface that asks the viewer to forget it is a surface and look through it to the world beyond — connects to one of the play's central preoccupations: the relationship between surface and depth, appearance and reality. Hamlet distrusts surfaces ("Seems, madam? Nay, it is. I know not 'seems'"), yet the play itself is a brilliantly crafted surface of language through which we apprehend a complex psychological world. The Renaissance painter's ambition to make a perfectly transparent window onto reality mirrors the dramatist's ambition to make speech sound like thought.
>
> **What to Notice** — In the [[michelangelo]] *Creation of Adam* above, notice how the human figure occupies a physically convincing space. Adam's body has weight, volume, and anatomical reality that would be unthinkable in medieval painting. The gap between the two reaching fingers dramatizes the Renaissance idea that the human being and the divine are separate figures in a measurable space, reaching toward each other across a felt distance.
>
> In [[raphael]]'s *School of Athens* below, find the vanishing point at the center of the composition and notice how every architectural line converges there, pulling your eye into a deep, rationally organized space. In [[leonardo]]'s *Last Supper*, notice how light falls consistently from the left, casting shadows that confirm the solidity of every surface. The brushwork throughout is controlled and invisible — you see a world, not paint.
>
> In *The Ambassadors*, take inventory of the objects on the lower shelf before looking at the figures — instruments of navigation, measurement, and music, tools of the rational humanist world. Then find the skull in the foreground and try to resolve it. The perspective that organizes everything else cannot organize this shape; you have to abandon your position to see it correctly.
>
> **Looking Back** — Compare the *Creation of Adam* to [[martini]]'s *Annunciation* and the revolution is visible instantly. The gold ground is gone, replaced by sky and earth. The figures are no longer floating symbols arranged by spiritual rank; they are anatomically real bodies with muscles, weight, and physical presence. Light falls from a specific direction.
>
> **Looking Forward** *(italic transitional heading)* — The Baroque will take Renaissance rationality and shatter its calm. Where the Renaissance placed figures in balanced, harmonious spaces bathed in even light, Baroque painters will plunge their canvases into dramatic darkness pierced by violent shafts of illumination. Where Renaissance composition is stable and centered, Baroque composition will be dynamic, diagonal, and emotionally turbulent. The confidence that the rational mind can comprehend and reproduce reality will give way to a sense that the world is a theater of forces larger than any individual — the world of [[milton]]'s *Paradise Lost*.

### 7.2 The Baroque (`02-baroque/art.mdx`)

```yaml
unit: "02-baroque"
period: "The Baroque"
dates: "c. 1600–1700"
core_text: "Paradise Lost"
author: "Milton"
domain: art
threads:
  - id: figure-space
    label: "Figure & Space"
    period_summary: "Compositions become dynamic and unstable — figures twist, surge, and emerge from deep shadow in spaces that feel vast but unmeasurable."
  - id: light-shadow
    label: "Light & Shadow"
    period_summary: "Chiaroscuro and tenebrism create extreme contrasts — a single beam of light picks out the crucial action from enveloping darkness."
  - id: brushwork-surface
    label: "Brushwork & Surface"
    period_summary: "The period divides: Vermeer achieves luminous smoothness while Rembrandt builds thick impasto that makes the paint itself a physical presence."
hero_painting:
  title: "The Supper at Emmaus"
  artist: "Caravaggio"
  date: 1601
  medium: "Oil on canvas"
  dimensions: "height: 55.5 in; width: 72.2 in"
  location: "National Gallery, London"
  image: "/images/paintings/02-baroque/caravaggio-supper-at-emmaus.jpg"
gallery_paintings:
  - title: "The Calling of Saint Matthew"
    artist: "Caravaggio"
    date: 1600
    threads: [light-shadow, figure-space]
    image: "/images/paintings/02-baroque/caravaggio-calling-of-matthew.jpg"
  - title: "Las Meninas"
    artist: "Diego Velázquez"
    date: 1656
    threads: [figure-space, brushwork-surface]
    image: "/images/paintings/02-baroque/velazquez-las-meninas.jpg"
  - title: "Self-Portrait"
    artist: "Rembrandt van Rijn"
    date: 1659
    threads: [brushwork-surface, light-shadow]
    image: "/images/paintings/02-baroque/rembrandt-self-portrait-1659.jpg"
compare_back: "renaissance"
compare_forward: "enlightenment"
```

Body:

> **Introduction** — The Baroque shatters the calm, rational order of Renaissance painting. Seventeenth century painters filled their canvases with drama, emotion, and extremes of light and dark. They depict not a tranquil, rationally organized space but a stage for conflict — spiritual, psychological, and physical. The parallels with [[milton]]'s epic of cosmic rebellion are immediate and profound.
>
> [[milton]] and the Baroque painters share a common project: depicting a universe of overwhelming forces in which individual beings — fallen angels, saints, ordinary sinners — are caught up in dramas far larger than themselves. Both use scale, contrast, and sensory intensity to make the viewer feel the weight of that drama.
>
> **Figure & Space** *("How is the human figure placed within the pictorial space?")* — Baroque compositions are dynamic and often unstable. Figures twist, reach, fall, and surge diagonally across the canvas rather than standing in balanced symmetry. The space around them is often ambiguous: figures emerge from deep shadow, and the boundaries of the room or landscape may be invisible. In [[rembrandt]]'s work, figures float in a kind of luminous darkness; one senses space but cannot measure it. No longer calmly surveying the bright and legible landscape of the Renaissance image, the individual is now caught up in the dark grip of forces larger than they can comprehend.
>
> *Connection to Paradise Lost* — [[milton]]'s spatial imagination is profoundly Baroque. Consider the scale of his settings: the "vast immeasurable abyss" of Chaos, the "darkness visible" of Hell, the vertiginous distances Satan traverses between worlds. These are not rationally measured Renaissance spaces but overwhelming, unmappable expanses in which even colossal figures like Satan seem dwarfed by the cosmos they inhabit. When [[milton]] describes Satan's fall "nine times the space that measures day and night," he is creating the literary equivalent of Baroque spatial drama. Like [[caravaggio]], [[milton]] places his figures in dynamic, unstable positions: Satan hurtling through Chaos, the rebel angels tumbling into the abyss, Eve reaching for the fruit in a garden that is about to be lost forever.
>
> **Light & Shadow** *("How does the painting use light — its source, quality, and emotional effect?")* — This is where the Baroque makes its most dramatic break with the previous era. Chiaroscuro — strong contrast between light and dark — becomes the defining feature. [[caravaggio]] pioneered tenebrism, an extreme technique in which most of the canvas is plunged into darkness and a single, intense beam of light picks out the crucial action. Light is no longer evenly distributed or rationally explained; it is selective, dramatic, almost violent in its concealments and disclosures.
>
> *[PullQuote]* "A single beam of light picks out the crucial action from enveloping darkness."
>
> *Connection to Paradise Lost* — [[milton]]'s visual depiction of Hell — "No light, but rather darkness visible" — offers the literary equivalent of Baroque chiaroscuro. The phrase is itself a paradox worthy of [[caravaggio]]: a darkness so thick it becomes something one can see, a light so diminished that it only makes the surrounding blackness more palpable. Throughout *Paradise Lost*, light and darkness are not merely settings but moral and theological forces. God is light; Satan's rebellion is a flight into shadow. Yet [[milton]], like the best Baroque painters, refuses to make this simple. Satan in Hell retains a "faded splendor." The former Lucifer is a figure of ruined light, and his diminished radiance emerging from the surrounding darkness is pure Baroque drama.
>
> **Brushwork & Surface** *("What is the physical character of the paint itself?")* — Here the period divides. Vermeer and [[velazquez]] achieve an almost miraculous smoothness and luminosity, while [[rembrandt]] builds up thick, rough impasto — paint applied so heavily that it catches real light and casts real shadows on the canvas surface. In [[rembrandt]]'s late works, paint itself becomes a physical presence: ridges, slabs, even fingerprints. This makes the painting simultaneously an illusion and an object, inviting attention to both the depicted subject and the raw material of its making. The tension between seeing through the surface and seeing the surface itself is one of the Baroque's great innovations.
>
> *Connection to Paradise Lost* — [[milton]]'s verse operates in this same double register. His language is extraordinarily dense, layered, and challenging: the reversible syntax, the massive periodic sentences, and the outrageously frequent use of enjambment all push the act of reading to the limit of understanding. In response to critics outraged by his refusal to honor the tradition of the "epic" rhyming couplet, [[milton]] claimed that he had freed his poem from "vexation, hindrance, and constraint" of "barbarous" rhyme. He conceived of his stanzas as somehow independently alive and vital, "resourced with [their] own quickening power" (as Lucifer asserts of the angels in the flashback scene before their rebellion). In *Paradise Lost*, language itself is experienced as a physical medium, even as it carries the reader through the narrative. This is the literary equivalent of [[rembrandt]]'s impasto: a surface that insists on its own materiality while simultaneously depicting a world.
>
> **What to Notice** — In the [[caravaggio]] *Supper at Emmaus* above, notice where light comes from and how much of the canvas is in shadow. The dramatic beam illuminates the moment of recognition — Christ breaking bread — while the background recedes into near-total darkness. The figures' gestures are caught mid-motion, full of sudden energy.
>
> In the *Calling of Saint Matthew* below, the same tenebristic principle operates even more starkly: a single shaft of light (entering from the right, echoing the gesture of Christ's hand) cuts across a dark room to find Matthew at his table. In the [[rembrandt]] *Self-Portrait*, look closely at the highlighted areas — the paint is thick and sculptural, catching actual light on the canvas surface, while the shadows are painted thinly and transparently. The [[velazquez]] *Las Meninas* offers a different Baroque strategy: a complex play of spatial ambiguity in which the viewer's position becomes part of the painting's puzzle.
>
> **Looking Back** — Place [[caravaggio]]'s *Supper at Emmaus* next to [[raphael]]'s *School of Athens* and the contrast is obvious: where [[raphael]]'s space is open, balanced, and rationally lit, [[caravaggio]]'s is dark, confined, and slashed by a single dramatic beam. [[raphael]]'s figures stand in calm philosophical conversation, while [[caravaggio]]'s are caught in a moment of sudden, life-changing encounter. The Renaissance confidence that the world can be rationally comprehended has given way to a conviction that the world is a theater of overwhelming forces, precisely the shift from Hamlet's questioning to [[milton]]'s cosmic drama.
>
> **Looking Forward** — After the Baroque's cosmic intensity, the Enlightenment will shrink the scale dramatically. The vast, dark, overwhelming spaces of [[caravaggio]] and [[rembrandt]] will give way to bright, intimate, socially oriented interiors. The theological drama of light against darkness will contract into the gentle, flattering illumination of drawing rooms and gardens. The heroic individual caught in the grip of cosmic forces will become the social individual navigating the pleasures and constraints of polite society.

### 7.3 The Enlightenment (`03-enlightenment/art.mdx`)

```yaml
unit: "03-enlightenment"
period: "The Enlightenment"
dates: "c. 1700–1800"
core_text: "Pride and Prejudice"
author: "Austen"
domain: art
threads:
  - id: figure-space
    label: "Figure & Space"
    period_summary: "Figures inhabit intimate, ornate interiors and idealized gardens — social spaces where people perform for each other, defined by relationships rather than cosmic forces."
  - id: light-shadow
    label: "Light & Shadow"
    period_summary: "Soft, diffused, flattering light replaces dramatic chiaroscuro — a pastel palette where everything is visible, everything is pretty, and irony hides beneath the charm."
  - id: brushwork-surface
    label: "Brushwork & Surface"
    period_summary: "Refined, fluid, decorative brushwork — exquisite surfaces that shimmer with silk and lace, achieving an effortlessness that is itself a sophisticated artifice."
hero_painting:
  title: "The Swing"
  artist: "Jean-Honoré Fragonard"
  date: 1767
  medium: "Oil on canvas"
  dimensions: "height: 31.8 in; width: 25.2 in"
  location: "The Wallace Collection, London"
  image: "/images/paintings/03-enlightenment/fragonard-the-swing.jpg"
gallery_paintings:
  - title: "The Secret Message"
    artist: "François Boucher"
    date: 1767
    threads: [figure-space, brushwork-surface]
    image: "/images/paintings/03-enlightenment/boucher-secret-message.jpg"
  - title: "The Pilgrimage to Cythera"
    artist: "Jean-Antoine Watteau"
    date: 1717
    threads: [figure-space, light-shadow]
    image: "/images/paintings/03-enlightenment/watteau-pilgrimage-to-cythera.jpg"
  - title: "Young Girl Reading"
    artist: "Jean-Honoré Fragonard"
    date: 1770
    threads: [light-shadow, brushwork-surface]
    image: "/images/paintings/03-enlightenment/fragonard-young-girl-reading.jpg"
compare_back: "baroque"
compare_forward: "romanticism"
```

Body:

> **Introduction** — After the cosmic drama of the Baroque, the Rococo feels like walking from a thunderstorm into a drawing room. The scale shrinks, the palette lightens, and the subject matter turns from the eternal to the social. This is the art of a culture that values charm, wit, elegance, and the pleasures of the moment, a world that [[austen]] both inhabits and gently satirizes.
>
> **Figure & Space** *("How is the human figure placed within the pictorial space?")* — Figures now inhabit intimate, ornate interiors or idealized garden settings. The vast, dark spaces of the Baroque give way to bright, enclosed, intimate spaces, rooms where people perform the roles assigned to them by their position in the social hierarchy. Compositions are playful, sometimes asymmetrical, with curving lines and delicate ornamentation. The human figure is no longer emerging from cosmic darkness or standing in a rationally ordered piazza; it is arranged in a social tableau, defined by its relationships with other figures.
>
> *[PullQuote]* "Figures inhabit intimate, ornate interiors and idealized gardens — social spaces where people perform for each other, defined by relationships rather than cosmic forces."
>
> *Connection to Pride and Prejudice* — [[austen]]'s world is precisely this: a world of rooms, assemblies, drawing-room conversations, and garden walks in which the arrangement of people in space carries social meaning. Who sits next to whom at dinner, who walks with whom at Pemberley, who is seen speaking to whom at the Netherfield ball — these spatial arrangements constitute the novel's action. Just as Rococo painters organize their figures in social tableaux where relationships and hierarchies are visible in the groupings themselves, [[austen]]'s scenes are carefully choreographed social compositions.
>
> **Light & Shadow** *("How does the painting use light — its source, quality, and emotional effect?")* — The dramatic chiaroscuro of the Baroque is replaced by soft, diffused, even light. Shadows are gentle and transparent. The palette shifts toward pastels — pale pinks, sky blues, soft greens, creamy whites. Light no longer reveals or conceals with dramatic force; instead it flatters. Everything is visible, everything is pretty, and yet there is often an undertone of irony or unease beneath the surface charm — much as in [[austen]]'s prose, where a polished sentence can convey a devastating observation.
>
> *Connection to Pride and Prejudice* — [[austen]]'s prose style is an expression of the Rococo style. It illuminates evenly and pleasantly, allowing the reader to see every social interaction with perfect clarity. There are no dark corners in [[austen]]'s narration, no Baroque obscurities or Romantic storms. Yet beneath the bright, even surface, shadows operate differently: they take the form of irony. When [[austen]] writes, "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife," the sentence is sharply formed and perfectly legible, yet the meaning underneath (the mercenary social logic, the mothers' calculations, the gap between "truth" and convention) is a kind of shadow visible only to the attentive reader. This is the Enlightenment's version of chiaroscuro: not dramatic darkness, but ironic depth beneath a polished surface.
>
> **Brushwork & Surface** *("What is the physical character of the paint itself?")* — Rococo brushwork is refined, fluid, and decorative. Paint is applied with a lightness of touch that matches the lightness of the subject matter. Surfaces shimmer with silk textures, lace details, and rosy skin tones. The craft is exquisite but never heavy. There is a quality of effortlessness or at least the appearance of effortlessness, which, as [[austen]]'s readers know, is its own kind of art. The surface is everything, and yet the best Rococo painters (like [[watteau]]) infuse their sparkling surfaces with a melancholy that complicates the prettiness.
>
> *Connection to Pride and Prejudice* — Again, [[austen]]'s prose style can be seen as the literary equivalent of Rococo brushwork: apparently effortless, deceptively simple, and absolutely precise. Like the best eighteenth-century painters, [[austen]] achieves an effect of naturalness through extraordinary artifice. Her sentences look transparent — one seems to be seeing directly through them to the social world they describe — but they are, in fact, minutely crafted performances. The parallel with [[watteau]] is especially apt: beneath the bright social surface of *Pride and Prejudice*, there is a persistent awareness of time, loss, and the constraints that govern women's lives. The novel is a comedy, but a comedy that never ignores or undermines the vital social and economic stakes at the center of its action (especially for its young, unmarried female characters).
>
> **What to Notice** — In [[fragonard]]'s *The Swing* above, notice the pastel palette — pinks, greens, creamy whites — and the soft, flattering light that bathes the entire scene. The composition is playful and asymmetrical, organized around a flirtatious social dynamic among three figures. The fabrics are rendered with exquisite attention to texture and shimmer. Compare the overall feeling of this canvas to the Baroque darkness of the previous section: the shift is almost comical in its completeness.
>
> In the gallery paintings below, notice how [[boucher]]'s *Secret Message* and [[fragonard]]'s *Young Girl Reading* both depict intimate domestic moments rendered with decorative refinement. [[watteau]]'s *Pilgrimage to Cythera* is the most complex: beneath its shimmering surface beauty, there is a wistfulness — the figures are leaving the island of love, not arriving — that gives the prettiness an undertow of melancholy. This is the quality in Rococo painting that most directly anticipates [[austen]]'s irony.
>
> **Looking Back** — Place [[fragonard]]'s *The Swing* next to [[caravaggio]]'s *Supper at Emmaus* and the shift is immediately apparent. [[caravaggio]]'s dark, dramatic chamber with its single, theologically weighted beam of light has become [[fragonard]]'s sun-dappled garden of flirtation and pleasure. The figures have gone from being transfixed in a moment of divine encounter to being caught in a moment of social play. The stakes have shrunk from the salvation of the soul to the management of desire within the constraints of a social code.
>
> **Looking Forward** — Romanticism will explode this drawing room. Where the eighteenth century valued reason, social order, and elegant restraint, the Romantics will pursue the raw, the wild, and the overwhelming. The intimate garden will give way to churning seas and mountain ranges. The pastel palette will darken into storms. The social figure, defined by its relations to other people, will become the solitary figure, dwarfed by a nature that exceeds comprehension. It is, in visual terms, the shift from [[austen]] to [[melville]], from the ballroom at Netherfield to the wild open ocean.

### 7.4 Romanticism (`04-romanticism/art.mdx`)

```yaml
unit: "04-romanticism"
period: "Romanticism"
dates: "c. 1789–1880"
core_text: "Moby-Dick"
author: "Melville"
domain: art
threads:
  - id: figure-space
    label: "Figure & Space"
    period_summary: "The human figure shrinks against an immensity that dwarfs and swallows — nature is no longer a backdrop but the subject, and it is ungovernable."
  - id: light-shadow
    label: "Light & Shadow"
    period_summary: "Light becomes atmospheric, emotional, and turbulent — Turner dissolves solid forms into storms of color, and the distinction between sky and sea can vanish entirely."
  - id: brushwork-surface
    label: "Brushwork & Surface"
    period_summary: "Brushwork becomes visibly energetic — paint does not merely depict a storm but behaves like one, embodying emotion rather than illustrating it."
hero_painting:
  title: "Wanderer above the Sea of Fog"
  artist: "Caspar David Friedrich"
  date: 1818
  medium: "Oil on canvas"
  dimensions: "height: 38.5 in; width: 29.1 in"
  location: "Hamburger Kunsthalle"
  image: "/images/paintings/04-romanticism/friedrich-wanderer.jpeg"
gallery_paintings:
  - title: "Liberty Leading the People"
    artist: "Eugène Delacroix"
    date: 1830
    threads: [figure-space, brushwork-surface]
    image: "/images/paintings/04-romanticism/delacroix-liberty.jpg"
  - title: "The Slave Ship"
    artist: "J.M.W. Turner"
    date: 1840
    threads: [light-shadow, brushwork-surface, figure-space]
    image: "/images/paintings/04-romanticism/turner-slave-ship.jpg"
  - title: "The Raft of the Medusa"
    artist: "Théodore Géricault"
    date: 1819
    threads: [figure-space, light-shadow]
    image: "/images/paintings/04-romanticism/gericault-raft-of-medusa.jpg"
compare_back: "enlightenment"
compare_forward: "modernism"
```
*(Note: `friedrich-wanderer.jpeg` — `.jpeg` extension, not `.jpg`, unlike every other image on the site.)*

Body:

> **Introduction** — Romanticism explodes the Rococo's drawing room. Where the eighteenth century valued reason, social order, and elegant restraint, the Romantics pursued the raw, the wild, and the overwhelming. They were drawn to what the philosopher Edmund Burke called the sublime — the experience of something so vast, powerful, or terrifying that it exceeds the mind's ability to comprehend it. The visual art of Romanticism and the fiction of [[melville]] share a common obsession: the encounter between a solitary human consciousness and forces — natural, metaphysical, existential — that refuse to be mastered, measured, or fully understood.
>
> **Figure & Space** *("How is the human figure placed within the pictorial space?")* — The relationship between figure and space reverses. In [[friedrich]]'s *Wanderer above the Sea of Fog*, a solitary figure stands with his back to us, gazing out over a vast, mist-shrouded landscape. The human being is tiny against an immensity that dwarfs and swallows. Nature is no longer a backdrop or a garden; it is the subject, and it is ungovernable. Compositions open up into panoramic skies, churning seas, and mountain ranges that push the human figure to the edge — or eliminate it entirely.
>
> *Connection to Moby-Dick* — Ishmael clinging to Queequeg's coffin in an indifferent ocean captures the Romantic reversal of scale that runs through the entire novel. Whether Ishmael at the masthead, Ahab on the quarterdeck, or Pip lost in the open sea, the human figure is perpetually dwarfed by a natural world that exceeds comprehension. The ocean functions exactly as landscape does in [[friedrich]] or [[turner]]: not a setting but a force, not a background but the primary reality against which human meaning is tested. In "Bartleby," the overwhelming space inverts — it becomes the dead wall Bartleby stares at, the claustrophobic office that shrinks the human figure rather than dwarfing it against nature. In *Benito Cereno*, the becalmed ship on an opaque sea is itself a Romantic composition: a human scene set against a natural world that conceals its meaning.
>
> **Light & Shadow** *("How does the painting use light — its source, quality, and emotional effect?")* — Romantic light is atmospheric, emotional, and often turbulent. [[turner]]'s paintings dissolve solid objects into storms of golden, fiery, or stormy light. Sunsets blaze, storms darken, and the distinction between sky and sea, solid and void, can become almost impossible to discern. Light is no longer rational (Renaissance) or dramatic (Baroque) but elemental — an expression of natural forces that exceed human control. Where Baroque chiaroscuro created a theater of divine drama, Romantic light creates an arena of natural power.
>
> *Connection to Moby-Dick* — [[melville]]'s prose handles light the way [[turner]] handles paint. In "The Whiteness of the Whale," the color white — the presence of all light — becomes a source of metaphysical terror rather than illumination. Descriptions of the sea at different times of day dissolve water and sky into a single luminous or threatening field. [[melville]], like [[turner]], erases the boundaries between solid objects and the elemental forces that surround them. The whale itself appears and disappears in conditions of light and obscurity that make it seem more like a natural phenomenon — a storm, a wave, a shaft of light through water — than a creature.
>
> **Brushwork & Surface** *("What is the physical character of the paint itself?")* — For many Romantic painters, brushwork becomes visibly energetic. [[turner]], in his later work, dissolves the painted surface into swirling, almost abstract fields of color that anticipate Impressionism and even abstraction. [[delacroix]] used bold, rapid strokes that convey urgency and passion. The smooth, controlled surface of neoclassical painting gives way to visible physical energy. The paint does not merely depict a storm; it behaves like one. This expressiveness of surface — the idea that paint can embody emotion, not just illustrate it — is a Romantic innovation with enormous consequences for the future of art.
>
> *[PullQuote]* "The paint does not merely depict a storm; it *behaves* like one."
>
> *Connection to Moby-Dick* — [[melville]]'s prose style is the literary equivalent of [[turner]]'s late brushwork. His sentences do not politely describe the ocean; they enact it — surging, accumulating, crashing across the page in long, rhythmically complex periods that seem to move with the energy of the phenomena they describe. The famous cetology chapters, the rhetorical set pieces, the passages of visionary intensity all insist on a prose surface with its own energy and physicality. [[melville]]'s language is not transparent; it is a force. This is precisely the Romantic principle that the medium is part of the meaning.
>
> **What to Notice** — In [[friedrich]]'s *Wanderer* above, notice the scale relationship: the human figure is solid and present but dwarfed by the mist, rock, and sky that surround him. His back is turned to us — we see what he sees, but we also see him seeing it, and the gap between his smallness and nature's immensity is the painting's subject.
>
> In the gallery below, [[turner]]'s *Slave Ship* is the most extreme example of Romantic light and brushwork: solid forms dissolve into swirling color, and the boundary between sea and sky nearly vanishes. [[gericault]]'s *Raft of the Medusa* dramatizes human figures caught in a desperate composition of diagonal energy — bodies piled, reaching, collapsing — against an indifferent ocean. [[delacroix]]'s *Liberty Leading the People* shows Romantic energy applied to political subject matter, with bold, rapid brushwork conveying the chaos and passion of revolution.
>
> In all of these paintings, notice the feeling of the sublime: beauty mixed with terror, awe mixed with helplessness.
>
> **Looking Back** — Place [[friedrich]]'s *Wanderer* next to [[fragonard]]'s *The Swing* and the eighteenth-century world vanishes. The intimate garden, the flirtatious social scene, the pastel palette, the decorative charm — all swept away by fog, rock, and an immensity that makes the solitary human figure look fragile and exposed. The drawing room has become the mountaintop; [[austen]]'s precisely calibrated social comedy has given way to [[melville]]'s oceanic confrontation with the sublime.
>
> **Looking Forward** — Modernism will take the Romantic dissolution of form — visible in [[turner]]'s late work — and push it to its conclusion. Where [[turner]] dissolved objects into light and atmosphere while still holding onto recognizable subject matter, the Modernists will abandon representation altogether. The Romantic painter stood in awe before nature; the Modernist turns inward, making the canvas itself the subject. The solitary figure gazing at an incomprehensible world becomes the fragmented figure who is that incomprehensibility — the shift from [[turner]] to [[picasso]], and from [[melville]]'s whale to [[ellison]]'s invisibility.

### 7.5 Modernism (`05-modernism/art.mdx`)

```yaml
unit: "05-modernism"
period: "Modernism"
dates: "c. 1900–1950"
core_text: "Invisible Man"
author: "Ellison"
domain: art
threads:
  - id: figure-space
    label: "Figure & Space"
    period_summary: "The unified, rational space of the Renaissance is progressively shattered — Cubism shows multiple viewpoints at once, and the human figure becomes fragmented, reassembled, sometimes unrecognizable."
  - id: light-shadow
    label: "Light & Shadow"
    period_summary: "Inherited systems of illumination are dismantled — Impressionists break light into component colors, and later modernists abandon representational light entirely, producing luminosity from the canvas itself."
  - id: brushwork-surface
    label: "Brushwork & Surface"
    period_summary: "The surface becomes the subject — what Rembrandt hinted at, modernism makes explicit: a painting is a flat surface covered with paint, and the artist's gesture is now everything."
hero_painting:
  title: "Les Demoiselles d'Avignon"
  artist: "Pablo Picasso"
  date: 1907
  medium: "Oil on canvas"
  dimensions: "height: 96 in; width: 92 in"
  location: "MoMA, New York"
  image: "/images/paintings/05-modernism/picasso-demoiselles.jpg"
gallery_paintings:
  - title: "Composition VII"
    artist: "Wassily Kandinsky"
    date: 1913
    threads: [brushwork-surface, light-shadow]
    image: "/images/paintings/05-modernism/kandinsky-composition-vii.jpg"
  - title: "The Dance"
    artist: "Henri Matisse"
    date: 1910
    threads: [figure-space, brushwork-surface]
    image: "/images/paintings/05-modernism/matisse-the-dance.jpg"
  - title: "A Bar at the Folies-Bergère"
    artist: "Édouard Manet"
    date: 1882
    threads: [figure-space, light-shadow]
    image: "/images/paintings/05-modernism/manet-bar-at-folies-bergere.jpg"
compare_back: "romanticism"
compare_forward: null
```
*(Modernism is the terminal unit — `compare_forward: null`, so the pager's "Next unit" link is absent on the last domain of this unit; but on the Painting page itself, "Next thread → Sculpture" still applies within the unit.)*

Body:

> **Introduction** — Modernism is really a convenient blanket term for a collection of modernisms, a series of radical breaks with the conventions that had governed European painting since the Renaissance. The coherent picture plane, the illusion of depth, the unified point of view, the smooth narrative surface: all of these are dismantled, questioned, or abandoned between roughly 1860 and 1960. This is the visual equivalent of [[ellison]]'s experiments with the form of the novel: fragmenting perspective, defamiliarizing the reader's understanding of American society, insisting that the old ways of seeing are inadequate to the complexity of modern experience.
>
> The arc of this course finally arrives here: from the medieval certainty that the world is divinely ordered and fully legible, through the Renaissance confidence that the individual mind can comprehend reality, the Baroque drama of cosmic conflict, the Enlightenment's social intelligence, and Romanticism's encounter with the sublime — to a moment when all inherited frameworks for making sense of the world are called into question at once.
>
> **Figure & Space** *("How is the human figure placed within the pictorial space?")* — The unified, rational space of the Renaissance is progressively shattered by the development of Modern painting. [[manet]] flattened his figures, eliminating the smooth tonal modeling that gave bodies their three-dimensional illusion. Cézanne fractured objects into geometric planes seen from slightly different angles simultaneously. Cubism completed the revolution: [[picasso]] and Braque broke figures and objects into shards, showing multiple viewpoints at once on a single flat surface. The figure is no longer whole, no longer occupying a coherent space. It is fragmented, reassembled, sometimes unrecognizable.
>
> *Connection to Invisible Man* — [[ellison]]'s narrator cannot be seen whole by the society around him. This is not merely a social observation but a formal principle: the novel itself fragments its protagonist across multiple identities, roles, and perspectives — college student, factory worker, Brotherhood orator, underground man — none of which adds up to a complete, coherent self visible from a single vantage point. This is Cubism applied to character. Just as [[picasso]]'s figures are seen from everywhere and nowhere simultaneously, [[ellison]]'s narrator is defined by the multiple, contradictory ways others see him (or refuse to see him). The "invisibility" of the title is not merely a metaphor for racism but a formal condition, the condition of a self that cannot be unified because the social space it inhabits is itself fractured and incoherent.
>
> Cubism's refusal to privilege a single viewpoint is also a refusal of authority, the authority of the Renaissance tradition that said there was one correct way to see. In [[ellison]]'s novel, no single ideology (the college's accommodationism, the Brotherhood's Marxism, Ras the Exhorter's nationalism) is presented as the correct viable frame of meaning and authority. The narrator's journey is precisely the discovery that every frame is partial, and that the only honest position is the one that acknowledges its own partiality.
>
> **Light & Shadow** *("How does the painting use light — its source, quality, and emotional effect?")* — Modernism dismantles the old systems of illumination. The Impressionists broke light into its component colors, applying pure pigments in small strokes that blend at a distance into luminous color. Light is no longer a steady, unified force but a shimmering, unstable phenomenon that changes moment to moment. Later modernists abandon representational light entirely: in Mondrian's grids or Rothko's color fields, light is not depicted but produced by the interaction of colors on the canvas. The painting does not display the lighting conditions of a presumed three-dimensional world; paint as medium generates its own luminosity.
>
> *Connection to Invisible Man* — [[ellison]]'s novel opens and closes in a basement illuminated by 1,369 light bulbs wired into the power grid of Monopolated Light & Power — stolen light, repurposed light, light that is simultaneously a defiant assertion of visibility and a confession of marginality. This image condenses the entire Modernist problem of illumination: the old sources of light do not illuminate the narrator, so he must create his own. The Impressionist insight that light is not a stable, objective phenomenon but something that shifts and fragments depending on conditions becomes, in [[ellison]]'s hands, a political and existential insight: who gets illuminated, by what sources, and at whose expense are not neutral questions.
>
> The novel's movement between visibility and invisibility, between moments of searing clarity and passages of surreal obscurity (the Liberty Paints factory, the hospital machine, the Harlem riot), recapitulates the Modernist dismantling of unified, rational illumination. Light in *Invisible Man* is partial, contested, and unreliable — exactly as it is in Modernist painting.
>
> **Brushwork & Surface** *("What is the physical character of the paint itself?")* — The surface of the painting becomes the subject. What [[rembrandt]] hinted at and [[manet]] forced into the open, Modernism makes explicit: a painting is a flat surface covered with paint, and pretending otherwise is a kind of willful self-deception. Abstract Expressionists like Pollock dripped and flung paint, making the physical act of painting visible as the work's primary content. The artist's gesture — the record of a body moving through time — replaces the depicted scene. This is the ultimate reversal of medieval anonymity: the individual artist's hand is now everything.
>
> *[PullQuote]* "A painting is a flat surface covered with paint, and the artist's gesture is now everything."
>
> *Connection to Invisible Man* — [[ellison]]'s novel is relentlessly self-conscious about its own surface — its language, its shifting registers, its visible artifice. The narrator's language moves between the rhetoric of sermons, jazz riffs, political oratory, naturalistic description, and surrealist hallucination; the shifts themselves are never disguised. There is always an awareness that someone is telling this story, performing it, and that the performance is part of the meaning. This is the literary equivalent of the Modernist insistence that the canvas is a canvas, the paint is paint, and the act of making is not something to be hidden behind a transparent surface. [[ellison]], like the Abstract Expressionists, makes the act of artistic creation — the energy, the improvisation, the risk — visible as content.
>
> **What to Notice** — In [[picasso]]'s *Les Demoiselles d'Avignon* above, notice how the five figures are shown from multiple angles simultaneously — frontal and profile views exist on the same face, spatial planes shift abruptly, and the background and foreground are compressed into a single fractured surface. This is not a window onto a world; it is a flat surface asserting its own logic.
>
> In the gallery below, [[kandinsky]]'s *Composition VII* abandons recognizable subject matter entirely — what you see is color, line, and energy operating without reference to the visible world. [[matisse]]'s *The Dance* reduces the human figure to its most elemental — flat, outlined, rhythmic — in a way that makes the pattern and movement more important than anatomical accuracy. [[manet]]'s *Bar at the Folies-Bergère* (an earlier work that anticipates the Modernist revolution) plays a subtle game with reflection, space, and the viewer's position that makes the painting's spatial logic feel deliberately unsettled.
>
> In all of these paintings, notice the surface asserting itself to the viewer: paint and canvas are never hidden or obscured by the illusion of space.
>
> **Looking Back** — The full arc of the course is visible here. The medieval gold ground — flat, symbolic, anonymous — was shattered by Renaissance perspective, which created a rational, measurable world anchored by a single viewpoint. The Baroque complicated that rationality with dramatic extremes of light and shadow, then Enlightenment domesticated the drama into social observation. Romanticism overwhelmed the social world with natural sublimity. Modernism breaks all of it apart — the unified space, the stable viewpoint, the coherent figure, the transparent surface — revealing that every previous way of seeing was itself a constructed artifice. This is both a loss (the comfortable illusions are gone) and a liberation (new ways of seeing become possible). [[ellison]]'s narrator, emerging from his underground room to affirm that "even an invisible man has a socially responsible role to play," is reaching for something beyond the fragmentation, not a return to old certainties, but a new kind of wholeness that can acknowledge its own complexity.
>
> *(No "Looking Forward" section — Modernism is the terminal unit.)*

---

## 8. Image assets

All images referenced above already exist at these exact paths in `public/images/paintings/`:

```
01-renaissance/  michelangelo-creation-of-adam.jpg · raphael-alba-madonna.jpg · leonardo-last-supper.jpg · raphael-school-of-athens.jpg · holbein-ambassadors.jpg
02-baroque/      caravaggio-supper-at-emmaus.jpg · caravaggio-calling-of-matthew.jpg · velazquez-las-meninas.jpg · rembrandt-self-portrait-1659.jpg
03-enlightenment/ fragonard-the-swing.jpg · boucher-secret-message.jpg · watteau-pilgrimage-to-cythera.jpg · fragonard-young-girl-reading.jpg
04-romanticism/  friedrich-wanderer.jpeg · delacroix-liberty.jpg · turner-slave-ship.jpg · gericault-raft-of-medusa.jpg
05-modernism/    picasso-demoiselles.jpg · kandinsky-composition-vii.jpg · matisse-the-dance.jpg · manet-bar-at-folies-bergere.jpg
```

BioLink targets (`[[id]]` above) resolve against the `PEOPLE` array in `src/components/BiographyPanel.jsx` — pull `name`, `dates`, `field`, `bio`, `significance`, and (if present) `portrait` path from there for anyone referenced (shakespeare, leonardo, michelangelo, raphael, martini, milton, caravaggio, rembrandt, velazquez, austen, watteau, boucher, fragonard, melville, friedrich, turner, delacroix, gericault, ellison, manet, picasso, kandinsky, matisse).

---

## 9. Known quirks / things not to "fix" when reproducing

- **Per-domain color is really per-unit.** Painting does not have its own accent color distinct from Philosophy/Sculpture/Music within the same unit — all four domain pages of a unit share one `--thread-acc`. Only the sub-thread rotation (`DOMAIN_THREAD_COLORS.art`) differs by domain.
- **`color-mix(in oklab, ...)`** is used extensively for tints (hero background gradients, sidebar card borders/backgrounds, sigil-box borders). This requires a modern evergreen browser; older/unsupported renderers will show the underlying flat background color instead of the tinted gradient.
- **`friedrich-wanderer.jpeg`** is the one `.jpeg` (not `.jpg`) file among all painting assets — preserve the extension exactly if re-hosting.
- **CLAUDE.md's accent color table is stale** relative to what's live on these five pages (see §2) — do not use it as the source of truth for this handoff.
- Sidebar "Works Discussed" always lists `gallery_paintings[]` in frontmatter order; it does **not** re-sort by the `threads[]` tags on each entry (those tags exist in the schema but aren't currently rendered/filtered on this page).
