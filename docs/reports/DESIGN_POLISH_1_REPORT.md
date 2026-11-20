# Design Polish Pass 1: final Phase 1 report

**Status:** Phase 1 is complete and approved pending your phone check. Branch `claude/design-polish-1`, 38 commits on top of `main` (rounds 4 and 5 included). Preview: https://polish1-ap-lit-site.tmurphy-ef9.workers.dev. Nothing has been merged or deployed to production. Phase 2 is on hold until the amendments file is on this machine. The merge checklist is in `DESIGN_POLISH_1_MERGE_CHECKLIST.md`.

## Final state by item
| Item | Final state |
|---|---|
| B1 | Emphasis renders in analysis fields and in both BioLink modals; 0 visible asterisks sitewide, popups included (all 320 BioLink popups opened and checked) |
| B2 | Smart punctuation on every AP-site route through four render paths; 0 straight quotes in visible text |
| B3 | Titles follow the publication rule (standalone volume = italics, within a larger work = quotes; book-length serials italic; generic titles roman; music excerpts and songs in roman double quotes). Shortened titles, ship names and the timeline anchor titles italic in markup. Recorded in CLAUDE.md and the writing guide's Rule 42 |
| B4 | "Full unit: {name} →" on the three guide pages |
| C1 | Menu button at 640px and below; Escape and focus behave; "Menu" approved in the text diff |
| C5a | Thread cards top-aligned |
| C6 | Compact listening strip (sigil and play button, no rule) on all 32 music embeds; clicking opens the 16:9 player; a `poster` image gets the full matted frame. Also fixes the player opening at 300×150, which affected the live site too |
| C7 | Maestà transparent cutout with mat padding; Pietà and af Klint margins cropped, on the subject pages and on Credits (the uncropped originals are now unused and removed); ambiguous cases flagged |
| C8 | Doubled rule removed |
| C9 | Studio cards share rows (subgrid) |
| C11 | Arrow gap, fixed-width toggles, empty pager sides hidden |
| C12 | Frieze matches the container; pull-quote attributions centered |
| Keyboard | BioLink popups: focus moves to Close, Tab stays inside, Escape closes and returns focus to the link; long bios scroll on phones |

## Round 5 changes
- **Writing guide:** your current file (`~/Downloads/Writing_and_Editing_Guide.md`, with the corrected Rule 8 and the final Rule 42) is installed unedited and byte-identical. It replaces my reconstruction.
- **CLAUDE.md** titles rule re-synced to the final Rule 42: the publication rule; the italics, quotation-mark, shortened-title and roman lists; the music genre lists; and the nickname convention. A short note on site markup follows it.
- **"Ring Cycle" → "Ring cycle"** (Wagner BioLink).
- **Maestà original removed.** `duccio-maesta.jpg` is `git rm`'d; the cutout is the only version referenced.

## Round 4 changes
- **Writing guide.** Your attached file didn't come through: the message had no attachment, and no 42-rule copy exists anywhere on this machine. I rebuilt it from the newest copy I could find, the 41-rule guide from August 28 on the external drive (`/Volumes/New Drive/Mac Migration/Downloads/Writing_and_Editing_Guide.md`). I then appended "## VII. Typography / ### 42. Titles of works" with your round-3 wording, verbatim apart from italic markup. The rule 33 version is gone. **If your file differs, put it in the repo root (or Downloads) and I'll swap it in before the merge.**
- **Rule-number references.**
  - CLAUDE.md cites only Rule 42, which is correct.
  - `scripts/prose-audit` cites R1–R3, R6–R10, R12, R14, R15, R17–R20, R22, R26, R28, R30, R31, R34 and R35. All of these already match the 41/42-rule numbering (for example R8 second person, R18 paragraph endings, R34 figurative language, R35 stacked questions), so nothing needed changing.
  - Only the stale repo guide used the old numbers.
- **CLAUDE.md titles rule** now restates Rule 42 word for word, including the music list (motets, organa, masses, operas, symphonies; "song cycles" removed), followed by site practice: shortened titles, ship names, excerpt pattern and markup.
- **Shortened titles, italic where they name the work:** *Summa*, *Treatise*, *Manifesto*, *Trinity*, *Cornelia*, *Wanderer*, *Liberty*, *Demoiselles*, *The Rite* (all in BioLink text), and *Ring* in "Ring Cycle".
  - Left roman as ordinary words or as the figures in the paintings: Cornelia "at center" and Liberty "herself", "Liberty's feet" (Romantic and Enlightenment Painting analysis); "the winged figure of Liberty" (Romantic Sculpture); the Liberty Paints factory; the Statue of Liberty and Liberty Island.
  - "Origin" appears only inside full titles, which were already italic.
  - "Ring Cycle" keeps its capital C. Lowercasing it would change the wording, so that's your call.
- **Ship names:** the *Pequod* (Marx BioLink; Romantic Philosophy monkey-rope caption), the *Beagle* (Darwin BioLink), the *Mayflower* voyage (timeline). The Mayflower Compact stays roman as a document. The *Zong* was already italic.
- **Timeline anchor titles.** My round-1 note was misleading: all five anchor titles on `/timeline/` already displayed in italics, because the stylesheet italicized the whole title line. The italics now come from `*Title*` markup with a roman default, the same pattern as the music cards. They look identical, but they no longer depend on the stylesheet.
- **"Für Elise"** is in quotes everywhere: the Listening Studio prose and screen-reader text, and the Modernist Concert prose, with the comma moved inside. ***Scheherazade*** is italic in the Listening Studio work label.
  - Rule 42 also made one more change: Chopin's *Prelude in E minor* (Listening Studio prose) is now roman as a generic title.
  - Two screen-reader-only labels and an SVG title still say "Scheherazade" in plain text, where italics don't apply.
- **Reading list.** "A Defence of Poetry" (excerpts) now renders in quotes and roman.
  - **Note:** the reading list belongs to the old sidebar layout, which no unit uses, so it doesn't appear on any live page.
  - So the list stays consistent if it comes back, I marked up all 38 titles under Rule 42 and set the template to render them. Roman, by judgment: Summary of Aristotelian Physics (descriptive), Against Catholicism (Luther; a descriptive label, not a published title), Atlanta Exposition Address.
  - In quotes: "The Unquiet Grave" (ballad), "Moon Man" (Gopnik, a *New Yorker* essay), "What is Enlightenment?", "The Parable of the Madman" (from *The Gay Science*), "Without Foundation" (from *Time of the Magicians*), *The Souls of Black Folk*, Chapter 1 ("Of Our Spiritual Strivings").
- **"Der Erlkönig" → "Erlkönig"** in all three places (music card, Romantic Music prose, Schubert BioLink). The prose had it italic; it's now in quotes, as a song.
- **Credits** thumbnails use the cropped Pietà and af Klint files. Nothing referenced the uncropped originals after that, so they're `git rm`'d (per the image-versioning convention).
- **BioLink modal, keyboard walk.** The walk found real problems, all fixed:
  1. **Asterisks in the popups on the 24 subject pages.** Those pages carry their own copy of the modal, which inserted the bio as plain text, so every `*Title*` showed its asterisks. The last check missed it because popup text isn't in the static page. Both modals now render italics.
  2. **Focus.** Opening a popup left focus on the link behind it, and Tab walked the page underneath. It now matches the hub essay modal: focus moves to Close, Tab and Shift+Tab stay inside, Escape closes, and focus returns to the link that opened it. The dialog is labelled by the person's name.
  3. **Long bios on phones (already on the live site).** The panel had no height limit. On a phone a long bio (Marx, for example) ran off both ends of the screen with no way to scroll, so the name, the Close button and the end of the text were unreachable. The panel now fits the screen and scrolls; PageDown and the arrow keys scroll it from the keyboard.

## Round 3 changes
- **CLAUDE.md:** added that book-length works stay italic even if first serialized, numbered or generic titles are roman, the excerpt pattern, and that music card titles take `*...*` markup.
- **Writing guide:** your rule added as **rule 33**, under a new "VII. Typography" heading. The repo's `Writing_and_Editing_Guide.md` ends at rule 32, and the Desktop copy (Summer Reading Site Materials) ends at 33, so I couldn't find the copy that ends at 41. Renumber to 42 when you merge it into your current guide. The text is yours, plus three ✓ examples in the guide's format.
- **Music card titles.** These are now roman by default, with italics only where marked. Every title on the six music pages, Compare and Hearing Through Form:

| Unit | Titles as rendered |
|---|---|
| Medieval | "Ave Maris Stella" · "Dies Irae" · *Viderunt Omnes* |
| Renaissance | *Sicut Cervus* · *Ave Maria...virgo serena* · *Spem in Alium* · "Morir non può il mio core" · "As Vesta Was from Latmos Hill Descending" |
| Baroque | Toccata and Fugue in D Minor, BWV 565 · *L'Orfeo*: the Messenger's scene and "Tu se' morta" · *Messiah*: "Hallelujah Chorus" · *The Four Seasons*: "Winter," first movement · "Lagrime mie" · *Dido and Aeneas*: "Dido's Lament" |
| Enlightenment | *Eine kleine Nachtmusik*, K. 525, first movement · String Quartet in C Major, Op. 33 No. 3 ("The Bird"), first movement · *Le nozze di Figaro*: "Sull'aria" (the letter duet) · Keyboard Sonata, Piano Concerto No. 21, Symphony No. 40, Symphony No. 94 ("Surprise"): all roman |
| Romanticism | Symphony No. 5 … (roman) · "Der Erlkönig" · Piano Trio … (roman) · *The Hebrides* (*Fingal's Cave*), Op. 26 · *Nabucco*: "Va, pensiero" · Prelude to *Tristan und Isolde* · *Symphonie fantastique*, V: "Songe d'une nuit du sabbat" |
| Modernism | *The Rite of Spring*: "Augurs of Spring" · *Black, Brown and Beige*: "Black" section · *Pierrot Lunaire*, No. 8: "Nacht" (Night) · *The Rite of Spring*: Introduction to Part I |

  Judgment calls for you to check:
  - "Ave Maris Stella" (a hymn) and "Dies Irae" (a sequence from the Requiem Mass) are treated as songs/excerpts.
  - The madrigals and Strozzi's "Lagrime mie" are treated as songs.
  - Numbered works with nicknames keep the nickname in roman quotes ("The Bird", "Surprise").
  - Eight card titles that were italic before are now roman under the generic-title rule: Toccata and Fugue, String Quartet Op. 33 No. 3, Keyboard Sonata, Piano Concerto No. 21, Symphonies No. 40, 94 and 5, and the Piano Trio.
- **Guide pages:**
  - *The Rite of Spring*: "Augurs of Spring" and "Farben" (Schoenberg, Op. 16 No. 3) are now in quotes and roman, in work labels, clip titles and source notes.
  - "Five Pieces for Orchestra" stays roman as a generic title.
  - The jazz recordings ("The Charleston", "St. Louis Blues", "Dippermouth Blues", "Gut Bucket Blues") were italic and are now in roman quotes.
- Screen-reader labels, image alt text and player titles use the plain title, without asterisks.

## Verification (final build)
- Re-run after round 4. Build passes; 0 console errors on 16 pages (the original 12 plus Romantic Music, Romantic Philosophy, Listening Studio and Credits) at 1440 and 375.
- Rendered-text diff against the original baseline: ignoring quote glyphs and asterisks, the only differences are the approved ones (B4 label, "Menu", hidden empty pager entries, "Der Erlkönig" → "Erlkönig"). The text inside the protected sections (What to Notice, What to Listen For, thread core arguments) is unchanged apart from quote glyphs and italics.
- No horizontal scroll at 375px on the 16 pages.
- Contrast unchanged: everything passes except the decorative breadcrumb `/` and People `·` separators (2.41:1). They failed before this pass and are listed as new issues.
- Keyboard walk: focus ring visible on the desktop header, mobile menu, domain tabs and gallery toggles.
- BioLink modal walk at 1440 and 375 (Baroque Philosophy, People): Enter opens; focus lands on Close with a visible ring; six Tabs and a Shift+Tab stay on Close; Escape closes and returns focus to the link; Enter reopens. PageDown scrolls a long bio at 375×700.
- BioLink sweep: every popup on every AP page (320 popups on 23 pages) was opened. None shows an asterisk or a straight quote; each moves focus to Close and returns it to its link on Escape.

## Not fixed, for later
- The decorative separators' contrast (2.41:1).
- The reading lists (all six philosophy units) aren't shown on any page, because the layout that held them is retired. Whether to bring them back is a design question for Phase 2.
- The subject pages still carry their own copy of the BioLink modal, alongside the shared one in `Layout.astro`. Both now behave the same, but merging them into one would stop them drifting apart again. That's a small refactor for later.

---

# Working log (rounds 1–4; round 4 is summarized above)


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

## Round 2 follow-ups

**C6.** The rule between sigil and play button is removed, and the strip is rolled out to all 32 music embeds on the six music pages (3, 5, 6, 7, 7 and 4 per page; no YouTube thumbnails remain).
- No other music entries needed it: the Listening Studio and the Modernism listening guides use native audio players, and Compare uses its own play disc, with no thumbnails.
- Screenshots: `.polish/c6-rollout-02-baroque-featured-1440.png`, `c6-rollout-02-baroque-gallery-375.png`, `c6-rollout-05-modernism-featured-1440.png`, `c6-rollout-05-modernism-gallery-375.png`, plus the other widths.

**B3, publication-based rule.** Changes:
| Where | Now | Why |
|---|---|---|
| BioLink: Emerson | *Nature* | standalone volume |
| BioLink: Sartre | *Existentialism Is a Humanism* | standalone volume |
| Romanticism Philosophy prose | Shelley's "Defence of Poetry" (markup only) | published in a collection |
| Hub epigraph, Romanticism | Hamann, "Aesthetics in a Nutshell," 1762, roman | published in a collection (comma moved inside, matching Wordsworth) |
| Hub epigraph, Romanticism | "A Preface to *Lyrical Ballads*," | the volume title is italic inside the quoted preface |
| BioLink: Melville (2×) | "Benito Cereno" | serialized in *Putnam's*, then collected; never a standalone volume |
| BioLink: Marx | *Rheinische Zeitung* | periodical (it was left roman earlier as unsure) |
Kept: Kant and Shelley in quotes; Ode to Joy in quotes (Schiller published it in his journal *Thalia*); Der Erlkönig in quotes (song); motets, organa, masses, operas and symphony titles italic; *Flowers of Evil* italic.
Hub epigraphs now take `*Title*` markup for italics; the other ten attributions render exactly as before.

Still for you to decide:
- Schiller's *Letters on the Aesthetic Education of Man* first appeared in his journal *Die Horen*. It is conventionally italicized as a book, so I left it.
- *Notes from Underground* first ran in a journal but was later issued as a standalone volume, so it stays italic.
- "Ninth Symphony" (a numbered, generic title) stays roman.

CLAUDE.md now states the convention.

Noticed, not changed: music card titles that name an excerpt set the whole line in italics, quoted movement included (for example "The Rite of Spring: 'Augurs of Spring'", "L'Orfeo: … 'Tu se' morta'"). Under the rule the quoted excerpt would be roman. This needs the card-title markup to support mixed styles.

Re-verified: 0 console errors, no horizontal scroll at 375. The text diff shows only approved categories plus the quote changes above.
