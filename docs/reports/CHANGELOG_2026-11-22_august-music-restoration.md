# Changelog — August music restoration, Medieval and Modernism Music (2026-11-22)

Brief: Claude_Code_Brief_August_Music_Restoration.md. All items approved by Tim. Attachment checksums verified against the brief before use.

## Changes

- `src/content/units/00-medieval/music.mdx`: replaced byte for byte with `00_Medieval_Music.md` (Hildegard and Machaut cards, edits to three existing notes, "Gregorian chant" gloss, Notre-Dame and Ars Nova paragraphs, Hamlet Connection and Looking Forward tweaks).
- `src/content/units/05-modernism/music.mdx`: replaced byte for byte with `5_Modernism_Music.md` (five new cards: La Mer, Armstrong, Berg, Bessie Smith, Price; riot hedged; Ellington note revised; four new paragraphs; pull quote and Looking Back changed; two hidden `listen_for` fields changed).
- `src/components/BiographyPanel.jsx`: seven fields revised (`hildegard`, `perotinus`, `stravinsky` bio and significance, `schoenberg`, `debussy`, `kandinsky`); four entries added after `ellington` (`berg`, `armstrong`, `bessie-smith`, `price`; no portrait). Entries 150 -> 154, no duplicate IDs.
- `CLAUDE.md`: PEOPLE entry count 150 -> 154.

## 1.1 diff report

All differences fell within the brief's scope; no drift on `main` since Nov 21 (the Nov 21 callout fix is already in both attachments). Edits not named in the Background summary: Pierrot `analysisPrompt`, Rite Introduction note, Debussy and Stravinsky BioLinks in the Texture paragraphs, intro paragraph tweak, shortened Rite paragraph.

## Verification (preview alias `aug-music`)

- Build succeeded; no stray asterisks, backslashes or YAML on either page.
- BioLinks: Medieval gislebertus, perotinus, machaut; Modernism armstrong, berg, bessie-smith, debussy, ellison, machaut, schoenberg, stravinsky. All popups opened.
- Card placement by first thread tag matches the brief in both units.
- All seven video IDs resolve (YouTube oEmbed). Not played in the strip.
- Titles follow Rule 42. Pull quote follows the twelve-tone paragraph. `listen_for` does not render.
- People page: the four new entries show the period sigil, no image.

## Item 4 reports

- 4.1: `analysis`/`analysisPrompt` pass through `inlineMd` (inline markdown only); a `<BioLink>` will not render there. Composer names on cards are plain text, not links. Linking Berlioz or Price from cards needs a code change.
- 4.2 prose-audit:

| Page | High | Medium | Em dashes | Words |
|---|---:|---:|---:|---:|
| Modernism Music 2026-11-21 | 3 | 9 | 35 | 1916 |
| Modernism Music now | 2 | 9 | 27 | 2888 |
| Medieval Music 2026-11-21 | 1 | 2 | 11 | 1085 |
| Medieval Music now | 0 | 2 | 8 | 1612 |

Modernism Music is 5th in the audit table (was 1st); Medieval Music is 14th (was 5th).

## Deploy

Preview version `893673e9-13e7-4350-915b-05bc263e8ad1`. Production version ID: `7b97e396-0d8e-40cd-8b0e-0d7a0756f4c9`.
