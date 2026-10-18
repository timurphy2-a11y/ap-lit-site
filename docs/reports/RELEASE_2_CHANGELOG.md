# Release 2 changelog: design-system conformance (branch `design-system`, preview alias `design`)

Production is unchanged by this release. Release 1 was merged and deployed first (version d568e8df).

## Read this first
- **`AP Literature Design System - Reference.md` was not on disk** (only the Amendments file was). Everything below follows the brief and the Amendments. Two things that depend on the Reference could not be taken from it and need Tim's check: the **domain colors (section 3.5)** and the **section 12 token block / Google Fonts link**. I used interim values (below) and the fonts list the brief describes.

## Items
| Item | Done | Notes |
|---|---|---|
| 2.1 One token source | Yes | `src/styles/design-tokens.css` replaces the three `:root` blocks (Layout and both unit templates, which keep only layout variables such as gutter). Dark-mode tokens removed. `box-sizing`, body and heading defaults live there. |
| 2.2 Display type | Yes | Cormorant Garamond 500 for H1-H3 (600 for H4), including prose h2 (the synthesized-700 problem is gone). Cormorant 300 stays loaded only for large numerals and drop caps. |
| 2.2 Body type | Yes | EB Garamond 18px / 1.65 / `--ink-mute` on prose, ledes, descriptions, bio panels and the bio modal. Measured on all 47 routes: paragraphs render EB Garamond (secondary text 14-17px, also EB Garamond). Exceptions that stay Cormorant: pull quotes (out of scope) and a few epigraph/quote lines. |
| 2.2 Spectral | Yes | Removed (fallback list only). |
| 2.2 Fonts link | Yes | Cormorant 300/400/500/600 + italics, EB Garamond 400/500 + italics, Plex Sans 300-600, Plex Mono 400/500; no 700. |
| 2.2 Nav 14px | Yes | 14px everywhere. At 375px the five links fit on one row on a real 375px screen (314px of 327px); inside a desktop browser with a scrollbar the row wraps to a third line. |
| 2.2 Final-word italics | Yes | Removed on all ten h1s in the brief; measured 0 `h1 em` on all 47 routes. Decorative heading italics (Looking Back/Forward arc heads, modal title, domain buttons) are upright. |
| 2.2 Subject tabs | Untouched | as instructed |
| 2.3 Text-safe accents | Yes | `--acc-{period}-text` tokens, default `--acc` = #815D00; used for numerals, dates, breadcrumbs, mono tags, eyebrows, drop caps, BioLinks and callout labels. Original accents stay for ticks, rules, fills. Overview domain buttons now fill with the text variant so the cream label passes. |
| 2.3 Domain colors | Interim | Text colored by a domain color uses these interim darker steps (>=4.6:1 on `--bg-raised`): philosophy #3A332B / #5A5046 / #6A6155; painting #75435B / #8A5267 / #8B5266; sculpture #4F6B4D / #4F6A50 / #516858; music #574878 / #6C5B90 / #695C90. The original steps remain for icons, stripes, tints. **Replace with the Reference's section 3.5 values when available.** |
| 2.3 Breadcrumb separators | Not changed | `--rule-strong` separators measure 2.41:1. They are decorative glyphs beside the readable text. Tim to decide whether to darken them; I did not. |
| 2.3 Artist stamps | Yes | Removed from hero and gallery images; the artist already appears in the caption byline, now `--ink-mute`. |
| 2.4 Definite cuts | Yes | See the label inventory below. |
| 2.4 Sigils | Yes | Subject-page boxed sigil removed. Utility, survey, studio and guide page sigils are unboxed and modest. The homepage resource cards keep their filled seals (not utility pages), and thread sigils on survey pages stay (they are thread icons). |
| 2.4 Numbering | Yes | Lens, room, study and card numerals removed; unit numerals 00-05 kept. Musical Forms' period numerals (Medieval = 01) contradicted the unit numerals, so they went. Work-select buttons in the Comparison Lab lost their leading "1 ·" etc. |
| 2.4 Looking Studio listing | Yes | Gloss and the Painting / Sculpture lines exactly as specified; "Composition & genre" and its CSS removed; file comment updated. "before you know who painted it" existed only in `StudioDiptych` (the studio page itself had none). |

## Verification (dev server, then built)
- **Contrast (computed, 47 routes, 6,160 text runs, canvas-normalized colors, text over background images not sampled):** after fixes, 0 failures on the final re-run of the affected pages; first pass found and I fixed: BioLink text, thread-box titles, "Read the period" button, Modernism-listening "Begin" buttons (link color overrode the button text), survey card small print.
- **Phone width:** no horizontal overflow on any of the 47 routes at 375px (Timeline and People fixed in Release 1).
- **Fonts and headings:** all H1/H2 render Cormorant 500; Timeline entry titles (109 H3s were Plex Sans) now Cormorant 500.
- Visual spot checks (screenshots): Renaissance Painting, Home, Baroque overview, Looking Studio, People, Enlightenment Music.
- Not done: the seven specific pages Tim should judge are listed in the brief; I did not do pixel comparison against the previous version, and text over background images (heroes) was not contrast-sampled (stamps are gone).

## Files
Layout and templates: `src/layouts/Layout.astro`, `src/pages/units/[unit]/index.astro`, `src/pages/units/[unit]/[domain].astro`, new `src/styles/design-tokens.css`, `src/styles/global.css`. Components: `SiteHeader`, `BioLink`, `BiographyPanel.jsx`, `Plate`, `YouTubeEmbed`, `SlowDownCallout`, `StudioDiptych`. Pages: `index`, `timeline`, `people`, `compare`, `guides`, `credits`, the three surveys, and every page under `guides/`.

## Label inventory (page, text, kept or cut, reason)
Three of these tables were produced by the sub-agents that edited those files; I checked samples against the code but not every row.

### Unit overview and subject pages
| page | text | kept or cut | reason |
|---|---|---|---|
| unit overview | "Unit" in breadcrumb/meta ("Unit 01 · ...", "Unit · Anchor: X") | cut | A3: 'Unit' beside a numeral |
| unit overview | frieze right label "Unit NN · Period" | cut | repeats the unit header directly above |
| unit overview | "The Four Domains" frieze title | kept | names the section (renamed from Four Threads) |
| unit overview | "Visual Art" eyebrow on Painting and Sculpture buttons (x2) | cut | repeats the button label; when in doubt cut |
| unit overview | "Open thread" on four domain buttons | changed to "Open domain" | domains are not threads (A1) |
| unit overview | "The Period" eyebrow on the Historical Moment bar | cut | repeats "Read the period" and the phrase |
| unit overview | "The Period in One Phrase" modal label | cut | repeats the heading below it |
| unit overview | "Historical Moment" section label | kept | names the section |
| unit overview | pager "Unit 03" label | changed to "Next" | 'Unit' beside numeral; matches Previous |
| unit overview | footer "Unit NN of 06" | changed to "NN of 06" | A3 |
| subject pages | "Thread I · Philosophy" ... "Thread IV · Music" label | cut | domain called a thread; repeats tab and heading |
| subject pages | boxed 88px sigil in heading block | cut | selected tab already shows it (A7) |
| subject pages | breadcrumb "Unit 01 · Period" | changed to "01 · Period" | A3 |
| subject pages | unit strip "Unit · Anchor: X" | changed to "Anchor: X" / "Foundation" | A3 |
| subject pages | pager "Previous thread"/"Next thread" | changed to "Previous domain"/"Next domain" | vocabulary (A1) |
| subject pages | pager "Unit NN Overview" | changed to "{Period} overview" | A3 |
| subject pages | artist stamp overlaid on hero and gallery images | cut | duplicated the caption byline (now ink-mute); failed contrast on 9 of 12 heroes |
| subject pages | analysis eyebrow prefixes "Close looking ·" (48) and "Listen for ·" (32) | cut at render (frontmatter text untouched) | boilerplate repeated on every panel; the part after it carries the information |
| subject pages | "Read the analysis" button | kept | the control's own label |
| subject pages | slow-down callout eyebrows "This period / Foundations / Deeper" and "Slow down and look/listen" | kept | they say what kind of link each is |
| subject pages | unit numeral in breadcrumb and unit strip (00-05) | kept | chronology and course numbering |

### Home, Timeline, People, Compare, Guides, Credits, StudioDiptych
| page | text | kept or cut | reason |
|---|---|---|---|
| index | "§ I" / "§ II" / "§ III" numerals | cut | A3: § numerals retired on homepage |
| index | "The Six Units", "Cross-Cutting Guides", "The Studios" | kept as plain h2 | section titles |
| index | "1000 – 1950" (right of Six Units) | cut | dates already on every card; when in doubt cut |
| index | "Read across, not down" | cut | restates the title |
| index | "Learn once, use everywhere" | cut | restates the title |
| index | card "UNIT" under numeral | cut | "Unit" beside two-digit numeral retired |
| index | card numerals 00-05 | kept | chronology |
| index | card dates (mono) | kept | necessary info |
| index | "Foundation unit" | kept | states the absence of an anchor text |
| index | resource kind tags Timeline / Index / Method / Visual Art / Music / Sculpture | cut | each restates its title |
| index | epigraph attribution | kept | cites the source |
| index | footer colophon / Image Credits | kept | navigation and credit |
| timeline | "§ I · Shared resource · Historical context" | cut | restates heading/breadcrumb |
| timeline | "Anchor text" (AP row) | kept | explains why the row is distinct |
| timeline | "AP Lit" badge | cut | repeats "Anchor text" |
| timeline | "Unit 03 · Enlightenment" | changed to "03 · Enlightenment" | "Unit" beside numeral retired |
| timeline | type chips POL/PHIL/PAINT/SCULP/MUSIC | kept | only place entry type is stated |
| timeline | filter pills | kept | controls |
| timeline | legend "Period bar" | cut | items name the periods |
| timeline | legend period names | kept | key to bar colors |
| timeline | "Read historical context · →" | kept | action link |
| people | "§ II · Shared resource · People" | cut | restates heading |
| people | group name + anchor (Hamlet etc.) | kept | anchor text adds information |
| people | role / dates in cards | kept | necessary info |
| people | filter pills | kept | controls |
| compare | "§ III · Cross-era comparison" | cut | restates heading |
| compare | card "UNIT" under numeral | cut | retired |
| compare | card numerals, period name, dates | kept | identify the card |
| compare | caption-by (artist / composer) | kept | attribution |
| compare | subhead subtitle (per-subject sentence) | kept | explains selection |
| guides | "§ IV · Shared Resource · All Six Periods" | cut | restates heading/breadcrumb |
| guides | "§ I / § II / § III" numerals | cut | A3 |
| guides | "Learn once, use everywhere" | cut | tier-note carries it |
| guides | "One period, one problem" | cut | tier-note carries it |
| guides | survey kind tags Visual Art / Music / Sculpture | cut | restate titles |
| guides | period tag (Modernism / All periods) | kept | period identification |
| guides | "From Modernism · Music" / "From The Looking Studio" | kept | source info |
| guides | tier-notes | kept | explanatory prose |
| credits | "Shared Resource" eyebrow | cut | retired label |
| credits | section h2s (Sculpture Photographs...) | kept | headings |
| StudioDiptych | "Studio I · Ear", "Studio II · Eye" | cut | retired prefixes |
| StudioDiptych | room numbers 01/02 | cut | not a sequence |
| StudioDiptych | "in progress" tag + Composition & genre room | cut | removed per spec |
| StudioDiptych | "No music training required" / "No art history required" | kept | necessary info for students |
| StudioDiptych | Looking Studio two lines Painting / Sculpture | kept | per spec |

### Surveys, Looking Studio, Looking at Modern Art
| page | text | kept or cut | reason |
|---|---|---|---|
| seeing/sculpting/hearing | eyebrow "§ IV · Shared Resource · Visual Art / Sculpture / Music" | cut | "Shared resource" retired; § label repeats heading |
| seeing/sculpting/hearing | "Thread · [Thread name]" above each thread h2 | cut | repeats the h2 |
| seeing/sculpting/hearing | thread nav button labels (Figure & Space, etc.) | kept | navigation to anchors |
| seeing/sculpting/hearing | card numerals 00-05 | kept | unit numerals required |
| seeing/sculpting/hearing | card dates (mono) | kept | information |
| seeing/sculpting/hearing | card artist/composer line (mono) | kept | credits the work shown |
| seeing/sculpting/hearing | "Full [period] unit →" | kept | link call to action, not a label |
| seeing/sculpting/hearing | "The story this thread tells" (bold run-in) | kept | run-in lead of editorial prose, not a label tag |
| seeing/sculpting/hearing | "← Home" footer link | kept | navigation |
| looking-studio | eyebrow "An Element · Looking Fundamentals" | cut | repeats breadcrumb and heading |
| looking-studio | tagline "One visual habit, twelve ways of looking" | kept | tagline; the "before you know who painted it" copy is not on this page, so no replacement |
| looking-studio | overview numerals 01-06 (.onum) | cut | lens group numbering (A4) |
| looking-studio | lens kind "NN · Painting/Sculpture" | changed to "Painting"/"Sculpture" | number cut; kind distinguishes the two same-named Space lenses |
| looking-studio | track-head "Starting from painting / sculpture" | kept | distinguishes the two groups |
| looking-studio | track note "Six lenses · any order" (x2) | cut | lede already says twelve starting points, not a sequence |
| looking-studio | othread tag on each card (Figure & Space etc.) | kept | links lens to the site's threads; also feeds detail bar via script |
| looking-studio | detail-bar thread name (#dThread) | kept | script-populated; states thread of open lens |
| looking-studio | "How to look" study label | kept | heading of the orienting block |
| looking-studio | "One habit, before the lenses" | cut | repeats "How to look" and the page tagline |
| looking-studio | "Created illustration" (x12) | kept | provenance: separates created images from real artworks |
| looking-studio | "In Real Art" kicker (x12) | cut | work title and artist/date line already show it is a real artwork |
| looking-studio | "Look again..." caption labels | kept | marks the post-guide reading; some carry view information |
| looking-studio | "Takeaway concept/connection" label (x16) | cut | repeats the toggle button that reveals it |
| looking-studio | detail labels (e.g. "Smooth handling · vessel detail") | kept | identify the crop |
| looking-studio | "Arrangement A/B" | kept | referred to in prose |
| looking-studio | "Continue · One Step Further" | cut | decorative; link title states destination |
| looking-studio | footer "The Looking Studio / Seeing Pictures" | cut | repeats heading/breadcrumb |
| looking-studio | breadcrumb, colophon, Image Credits | kept | navigation / attribution |
| looking-modern-art | eyebrow "Room Two · Modernism · Looking at conventions anew" | cut | repeats breadcrumb and heading; room numbering |
| looking-modern-art | overview numerals 01-04 | cut | lens numbering |
| looking-modern-art | lens index "NN · Room Two" (x4) | cut | numbering plus repeated room label |
| looking-modern-art | track note "Any order · exploration, not progression" | cut | no sequence is implied |
| looking-modern-art | track-head "Four studies" | kept | heading of the card grid |
| looking-modern-art | othread tags | kept | thread links |
| looking-modern-art | "Created illustration" (x4) | kept | provenance |
| looking-modern-art | "In Real Art" (x4) | cut | work title/meta show it |
| looking-modern-art | "Look again..." labels | kept | marks the reading after the guide |
| looking-modern-art | "Takeaway concept/connection" labels | cut | repeats the toggle |
| looking-modern-art | "Created title for this pair:" title-cue | kept | necessary information |
| looking-modern-art | footer "Looking at Modern Art / Room Two" | cut | repeats heading |
| looking-modern-art | breadcrumb, colophon | kept | navigation / attribution |

### Listening Studio, Musical Forms, Comparison Lab, Modernism listening guides
| page | text | kept or cut | reason |
|---|---|---|---|
| modernism-listening/index | "Shared Resource · Modernism" eyebrow | cut | definite cut; repeats breadcrumb |
| modernism-listening/index | h1 `<em>Two Paths</em>` italic | cut (italic) | A8 |
| modernism-listening/index | path-idx "01 ·"/"02 ·" numerals (descriptor text kept) | cut numerals | lens-group numbering |
| modernism-listening/index | study-list "01/02/03/04" numbers (7) | cut | numbering, not referenced by prose |
| modernism-listening/index | footer "Shared Resource / Modernism Listening" | cut | definite cut |
| modernism-listening/index | meta-row "Two dedicated listening paths · 7-10 minutes each..." | kept | adds duration information |
| modernism-listening/index | crosswalk heads "Listening move"/"Reading move" | kept | column headers |
| modernism-listening/index | boxed 56px path glyphs, 72px page sig | restyled unboxed 36px / 40px | A7 |
| blues-jazz | eyebrow "Path One · Modernism Listening" | cut | repeats breadcrumb |
| blues-jazz | onum 01-03 on cards | cut | numbering |
| blues-jazz | lens-idx "01 · Groove" etc (3) | kept as lens name, numeral cut | name not otherwise stated in detail view |
| blues-jazz | card othread "Structure & Freedom" etc (3) | kept | names the thread; not stated elsewhere |
| blues-jazz | detail-bar dthread (script-filled thread name) | cut (hidden by CSS; element and script kept) | repeats selected card |
| blues-jazz | rm-tag "Isolate the relationship" (3), "Hear it in a historical performance" (4) | kept | distinguishes the two modes |
| blues-jazz | takeaway tk-lbl "Takeaway" + term chip (4) | kept | term chip adds the concept name |
| blues-jazz | connection-label "Optional extension · Texture" | cut | repeats reveal button |
| blues-jazz | instrument-label (alto saxophone, trumpet) | kept | legend |
| blues-jazz | footer "Modernism Listening / Blues & Jazz" | cut | repeats breadcrumb |
| blues-jazz | boxed 56px lens-sig; 72px page sig | restyled unboxed 40px | A7 |
| modernist-concert | eyebrow "Path Two · Modernism Listening" | cut | repeats breadcrumb |
| modernist-concert | onum 01-04 | cut | numbering |
| modernist-concert | lens-idx "01 · Ostinato" etc (4) | kept as name, numeral cut | as above |
| modernist-concert | othread (4) | kept | as above |
| modernist-concert | dthread | cut (hidden) | as above |
| modernist-concert | rm-tag "Isolate the element" (4), "Hear it do structural work" (5) | kept | distinguishes modes |
| modernist-concert | tk-lbl "Takeaway" + term (4) | kept | term adds info |
| modernist-concert | connection-label "Optional extension" | cut | repeats reveal button |
| modernist-concert | footer "Modernism Listening / Modernist Concert Music" | cut | repeats breadcrumb |
| cross-period | eyebrow-strip "The Looking Studio · Cross-Period Comparison Lab" | cut | repeats breadcrumb and h1 |
| cross-period | eyebrow-strip "Recurring Subjects" (bank-divider) | cut | repeats h2 |
| cross-period | onum 01-06 | cut | numbering |
| cross-period | lens-idx "C1 · Rank or Distance?" etc (6) | kept as module name, "C1 ·" cut | names module |
| cross-period | lens-idx "Recurring Subjects · Understanding X" (3) | kept "Understanding X", prefix cut | prefix repeats divider |
| cross-period | othread (6) | kept | domain/thread not stated elsewhere |
| cross-period | study-label "Controlled study" (9) | kept | distinguishes illustration from historical evidence (lede refers to it) |
| cross-period | arc-divider "In Real Art" (9) | kept | lede says a rule marks the shift |
| cross-period | ra-kicker "In Real Art" (9) | cut | repeats arc-divider |
| cross-period | tk-lbl "Takeaway concept/connection" (18) | cut | repeats the toggle button text |
| cross-period | cap-label (Look again, Visible relation, Source context, Four general relations, Three roles, Three placement relations; 49) | kept | caption headings with distinct content |
| cross-period | scene-label "Scene A/B" (11) | kept | referenced by the look prose |
| cross-period | work-select "1 · Brueghel" etc (27) | numerals cut, names kept | prose does not refer to numbers |
| cross-period | guide-key markers "1 · Recession" | kept | match numbered markers on the image |
| cross-period | work-meta / object-meta / image-label | kept | provenance information |
| cross-period | sigil-lg 88px boxed | restyled unboxed 40px | A7 |
| listening-studio | eyebrow-strip "An Element · Listening Fundamentals" | cut | repeats breadcrumb/heading |
| listening-studio | onum 01-06 | cut | lens numbering |
| listening-studio | lens-idx "05 · Rhythm" etc (6) | kept as lens name, numeral cut | |
| listening-studio | othread (6) | kept | names the thread |
| listening-studio | dthread | cut (hidden) | repeats selected card |
| listening-studio | rm-tag "Basic concept"/"In real music" (9) | kept | distinguishes modes |
| listening-studio | tk-lbl "Takeaway" (6) | kept | unsure; names what the box is |
| listening-studio | vtag Full/A/B (5) | kept | identifies variant |
| listening-studio | c-lbl "Room two · continue" | cut | sequence label, repeats card title |
| listening-studio | anchor-cell .per period names (4) | kept | content |
| listening-studio | footer "The Listening Studio / Hearing Music" | cut | repeats breadcrumb |
| listening-studio | sigil-lg 88px, lens-sig 56px boxed | restyled unboxed 40px | A7 |
| musical-forms | eyebrow "The Elements · A Listening Guide" | cut | repeats breadcrumb |
| musical-forms | meta-row "29 recordings · 6 periods..." | kept | information |
| musical-forms | pn-num 00-06 (7) | cut | numbering; conflicted with unit numerals (Medieval was 01) |
| musical-forms | primer-tagline "Before the timeline..." | cut | restated by h2 and setup text |
| musical-forms | chapter-eyebrow "Period 0N · ..." | numerals cut; Medieval "c. 1000-1400", Renaissance "Renaissance & Reformation", Enlightenment "Classical style" kept; Baroque/Romanticism/Modernism cut | remainder repeated the chapter title |
| musical-forms | hero-marker "Hero form · X" (5) | cut | repeats rm-tag "Hero study" and rm-work |
| musical-forms | hero-marker "Step one/two" (2) | kept | real sequence the primer follows |
| musical-forms | hero-marker "Two Modernist answers · coequal" | kept | information |
| musical-forms | rm-tag "Listening study" (17) | cut | generic, every embed |
| musical-forms | rm-tag "Hero study" (5), "The theme", "Answer one/two" | kept | distinguishing |
| musical-forms | section-label "Related form(s) · grouped by function" (6) | "· grouped by function" cut, "Related form(s)" kept | heads collapsed list |
| musical-forms | fn-group (18), rf-fn chips (18) | kept | grouping and classification content |
| musical-forms | cue-lbl "Listen for" (6) | kept | frames the instruction |
| musical-forms | bridge strong "Into the timeline"/"Bridge forward" (6) | kept | unsure; could be cut |
| musical-forms | ab-tag, ss-lbl "The theme at a glance" | kept | identify rows and sketch |
| musical-forms | s-eyebrow "Closing synthesis" | cut | restated by h2 |
| musical-forms | footer "Musical Forms - simplified listening models, not scores" | kept | disclaimer |
| musical-forms | chapter-sig 64px boxed, page-sig 72px | restyled unboxed 40px | A7 |

## Unsure (agents' notes, for Tim)
- "Takeaway" labels kept on Listening Studio, Blues & Jazz and Modernist Concert, and "Bridge forward" labels on Musical Forms; they could go under the rule.
- `elements-hearing-music.html` exit link on Musical Forms is broken (existing; untouched).
- Tiny 9-10px mono tags remain on some guide pages; the audit passes them but they are very small.
- The "Visual Art" domain pill on Compare is kept to match the page structure.

## Follow-up (after the Design System Reference v2 arrived)
- Domain colors now follow section 3.5 exactly (Mid / Dark / Light): `DOMAIN_THREAD_COLORS` in `[domain].astro` uses rows Mid, Dark, Light; text uses Mid or Dark only (`DOMAIN_TEXT_COLORS` = Mid, Dark, Dark). Compare's `FAMILIES`, the survey, studio and Comparison Lab pages, and Timeline were mapped to the spec values; the interim values are gone.
- `--dom-philosophy/-painting/-sculpture/-music` and `--acc-text` added to `design-tokens.css`.
- Fonts link now matches section 12 (no Cormorant 300, no Plex Sans 300); the remaining weight-300 numerals and titles on the unit templates are weight 500.
- Deliberate difference from section 12: `--acc` stays the text-safe gold (#815D00) rather than #C9A24B, because many pages use `--acc` as a text color; `--acc-text` exists alongside it.
- Contrast re-audit on all 47 routes: one failure (Sculpting Through Time tab label, 4.33), fixed by using the Dark step.
