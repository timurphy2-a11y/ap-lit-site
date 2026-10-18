# Follow-up item 2: layout shift on subject pages (report only; nothing changed)

**Method.** Measured on the deployed preview build (`colors` alias, production bundle, not the dev server) in the app's browser pane, 2.5 s after load, reading the buffered `layout-shift` entries from a `PerformanceObserver` (sum of entries without recent input). One load per page and width, fast connection, warm cache. Widths were emulated at 1440x900 and 375x812.

| Page | 1440px CLS | 375px CLS |
|---|---|---|
| Renaissance Painting (`/units/01-renaissance/art`) | 0.0006 (1 entry at 859 ms) | 0 |
| Enlightenment Philosophy | 0 | 0 |
| Romanticism Music | 0 | 0 |

The single entry on Renaissance Painting was a sub-pixel move (about 1px) of the unit title block and the header nav, at 859 ms (the timing is consistent with the web-font swap; I did not isolate it). It is not the section-building script.

**What moves.** Nothing visibly. The page script (wrapping each thread in a `<section>`, building the heading decorations and the connection panels, placing plates and the jump nav) runs when the DOM has been parsed, before the first paint, so the reader never sees the unbuilt layout; that is why no shift is recorded.

**Assessment.** CLS is far under 0.1 at both widths on all three pages, so the item closes. Two limits on that finding: the layout-shift API only counts movement of content that is in the viewport, and I did not test on a throttled network or a cold cache, where a slow stylesheet could let the browser paint before the script has run. If that ever shows up, the fix would be one of two sizes: reserve space in CSS for the unwrapped content (small, partial), or move the section wrapping, heading decoration and plate placement into the build, as a rehype/Astro transform (medium: the script is about 150 lines and also handles the connection toggles, lightbox and forward boxes, which stay client-side). I would not do either without a measured problem.
