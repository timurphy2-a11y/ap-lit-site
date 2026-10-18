# Follow-ups changelog (Claude_Code_Brief_Followups.md)

## Item 1: domain colors from the spec (branch `domain-colors`, preview alias `colors`)
Preview: https://colors-ap-lit-site.tmurphy-ef9.workers.dev. **Not merged; production unchanged.**

- **Tokens.** `src/styles/design-tokens.css` now holds all sixteen section 3.5 values as `--dom-{philosophy,painting,sculpture,music}-{mid,dark,light}` (plus `--dom-*` = Mid). `DOMAIN_THREAD_COLORS`, the text steps, Compare's `FAMILIES` and every studio, survey, listening and Timeline page point at the tokens (in CSS and inline `style` attributes); the interim and old live hexes are gone. A full-listing search of `src/` (excluding summer-reading) finds none of the old or interim values, apart from `#6B7C4E` in the Comparison Lab, which is not a domain color.
- **A6 rule.** Text colored by a domain color uses the Dark step (Mid measured 4.43:1 on the thread-box tint for sculpture, so Dark throughout; brief allows Mid or Dark). Meaningful icons (thread sigils, sigil boxes, Compare pills, the sidebar thread icon) use Mid via a new `--sub-icon`. Light is used only for the row stripe (`.thread-box::before`) and for tints and rules.
- **Row order** is kept: Mid, Dark, Light for the three thread rows (stripe and tint colors); text and icons override as above.
- **Tints** follow section 3.8: fills `color-mix(in oklab, COLOR 10%, var(--bg))`, borders 35%, for the thread boxes and sigil boxes.
- Studio lens icons and Compare pill focus rings no longer use the Light step (`.osig` and similar use `--acc` = Mid; focus outlines are `--ink`).
- Files: `design-tokens.css`, `units/[unit]/[domain].astro`, `compare.astro`, `timeline.astro`, `seeing-through-paint`, `sculpting-through-time`, `hearing-through-form`, `guides/looking-studio`, `guides/looking-modern-art`, `guides/listening-studio`, `guides/cross-period-comparison`, `layouts/Layout.astro`, `units/[unit]/index.astro` (fonts link and weight cleanup from the Reference v2 pass).

### Measurements (computed color against the actual background, canvas-normalized)
| Page | Domain text (Dark) | Icons (Mid) | Result |
|---|---|---|---|
| Baroque Painting | 8.76 (thread titles) - 10.64 (headings, question line) | 5.70 (sigil box), 6.65 (jump-nav icon) | pass |
| Romanticism Sculpture | 7.32 - 8.72 | 4.43 (sigil box), 5.09 (jump-nav icon) | pass (icons need 3:1) |
| Enlightenment Music | 8.95 - 10.84 | 5.90, 6.92 | pass |
| Medieval Philosophy | 12.67 - 16.02 | 8.79, 10.67 | pass |
| Compare (4 states: sculpture, painting, music, philosophy) | sub-head title 8.72 / 10.64 / 10.84 / 16.02 | pressed pill label is `--ink` | pass |

Pairs found below threshold during the work, and the change: thread-box title in Mid on the 10% tint, 4.43 (sculpture) -> Dark text; `.tn-idx` numeral in `--ink-soft` on the 10% tint, 4.18 - 4.44 -> `--ink-mute`. A full 47-route text-contrast audit (6,160 text runs, transitions disabled, text over background images not sampled) otherwise found no failures; I did not re-run the whole audit after the last two fixes, only re-measured the affected pairs.

## Item 2: layout shift (report only)
CLS 0 to 0.0006 on all three pages at 1440px and 375px; the item closes. See `FOLLOWUP_ITEM2_LAYOUT_SHIFT.md`.

## Item 3: BioLink check (report only)
No build step parses a BioLink markdown file; `BiographyPanel.jsx` is edited directly; there is no check for unknown ids (small to add). See `FOLLOWUP_ITEM3_BIOLINK_CHECK.md`.

## Item 4: export and bundle
Regenerated from `main` (Item 1 was not yet merged, so the domain-color changes are **not** in the exported pages; the studio and survey page copies will change again when it merges). See `README.md` in the bundle and `export-table.md`.
