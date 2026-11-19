# Design Polish Pass 1: report

Branch `claude/design-polish-1` (one commit per item, prefixed by ID). Preview only; nothing merged to `main` or deployed to production.
Baselines (rendered text for 49 routes, 24 screenshots) and after-shots are in `.polish/` (untracked): `baseline-text/`, `baseline-shots/`, `after-shots/`.

## Status by item

| Item | Status | Files |
|---|---|---|
| B1 | Done | `src/lib/inline-md.ts`, `Plate.astro`, `YouTubeEmbed.astro`, `[domain].astro` |
| B2 | Done | `src/lib/smart-punct.mjs`, `plugins/smart-punct-build.mjs`, `astro.config.mjs`, `content.config.ts`, `BiographyPanel.jsx`, hub `index.astro`, `CLAUDE.md` |
| B3 | Done, 18 + 8 unsure cases left unitalicized | see `DESIGN_POLISH_1_B3_TABLE.md` |
| B4 | Done | three guide pages |
| C1 | Done | `SiteHeader.astro` |
| C5a | Done | `[domain].astro` |
| C6 | Medieval Music only; **waiting for Tim's approval** | `YouTubeEmbed.astro`, `[domain].astro`, `content.config.ts` |
| C7 | Done with flags | three new image files, three frontmatter paths |
| C8 | Done | `[domain].astro` |
| C9 | Done | `StudioDiptych.astro` |
| C11 | Done | hub `index.astro`, `Plate.astro`, `YouTubeEmbed.astro`, `[domain].astro` |
| C12 | Done | `[domain].astro`, `PullQuote.astro` |
| Phase 2 | Proposals only, see `DESIGN_POLISH_1_PHASE2_PROPOSALS.md` | none |

## B1: fixed instances (visible `*word*` in baseline, now rendered as emphasis)
Scan of built HTML after the fix: **0** visible asterisks on all routes. Legitimate asterisks left alone: none found.
The brief's list undercounted: the same unrendered emphasis also appeared on Medieval, Renaissance, Enlightenment and Romanticism painting/sculpture pages (11 pages in all).

```
units/00-medieval/art *upward*
units/00-medieval/art *is*
units/00-medieval/music *Symphonie fantastique*
units/00-medieval/music *simultaneously*
units/01-renaissance/art *you*
units/01-renaissance/music *imitation*
units/01-renaissance/music *independent*
units/01-renaissance/sculpture *David*
units/02-baroque/sculpture *contain motion*
units/03-enlightenment/art *leaving*
units/03-enlightenment/music *exposition*
units/03-enlightenment/music *galant*
units/03-enlightenment/music *Eine kleine Nachtmusik*
units/04-romanticism/art *Scene of a Shipwreck*
units/04-romanticism/art *Zong*
units/04-romanticism/sculpture *The Thinker*
units/05-modernism/music *not*
units/05-modernism/music *Sprechstimme*
```

## B2: smart punctuation
Four paths, because the text comes from four places: an MDX rehype plugin (body prose, text nodes only), a content-schema transform (every frontmatter string), `smartDeep` for People bios and hub data, and a build-time pass over the text nodes of every static AP-site page (catches strings in `.astro`/`.ts`). Attributes, `<head>`, scripts, styles, code, `pre`, and `summer-reading/` are never touched.
Result: **0** straight `"` or `'` in visible text on any of the 49 AP-site routes. Rendered-text diff is quote glyphs only.
Note: the brief says hubs, Timeline, People, Compare, guides and Studio were already clean. They were not: they had straight apostrophes (and the guides and Credits straight double quotes). All are now converted. `CLAUDE.md` previously told authors to type straight quotes; it now says smart punctuation is automatic.

## B2 sample (20 conversions)

Real page conversions (before → after), drawn at random across the six units:

1. `02-baroque/philosophy_`: `bjects seen through the "optic glass," turning ` → `bjects seen through the “optic glass,” turning `
2. `04-romanticism/art_`: `urner handles paint. In "The Whiteness of the W` → `urner handles paint. In “The Whiteness of the W`
3. `04-romanticism/sculpture_`: ` Material & Making Rodin's refusal to resolve a` → ` Material & Making Rodin’s refusal to resolve a`
4. `05-modernism/art_`: ` canvases had made Monet's suddenly legible, an` → ` canvases had made Monet’s suddenly legible, an`
5. `05-modernism/art_`: `le ideology (the college's accommodationism, th` → `le ideology (the college’s accommodationism, th`
6. `05-modernism/sculpture_`: `wed by loss. Where Rodin's Gates of Hell accumu` → `wed by loss. Where Rodin’s Gates of Hell accumu`
7. `04-romanticism/sculpture_`: `the subject — while Rude's carved stone, cut pe` → `the subject — while Rude’s carved stone, cut pe`
8. `04-romanticism/philosophy_`: `onkey-rope joins Ishmael's safety to Queequeg's` → `onkey-rope joins Ishmael’s safety to Queequeg’s`
9. `03-enlightenment/sculpture_`: `bandon the Enlightenment's legible social surfa` → `bandon the Enlightenment’s legible social surfa`
10. `04-romanticism/sculpture_`: `an egg, a column, a bird's upward surge. Ducham` → `an egg, a column, a bird’s upward surge. Ducham`
11. `01-renaissance/art_`: ` The Renaissance painter's ambition to make a p` → ` The Renaissance painter’s ambition to make a p`
12. `02-baroque/art_`: `lf is one of the Baroque's great innovations. C` → `lf is one of the Baroque’s great innovations. C`
13. `04-romanticism/art_`: `as given way to Melville's oceanic confrontatio` → `as given way to Melville’s oceanic confrontatio`
14. `05-modernism/philosophy_`: `r a person. The narrator's task is larger than ` → `r a person. The narrator’s task is larger than `

Edge cases (unit-tested against the converter; leading-apostrophe and dash-adjacent forms do not occur in current content):

15. 'tis the season → ’tis the season
16. the '60s were loud → the ’60s were loud
17. "Thou—" he said → “Thou—” he said
18. "I know not 'seems,'" he says → “I know not ‘seems,’” he says (real instance: Renaissance Painting)
19. *Invisible Man*'s end → *Invisible Man*’s end
20. rock 'n' roll → rock ’n’ roll

## B3: see `DESIGN_POLISH_1_B3_TABLE.md`
Decisions to confirm:
- Pull-quote attributions that wrapped a title in single quotes (Kant, Bacon, Hume, Du Bois, Wittgenstein) and the Baroque hub intro's "Paradise Lost" now show italics **without the quote marks**, matching the hub epigraph pattern. That is a quote-glyph removal, not a wording change.
- Not italicized (your call): short forms (*Summa*, *Treatise*, *Origin*, *Trinity*, *Cornelia*, *Wanderer*, *Liberty*, *Demoiselles*, *The Rite*, *Manifesto*), ship/newspaper names, *Ring Cycle*, the numbered symphonies, the four AP anchor titles on `/timeline/`, and the "Hamlet" that means the prince (for example the last sentence of the Medieval hub intro).
- Ninety-Five Theses, Magna Carta and similar documents are not italicized.

## B4
Template is now `Full unit: {name} →`. Seeing Through Paint, Hearing Through Form and Sculpting Through Time all had the bug and all are fixed.

## C items, notes
- **C1** Collapses at 640px and below behind a real `<button aria-expanded>`. Escape closes the Units submenu first, then the menu, and returns focus to the button. The Units submenu opens inline. At 375px the header is 53px tall (it was 97px).
- **C5a** Cards use `align-items/align-content: start`.
- **C8** First sub-thread's top rule removed after the card row (both top border and top padding).
- **C9** Subgrid; rules align at 1440 and 1024 (both y=2350 and 2431). At 375 the cards stack, so alignment does not apply.
- **C11** Arrow gap added. Both toggles ("Read the analysis" / "What to listen for") reserve the longer label's width and measured identical width open and closed. Empty pager sides are hidden; the remaining link keeps its side.
- **C12** The frieze's measured width differs from the brief's numbers (it ran 80–1360 against a 138–1302 container at 1440); it now matches the container. Pull-quote attributions are centered; the component is shared, so every instance changed.
- **C6** Typographic poster on Medieval Music only. Screenshots: `.polish/c6-feat-1440.png` (*Ave Maris Stella*), `.polish/c6-gal-1440.png` and `c6-gal-375.png` (*Viderunt Omnes*). New optional `poster` field on music entries shows an image in the standard mat. The caption below repeats title and composer; say if you want that removed once posters are approved. Not rolled out to the other five units or the Listening Studio.

## C7: image mats
- *Maestà*: the black is a photographic cutout silhouette, so a rectangular crop cannot remove the black between the spires (the image already filled its frame). Instead I made `duccio-maesta-cutout.webp`, with only the connected near-black background made transparent. Artwork pixels are untouched; the original JPG is kept. Preview: `.polish/c7/before-duccio-maesta.png` and `after-duccio-maesta-cutout.png`.
- Scholars composite (Medieval Philosophy): the near-white gutters (about 248,247,242) are **baked into the PNG**, not CSS. Not edited. Report only.
- Sweep of painting and sculpture images (before/after thumbnails in `.polish/c7/`):

| Image | Finding | Action |
|---|---|---|
| `sculptures/01-renaissance/michelangelo-pieta.jpg` | black margins (63 top, 51 left, 56 right) | cropped to `michelangelo-pieta-cropped.jpg` |
| `paintings/05-modernism/afklint-ten-largest-no-7.jpg` | white margins 24–30px | cropped to `afklint-ten-largest-no-7-cropped.jpg` |
| `paintings/01-renaissance/raphael-alba-madonna.jpg` | black corners around a tondo | **flag**: a rectangular crop leaves black corners |
| `paintings/00-medieval/martini-annunciation.jpg` | gallery wall and plinth, a gradient and not a solid colour | **flag** |
| `sculptures/05-modernism/picasso-guitar.jpg`, `giacometti-city-square.jpg`, `smith-hudson-river-landscape.jpg` | object photographed on white or grey | **flag**: backdrop, not a border |
| `paintings/01-renaissance/masaccio-holy-trinity.jpg`, `02-baroque/caravaggio-calling-of-matthew.jpg`, `05-modernism/monet-water-lilies-triptych.jpg` | narrow edge bands | **flag**: probably part of the artwork, not touched |
| Remaining `sculptures/*` rows (Rottgen, David, Milo, Houdon, Gates of Hell, Large Glass) | uniform sky or backdrop bands | **flag**, not touched |

## Verification
1. Build passes; 0 console errors on the 12 pages at 1440 and 375.
2. **Rendered-text diff vs baseline.** Beyond the permitted categories (quote glyphs, asterisks, B4 label, C6 poster text), the diff has these items. Please look:
   - `Menu` on every page, the new C1 button label. It is visible only at 640px and below. Not in your permitted list.
   - Empty pager sides ("Previous" / "—", "Next" / "—") are gone (C11).
   - Quote marks removed around six titles (see B3).
   - Poster text on Medieval Music (permitted).
   Italics added no diff lines. Protected sections (What to Notice, What to Listen For, thread core arguments) show no changes.
3. Screenshots: `.polish/after-shots/` (12 pages × 2 widths).
4. Contrast on all 12 pages: only decorative separators fail (breadcrumb `/` and People group `·`, 2.41:1). They were failing before this pass and carry no information. Disabled links are gone.
5. Keyboard walk (desktop header, mobile menu, domain tabs, gallery toggle): 2px solid focus outline at every stop. The BioLink modal was not walked.
6. scrollWidth equals viewport at 375px on all 12 pages.

## Noticed but not fixed
- The breadcrumb `/` and People `·` separators are 2.41:1. Decorative, but they will trip an automated contrast check.
- Credits-page image thumbnails still point at the uncropped Pietà and af Klint files.
- The brief's pixel figures for C12 and for the C2 logo shift (80px measured, brief says 72px) differ slightly from this build.
- 'Hamlet' appears with the prince's meaning inside `hub-introductions.ts` prose; it is left roman on purpose.

## Phase 1 review follow-ups (Tim, round 1)

**1. B3: short works in quotes, full-length works in italics.** Changes:
| Where | Was | Now |
|---|---|---|
| Enlightenment Philosophy pull-quote | *An Answer to the Question: What Is Enlightenment?* | “An Answer to the Question: What Is Enlightenment?” (essay) |
| Romanticism Philosophy pull-quote | *A Defence of Poetry*, composed 1821 | “A Defence of Poetry,” composed 1821 (essay; comma moved inside the quotes, US style) |
| BioLink: Shelley | *A Defence of Poetry* | “A Defence of Poetry” |
| BioLink: Emerson | essay *Nature* | essay “Nature” |
| BioLink: Sartre | *Existentialism Is a Humanism* | “Existentialism Is a Humanism” (lecture-essay) |
| BioLink: Schubert | *Der Erlkönig* | “Der Erlkönig” (song) |
| /timeline/ 1824 note | Schiller's Ode to Joy (roman) | Schiller’s “Ode to Joy” (poem) |
| /timeline/ 1857 note | the Flowers of Evil (roman) | the *Flowers of Evil* (book) |

Kept as italics: Bacon's *Advancement of Learning*, Hume's *Treatise*, Du Bois's *Souls of Black Folk*, Wittgenstein's *Tractatus* and the Baroque intro's *Paradise Lost* are all full-length works.
For you to decide:
- Motets and organa are italic in the BioLinks (*Sicut Cervus*, *Ave Maria...virgo serena*, *Spem in Alium*, *Viderunt omnes*, *Sederunt principes*). Your list (songs, arias, movements) doesn't clearly cover them.
- Your own MDX body prose italicizes Emerson's *Nature* and Shelley's *Defence of Poetry* (Romanticism Philosophy, plus the readings title). Those predate this pass and I left them.
- The hub epigraph pattern turns Hamann's ‘Aesthetics in a Nutshell’ (an essay) into italics. That pattern predates this pass too.

**2. C6: compact listening strip.** It replaces the 16:9 poster and is a third of the height: 195px at 1440 (16:3) and a 92px minimum on phones. It holds the period sigil, a hairline and the play button, with no title or composer. Clicking swaps in the 16:9 player. An entry with a `poster` image gets the full 16:9 matted frame instead.
- While testing I found the expanded player rendered at 300×150 on every music page, including the live site. The scoped `.yt-iframe` style never matched the script-created iframe. Fixed, since C6 depends on it; it's now 1038×584 at 1440.
- Screenshots: `.polish/c6-strip-feat-1440.png`, `c6-strip-gal-1440.png`, `c6-strip-feat-375.png`, `c6-strip-gal-375.png`.
- Poster-image variant: `.polish/c6-poster-image-test-1440.png`, built with a temporary stand-in image (Martini) that I removed afterwards.
- Still Medieval Music only.

**3. C7.** Images whose file name contains `-cutout` get 32px of top padding (24px sides, 20px bottom) inside the mat, so the Maestà's central spire clears the edge. Screenshots: `.polish/c7-maesta-1440.png` and `c7-maesta-375.png`.

**4.** "Menu" in the text diff: approved.

**5.** Phase 2 is on hold until the amendments file is on this machine.

Re-verified after these changes: 0 console errors, no horizontal scroll at 375. Contrast is unchanged: only the decorative separators fail. The text diff is as before plus the eight quote changes above; the C6 poster text is gone.
