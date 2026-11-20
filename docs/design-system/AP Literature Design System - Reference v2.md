# AP Literature Design System — Reference (v2, October 17, 2026)

Incorporates the October 17, 2026 amendments (A1–A9). Open items are listed in §13.

A complete description of the visual and verbal rules for the AP Literature course materials. Use this document as the source of truth when producing anything for the course: web pages, handouts, slides, study guides, or HTML artifacts.

---

## 1. Identity in one paragraph

Light, editorial, and quiet. Dark warm-brown ink on warm cream paper. A display serif for headings, a reading serif for body text, and an uppercase monospace for labels and dates. Square corners, 1px hairline rules, no gradients, no shadows on cards, no rounded pills, no emoji. The register is a museum monograph: scholarly, matte, and restrained.

### The AP Lit family

There are three sibling "imprints" that share one core (paper, ink, rules, the IBM Plex Mono label face, type scale, spacing). Each imprint changes only its serifs:

| Imprint | Display serif | Text / body face |
|---|---|---|
| **Cultural Background** (art & philosophy) — *this system* | Cormorant Garamond | EB Garamond |
| Summer Reading | Fraunces | DM Sans |
| Poetry & Prose Guide | Literata | Literata |

### Course content context

Six units, each anchored to a core text. Every unit is studied through four **domains** (Philosophy, Painting, Sculpture, Music), and each domain is organized around three analytical **threads**:

- **Philosophy:** The Human Position; Knowledge and Its Limits; The Individual and Authority
- **Painting:** Figure & Space; Light & Shadow; Brushwork & Surface
- **Sculpture:** Body & Volume; Material & Making; Space & Setting
- **Music:** Texture & Voices; Consonance & Dissonance; Structure & Freedom

A domain is never labeled a thread. ("Thread I · Philosophy" is retired; the unit-overview frieze is titled "The Four Domains.")

| # | Period | Dates |
|---|---|---|
| 00 | The High Middle Ages | c. 1000–1400 |
| 01 | Renaissance & Reformation | c. 1400–1650 |
| 02 | The Baroque | c. 1600–1700 |
| 03 | The Enlightenment | c. 1700–1800 |
| 04 | Romanticism | c. 1789–1900 |
| 05 | Modernism | c. 1900–mid-1950s |

Core texts include *Hamlet*, *Paradise Lost*, *Pride and Prejudice*, *Moby-Dick*, and *Invisible Man*.

---

## 2. Voice and writing rules

Written by a teacher, not a marketer.

- **Confident, plainspoken, scholarly.** Long, lucid sentences. Subordinate clauses welcome. Em dashes do real work.
- **Person:** "we" or impersonal. Avoid "you." Never "you'll learn how to…"
- **No hype, no exclamation points, no emoji.**
- **Casing:** Title Case for proper headings; sentence case for body; UPPERCASE with wide tracking for UI labels.
- **Titles of works:** always *italic*, never in quotation marks.
- **Authors:** full name on first reference (William Wordsworth), last name after.
- **Quotes:** curly quotes only (“ ” ‘ ’).
- **Numbers:** two-digit arabic numerals for units (00–05), which mark chronology and the course's own numbering. Number cards, rooms, or lens groups only when the content is an actual sequence or the numbers are used for reference. Roman numerals (§ I, § II) only in long documents where sections are cited. The studio lens groups (Looking Studio, Listening Studio) are unnumbered.
- **Labels:** a label, eyebrow, § label, or mono tag appears only when it adds necessary information that the rest of the page does not already state or imply. A label that repeats the breadcrumb, a selected tab, the heading, or another label is cut. When in doubt, cut.
- **Dates:** ranges as "1000 – 1950" (en dash with spaces) in labels; "c. 1600–1700" inside body text.
- **Unicode vocabulary:** § · — → ▶ ■
- **Long-form is welcome.** The materials reward close reading.

Sample sentences in the house voice:

> "The Baroque shatters the calm, rational order of Renaissance painting."

> "Six units of philosophical, visual, and musical context — from the medieval foundations that all later periods react against, through Modernism's crisis of certainty."

---

## 3. Color

### 3.1 Surfaces (warm cream paper)

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#F4EDDF` | Page background |
| `--bg-raised` | `#EBE2D0` | Cards, panels, modals |
| `--bg-sunken` | `#FAF4E6` | Inputs, image mats (reads lighter — a recess in the paper) |
| hover | `#E0D5BD` | One step warmer/darker than `--bg-raised` |

Never use pure white (`#FFFFFF`).

### 3.2 Ink (warm dark brown — never pure black)

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#1B1714` | Headings, primary text, emphasis |
| `--ink-mute` | `#4A4138` | Body paragraphs, secondary text, captions |
| `--ink-soft` | `#6A6053` | Eyebrows, labels, footers, tertiary |

### 3.3 Rules

| Token | Hex | Use |
|---|---|---|
| `--rule` | `#C9BDA5` | Default 1px dividers, card and figure borders |
| `--rule-strong` | `#A89978` | Emphasized borders, selected states, focus, modals |

### 3.4 Period accents (locked July 10, 2026 — "Palette A")

Warm and tonal. One accent per unit; it governs that unit's page chrome.

| Unit | Token | Hex | Name |
|---|---|---|---|
| 00 Medieval | `--acc-medieval` | `#C9A24B` | gold |
| 01 Renaissance | `--acc-renaissance` | `#B54C3A` | oxblood |
| 02 Baroque | `--acc-baroque` | `#B07028` | copper |
| 03 Enlightenment | `--acc-enlightenment` | `#698BA1` | slate-blue |
| 04 Romanticism | `--acc-romanticism` | `#3D5A6D` | indigo |
| 05 Modernism | `--acc-modernism` | `#A03828` | cadmium |

Default accent when no period is in scope: `--acc` `#C9A24B` (gold).

**Accessibility caveat:** Renaissance (oxblood) and Modernism (cadmium) are hard to tell apart for red-green colorblind viewers. Never let color be the only signal — always show the unit number, period name, and dates alongside the accent.

### 3.4a Text-safe accent variants (family accessibility rule)

Four of the six accents fail WCAG AA as small text on cream (Medieval 2.06:1, Enlightenment 3.10, Baroque 3.47, Renaissance 4.44). Gold, which is also the default `--acc`, fails even the 3:1 large-text threshold. Each period therefore has a text variant: a hue-preserving OKLCH darkening to at least 4.6:1 on `--bg-raised`.

| Token | Hex | Contrast on raised / bg / sunken |
|---|---|---|
| `--acc-medieval-text` | `#815D00` | 4.66 / 5.15 / 5.47 |
| `--acc-renaissance-text` | `#A94130` | 4.68 / 5.17 / 5.49 |
| `--acc-baroque-text` | `#935500` | 4.61 / 5.09 / 5.41 |
| `--acc-enlightenment-text` | `#47687D` | 4.61 / 5.09 / 5.40 |
| `--acc-romanticism-text` | `#3D5A6D` (unchanged) | 5.66 / 6.26 / 6.64 |
| `--acc-modernism-text` | `#A03828` (unchanged) | 5.28 / 5.83 / 6.19 |

**Rule:** any text colored by a period accent uses the text variant — the unit numeral, dates, breadcrumbs, mono tags, eyebrows, the drop cap, and default-accent text. The original accent stays for swatches, ticks, rules, emblems, tab underlines, pull-quote borders, and tints. Large text may use the original only where it measures at least 3:1 on its actual background.

The Renaissance and Modernism text variants are closer in hue than the originals; the co-encoding rule above (number, name, dates) does the identifying work.

### 3.5 Domain colors (cross-period continuity)

Used for the thread rows within each domain and for thread icons. Stable across periods: painting is always madder rose, music always manuscript violet. Each domain has three steps, used in order for its three thread rows.

| Domain | Mid | Dark | Light | Name |
|---|---|---|---|---|
| Philosophy | `#3A332C` | `#15120F` | `#635C55` | iron-gall ink |
| Painting | `#75435B` | `#4D293A` | `#9F6B84` | madder rose |
| Sculpture | `#4F6B4D` | `#30472F` | `#7A9178` | moss green |
| Music | `#574878` | `#382D51` | `#80729F` | manuscript violet |

**On text:** use the mid or dark step. The light steps (sculpture `#7A9178` at 2.93:1; painting and music about 3.7:1) are for icons, stripes, and tints only.

### 3.6 The two-layer color rule

| Layer | Variable | Governs |
|---|---|---|
| Period accent | `--thread-acc` (set per page) | Unit number, dates, breadcrumbs, hero eyebrow, drop cap (text uses the `-text` variant, §3.4a); tab underline, pull-quote border (original accent) |
| Domain color | `--sub-acc` (set per row) | Thread sidebar rows, thread sigil icons |

Example: on the Baroque / Painting page, chrome is copper and thread rows are madder rose. On Romanticism / Painting, chrome turns indigo but thread rows stay madder rose.

### 3.7 Timeline era colors

Deeper and more saturated, used only on the dense timeline.

| Era | Hex |
|---|---|
| Renaissance & Reformation | `#8A6015` |
| Civil War & Enlightenment | `#3A6A8B` |
| Revolution & Romanticism | `#6B4878` |
| Industrial Age & Realism | `#38685A` |
| World Wars & Modernism | `#A03828` |

### 3.8 Tint recipe

Accents are tinted onto cream with `color-mix(in oklab, ACCENT N%, var(--bg))`:

| Strength | % | Use |
|---|---|---|
| Soft | 6% | Pull-quote background, section wash |
| Mid | 10% | Chip / row fill, button hover, sigil box |
| Edge | 35% | 1px tinted border |

### 3.9 No dark mode

The cream-and-ink ground is the brand. There is no dark mode anywhere in the family.

---

## 4. Typography

### 4.1 Families (all from Google Fonts)

| Role | Family | Weights | Notes |
|---|---|---|---|
| Display | **Cormorant Garamond** | 400 / 500 / 600, italic | Headings, hero, pull quotes, wordmark. Display only — too thin for body. Use weight 500 on paper. |
| Text | **EB Garamond** | 400 / 500, italic | All body prose. |
| UI | **IBM Plex Sans** | 400 / 500 / 600 | Nav, buttons, tabs, inputs. Usually UPPERCASE, tracked. |
| Colophon | **IBM Plex Mono** | 400 / 500 | Eyebrows, § labels, dates, tags, meta. Shared across all three imprints. |

Fallback stack for serifs: `'Spectral', Georgia, serif`.

### 4.2 Type scale

| Token | Size | Use |
|---|---|---|
| `--t-hero` | clamp(40px, 6.5vw, 92px) | Hero title |
| `--t-h1` | clamp(40px, 6vw, 80px) | Page title |
| `--t-h2` | 26px | Section heading |
| `--t-h3` | 22px | Card title |
| `--t-h4` | 20px | Sidebar / subheading |
| `--t-body` | 18px | Reading body (family minimum — never smaller for prose) |
| `--t-body-sm` | 15.5px | Card body, sidebars |
| `--t-ui` | 14px | Nav, links |
| `--t-ui-sm` | 13px | Section labels |
| `--t-mono` | 12px | Dates, codes |
| `--t-mono-xs` | 10.5px | Tightest tag |

### 4.3 Tracking (letter-spacing)

| Token | Value | Use |
|---|---|---|
| `--track-display` | −0.02em | Hero |
| `--track-tight` | −0.01em | H1, H2 |
| `--track-ui` | 0.06em | Nav, mono meta |
| `--track-ui-wide` | 0.08em | UI labels, tabs |
| `--track-label` | 0.14em | Mono tags |
| `--track-section` | 0.22em | § section labels |

### 4.4 Element styles

- **Headings are set upright.** Italic inside a heading is reserved for titles of works. No accent-italic on a final word or phrase.
- **H1 / H2 / H3:** Cormorant Garamond 500, `--ink`, line-height 1.0 / 1.1 / 1.15.
- **H4:** Cormorant Garamond 600, line-height 1.2.
- **Body paragraph:** EB Garamond 18px, line-height 1.65, color `--ink-mute`.
- **Emphasis (`em`, `strong`):** color `--ink`; strong at 600.
- **UI label:** IBM Plex Sans 13px / 500, UPPERCASE, 0.08em, `--ink-soft`.
- **Section label / eyebrow:** IBM Plex Mono 13px, UPPERCASE, 0.22em, `--ink-soft`.
- **Mono meta (dates, codes):** IBM Plex Mono 12px, 0.06em, `--ink-soft`.
- **Mono tag:** IBM Plex Mono 12px, UPPERCASE, 0.14em, in the accent's text variant.
- **Work titles:** Cormorant Garamond italic, `--ink`.
- **Wordmark:** "AP Literature" in Cormorant Garamond 500 italic, ~16–18px, 0.01–0.02em.
- **Drop cap:** first letter of long-form prose; Cormorant Garamond 600, 3.1em, floated left, line-height 0.78, in the period accent's text variant.

---

## 5. Layout and spacing

| Token | Value | Use |
|---|---|---|
| `--gutter` | clamp(20px, 4vw, 64px) | Page padding only — never element padding |
| `--col` | min(860px, 100%) | Body prose column |
| `--col-wide` | 1100px | Outer wrap on grid pages |

- **Grids:** 3 columns above 900px, 2 columns from 560–900px, 1 column below 560px.
- **Primary target screen:** 13" MacBook Air (1440×900) at 100% zoom.
- **Density:** cards are dense but not cramped — roughly 220px tall with 24–28px padding.
- **Small screens:** no horizontal page scroll at 375px; touch targets at least 44px.

---

## 6. Borders, corners, elevation

- **Square corners everywhere.** `border-radius: 0`. No pills, no rounded cards.
- **1px solid `--rule`** on every card, figure, and input.
- Modals and focus states upgrade to `--rule-strong`.
- **Rules between grid cards** use the gap technique rather than per-card borders:

```css
.grid { display: grid; gap: 1px; background: var(--rule); border: 1px solid var(--rule); }
.grid > .card { background: var(--bg-raised); }
```

- **No drop shadows on cards.** Elevation is expressed through background color. The only shadow in the system is on modals: `0 24px 64px rgba(0,0,0,.6)`.
- **No gradients, no textures, no images behind text.** Solid `--bg` everywhere.

---

## 7. Components

### Section label (the § pattern)
Reserved for long documents where sections are cited by number (handouts, study guides). Not used to open web-page sections by default, and subject to the label rule in §2. Retired on the web: "Shared resource" labels, "Studio I · Ear"–style prefixes, "Unit" beside a two-digit numeral, and § numerals on homepage sections. A single flex row (`align-items: baseline; gap: 18px`):

```
§ III  ·  LIGHT & SHADOW  ─────────────────  c. 1600–1700
```

`§` and numeral in mono; label in tracked uppercase; a 1px `--rule` line (`flex: 1; height: 1px`) fills the remaining width; optional subtitle at the end.

### Topbar
About 57px tall, padding `22px var(--gutter) 18px`, 1px bottom rule, background `--bg`. Italic Cormorant wordmark on the left; IBM Plex Sans 14px uppercase nav (0.06em) on the right, gap 24px, links in `--ink-mute`, current page in `--ink`.
- **Sticky above 640px** (`top: 0; z-index: 40`); secondary sticky bars (period nav, tabs) sit at `top: 57px`. At 640px and below the topbar scrolls with the page and the navigation wraps to two rows.
- **Navigation order:** Units · Timeline · People · Compare · Guides.
- **Units menu:** opens a menu of the six units. On a subject page it opens the same subject in another unit; elsewhere it opens unit overviews.

### Codex card (homepage period card)
- Background `--bg-raised`, 1px `--rule` border, padding 24px.
- **3px left swatch** in the period accent.
- Two-column grid (64px + 1fr): a large display numeral on the left (Cormorant ~64px, light weight, accent color — original accent only where it measures 3:1 on `--bg-raised`, otherwise the text variant).
- Right column: mono date eyebrow ("c. 1600–1700"), period name as Cormorant 24px heading, then a hairline-topped footer with the core text in italic and the author in small uppercase UI sans.

### Comparison card (compare page)
- Background `--bg-raised`, 1px `--rule` border, **4px left swatch** in the period accent.
- Optional 4:3 image on top over `--bg-sunken`.
- Header row: accent numeral (~34px Cormorant, text variant) + period name (17px) + mono dates (11px).
- Short body description in `--ink-mute`, optional work credit and link.

### Buttons and tabs
- **Domain tabs:** IBM Plex Sans 13px / 500, uppercase, 0.08em, padding 6px 18px. Resting: no background, transparent border, `--ink-soft`. Selected: `--bg-raised` fill, 1px `--rule-strong` border, `--ink`.
- **Thread buttons:** IBM Plex Sans 14px, sentence case, padding 8px 18px, 1px `--rule` border, `--ink-soft`. Selected: `--bg-raised`, `--rule-strong`, `--ink`.
- **Listen button:** IBM Plex Mono 12px, 0.1em, padding 5px 12px, 1px `--rule-strong`, text in the accent's text variant, label "▶ Listen" / "■ Stop".
- Hover fill: `color-mix(in oklab, ACCENT 10%, transparent)`.

### Inputs
IBM Plex Sans 14px, padding 10px 14px, background `--bg-sunken`, 1px `--rule` border, `--ink` text, no outline. Focus: border becomes `--rule-strong`.

### Pull quote
```css
.pull-quote {
  border-left: 3px solid var(--thread-acc, var(--acc));
  background: color-mix(in oklab, var(--thread-acc, var(--acc)) 6%, var(--bg));
  padding: 0.9rem 1.25rem 0.9rem 1.1rem;
  margin: 2rem 0;
}
.pull-quote-text { color: var(--ink-mute); font-style: italic; line-height: 1.6; font-size: 1.05em; }
.pull-quote-cite { display: block; text-align: right; font-size: 0.8em; font-style: normal; color: var(--ink-soft); margin-top: 0.6rem; }
```

### Focus
A global `:focus-visible` style on every interactive element: a solid `--ink` outline with an offset, at 3:1 or better on all three surfaces. Press/active states remain unstyled.

### Thread sigil box
For thread rows only. 44×44 box, 1px border in the domain color, 10% domain-color tint on `--bg`, containing a 28×28 line icon in the same domain color. The row's stripe, icon, box tint, and title all share one domain color.

### Image plate (museum mat)
Artwork sits inside a figure with 8px padding on `--bg-sunken` and a 1px `--rule` border. `object-fit: contain` for hero plates, `cover` for thumbnails. Full-bleed art is reserved for period pages, never the home or index pages.

---

## 8. Iconography

- **Line drawings only:** 40×40 viewBox, 1–1.25px stroke, square caps, `currentColor`, no fills except small accent dots (`circle r="1–2"`).
- **No generic icon libraries** (no Lucide, Heroicons, Material). Every icon is hand-drawn in this vocabulary.
- **No emoji. Ever.**

**Page sigils** (six, one per resource). A page shows its sigil once, in the page header, at modest size and unboxed. A sigil is not repeated in a box when a selected tab already shows it.
- Timeline — five tick marks on a horizontal axis
- People — head and shoulder arc
- Compare — three interwoven curves
- Painting — square rotated 45° with a centered dot
- Music — fermata arc over a dot, with a baseline
- Sculpture — axonometric cube

**Thread icons:** twelve, one per thread (three per domain), tinted by the domain color.

---

## 9. Imagery

- Old master paintings and period portraits. Warm, not color-graded.
- No AI-generated illustrations, no stock photography.
- Always mounted on `--bg-sunken` with a 1px `--rule` mat.

---

## 10. Motion

- Transitions 150–200ms, easing `cubic-bezier(.2,.6,.2,1)`.
- Image hover-zoom inside cards: scale 1.02 over 400ms.
- Hover changes background color only — no transforms, no lifts.
- Press/active states are unstyled; keyboard focus uses the `:focus-visible` outline (§7).
- Modals fade in; backdrop `rgba(0,0,0,0.72)` with `backdrop-filter: blur(4px)`.
- No bounces, wobbles, parallax, or scroll-triggered reveals.

---

## 11. Quick checklist

1. Square corners — `border-radius: 0`.
2. Cream, not white — `#F4EDDF`.
3. Warm brown ink, not black — `#1B1714`.
4. Mixed type — Cormorant Garamond display, EB Garamond body, IBM Plex Mono labels, IBM Plex Sans UI.
5. Add a label only when it states something the page doesn't already; when in doubt, cut.
6. Reach for a 1px rule before reaching for a card.
7. One period accent per page, not a rainbow.
8. Never let color carry meaning alone — pair it with unit number, name, and dates.
9. Italicize titles of works.
10. No emoji, no exclamation points, no gradients, no shadows on cards.
11. Accent-colored text uses the `-text` variant; domain-colored text uses the mid or dark step.
12. Headings upright — italic only for titles of works.

---

## 12. Copy-paste token block

```css
:root {
  --bg:#F4EDDF; --bg-raised:#EBE2D0; --bg-sunken:#FAF4E6;
  --ink:#1B1714; --ink-mute:#4A4138; --ink-soft:#6A6053;
  --rule:#C9BDA5; --rule-strong:#A89978;
  --acc:#C9A24B;
  --acc-medieval:#C9A24B; --acc-renaissance:#B54C3A; --acc-baroque:#B07028;
  --acc-enlightenment:#698BA1; --acc-romanticism:#3D5A6D; --acc-modernism:#A03828;
  --acc-text:#815D00;
  --acc-medieval-text:#815D00; --acc-renaissance-text:#A94130; --acc-baroque-text:#935500;
  --acc-enlightenment-text:#47687D; --acc-romanticism-text:#3D5A6D; --acc-modernism-text:#A03828;
  --dom-philosophy:#3A332C; --dom-painting:#75435B; --dom-sculpture:#4F6B4D; --dom-music:#574878;
  --font-display:'Cormorant Garamond', 'Spectral', Georgia, serif;
  --font-text:'EB Garamond', 'Spectral', Georgia, serif;
  --font-ui:'IBM Plex Sans', system-ui, sans-serif;
  --font-mono:'IBM Plex Mono', ui-monospace, monospace;
  --t-h1:clamp(40px,6vw,80px); --t-h2:26px; --t-h3:22px; --t-h4:20px;
  --t-body:18px; --t-body-sm:15.5px; --t-ui:14px; --t-ui-sm:13px; --t-mono:12px;
  --gutter:clamp(20px,4vw,64px); --col:min(860px,100%); --col-wide:1100px;
  --radius:0;
}
```

```html
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">
```

---

## 13. Open items (not yet decided)

- **Subject tabs.** §7 specifies domain tabs as IBM Plex Sans 13px uppercase with a bordered, raised selected state; §3.6 assigns the period accent to a "tab underline"; the live site uses Cormorant tabs with a sigil and an accent underline. Until a decision is made, the live tabs stand.
- **Body text.** No change to the spec (EB Garamond 18px, line-height 1.65, `--ink-mute`). The live site currently renders body text in Cormorant Garamond 21px and is being brought into conformance.
