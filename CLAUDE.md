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
- **Cloudflare Workers** — static deployment via Wrangler

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

## Key Directory Structure

```
src/
  content/
    units/
      00-medieval/       philosophy.mdx, art.mdx, music.mdx
      01-renaissance/    philosophy.mdx, art.mdx, music.mdx
      02-baroque/        ...
      03-enlightenment/  ...
      04-romanticism/    ...
      05-modernism/      ...
  content.config.ts      — Zod schema for all content collections
  data/
    hub-introductions.ts — epigraphs, intro paragraphs, historicalMomentTitle per unit
    historical-moments.ts — full essay text for the Historical Moment modal (6 units)
    timeline-events.ts  — HUB_EVENTS (5 curated events per unit for hub strip)
                          and full TimelineEvent[] for the /timeline page
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
    ThreadIcon.astro     — SVG pictograms for the 9 analytical threads
    PullQuote.astro      — styled blockquote component
    YouTubeEmbed.astro   — embedded YouTube player
  layouts/
    Layout.astro         — site shell: nav, bio modal (vanilla JS), fonts
public/
  images/
    paintings/           — painting images organized by unit (00-medieval/, etc.)
    portraits/           — 120×120px portrait JPEGs, named portrait-[lastname-firstname].jpg
```

---

## Accent Colors (Per Unit)

These are used consistently across hub pages, domain pages, timeline, and home page cards:

| Unit | Color |
|------|-------|
| 00-medieval | `#5b82c8` (blue) |
| 01-renaissance | `#e8a820` (gold) |
| 02-baroque | `#dc5f6c` (rose-red) |
| 03-enlightenment | `#48a0e0` (sky blue) |
| 04-romanticism | `#b978d2` (purple) |
| 05-modernism | `#3aa87a` (green) |

---

## Content Schema (content.config.ts)

All `.mdx` files under `src/content/units/` share one collection schema. Key fields:

- `unit`, `period`, `dates`, `domain` (enum: philosophy/art/music) — always present
- `core_text`, `author` — null for Medieval
- `note` — optional string shown when no core_text (Medieval uses "Foundation unit")
- `threads[]` — array of `{id, label, period_summary}`
- Philosophy: `readings[]`
- Art: `hero_painting{}`, `gallery_paintings[]`
- Music: `featured_listening` (object or array), `gallery_listening[]`

**Important:** Always commit `src/content.config.ts` alongside any schema changes.

---

## BioLink System

Inline biographical links work via two layers:

1. **`BioLink.astro`** — renders `<button class="bio-link-btn" data-bio-id="{id}">` in MDX content
2. **`Layout.astro`** — global vanilla JS listener catches clicks on `.bio-link-btn`, finds the person in `PEOPLE` (imported from BiographyPanel.jsx and passed as JSON via `define:vars`), and populates a modal with name/dates/bio/significance/portrait

The **`/people` page** uses a self-contained React island (`BiographyDemo`) from `BiographyPanel.jsx` with its own modal. These are separate implementations — the Layout modal handles inline BioLinks site-wide; the React island is only on `/people`.

**PEOPLE data** lives entirely in `BiographyPanel.jsx`. Each entry:
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
- 54 portraits currently in place (48 downloaded from Wikimedia Commons + 6 provided by Tim)
- Entries with no portrait: Adelard of Bath, Aemilia Lanyer, and various secondary figures (Duccio, Martini, Perotinus, etc.)

---

## Hub Page Architecture

Each hub (`/units/[unit]/`) is generated by `[unit]/index.astro`. Layout order per spec:

1. Period heading block (unit label + h1 in era accent + dates + Core Text badge)
2. Epigraphs (from `hub-introductions.ts`)
3. Introduction paragraph (from `hub-introductions.ts`)
4. Domain navigation cards (3-column grid → philosophy/art/music)
5. Historical Moment band (amber-tinted button → opens modal)
6. Timeline strip (5 curated events from `HUB_EVENTS`)

The Historical Moment modal gets content from `historical-moments.ts` passed via `define:vars`. Paragraphs use `*asterisks*` for italics, converted by `mdItalics()` regex.

---

## Domain Page Architecture

Each domain page (`/units/[unit]/[domain]`) is `[domain].astro`. Features:

- Sticky tab bar: Philosophy · Painting · Music (3 tabs only — Science and Sculpture removed)
- Core Text badge in header
- MDX body content rendered with `<Content components={{ BioLink, PullQuote }} />`
- Sidebar: readings list (philosophy) / gallery paintings (art) / gallery listening (music)
- Prev/next navigation links to same domain on adjacent units

---

## Analytical Threads (9 total)

Used across all domain pages as `ThreadIcon` pictograms:

**Philosophy:** `knowledge` · `authority` · `self`
**Art:** `figure-space` · `light-shadow` · `brushwork-surface`
**Music:** `melody-harmony` · `rhythm-time` · `texture-form`

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

## Current Status (March 2026)

**Completed:**
- Full site build: home, 6 hub pages, 18 domain pages, timeline, people index, compare, art/music overviews
- Hub page redesign with era accent colors, Historical Moment modal, timeline strip
- Portrait system: 54 images downloaded/cropped, BiographyPanel updated with portrait field
- BioLink system wired up site-wide via Layout.astro
- Site Audit (March 2026) — all Priority 1 and Priority 2 items implemented

**Pending / future work:**
- Editorial pass content (the `0X_*.md` files in root) not yet merged into `.mdx` files
- Science sub-domain was scrapped; Sculpture is a future Phase 4c addition
- Modernism painting images (Picasso, Kandinsky, Matisse) may need copyright review before public launch
- Medieval: Aristotelian physics reading removed from frontmatter; replacement reading TBD
