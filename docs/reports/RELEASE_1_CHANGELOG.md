# Release 1 changelog (branch `nav-revision`, preview alias `nav`)

Preview: https://nav-ap-lit-site.tmurphy-ef9.workers.dev (version URL https://a61d5450-ap-lit-site.tmurphy-ef9.workers.dev). Production is unchanged. Not merged.

## Items
| Item | Done | Files |
|---|---|---|
| 1.1 Verification | Yes (see below) | |
| 1.2a Global focus ring | Yes: `:where(a, button, input, select, textarea, summary, [tabindex]):focus-visible` = 2px solid `--ink`, 3px offset. `--ink` is 15.3 / 13.8 / 16.2:1 on bg / raised / sunken | `src/styles/site-focus.css` (imported by `SiteHeader.astro`, so it reaches Layout pages and both unit templates) |
| 1.2b Four Threads -> Four Domains | Yes. Strings changed in `units/[unit]/index.astro`: "The Four Threads" -> "The Four Domains"; "Open thread" (x4) -> "Open domain". `DOMAIN_THREAD_LABEL` ("Thread I-IV · ...") in `[domain].astro` is left for Release 2 (definite cut) | `src/pages/units/[unit]/index.astro` |
| 1.3 Modernism studio links | Yes: `/guides/looking-modern-art/`, `/guides/looking-studio/` | `src/content/units/05-modernism/art.mdx` |
| 1.4 Comparison Lab on Guides | Yes: a one-row entry under the two studio cards (section I), description as specified | `src/pages/guides.astro` |
| 1.5 Compare destinations/labels | Yes: philosophy -> `/units/{unit}/philosophy/`; all 72 links read "Open {Medieval, Renaissance, Baroque, Enlightenment, Romanticism, Modernism} {Philosophy, Painting, Sculpture, Music}" with a matching `aria-label` | `src/pages/compare.astro` |
| 1.6 Phone overflow | Yes. Timeline filter rows wrap; the Timeline rows themselves also overflowed (fixed with a phone grid for entries and anchor rows). People group header wraps (medallion overflow) | `timeline.astro`, `people.astro` |
| 1.7 Mockups | Moved to `archive/public-mockups/` (git mv); they now 404 on the preview | |
| 1.8 Dead files | Removed `netlify.toml`, `APLitTimeline.jsx`, `MusicPlate.astro` (plus its import and prop in `[domain].astro`); build passes | |
| Preview mechanics | `preview_urls: true` in `wrangler.jsonc`; `npm run preview:remote -- <alias>` | `wrangler.jsonc`, `package.json` (CLAUDE.md documentation is in Track T, branch `track-t`) |
| Unrequested | Menu panel border changed to `--ink-soft` (5.28:1) after measurement showed `--rule` at 1.59:1 failed 3:1 for a UI boundary | `SiteHeader.astro` |

## 1.1 Verification
- **47-route sweep at 375px (dev server):** header present on all 47; menu opens on all 47; Guides in view on all 47; "You are here" exactly once on each of the 30 unit pages and 0 elsewhere; no horizontal overflow on any page after the fixes (Timeline was 491px wide before the grid fix). Static check of the built HTML: all 47 routes share one header structure; menu heading and destinations are correct for every page type; the footer link is correct on all 24 subject pages.
- **Keyboard (real Tab presses):** order on Renaissance Painting: brand, Units, five menu rows (current unit is not a link), overview link, Timeline, People. Focus ring visible at every stop (2px `--ink`). On People: same order; Escape closes the menu and returns focus to the Units button.
- **Measured contrast (computed styles) on the open panel:** heading 9.10; row names 16.24; numerals 9.10; dates on link rows 5.61 (4.79 on the hover background); current-row text 7.76-13.84; footer link 16.24; nav 8.57. All pass.
- **Screen reader:** not run (VoiceOver cannot be driven from this environment). `aria-expanded`, `aria-controls` and `aria-current="page"` are in the markup. Tim to spot-check.
- **KV:** nothing in `src/` outside summer-reading reads or writes sessions or cookies; the AP pages are prerendered static HTML.

## Not done / deferred
- Releases 2 and 3 start only after Tim approves and merges this release.
- Medieval Timeline link and Timeline pop-up links: deferred as instructed.
