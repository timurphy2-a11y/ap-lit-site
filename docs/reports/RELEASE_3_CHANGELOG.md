# Release 3 changelog: anchor IDs (branch `anchors`, preview alias `anchors`)

## What changed
- **3.1 One public ID.** New rehype plugin `plugins/rehype-thread-ids.mjs` (registered in `astro.config.mjs`) sets each thread heading's `id` at build time to its frontmatter thread id: Philosophy `human-position`, `knowledge-limits`, `individual-authority`; Painting `figure-space`, `light-shadow`, `brushwork-surface`; Sculpture `body-volume`, `material-making`, `space-setting`; Music `texture-voices`, `consonance-dissonance`, `structure-freedom`. The id sits on the `h2` (same for all six units).
- **3.2 Aliases kept.** The old heading-slug ids (`figure--space`, `the-human-position`, ...) remain as empty `<span id>` anchors directly before each heading, so old links still land at the heading. Introduction and Looking back/forward ids are unchanged.
- **3.3 Client wrapper.** The page script no longer assigns `section.id` (that was the source of the duplicate-id pair). The rest of that script (wrapping each thread in a `<section>`, decorating headings, connection panels, plate placement) is **not removed**: it builds the page layout, not only ids, and rebuilding that at build time is a larger separate change. Scroll offset moved from `.thread` to `h2.thread-head`. I did not take this item literally; Tim to confirm.
- The jump-nav (`#thread-nav-el`) is now rendered in place at the top of the article instead of inside the hidden `#pending-inserts` block, so it is visible and works with JavaScript off; with JavaScript on, the script still moves it below the introduction as before.

## Acceptance (3.4)
- **No JavaScript (checked on the built HTML of all 24 subject pages):** 72 of 72 jump links point to an element that exists, and each target is the thread `h2`; 72 of 72 old-style ids resolve; no duplicate ids on any page; every page has three jump links.
- **JavaScript on (dev server, 4 pages: Renaissance Painting, Enlightenment Philosophy, Modernism Music, Baroque Sculpture):** clicking each jump link lands the heading at the top of the viewport (24px offset); no duplicate ids; three sections each.
- Not done: a real JavaScript-disabled browser run (the browser tool cannot disable JS); the static HTML check stands in for it. Old-style links were verified by id presence, not by scrolling.
- Side effect: with JavaScript off, the gallery plates stay hidden (unchanged behavior; they are placed by the script).

## Files
`plugins/rehype-thread-ids.mjs` (new), `astro.config.mjs`, `src/pages/units/[unit]/[domain].astro`.
