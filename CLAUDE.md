# CLAUDE.md — AP Literature Site

Context file for Claude Code. Read this at the start of any new session.

---

## What This Is

An AP Literature companion site built for a high school class. Six historical units — Medieval, Renaissance, Baroque, Enlightenment, Romanticism, Modernism — each with three domain sub-pages (Philosophy, Painting, Music). Each unit is organized around an anchor literary text (*Hamlet*, *Paradise Lost*, *Pride and Prejudice*, *Moby-Dick*, *Invisible Man*; Medieval has no anchor text — it's a foundation unit).

The site is content-rich and pedagogically serious. Prose quality matters. Don't oversimplify or dumb down copy.

**Live site:** https://ap-lit-site.tmurphy-ef9.workers.dev

---

## Tech Stack

- **Astro v6** — static site generator, Content Layer API, `.mdx` for domain pages
- **Tailwind CSS** — utility classes throughout
- **React** — used only for `BiographyPanel.jsx` (the biographical index and inline bio popups)
- **Cloudflare Workers** (not Pages) — static output with the Cloudflare adapter, deployed via Wrangler (assets binding `./dist`, KV `SESSION`)

**Deploy command:**
```bash
npm run deploy
```
(Runs from the **main repo root** `/Users/timothymurphy/ap-lit-site` — see Deploy Protocol below.)

**Dev server:** `npm run dev` (runs on localhost:4321, or next available port)

---

## Deploy Protocol — READ BEFORE EVERY DEPLOY

Work on this site almost always happens inside a **git worktree** (a branch at a path like `.claude/worktrees/<name>`). The deploy command builds from whichever branch the **main repo** is checked out to — not from the worktree. Deploying without merging first silently deploys the old main-branch code and wipes all session work from the live site.

**Every deploy must follow these three steps in order:**

1. **Commit** all changes in the worktree (already on `claude/<name>` branch).
2. **Merge** the worktree branch into `main` from the main repo:
   ```bash
   git -C /Users/timothymurphy/ap-lit-site merge claude/<branch-name> --no-edit
   ```
3. **Deploy** from the main repo root:
   ```bash
   cd /Users/timothymurphy/ap-lit-site && npm run deploy
   ```

Never run `npm run deploy` from inside a worktree directory — the build will use the wrong source files. Always verify `git -C /Users/timothymurphy/ap-lit-site branch --show-current` returns `main` before deploying.

---

## Preview Workflow

Production deploys always go through the Deploy Protocol above. To review a branch first, upload a **Worker version** (no production traffic):

```bash
npm run preview:remote -- <alias>     # builds, then wrangler versions upload --preview-alias <alias>
```

The result prints a Version Preview URL (`https://<alias>-ap-lit-site.tmurphy-ef9.workers.dev`, or `https://<version-id8>-ap-lit-site...` without an alias). `preview_urls` is set to `true` explicitly in `wrangler.jsonc`. Version URLs run against **production bindings**, so a page view must never write to the `SESSION` KV. Release aliases used so far: `nav`, `design`, `anchors`. Never merge to `main` or deploy on the strength of a preview alone; Tim approves each release first.

---

## Style Authority

The design system is the style authority: `AP Literature Design System - Reference.md` (from Claude Design), as amended by `AP_Lit_Design_System_Amendments.md`. Where the live site and the spec differ, the spec wins unless a brief says otherwise. Key rules: domains (Philosophy, Painting, Sculpture, Music) each have three threads; a label appears only when it adds information the page does not already state; unit numerals 00-05 stay, other numbering only for real sequence; text colored by a period accent uses its text-safe variant.

---

## Other Site Sections and Routes

- **`summer-reading/*`** (22 built pages: Pachinko and *Things Fall Apart* "Living Atlas" spokes, cultural-message pages) is a separate section with its own layouts (`SummerLayout.astro`, `ScrollyLayout.astro`), content collection (`src/content/summer-reading`) and tokens (`src/styles/tokens.css` and the `pachinko-*`/`tfa-*` CSS). Do not touch it when working on the AP-site header, tokens or labels.
- **`/art` and `/music`** are meta-refresh redirect stubs to `/seeing-through-paint` and `/hearing-through-form` (static output, not HTTP 301s).
- The AP site is 47 pages: home, 6 overviews, 24 subject pages, 3 surveys, Timeline/People/Compare/Credits, Guides index, 3 studio pages, the Comparison Lab and 4 period-guide pages. Reports are in `docs/reports/`.

---

## Key Directory Structure

```
src/
  content/
    units/
      00-medieval/       philosophy.mdx, art.mdx, sculpture.mdx, music.mdx
      01-renaissance/    philosophy.mdx, art.mdx, sculpture.mdx, music.mdx
      02-baroque/        ...
      03-enlightenment/  ...
      04-romanticism/    ...
      05-modernism/      ...
  content.config.ts      — Zod schema for all content collections
  data/
    hub-introductions.ts — epigraphs, intro paragraphs, historicalMomentTitle per unit
    historical-moments.ts — full essay text for the Historical Moment modal (6 units)
    timeline-events.ts  — HUB_EVENTS only: 5 curated events per unit, used
                          by hub page timeline strips
    timeline-entries.ts — ENTRIES: the richer dataset (unit, type:
                          POL/phil/paint/sculp/music, AP anchor-text
                          variant) that powers the full /timeline page
  pages/
    index.astro          — home page (unit card grid)
    people.astro         — biographical index (mounts BiographyDemo React island)
    timeline.astro       — full cross-era timeline
    compare.astro        — cross-era thread comparison
    seeing-through-paint.astro — cross-era art overview
    hearing-through-form.astro — cross-era music overview
    art.astro            — 301 redirect → /seeing-through-paint
    music.astro          — 301 redirect → /hearing-through-form
    units/
      [unit]/
        index.astro      — hub page (hub landing for each unit)
        [domain].astro   — philosophy / art / music domain pages
  components/
    BiographyPanel.jsx   — PEOPLE data array + BiographyPanel modal + BioLink button + PersonCard + BiographyDemo
    BioLink.astro        — inline text link component (renders data-bio-id button)
    ThreadIcon.astro     — SVG pictograms for the 12 analytical threads
    PullQuote.astro      — styled blockquote component
    YouTubeEmbed.astro   — embedded YouTube player; also renders the expandable analysis panel when `analysis` is passed
    Plate.astro          — inline image plate (Painting/Sculpture); also renders the expandable analysis panel when `analysis` is passed
    MusicPlate.astro     — unused inline music card (Music pages use YouTubeEmbed instead)
    PeriodMotif.astro    — thin wrapper rendering a pre-built SVG string from `src/data/period-motifs.ts`
  layouts/
    Layout.astro         — site shell: nav, bio modal (vanilla JS), fonts
public/
  images/
    paintings/           — painting images organized by unit (00-medieval/, etc.)
    sculptures/          — sculpture images organized by unit (00-medieval/, etc.)
    portraits/           — 120×120px portrait JPEGs, named portrait-[lastname-firstname].jpg
```

---

## Accent Colors (Per Unit)

Used consistently across domain pages (`ACCENTS` map in `[domain].astro`) and their decorative motifs (`MARK_VARS`). Hub pages, timeline, and home page cards may still reference an older palette — verify against the live page before assuming a value below applies everywhere.

| Unit | Color |
|------|-------|
| 00-medieval | `#C9A24B` (gold) |
| 01-renaissance | `#B54C3A` (oxblood/rust-red) |
| 02-baroque | `#B07028` (burnt copper) |
| 03-enlightenment | `#698BA1` (Wedgwood blue) |
| 04-romanticism | `#3D5A6D` (storm indigo) |
| 05-modernism | `#A03828` (cadmium red) |

---

## Content Schema (content.config.ts)

All `.mdx` files under `src/content/units/` share one collection schema. Key fields:

- `unit`, `period`, `dates`, `domain` (enum: philosophy/art/sculpture/music) — always present
- `core_text`, `author` — null for Medieval (though inconsistently — some Medieval domain files still set a borrowed anchor text; check the specific file rather than assuming null)
- `note` — optional string shown when no core_text (Medieval uses "Foundation unit")
- `threads[]` — array of `{id, label, period_summary}`
- Philosophy: `readings[]`
- Art: `hero_painting{}`, `gallery_paintings[]`
- Sculpture: `hero_sculpture{}`, `gallery_sculptures[]`
- Music: `featured_listening` (object or array), `gallery_listening[]`
- Art/Sculpture/Music hero and gallery items also accept optional `analysis` / `analysisEyebrow` / `analysisPrompt` string fields, rendered as an expandable "Read the analysis" panel — currently empty on most entries pending an editorial pass (see `Analysis_Panel_Content_Review.md`).

**Important:** Always commit `src/content.config.ts` alongside any schema changes.

---

## BioLink System

Inline biographical links work via two layers:

1. **`BioLink.astro`** — renders `<button class="bio-link-btn" data-bio-id="{id}">` in MDX content
2. **`Layout.astro`** — global vanilla JS listener catches clicks on `.bio-link-btn`, finds the person in `PEOPLE` (imported from BiographyPanel.jsx and passed as JSON via `define:vars`), and populates a modal with name/dates/bio/significance/portrait

The **`/people` page** uses a self-contained React island (`BiographyDemo`) from `BiographyPanel.jsx` with its own modal. These are separate implementations — the Layout modal handles inline BioLinks site-wide; the React island is only on `/people`.

**PEOPLE data** lives entirely in `BiographyPanel.jsx` (150 entries, each with a unique `id`). Each entry:
```js
{
  id: "pascal",
  name: "Blaise Pascal",
  dates: "1623–1662",
  field: "Mathematician & Philosopher",
  units: ["02-baroque"],
  bio: "...",
  significance: "...",
  portrait: "/images/portraits/portrait-pascal-blaise.jpg",  // optional
}
```

Portrait field is optional — entries without it show a monogram avatar (initials) in the era accent color on the People page, and text-only in the modal.

---

## Portrait Images

- Location: `/public/images/portraits/`
- Naming: `portrait-[lastname-firstname].jpg` (all lowercase, hyphenated)
- Size: 120×120px JPEG, cropped upper-center (face-focused)
- 94 portraits currently in place (94 `portrait:` entries in `BiographyPanel.jsx`; originally 48 from Wikimedia Commons + 6 provided by Tim)
- Entries with no portrait: Adelard of Bath, Aemilia Lanyer, and various secondary figures (Duccio, Martini, Perotinus, etc.)

---

## Hub Page Architecture

Each hub (`/units/[unit]/`) is generated by `[unit]/index.astro`. Layout order per spec:

1. Period heading block (unit label + h1 in era accent + dates + Core Text badge)
2. Epigraphs (from `hub-introductions.ts`)
3. Introduction paragraph (from `hub-introductions.ts`)
4. Domain navigation cards (3-column grid → philosophy/art/music)
5. Historical Moment band (amber-tinted button → opens modal)
6. Timeline strip (curated events from `HUB_EVENTS` — 5 for most units, chunked into rows of up to 5 if a unit has more; Modernism has 10, in two rows)

The Historical Moment modal gets content from `historical-moments.ts` passed via `define:vars`. Paragraphs use `*asterisks*` for italics, converted by `mdItalics()` regex (which also supports `[link text](href)` for the optional `xref` block). A `HistoricalMoment` entry may optionally include a `figure` (with an optional `keyItems` string array rendered as a labeled strip under the caption), a `sysmap`, and/or an `xref` (a cross-reference block linking to another page, e.g. Modernism's hub links into its own philosophy page) — each carries its own `afterParagraph` insertion index.

---

## Domain Page Architecture

Each domain page (`/units/[unit]/[domain]`) is `[domain].astro` — one shared template for all four domains (`philosophy`, `art`, `sculpture`, `music`), branching on `domain`.

- Sticky tab bar: Philosophy · Painting · Sculpture · Music (4 tabs)
- Core Text badge in header
- MDX body content rendered with `<Content components={{ BioLink, PullQuote, Plate, MusicPlate, YouTubeEmbed }} />`
- **Philosophy** (all six units, via `PLATE_REDESIGNED_PHILOSOPHY_UNITS` in `[domain].astro`) and **Painting / Sculpture / Music** use a single-column reading layout (no sidebar): hero image/plate/embed with an expandable "Read the analysis" panel (Painting/Sculpture/Music) or a `hero_plate` frontmatter block (Philosophy: `image`, `alt`, `gloss` = the italic caption; `keyItems` is no longer used), a thread jump-nav, then three thread `<section>`s each with inline work-plate(s) and a collapsible "Connection to *[Text]*" panel. The old two-column sidebar layout still exists in the template for non-listed units but no unit uses it.
- Philosophy's single-column layout supports hand-authored raw HTML/CSS classes in the MDX body (not schema-driven): `plate-pair`/`plate-inset` (image beside prose), `plate-heads` (labeled strip above an image), `plate-stages` (numbered stage strip), `plate-key`/`plate-qual` caption annotations, `doc-pair` (two equal-height side-by-side boxes: matched figures, or figure + document card), `doc-card`/`doc-seq` (typeset document cards, used for Enlightenment's rights and Calas exhibits), and the Baroque `argument-diagram`/`argument-exercise` components (use `div role="heading"` for their titles: a real `<h3>` is wrapped into a collapsible Connection panel by the page script). Fonts: Cormorant Garamond (`--font-display`, headings/hero/pull-quotes only) + EB Garamond (`--font-text`, body prose).
- Prev/next navigation links to same domain on adjacent units

---

## Figure Conventions (Philosophy pages and hub essays)

- **Captions only.** Each figure shows one italic caption (`.caption .title`) and nothing below it: no `plate-key` lists, `plate-qual` notes, or reading questions (Tim removed these everywhere; a few figures keep a heading strip *above* the image). Exceptions Tim has kept: document-card text on Enlightenment, and the Medieval optics "Why is the image upside down?" disclosure.
- **Enlargement.** Every `.work-figure .img` and the hero open a keyboard-accessible lightbox (Enter to open, Escape to close, focus returns). The lightbox caption is the figure's caption; if a figure has `plate-heads`, `plate-key`, or `plate-note` text and carries `data-lightbox-key`, that text is appended.
- **Image files** are versioned by suffix (`-v2`, `-v3`, `-painted-v2`, etc.), never overwritten; the old file is `git rm`'d when a figure is replaced. Alt text lives only at the `<img>`/frontmatter/data entry and must be updated with the image.
- **Typography in new prose:** write straight quotes and apostrophes in source; smart punctuation is applied automatically (MDX rehype plugin `src/lib/smart-punct.mjs`, content-schema transform, and the build-time pass `plugins/smart-punct-build.mjs`), so don't hand-type curly `’“”`. No wrapping quotation marks inside `<PullQuote>`.
- **Titles of works** follow Writing_and_Editing_Guide.md Rule 42 (format titles of works by how they were published, not by their length). A work published as its own volume takes italics, however short. A work published inside something larger (a journal, a collection, a longer work) takes quotation marks.
  - **Italics:** standalone volumes (*Nature*, *Existentialism Is a Humanism*); book-length works, even if first serialized (*Notes from Underground*, *Letters on the Aesthetic Education of Man*); periodicals (*Rheinische Zeitung*); ships (the *Pequod*); paintings and sculptures (*Wilton Diptych*).
  - **Quotation marks:** essays, poems, stories, and lectures published within a journal or collection ("An Answer to the Question: What Is Enlightenment?", "A Defence of Poetry", "Benito Cereno").
  - **Shortened titles** keep the full title's formatting: the *Summa*, the *Demoiselles*, the *Ring* cycle.
  - **Roman, no marks:** documents (Magna Carta, the Ninety-Five Theses).
  - Music follows genre rather than publication. **Italics:** operas, oratorios, masses, named symphonies, suites, ballets, motets, and organa (*L'Orfeo*, *Spem in Alium*, *Symphonie fantastique*, *Scheherazade*). **Quotation marks:** songs, hymns, chants, madrigals, jazz tunes, short instrumental pieces, and excerpts from larger works ("Erlkönig", "Für Elise", "St. Louis Blues"; *Messiah*: "Hallelujah Chorus"). **Roman, no marks:** numbered or generic titles (Symphony No. 40, Toccata and Fugue in D Minor). A nickname goes in parentheses and quotation marks: Symphony No. 94 ("Surprise").
  - Use double quotation marks, with commas and periods inside.
  - Site markup: mark italics with `*Title*` in data/frontmatter strings (pull-quote attributions, hub epigraphs, timeline, BioLinks, music card titles and reading-list titles all render it); music card titles are roman by default, so an excerpt is written `*The Rite of Spring*: "Augurs of Spring"`. Use mixed-case italic inside uppercase label lines.
- **Sizes:** insets sit beside prose at about 450px; standalone plates use `max-width` 560-780px, full width on phones.
- **Hub essay modal** (`[unit]/index.astro`): content comes from `historical-moments.ts`; a moment can have `figure`, `extraFigures[]` (Modernism's migration painting), `sysmap` (Romanticism's cotton system sits directly under its figure), and `xref`, each with its own `afterParagraph`. The modal moves focus to its close button, traps Tab, and restores focus to the trigger on close.

---

## Analytical Threads (12 total)

Used across all domain pages as `ThreadIcon` pictograms:

**Philosophy:** `knowledge` · `authority` · `self`
**Art:** `figure-space` · `light-shadow` · `brushwork-surface`
**Sculpture:** `body-volume` · `material-making` · `space-setting`
**Music:** `texture-voices` · `consonance-dissonance` · `structure-freedom`

---

## Planning Documents in Root Folder

These exist in the project root — read them when relevant:

| File | Purpose |
|------|---------|
| `AP_Lit_Site_Project_Brief.md` | Overall project goals and scope |
| `Phase_4_Planning.md` | Hub restructure and domain page decisions |
| `Hub_Page_Redesign_Spec.md` | Authoritative hub layout spec |
| `Editorial_Rules.md` | 8 content editing rules with word-count targets |
| `Phase_4a_Status_Tracker.md` | Task completion tracker (some items now outdated) |
| `Portrait_Research_Candidates.md` | Portrait source list and naming conventions |
| `Site_Audit_March_2026.md` | Design audit — all Priority 1 items now implemented |
| `Pull_Quote_Selections.md` | 18 approved pull quotes (3 per unit) |
| `Historical_Moment_Final.md` | Source text for Historical Moment essays |
| `Hub_Page_Introductions_Final.md` | Source text for hub intro paragraphs and epigraphs |

The `0X_*.md` and `X_*.md` files in root are editorial pass outputs (revised content) — Tim's edited versions of the domain page content, not yet fully integrated into the `.mdx` files.

---

## Self-QA with Playwright

When implementing hub pages, domain navigation, pop-up components, or any structural UI changes, use the Playwright MCP server to verify the implementation against the running local site. This includes:

- Confirming navigation flows work as a student would experience them
- Testing modal/pop-up open and close behavior
- Checking responsive layouts at 375px, 768px, and 1440px viewports

Playwright is for exploratory self-QA during implementation — not for generating automated test suites.

---

## Current Status (October 2026)

**Completed:**
- Full site build: home, 6 hub pages, 24 domain pages (Philosophy/Painting/Sculpture/Music × 6 units), timeline, people index, compare, art/music/sculpture overviews
- Hub page redesign with era accent colors, Historical Moment modal, timeline strip
- Sculpture sub-domain (Phase 4c) fully shipped: content, thread icons, hub Visual Art split card, Sculpting Through Time shared resource
- Portrait system: 94 images downloaded/cropped, BiographyPanel updated with portrait field
- BioLink system wired up site-wide via Layout.astro
- Site Audit (March 2026) — all Priority 1 and Priority 2 items implemented
- Painting/Sculpture/Music domain pages redesigned to a single-column reading layout with inline work-plates, expandable analysis panels, and a thread jump-nav; Cormorant Garamond + EB Garamond replace Spectral on these pages
- All six Philosophy pages on the single-column plate layout, with new illustrated figures in varied period idioms (Oct 2026 handoffs: Medieval, Renaissance, Baroque, Enlightenment, Romanticism, Modernism), the Modernism prose revisions (Gödel removed from the philosophy prose; his timeline and people entries intentionally kept), and the Enlightenment document/paired exhibits

**Pending / future work:**
- Editorial pass content (the `0X_*.md` files in root) not yet merged into `.mdx` files
- Analysis-panel text for the new expandable panels is drafted in `Analysis_Panel_Content_Review.md`, pending Tim's review before it's ported into `content.config.ts` frontmatter
- Modernism painting images (Picasso, Kandinsky, Matisse) may need copyright review before public launch
- The generated illustrations in the Oct 2026 handoffs are contemporary interpretive art, not historical works; consider whether any provenance note is wanted before public launch
- Medieval: Aristotelian physics reading removed from frontmatter; replacement reading TBD
