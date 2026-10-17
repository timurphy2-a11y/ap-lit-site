# Site State Report, 2026-10-17

Read-only audit of `/Users/timothymurphy/ap-lit-site` (branch `main`, HEAD `62a15a7`, the image-corrections commit, deployed Oct 17). The only things written are this report and `export/project-sync/`. Nothing was committed, changed or deployed.

**Brief gap:** `navigation-demo.html` is not in `~/Downloads` or the handoff. It is only needed for Part 2.

## Headline findings

1. **There are three header implementations, not one.** `Layout.astro` serves 17 pages. `units/[unit]/index.astro` and `units/[unit]/[domain].astro` each carry a hand-copied inline header (30 pages). Part 2 has to unify all three.
2. **The site is bigger than the brief assumes.** The build has 75 HTML files. 47 are the AP site (matches the external review). The other 28 are 22 `summer-reading/*` pages (Pachinko and Things Fall Apart, with their own layouts), 2 redirect stubs and 4 loose mockup HTML files from `public/`.
3. **Subject pages carry two sets of section IDs at once.** Both `#figure--space` (the heading, from rehype slugger) and `#figure-space` (the wrapper, set by client JS) exist on every art, sculpture and music page. The static HTML has only the double-hyphen versions, so the jump-nav links are dead without JavaScript (72 links).
4. **Phone overflow is narrower than reported.** Only the Timeline and People pages overflow the document. The header "overflow" is its own horizontal scroll inside `.topbar` on the 17 Layout pages. Unit and subject pages already wrap.
5. **prose-audit silently audits nothing in `src/content/units`** unless given the six unit folders individually, and its calibration warning fires. See §1.11.

## 1.1 Repo and deployment

- Astro `^6.0.4` (static output with the `@astrojs/cloudflare` adapter `^13.3`), `@astrojs/mdx ^5`, `@astrojs/react ^5`, React `^19.2`, Tailwind `^4.2` via `@tailwindcss/vite` plus `@tailwindcss/typography`, Wrangler `^4.87`. Node >= 22.12.
- Build: `npm run build` (`astro build`, then a `postbuild` script that patches the KV id into `dist/server/wrangler.json`). Deploy: `npm run deploy` (build, then `wrangler deploy`).
- Target: Cloudflare **Workers** (assets binding `./dist`, KV `SESSION`), not Pages. The live URL is `ap-lit-site.tmurphy-ef9.workers.dev`.
- **Previews:** `wrangler.jsonc` has no preview environment. `wrangler versions upload` (a Workers preview URL) has not been set up or tried. `netlify.toml` still sits in the root. There is no branch-to-environment mapping, so a deploy is production. **Ask Tim how to preview Part 2 before it is built.**
- Branches: `origin/main` plus stale `claude/*`, `cloudflare/workers-autoconfig`, `rescue/local-main-606b9aa` and `worktree-modernism-sculpture-cut`. `.claude/launch.json` lists about 25 dev-server entries pointing at worktrees. `.claude/worktrees/` is empty.
- Content loading:
  - Collection `units` (`src/content.config.ts`) holds 24 `.mdx` files at `src/content/units/{unit}/{philosophy|art|sculpture|music}.mdx`. Frontmatter carries threads, heroes and galleries.
  - Hub intros are in `src/data/hub-introductions.ts`; historical-moment essays in `src/data/historical-moments.ts`; hub timeline strips in `src/data/timeline-events.ts`; the full timeline in `src/data/timeline-entries.ts`; period motifs in `src/data/period-motifs.ts`.
  - People data lives in the component `src/components/BiographyPanel.jsx` (**150 entries**, 94 with portraits).
  - `compare.astro`, the studios, the survey pages and the guides hard-code their content in the page files (the three survey pages are `seeing-through-paint.astro`, `sculpting-through-time.astro` and `hearing-through-form.astro`).
  - The `summer-reading` collection is separate.

## 1.2 Route inventory

Built HTML files: **75**. Reachable AP-site pages: **47**, which matches the earlier external count.

| Type | Count | Routes |
|---|---:|---|
| Home | 1 | `/` |
| Unit overview | 6 | `/units/{unit}/` |
| Subject pages | 24 | `/units/{unit}/{philosophy,art,sculpture,music}/` (the painting slug is `art`; slugs are uniform) |
| Cross-period surveys | 3 | `/seeing-through-paint`, `/sculpting-through-time`, `/hearing-through-form` |
| Utility | 4 | `/timeline`, `/people`, `/compare`, `/credits` |
| Guides index | 1 | `/guides` |
| Studios | 3 | `/guides/looking-studio`, `/guides/listening-studio`, `/guides/listening-studio/musical-forms` |
| Comparison lab | 1 | `/guides/cross-period-comparison` |
| Period guides | 4 | `/guides/looking-modern-art`, `/guides/modernism-listening` (+ `/blues-jazz`, `/modernist-concert`) |
| **AP site total** | **47** | |
| Summer reading | 22 | `/summer-reading` and children (Pachinko, TFA, cultural-message, cultural-message-held) |
| Redirect stubs | 2 | `/art`, `/music` |
| Loose mockups from `public/` | 4 | `era-colors-compare.html`, `pullquote-compare.html`, `thread-colors-compare.html`, `threads-mockup.html` |

- `/art` and `/music` use `Astro.redirect(..., 301)`. Under static output this emits a meta-refresh stub, not an HTTP 301. `CLAUDE.md` says "301 redirect".
- Built but not linked from any page: `/art`, `/music`, the 4 mockups and `/summer-reading/cultural-message` (the `-held` pages are linked).
- **The Cross-Period Comparison Lab is linked from exactly one place:** a link inside `looking-studio.astro`. It is not on the Guides index.

## 1.3 Component inventory

| Item | File | Notes |
|---|---|---|
| Global header, variant A | `src/layouts/Layout.astro` (`.topbar`) | Timeline / People / Compare / Guides. Used by the 17 pages that import `Layout`. Sticky, `overflow-x:auto` and `nowrap`, which causes the phone scroll. Only Guides gets an `.on` state. |
| Global header, variant B | inline in `src/pages/units/[unit]/index.astro` (and the matching `.topbar`/`.crumb` CSS) | Timeline / People / Compare / **Painting / Sculpture / Music** (the three surveys). Not sticky; `flex-wrap`, so it wraps on phones. |
| Global header, variant C | inline in `src/pages/units/[unit]/[domain].astro` | Identical markup to B. The same CSS is duplicated again. |
| Other headers | `SummerLayout.astro`, `ScrollyLayout.astro` | Separate "Living Atlas" headers for `summer-reading`. Out of scope. |
| Breadcrumbs | Inline in `[domain].astro` (Home / Unit NN · Period / Subject) and in `[unit]/index.astro` (Home / Units / NN — Period, where "Units" is plain text). Each guide and survey page builds its own (`gd-crumb`, `ls-crumb`, ...). | No shared component. |
| Unit header | `[domain].astro` `.unit-strip` (numeral, "Unit · Anchor: X", title, dates, motif `role=5`). On the overview it is `.unit-head` with an `h1`. | `PeriodMotif.astro` supplies the emblem. |
| Subject tabs | `[domain].astro` `nav.tabs` (Philosophy / Painting / Sculpture / Music) | `aria-current` is set. |
| Subject heading block | `[domain].astro` `.page-head` (`.sigil-lg`, `.page-lbl`, `h1`) | `.page-lbl` text comes from `DOMAIN_THREAD_LABEL`. |
| "This period / Foundations" box | `src/components/SlowDownCallout.astro` | Used in 7 `.mdx` files (6 music pages and Modernism art). Variants `kind="music"` and `kind="art"`. |
| Studio cards | `src/components/StudioDiptych.astro` | Used on the homepage and `/guides`. |
| Compare cards | `src/pages/compare.astro` (inline) | 72 cards (6 units x 12 threads), each with a "Full unit →" link. |
| Timeline filters and links | `src/pages/timeline.astro` (inline `.pill` filters) | The "Read historical context" link appears only on `type: 'AP'` rows. |
| People index and panel | `people.astro` mounts `BiographyDemo` from `BiographyPanel.jsx` (own modal) | |
| BioLink popover | `BioLink.astro` plus the vanilla modal and script in `Layout.astro` | Layout-based pages only; `[domain].astro` has its own copy of the modal script. |
| Historical-moment pop-up | `[unit]/index.astro` (`#moment-trigger`, `#moment-modal`), data from `historical-moments.ts` | Focus trap and restore. |
| Looking Studio lens panel | `guides/looking-studio.astro` (`#lens-detail`, `.lens-wrap`, `#lens-{key}`) | Vanilla JS in the page. |
| Unused | `src/components/APLitTimeline.jsx` (imported nowhere), `MusicPlate.astro` (only passed to MDX, never used in content) | |

## 1.4 Design tokens and type as rendered

Tokens are defined in **three places**:

- `Layout.astro` `<style is:global>` `:root`: `--bg #F4EDDF`, `--bg-raised #EBE2D0`, `--bg-sunken #FAF4E6`, `--ink #1B1714`, `--ink-mute #4a4138`, `--ink-soft #6a6053`, `--rule #C9BDA5`, `--rule-strong #A89978`, `--acc #A07820`, the six period accents, a dark-mode set that is unused, `--font-display: Spectral`, `--font-ui: IBM Plex Sans`, `--font-mono: IBM Plex Mono`.
- `[domain].astro` `:root` (same colors; `--font-display: Cormorant Garamond`, `--font-text: EB Garamond`). `[unit]/index.astro` carries its own too.
- `src/styles/tokens.css`: only the summer-reading family (Fraunces, DM Sans, its own palette).

Period accents (hex repeated in `Layout.astro` as `--acc-*`, and in `ACCENTS`, `MARK_VARS` and `UNIT_COLORS` in the page files and `BiographyPanel.jsx`): Medieval `#C9A24B`, Renaissance `#B54C3A`, Baroque `#B07028`, Enlightenment `#698BA1`, Romanticism `#3D5A6D`, Modernism `#A03828`.

**Fonts rendered** (measured on `/units/05-modernism/art`):

| Element | Rendered family | Confirmed? |
|---|---|---|
| Body paragraphs (`.prose p`, 21px) | **Cormorant Garamond** | Yes. `--font-text` is EB Garamond, but the `body` element is the only thing that uses it. |
| `h2` in prose | EB Garamond, **weight 700**, but only 400 and 500 are loaded, so the bold is synthesized | New |
| `h1`, brand, tabs | Cormorant Garamond | |
| Nav | IBM Plex Sans 13px | Yes |
| Small labels, crumbs, stamps | IBM Plex Mono 11px | Yes |
| Source Serif 4 | Not used. Only `'Source Serif Pro'` appears, as a fallback in the unused `Layout` `--font-display`. | Yes |

On Layout-based pages `--font-display` is **Spectral**, so the type system differs between the unit pages and the rest of the site.

## 1.5 Content export

`export/project-sync/` holds **46** files, copied unmodified from the repo. Filenames follow the planning project. The `.mdx` files are saved under `.md` names, so they contain frontmatter and JSX. The table is at the end of this report.

- **BioLink_Final.md:** the whole `BiographyPanel.jsx` component. **150 entries**, all with unique ids; 94 have portraits (`CLAUDE.md` says 54).
- **Historical_Moment_Final.md** and **hub-introductions-final.ts:** the repo stores both as TS data, so they are exported as `.ts` content under the planning filenames. The first is the data file, not Markdown.
- **ap-lit-timeline.jsx:** the real dataset is `timeline-entries.ts`. The hub strip data (`timeline-events.ts`) and the unused legacy component (`APLitTimeline.jsx`) are exported as extras.
- **musicyoutubeids.csv:** from `music-youtube-ids.csv` (28 lines).
- **Pull_Quote_Selections.md:** a root planning doc. The live pull quotes are `<PullQuote>` calls inside the `.mdx` files.
- Surveys, studios, lab and period guides are exported as `.astro` pages (all content is hard-coded in them).
- The `last-modified` dates for the five image-corrected files read 2026-10-17 because of today's image commit, not editorial change.

## 1.6 Verification of review findings

| # | Finding | Confirmed? | Where and cause | Fix size |
|---|---|---|---|---|
| 1 | Modernism Painting studio links both go to `/guides` | **Yes** | `src/content/units/05-modernism/art.mdx:105-106`, hard-coded `href: '/guides'`. The `SlowDownCallout` with `kind="art"` appears on **no other painting or sculpture page** (only the 6 music pages and Modernism art use the component). | trivial |
| 2 | Guides index lacks the Comparison Lab | **Yes** | `guides.astro` `PERIOD_GUIDES` has two entries; the lab is only linked from `looking-studio.astro`. | trivial |
| 3 | Looking Studio copy | **Yes** | `StudioDiptych.astro:25,30`. "Composition & genre" is **not a page**: it is a `.room.soon` item rendered with an "in progress" tag (the file comment says "still pending"). The studio is one page with **12 lenses**: Painting: Space, Light, Brushwork, Figure, Value & Color, Materials for Paint. Sculpture: Volume, Space, Setting, Body, Material, Making. The "before you know who painted it" line is in the same file. | trivial |
| 4 | Timeline has no Medieval "Read historical context" link | **Yes** | `timeline.astro:142` renders the link only for `type: 'AP'` rows. Medieval (00) has no anchor text, so it has no AP entry (01-05 each have one). Also: the link goes to the unit overview and does not open the pop-up. | small |
| 5 | Compare destinations and labels | **Yes** | `compare.astro:296-300`: philosophy returns `/units/${unit}`; the other three return `/units/${unit}/{art,sculpture,music}`. `compare.astro:402` hard-codes "Full unit →" (with an `aria-label` "Read the full {Unit} unit"). 72 cards. | small |
| 6 | People panels have no lesson links | **Yes** | `BiographyPanel.jsx` has no `href`. Each person has a `units[]` field that could drive links. | medium |
| 7 | "Thread II · Painting" label | **Yes** | `[domain].astro:129-134`: `Thread I · Philosophy`, `Thread II · Painting`, `Thread III · Sculpture`, `Thread IV · Music`, rendered in `.page-lbl` (line 309). The overview's own "The Four Threads" frieze uses the same naming. | trivial |
| 8 | Contrast | **Yes** (see §1.10) | | |
| 9 | Phone width | **Partly** (see §1.9) | | |
| 10 | Italic final word in headings | **Confirmed** | There is no component or prop. Each page hard-codes `<em>` in its `h1`: `timeline.astro:59`, `people.astro:84`, `compare.astro:173`, `guides.astro:79`, `seeing-through-paint.astro:70`, `sculpting-through-time.astro:70`, `hearing-through-form.astro:76`, `credits.astro:235`, `modernism-listening/index.astro:19`. The subject-page `h1` is `{domainTitle}: <em>{meta.period}</em>` (`[domain].astro:310`). | n/a (report only) |

## 1.7 Anchor IDs

- **Slugging:** MDX headings get ids from the default rehype slugger (github-slugger). "Figure & Space" becomes `figure--space`. Separately, the page script in `[domain].astro` (about line 814) wraps each thread `h2` in `<section id="{frontmatter thread id}">`, e.g. `figure-space`.
- **Result on every one of the 24 subject pages:** both IDs exist at runtime. The hyphen difference you saw (Renaissance `--`, Modernism `-`) is the heading versus the wrapper section, not a difference between units. In the static HTML (JS off) only the heading IDs exist, so the 72 thread-nav links fail. The tab bar, `Looking back` and `Looking forward` headings use the slugger too, and their ids vary by unit (for example `looking-back-looking-forward` on Baroque and Romanticism Philosophy, longer ids elsewhere).

| Subject | Section (wrapper) IDs, same for all 6 units | Heading IDs (static HTML) |
|---|---|---|
| Philosophy | `human-position`, `knowledge-limits`, `individual-authority` | `the-human-position`, `knowledge-and-its-limits`, `the-individual-and-authority` |
| Painting | `figure-space`, `light-shadow`, `brushwork-surface` | `figure--space`, `light--shadow`, `brushwork--surface` |
| Sculpture | `body-volume`, `material-making`, `space-setting` | `body--volume`, `material--making`, `space--setting` |
| Music | `texture-voices`, `consonance-dissonance`, `structure-freedom` | `texture--voices`, `consonance--dissonance`, `structure--freedom` |

- **Recommendation:** treat the frontmatter thread id (`figure-space`) as the one public ID. Make it work without JS by setting `id` on the heading via a rehype step, or by adding the wrapper at build time, and stop the slugger from emitting the double-hyphen form on those headings.
- **What it would break:** any shared link of the form `#figure--space`, `#the-human-position` and so on. Nothing in the repo links to those. The only fragment links in source are `/guides/listening-studio/musical-forms#{period}` (6 music callouts plus the studio). Keep the old IDs as aliases for one release.
- No IDs were changed.

## 1.8 URL state

- **Compare:** reads a query string. `?d=philosophy|art|music`, `&m=painting|sculpture` (only when `d=art`), `&t={thread id}`. It writes the state back with `history.replaceState`. Period cannot be preselected (every card for the thread is shown). A thread that does not belong to the subject falls back to the first thread.
- **Historical-moment pop-up:** **cannot** be opened from a URL. There is no hash or query handling in `[unit]/index.astro`.
- **Looking Studio:** loading `#lens-light` **only scrolls** (the anchor exists inside a hidden panel, so even the scroll does nothing useful). No hash handling exists in `looking-studio.astro`.
- Listening Studio **does** open a lens from `#lens-{key}` (keys: rhythm, form, timbre, texture, melody, harmony). The Looking Studio does not.

## 1.9 Phone-width audit (375px)

**Method:** the local dev server in the built-in browser, each route loaded in a hidden 375px iframe, then `documentElement.scrollWidth` compared with `clientWidth` (360 once the iframe scrollbar is counted). All 73 non-redirect routes were checked.

| Route | scrollWidth | Overflowing elements |
|---|---:|---|
| `/timeline` | 956 | `#filter-units.filter-row` (right edge 957); the header |
| `/people` | 426 | `.ppl-medallion` (right edge 402); the header |
| `/summer-reading/{pachinko,tfa}/{culture,figures,history,novel,world}` (10 pages) | 478 | not investigated (outside this brief) |
| `era-colors-compare.html`, `thread-colors-compare.html` | 539, 606 | mockups |

- All 24 subject pages, 6 overviews, the home page, Compare, Credits and every guide **pass** at document level.
- **Header:** on the 17 pages that use `Layout.astro`, `.topbar` is 559px wide inside a 360px container with `overflow-x:auto`, and **Guides sits at 539px, off-screen**. The page itself does not scroll, but the nav does. The 30 unit and subject pages use the inline header (variants B and C), which wraps and does not overflow.

## 1.10 Contrast audit

Ratios computed from the token hexes, against `--bg #F4EDDF` (the page) and `--bg-raised #EBE2D0`:

| Color | On bg | On raised |
|---|---:|---:|
| `--ink` | 15.29 | 13.84 |
| `--ink-mute` | 8.57 | 7.76 |
| `--ink-soft` | 5.28 | 4.79 |
| `--rule-strong` (crumb separators) | **2.41** | 2.18 |
| `--rule` | 1.59 | 1.44 |
| acc-medieval `#C9A24B` | **2.06** | 1.86 |
| acc-renaissance `#B54C3A` | **4.44** | 4.02 |
| acc-baroque `#B07028` | **3.47** | 3.14 |
| acc-enlightenment `#698BA1` | **3.10** | 2.81 |
| acc-romanticism `#3D5A6D` | 6.26 | 5.66 |
| acc-modernism `#A03828` | 5.83 | 5.28 |
| default `--acc #A07820` | **3.47** | 3.14 |
| Thread domain colors (`DOMAIN_THREAD_COLORS`, the lighter two of each set): art `#B58193` 2.76; sculpture `#7B9883` 2.71, `#5F8060` 3.80; music `#8C80AE` 3.10; philosophy `#857A6B` 3.61 | | |

Brief items:

- **`.page-lbl`** ("Thread II · Painting", 11px Plex Mono) uses `var(--thread-acc)`, the period accent. It passes only for Romanticism (6.26) and Modernism (5.83). It fails for Medieval (2.06), Renaissance (4.44), Baroque (3.47) and Enlightenment (3.10).
- **Other small labels** using accents (for example "Close looking", `.eyebrow-strip`) inherit the same failures.
- **Breadcrumb separators** (`.crumb .sep`) use `--rule-strong`: 2.41, below 3:1. Breadcrumb text (`--ink-soft`) passes at 5.28 (4.79 on raised).
- **Artist stamp over hero images** (`figure.hero-plate .stamp`) is `--ink-mute` text placed directly on the image. Pixel sampling under the stamp on all 12 art and sculpture heroes (indicative only: on 11 of 12 the stamp box extends past the image edge, so the sample is clamped) found 9 of 12 heroes with a median ratio under 4.5 or more than a fifth of pixels failing: Michelangelo painting 1.43, Caravaggio 1.90, Bernini 1.85, Fragonard 1.97, Friedrich 1.49, Rodin 1.96, Picasso 1.74, Gislebertus 4.27, Houdon (36% of pixels fail). Martini, Michelangelo sculpture and Brancusi pass.
- **Gallery plate stamps** (`.plate .img .stamp`: cream `rgba(232,223,208,.82)` at 10.5px) are unmeasured because the lazy-loaded gallery images did not decode in the test; they will fail on any light image.

## 1.11 prose-audit

- `scripts/prose-audit/prose-audit.js` is **not recursive**: `collect()` reads one directory level. Pointed at `src/content/units` it silently audited only the two `.ts` data files (12 files, no `.mdx`). Pointed at the six unit folders it audited 36 files. Both runs are reproducible with the commands in the README.
- **Calibration warning fires** (the near-miss warning fires correctly): "No instructional zones matched ... 205 headings found." The tool expects `### Gallery -` and `### Hero -` entry headings from the old `.md` files; the `.mdx` files do not use them, so Rule 8 findings (second person) are **not trustworthy** and Layer C is polluted by raw HTML and SVG.
- Counts from the 36-file run (Layer A and B findings by rule): R17 passive 32, R18 weak ending 28, R20 18, R8/R31 11, R2 6, R1/R26 5, R35 4, R34 4, R3/R28/R30 3, R7/R26 1, R3/R28 1, em-dash notes 3. **High confidence: 13 file sections; medium: 25.** Layer C: 20 repeated-phrasing pairs, most of them markup (`plate-labeled work-figure ...`, SVG attributes) and not prose.
- Output labels files by basename only (`philosophy.mdx`, ...), so the top-10 density table cannot tell units apart. The top rows by high count are a philosophy page (6 high), then two music pages (3 and 2) and one art page (3). I did not change the tool to fix this.
- The three earlier Layer C repetitions are not visible in these results because of the markup noise. The one real prose echo in the hub data: `hub-introductions.ts::00-medieval` and `historical-moments.ts::00-medieval` share an 8-word run ("the anonymous author of the cloud of unknowing").
- Suggested tool fixes (not done): recurse into subdirectories, strip MDX/JSX before Layer C, report full paths, and recognize the current heading format.

## 1.12 Other drift

- `CLAUDE.md` and the repo disagree: portraits 54 (actual 94 files, 94 `portrait:` entries); it does not mention the summer-reading section or the 4 loose mockup pages; it calls `/art` and `/music` "301 redirects" (they are meta-refresh stubs).
- Link check (static, all 75 built pages, every internal `<a href>` including fragments): **0 internal links 404.** **72 fragment links fail in the static HTML** (the thread-jump nav on the 24 art, sculpture, music pages; they only resolve after JS runs). Pages that land on the wrong page rather than a 404: the two Modernism Painting studio links (`/guides`), the Compare philosophy cards (overview, not the subject page), and the Timeline anchor link (overview, not the pop-up).
- Duplicated CSS and markup: the `.topbar`, `.crumb`, `.brand` blocks exist three times; `:root` token blocks three times.
- Dead code and files: `APLitTimeline.jsx`, `MusicPlate.astro`, the Layout's dark-mode tokens, 4 `public/` mockups, `netlify.toml`, `archive/worktree-explorations`, and many planning `.md` files at the root.
- Stale stub: `StudioDiptych.astro` still advertises "Composition & genre" (in progress), and its file comment is out of date relative to `looking-studio.astro` (12 lenses).
- No keyboard-focus style is defined globally (only the lightbox trigger has `:focus-visible`), so focus visibility depends on the browser default.
- `Layout.astro` loads Spectral; `[domain].astro` loads Cormorant, EB Garamond, Plex Sans and Plex Mono. EB Garamond has only 400 and 500 loaded while `h2` asks for 700.

## Export table

| Planning filename | Repo source path | Last modified (git) | Note |
|---|---|---|---|
| 00_Medieval_Philosophy.md | src/content/units/00-medieval/philosophy.mdx | 2026-10-17 62a15a7 | MDX (frontmatter + JSX components) saved with .md name |
| 1_Renaissance_Philosophy.md | src/content/units/01-renaissance/philosophy.mdx | 2026-10-17 62a15a7 | MDX (frontmatter + JSX components) saved with .md name |
| 2_Baroque_Philosophy.md | src/content/units/02-baroque/philosophy.mdx | 2026-10-17 62a15a7 | MDX (frontmatter + JSX components) saved with .md name |
| 3_Enlightenment_Philosophy.md | src/content/units/03-enlightenment/philosophy.mdx | 2026-10-17 62a15a7 | MDX (frontmatter + JSX components) saved with .md name |
| 4_Romantic_Philosophy.md | src/content/units/04-romanticism/philosophy.mdx | 2026-10-17 62a15a7 | MDX (frontmatter + JSX components) saved with .md name |
| 5_Modernism_Philosophy.md | src/content/units/05-modernism/philosophy.mdx | 2026-10-12 47e61a6 | MDX (frontmatter + JSX components) saved with .md name |
| 00_Medieval_Painting.md | src/content/units/00-medieval/art.mdx | 2026-08-30 40aaa84 | MDX (frontmatter + JSX components) saved with .md name |
| 1_Renaissance_Painting.md | src/content/units/01-renaissance/art.mdx | 2026-08-30 40aaa84 | MDX (frontmatter + JSX components) saved with .md name |
| 2_Baroque_Painting.md | src/content/units/02-baroque/art.mdx | 2026-08-30 40aaa84 | MDX (frontmatter + JSX components) saved with .md name |
| 3_Enlightenment_Painting.md | src/content/units/03-enlightenment/art.mdx | 2026-08-30 40aaa84 | MDX (frontmatter + JSX components) saved with .md name |
| 4_Romantic_Painting.md | src/content/units/04-romanticism/art.mdx | 2026-08-30 40aaa84 | MDX (frontmatter + JSX components) saved with .md name |
| 5_Modernism_Painting.md | src/content/units/05-modernism/art.mdx | 2026-08-30 40aaa84 | MDX (frontmatter + JSX components) saved with .md name |
| 00_Medieval_Sculpture.md | src/content/units/00-medieval/sculpture.mdx | 2026-08-30 d075ebd | MDX (frontmatter + JSX components) saved with .md name |
| 1_Renaissance_Sculpture.md | src/content/units/01-renaissance/sculpture.mdx | 2026-08-30 d075ebd | MDX (frontmatter + JSX components) saved with .md name |
| 2_Baroque_Sculpture.md | src/content/units/02-baroque/sculpture.mdx | 2026-08-30 d075ebd | MDX (frontmatter + JSX components) saved with .md name |
| 3_Enlightenment_Sculpture.md | src/content/units/03-enlightenment/sculpture.mdx | 2026-08-30 d075ebd | MDX (frontmatter + JSX components) saved with .md name |
| 4_Romanticism_Sculpture.md | src/content/units/04-romanticism/sculpture.mdx | 2026-08-30 d075ebd | MDX (frontmatter + JSX components) saved with .md name |
| 5_Modernism_Sculpture.md | src/content/units/05-modernism/sculpture.mdx | 2026-08-30 d075ebd | MDX (frontmatter + JSX components) saved with .md name |
| 00_Medieval_Music.md | src/content/units/00-medieval/music.mdx | 2026-08-30 40aaa84 | MDX (frontmatter + JSX components) saved with .md name |
| 1_Renaissance_Music.md | src/content/units/01-renaissance/music.mdx | 2026-08-30 e6e8f92 | MDX (frontmatter + JSX components) saved with .md name |
| 2_Baroque_Music.md | src/content/units/02-baroque/music.mdx | 2026-08-30 40aaa84 | MDX (frontmatter + JSX components) saved with .md name |
| 3_Enlightenment_Music.md | src/content/units/03-enlightenment/music.mdx | 2026-08-30 40aaa84 | MDX (frontmatter + JSX components) saved with .md name |
| 4_Romantic_Music.md | src/content/units/04-romanticism/music.mdx | 2026-08-30 7d77f44 | MDX (frontmatter + JSX components) saved with .md name |
| 5_Modernism_Music.md | src/content/units/05-modernism/music.mdx | 2026-08-30 40aaa84 | MDX (frontmatter + JSX components) saved with .md name |
| BioLink_Final.md | src/components/BiographyPanel.jsx | 2026-09-26 f373431 | PEOPLE array lives inside the React component |
| hub-introductions-final.ts | src/data/hub-introductions.ts | 2026-10-11 4fa420f |  |
| Historical_Moment_Final.md | src/data/historical-moments.ts | 2026-10-17 62a15a7 | Stored as TS data, not Markdown |
| musicyoutubeids.csv | music-youtube-ids.csv | 2026-08-02 3674756 |  |
| ap-lit-timeline.jsx | src/data/timeline-entries.ts | 2026-08-31 79862b0 | Full /timeline dataset (TS, not JSX) |
| ap-lit-timeline-hub-events.ts | src/data/timeline-events.ts | 2026-09-05 6828d92 | HUB_EVENTS for hub strips; extra file |
| ap-lit-timeline-component-UNUSED.jsx | src/components/APLitTimeline.jsx | 2026-05-03 bb4e859 | Legacy component; imported nowhere |
| Pull_Quote_Selections.md | Pull_Quote_Selections.md | 2026-09-26 e7b0ca5 | Root planning doc; live pull quotes are <PullQuote> in the .mdx files |
| survey_Seeing_Through_Paint.astro | src/pages/seeing-through-paint.astro | 2026-07-28 5b288e3 |  |
| survey_Sculpting_Through_Time.astro | src/pages/sculpting-through-time.astro | 2026-07-30 65ce0d7 |  |
| survey_Hearing_Through_Form.astro | src/pages/hearing-through-form.astro | 2026-07-28 5b288e3 |  |
| studio_Looking_Studio.astro | src/pages/guides/looking-studio.astro | 2026-08-01 96e02ee |  |
| studio_Listening_Studio.astro | src/pages/guides/listening-studio.astro | 2026-07-28 5b288e3 |  |
| studio_Listening_Studio_Musical_Forms.astro | src/pages/guides/listening-studio/musical-forms.astro | 2026-07-28 5b288e3 |  |
| lab_Cross_Period_Comparison.astro | src/pages/guides/cross-period-comparison.astro | 2026-08-04 fe4153d |  |
| guide_Looking_at_Modern_Art.astro | src/pages/guides/looking-modern-art.astro | 2026-07-29 352bfb6 |  |
| guide_Modernism_Listening_index.astro | src/pages/guides/modernism-listening/index.astro | 2026-07-28 5b288e3 |  |
| guide_Modernism_Listening_Blues_Jazz.astro | src/pages/guides/modernism-listening/blues-jazz.astro | 2026-07-28 5b288e3 |  |
| guide_Modernism_Listening_Modernist_Concert.astro | src/pages/guides/modernism-listening/modernist-concert.astro | 2026-09-26 127f3d0 |  |
| page_Guides_index.astro | src/pages/guides.astro | 2026-07-29 352bfb6 |  |
| page_Compare.astro | src/pages/compare.astro | 2026-09-26 f373431 |  |
| component_StudioDiptych.astro | src/components/StudioDiptych.astro | 2026-09-26 f373431 |  |