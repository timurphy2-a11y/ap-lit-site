# Changelog — Renaissance Music prose revision and callout wording (2026-11-21)

First page revised in the prose-audit remediation. Brief: Claude_Code_Brief_Renaissance_Music.md. All items approved by Tim.

## Changes (all under `src/content/units/`)

- `01-renaissance/music.mdx`: replaced byte for byte with the approved `1_Renaissance_Music.md` (29 approved changes plus three factual corrections).
- `00-medieval/music.mdx`, `02-baroque/music.mdx`, `03-enlightenment/music.mdx`, `04-romanticism/music.mdx`: `sayLine` no longer says "to you"; "before this page" became "before reading this page".
- `05-modernism/music.mdx`: `sayLine` drops "Before you read further:".

## Verification (preview alias `ren-music`)

- Build succeeded; no stray asterisks or backslashes in the rendered page.
- Eight BioLinks resolve (six IDs, all present in `BiographyPanel.jsx`).
- Work titles render as specified; "Ave Maris Stella" now in quotation marks (Rule 42).
- Pull quote follows the "But the texture has a cost" paragraph. `listen_for` does not render.
- Listening cards are placed into thread sections by the page script at load.

## prose-audit, `01-renaissance/music.mdx`

| | High | Medium | Em dashes |
|---|---:|---:|---:|
| 2026-10-17 | 3 | 2 | 28 |
| 2026-11-21 | 0 | 1 | 6 |

Remaining medium: R17 passive construction at line 64.

## Item 4 report (second person in callouts)

Seven `SlowDownCallout` uses outside `summer-reading/` (six music pages, Modernism Painting). `SlowDownCallout.astro` has only the labels "Slow down and listen" / "Slow down and look". No "you" or "your" remains in any callout text or link label. Nothing changed.

## Deploy

Preview version `32630a88-0c29-498d-bbb7-7bc8f28ce984`. Production version ID: see below.
