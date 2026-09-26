# Design Handoff: Music Pages (All Six Units)

**Purpose:** Everything needed to reproduce the exact current live appearance and structure of all six unit "Music" domain pages on *Of Imagination All Compact* (the AP Literature companion site).

**Scope — all six pages covered by this handoff:**

| # | Unit | Live URL | Anchor text |
|---|------|----------|-------------|
| 0 | The High Middle Ages (Medieval) | `/units/00-medieval/music` | *Hamlet* (foundation unit — see §9 quirk note; `author: null` in this unit's frontmatter, unlike Sculpture's Medieval page) |
| 1 | Renaissance & Reformation | `/units/01-renaissance/music` | *Hamlet* |
| 2 | The Baroque | `/units/02-baroque/music` | *Paradise Lost* |
| 3 | The Enlightenment | `/units/03-enlightenment/music` | *Pride and Prejudice* |
| 4 | Romanticism | `/units/04-romanticism/music` | *Moby-Dick* |
| 5 | Modernism | `/units/05-modernism/music` | *Invisible Man* |

Live site: https://ap-lit-site.tmurphy-ef9.workers.dev

**Source of truth:** All six pages render from **one shared template**, `src/pages/units/[unit]/[domain].astro`, parameterized by unit + domain frontmatter — the exact same file that generates the Painting, Sculpture, and Philosophy pages. There is no per-unit or per-domain page file. This document is self-contained (structure and CSS are restated in full here); companion handoffs for Painting and Sculpture exist in this repo (`Painting_Pages_Design_Handoff.md`, `Sculpture_Pages_Design_Handoff.md`) documenting the same shared template from those domains' perspectives — only the domain-specific pieces (hero/gallery schema, thread colors, icons, YouTube-embed mechanics, and all six units' content) differ here.

---

## 1. Page anatomy (top → bottom)

1. **Topbar** — site brand (italic serif) + nav links (Timeline / People / Compare / Painting / Sculpture / Music), all caps, letter-spaced, bottom-rule divider.
2. **Header band** — full-bleed decorative SVG strip, unique per unit ("role 6" motif, tinted via `--mark-primary`/`--mark-highlight`).
3. **Breadcrumb** — `Home / Unit 0X · [Period Name] / Music`, monospace, uppercase, 11px.
4. **Unit strip** — 4-column grid: giant unit number (e.g. "03") in accent color · title block (eyebrow "Unit · Anchor text" or "Unit · Foundation" + period name h2) · date range · a small circular per-unit sigil ("role 5" motif).
5. **Thread tabs** — 4-column tab bar: Philosophy · Painting · Sculpture · **Music** (active), each with a 20×20 mini line-icon. The Music icon is a simple arc ("headphone"/rainbow-curve) with a dot and a baseline. Active tab gets raised background + colored bottom border + accent-colored label.
6. **Page head** — large bordered sigil box (arc icon) + eyebrow "Thread IV · Music" + h1 `Music: *[Period Name]*` (period name in italic muted color).
7. **Section terminator** — centered decorative SVG rule, unique per unit ("role 3" motif).
8. **Hero zone — the one structurally distinct part of the Music page versus Painting/Sculpture.** Instead of a `figure.hero-plate` image, the template renders a `<div class="featured-embeds">` containing **one or more `<YouTubeEmbed>` components**, sourced from the unit's `featured_listening` frontmatter (a single object on five units, an **array of two** on Modernism only — see §7.5). Each `YouTubeEmbed` is a click-to-play card: a YouTube thumbnail image with a play-button overlay that, on click, swaps itself for a live `<iframe>` embed. There is no static hero photograph anywhere on the Music pages.
9. **Two-column layout** — prose column (flex 1, right-padded) + a vertical decorative motif divider ("role 2") + a 300px sticky sidebar.
10. **Prose column** (rendered from the unit's `.mdx` body):
    - MDX `# h1` and first `## Introduction` heading are hidden by CSS; the Introduction's paragraph(s) become the lede.
    - Lede paragraph: larger (21px), brighter ink color, with a large serif drop-cap in the accent color.
    - Three sub-thread sections (**Texture & Voices** / **Consonance & Dissonance** / **Structure & Freedom**), each a `##` heading that JS turns into a 3-column grid: icon box (auto-numbered "01 — Sub-thread" etc.) + heading text (colored per sub-thread) + a per-unit medallion ornament ("role 1" motif) at top-right.
    - Immediately under each sub-thread heading, an italicized guiding question paragraph (auto-styled via `:has(> em:only-child)`) in the accent color.
    - `### Connection to *[Core Text]*` headings render as the top half of a two-part callout card; the paragraph immediately after becomes the bottom half — both share a left accent-colored bar. (Medieval's page uses this pattern only once, under Structure & Freedom — Medieval's Texture & Voices and Consonance & Dissonance sub-threads have no `### Connection to Hamlet` sub-heading at all; see §9.)
    - Body paragraphs beginning with `**bold label:**` get the same callout-card treatment automatically (not used in the current music bodies).
    - Blockquotes: left accent border, italic, with optional `<cite>` byline (not used in the current music bodies — all quoted material is inline, not blockquoted).
    - `<PullQuote>` component: centered, no border, italic serif quote flanked by hairline brackets. **Used on five of six pages** — Renaissance, Baroque, Enlightenment, Romanticism, and Modernism each include exactly one. **Medieval is the only music page with zero `<PullQuote>` instances.**
    - A **"What to Listen For" section (`## What to Listen For`)** is this domain's equivalent of Painting/Sculpture's "What to Notice" — functionally identical (a numbered mid-count sub-thread heading, not the first or last `h2`, so it also gets the sigil/index/medallion treatment), but it additionally embeds **inline `<YouTubeEmbed>` components for the gallery pieces**, directly in the prose, right after the descriptive paragraphs discussing them. This means gallery tracks are presented twice: once as playable embeds inline in the prose, and again as thumbnail cards in the sidebar's "Featured Listening" card (§1.11). This duplication is intentional/current live behavior, not a bug to consolidate.
    - Final `## Looking Forward` heading (last `h2` in the doc) is styled as an italic transitional headline, not a numbered sub-thread section.
11. **Sidebar** (sticky, 24px from top):
    - "Analytical Threads" card — 3 colored list items (icon + label + italic gloss), one per thread, tinted with that thread's sub-accent color and a left accent bar.
    - "Featured Listening" card — **combines `featured_listening` and `gallery_listening` into one flat list** (`[...featured, ...gallery]`), rendered as `gallery-music-wrap` cards: a 16:7 tinted-gradient rectangle with four faint horizontal "staff" lines and a circular play button, linking out to `https://www.youtube.com/watch?v={youtube_id}` in a new tab (not an inline player, unlike the prose embeds) — below each card, italic title + small-caps composer/date byline. If an entry has no `youtube_id`, the card renders as a non-interactive `.no-link` div instead of an anchor (this fallback exists in the template but every entry across all six units currently has a `youtube_id`, so it's presently unused/untriggered — reproduce the branch, but expect it never to fire with current content).
12. **Pager** — two-column footer nav: "← Previous thread" (Sculpture) / "Next thread →" (falls through to next **unit** on Music, since Music is the last domain in the tab order — see `DOMAIN_ORDER = ['philosophy','art','sculpture','music']`). On Modernism specifically, there is no next unit either (`compare_forward: null`), so the pager's right slot renders an empty `<div />`.
13. **Footer** — colophon ("Of Imagination All Compact · AP Literature") left, "Unit 0X / Music" right.
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

**Important:** these are the values actually used on the live pages today, taken directly from the `ACCENTS` map in `[domain].astro`. On every unit, `music` shares the *same* accent as `philosophy`, `art`, and `sculpture` for that unit — the accent is per-unit, not per-domain. (This table differs from the accent color table in this repo's `CLAUDE.md`, which documents an older/aspirational palette — e.g. CLAUDE.md lists Renaissance as gold `#e8a820`; live pages render it as rust-red `#B54C3A`. Use the values below for an exact reproduction.)

| Unit | `--thread-acc` (primary) | Sub-thread palette (`subThreads`, rotated across the 3 sub-thread headings/sidebar chips) |
|---|---|---|
| 00-medieval | `#C9A24B` | `#C9A24B`, `#A88030`, `#E0B860` |
| 01-renaissance | `#B54C3A` | `#B54C3A`, `#943828`, `#D06050` |
| 02-baroque | `#B07028` | `#B07028`, `#8C5818`, `#CC8838` |
| 03-enlightenment | `#698BA1` | `#698BA1`, `#4A7088`, `#88A8BE` |
| 04-romanticism | `#3D5A6D` | `#3D5A6D`, `#2A4458`, `#506882` |
| 05-modernism | `#A03828` | `#A03828`, `#802818`, `#C04838` |

Additionally, the **Music** domain specifically uses its own 3-color rotation for sub-thread sigils/headings/sidebar-thread-icons (`DOMAIN_THREAD_COLORS.music`), applied in order across the 3 threads regardless of unit:
```
music: ['#574878', '#6F5E95', '#8C80AE']   // deep indigo-violet / mid violet / pale lavender-gray
```
(Philosophy uses `['#3A332B','#5A5046','#857A6B']`; Painting uses `['#75435B','#94586E','#B58193']`; Sculpture uses `['#4F6B4D','#5F8060','#7B9883']` — included for context only.)

So on every music page, **Texture & Voices** is tinted `#574878`, **Consonance & Dissonance** is tinted `#6F5E95`, and **Structure & Freedom** is tinted `#8C80AE`, regardless of unit — only the large numerals, page-head sigil, drop cap, and ornament motifs change color per unit (via `--thread-acc` / `--mark-primary`).

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

Full source: `src/pages/units/[unit]/[domain].astro` (single `<style is:global>` block, ~1100 lines, shared by all 24 unit/domain pages).

**Unit strip number:**
```css
.unit-strip .num { font-family: var(--font-display); font-weight: 300; font-size: 72px; line-height: 0.85; color: var(--thread-acc); letter-spacing: -0.03em; }
```

**Page head h1:**
```css
.page-head h1 { font-family: var(--font-display); font-weight: 300; font-size: clamp(36px, 5vw, 64px); line-height: 1; letter-spacing: -0.02em; max-width: 22ch; }
.page-head h1 em { font-style: italic; color: var(--ink-mute); }
```

**Featured-embeds hero zone (music-only; replaces `figure.hero-plate` entirely — no image markup at all):**
```css
.featured-embeds { margin: 40px 0 0; }
.featured-embeds .yt-embed { margin-top: 0; margin-bottom: 0; }
```
This div wraps one (or, on Modernism, two) `<YouTubeEmbed>` components directly — see §4 for that component's own markup/CSS.

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
```

**Sidebar "Featured Listening" music cards specifically:**
```css
.gallery-music-wrap {
  display: block; position: relative; aspect-ratio: 16 / 7; margin-bottom: 10px; overflow: hidden;
  background: linear-gradient(160deg, color-mix(in oklab, var(--thread-acc) 28%, #F4EDDF), color-mix(in oklab, var(--thread-acc) 8%, #F4EDDF));
  text-decoration: none; transition: opacity 150ms;
}
.gallery-music-wrap:hover { opacity: 0.85; }
.gallery-music-wrap.no-link { cursor: default; }
.gallery-music-bg { position: absolute; inset: 0; }
.gallery-music-lines { position: absolute; inset: 0; }
.gml { position: absolute; left: 8%; right: 8%; height: 1px; background: rgba(27,23,20,.15); }
.gml:nth-child(1) { top: 30%; } .gml:nth-child(2) { top: 44%; } .gml:nth-child(3) { top: 58%; } .gml:nth-child(4) { top: 72%; }
.gallery-play {
  position: absolute; right: 14px; bottom: 12px; width: 36px; height: 36px;
  border: 1px solid rgba(27,23,20,.35); border-radius: 50%;
  display: flex; align-items: center; justify-content: center; background: rgba(244,237,223,.7);
}
.gallery-play::before { content: ''; width: 0; height: 0; border-left: 9px solid rgba(27,23,20,.75); border-top: 6px solid transparent; border-bottom: 6px solid transparent; margin-left: 2px; }
.gallery-title { font-family: var(--font-display); font-style: italic; font-size: 13.5px; color: var(--ink); line-height: 1.3; }
.gallery-by { font-family: var(--font-ui); font-size: 10.5px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--ink-soft); margin-top: 3px; }
```
This is a tinted gradient rectangle (no photograph — four faint horizontal lines suggesting a musical staff) with a small circular play triangle bottom-right; it is deliberately abstract since there's no album art or performance photo in this dataset.

For the complete, unabridged CSS (pager, footer, bio modal, mobile breakpoints, unused `.music-item`/`.music-listen`/`.music-plate` rules reserved for the `<MusicPlate>` component, etc.) pull directly from `src/pages/units/[unit]/[domain].astro`.

---

## 4. The `<YouTubeEmbed>` component (the music domain's signature interactive element)

Source: `src/components/YouTubeEmbed.astro`. Props: `id` (YouTube video ID, required), `title`, `composer`, `note` (all optional).

**Markup/behavior:**
- Renders a `<figure class="yt-embed">` containing a `<button class="yt-preview">` showing the video's `hqdefault.jpg` thumbnail (fetched live from `https://img.youtube.com/vi/{id}/hqdefault.jpg`, not a locally stored asset) at a 16:9 aspect ratio, with a circular play-triangle icon overlaid centered.
- On click, a plain `<script>` (not a framework component — vanilla DOM, runs once per page for every `.yt-embed` on it) replaces the `<button>` with a live `<iframe src="https://www.youtube-nocookie.com/embed/{id}?autoplay=1">`, using the privacy-enhanced `-nocookie` domain and `autoplay=1`.
- Below the thumbnail, an optional caption block: italic title, small-caps composer, and a monospace "note" line if provided (not used in the current 6 pages' inline embeds — `note` prop is not passed anywhere in the current content, only `title`/`composer`).

**CSS (verbatim):**
```css
.yt-embed { margin: 32px 0; border: 1px solid var(--rule); background: var(--bg-raised); }
.yt-preview { display: block; position: relative; width: 100%; aspect-ratio: 16 / 9; background: var(--bg-sunken); border: none; padding: 0; cursor: pointer; overflow: hidden; }
.yt-thumb { display: block; width: 100%; height: 100%; object-fit: cover; opacity: 0.82; transition: opacity 200ms; }
.yt-preview:hover .yt-thumb { opacity: 1; }
.yt-play { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; pointer-events: none; }
.yt-play svg { width: 52px; height: 52px; padding: 14px; color: rgba(232,223,208,.9); background: rgba(20,17,16,.72); border: 1px solid rgba(232,223,208,.45); border-radius: 50%; transition: background 200ms, border-color 200ms; }
.yt-preview:hover .yt-play svg { background: rgba(175, 50, 30, .85); border-color: rgba(232,223,208,.7); }
.yt-iframe { display: block; width: 100%; aspect-ratio: 16 / 9; border: none; }
.yt-caption { padding: 16px 22px 18px; border-top: 1px solid var(--rule); display: flex; flex-direction: column; gap: 4px; }
.yt-title { font-family: var(--font-display); font-style: italic; font-size: 15.5px; color: var(--ink); line-height: 1.3; }
.yt-composer { font-family: var(--font-ui); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-soft); }
.yt-note { font-family: var(--font-mono); font-size: 11px; color: var(--ink-soft); margin-top: 4px; line-height: 1.6; white-space: pre-line; }
```
Note the hover state's play-button background shifts from near-black (`rgba(20,17,16,.72)`) to a warm red-orange (`rgba(175,50,30,.85)`) — this red hover tint is **fixed** across all six units, not tied to `--thread-acc`; it does not change per-unit like most other accent-driven elements on this page.

**Where `<YouTubeEmbed>` is used, per page:** once (or twice, on Modernism) in the hero `.featured-embeds` zone, sourced from `featured_listening` frontmatter — and again, inline, once per `gallery_listening[]` entry, inside the "What to Listen For" prose section, imported explicitly in every unit's MDX frontmatter (`import YouTubeEmbed from '../../../components/YouTubeEmbed.astro';`) and invoked directly with the track's `youtube_id`/`title`/`composer` as JSX props.

**`<MusicPlate>` component exists but is unused:** `src/components/MusicPlate.astro` renders a `figure.plate.music-plate` — a tinted-gradient rectangle with staff lines and a play button linking out to YouTube, styled identically to the sidebar's `gallery-music-wrap` cards but sized for inline prose use (16:9, not 16:7). It is imported in the page template's global component list (`<Content components={{ BioLink, PullQuote, Plate, MusicPlate, YouTubeEmbed }} />`) but **none of the six music `.mdx` bodies currently invoke `<MusicPlate>`** — they all use `<YouTubeEmbed>` instead, both in the hero and inline. Reproduce its absence; don't substitute one for the other.

---

## 5. Behavior / interactivity

1. **Sub-thread heading decoration (client JS, inline `<script>` at bottom of page):** On `DOMContentLoaded`, finds all `<h2>` in `article.prose`, drops the first (Introduction, hidden) and last (Looking Forward), and for each remaining `<h2>` injects, in order: a `.sigil-box` (SVG icon in that thread's rotation color), a `.sub-idx` label (`"01 — Sub-thread"`, `"02 — Sub-thread"`, `"03 — Sub-thread"`), the original heading text wrapped in `.sub-title`, and a `.section-medallion` (the per-unit "role 1" ornament). Sets `--sub-acc` inline per heading. **Note:** because "What to Listen For" is itself a fourth non-first/non-last `<h2>` in these pages, it also receives this treatment and is numbered "04 — Sub-thread" — reproduce this (it's the same live behavior as "What to Notice" getting numbered "04" on Painting/Sculpture pages).
2. **YouTube embed swap (client JS, inline `<script>` inside `YouTubeEmbed.astro`, runs per-instance):** click-to-play thumbnail → live iframe, described in §4.
3. **Bio modal:** global click listener on `.bio-link-btn[data-bio-id]` anywhere in the document body; looks up the person in the `PEOPLE` array (from `BiographyPanel.jsx`, passed to the page as serialized JSON via `define:vars`) and populates `#bio-name`, `#bio-dates`, `#bio-field`, `#bio-bio`, `#bio-significance`, `#bio-portrait`. Closes on backdrop click, close button, or Escape.
4. **Sticky sidebar:** `position: sticky; top: 24px` on `aside`, disabled below 1100px viewport width (becomes static, stacks below prose).
5. **Responsive breakpoints:** tabs go 4-col → 2-col at 700px; page-head and two-column layout collapse to single column at ≤1100–720px (motif divider hidden entirely below 1100px). The `.yt-preview`/`.yt-iframe` 16:9 aspect ratio is fluid at all widths, so the featured-embeds hero zone never needs its own breakpoint.

---

## 6. Decorative SVG motif system (`PeriodMotif.astro` / `period-motifs.ts`)

Every unit has its own hand-tuned set of 6 SVG ornaments, keyed by "role" — identical mechanism to Painting/Sculpture, since the motifs are per-*unit*, not per-domain:

| Role | Used where | Description |
|---|---|---|
| 1 | Sub-thread heading, top-right | Small circular medallion |
| 2 | Vertical divider between prose and sidebar | Tall thin vertical motif |
| 3 | Below the page-head, above the hero | Wide horizontal terminator rule |
| 4 | Inside `<PullQuote>` (when a `unit` prop is passed) | Bracket-shaped flourish |
| 5 | Unit strip, top-right | Small circular sigil |
| 6 | Full-bleed header band under the topbar | Long horizontal repeating pattern |

Stored per-unit in `src/data/period-motifs.ts` (auto-generated file, ~1,700 lines, one block per unit — do not hand-transcribe; pull the exact `<svg>...</svg>` string for each of the 6 units × 6 roles directly from that file for pixel-exact reproduction). Rendered via `src/components/PeriodMotif.astro` (`<Fragment set:html={PERIOD_MOTIFS[unit][role]} />`). Each unit's motif set is geometrically distinct (bespoke per-unit ornamentation, not a shared icon recolored) and identical whether reached via a unit's Painting, Sculpture, Philosophy, or Music page.

**Role 4 (PullQuote brackets) usage note specific to Music:** because five of six music pages use `<PullQuote>` (see §1.10), the role-4 bracket ornament actually appears on this domain more consistently than on Sculpture (which uses zero `<PullQuote>`s across all six units, per that handoff). Medieval's Music page is the one exception here — it has no `<PullQuote>`, so its role-4 motif never renders on that specific page (though the SVG string still exists in `period-motifs.ts` for Medieval, since the asset is defined per-unit regardless of whether any page currently invokes it).

---

## 7. Thread icons (sidebar "Analytical Threads" card + tab bar mini-icons)

Defined in `src/components/threadIcons.ts`, rendered via `src/components/ThreadIcon.astro` (a thin wrapper: `<svg viewBox width height style="color:{color}" set:html={icon.content}>`, so the SVG strokes use `currentColor`).

The three Music threads (same 3 across all 6 units — only their `period_summary` text changes per unit):

- **`texture-voices`** — viewBox `0 0 40 40`, default color `#D9A842`:
```html
<path d="M4 20 Q 10 12, 16 20 T 28 20 T 40 20" fill="none" stroke="currentColor"/>
<circle cx="10" cy="16" r="1" fill="currentColor" stroke="none"/>
<circle cx="22" cy="24" r="1" fill="currentColor" stroke="none"/>
<circle cx="34" cy="16" r="1" fill="currentColor" stroke="none"/>
```
(A flowing double-wave line with three punctuating dots — reads as interweaving melodic voices.)

- **`consonance-dissonance`** — viewBox `0 0 40 40`, default color `#C94C7C`:
```html
<circle cx="20" cy="20" r="14" fill="none" stroke="currentColor"/>
<path d="M6 20 A 14 14 0 0 1 34 20" fill="none" stroke="currentColor"/>
<line x1="12" y1="20" x2="28" y2="20" stroke-dasharray="2 2" stroke="currentColor"/>
<circle cx="20" cy="20" r="1.5" fill="currentColor" stroke="none"/>
```
(A full circle bisected by a dashed diameter and an emphasized upper arc — reads as tension/balance.)

- **`structure-freedom`** — viewBox `0 0 40 40`, default color `#4AB39A`:
```html
<path d="M4 20 Q 9 14, 14 20 Q 19 26, 24 20 Q 29 14, 34 20" fill="none" stroke="currentColor"/>
<line x1="14" y1="10" x2="14" y2="30" stroke-dasharray="1.5 2.5" opacity=".6" stroke="currentColor"/>
<line x1="24" y1="10" x2="24" y2="30" stroke-dasharray="1.5 2.5" opacity=".6" stroke="currentColor"/>
<circle cx="9" cy="20" r=".9" fill="currentColor" stroke="none"/>
<circle cx="19" cy="20" r=".9" fill="currentColor" stroke="none"/>
<circle cx="29" cy="20" r=".9" fill="currentColor" stroke="none"/>
```
(An S-curve crossed by two dashed vertical guide-lines with dots marking the curve's inflection points — reads as a measured, gridded waveform.)

Note: on the live Music pages, the sidebar recolors these using the domain's rotation (`#574878 / #6F5E95 / #8C80AE`, see §2) rather than each icon's own default color — the `color` prop passed to `<ThreadIcon>` overrides `icon.color`.

The tab-bar mini-icon for "Music" (used identically on every unit) is drawn inline in the template (not from `threadIcons.ts`):
```html
<svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">
  <path d="M6 24 A14 14 0 0 1 34 24" />
  <circle cx="20" cy="24" r="2" style="fill:currentColor;stroke:none;" />
  <line x1="6" y1="32" x2="34" y2="32" />
</svg>
```
(A simple rainbow-arc over a baseline with a center dot — evokes a sound wave or a simplified treble clef gesture.) The large page-head sigil box uses the same icon at 48×48 inside an 88×88 bordered box tinted `var(--bg-sunken)`, stroked in `var(--thread-acc)`.

---

## 8. Content — frontmatter + body, all 6 pages

Content source files: `src/content/units/{00-medieval,01-renaissance,02-baroque,03-enlightenment,04-romanticism,05-modernism}/music.mdx`. Schema enforced by `src/content.config.ts` (`units` collection, `domain: 'music'` branch):

```ts
featured_listening: z.union([
  z.object({ title, composer, date: z.union([z.number(), z.string()]), duration, listen_for, youtube_id: z.string().optional() }),
  z.array(z.object({ ...same fields... })),   // Modernism is the only unit that uses the array form
]).optional(),
gallery_listening: z.array(z.object({ title, composer, date, duration, threads: string[], youtube_id: z.string().optional() })).optional(),
```

Body structure is nearly identical across all 6: `## Introduction` (1–2 paragraphs, hidden heading) → `## Texture & Voices` (guiding question + body [+ optional `### Connection to *[Text]*` callout]) → `## Consonance & Dissonance` (same pattern) → `## Structure & Freedom` (same pattern) → `## What to Listen For` (references the featured + gallery pieces by name, embeds gallery tracks inline via `<YouTubeEmbed>`) → `## Looking Back` (compares to previous unit's featured piece — absent on Medieval) → `## Looking Forward` (transitions to next unit).

### 8.0 The High Middle Ages / Medieval (`00-medieval/music.mdx`)

```yaml
unit: "00-medieval"
period: "The High Middle Ages"
dates: "c. 1000–1400"
core_text: "Hamlet"
author: null
domain: music
title: "Hearing Through Form: The Medieval Foundation"
threads:
  - id: texture-voices
    label: "Texture & Voices"
    period_summary: "Monophony — a single melodic line with no accompaniment, the sonic equivalent of the gold-ground flatness of medieval painting."
  - id: consonance-dissonance
    label: "Consonance & Dissonance"
    period_summary: "No harmonic tension exists because there is only one voice — a world of pure, untroubled stability, like shadowless medieval light."
  - id: structure-freedom
    label: "Structure & Freedom"
    period_summary: "Form is determined entirely by the sacred text — no bar lines, no regular beat, no meter in the modern sense. The music is an act of devotion, not a performance."
featured_listening:
  title: "Ave Maris Stella"
  composer: "Anonymous (plainchant hymn)"
  date: "Medieval"
  duration: "3–4 minutes"
  listen_for: "The single unaccompanied melodic line, the absence of rhythm in the modern sense, and the way the melody shapes itself around the Latin words. The hymn addresses the Virgin Mary as 'Star of the Sea.'"
  youtube_id: "sdJ55DPsWhI"
gallery_listening:
  - title: "Dies Irae"
    composer: "Anonymous (Gregorian chant)"
    date: "13th century"
    duration: "2–3 minutes (opening verses)"
    threads: [texture-voices, structure-freedom]
    youtube_id: "h3FED3omlDA"
  - title: "Viderunt Omnes"
    composer: "Pérotin"
    date: "c. 1198"
    duration: "3–4 minutes (opening)"
    threads: [texture-voices, consonance-dissonance]
    youtube_id: "Q2JvIyStzNA"
compare_back: null
compare_forward: "renaissance"
```
*(Note: `author: null` here, unlike the Sculpture page for the same unit, which sets `author: "Shakespeare"` — the Music page's frontmatter treats Medieval as authorless/foundational even though `core_text` is still "Hamlet." This is an inconsistency between the two domain pages for the same unit; reproduce both exactly as they are in their respective source files, don't reconcile them.)*

Body:

> **Introduction** — Medieval music, like medieval painting, operates on assumptions that can seem foreign to modern ears. The dominant form of sacred music was plainchant, defined by a single melodic line, unaccompanied, sung in unison by monks or clergy. There is no harmony in the modern sense, no bass line, no chords, no accompaniment: just a single human voice (or many voices singing the same melody) moving through a sacred text. The effect is austere, timeless, and deeply meditative, music that exists not to entertain or to express individual emotion but to serve as a vehicle for prayer.
>
> This is the musical baseline for the course, just as the medieval painting section establishes the visual baseline. Understanding what medieval sacred music sounds like and the cultural functions that it performed in its historical context is essential to hearing and understanding the contrast in every later period.
>
> **Texture & Voices** *("How many voices are active, and how do they relate to each other?")* — The defining texture of medieval sacred music is monophony — a single melodic line with no accompaniment. Even when many voices sing together, they sing the same melody in unison. There is no harmony, no counterpoint, no distinction between a "lead" voice and "supporting" voices. This is the sonic equivalent of the gold background in medieval painting: no spatial depth, no foreground and background, no figure-ground relationship. The music exists in a single plane, and that flatness is the point. It reflects a worldview in which individual expression is subordinate to collective worship, just as the anonymous medieval painter subordinated personal style to sacred tradition.
>
> *(No "Connection to Hamlet" callout under this sub-thread — unlike every other sub-thread on every other music page, Medieval's Texture & Voices section ends here with no `### Connection to` heading at all.)*
>
> **Consonance & Dissonance** *("How does the music handle tension and resolution?")* — In monophonic chant, the question of consonance and dissonance barely arises; there is only one melodic line, and no simultaneous notes to be in tension with each other. The melody moves through intervals that the medieval ear considered sacred and mathematically pure: the octave, the fifth, the fourth. The effect is music of extraordinary purity and stability. There is no harmonic tension, no pull toward resolution, because there is nothing to resolve. This is the sonic equivalent of the uniform, shadowless light in medieval painting: a world without ambiguity, where everything exists in the steady radiance of divine order.
>
> *(No "Connection to Hamlet" callout under this sub-thread either — Medieval's Music page has only one `### Connection to Hamlet` heading total, under Structure & Freedom below.)*
>
> **Structure & Freedom** *("How does the music relate to inherited formal structures?")* — Plainchant follows the structure of the liturgical text rather than an abstract musical form. The melody serves the words: it rises and falls with the rhythms of Latin prayer, expanding on important syllables and moving simply through less significant ones. There are no bar lines, no regular beat, no meter in the modern sense. The rhythm is free and fluid, governed by the natural flow of speech rather than by a pulse; Medieval chant exists outside the grid of regular rhythm that virtually all later Western music takes for granted. Form is entirely determined by the sacred purpose. The music is not a performance; it is an act of devotion.
>
> Medieval Christian theology was deeply suspicious of the body: physical pleasure, sensory enjoyment, and the rhythmic compulsion of dance were antithetical to spiritual discipline. By design, plainchant presents no regular rhythm that might inspire the body to move. The music refuses the body's claims entirely, existing in a realm of pure devotion to which the "clay carcase crippled" of the body is simply irrelevant.
>
> *Connection to Hamlet* — Medieval music refuses the body by design: no pulse, no rhythmic compulsion, no invitation to physical response. The music exists in a realm the body cannot easily enter. Hamlet inherits this suspicion in a specific form. The court's demand that he perform his grief correctly, dress it in "inky cloak" and "customary suits of solemn black," is a demand that he subordinate inner experience to outward form, managing and controlling the body for social consumption. What he refuses is not form itself but the severing of form from genuine feeling. "These indeed seem," he says of the outward displays; they are the body disciplined into performance, emptied of the interiority that makes them authentic.
>
> **What to Listen For** — In the *Ave Maris Stella* above, listen for the purity of the single unaccompanied line — no harmony, no bass, no rhythm section. Notice how the melody rises and falls with the Latin words rather than following a regular beat. The effect is timeless and meditative, existing outside the pulse-driven framework of virtually all later Western music.
>
> In the *Dies Irae* below, notice that the same monophonic principle applies, but the melody is more dramatic and memorable — this is the chant melody that has haunted Western music for centuries, appearing in everything from Berlioz to film scores. [[perotinus]]'s *Viderunt Omnes* is the crucial transitional piece: here, for the first time, you can hear multiple voices singing different notes simultaneously. The sustained bass notes with faster-moving upper voices create an extraordinary, almost otherworldly sound — the first glimmers of polyphony emerging from monophony.
>
> *[inline YouTubeEmbed: "Dies Irae", Anonymous (Gregorian chant), id h3FED3omlDA]*
> *[inline YouTubeEmbed: "Viderunt Omnes", Pérotin, id Q2JvIyStzNA]*
>
> *(No "Looking Back" section — Medieval is the first unit.)*
>
> **Looking Forward** — The Renaissance will transform this single melodic line into an intricate fabric of multiple independent voices. Where medieval chant has one melody and no harmony, Renaissance polyphony will weave four, five, or even forty voices into a seamless, interlocking whole. The shift is as dramatic as the visual shift from gold-ground flatness to Renaissance perspective. A new cultural movement that valued the individual, rational discourse, and the beauty of multiple perspectives held in balance created music that echoes those radically new values.

### 8.1 Renaissance & Reformation (`01-renaissance/music.mdx`)

```yaml
unit: "01-renaissance"
period: "Renaissance & Reformation"
dates: "c. 1400–1700"
core_text: "Hamlet"
author: "Shakespeare"
domain: music
title: "Hearing Through Form: Renaissance & Reformation"
threads:
  - id: texture-voices
    label: "Texture & Voices"
    period_summary: "Polyphony — multiple independent melodic lines woven into a seamless, balanced whole where no single voice dominates."
  - id: consonance-dissonance
    label: "Consonance & Dissonance"
    period_summary: "Dissonance is permitted but strictly controlled — always prepared, brief, and resolved, creating a world where conflict is acknowledged but order is always restored."
  - id: structure-freedom
    label: "Structure & Freedom"
    period_summary: "Strict contrapuntal rules govern how melodies move in relation to each other — extraordinary ingenuity expressed within inherited constraints."
featured_listening:
  title: "Sicut Cervus"
  composer: "Giovanni Pierluigi da Palestrina"
  date: "c. 1580s"
  duration: "4 minutes"
  listen_for: "How each voice enters separately with the same melody (imitation), then all four voices overlap and interweave. The effect is serene, balanced, and luminous — the purest example of Renaissance polyphony."
  youtube_id: "0yd5EE0hAB8"
gallery_listening:
  - title: "Ave Maria...virgo serena"
    composer: "Josquin des Prez"
    date: "c. 1485"
    duration: "5 minutes (or first 2 minutes for the opening imitation)"
    threads: [texture-voices, structure-freedom]
    youtube_id: "s-pVbpV4yuk"
  - title: "Spem in Alium"
    composer: "Thomas Tallis"
    date: "c. 1570"
    duration: "First 3 minutes for the gradual buildup"
    threads: [texture-voices]
    youtube_id: "CkL1hdL40i0"
compare_back: "medieval"
compare_forward: "baroque"
```

Body:

> **Introduction** — Renaissance music is the sonic equivalent of Renaissance perspective in painting: ordered, balanced, and governed by rational rules that produce a feeling of serene harmony. Where medieval music was predominantly monophonic, Renaissance composers developed polyphony into a high art, weaving multiple independent vocal lines into a seamless, interlocking whole. The result is music that sounds both complex and effortlessly beautiful.
>
> The shift from Medieval to Renaissance music is also a change in the conception of the cultural function of music. Medieval plainchant existed to serve liturgy and to suppress the body's claims in favor of spiritual discipline. Renaissance music inherits that sacred context, but it also adds a new humanist ambition: music should move the listener, stir the emotions, and illuminate the meaning of words. For Renaissance composers, the ancient Greek ideal that music has the power to change nature and move souls becomes a fundamental technical goal.
>
> **Texture & Voices** *("How many voices are active, and how do they relate to each other?")* — The defining texture of Renaissance music is polyphony — multiple independent melodic lines sounding simultaneously. In a four-voice motet, each voice (soprano, alto, tenor, bass) has its own melody, and these melodies are carefully designed to fit together harmonically while remaining distinct. No single voice dominates; all are equal participants in a shared musical fabric. This is the sonic equivalent of Renaissance perspective: individual figures, each with their own identity, coexisting in a rationally ordered space. It also mirrors the humanist ideal of balanced discourse — multiple voices, each contributing, none overwhelming.
>
> *[PullQuote]* "Multiple independent melodic lines woven into a seamless, balanced whole where no single voice dominates."
>
> *Connection to Hamlet* — The play inherits this Renaissance ideal of balanced, rational discourse — the humanist conviction that truth emerges from the interplay of multiple perspectives. Hamlet himself is a master of dialogue, debate, and rhetorical self-examination. But the play's content strains against the polyphonic ideal: Hamlet's voice increasingly dominates, the other characters become instruments of his obsession or targets of his contempt, and the balanced interplay of perspectives gives way to a single consciousness in crisis. Renaissance polyphony assumes that multiple voices can coexist in harmony; *Hamlet* asks what happens when one voice begins to overwhelm all the others.
>
> **Consonance & Dissonance** *("How does the music handle tension and resolution?")* — Renaissance composers treated dissonance with great care. It was permitted, even valued for its expressive potential, but only under strict conditions: it had to be prepared (approached smoothly), brief, and resolved promptly to a consonance. The effect is music where moments of tension exist but are always contained and resolved — a world where conflict is acknowledged but order is always restored.
>
> *Connection to Hamlet* — Notice the parallel: the play inherits a Renaissance ideal of rational order, but its content — madness, murder, existential doubt — pushes against that ideal in ways that anticipate the Baroque. Hamlet's dissonances (his antic disposition, his cruelty to Ophelia, his philosophical despair) are far more extreme and far less neatly resolved than the polyphonic rules would allow. The play is written in the formal language of Renaissance drama — five acts, verse, balanced scenes — but the emotional content strains that form almost to breaking. [[shakespeare]] is writing at the moment when Renaissance consonance is about to give way to Baroque extremity.
>
> **Structure & Freedom** *("How does the music relate to inherited formal structures?")* — Renaissance music is governed by strict contrapuntal rules that dictate how melodies can move in relation to each other. These rules are not arbitrary; they codify what the ear perceives as harmonious. Within these constraints, composers demonstrated extraordinary ingenuity, creating music of great variety and expression without ever breaking the fundamental rules. The structure is both a discipline and a source of beauty, much as a sonnet's fourteen-line constraint is both a limitation and a source of rhetorical power.
>
> Within that discipline, Renaissance composers developed a practice called word painting — shaping the music to reflect and intensify the meaning of the text. A melody might descend stepwise on the word "falling," accelerate on "running," or cluster voices together on "together." Harmony could darken for grief or brighten for joy. This is the Renaissance humanist conviction in sonic form: the individual word matters, its meaning matters, and music's highest purpose is to make that meaning felt.
>
> *Connection to Hamlet* — [[shakespeare]]'s own relationship to inherited structure mirrors this perfectly. *Hamlet* is written in iambic pentameter — a strict metrical framework — but [[shakespeare]]'s genius lies in the extraordinary variety and expressiveness he achieves within that framework. The verse bends, stretches, enjambs, and shifts register without ever fully abandoning its formal scaffolding. This is exactly what the great Renaissance composers do: demonstrate mastery by working brilliantly within inherited constraints rather than overthrowing them.
>
> **What to Listen For** — In [[palestrina]]'s *Sicut Cervus* above, try to follow a single voice as it enters with the melody, then listen for how the other voices take up the same melody in turn — this technique is called imitation, and it is the signature sound of Renaissance polyphony. Notice the overall sense of balance and serenity: moments of tension exist but always resolve smoothly. No single voice dominates; all are equal participants.
>
> In [[josquin]]'s *Ave Maria* below, listen for the voices entering one at a time in clear imitation, then shifting between different combinations — duets, trios, full choir. [[tallis]]'s *Spem in Alium* takes polyphony to its monumental extreme: forty independent voices build gradually from a single line into an overwhelming, luminous wall of sound. The sheer density shows how polyphony can scale from intimate conversation to something approaching the sublime.
>
> *[inline YouTubeEmbed: "Ave Maria...virgo serena", Josquin des Prez, id s-pVbpV4yuk]*
> *[inline YouTubeEmbed: "Spem in Alium", Thomas Tallis, id CkL1hdL40i0]*
>
> **Looking Back** — The shift from medieval monophony to Renaissance polyphony is one of the most dramatic transformations in the history of Western music. Where the *Ave Maris Stella* offered a single, unaccompanied line, [[palestrina]] offers four independent melodies woven into a seamless fabric. The musical world has gone from flat to three-dimensional, from monologue to conversation — exactly as the visual world went from gold-ground icons to perspectival space.
>
> **Looking Forward** — The Baroque will take Renaissance polyphony and charge it with dramatic intensity. The balanced, serene interplay of equal voices will give way to the dramatic contrasts of the concerto (solo against ensemble) and the intellectual rigor of the fugue (a single theme pursued through increasingly complex transformations). Where Renaissance music resolves its tensions smoothly and promptly, Baroque music will exploit those tensions for emotional and dramatic effect — the musical equivalent of the shift from Renaissance perspective to Baroque chiaroscuro.

### 8.2 The Baroque (`02-baroque/music.mdx`)

```yaml
unit: "02-baroque"
period: "The Baroque"
dates: "c. 1600–1700"
core_text: "Paradise Lost"
author: "Milton"
domain: music
title: "Hearing Through Form: The Baroque"
threads:
  - id: texture-voices
    label: "Texture & Voices"
    period_summary: "The concerto principle — solo against ensemble — and the fugue, where a single theme is pursued through increasingly complex polyphonic transformations."
  - id: consonance-dissonance
    label: "Consonance & Dissonance"
    period_summary: "Dissonance is exploited for dramatic effect — juxtaposing consonance and dissonance like chiaroscuro, the musical equivalent of Baroque light and shadow."
  - id: structure-freedom
    label: "Structure & Freedom"
    period_summary: "Paradoxically both highly structured and highly ornamental — the intellectual rigor of the fugue filled with exuberant decorative energy."
featured_listening:
  title: "Toccata and Fugue in D Minor, BWV 565"
  composer: "Johann Sebastian Bach"
  date: "c. 1704"
  duration: "First 3–4 minutes (toccata and opening of fugue)"
  listen_for: "The famous opening is the toccata — free, dramatic, improvisatory. Then the fugue begins: a single theme introduced alone, then taken up by additional voices in increasingly complex combinations. The shift from expressive freedom to intellectual structure is the Baroque in miniature."
  youtube_id: "HL0drraRHJ0"
gallery_listening:
  - title: "Messiah: 'Hallelujah Chorus'"
    composer: "George Frideric Handel"
    date: 1741
    duration: "4 minutes"
    threads: [texture-voices, consonance-dissonance]
    youtube_id: "usfiAsWR4qU"
  - title: "The Four Seasons: 'Winter,' first movement"
    composer: "Antonio Vivaldi"
    date: 1725
    duration: "3.5 minutes"
    threads: [texture-voices]
    youtube_id: "tJAQI7PVofQ"
  - title: "Dido and Aeneas: 'Dido's Lament'"
    composer: "Henry Purcell"
    date: 1689
    duration: "4 minutes"
    threads: [consonance-dissonance, structure-freedom]
    youtube_id: "uGQq3HcOB0Y"
compare_back: "renaissance"
compare_forward: "enlightenment"
```
*(Three gallery pieces — the largest gallery among the first four units.)*

Body:

> **Introduction** — *Baroque* derives from the Portuguese word for "irregular pearl" — originally a term of derision, applied to art and music considered extravagant and overwrought. Just as Baroque painting replaced Renaissance calm with dramatic chiaroscuro, Baroque music replaced Renaissance balance with contrast, drama, and emotional intensity. The era invented opera, perfected the fugue, and developed the concerto — all forms built on the principle of dramatic opposition: loud against soft, solo against ensemble, major against minor. The parallels with [[milton]] are striking: *Paradise Lost* is itself a Baroque work, built on cosmic oppositions (heaven and hell, light and dark, obedience and rebellion) rendered in elaborate, ornamental language.
>
> **Texture & Voices** *("How many voices are active, and how do they relate to each other?")* — Baroque music develops two revolutionary textures. The first is the concerto principle — the contrast between a solo voice or small group and a large ensemble. In a concerto grosso, a small group of soloists (the concertino) alternates with the full orchestra (the ripieno), creating a dramatic dialogue between the individual and the collective. The second is the fugue, which takes Renaissance imitative polyphony and systematizes it into a rigorous intellectual structure: a single theme (the subject) is introduced by one voice, then taken up by each subsequent voice in turn, creating an increasingly complex web. Think of this as the musical equivalent of [[milton]]'s elaborate syntax, multiple clauses and ideas held in suspension, building toward overwhelming cumulative power.
>
> Opera — the Baroque's most consequential invention — works on the same principle of individual against collective, but makes it human and dramatic: a single voice, the aria, stepping out of the musical texture to express what words alone cannot, then returning to the larger ensemble. Nothing in the subsequent four centuries of Western music has been untouched by this innovation.
>
> *Connection to Paradise Lost* — [[milton]]'s poem is built on the concerto principle. The great set-piece speeches — Satan's address to the fallen angels, God's pronouncements, Eve's soliloquy before the Tree — are solo voices set against the vast orchestral backdrop of the cosmos. The tension between the individual voice and the overwhelming forces surrounding it is the poem's central dramatic engine. [[milton]]'s syntax frequently works like a fugue: a single idea introduced at the start of a verse paragraph, then taken up, inverted, elaborated, and combined with other ideas across dozens of lines, building an architecture of extraordinary intellectual complexity. The famous opening sentence of *Paradise Lost* which does not reach its main verb until line six is a verbal fugue in miniature.
>
> **Consonance & Dissonance** *("How does the music handle tension and resolution?")* — Baroque music uses dissonance far more expressively than Renaissance music, exploiting the tension of unresolved harmonies to create emotional drama — yearning, anguish, ecstasy. Yet it still operates within a tonal system where dissonance ultimately resolves. The key innovation is contrast: Baroque composers juxtapose consonance and dissonance, loud and soft, fast and slow, creating a world of dramatic extremes. This is the musical equivalent of chiaroscuro — the sharp contrast between light and shadow that defines Baroque painting.
>
> *Connection to Paradise Lost* — [[milton]]'s epic operates on exactly this principle: the radiance of heaven set against the darkness of hell, with every line charged with the tension between them. The dissonances in *Paradise Lost* — Satan's magnificent rhetoric, the horror of the Fall, the raw grief of Adam and Eve's mutual recrimination — are more extreme than anything Renaissance literature typically allowed, but they still resolve within a theological framework where God's order ultimately prevails, at least in the "official" interpretation of Christian history asserted by the narrative voice of the poem. This is Baroque dissonance: emotionally devastating, but operating within a system that promises eventual resolution.
>
> **Structure & Freedom** *("How does the music relate to inherited formal structures?")* — Baroque music is paradoxically both highly structured and highly ornamental. The fugue is one of the most intellectually rigorous forms in all of music: every note is governed by strict rules of counterpoint. Yet within that structure, Baroque performers added elaborate ornaments (trills, runs, embellishments) that were partly improvised. The architecture is rigid; the decoration is exuberant. This tension between control and excess mirrors [[milton]]'s own style, the strict discipline of blank verse containing a language of extraordinary richness and elaboration.
>
> *[PullQuote]* "The intellectual rigor of the fugue filled with exuberant decorative energy."
>
> Underlying almost all Baroque ensemble music is the basso continuo — a keyboard instrument (usually harpsichord or organ) paired with a bass instrument (cello or bassoon) that provides a continuous harmonic foundation beneath the melodic surface. This element is effectively the Baroque equivalent of a jazz rhythm section: a steady, driving pulse that holds the extravagant melodic and ornamental energy in place. The basso continuo is a fundamental mechanism of Baroque control, the invisible architecture beneath the surface exuberance.
>
> A related form, the passacaglia (or ground bass), makes that architecture explicit: a short bass line repeated over and over while the upper voices vary freely above it. The fixed, repeating foundation is a reflection of divine order; the varied surface is human experience playing itself out within that order.
>
> *Connection to Paradise Lost* — [[milton]]'s blank verse — unrhymed iambic pentameter — is the literary equivalent of the fugue's strict contrapuntal framework, a demanding formal discipline that constrains and enables simultaneously. Within this framework, [[milton]]'s language achieves an almost musical elaboration: the Latinate inversions, the extended similes, the catalogs of names and places that build like ornamental passages in a [[bach]] fugue. The result is the same paradox that the Baroque achieves in music, a structure that feels both intellectually rigorous and sensuously overwhelming. The passacaglia's image of a fixed bass sustaining the chaos of mortal variation is [[milton]]'s cosmology in sonic form: God's order persists, unaltered, underneath the chaos engendered by the Fall of Adam and Eve.
>
> **What to Listen For** — In [[bach]]'s *Toccata and Fugue* above, notice the dramatic shift between the two sections. The toccata is free, improvisatory, and almost wild — pure expressive freedom. The fugue then begins with a single, simple theme stated alone. Listen for that theme as it is picked up by additional voices, one at a time, each entry adding another layer of complexity. The contrast between the toccata's freedom and the fugue's intellectual rigor is the Baroque's central tension in miniature.
>
> In [[handel]]'s *Hallelujah Chorus* below, notice how the texture shifts constantly between moments when all voices sing the same rhythm together (homophony) and moments when voices overlap in polyphonic imitation. The dramatic contrasts of texture — full choir blazing, then suddenly thinning to a few voices — are prototypically Baroque. In [[vivaldi]]'s *Winter*, the concerto principle is vivid: the solo violin against the full string orchestra, creating dialogue, contrast, and drama.
>
> Purcell's "Dido's Lament" is the most immediately moving piece in this unit; it is one of the most beautiful short works in the entire Western canon. Listen for the ground bass: a short, chromatically descending line that repeats eleven times beneath Dido's vocal melody, unwavering as fate. The descending line is word painting for death, and the harmonic dissonances it creates as Dido's vocal line chafes against the inexorable bass produce an ache that has moved audiences for three hundred years. This is the passacaglia principle in action, and the Baroque's emotional extremity at its most concentrated.
>
> *[inline YouTubeEmbed: "Messiah: 'Hallelujah Chorus'", George Frideric Handel, id usfiAsWR4qU]*
> *[inline YouTubeEmbed: "The Four Seasons: 'Winter,' first movement", Antonio Vivaldi, id tJAQI7PVofQ]*
> *[inline YouTubeEmbed: "Dido and Aeneas: 'Dido's Lament'", Henry Purcell, id uGQq3HcOB0Y]*
>
> **Looking Back** — Where Renaissance polyphony wove equal voices into serene, balanced interplay, Baroque music introduces dramatic inequality: the soloist against the ensemble, the individual theme against its contrapuntal elaborations, the sudden shift from quiet to overwhelming. [[palestrina]]'s luminous calm has given way to [[bach]]'s intellectual intensity and [[handel]]'s dramatic power, just as the rational serenity of [[raphael]] has given way to the chiaroscuro of [[caravaggio]].
>
> **Looking Forward** — The Classical period will react against the Baroque's density and elaboration by stripping back to clean lines and transparent textures. The complex polyphony of the fugue will give way to a single clear melody with accompaniment. The dramatic contrasts of the concerto will be refined into the elegant architecture of sonata form. The emotional temperature will cool — not because feeling is absent, but because it is governed by formal clarity and balance. In musical terms, this is comparable to the shift from [[milton]] to [[austen]].

### 8.3 The Enlightenment (`03-enlightenment/music.mdx`)

```yaml
unit: "03-enlightenment"
period: "The Enlightenment"
dates: "c. 1700–1800"
core_text: "Pride and Prejudice"
author: "Austen"
domain: music
title: "Hearing Through Form: The Enlightenment"
threads:
  - id: texture-voices
    label: "Texture & Voices"
    period_summary: "Homophony — a single clear melody with supporting accompaniment, like a protagonist's consciousness with other characters arranged around her."
  - id: consonance-dissonance
    label: "Consonance & Dissonance"
    period_summary: "Dissonance serves structure — moments of tension create departure and anticipation, always resolved satisfyingly within the architecture of the whole."
  - id: structure-freedom
    label: "Structure & Freedom"
    period_summary: "Sonata form — exposition, development, recapitulation — creates expectations and then fulfills them with wit and elegance, much as Austen's plots do."
featured_listening:
  title: "Eine kleine Nachtmusik, K. 525, first movement"
  composer: "Wolfgang Amadeus Mozart"
  date: 1787
  duration: "6 minutes"
  listen_for: "A textbook sonata form: the bright, confident opening theme, the contrasting second theme (more lyrical), the development section (which fragments and recombines), and the satisfying return of the opening. Balanced, witty, elegant."
  youtube_id: "UhPBT0dA_oA"
gallery_listening:
  - title: "Piano Concerto No. 21 in C Major, K. 467, second movement (Andante)"
    composer: "Wolfgang Amadeus Mozart"
    date: 1785
    duration: "7 minutes (or first 3 minutes for the main theme)"
    threads: [consonance-dissonance, texture-voices]
    youtube_id: "5Y4Fkxg7WcA"
  - title: "Symphony No. 94 ('Surprise'), second movement (Andante)"
    composer: "Joseph Haydn"
    date: 1791
    duration: "6 minutes"
    threads: [structure-freedom]
    youtube_id: "lLjwkamp3lI"
  - title: "Overture to Don Giovanni, K. 527"
    composer: "Wolfgang Amadeus Mozart"
    date: 1787
    duration: "6 minutes"
    threads: [structure-freedom, consonance-dissonance]
    youtube_id: "G1YS61pu8Rc"
compare_back: "baroque"
compare_forward: "romanticism"
```
*(Mozart appears three times across the featured + gallery slots — the only composer repeated within a single unit's music page.)*

Body:

> **Introduction** — The Classical movement in music values the same qualities that [[austen]] values in prose: clarity, proportion, balance, wit, and the elegant management of feeling within rational structures. Behind this shift is an Enlightenment conviction: the best music is that which appeals to the greatest number. Where Baroque music was elaborate, intricate, and designed for connoisseurs, Classical music deliberately strips back to clean lines and transparent textures, music that sounds natural to the ear of Enlightenment listeners. The dominant form is the sonata, which organizes musical ideas into a balanced, almost architectural structure — statement, development, recapitulation — much as an [[austen]] novel moves through introduction, complication, and resolution with exquisite formal control.
>
> **Texture & Voices** *("How many voices are active, and how do they relate to each other?")* — Classical music overwhelmingly favors homophony — a single clear melody supported by an accompaniment. The dense polyphony of the Renaissance and the elaborate counterpoint of the Baroque give way to a texture in which one voice leads and the others support. This is the musical equivalent of the shift from the Baroque's multiple competing dramatic forces to the Classical era's focus on a single, clearly articulated narrative line.
>
> The Classical solo concerto extends this logic into the realm of political ideology. With one voice (the soloist) heard alongside, and sometimes pitted against, the collective (the orchestra), the concerto became an almost perfect sonic metaphor for the Enlightenment's view of the individual in society: a single consciousness navigating, collaborating with, and occasionally resisting the pressures of the group.
>
> *[PullQuote]* "A single clear melody with supporting accompaniment, like a protagonist's consciousness with other characters arranged around her."
>
> *Connection to Pride and Prejudice* — Elizabeth Bennet's perspective organizes the novel the way a Classical melody organizes a musical movement: other voices — Darcy, Jane, Mr. Bennet, Wickham — contribute, respond, and complicate, but the primary line of consciousness is always hers. The texture is transparent; the reader always knows whose perception is shaping events, just as Classical music always lets the melody be heard clearly above its accompaniment. The concerto form further sharpens this comparison: Elizabeth's refusals — of Collins, of Darcy's first proposal, of the entire social logic that treats marriage as a transaction — are the soloist's departures from what the orchestra expects and demands.
>
> **Consonance & Dissonance** *("How does the music handle tension and resolution?")* — Classical music uses dissonance with precision and restraint. Moments of harmonic tension serve a structural purpose: they create the sense of departure in the development section of a sonata, building anticipation for the satisfying return to the home key in the recapitulation. Dissonance is a dramatic tool, but it is always in service of a larger architecture of resolution. The emotional range is real — [[mozart]] can be heartbreaking — but feeling is always shaped by form, never allowed to overwhelm it.
>
> *Connection to Pride and Prejudice* — The novel's central dissonance — Elizabeth's prejudice and Darcy's pride — creates real tension, difficult misunderstanding, genuine pain. Yet the novel's architecture ensures that this tension resolves; the misperceptions are corrected, the characters grow, and the resolution feels both surprising and inevitable. Like [[mozart]], [[austen]] makes formal satisfaction feel like emotional truth rendered with seeming ease and simplicity.
>
> **Structure & Freedom** *("How does the music relate to inherited formal structures?")* — One of the Classical era's defining achievements is the cadence — a musical punctuation mark that signals the end of a phrase or section and creates a sense of arrival. Where Baroque music tends toward continuous forward motion (one idea flowing into the next without strong stopping points), Classical music deploys cadences to organize its material into clear phrases with beginnings, middles, and ends. The cadence gives Classical music its quality of narrative in contrast to the Baroque's more circular, ongoing energy of perpetual motion.
>
> This cadential language made possible the Classical era's great formal invention: sonata form, which organizes a movement into three sections. The exposition presents two contrasting themes in two different keys. The development fragments, combines, and transforms those themes in unstable harmonic territory, multiplying "open" cadences that defer resolution. The recapitulation restates both themes in the home key, delivering the large-scale closed cadence the whole movement has been building toward. The form is satisfying because it creates expectations and then fulfills them or even, in the hands of a master like [[haydn]] or [[mozart]], wittily subverts them.
>
> *Connection to Pride and Prejudice* — [[austen]]'s plots follow the same grammatical logic. The novel sets up social and romantic expectations with great clarity (exposition), complicates them through misunderstanding and misdirection (development), and resolves them in ways that are both surprising and deeply satisfying (recapitulation). [[austen]] even uses the deceptive cadence: Wickham appears to resolve Elizabeth's need for a partner, but lands in the wrong key entirely, prolonging the tension rather than ending it. The [[haydn]] "Surprise" Symphony, with its gentle, predictable melody punctuated by a sudden fortissimo chord, demonstrates this wit at its most concentrated. The composer plays with the listener's expectations within the same formal framework that [[austen]] manipulates at every level of structure in her novels.
>
> **What to Listen For** — In [[mozart]]'s *Eine kleine Nachtmusik* above, listen for the bright, confident opening theme and then the shift to a more lyrical second theme — these two contrasting ideas are the "exposition." The development section fragments and recombines them, creating harmonic instability, before the recapitulation brings back the opening material in a satisfying return. The balanced, symmetrical phrases (musical sentences that come in even, proportional groups) are the sonic equivalent of [[austen]]'s precisely balanced prose.
>
> In [[mozart]]'s Piano Concerto No. 21 below, the second movement shows how Classical music handles deep emotion within restrained formal structures: the melody is achingly beautiful but never excessive, feeling shaped by form. Notice also how the piano and orchestra move between collaboration and gentle contest. [[haydn]]'s "Surprise" Symphony demonstrates Classical wit: a gentle, predictable melody punctuated by a sudden fortissimo chord — a joke, but a formally sophisticated one.
>
> In the overture to [[mozart]]'s *Don Giovanni*, listen for the dramatic slow introduction — dark, foreboding, harmonically unstable — before the bright sonata-form movement that follows. The two are in violent contrast: tragedy and comedy occupying the same six minutes. The introduction returns, note for note, at the opera's finale, when the ghost of the murdered Commendatore arrives to drag Don Giovanni to hell. [[mozart]] embeds the opera's moral reckoning inside its overture; the opening dissonance is only resolved at the very end of the evening.
>
> *[inline YouTubeEmbed: "Piano Concerto No. 21 in C Major, K. 467, second movement", Wolfgang Amadeus Mozart, id 5Y4Fkxg7WcA]*
> *[inline YouTubeEmbed: "Symphony No. 94 ('Surprise'), second movement", Joseph Haydn, id lLjwkamp3lI]*
> *[inline YouTubeEmbed: "Overture to Don Giovanni, K. 527", Wolfgang Amadeus Mozart, id G1YS61pu8Rc]*
>
> **Looking Back** — The contrast with Baroque music is one of emotional temperature and surface complexity. [[bach]]'s dense polyphony and [[handel]]'s dramatic contrasts have given way to [[mozart]]'s transparent textures and balanced phrases. Baroque music wears its complexity on its surface — the counterpoint, the ornamentation, the continuous forward drive are all immediately audible. Classical complexity lies beneath the surface: the texture seems simple, even light, but any lapse in execution is instantly exposed by that very transparency. It is the same shift one hears in moving from [[milton]]'s massive periodic sentences to [[austen]]'s clean, precise prose; both demand complete mastery, but they reveal that mastery in opposite ways.
>
> **Looking Forward** — Romanticism will take Classical form and stretch it to the breaking point. [[beethoven]]'s symphonies are roughly twice the length of [[mozart]]'s. Orchestras will double in size. Dissonances will grow more extreme and take longer to resolve. The balanced phrases and elegant proportions of Classical music will give way to the overwhelming, the turbulent, and the sublime. It is, in musical terms, the shift from [[austen]]'s drawing room to [[melville]]'s ocean, from a world where feeling is shaped by form to a world where feeling threatens to shatter form entirely.

### 8.4 Romanticism (`04-romanticism/music.mdx`)

```yaml
unit: "04-romanticism"
period: "Romanticism"
dates: "c. 1789–1880"
core_text: "Moby-Dick"
author: "Melville"
domain: music
title: "Hearing Through Form: Romanticism"
threads:
  - id: texture-voices
    label: "Texture & Voices"
    period_summary: "Vastly expanded orchestral forces create dense, immersive textures — the soloist becomes a heroic individual set against the collective power of the orchestra."
  - id: consonance-dissonance
    label: "Consonance & Dissonance"
    period_summary: "Dissonance is pushed to extremes and resolution is delayed — Wagner's 'Tristan chord' refuses to resolve for an entire opera, the musical equivalent of the sublime."
  - id: structure-freedom
    label: "Structure & Freedom"
    period_summary: "Inherited forms are stretched to the breaking point — emotional truth takes priority over formal neatness, just as Moby-Dick bursts the conventions of the novel."
featured_listening:
  title: "Symphony No. 5 in C Minor, Op. 67, first movement"
  composer: "Ludwig van Beethoven"
  date: 1808
  duration: "7 minutes"
  listen_for: "The famous four-note opening (da-da-da-DUM) is Classical sonata form being pushed to its limits by Romantic emotional force. Listen for how those four notes are developed, transformed, and built into a movement of enormous power — a single idea pursued with obsessive intensity."
  youtube_id: "7eOaIiHB58U"
gallery_listening:
  - title: "Prelude to Tristan und Isolde"
    composer: "Richard Wagner"
    date: 1859
    duration: "First 4–5 minutes"
    threads: [consonance-dissonance]
    youtube_id: "IaZZVRd_WeU"
  - title: "Der Erlkönig"
    composer: "Franz Schubert"
    date: 1815
    duration: "4 minutes"
    threads: [texture-voices, structure-freedom]
    youtube_id: "XoBo8dlPcQo"
  - title: "La Mer: 'From Dawn to Noon on the Sea' (first movement)"
    composer: "Claude Debussy"
    date: 1905
    duration: "First 4 minutes for the dawn"
    threads: [texture-voices, consonance-dissonance]
    youtube_id: "IoENgt1h4_A"
compare_back: "enlightenment"
compare_forward: "modernism"
```

Body:

> **Introduction** — Romantic music takes inherited structures and stretches them to accommodate emotional experiences too vast and turbulent for neat resolution. In the Classical era, form shaped expressive content; in the Romantic era, expressive content shapes form. Where Classical music values balance and proportion, Romantic music values intensity, yearning, and the overwhelming, responding to the era's philosophical imperative to pursue and express the sublime. Orchestras grow enormous. Compositions grow longer. Dissonances grow more extreme and take longer to resolve. The individual's emotional experience becomes the supreme subject. Romantic composers also break with the concept of a shared period style: starting with [[beethoven]], each composer cultivates a recognizably personal voice. [[beethoven]]'s music is identifiable not as "Classical-era music" but as Beethoven, a distinction that would have been much less meaningful a generation earlier. If the Classical era is the soundtrack of [[austen]]'s drawing room, the Romantic era is the thundering roar of [[melville]]'s ocean.
>
> **Texture & Voices** *("How many voices are active, and how do they relate to each other?")* — Romantic composers vastly expanded the orchestra, adding instruments and using them in new combinations to create richer, denser, more colorful textures. Where Classical texture is transparent — each instrument audible in the mix — Romantic texture is often lush, layered, and immersive. The orchestra becomes a single massive instrument capable of overwhelming sonic force. At the same time, Romantic music values the solo voice more intensely than ever: the soloist in a Romantic concerto is a heroic individual set against the collective power of the orchestra. The tension between the individual and the overwhelming is the Romantic era's central drama, and it plays out directly in musical texture.
>
> *Connection to Moby-Dick* — [[melville]]'s novel operates on this same principle, setting the heroic individual voice against an overwhelming collective force. Ishmael's narrating consciousness — contemplative, digressive, philosophically restless — is the soloist; the ocean, the whale, the whaling industry, the *Pequod*'s polyglot crew are the orchestra. Ahab pushes the parallel further. He is the Romantic soloist at a destructive extreme, a single will set against the entire natural order, insisting that his individual intensity can prevail over forces that dwarf him. The novel's texture — dense, encyclopedic, shifting constantly between lyrical meditation and technical exposition — is the literary equivalent of Romantic orchestral richness.
>
> **Consonance & Dissonance** *("How does the music handle tension and resolution?")* — This is where Romantic music makes its most consequential innovations. Composers systematically push the boundaries of dissonance, creating harmonies that are more complex, more ambiguous, and slower to resolve than anything the Classical era allowed. [[wagner]] is the crucial figure: his Prelude to *Tristan und Isolde* opens with the famous "Tristan chord," a dissonance that does not resolve for the entire four hour length of the opera. [[wagner]] conceived of his orchestra as the "inner voice of truth." Where the singers represent the surface world of social obligation and half-truths, the orchestra reveals what is actually happening underneath the surface, the irresolvable desire the characters cannot speak. The Tristan chord brilliantly enacts his endless, aching yearning, a tension that refuses to be satisfied.
>
> *[PullQuote]* "An unbearable tension that the inherited systems of resolution cannot contain."
>
> *Connection to Moby-Dick* — Once introduced into the story, Ahab's obsession has the same structure as the Tristan chord, an unbearable tension that the inherited systems of resolution — tonal harmony, the conventions of the adventure novel — cannot contain. [[wagner]]'s orchestra reveals what Tristan and Isolde cannot say aloud. [[melville]]'s cetology chapters work similarly, returning periodically across the novel, accumulating meaning each time they reappear. The novel's refusal to resolve its unanswered questions about the meaning of the whale is the literary equivalent of Romantic dissonance pushed past the point of resolution.
>
> **Structure & Freedom** *("How does the music relate to inherited formal structures?")* — Romantic composers inherit Classical forms like the sonata and the symphony but stretch them dramatically. [[beethoven]]'s symphonies are roughly twice the length of [[mozart]]'s; Mahler's are twice again as long as [[beethoven]]'s. Forms expand, break apart, and sometimes dissolve into something freer: the tone poem, the rhapsody, the fantasy. The impulse is always the same: inherited structures feel too small for what the composer needs to express. Emotional truth takes priority over formal neatness.
>
> One Romantic solution to this problem was the idée fixe — a theme associated with a person or obsession that recurs throughout a work in altered forms, providing coherence through iteration rather than through Classical development. Berlioz's *Symphonie fantastique* builds its five movements around a single theme representing the composer's beloved: it reappears in every movement, transformed (tender, then mocking, then grotesque) as the young man's obsession distorts his perception of her. A smaller-scale version of the same principle governs Schubert's *Der Erlkönig*: a single galloping figure in the piano, sustained without interruption across the entire song, drives father and dying child through the night with the relentlessness of an idea that cannot be abandoned.
>
> *Connection to Moby-Dick* — The white whale is Ahab's undeniable idée fixe — a fixed obsession that drives the action of the novel, accumulating meaning with each reappearance until it overwhelms the structures built to contain it. *Moby-Dick* contains chapters on cetology, philosophy, stage directions, and extended meditations on the color white because the form of the conventional novel cannot contain what [[melville]] is trying to express. Like a Romantic symphony that bursts the boundaries of sonata form, the novel incorporates genres and modes that don't belong in a novel, yet somehow makes them essential. The first movement of [[beethoven]]'s Fifth symphony demonstrates this on a smaller scale: classical sonata form is still audible, but the emotional intensity of those four obsessive notes, iterating, transforming, and driving the entire movement forward pushes the form to its limits.
>
> **What to Listen For** — In the first movement of [[beethoven]]'s Fifth above, the famous four-note motif is not just a catchy opening phrase; it is the raw material from which the entire movement is built. Listen for the way that those four notes are fragmented, transposed, extended, and combined as the movement unfolds. The relentless developmental energy is what makes this transitional piece Romantic rather than Classical. Classical sonata form is still the skeleton, but the flesh is Romantic intensity.
>
> In [[wagner]]'s *Tristan* Prelude below, listen for the sense of unresolved yearning, the music constantly reaching toward a resolution that only arrives hours later in the opera. The harmonies are richer and more ambiguous than anything in the Classical period, and the emotional tension builds without release.
>
> In Schubert's *Der Erlkönig*, listen for the way that a single (continuous, galloping, relentless) piano figure conveys the experience of four characters: narrator, father, child, and the supernatural Elf King, whose seductive murmuring contrasts with the father's desperate reassurances and the child's mounting terror.
>
> [[debussy]]'s *La Mer* sits at the boundary between Romanticism and Modernism: the orchestra creates shifting, shimmering textures that evoke the sea not through representation but with a kind of sonic impressionism. The connection to [[melville]]'s ocean is almost too perfect; this is the sound of "meditation and water" wedded together.
>
> *[inline YouTubeEmbed: "Prelude to Tristan und Isolde", Richard Wagner, id IaZZVRd_WeU]*
> *[inline YouTubeEmbed: "Der Erlkönig", Franz Schubert, id XoBo8dlPcQo]*
> *[inline YouTubeEmbed: "La Mer: 'From Dawn to Noon on the Sea'", Claude Debussy, id IoENgt1h4_A]*
>
> **Looking Back** — Place the opening of [[beethoven]]'s Fifth next to the opening of [[mozart]]'s *Eine kleine Nachtmusik* and the shift is immediately audible. [[mozart]]'s theme is balanced, symmetrical, elegant; it states itself clearly and moves on. [[beethoven]]'s four notes are obsessive, driving, relentless; they don't state a theme so much as launch an argument that will take the entire movement to develop (and three more deeply integrated movements to resolve). The Classical world of proportion and balance has given way to a Romantic world of intensity and struggle.
>
> **Looking Forward** — Modernism will complete the revolution that Romanticism began. Where Romantic music stretched the tonal system to its limits, [[schoenberg]] will abandon it entirely. Where Romantic composers expanded inherited forms, [[stravinsky]] will shatter them. Where Romantic texture was lush and immersive, Modernist texture will be fragmented and deliberately strange. European Romantic music drew on folk traditions and nationalist feeling, but Modernism in America will be transformed by the African American musical traditions (jazz, the blues, and their descendants) that directly shaped [[ellison]]'s *Invisible Man*.

### 8.5 Modernism (`05-modernism/music.mdx`)

```yaml
unit: "05-modernism"
period: "Modernism"
dates: "c. 1900–1950"
core_text: "Invisible Man"
author: "Ellison"
domain: music
title: "Hearing Through Form: Modernism"
threads:
  - id: texture-voices
    label: "Texture & Voices"
    period_summary: "Textures are fragmented, layered, and juxtaposed — Stravinsky stacks colliding rhythms while jazz improvisation creates fluid, unpredictable interplay between soloist and ensemble."
  - id: consonance-dissonance
    label: "Consonance & Dissonance"
    period_summary: "Schoenberg abolishes the distinction between consonance and dissonance entirely — there is no home key, no hierarchy, no resolution. Music sounds permanently unanchored."
  - id: structure-freedom
    label: "Structure & Freedom"
    period_summary: "Inherited forms are radically reinvented or abandoned — while jazz develops its own formal innovations, using the blues progression as a framework for essentially unlimited improvisation."
featured_listening:
  - title: "The Rite of Spring: 'Augurs of Spring'"
    composer: "Igor Stravinsky"
    date: 1913
    duration: "Listen from about 3:00 to 6:00 for the pounding section"
    listen_for: "The famous pounding chords with their irregular, unpredictable accents. The rhythm is jagged and visceral — compare the balanced phrases of Mozart to this and the rupture is immediately audible. Its 1913 premiere caused a riot."
    youtube_id: "dcwB67IoefA"
  - title: "Black, Brown and Beige: 'Black' section"
    composer: "Duke Ellington"
    date: 1943
    duration: "First 5–6 minutes"
    listen_for: "How jazz texture works: soloists emerge from the ensemble, improvise, and return. The connection to Ellison's narrative method is direct — the narrator's voice riffs, improvises, circles back, and breaks into different registers just as a jazz soloist does."
    youtube_id: "8HZ4jiiOQmc"
gallery_listening:
  - title: "Pierrot Lunaire, No. 8: 'Nacht' (Night)"
    composer: "Arnold Schoenberg"
    date: 1912
    duration: "2 minutes"
    threads: [consonance-dissonance, texture-voices]
    youtube_id: "1gafF5sbnB0"
  - title: "The Rite of Spring: Introduction to Part I"
    composer: "Igor Stravinsky"
    date: 1913
    duration: "First 4 minutes"
    threads: [texture-voices, structure-freedom]
    youtube_id: "02tkp6eeh40"
compare_back: "romanticism"
compare_forward: null
```
*(The only unit whose `featured_listening` is an **array of two objects** rather than a single object — the template's hero `.featured-embeds` div therefore renders two `<YouTubeEmbed>`s side by side in the hero zone here, and nowhere else. `compare_forward: null`: Modernism is the terminal unit, so the pager's "Next unit" link is absent; there is also no next *domain* — Music is already last in `DOMAIN_ORDER` — so on this specific page the pager's right slot is empty on both counts.)*

Body:

> **Introduction** — Musical Modernism, like its counterparts in painting and literature, is defined by rupture, but the rupture did not arrive without warning. The tonal system that had organized Western music for centuries was already under extreme pressure by the late nineteenth century. Wagner needed to do the technically "wrong thing" — suspending harmonic resolution, violating tonal expectation — to achieve the expressive effects he needed. Mahler pushed further still. Each generation of Romantic composers required more extreme musical means to express more extreme emotional states. [[schoenberg]], [[stravinsky]], and their contemporaries were not so much revolutionaries as the inevitable next step: composers for whom the inherited language had finally, definitively become exhausted. Just as Cubism shattered the coherent picture plane and [[ellison]] fragmented the unified narrative voice, they broke apart the fundamental assumptions of the tonal harmonic system.
>
> At the same time, African American musical traditions — jazz, blues, and their descendants — were transforming American music with their own formal innovations, which directly influenced [[ellison]]'s literary method. This unit features two works because Modernism cannot be represented by a single tradition. The European avant-garde and the African American musical tradition are both essential to understanding *Invisible Man*.
>
> **Texture & Voices** *("How many voices are active, and how do they relate to each other?")* — Modernist composers fragment, layer, and juxtapose textures in ways that would have been unthinkable in earlier eras. The foundation was laid by Debussy, who approached the orchestra not as a blended collective but as a large chamber ensemble of individuals, voices that could be used singly or in any combination, sparingly or grandly, as the music demanded. Timbre became, for Debussy, a thematic element in its own right, as structurally significant as melody or harmony. [[stravinsky]] inherited this atomized approach to orchestral color and then transformed it: rather than Debussy's shimmering, static clouds of sound, he stacked those individual voices into percussive rhythmic webs, creating a sense of collision rather than atmosphere. [[schoenberg]], meanwhile, stripped the ensemble down to small, unusual combinations — a flute, a bass clarinet, a piano, a reciting voice — that sound deliberately strange and exposed. In American jazz, improvisation creates a texture where individual voices emerge from and return to the ensemble in fluid, unpredictable ways.
>
> The Introduction to Part I of *The Rite of Spring* demonstrates this atomizing of orchestral color at its most striking. The piece opens on a solo bassoon playing at the very top of its range — a strange, reedy sound, almost vocal, nothing like what a bassoon ordinarily does. Over the next four minutes, other woodwinds enter one by one, each adding a new melodic cell that repeats and overlaps without building toward any harmonic destination. The effect is cumulative rather than developmental — less a progression than an accumulation, like organisms emerging one by one from the earth. [[stravinsky]] said that what he was trying to capture was "the violent Russian spring that seemed to begin in an hour and was like the whole Earth cracking open." The music does not represent that event so much as replicate its process: the layering of independent, repeated voices that never quite merge.
>
> *Connection to Invisible Man* — [[ellison]] explicitly modeled *Invisible Man* on jazz: the narrator's voice riffs, improvises, circles back, and breaks into different registers — sermon, speech, blues lyric, philosophical meditation — just as a jazz soloist moves through different modes of expression within a single performance. The novel's texture is layered, shifting, and sometimes deliberately dissonant, voices and registers colliding rather than blending. The Brotherhood rally, the Liberty Paints factory, the Harlem riot, the underground epilogue — each section has a different sonic texture, and the rapid shifts between them are part of the novel's meaning.
>
> **Consonance & Dissonance** *("How does the music handle tension and resolution?")* — [[schoenberg]] explicitly described his musical project as the emancipation of dissonance. In the tonal system, certain notes are "home" and others create tension that pulls toward home; consonance and dissonance are a hierarchy, with resolution always implied. [[schoenberg]] sought to eliminate that hierarchy entirely. Between 1908 and 1913, in works including *Pierrot Lunaire*, he suspended the rules of traditional tonal harmony in favor of melody, polyphony, and motivic development — a freely atonal style in which all twelve notes of the chromatic scale are treated as equals. There is no home, no hierarchy, no resolution. The effect is music that sounds permanently unanchored, floating in a space where tension never resolves because there is no longer any stable ground to sonically define resolution. [[schoenberg]] saw himself not as a revolutionary but as the next inevitable step in the German tradition that ran from Bach through Beethoven and Brahms to Wagner and Mahler — each generation having pushed the tonal system further until Schoenberg simply completed the trajectory.
>
> *[PullQuote]* "There is no home key, no hierarchy, no resolution. Music sounds permanently unanchored."
>
> [[stravinsky]] took a different path, using familiar harmonies but combining them in harsh, unexpected ways, like seeing a familiar face distorted in a funhouse mirror. The *Rite of Spring*'s pounding chords are built from simple triads, but stacked and accented in ways that make them feel violent and disorienting.
>
> *Connection to Invisible Man* — The abolition of a tonal "home" is the sonic equivalent of the narrator's condition: an identity with no fixed center, existing in a world that refuses to see him clearly. Every institution he encounters offers a different "key" — a different system of meaning that promises to organize his experience — and every one turns out to be false or partial. The college promises order through accommodation; the Brotherhood promises order through ideology; Ras promises order through racial solidarity. None of these resolutions holds. The narrator ends underground, in a space with no stable tonal center, where the only honest response to the world's dissonance is to acknowledge it rather than pretend it resolves.
>
> **Structure & Freedom** *("How does the music relate to inherited formal structures?")* — Inherited forms are either radically reinvented or abandoned. Debussy dissolved traditional harmonic progression, creating tonality by assertion — sustaining a pitch or repeating a motive until it registers as a center — rather than by the functional motion from well-defined tension to resolution that had governed Western music for three centuries. Where Debussy's innovation was primarily one of timbre and harmonic stasis, [[stravinsky]]'s was rhythmic: he established an entirely new paradigm in which rhythm alone functions as a thematic, dramatic, and structural device. The *Rite of Spring* replaces balanced phrases and predictable meters with jagged, asymmetrical polyrhythms (irregular groupings of beats that make even simple repeated chords feel violent and unpredictable) and ostinati (fixed patterns of notes that repeat without variation or change). What Debussy did for timbre, [[stravinsky]] did for rhythm.
>
> Meanwhile, jazz develops its own formal innovations: the blues progression (a 12-bar harmonic pattern) provides a framework within which improvisation is essentially unlimited. The structure is minimal but firm; the freedom within it is vast.
>
> *Connection to Invisible Man* — [[ellison]] understood this principle deeply, and it shapes the architecture of *Invisible Man*. The novel has a clear narrative structure — a young man's journey from the South to the North, from innocence to experience, from visibility to invisibility to a tentative re-emergence — but within that structure, the improvisatory freedom is extraordinary: surrealist dream sequences, naturalistic street scenes, political satire, philosophical meditation, all coexisting in a single work. This is the blues-progression principle applied to fiction: a firm underlying pattern that enables rather than constrains creative freedom. The narrator's final decision to emerge from underground is not a resolution in the Classical sense but something more provisional and more honest: an improvised response to an unresolved situation.
>
> **What to Listen For** — In [[stravinsky]]'s *Rite of Spring* above, listen for the pounding chords in the "Augurs of Spring" section and notice how their accents fall in irregular, unpredictable places. This is asymmetrical rhythm as a structural principle: the beat groupings shift constantly, so the music never settles into a pattern the body can anticipate. Compare this to the balanced, symmetrical phrases of [[mozart]] and the rupture is immediately audible.
>
> In [[ellington]]'s *Black, Brown and Beige*, listen for how jazz texture works at the level of the ensemble: individual soloists emerge from the collective, improvise, and return. The relationship between soloist and ensemble is fluid and democratic in a way that neither Classical homophony nor Baroque counterpoint achieves. It is this texture, more than any European formal innovation, that [[ellison]] drew on as a model for his narrator's voice.
>
> In [[schoenberg]]'s *Pierrot Lunaire* below, the vocalist's Sprechstimme (a technique suspended between speaking and singing) makes language itself sound fragmented and uncanny. There is no tonal center, no resolution. The feeling is of floating in darkness — the sonic equivalent of the narrator's underground room before the lights come on.
>
> In the [[stravinsky]] *Introduction to Part I* in the gallery, listen for what does not happen: there is no melody in the conventional sense, no harmonic forward motion, no sense of the music going somewhere. Instead, follow individual voices as they enter — the opening bassoon, then the other woodwinds joining one by one — and notice how each repeats its own pattern without resolving into anything larger. Debussy, who heard the piece before its premiere, called it "an extraordinarily savage affair, primitive with every modern convenience." Both halves of that description are worth holding: the primitivism is the point, and the sophistication of the means is exactly what makes the primitivism so unsettling.
>
> *[inline YouTubeEmbed: "Pierrot Lunaire, No. 8: 'Nacht' (Night)", Arnold Schoenberg, id 1gafF5sbnB0]*
> *[inline YouTubeEmbed: "The Rite of Spring: Introduction to Part I", Igor Stravinsky, id 02tkp6eeh40]*
>
> **Looking Back** — The full arc of the course is audible from here. Medieval monophony — a single voice, no harmony, no tension — gave way to Renaissance polyphony's balanced interplay of equal voices. Baroque music charged that polyphony with dramatic contrast. Classical music refined contrast into elegant architecture. Romanticism stretched that architecture to the breaking point. And Modernism breaks it apart entirely — the tonal system, the balanced phrases, the unified texture, the promise of resolution — revealing that every previous musical language was itself a set of conventions, not a description of nature. Jazz, emerging from a different tradition entirely, offers an alternative model: structure and freedom held in a productive, improvisatory tension. [[ellison]]'s *Invisible Man* draws on both the European rupture and the African American innovation, creating a novel that is itself a new kind of music.
>
> *(No "Looking Forward" section — Modernism is the terminal unit, same convention as Painting and Sculpture's Modernism pages.)*

---

## 9. Media assets (no local image files — everything is YouTube)

Unlike Painting and Sculpture, **the Music domain has no `public/images/` directory of its own and no static hero photography at all.** Every visual element tied to a musical work — the hero embed thumbnail, the inline "What to Listen For" embeds, the sidebar "Featured Listening" cards — is either a live-fetched YouTube thumbnail (`https://img.youtube.com/vi/{id}/hqdefault.jpg`) or an abstract tinted-gradient placeholder with staff lines (the sidebar cards, §3). Reproducing these pages requires no image asset pipeline — only the YouTube video IDs below.

All YouTube IDs referenced across the six pages, by unit:

```
00-medieval:      sdJ55DPsWhI (featured) · h3FED3omlDA · Q2JvIyStzNA
01-renaissance:   0yd5EE0hAB8 (featured) · s-pVbpV4yuk · CkL1hdL40i0
02-baroque:       HL0drraRHJ0 (featured) · usfiAsWR4qU · tJAQI7PVofQ · uGQq3HcOB0Y
03-enlightenment: UhPBT0dA_oA (featured) · 5Y4Fkxg7WcA · lLjwkamp3lI · G1YS61pu8Rc
04-romanticism:   7eOaIiHB58U (featured) · IaZZVRd_WeU · XoBo8dlPcQo · IoENgt1h4_A
05-modernism:     dcwB67IoefA + 8HZ4jiiOQmc (both featured — array) · 1gafF5sbnB0 · 02tkp6eeh40
```

BioLink targets (`[[id]]` above) resolve against the `PEOPLE` array in `src/components/BiographyPanel.jsx` — pull `name`, `dates`, `field`, `bio`, `significance`, and (if present) `portrait` path from there for anyone referenced: perotinus, shakespeare, palestrina, josquin, tallis, milton, bach, handel, vivaldi, raphael, caravaggio, austen, mozart, haydn, beethoven, melville, wagner, debussy, schoenberg, stravinsky, ellison, ellington.

---

## 10. Known quirks / things not to "fix" when reproducing

- **Per-domain color is really per-unit.** Music does not have its own accent color distinct from Philosophy/Painting/Sculpture within the same unit — all four domain pages of a unit share one `--thread-acc`. Only the sub-thread rotation (`DOMAIN_THREAD_COLORS.music`) differs by domain.
- **`color-mix(in oklab, ...)`** is used extensively for tints (sidebar card borders/backgrounds, sigil-box borders, the abstract "Featured Listening" card gradients). This requires a modern evergreen browser; older/unsupported renderers will show the underlying flat background color instead of the tinted gradient.
- **Medieval's frontmatter sets `author: null`,** unlike Sculpture's Medieval page (`author: "Shakespeare"`) for the same unit — this is a genuine inconsistency between the two domain files, not a rendering bug; reproduce each file's frontmatter exactly as written.
- **Medieval's Music page is the only page in the entire Painting/Sculpture/Music set (18 pages total across the three companion handoffs) with zero `### Connection to [Text]` callouts under two of its three sub-threads** (Texture & Voices and Consonance & Dissonance have none; only Structure & Freedom does) — don't add matching callouts to "even things out."
- **Modernism's `featured_listening` is the only array-form instance** across all six units — the schema supports it (`z.union([singleObject, z.array(singleObject)])`) specifically for this case, rendering two hero `<YouTubeEmbed>`s side by side instead of one.
- **Gallery tracks are deliberately shown twice**: once as playable inline embeds within "What to Listen For" prose, and again as non-playing (link-out) thumbnail cards in the sidebar. Don't deduplicate.
- **`<MusicPlate>` is imported and available to every page's MDX components but never actually invoked** — all inline embeds use `<YouTubeEmbed>` instead. Don't substitute one for the other when reproducing.
- **The YouTube play-button hover tint (`rgba(175,50,30,.85)`) is fixed across all six units** and does not shift with `--thread-acc` the way most other accent-driven UI does — reproduce it as a constant warm red-orange regardless of unit.
- **CLAUDE.md's accent color table is stale** relative to what's live on these six pages (see §2) — do not use it as the source of truth for this handoff.
- Sidebar "Featured Listening" always lists `[...featured_listening, ...gallery_listening]` in that fixed order; it does **not** re-sort by the `threads[]` tags on each entry (those tags exist in the schema but aren't currently rendered/filtered on this page).
