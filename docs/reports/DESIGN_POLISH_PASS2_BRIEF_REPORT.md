# Design Polish Pass 2 (brief of Nov 19): report

**Branches:** `claude/pass2-fix` (Phase 1, from `main` a8dd305) and `claude/pass2-proposals` (Phase 2 prototypes, on top of it). The merged branches `claude/design-polish-1` and `claude/design-polish-2` were deleted; `workshop-page` was left alone. Nothing is merged or deployed.

**Previews (Worker versions, no production traffic)**
- Phase 1: https://pass2-ap-lit-site.tmurphy-ef9.workers.dev
- Phase 2 proposals page: https://pass2-proposals-ap-lit-site.tmurphy-ef9.workers.dev/p2/ (live switches use `?p2=`, e.g. `/compare/?p2=15b`)

## Phase 1 (one commit per item)
| Item | Status | Files |
|---|---|---|
| H1 | Done | `units/[unit]/index.astro` |
| 14 | Done | `seeing-through-paint`, `hearing-through-form`, `sculpting-through-time` |
| 15a | Done | `compare.astro` |
| 17 | Done | `layouts/Layout.astro` and the three survey pages |
| 19 | Done | `timeline.astro` |
| S1 | Done | 12 page files, `BiographyPanel.jsx` |

**H1, choice made: the arrow joins the caption line** (non-breaking space, so it never wraps alone), and the card height follows its content. I compared it with "trim the bottom padding and keep the arrow right-aligned": both closed the empty band to the same height (about 232px against 300px before), but the caption-line version keeps the arrow visible without a separate row. Screenshots: `.polish/pass2-shots/h1-{base,A,B}-{1440,375}.png`. (Variant A was shown with the arrow hidden, so it is a lower bound for that option, not a like-for-like.)

**14.** The box is capped at `calc(62ch + 63px)`, so its text holds the 62ch measure used on hubs, and the box lines up with the thread question above it. The same component is on all three survey pages and was fixed on all three.

**15a, what I found.** "Visual Art" was an interface label in exactly one place (the Compare domain tab). Descriptive uses to list, none changed: `01-renaissance/art.mdx:82` ("the visual art of Hamlet's intellectual world"), `seeing-through-paint.astro:80` ("the visual art of each period"), a code comment in `BiographyPanel.jsx`, and a line in CLAUDE.md. **Problem:** that tab is an umbrella with a Painting/Sculpture row beneath it, so after the rename the page shows "Painting" with Painting and Sculpture under it. 15b's four-tab version resolves this.

**17, footer inventory (47 pages).**
- Hub footer already: 6 hubs, 24 subject pages, home, Guides index, 3 studios, Looking & Modern Art, Modernism Listening index, Blues & Jazz, Modernist Concert, Cross-Period Lab, Musical Forms.
- Centered "Image Credits" only: Compare, Credits, People, Timeline. Fixed through the Layout footer.
- Survey footers ("← Home", sibling links, Image Credits): Seeing Through Paint, Hearing Through Form, Sculpting Through Time. Now the hub footer, with "← Home" and the sibling links kept as a page nav above it (links are navigation, so I did not delete them).
- **Not changed, your call:** four pages add a third footer cell to the hub footer: home ("A course site in six units"), Guides ("Guides · studios, surveys, period guides"), the Lab ("The Looking Studio / Cross-Period Comparison Lab") and Musical Forms ("Musical Forms — simplified listening models, not scores"). The brief says every page uses the hub footer; I left these descriptors because they are text, and removal is a one-line change per page.

**19.** The popover is anchored to the entry title's text, opens to its right, flips left near the right edge, and on a phone sits directly below the title (flips above if there is no room). Checked at 1440 and 375 on entries near the top, middle and bottom: always fully on screen. Enter opens, Escape closes, focus returns to the title.

**S1.** Breadcrumb `/`, People `·`, Musical Forms `→` and 9 other copies of the breadcrumb rule now use `--ink-soft` (5.28:1 on the page background; was 2.41:1). One more decorative glyph, the `·` in the BioLink panel header, was at ink-soft at 50% opacity; the opacity is removed. A scan of every glyph-only text node and `::before`/`::after` glyph on all 47 pages finds none below 3:1 (lowest 5.09).

## Phase 2: waiting for your choices
Everything is on the proposals page. For each: what the reference says, a before/after at 1440 and 375, and a live switch.

- **15b.** Compare **already reaches Sculpture** through the umbrella tab's second row, and all **18** text entries (6 periods × 3 threads) already exist in `threads[].period_summary` of the six `sculpture.mdx` files. Adding Sculpture needs **0** new text and no placeholder cards. Proposal: four top-level tabs, no second row.
- **16.** Reference §4.1/§4.2: prose is EB Garamond, 18px minimum; Plex Sans is for nav, buttons, tabs and inputs. A (Garamond) conforms; B (Plex, one size) would need an amendment. The Listening Studio and the Lab make the same choice with the same classes.
- **18.** Inventory is on the page. Two controls (the survey thread jump buttons and the Timeline filters) show selection with paint only and have no ARIA at all. Option A is the reference §7 tab; B is the live Cormorant tab with an accent bar. Both add `aria-current` / `aria-pressed`.
- **20.** 56 of 150 people have no portrait. A (period sigil), B (tinted box), C (as is).
- **I1.** Proposed: Alba Madonna transparent cutout (like the Maestà, file in `public/p2/`), scholars composite re-exported as a `-v5` with page-color gutters (file in `public/p2/`); leave Martini, the sculptures and the edge-band images. Reference §6 mounts art on `--bg-sunken`; sampled-color mats would break that, so I do not recommend them.
- **R1.** The layout is the dead `else` branch of `isRedesignedDomain` in `[domain].astro` (about lines 468–535, CSS about 2443–2560). Data: `readings:` in the six `philosophy.mdx` files (5, 8, 5, 9, 5, 6 = 38 entries) plus the schema in `content.config.ts`. A, B, C described on the page; no prototype.

## Verification (Phase 1)
1. **Build** passes; 0 console errors on all 47 AP pages at 1440 and 375.
2. **Rendered-text diff against production** (47 pages, including script-built text). Only these differ:
   - "Visual Art" → "Painting" (1).
   - Footer: hub footer text appears on the 7 pages that lacked it; the four-page "IMAGE CREDITS" becomes "Image Credits" (the text-transform moved from the old footer).
   - H1: the arrow `→` (24) now shares a line with its caption (24 caption lines gain " →"). No wording changed.
   - Two Musical Forms animated captions differ only by animation timing.
3. Screenshots in `.polish/pass2-shots/` (untracked): hub, three surveys (story box and footer), Compare, Timeline, People, Credits, a subject page, at 1440 and 375. I looked at the survey story box, survey footer at 375, Compare and the popover; the rest are captured, not all individually inspected.
4. **Contrast:** 0 text failures on all 47 pages at both widths; no decorative glyph below 3:1.
5. **Keyboard:** Compare tab order walked: header, domain pills, thread pills, unit links all show a 2px outline; Enter on the Painting pill reveals the medium row and keeps focus. Timeline popover: Enter opens, Escape closes, focus returns. Not re-walked: hub cards and subject tabs (their CSS did not change except the card padding).
6. **No horizontal scroll at 375** on any of the 47 AP pages.
7. **Protected sections:** no change in the text diff.

## Skipped / not verified
- Third footer cells on four pages (above).
- R1 has no prototype (report-and-propose only).
- The Compare tab "keyboard walk" checks tab order, focus visibility and Enter; I did not run a screen reader.

## Noticed, not fixed
- CLAUDE.md says Adelard of Bath has no portrait; he does, and 56 others do not.
- CLAUDE.md still mentions the hub "Visual Art split card".
- The survey thread jump buttons and Timeline filters need ARIA regardless of the item 18 choice.
- The old `design-polish-2` report in this folder shares a name with this brief; this one is `DESIGN_POLISH_PASS2_BRIEF_REPORT.md`.
