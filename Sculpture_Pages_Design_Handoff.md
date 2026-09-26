# Design Handoff: Sculpture Pages (All Six Units)

**Purpose:** Everything needed to reproduce the exact current live appearance and structure of all six unit "Sculpture" domain pages on *Of Imagination All Compact* (the AP Literature companion site).

**Scope — all six pages covered by this handoff:**

| # | Unit | Live URL | Anchor text |
|---|------|----------|-------------|
| 0 | The High Middle Ages (Medieval) | `/units/00-medieval/sculpture` | *Hamlet* (foundation unit — Medieval has no anchor text of its own; its sculpture page is framed against *Hamlet*, the Renaissance's anchor) |
| 1 | Renaissance & Reformation | `/units/01-renaissance/sculpture` | *Hamlet* |
| 2 | The Baroque | `/units/02-baroque/sculpture` | *Paradise Lost* |
| 3 | The Enlightenment | `/units/03-enlightenment/sculpture` | *Pride and Prejudice* |
| 4 | Romanticism | `/units/04-romanticism/sculpture` | *Moby-Dick* |
| 5 | Modernism | `/units/05-modernism/sculpture` | *Invisible Man* |

Live site: https://ap-lit-site.tmurphy-ef9.workers.dev

**Source of truth:** All six pages render from **one shared template**, `src/pages/units/[unit]/[domain].astro`, parameterized by unit + domain frontmatter — the exact same file that generates the Painting, Philosophy, and Music pages. There is no per-unit or per-domain page file. Reproducing this template plus the six sculpture content files reproduces all six pages exactly. This document is self-contained (structure and CSS are restated in full here), but if a companion Painting-pages handoff exists in this repo (`Painting_Pages_Design_Handoff.md`), the shared-template sections below are identical to that document's — only the domain-specific pieces (hero/gallery schema, thread colors, icons, and all six units' content) differ.

---

## 1. Page anatomy (top → bottom)

1. **Topbar** — site brand (italic serif) + nav links (Timeline / People / Compare / Painting / Sculpture / Music), all caps, letter-spaced, bottom-rule divider.
2. **Header band** — full-bleed decorative SVG strip, unique per unit ("role 6" motif, tinted via `--mark-primary`/`--mark-highlight`).
3. **Breadcrumb** — `Home / Unit 0X · [Period Name] / Sculpture`, monospace, uppercase, 11px.
4. **Unit strip** — 4-column grid: giant unit number (e.g. "02") in accent color · title block (eyebrow "Unit · Anchor text" or "Unit · Foundation" + period name h2) · date range · a small circular per-unit sigil ("role 5" motif).
5. **Thread tabs** — 4-column tab bar: Philosophy · Painting · **Sculpture** (active) · Music, each with a 20×20 mini line-icon. The Sculpture icon is a hexagonal "cube" outline. Active tab gets raised background + colored bottom border + accent-colored label.
6. **Page head** — large bordered sigil box (hexagon/cube icon) + eyebrow "Thread III · Sculpture" + h1 `Sculpture: *[Period Name]*` (period name in italic muted color).
7. **Section terminator** — centered decorative SVG rule, unique per unit ("role 3" motif).
8. **Hero plate** — the unit's `hero_sculpture`: full-width bordered image on a tinted crosshatch background, artist stamp overlaid bottom-left on the image, caption bar below with title (italic) + byline (left) and date/medium/location (right, monospace). Rendered by the exact same `figure.hero-plate` markup/CSS as the Painting pages' `hero_painting` — sculpture photographs are not treated differently from paintings visually.
9. **Two-column layout** — prose column (flex 1, right-padded) + a vertical decorative motif divider ("role 2") + a 300px sticky sidebar.
10. **Prose column** (rendered from the unit's `.mdx` body):
    - MDX `# h1` and first `## Introduction` heading are hidden by CSS; the Introduction's paragraph becomes the lede.
    - Lede paragraph: larger (21px), brighter ink color, with a large serif drop-cap in the accent color.
    - Three sub-thread sections (**Body & Volume** / **Material & Making** / **Space & Setting**), each a `##` heading that JS turns into a 3-column grid: icon box (auto-numbered "01 — Sub-thread" etc.) + heading text (colored per sub-thread) + a per-unit medallion ornament ("role 1" motif) at top-right.
    - Immediately under each sub-thread heading, an italicized guiding question paragraph (auto-styled via `:has(> em:only-child)`) in the accent color.
    - `### Connection to *[Core Text]*` headings render as the top half of a two-part callout card; the paragraph immediately after becomes the bottom half — both share a left accent-colored bar.
    - Body paragraphs beginning with `**bold label:**` get the same callout-card treatment automatically (not used in the current sculpture bodies, but the CSS rule is present and shared).
    - Blockquotes: left accent border, italic, with optional `<cite>` byline.
    - `<PullQuote>` component: centered, no border, italic serif quote flanked by hairline brackets. **None of the six sculpture pages currently use `<PullQuote>`** — unlike several Painting pages, no sculpture body includes one. Don't add one; reproduce as absent.
    - Final `## Looking Forward` heading (last `h2` in the doc) is styled as an italic transitional headline, not a numbered sub-thread section. On Modernism specifically, this heading is present but its prose explicitly states there is no next-unit thread to hand off to (Modernism is the terminal unit) — style it identically to the other five; only the content differs.
11. **Sidebar** (sticky, 24px from top):
    - "Analytical Threads" card — 3 colored list items (icon + label + italic gloss), one per thread, tinted with that thread's sub-accent color and a left accent bar.
    - "Works Discussed" card — one entry per `gallery_sculptures[]` item: thumbnail image (max-height 160px, object-fit contain, on a sunken background), italic title, small-caps byline. **Medieval and Enlightenment each have only one gallery item**; Baroque has three; Renaissance has two; Romanticism has two; Modernism has four. The card still renders (it only requires `gallery_sculptures?.length`, i.e. at least one item).
12. **Pager** — two-column footer nav: "← Previous thread" (Painting) / "Next thread →" (Music), arrows colored in accent.
13. **Footer** — colophon ("Of Imagination All Compact · AP Literature") left, "Unit 0X / Sculpture" right.
14. **Bio modal** (hidden by default) — triggered by inline `BioLink` buttons in prose; portrait + field + name + dates header, bio paragraph, italic significance paragraph below a rule. Vanilla JS, not React, on these pages.

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

**Important:** these are the values actually used on the live pages today, taken directly from the `ACCENTS` map in `[domain].astro`. On every unit, `sculpture` shares the *same* accent as `philosophy`, `art`, and `music` for that unit — the accent is per-unit, not per-domain. (Note: this table differs from the accent color table in this repo's `CLAUDE.md`, which documents an older/aspirational palette — e.g. CLAUDE.md lists Renaissance as gold `#e8a820`; live pages render it as rust-red `#B54C3A`. Use the values below for an exact reproduction.)

| Unit | `--thread-acc` (primary) | Sub-thread palette (`subThreads`, rotated across the 3 sub-thread headings/sidebar chips) |
|---|---|---|
| 00-medieval | `#C9A24B` | `#C9A24B`, `#A88030`, `#E0B860` |
| 01-renaissance | `#B54C3A` | `#B54C3A`, `#943828`, `#D06050` |
| 02-baroque | `#B07028` | `#B07028`, `#8C5818`, `#CC8838` |
| 03-enlightenment | `#698BA1` | `#698BA1`, `#4A7088`, `#88A8BE` |
| 04-romanticism | `#3D5A6D` | `#3D5A6D`, `#2A4458`, `#506882` |
| 05-modernism | `#A03828` | `#A03828`, `#802818`, `#C04838` |

Additionally, the **Sculpture** domain specifically uses its own 3-color rotation for sub-thread sigils/headings/sidebar-thread-icons (`DOMAIN_THREAD_COLORS.sculpture`), applied in order across the 3 threads regardless of unit:
```
sculpture: ['#4F6B4D', '#5F8060', '#7B9883']   // deep moss green / mid sage / pale sage-gray
```
(Philosophy uses `['#3A332B','#5A5046','#857A6B']`; Painting uses `['#75435B','#94586E','#B58193']`; Music uses `['#574878','#6F5E95','#8C80AE']` — included for context only.)

So on every sculpture page, **Body & Volume** is tinted `#4F6B4D`, **Material & Making** is tinted `#5F8060`, and **Space & Setting** is tinted `#7B9883`, regardless of unit — only the large numerals, page-head sigil, drop cap, and ornament motifs change color per unit (via `--thread-acc` / `--mark-primary`).

### Ornament palette (`--mark-*`, separate from `--thread-acc`)

The decorative SVG motifs (header band, section terminator, sidebar divider, medallions, sigils) use their own color variables set inline on `<body>`, distinct from `--thread-acc`:

| Unit | `--mark-primary` | `--mark-highlight` | `--mark-spot` |
|---|---|---|---|
| 00-medieval | `#C9A24B` | `#E0C387` | `transparent` |
| 01-renaissance | `#B54C3A` | `#C68A7A` | `#2C4A82` |
| 02-baroque | `#B07028` | `#D49432` | `transparent` |
| 03-enlightenment | `#698BA1` | `#A2B7C8` | `transparent` |
| 04-romanticism | `#3D5A6D` | `#8AA3B5` | `#A85428` |
| 05-modernism | `#A03828` | `#D49A8C` | `#A07820` |

Fixed regardless of unit: `--mark-ink:#2C2820; --mark-cream:#F6F1E8; --mark-tile:#EDE8DC; --mark-rule:#C8C0B0; --mark-muted:#6B6355;`

---

## 3. Key component CSS (verbatim, condensed to the selectors that matter)

Full source: `src/pages/units/[unit]/[domain].astro` (single `<style is:global>` block, ~1100 lines, shared by all 24 unit/domain pages — nothing below is sculpture-exclusive markup beyond the selectors that key off `domain === 'sculpture'` in the frontmatter logic, noted where relevant).

**Unit strip number:**
```css
.unit-strip .num { font-family: var(--font-display); font-weight: 300; font-size: 72px; line-height: 0.85; color: var(--thread-acc); letter-spacing: -0.03em; }
```

**Page head h1:**
```css
.page-head h1 { font-family: var(--font-display); font-weight: 300; font-size: clamp(36px, 5vw, 64px); line-height: 1; letter-spacing: -0.02em; max-width: 22ch; }
.page-head h1 em { font-style: italic; color: var(--ink-mute); }
```

**Hero plate (identical markup path as Painting's `hero_painting` — the template branches on `domain === 'sculpture' && d.hero_sculpture` but renders the same `<figure class="hero-plate">` JSX/CSS):**
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
Note: `object-fit: contain` — the whole sculpture photo is always visible, letterboxed against the tinted gradient background, exactly as with paintings. There is no cropping to accommodate typically-taller/narrower sculpture photography; the gradient background fills the remaining space.

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

For the complete, unabridged CSS (pager, footer, bio modal, mobile breakpoints, etc.) pull directly from `src/pages/units/[unit]/[domain].astro`.

---

## 4. Behavior / interactivity

1. **Sub-thread heading decoration (client JS, inline `<script>` at bottom of page):** On `DOMContentLoaded`, finds all `<h2>` in `article.prose`, drops the first (Introduction, hidden) and last (Looking Forward), and for each remaining `<h2>` (the 3 sub-threads) injects, in order: a `.sigil-box` (SVG icon in that thread's rotation color), a `.sub-idx` label (`"01 — Sub-thread"`, `"02 — Sub-thread"`, `"03 — Sub-thread"`), the original heading text wrapped in `.sub-title`, and a `.section-medallion` (the per-unit "role 1" ornament). Sets `--sub-acc` inline per heading.
2. **Bio modal:** global click listener on `.bio-link-btn[data-bio-id]` anywhere in the document body; looks up the person in the `PEOPLE` array (from `BiographyPanel.jsx`, passed to the page as serialized JSON via `define:vars`) and populates `#bio-name`, `#bio-dates`, `#bio-field`, `#bio-bio`, `#bio-significance`, `#bio-portrait`. Closes on backdrop click, close button, or Escape.
3. **Sticky sidebar:** `position: sticky; top: 24px` on `aside`, disabled below 1100px viewport width (becomes static, stacks below prose).
4. **Responsive breakpoints:** tabs go 4-col → 2-col at 700px; page-head and two-column layout collapse to single column at ≤1100–720px (motif divider hidden entirely below 1100px).

---

## 5. Decorative SVG motif system (`PeriodMotif.astro` / `period-motifs.ts`)

Every unit has its own hand-tuned set of 6 SVG ornaments, keyed by "role" — identical mechanism to the Painting pages, since the motifs are per-*unit*, not per-domain:

| Role | Used where | Description |
|---|---|---|
| 1 | Sub-thread heading, top-right | Small circular medallion |
| 2 | Vertical divider between prose and sidebar | Tall thin vertical motif |
| 3 | Below the page-head, above the hero | Wide horizontal terminator rule |
| 4 | Inside `<PullQuote>` (when a `unit` prop is passed) | Bracket-shaped flourish — unused on all 6 sculpture pages currently |
| 5 | Unit strip, top-right | Small circular sigil |
| 6 | Full-bleed header band under the topbar | Long horizontal repeating pattern |

These are pre-rendered, parameterized SVG strings (using `var(--mark-primary)`, `var(--mark-highlight)`, `var(--mark-ink)`, etc.) stored per-unit in `src/data/period-motifs.ts` (auto-generated file, ~1,700 lines, one block per unit — do not hand-transcribe; pull the exact `<svg>...</svg>` string for each of the 6 units × 6 roles directly from that file for pixel-exact reproduction). Rendered via the tiny wrapper `src/components/PeriodMotif.astro`, which just does `<Fragment set:html={PERIOD_MOTIFS[unit][role]} />`.

Each unit's motif set is geometrically distinct (e.g. Medieval uses an 8-point compass rose / gothic tracery motif; Renaissance uses a rotated-square/circle "vitruvian" motif) — bespoke per-unit ornamentation, not a shared icon recolored. Treat `period-motifs.ts` as the canonical asset source for these; they are identical whether reached via a unit's Painting, Sculpture, Philosophy, or Music page (motifs key off `unit`, not `domain`).

---

## 6. Thread icons (sidebar "Analytical Threads" card + tab bar mini-icons)

Defined in `src/components/threadIcons.ts`, rendered via `src/components/ThreadIcon.astro` (a thin wrapper: `<svg viewBox width height style="color:{color}" set:html={icon.content}>`, so the SVG strokes use `currentColor`).

The three Sculpture threads (same 3 across all 6 units — only their `period_summary` text changes per unit):

- **`body-volume`** — viewBox `0 0 40 40`, default color `#D9A842`:
```html
<line x1="14" y1="4" x2="14" y2="36" stroke="currentColor"/>
<line x1="26" y1="4" x2="26" y2="36" stroke="currentColor"/>
<circle cx="20" cy="11" r="3.5" fill="none" stroke="currentColor"/>
<line x1="20" y1="15" x2="20" y2="32" stroke="currentColor"/>
<line x1="20" y1="19" x2="16" y2="26" stroke="currentColor"/>
<line x1="20" y1="19" x2="24" y2="26" stroke="currentColor"/>
<circle cx="20" cy="11" r="1" fill="currentColor" stroke="none"/>
```
(A stick figure flanked by two vertical guide-lines — reads as a body measured against a plinth or column.)

- **`material-making`** — viewBox `0 0 40 40`, default color `#C94C7C`:
```html
<rect x="6" y="18" width="28" height="16" fill="none" stroke="currentColor"/>
<line x1="10" y1="22" x2="30" y2="22" stroke-dasharray="2 2" stroke="currentColor"/>
<line x1="10" y1="26" x2="30" y2="26" stroke-dasharray="2 2" stroke="currentColor"/>
<line x1="10" y1="30" x2="30" y2="30" stroke-dasharray="2 2" stroke="currentColor"/>
<path d="M18 6 L 22 6 L 20 14 Z" fill="none" stroke="currentColor"/>
<line x1="20" y1="14" x2="20" y2="18" stroke="currentColor"/>
<circle cx="20" cy="16" r="1" fill="currentColor" stroke="none"/>
```
(A chisel/tool point above a striated stone block — reads as carving.)

- **`space-setting`** — viewBox `0 0 40 40`, default color `#4AB39A`:
```html
<path d="M6 36 L 6 16 L 20 6 L 34 16 L 34 36 Z" fill="none" stroke="currentColor"/>
<path d="M14 36 L 14 24 A 6 6 0 0 1 26 24 L 26 36" fill="none" stroke="currentColor"/>
<line x1="20" y1="24" x2="20" y2="36" stroke="currentColor"/>
<circle cx="20" cy="14" r="1.5" fill="currentColor" stroke="none"/>
```
(A simple gabled-portal/doorway outline — reads as architectural setting.)

Note: on the live Sculpture pages, the sidebar recolors these using the domain's rotation (`#4F6B4D / #5F8060 / #7B9883`, see §2) rather than each icon's own default color — the `color` prop passed to `<ThreadIcon>` overrides `icon.color`.

The tab-bar mini-icon for "Sculpture" (used identically on every unit) is a hexagonal/cube outline drawn inline in the template (not from `threadIcons.ts`):
```html
<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
  <path d="M20 6 L34 14 L34 28 L20 36 L6 28 L6 14 Z" />
  <path d="M6 14 L20 22 L34 14" />
  <line x1="20" y1="22" x2="20" y2="36" />
</svg>
```
The large page-head sigil box uses the same icon at 48×48 inside an 88×88 bordered box tinted `var(--bg-sunken)`, stroked in `var(--thread-acc)`.

---

## 7. Content — frontmatter + body, all 6 pages

Content source files: `src/content/units/{00-medieval,01-renaissance,02-baroque,03-enlightenment,04-romanticism,05-modernism}/sculpture.mdx`. Schema enforced by `src/content.config.ts` (`units` collection, `domain: 'sculpture'` branch: `hero_sculpture{title,artist,date,medium,dimensions,location,image}`, `gallery_sculptures[]{title,artist,date,threads[],image}`, `threads[]{id,label,period_summary}`). Note `date` is typed `z.union([z.number(), z.string()])` in the schema — used as a plain year (`1130`) on most entries but as a **string range** (`"1880–1917"`, `"1915–1923"`) for two long-gestation works below.

Body structure is identical across all 6: `## Introduction` (1–2 paragraphs, hidden heading) → `## Body & Volume` (guiding question + body + `### Connection to *[Text]*` callout) → `## Material & Making` (same pattern) → `## Space & Setting` (same pattern) → `## What to Notice` (references the hero + gallery images by name) → `## Looking Back` (compares to previous unit's hero sculpture — absent on Medieval, since there is no prior unit) → `## Looking Forward` (transitions to next unit; on Modernism, explains there is no next unit rather than omitting the heading).

### 7.0 The High Middle Ages / Medieval (`00-medieval/sculpture.mdx`)

```yaml
unit: "00-medieval"
period: "The High Middle Ages"
dates: "c. 1000–1400"
core_text: "Hamlet"
author: "Shakespeare"
domain: sculpture
title: "Sculpting Through Time: The Medieval Foundation"
threads:
  - id: body-volume
    label: "Body & Volume"
    period_summary: "Bodies are elongated, stylized, and subordinated to spiritual meaning — the physical form is a vehicle for theological truth, not an end in itself."
  - id: material-making
    label: "Material & Making"
    period_summary: "Sculpture is anonymous, collective, and embedded in architecture — the craftsman's identity disappears into the building's larger program."
  - id: space-setting
    label: "Space & Setting"
    period_summary: "Sculpture lives inside the cathedral's total theological environment — portal, nave, choir — where placement within the building is placement within the cosmos."
hero_sculpture:
  title: "Last Judgment Tympanum"
  artist: "Gislebertus"
  date: 1130
  medium: "Stone relief"
  dimensions: "width: approximately 21 ft"
  location: "Cathedral of Saint-Lazare, Autun, France"
  image: "/images/sculptures/00-medieval/gislebertus-last-judgment-tympanum.jpg"
gallery_sculptures:
  - title: "Royal Portal"
    artist: "Unknown"
    date: 1145
    threads: [body-volume, space-setting]
    image: "/images/sculptures/00-medieval/chartres-royal-portal.jpg"
compare_back: null
compare_forward: "renaissance"
```
*(Note: `core_text`/`author` here are Hamlet/Shakespeare, not null — even though Medieval is elsewhere described as the "foundation" unit with no anchor text of its own, the Sculpture page's frontmatter borrows the Renaissance's anchor text to frame its "Connection to Hamlet" sections and its unit-strip badge reads "Unit · Anchor text," not "Unit · Foundation," as a result. Reproduce this as-is — it is the live behavior, driven directly by frontmatter, not an inconsistency to silently fix.)*

Body:

> **Introduction** — Medieval sculpture serves a total theological program. It exists inside, on, and as part of the cathedral, which is itself a model of the cosmos, an image of the heavenly Jerusalem made in stone. The figures on a portal are not portraits or celebrations of individual human beings; they are presences arranged according to spiritual rank, teaching doctrine through their placement, scale, and gesture. The individual sculptor disappears into this program the way a single note disappears into plainchant.
>
> The stylized, hierarchical figures on medieval portals and tympanums are not failures of realism but achievements of a different kind. *Hamlet* is a play set in a world that still operates on medieval assumptions — a world of ghosts, divine judgment, hierarchical duty, and the weight of the afterlife pressing down on every decision. Understanding medieval sculpture means understanding the visual and material culture that shaped Elsinore's values, even as Shakespeare's protagonist begins to think his way out of them.
>
> **Body & Volume** *("How does the sculpture render the human body in three dimensions — idealized, naturalistic, fragmented, abstracted?")* — The bodies on the Autun tympanum are not anatomically accurate, and they are not meant to be. Figures are elongated, flattened, their proportions adjusted to fit the architectural field they occupy. The damned writhe in exaggerated contortion; the saved process in rigid, calm rows. The demons are monstrous. Christ in the central mandorla is enormous — not because he is physically large but because he is spiritually supreme. Hieratic scale — size indicating spiritual rank rather than physical reality — organizes every figure in the composition.
>
> This is the body understood as a vehicle for spiritual meaning rather than as an end in itself. A twisted body signals damnation; a calm, upright body signals grace. The physical form is legible, like a text, because every gesture and proportion carries a fixed meaning within the theological program. The Chartres portal figures take this further still: the column figures are so elongated, so absorbed into the architectural shafts they decorate, that they seem to be becoming stone — the human body yielding itself to a structure larger than any individual.
>
> *Connection to Hamlet* — The medieval body is always already mortal, and medieval culture never lets you forget it. The Last Judgment tympanum is a permanent reminder that the body will be weighed, judged, and either saved or damned — that every living body is a body on its way to that reckoning. Hamlet's graveyard scene is saturated with this awareness. When he holds Yorick's skull, he is doing what the tympanum does visually: stripping the body back to its spiritual stakes. "To what base uses we may return, Horatio." The humor and the horror of the scene are both medieval in their logic — the flesh is temporary, the judgment is real, and no amount of courtly performance changes what the body ultimately is.
>
> **Material & Making** *("What does the choice of material say about the work's ambitions and its culture?")* — Medieval sculpture is almost always limestone — the same stone as the cathedral itself — and this is not merely a practical choice. Limestone is permanent, impersonal, and communal. It belongs to the building, which belongs to God. The craftsmen who carved it worked in teams, trained in workshops, and passed their techniques through generations of anonymous labor. Their names were not recorded because their names did not matter. What mattered was the work's fidelity to the theological program and the quality of the devotional attention it would inspire.
>
> [[gislebertus]] is the striking exception. His name is carved directly beneath the feet of the Christ figure at Autun — "Gislebertus hoc fecit," Gislebertus made this — in a position so prominent that it cannot be missed. But notice what his signature does not claim: it does not assert individual artistic vision or personal expression. It is closer to a craftsman's mark, a record of accountability to the commission. Compare it to Michelangelo's signature on the *Pietà* — carved across the Virgin's sash, asserting authorship in the heart of Rome — and the cultural distance between the two acts is immediately legible. Gislebertus signs as a maker; Michelangelo signs as a genius.
>
> *Connection to Hamlet* — The medieval craftsman's anonymity — identity absorbed into institutional role — maps directly onto several of Hamlet's most troubling figures. Rosencrantz and Guildenstern have no existence outside their function as instruments of the king; they are courtiers the way a column figure is a column figure, their individuality subordinated to the program they serve. Polonius is more complex but ultimately the same: his identity is his institutional role. When Hamlet kills him — "Thou wretched, rash, intruding fool, farewell" — he kills not a person but a function. The Renaissance question the play keeps asking is whether there is a self beneath the role. The answer provided by the medieval world is that there doesn't need to be.
>
> **Space & Setting** *("Where does the sculpture live, and how does placement shape meaning?")* — The tympanum at Autun sits above the west portal of the cathedral — the door through which every worshipper enters. You pass beneath the Last Judgment to enter the church. This placement is not incidental; it is the work's entire meaning. The carved scene frames the threshold between the secular world and the sacred one, between the present life and the one to come. Every time you enter, you are reminded of what awaits. The architecture and the sculpture are a single theological argument, and you move through it rather than looking at it from outside.
>
> The Chartres Royal Portal operates on the same principle at greater scale. The three doorways of the west facade organize the entire portal program around a theological hierarchy: Christ in Majesty at the center, flanked by scenes of the Incarnation and the Last Judgment. The column figures — kings, queens, patriarchs, prophets — are not portraits of specific individuals but presences arranged to represent salvation history. To approach the cathedral is to walk through time, through prophecy and fulfillment, toward the eternal.
>
> This is total environment in a completely different sense from Bernini's Cornaro Chapel. Bernini stages an encounter with the divine as theater — immersive, spectacular, emotionally overwhelming. The medieval cathedral stages an encounter with the divine as cosmos — you are not watching something happen; you are being located within a structure that contains everything that has ever happened or will happen.
>
> *Connection to Hamlet* — Elsinore is a medieval space organized around judgment and hierarchy — a court where one's place in the order of things is everything, where the king's word is law, where the ghost of a murdered father demands that his son fulfill a duty assigned from beyond the grave. The ghost's demand is the Last Judgment tympanum made personal: everyone will be held accountable, the dead have claims on the living, and the proper response is obedience to a structure of authority that transcends individual will. Hamlet's tragedy is that he has a Renaissance mind trapped in a medieval world. He cannot simply obey — he must verify, question, and understand — but the world he inhabits has no place for that kind of hesitation. The cathedral portal does not ask whether we accept its terms. We pass beneath the judgment whether we believe in it or not.
>
> **What to Notice** — In the Autun tympanum above, begin with scale: Christ dominates the composition from his central mandorla, surrounded by angels and apostles, while the souls being weighed by the archangel Michael occupy a register below him. Notice the bodies of the damned — their contorted, elongated forms, fingers reaching desperately upward, a giant hand clamping down on a head. Then find the saved: upright, calm, orderly, their bodies expressing the opposite of the damned's twisting agony. Every body in the composition is readable as a spiritual state.
>
> Find Gislebertus's signature at the base of the Christ figure — "Gislebertus hoc fecit" — and consider what it means that a craftsman signed a work in this position, under the feet of Christ in judgment. In the Chartres Royal Portal in the gallery, notice how the column figures are absorbed into the architectural shafts — barely separated from the stone itself, their bodies elongated to match the proportions of the columns. They are presences, not portraits. The building is using them as much as they are inhabiting it.
>
> *(No "Looking Back" section — Medieval is the first unit.)*
>
> **Looking Forward** — The Renaissance will make everything the medieval cathedral suppresses the center of its program: the individual body, the named maker, the freestanding work that belongs to no building and no theological hierarchy. Donatello's *David* — nude, slight, self-possessed, standing free in space — is the precise inversion of a Chartres column figure. Where the medieval sculptor gives the body to the building, Donatello gives it back to itself. Where Gislebertus signs as a craftsman under the feet of Christ, Michelangelo signs as a genius across the Virgin's sash. The revolution is total — and its consequences are still playing out in *Hamlet*, where a mind formed in the Renaissance finds itself haunted by a world that has not yet made that journey.

### 7.1 Renaissance & Reformation (`01-renaissance/sculpture.mdx`)

```yaml
unit: "01-renaissance"
period: "Renaissance & Reformation"
dates: "c. 1400–1600"
core_text: "Hamlet"
author: "Shakespeare"
domain: sculpture
title: "Sculpting Through Time: Renaissance & Reformation"
threads:
  - id: body-volume
    label: "Body & Volume"
    period_summary: "The human body is recovered as the sculptor's primary subject — anatomically real, physically convincing, and capable of expressing inner life through posture and gesture."
  - id: material-making
    label: "Material & Making"
    period_summary: "Sculpture reclaims its independence from architecture: freestanding works in marble and bronze declare that the sculptor's craft can rival nature itself."
  - id: space-setting
    label: "Space & Setting"
    period_summary: "Sculpture moves into civic space — piazzas, doorways, public squares — where it makes visible arguments about the dignity and power of individual human beings."
hero_sculpture:
  title: "David"
  artist: "Michelangelo Buonarroti"
  date: 1504
  medium: "Marble"
  dimensions: "height: 196.9 in (including base)"
  location: "Galleria dell'Accademia, Florence"
  image: "/images/sculptures/01-renaissance/michelangelo-david.jpg"
gallery_sculptures:
  - title: "David"
    artist: "Donatello"
    date: 1440
    threads: [body-volume, material-making]
    image: "/images/sculptures/01-renaissance/donatello-david.jpg"
  - title: "Pietà"
    artist: "Michelangelo Buonarroti"
    date: 1499
    threads: [body-volume, space-setting]
    image: "/images/sculptures/01-renaissance/michelangelo-pieta.jpg"
compare_back: "medieval"
compare_forward: "baroque"
```
*(Note: two different sculptures are both titled "David" in this unit's gallery — Donatello's, dated 1440, in the sidebar, versus Michelangelo's, dated 1504, as the hero. Keep both titles literally "David" with artist/date as the sole disambiguator, matching the sidebar's `gallery-title`/`gallery-by` rendering.)*

Body:

> **Introduction** — Medieval sculpture served architecture. Figures filled the portals of cathedrals, populated the capitals of columns, and illustrated biblical narratives on tympanums, but they did so as part of a larger program, subordinated to the building's theological and structural purposes. The Renaissance reclaims sculpture as an independent art form capable of making its own claims about the world. The freestanding human figure returns for the first time since antiquity, and with it comes a new set of questions: What can a body say? How much can marble feel? What does it mean to sign your name to a work of stone?
>
> These questions produce some of the most powerful objects in Western art. They resonate directly with *Hamlet*, a play that continually interrogates what it means to be a human being in possession of a body, a name, and a will.
>
> **Body & Volume** *("How does the sculpture render the human body in three dimensions — idealized, naturalistic, fragmented, abstracted?")* — The recovery of the classical body is the Renaissance's foundational sculptural act. [[donatello]]'s *David* (c. 1440s) is the first freestanding nude figure in European sculpture since antiquity — a startling, almost uncanny object in its moment. It is not the body of a warrior but of an adolescent: slight, relaxed, one hip dropped in contrapposto, Goliath's head already under his foot. The victory is over. The boy stands in the aftermath, self-possessed in a way that feels almost indifferent, his gaze downward, the drama resolved before we arrived.
>
> Michelangelo's *David* (1504) makes a radically different temporal choice. Here the figure is depicted pre-action: colossal, taut, the gaze fixed on a point just off to the left where Goliath presumably stands. Every muscle is articulated with anatomical precision — the veins in the hand, the tension across the shoulders, the weight shifted onto the right leg. Yet the body is not yet moving. This *David* holds the instant of decision, the moment when the will is fully committed but the act has not yet begun. It is the most concentrated image of human agency produced by the Renaissance.
>
> *Connection to Hamlet* — Hamlet's famous meditation — "What a piece of work is a man, how noble in reason, how infinite in faculties, in form and moving how express and admirable" — is the verbal equivalent of Michelangelo's insistence on the human body's extraordinary dignity and capability. Hamlet in his soliloquy immediately undercuts himself: "and yet, to me, what is this quintessence of dust?" The *Pietà* gives that undercutting a physical form. Christ's body, draped across Mary's lap, conveys the specific weight and reality of corporeal death, a body magnificent and beautiful enough to inspire universal mourning.
>
> **Material & Making** *("What does the choice of material say about the work's ambitions and its culture?")* — The Renaissance sculptor works primarily in two materials: marble and bronze. Each carries its own set of ambitions. Marble is the material of antiquity, the classical tradition the Renaissance is consciously recovering — but it is also significantly harder than the limestone medieval cathedral sculptors worked in, and far less forgiving. A mistake that might be corrected in limestone can shatter marble. Working it demands individual mastery in a way that large-scale workshop carving of softer stone does not. [[michelangelo]] famously claimed that he simply removed the excess marble to reveal the figure already inside — a statement that captures the period's conviction that artistic genius is a form of perception, not merely of craft. The hardness of the material is part of what makes that claim meaningful: only an exceptional individual hand could do this.
>
> Bronze is technically more forgiving but culturally more assertive: it is the material of ancient civic monuments, of the equestrian statues of Roman emperors. To cast a freestanding figure in bronze is to assert that this subject deserves the same dignity as a Caesar. That Donatello makes this claim for a slight adolescent boy rather than a general or a saint is itself a statement about where the Renaissance locates human dignity.
>
> The period also introduces another significant innovation: the named maker. Medieval sculptors were largely anonymous, their identities subsumed into the workshop and the cathedral program. Michelangelo's signature runs across the strap of the Virgin's robe in the *Pietà* — a young sculptor from Florence asserting, in the heart of Rome, that the work is his, and his alone. This is not vanity but a new cultural claim: the individual artist's vision is the work's meaning.
>
> *Connection to Hamlet* — Shakespeare's play is full of questions about authorship and attribution — who wrote the play-within-the-play, who authored the current situation at Elsinore, whose interpretation of events is authoritative. Hamlet himself is obsessed with authenticity. Michelangelo signing the *Pietà* and Hamlet demanding that his grief be recognized as real ("I know not 'seems'") are gestures from the same cultural moment.
>
> **Space & Setting** *("Where does the sculpture live, and how does placement shape meaning?")* — Both of Michelangelo's major works in this gallery were made for specific public contexts that shaped their meaning. The *David* was commissioned for the Florence Cathedral but ultimately placed in the Piazza della Signoria — the civic heart of the republic — where it stood as a symbol of Florentine defiance, the small city facing down the colossal powers arrayed against it. The figure's size (over seventeen feet) was calculated to be read from below and at a distance, in the open air of a public square rather than the intimate scale of a gallery.
>
> The *Pietà* was made for a very different setting: a cardinal's funeral chapel in St. Peter's Basilica. Where the *David* dominates civic space, the *Pietà* occupies a sacred space. The intimacy of the group (the Virgin's lap cradling the full-grown body of her son) creates a scale that feels private, almost unbearably close, even when viewed in a vast basilica. The human figure belongs equally to the piazza and the chapel, to public life and to grief.
>
> *Connection to Hamlet* — Hamlet is a play acutely aware of settings and the meanings they impose. The court is a theater of surveillance; the graveyard is the one space where the play's pretenses fall away; the stage on which the players perform is a trap for a king. The *Pietà*'s placement in a funeral chapel resonates with the play's graveyard scene, where Hamlet holds Yorick's skull and confronts the body stripped of everything — name, performance, significance — that made it human. Both Michelangelo and Shakespeare represent the body in death as a site of irreducible meaning.
>
> **What to Notice** — In Michelangelo's *David* above, the scale is the first thing to register — seventeen feet of marble, engineered to be seen from below. Notice the hands: they are slightly too large for the body, a deliberate distortion that emphasizes David's grip on the sling and the weapon he is about to use. The face turns to the left, the brow furrowed, the eyes fixed. This is controlled intensity, will suspended at the instant before release.
>
> In Donatello's *David* in the gallery, notice the absence of effort, heroism, drama. The boy is simply standing, the giant's head beneath his heel, an expression of mild unconcern on his face. It is a strange and disquieting image of power. In the *Pietà*, look at the Virgin's face — serenely, impossibly young (Michelangelo said she was young because purity does not age) — and then at her lap, which is wider than anatomy would allow, engineered to hold the full weight of the adult body draped across it.
>
> **Looking Back** — Medieval sculpture, for all its expressive power, subordinates the individual body to a larger program. The figures on the Chartres portal are not quite people; they are presences arranged in a theological hierarchy, their bodies elongated and stylized to convey spiritual meaning rather than physical reality. The Renaissance refuses this subordination. The *David* insists on bodily specificity — this particular body, these particular muscles, this particular moment — as the primary vehicle of meaning. What the medieval sculptor hid in symbol and hierarchy, Michelangelo exposes in anatomy.
>
> **Looking Forward** — The Baroque will take the Renaissance body and subject it to forces it cannot contain. Where Michelangelo's *David* holds its energy in perfect suspension, Bernini's *David* releases it — the body in mid-action, the sling already moving, the face set in fierce concentration. Where the *Pietà* holds grief in a composition of almost impossible balance and stillness, Baroque sculpture will make grief writhe and transform. The Renaissance has established what the human body can do and be in marble; the Baroque will explore what that body looks like when its possibilities are pushed to their limit.

### 7.2 The Baroque (`02-baroque/sculpture.mdx`)

```yaml
unit: "02-baroque"
period: "The Baroque"
dates: "c. 1600–1700"
core_text: "Paradise Lost"
author: "Milton"
domain: sculpture
title: "Sculpting Through Time: The Baroque"
threads:
  - id: body-volume
    label: "Body & Volume"
    period_summary: "Baroque sculptors capture bodies at the instant of maximum tension — twisting, reaching, transforming — so that the fixed form seems to contain motion."
  - id: material-making
    label: "Material & Making"
    period_summary: "Bernini's marble is the period's signature achievement: stone rendered as flesh, hair, and fabric with an illusionistic virtuosity that asks you to distrust your own fingers."
  - id: space-setting
    label: "Space & Setting"
    period_summary: "Sculpture escapes its pedestal and colonizes architectural space — chapels, fountains, piazzas — drawing the viewer into a total dramatic environment."
hero_sculpture:
  title: "Apollo and Daphne"
  artist: "Gian Lorenzo Bernini"
  date: 1625
  medium: "Marble"
  dimensions: "height: 95.7 in"
  location: "Galleria Borghese, Rome"
  image: "/images/sculptures/02-baroque/bernini-apollo-daphne.jpg"
gallery_sculptures:
  - title: "The Ecstasy of Saint Teresa"
    artist: "Gian Lorenzo Bernini"
    date: 1652
    threads: [body-volume, space-setting]
    image: "/images/sculptures/02-baroque/bernini-ecstasy-saint-teresa.jpg"
  - title: "David"
    artist: "Gian Lorenzo Bernini"
    date: 1624
    threads: [body-volume, material-making]
    image: "/images/sculptures/02-baroque/bernini-david.jpg"
  - title: "Milo of Croton"
    artist: "Pierre Puget"
    date: 1682
    threads: [body-volume, material-making]
    image: "/images/sculptures/02-baroque/puget-milo-croton.jpg"
compare_back: "renaissance"
compare_forward: "enlightenment"
```
*(A third "David" appears here — Bernini's, 1624 — making three same-titled Davids across Renaissance + Baroque galleries/heroes combined; disambiguate purely by artist/date as the live sidebar does.)*

Body:

> **Introduction** — Baroque sculpture refuses to be looked at from a safe distance. Where Renaissance sculptors crafted figures meant to be contemplated — stable, self-contained, placed on pedestals to be admired — Baroque sculptors created figures that reach into the viewer's space, demand a response, and refuse to resolve into stillness. The drama is the point, and it is everywhere: in the twist of a body, the texture of marble rendered as cloth or flesh, the theatrical staging of entire chapels designed as unified environments.
>
> The figure most responsible for this transformation is [[bernini]], whose work dominates this unit as completely as Caravaggio and Rembrandt dominate the painting pages. Bernini was also an architect, stage designer, and theatrical impresario; he applied all of those varied skills to his sculpture. His works don't occupy space; they organize it.
>
> **Body & Volume** *("How does the sculpture render the human body in three dimensions — idealized, naturalistic, fragmented, abstracted?")* — No single comparison clarifies the Baroque body more quickly than the three *Davids*. Donatello's *David* (c. 1440s) stands in easy contrapposto after the fight is over: relaxed, self-possessed, the severed head already beneath his foot. Michelangelo's *David* (1504) is imagined pre-action: the body coiled, the gaze fixed, the moment of decision held in suspension. Bernini's *David* (1624) captures the moment of action. The torso twists violently, the face set in fierce concentration, the sling already in motion.
>
> This "action shot" of David in motion is the Baroque's defining sculptural statement. The body is not a stable form to be admired but a site of dynamic movement. Bernini captures it at maximum tension in his work. The same principle depicts Daphne's fingers already becoming leaves, her bark rising, her mouth open in a cry that is also the beginning of silence. [[puget]]'s *Milo of Croton* pushes this logic to its extreme: the Greek athlete who tried to split an oak with his bare hands and was trapped when the tree closed around him is shown at the moment of maximum muscular effort that is also maximum helplessness. These are bodies overwhelmed — by transformation, by nature's indifference, by forces they cannot master.
>
> *Connection to Paradise Lost* — [[milton]] is one of the great poets of the body under pressure. His fallen angels retain their titanic forms even as they are diminished — Satan's "form had yet not lost / All her original brightness" — and the poem returns obsessively to the gap between what bodies were and what they have become. The Fall is also a transformation. Adam and Eve are irrevocably changed by their choice, their perfected forms giving way to shame, labor, and mortality.
>
> **Material & Making** *("What does the choice of material say about the work's ambitions and its culture?")* — The Baroque sculptor's material is almost always marble — and the Baroque's central ambition is to make marble deny its own solid nature. Marble's capacity for a luminous surface finish — impossible in the porous limestone of medieval cathedrals — is what makes this ambition achievable: polished to the right degree, it can be made to suggest warmth, translucency, even the give of flesh. Bernini exploits this to its limit. His ability to render Daphne's bark-becoming skin, her hair lifting in a wind as it transforms into blown leaves, her terrified flesh still somehow warm beneath the transformation is a claim about what art can do: the sculptor's intelligence and hand can extract from cold stone something more convincingly alive, matter made to transcend its own nature.
>
> This ambition is inseparable from its cultural context. The Counter-Reformation Church needed art that would move people, overwhelming their senses and producing conviction through strong feeling. Bernini was the Church's primary visual instrument in Rome, and his willingness to push marble to its illusionistic extreme was a theological as well as an aesthetic commitment. The *Ecstasy of Saint Teresa* is simultaneously the most technically daring marble carving of the century and a precise instrument of devotional persuasion.
>
> *Connection to Paradise Lost* — [[milton]]'s language works on the same principle, pushing past the apparent limits of poetic expression. Latinate constructions carried over into English, double syntax that requires multiple re-readings, heavily enjambed stanzas that the poet sometimes imagined as bodies with their own freedom of movement — [[milton]] deploys the English language against its own grain, demanding that it carry a weight it was not built to convey.
>
> **Space & Setting** *("Where does the sculpture live, and how does placement shape meaning?")* — Bernini understood that a sculpture's environment is part of its meaning. The *Ecstasy of Saint Teresa* is not just a carved group but an entire chapel installation: the marble figures of Teresa and the angel are suspended in a gilded light-shaft above an altar, flanked by side walls carved with box seats from which marble portrait figures of the Cornaro family watch the ecstasy as if from theater balconies. Real light enters from a hidden window above and strikes gilded rays behind the figures.
>
> This is a decisive break from Renaissance sculptural practice, where the work was self-contained and the setting secondary. Baroque sculpture colonizes its environment. Fountains erupt in Roman piazzas — Bernini's *Fountain of the Four Rivers* makes water itself a sculptural medium. Portal programs give way to freestanding works that organize the space around them rather than filling an assigned slot within it.
>
> *Connection to Paradise Lost* — [[milton]] constructs his epic as a total environment the reader must move through rather than a series of episodes to be observed from a fixed position. The poem's scale is spatial as much as narrative, asking the reader to hold Heaven, Hell, Chaos, and the Garden in their mind simultaneously. When Satan crosses Chaos in Book II on his way to discover the "pendent" Earth that hangs below Heaven, the reader feels the vertiginous scale of the Miltonic universe.
>
> **What to Notice** — In *Apollo and Daphne* above, begin with the surfaces. Bernini has carved bark growing up Daphne's thighs, her toes rooting into stone below her feet, her fingers branching into actual leaves — all in a single block of marble. Notice how the composition pulls your eye upward and outward in a spiral: Apollo's reaching arm, Daphne's recoiling torso, the explosion of leaves at the top. The group has no stable front; it was designed to be walked around, offering a different dramatic moment from each angle.
>
> In *The Ecstasy of Saint Teresa*, look for the hidden window above and behind the figures — the source of the real light that falls on the gilded rays. Then look at the Cornaro family portraits in their theater boxes on the side walls. Bernini has made us members of the audience at Teresa's vision. In the *David*, find the face: it is Bernini's own, according to his biographer, and it conveys something very different from the serene confidence of Michelangelo's version. This David bites his lip, his brow furrowed, his whole body committed to an action he cannot retract. Puget's *Milo of Croton* rewards close attention to the muscles: the body is anatomically hyper-specific, every tendon described, which makes its helplessness all the more devastating.
>
> **Looking Back** — The three *Davids* tell this story in miniature: Donatello's self-possessed stillness, Michelangelo's suspended decision, Bernini's violent mid-action commitment. Each is a different answer to the question of where the human figure stands in relation to the forces acting on it. Bernini's answer is the Baroque one: fully engaged, fully exposed, past the point of return.
>
> **Looking Forward** — Enlightenment sculpture will return to calm but a different calm than the Renaissance's confident humanism — more deliberate, more archaeological, more self-consciously in dialogue with the classical past. Canova's figures achieve a serenity that looks back to ancient Greece, absorbing the Baroque's illusionistic ambitions but disciplining them to quieter purpose. The theatrical environment collapses back into the controlled elegance of the self-contained work, shifting from the chapel stage to the gallery plinth.

### 7.3 The Enlightenment (`03-enlightenment/sculpture.mdx`)

```yaml
unit: "03-enlightenment"
period: "The Enlightenment"
dates: "c. 1700–1800"
core_text: "Pride and Prejudice"
author: "Austen"
domain: sculpture
title: "Sculpting Through Time: The Enlightenment"
threads:
  - id: body-volume
    label: "Body & Volume"
    period_summary: "The body is disciplined, idealized, and legible — a rational surface that expresses character, virtue, and social position rather than spiritual anguish or physical transformation."
  - id: material-making
    label: "Material & Making"
    period_summary: "Sculptors turn to ancient Greece and Rome as models of rational perfection — archaeology provides the standard, and the sculptor's task is to recover and refine it."
  - id: space-setting
    label: "Space & Setting"
    period_summary: "Sculpture enters civic and domestic space — portrait busts in libraries, allegorical figures in public squares — as visible arguments about reason, virtue, and social identity."
hero_sculpture:
  title: "Voltaire Seated"
  artist: "Jean-Antoine Houdon"
  date: 1781
  medium: "Marble"
  dimensions: "height: 47.2 in"
  location: "Comédie-Française, Paris"
  image: "/images/sculptures/03-enlightenment/houdon-voltaire-seated.jpg"
gallery_sculptures:
  - title: "Psyche Revived by Cupid's Kiss"
    artist: "Antonio Canova"
    date: 1793
    threads: [body-volume, material-making]
    image: "/images/sculptures/03-enlightenment/canova-psyche-revived.jpg"
compare_back: "baroque"
compare_forward: "romanticism"
```

Body:

> **Introduction** — Enlightenment sculpture presents its argument through the human face. Where Baroque sculptors captured the body at the twisting, transforming, ecstatic instant of overwhelming physical and spiritual crisis, Enlightenment sculptors focus on the face as the site of character, reason, and social identity. The portrait bust becomes the period's defining sculptural form: a head and shoulders, rendered with unflinching specificity, asserting that this particular person's mind matters.
>
> The presiding genius of this development is [[houdon]], whose portrait busts of Voltaire, Franklin, Jefferson, Washington, and Rousseau constitute a kind of sculptural encyclopedia of Enlightenment thought. Houdon did not merely reproduce likenesses; he produced character studies — faces in which one can read the quality of the mind within. His *Voltaire* is the period's supreme achievement: an old man's body in a Roman toga, alert eyes beneath an ironic brow, the whole figure radiating the sardonic intelligence that had discomfited kings and bishops for six decades.
>
> *Pride and Prejudice* is a novel about exactly this kind of legibility — about whether a face, a manner, a first impression reliably reveals the person behind it.
>
> **Body & Volume** *("How does the sculpture render the human body in three dimensions — idealized, naturalistic, fragmented, abstracted?")* — The Enlightenment body in sculpture is disciplined and controlled — neither the medieval figure's subordination to theological program nor the Baroque figure's explosion into physical crisis, but something more measured and socially legible. Houdon's portrait subjects are rendered with remarkable specificity: the loose skin at Voltaire's throat, the sharp alertness of his eyes, the slight forward inclination of the body that suggests a mind perpetually engaged. This is naturalism in the service of character revelation. Accuracy is conveyed not as an end in itself but as a way of making the inner life visible on the outer surface.
>
> [[canova]]'s approach is the counterpoint. His *Psyche Revived by Cupid's Kiss* achieves a surface so refined, so smoothly idealized, that it seems to transcend individual bodies altogether. These are not particular people but perfected forms, the classical ideal recovered and polished to an impossible smoothness. Where Houdon insists on the individual, Canova insists on the type. Both are Enlightenment gestures: one says that the particular rational individual deserves to be seen clearly; the other says that beauty, like reason, tends toward the universal and the ideal.
>
> *Connection to Pride and Prejudice* — [[austen]]'s novel is organized around the problem of reading faces — whether surface manner reliably reveals inner character. Wickham's is the face that performs perfectly: handsome, open, agreeable, he produces exactly the impression he intends. Darcy's face is unreadable in a different way. His expression, which Elizabeth reads as proud contempt, turns out to conceal a complex emotional life. The novel's great question is whether the Enlightenment premise that careful, rational observation of surfaces yields reliable knowledge of what lies beneath holds up in the social world. Houdon's portrait busts argue that a social observer can study the face long enough, with enough honest attention, and character will reveal itself.
>
> **Material & Making** *("What does the choice of material say about the work's ambitions and its culture?")* — The Enlightenment sculptor's turn to classical antiquity as a model is not mere nostalgia. The German art historian [[winckelmann]], whose *Thoughts on the Imitation of Greek Works* (1755) became the theoretical foundation of neoclassicism, argued that ancient Greek sculpture represented the highest achievement of human art precisely because it was the product of a rational, free society; modernity can recover that achievement only by recovering those social conditions. The implication was radical: great art is not a matter of divine inspiration or individual genius alone. It is best regarded as the product of an entire culture that values freedom and reason.
>
> Canova absorbed this argument completely. His marbles are worked to a finish that makes Bernini's illusionistic virtuosity look almost rough by comparison — surfaces so smooth they seem lit from within, forms so idealized they suggest that the sculptor's task is but to reveal an ideal already present in the stone. The material ambition is neoclassical perfection: not marble pretending to be flesh (the Baroque approach), but marble achieving a beauty that transcends the distinction between stone and skin.
>
> *Connection to Pride and Prejudice* — Winckelmann's argument — that artistic achievement is the product of rational, free social conditions — has a counterpart in [[austen]]'s portrait of Regency society. The novel insists that genuine virtue, like great art, cannot be produced by systems of mere constraint and performance. Lady Catherine's world, in which rank substitutes for character and social position does the work of moral authority, produces Mr. Collins — a man so thoroughly formed by deference that he has no self left with which to exercise judgment. What Austen's characters who grow and change share with Winckelmann's Greeks is the capacity for free, rational self-examination.
>
> **Space & Setting** *("Where does the sculpture live, and how does placement shape meaning?")* — Houdon's busts went everywhere that Enlightenment thought traveled. Voltaire's likeness presided over the Comédie-Française; a terra cotta version circulated among salons and libraries across Europe. Jefferson commissioned a life-size standing figure for the Virginia State Capitol — the first such civic monument in the new republic, deliberately modeled on a Roman senator to argue that the American experiment was the heir to classical republican virtue. Franklin and Rousseau were similarly multiplied and distributed; to own a Houdon bust was to announce your intellectual commitments, to align yourself publicly with the values of reason and rational governance.
>
> This is sculpture functioning as argument in domestic and civic space. The cathedral's total theological environment (which located the viewer within the cosmos whether they consented or not) is replaced by a voluntary, personal statement. The drawing room or library where a Houdon bust sat was a space of rational sociability — conversation, correspondence, debate — and the sculpture was a participant in that conversation, a reminder of the values that the room's inhabitants were trying to embody.
>
> *Connection to Pride and Prejudice* — [[austen]]'s world is saturated with this kind of spatial argument. Pemberley's portrait gallery — where Elizabeth encounters Darcy's likeness and begins to revise her judgment of him — operates on exactly the principle of Houdon's portrait busts: a face rendered with honest specificity, encountered in a domestic setting, producing a reassessment of character. The portrait "had a striking resemblance to him, with such a smile over the face as she had sometimes seen when he looked at her." Situated in his own estate, the painting humanizes Darcy in a way that the social performance of the Netherfield Ball could not.
>
> **What to Notice** — In Houdon's *Voltaire* above, begin with the face: the eyes are sharp, slightly narrowed, with an expression that hovers between amusement and challenge. The body is draped in a Roman toga — the period's conventional signal of civic virtue — but the specificity of the aging face refuses the timelessness that the classical drapery implies. This is a real man, with a real history, wearing the costume of an ideal. The tension between the universal and the particular is the work's central drama.
>
> In Canova's *Psyche Revived* in the gallery, notice the opposite approach: the faces are idealized to the point of near-abstraction, the surfaces impossibly smooth, the forms so refined that the distinction between marble and flesh seems genuinely suspended. Compare the two works and see the Enlightenment's internal debate made visible: is the goal of rational inquiry to reveal the truth of the particular, or to recover the perfection of the universal?
>
> **Looking Back** — Baroque sculpture conceived the body as a site of crisis — twisting, ecstatic, overwhelmed. Enlightenment sculpture disciplines the body back into legibility: a face that reveals character, a posture that announces civic identity, a surface that repays patient rational attention. The shift from Bernini to Houdon is the shift from a world of figures caught up in forces larger than themselves to a world in which the individual, examined carefully and honestly, is the measure of manners and character.
>
> **Looking Forward** — Romanticism will find the Enlightenment's rational surface insufficient. Houdon's faces reveal character through careful observation, but Romantic sculpture will ask about what observation cannot reach: the inner life of feeling, the body under the pressure of passion and grief rather than the pressure of rational self-presentation. Rodin's figures will abandon the Enlightenment's legible social surface for something rawer and more interior. The unfinished marble — the figure still half-emerged from the stone, as if the sculptor has caught a private moment of becoming rather than a public moment of being — will replace the polished neoclassical ideal.

### 7.4 Romanticism (`04-romanticism/sculpture.mdx`)

```yaml
unit: "04-romanticism"
period: "Romanticism"
dates: "c. 1789–1880"
core_text: "Moby-Dick"
author: "Melville"
domain: sculpture
title: "Sculpting Through Time: Romanticism"
threads:
  - id: body-volume
    label: "Body & Volume"
    period_summary: "Romantic sculpture abandons neoclassical idealization for bodies under pressure — weighted by grief, driven by passion, caught in the struggle between individual will and overwhelming force."
  - id: material-making
    label: "Material & Making"
    period_summary: "Rodin's unfinished surfaces — figures half-emerging from rough stone — declare that the struggle between form and formlessness is the subject, not a failure of craft."
  - id: space-setting
    label: "Space & Setting"
    period_summary: "Sculpture divides: Rodin's studio works turn inward toward psychological intensity, while Rude's public monuments carry Romantic energy into civic and nationalist space."
hero_sculpture:
  title: "The Burghers of Calais"
  artist: "Auguste Rodin"
  date: 1889
  medium: "Bronze"
  dimensions: "height: 82.7 in"
  location: "Musée Rodin, Paris (original); multiple casts worldwide"
  image: "/images/sculptures/04-romanticism/rodin-burghers-calais.jpg"
gallery_sculptures:
  - title: "The Gates of Hell"
    artist: "Auguste Rodin"
    date: "1880–1917"
    threads: [body-volume, material-making]
    image: "/images/sculptures/04-romanticism/rodin-gates-of-hell.jpg"
  - title: "La Marseillaise (The Departure of the Volunteers of 1792)"
    artist: "François Rude"
    date: 1836
    threads: [body-volume, space-setting]
    image: "/images/sculptures/04-romanticism/rude-la-marseillaise.jpg"
compare_back: "enlightenment"
compare_forward: "modernism"
```
*(Note the `date: "1880–1917"` string for The Gates of Hell — a multi-decade work-in-progress; render the range verbatim in the gallery byline, e.g. "François Rude · 1836" but "Auguste Rodin · 1880–1917".)*

Body:

> **Introduction** — [[rodin]] breaks the pedestal of Western sculpture, literally and figuratively. His *Burghers of Calais* was designed to stand at ground level among ordinary people, not elevated on a traditional plinth. The decision is a manifesto: Romantic sculpture insists that the body in its full psychological and physical reality belongs in the world, not above it. Where Enlightenment sculptors disciplined the body into legible, rational surfaces that could be read like texts, Rodin makes the body the site of interior struggle, collective grief, and individual will pressing against its own limits.
>
> [[melville]]'s *Moby-Dick* is similarly obsessed with bodies under pressure and makers pursuing their work past the point of rational control. Rodin and Melville share a Romantic conviction that the most important truths are found not in polished surfaces but in the probing encounter with the ineffable sublime.
>
> **Body & Volume** *("How does the sculpture render the human body in three dimensions — idealized, naturalistic, fragmented, abstracted?")* — The six figures of the *Burghers of Calais* commemorate the men who offered their lives to Edward III of England to spare their city during the Hundred Years' War. Rodin does not give them heroic bodies. They are heavy, tentative, burdened — each figure isolated within the group, each facing the decision alone even as they face it together. Hands hang, heads bow, feet drag. One figure throws his arms wide in what might be despair or surrender. The bodies express what no classical or neoclassical sculptor would have shown: courage and grief can occupy the same body at the same moment, and the heroic act can look, from the inside, like devastation.
>
> [[rude]]'s *La Marseillaise* offers the counterpoint — bodies not weighted by grief but ignited by passion. The central winged figure of Liberty surges forward and upward, mouth open in a battle cry, her body at the full extension of forward motion. The warriors below her are equally charged, their forms expressing the explosive energy of collective revolutionary action. This is the Romantic body in its exhilarated rather than anguished mode, not burdened by decision but propelled by conviction.
>
> *Connection to Moby-Dick* — The *Burghers* maps onto the *Pequod*'s crew with uncomfortable precision. These are men yoked to a collective enterprise they did not fully choose, each carrying the weight of what is coming in their own body, isolated within a group. Pip, the cabin boy, carries that isolation to its extreme — lost in the open ocean, his mind broken by the vastness of what he encounters. Ahab's body is itself a Romantic subject: the scarred, peg-legged figure driving himself and his crew toward an encounter that his body has already recorded as catastrophe.
>
> **Material & Making** *("What does the choice of material say about the work's ambitions and its culture?")* — Rodin's most radical formal innovation is the unfinished surface. In works like *The Gates of Hell* — the monumental bronze door commission he worked on for nearly four decades without completing — figures emerge from rough, unworked stone or dissolve back into it. The boundary between the finished form and the raw material is deliberately refused. The struggle between form and formlessness, between the sculptor's will and the stone's resistance, is itself the subject.
>
> *The Gates of Hell* began as a commission for a decorative arts museum and became an obsession — a lifetime's accumulation of figures, all drawn from Dante's *Inferno*, reworked and repositioned over decades. The *Thinker* originated here, as did *The Kiss* and dozens of other figures. Rodin recycled forms across works, combined figures from different projects, and never declared the piece finished. The gates are, finally, a monument to the act of making rather than to any completed statement — a work that mirrors its subject (souls in perpetual torment) in its own perpetual incompletion.
>
> *Connection to Moby-Dick* — [[melville]]'s novel can be read as a book about a man who cannot stop working. The cetology chapters — the obsessive cataloguing of whale anatomy, behavior, and history — are Ishmael's version of Rodin's unfinished surface: an accumulation of material that circles around its subject without ever capturing it. The whale resists every system of classification the way raw stone resists the sculptor's chisel. Ahab's pursuit is the purest expression of the Romantic maker's obsession: he will remake the world or destroy himself in the attempt. Rodin working on the *Gates of Hell* for thirty-seven years without finishing is a figure of obsessive toil comparable to mad Ahab, driving the *Pequod* across every ocean in pursuit of a creature that may well be beyond human reach.
>
> **Space & Setting** *("Where does the sculpture live, and how does placement shape meaning?")* — Rodin's original design for the *Burghers* placed the six figures directly on the ground, at the same level as viewers, without a pedestal. The city of Calais rejected this — pedestals were expected, hierarchy was the convention — and the work was eventually installed on a low base. But Rodin's intention was clear: the figures should be among us, not above us. Their grief is not monumental but human, and its power depends on proximity. When the work is finally installed as Rodin intended, as it is in several locations today, the effect is immediate — you walk among figures who seem poised to leave the space, each alone with their decision.
>
> Rude's *La Marseillaise* occupies the opposite end of the spatial spectrum. Carved in high relief on the Arc de Triomphe in Paris, it is public sculpture at its most monumental — high above street level, readable from a distance, designed to be part of the city's symbolic architecture. The Arc was Napoleon's commission; the relief celebrates the revolutionary army that preceded him. The sculpture is inseparable from its setting: to see it is to see it on the Arc, in the city, at the axis of the great Parisian boulevards. Its meaning is civic, nationalist, and collective.
>
> *Connection to Moby-Dick* — The contrast between Rodin's ground-level grief and Rude's elevated civic energy maps onto a tension at the heart of *Moby-Dick*: between the collective enterprise and the individual experience of it. The *Pequod* is a public vessel with a manifest civic and commercial purpose; a whaling ship was a floating factory and a profit-making enterprise. But what happens aboard after Ahab turns the Pequod into an instrument of revenge is profoundly private: each man on board suffers his own encounter with fear, with the sublime, with his own limits. Ishmael's narrative shifts between the ship's collective life and the interior life of the individual consciousness observing it. Rodin places his figures in the civic square but strips away the civic elevation; [[melville]] places his narrator on a commercial vessel but strips away the economic purpose. Both artists insist that the private, interior life of the body persists beneath its public role.
>
> **What to Notice** — In the *Burghers of Calais* above, find the hands first — they are among the most expressive elements in the group. One figure's hands hang with an extraordinary heaviness, the fingers slightly open, as if the decision to hold anything has been abandoned. Another's grip the oversized key to the city with a combination of purpose and dread. Then look at the faces: each is different, each private, none turned toward the others. These men are together in their ordeal and alone in it simultaneously.
>
> In *The Gates of Hell* in the gallery, find the *Thinker* at the top — Rodin's original figure is not pondering philosophically but physically straining, every muscle engaged, as if thought itself were an act of violent effort. Notice where the figures at the edges of the doors begin to dissolve into the bronze ground, bodies losing their definition as they return to the undifferentiated material from which they emerged. In Rude's *La Marseillaise*, find the contrast between the figures at the bottom of the relief — warriors preparing for battle, their bodies in active, purposeful motion — and the central winged figure above them, whose open mouth and forward surge communicate something beyond purpose: pure passionate force.
>
> **Looking Back** — Enlightenment sculpture disciplined the body into social legibility — a face that revealed character, a posture that announced civic identity, a surface smooth enough to repay rational attention. Rodin refuses all three. His surfaces are rough or deliberately incomplete; his figures' faces express states that exceed social legibility; their postures do not announce civic identity but register interior devastation. The shift from Houdon's *Voltaire* to Rodin's *Burghers* is the shift from a world in which the rational individual is the measure of things to a world in which the individual is overwhelmed — by grief, by obsession, by forces that no amount of rational self-examination can master.
>
> **Looking Forward** — Modernism will take Rodin's dissolution of the finished surface and push it past representation entirely. Where Rodin's figures emerge from rough stone but remain recognizably human, Brancusi will reduce the human form to pure abstract volume — an egg, a column, a bird's wing. Where Rodin's *Gates of Hell* accumulates figures in a restless, unresolved composition, Duchamp will provocatively question the boundaries of fine art by presenting a mass-produced urinal as sculpture. The Romantic conviction that the struggle of making is itself the subject survives into Modernism, but the forms it produces become unrecognizable as the human body that Rodin never entirely abandoned.

### 7.5 Modernism (`05-modernism/sculpture.mdx`)

```yaml
unit: "05-modernism"
period: "Modernism"
dates: "c. 1900–1950"
core_text: "Invisible Man"
author: "Ellison"
domain: sculpture
title: "Sculpting Through Time: Modernism"
threads:
  - id: body-volume
    label: "Body & Volume"
    period_summary: "The human body is reduced, elongated, abstracted, or abandoned — Modernist sculpture asks whether the figure is still necessary, and what remains when it is stripped to its essence."
  - id: material-making
    label: "Material & Making"
    period_summary: "Sculpture abandons traditional craft entirely — welded steel, found objects, industrial materials — asking not just how things are made but whether the category of sculpture has any boundaries left."
  - id: space-setting
    label: "Space & Setting"
    period_summary: "The pedestal disappears, the gallery wall dissolves, and sculpture enters the city, the factory, and the street — occupying space in ways that make the viewer's position part of the work's meaning."
hero_sculpture:
  title: "Bird in Space"
  artist: "Constantin Brancusi"
  date: 1928
  medium: "Bronze"
  dimensions: "height: 54 in"
  location: "MoMA, New York"
  image: "/images/sculptures/05-modernism/brancusi-bird-in-space.jpg"
gallery_sculptures:
  - title: "The Large Glass (The Bride Stripped Bare by Her Bachelors, Even)"
    artist: "Marcel Duchamp"
    date: "1915–1923"
    threads: [body-volume, material-making]
    image: "/images/sculptures/05-modernism/duchamp-large-glass.jpg"
  - title: "City Square"
    artist: "Alberto Giacometti"
    date: 1948
    threads: [body-volume, space-setting]
    image: "/images/sculptures/05-modernism/giacometti-city-square.jpg"
  - title: "Hudson River Landscape"
    artist: "David Smith"
    date: 1951
    threads: [material-making, space-setting]
    image: "/images/sculptures/05-modernism/smith-hudson-river-landscape.jpg"
  - title: "Guitar"
    artist: "Pablo Picasso"
    date: 1912
    threads: [material-making, body-volume]
    image: "/images/sculptures/05-modernism/picasso-guitar.jpg"
compare_back: "romanticism"
compare_forward: null
```
*(Four gallery items — the largest gallery of any sculpture page. `compare_forward: null`: Modernism is the terminal unit, so the pager's "Next unit" link is absent; within the unit, "Next thread → Music" still applies on this page.)*

Body:

> **Introduction** — In 1926, a US Customs official in New York refused to classify [[brancusi]]'s *Bird in Space* as a work of art. It looked, to the official's eye, like a piece of industrial metal — a shaft of polished bronze with no recognizable subject, no depicted figure, no apparent craft. The customs service taxed it accordingly. Brancusi sued, and the case went to trial. A federal court was forced to decide, officially and on the record, what counts as sculpture.
>
> Modernist sculpture does not merely change how figures are depicted; it dismantles the assumptions that made depiction the point. The human body, the single material worked by a single hand, the pedestal that elevates the work above the everyday world, the finished surface — all of these are questioned, abandoned, or turned into subjects in themselves.
>
> *Invisible Man* operates under the same pressure. The novel's central question is about classification: what counts, what is seen, whose existence is legible to the systems that govern recognition. Brancusi's bird and [[ellison]]'s narrator face parallel existential problems: they cannot be seen for what they are by institutions designed to exclude by narrow definitions of what to look for and where to look.
>
> **Body & Volume** *("How does the sculpture render the human body in three dimensions — idealized, naturalistic, fragmented, abstracted?")* — [[brancusi]]'s *Bird in Space* is not a bird. It is an idea of flight — a single upward-tapering form, its surface polished to a mirror finish, that captures the sensation of motion through air without depicting any creature moving through it. Brancusi arrived at this form through years of progressive reduction, stripping away every feature (wings, feathers, beak, recognizable avian anatomy) until only the essential gesture remained. The human body undergoes the same treatment in his other works: *The Kiss* reduces two embracing figures to a single rectangular block with barely differentiated surfaces; *Sleeping Muse* reduces a head to an egg. The question Brancusi asks — what is left when you remove everything that is not essential? — is one of Modernism's defining questions.
>
> [[giacometti]] moves in the opposite direction. His figures in *City Square* are elongated to the point of near-dissolution, diminished to the verge of disappearing, present but barely acknowledged. Brancusi discovers the irreducible core; Giacometti reveals the attenuated remainder.
>
> *Connection to Invisible Man* — Brancusi's concentration and Giacometti's deterioration are two versions of the same Modernist question about the human figure: what is actually there beneath the layers of social role, institutional identity, and projected meaning? The narrator of *Invisible Man* asserts this question through the frame of a narration of life experience. Stripped of each identity the world assigns him — college student, factory worker, Brotherhood orator — what remains? Giacometti's figures in *City Square* suggest an answer: something minimal, isolated, present but barely acknowledged, moving through shared space without connecting. This is the narrator's experience of New York — a city in which he moves among thousands of people who register his physical presence without seeing anything they recognize as a self.
>
> **Material & Making** *("What does the choice of material say about the work's ambitions and its culture?")* — [[david-smith]] welded steel. He had worked in an automobile plant and a locomotive factory before becoming a sculptor, and he brought those industrial skills directly into his art — cutting, grinding, and welding metal the way a factory worker assembles parts. *Hudson River Landscape* was made by welding together gestural lines of steel drawn from sketches Smith made on a train journey along the Hudson; the finished work is simultaneously a drawing, a landscape, and a sculptural object, occupying a category of its own creation.
>
> [[duchamp]]'s *Large Glass* — *The Bride Stripped Bare by Her Bachelors, Even* (1915–1923) — pushes the question of material further still. Made on two large panes of glass with oil paint, varnish, lead wire, and dust, it is simultaneously painting, sculpture, and architectural element: by design, one looks at it and through it, the space behind the glass becoming part of the experience of the work. When it cracked during transport in 1926, Duchamp declared the crack an improvement, an accidental contribution that no amount of intentional craft could have produced. The found object (*Fountain*, his earlier urinal submitted as sculpture) had already asked whether the artist's hand was necessary; the *Large Glass* asks whether intention itself is the limiting factor of meaning. Duchamp's more extreme provocations notwithstanding, Smith's welded steel and Duchamp's glass share a common premise: the sculptor is not obligated to work in traditional materials, and the choice of material is itself a statement about what a culture values and what it throws away.
>
> [[picasso]]'s *Guitar* (1912) precedes both Smith and Duchamp and makes their work possible. Constructed from cut and folded sheet metal and wire rather than carved or cast, it was the first major Western sculpture built rather than carved or poured — a three-dimensional Cubist object assembled from flat planes the way a Cubist painting assembles multiple viewpoints. The choice of materials is not incidental: sheet metal is cheap, industrial, anonymous — the antithesis of marble. The construction method makes the process visible; we can see exactly how the guitar is put together, which is precisely the information that a carved or cast surface suppresses.
>
> *Connection to Invisible Man* — The Liberty Paints factory sequence is *Invisible Man*'s most concentrated meditation on material and making. The narrator works underground, mixing a black substance into white paint to produce "Optic White" — the purest white, the standard of American whiteness, produced by invisible Black labor. The scene is an industrial allegory: the material product (white paint) depends on the hidden ingredient (the darkness that makes whiteness possible) and on the invisible worker who adds it. Smith's welded steel makes visible the industrial labor that traditional high culture preferred to keep in the factory and out of the gallery. [[ellison]] makes visible the labor that American culture preferred to keep underground. Both insist that the materials of civilization — steel, paint, language — carry the history of the people who made them and the conditions under which they were made.
>
> **Space & Setting** *("Where does the sculpture live, and how does placement shape meaning?")* — Giacometti's *City Square* was designed to be placed on the floor, without a pedestal, at human scale — five figures on a flat bronze base that could be the pavement of any city. This is Rodin's ground-level gesture pushed to its limits: the street itself made into sculpture. The work does not represent urban isolation; it produces it. Looking down at the figures, the viewer becomes another figure moving through the same space, equally isolated, equally unnoticed.
>
> David Smith placed his large outdoor sculptures — the *Cubi* series, the *Voltri* works — directly in fields and landscapes, where they entered into dialogue with horizon lines, light, and weather. Louise Nevelson, working in assemblage, covered entire gallery walls with found wooden objects painted a uniform black — turning the gallery itself into a new kind of total environment, a secular reliquary in which discarded things were consecrated by arrangement and attention.
>
> *Connection to Invisible Man* — The narrator of *Invisible Man* begins underground — in a basement he has lined with 1,369 light bulbs, wired into the power grid of Monopolated Light & Power. The space is invisible to the city above it; it exists outside the systems of recognition that organize public life. This is not mere metaphor: the underground room is a specific spatial argument, a counter-setting to the civic and institutional spaces that have repeatedly failed to see him. Giacometti's *City Square* places isolated figures in shared space and makes their isolation a formal condition of the work. [[ellison]]'s underground room inverts this: the narrator removes himself from the social world entirely and makes the removal a precondition of thought. Both works ask what it takes to be physically present in a world organized around limiting systems of visibility that determine whose presence registers as existing, valid, worthy of attention.
>
> **What to Notice** — In Brancusi's *Bird in Space* above, resist the instinct to look for the bird. Instead, follow the form upward: the base widens into a compressed torso shape, then tapers into a long ascending shaft, then ends in a fine point. The polished bronze surface reflects the room around it, making the form partly mirror as well as object. Notice that you cannot quite locate where the sculpture ends and the reflections begin — the boundary between the work and its environment is deliberately unstable.
>
> In Giacometti's *City Square* in the gallery, notice the scale: the figures are small enough to observe from above, which immediately makes you a kind of god or surveillance camera looking down on a city scene. Their elongation is most visible from the side — they are thinner than any human body could be, as if the sculptor has subtracted from them until only the gesture of being upright and moving remains. In Duchamp's *Large Glass*, look through it as well as at it — the work was designed so that whatever appears behind the glass becomes part of the composition. In Smith's *Hudson River Landscape*, find the gestural lines of welded steel that trace the horizon and the riverbank: this is drawing in three dimensions, a landscape that you can walk around.
>
> In [[picasso]]'s *Guitar*, resist looking at it as a guitar. Instead, notice the construction: the flat planes of sheet metal bent and joined at angles, the wire strings, the visible seams and edges. Nothing is hidden or finished smooth. Then consider what this means for the object's relationship to the tradition it names — this is a guitar the way a Cubist portrait is a face.
>
> **Looking Back** — Rodin's unfinished surfaces — figures half-emerging from rough stone — were already a statement about the struggle between form and formlessness. Modernist sculpture takes that struggle to its conclusion: the form that barely emerges, or the form that asks whether emergence is the right goal at all. Where Rodin kept the human figure at the center of his obsession, Brancusi and Giacometti ask what the figure becomes when stripped to its essence or its minimum. Where Rodin's *Gates of Hell* accumulated figures in restless, unresolved profusion, Smith's welded lines and Duchamp's glass panes suggest that the accumulation itself — the obsessive making — may be what sculpture is, rather than any figure it produces.
>
> **Looking Forward** *(present, but content-wise explains there is no forward-looking unit — style identically to the other five, do not omit)* — Modernist sculpture has no single Looking Forward — it ends the course's arc rather than passing its questions to another period. What it leaves is a set of open provocations: if anything can be sculpture, what is sculpture? If the figure is not necessary, what is the human body's place in art? If the pedestal is gone and the gallery wall is a surface for assemblage, where does sculpture end and the world begin? These questions do not resolve; they persist. [[ellison]]'s narrator, at the novel's end, prepares to emerge from his underground room into a world that has not changed. He does not have answers. He has, instead, the refusal to remain invisible — the insistence on existing as a particular, irreducible self in a world that would prefer he be something else. That refusal expressed through spatial rearrangement is a sharp analogue to the impulse that drives much Modernist sculpture.

---

## 8. Image assets

All images referenced above already exist at these exact paths in `public/images/sculptures/`:

```
00-medieval/     gislebertus-last-judgment-tympanum.jpg · chartres-royal-portal.jpg
01-renaissance/  michelangelo-david.jpg · donatello-david.jpg · michelangelo-pieta.jpg
02-baroque/      bernini-apollo-daphne.jpg · bernini-ecstasy-saint-teresa.jpg · bernini-david.jpg · puget-milo-croton.jpg
03-enlightenment/ houdon-voltaire-seated.jpg · canova-psyche-revived.jpg
04-romanticism/  rodin-burghers-calais.jpg · rodin-gates-of-hell.jpg · rude-la-marseillaise.jpg
05-modernism/    brancusi-bird-in-space.jpg · duchamp-large-glass.jpg · giacometti-city-square.jpg · smith-hudson-river-landscape.jpg · picasso-guitar.jpg
```

All are `.jpg` (no `.jpeg` outliers among the sculpture images, unlike the Painting set's `friedrich-wanderer.jpeg`).

BioLink targets (`[[id]]` above) resolve against the `PEOPLE` array in `src/components/BiographyPanel.jsx` — pull `name`, `dates`, `field`, `bio`, `significance`, and (if present) `portrait` path from there for anyone referenced: gislebertus, donatello, michelangelo, bernini, puget, milton, houdon, canova, winckelmann, austen, rodin, rude, melville, brancusi, giacometti, david-smith (note the hyphenated id — David Smith the sculptor, distinct from any other "smith"), duchamp, picasso, ellison, shakespeare.

---

## 9. Known quirks / things not to "fix" when reproducing

- **Per-domain color is really per-unit.** Sculpture does not have its own accent color distinct from Philosophy/Painting/Music within the same unit — all four domain pages of a unit share one `--thread-acc`. Only the sub-thread rotation (`DOMAIN_THREAD_COLORS.sculpture`) differs by domain.
- **`color-mix(in oklab, ...)`** is used extensively for tints (hero background gradients, sidebar card borders/backgrounds, sigil-box borders). This requires a modern evergreen browser; older/unsupported renderers will show the underlying flat background color instead of the tinted gradient.
- **Medieval's sculpture page frontmatter carries `core_text: "Hamlet"` / `author: "Shakespeare"`,** even though Medieval is the "foundation" unit with no anchor text elsewhere on the site — reproduce this exactly; it is deliberate content design (the unit's "Connection to..." sections are framed against *Hamlet* since Medieval has no literary anchor of its own), not a data error.
- **Three different works across two/three units are all titled "David"** (Donatello's 1440s, Michelangelo's 1504, Bernini's 1624) — the site disambiguates purely via artist name and date in the byline; never rename the titles to disambiguate.
- **Two entries use string date ranges instead of a single year**: Rodin's *The Gates of Hell* (`"1880–1917"`) and Duchamp's *The Large Glass* (`"1915–1923"`) — the schema explicitly supports `z.union([z.number(), z.string()])` for this reason; preserve the em-dash range format exactly.
- **Modernism's "Looking Forward" heading is present but says there is no forward** — don't delete the section or restyle it differently from the other five units' closing sections; the content itself (not the layout) carries the "this is the end of the arc" message.
- **CLAUDE.md's accent color table is stale** relative to what's live on these six pages (see §2) — do not use it as the source of truth for this handoff.
- Sidebar "Works Discussed" always lists `gallery_sculptures[]` in frontmatter order; it does **not** re-sort by the `threads[]` tags on each entry (those tags exist in the schema but aren't currently rendered/filtered on this page).
- **No page in this set uses `<PullQuote>`** — unlike some Painting pages. Reproduce its absence; don't add one for visual parity with Painting.
