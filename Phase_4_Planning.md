# Phase 4: Content Expansion Within the Three-Domain Structure

## Overview

Phase 4 enriches the site while preserving its three-domain structure (Philosophy, Visual Art, Music). Rather than adding new top-level domains — which risks making unit pages unwieldy and diluting the analytical focus — this phase expands the existing domains from within, adds a lightweight historical-context component, and restructures unit pages around a hub model that keeps the site navigable as it grows.

### The Four Components

1. **Unit page restructure: the hub model** — Unit pages become landing pages that link out to separate domain pages, rather than a single long scroll containing everything. This is a prerequisite for the content additions below and also benefits the existing content.
2. **Editorial conciseness pass** — A 15–20% reduction in existing content length, focused on redundancies between introductions and thread sections, overly long "Connection to" subsections, and "Looking Back/Forward" sections that recapitulate earlier points.
3. **Science as a sub-domain of Philosophical Context** — nested alongside the existing philosophy material, with its own three analytical threads, on its own page.
4. **Sculpture as a sub-domain of Visual Art Context** — nested alongside the existing painting material, with its own three analytical threads, on its own page.
5. **"Historical Moment" pop-ups** — short, focused scene-setting pieces on each unit's landing page, covering the seismic events that define each era's political and emotional temperature.
6. **Writing Guide editorial pass** — A comprehensive review of all existing site content (Philosophy, Painting, Music pages across all six units; shared resources "Seeing Through Paint" and "Hearing Through Form") applying the `Writing_and_Editing_Guide.md` rules systematically. Sculpture pages are excluded — they were drafted and revised against the guide directly. The pass proceeds in two stages: Claude applies the guide and produces revised output files; Tim reviews and makes a final pass before implementation. This component was added after close editorial work on the sculpture pages revealed that the Writing Guide's 32 rules, derived from that process, would meaningfully improve existing content written before the guide existed. **Scope**: 18 narrative content files (6 units × 3 domains, excluding sculpture), plus the two cross-period shared resources. **Sequence**: This pass should happen after the sculpture sub-domain is complete and before Science (4d) is drafted, so that Science pages can be drafted to the guide standard from the outset rather than requiring a retrospective pass.

### The Hub Model

The current site presents each unit as a single long page with three domain sections accessed by tab-style scroll anchors. This works for three sections, but adding sub-domains would make the scroll unmanageable. Phase 4 restructures unit pages as hubs:

```
Unit 04: Romanticism (landing page / hub)
├── Period introduction (brief — 1–2 paragraphs)
├── Historical Moment pop-up trigger ("The World Remade")
├── Analytical threads summary (the one-line summaries for all threads)
│
├── Philosophical Context (card/link group)
│   ├── Philosophy → separate page
│   └── Science → separate page
│
├── Visual Art Context (card/link group)
│   ├── Painting → separate page
│   └── Sculpture → separate page
│
└── Music Context → separate page
```

Each domain page (Philosophy, Science, Painting, Sculpture, Music) contains the full content currently found in that section — introduction, three thread analyses with "Connection to" subsections, "Looking Back/Forward," thread summaries, readings/gallery/listening — at approximately 80% of current length after the editorial pass.

**Why the hub model works:**
- Students aren't scrolling through 10,000+ words on a single page
- Each domain page can breathe at its current depth without competing for space
- Sub-domain navigation becomes obvious: two links under "Philosophical Context" instead of one
- The pattern mirrors how the shared resources (Seeing Through Paint, Hearing Through Form) already work — separate linked pages
- Students who want to read one domain can go straight there; students who want the overview stay on the hub
- The hub page itself becomes lightweight and scannable, with the thread summaries providing a quick-reference overview of the entire unit

**What students lose:** The ability to scroll continuously from philosophy through art through music on a single page, which can create a sense of intellectual connection between domains. This is a real tradeoff. However, cross-domain connections can be maintained through the "Threads Across Time" comparison tool (which already does this job) and through explicit cross-references in the "Looking Back/Forward" sections.

### The Editorial Pass

Phase 4 includes a systematic review of all existing content to reduce length by approximately 15–20%. This is not about cutting substance — the analytical threads and "What to Notice" / "What to Listen For" sections are the site's core and should be preserved. The pass targets:

- **Redundancy between introductions and thread sections**: If the introduction already explains the Romantic sublime, the "Figure & Space" section doesn't need to re-explain it.
- **Overly long "Connection to [anchor text]" subsections**: These sometimes make their point and then elaborate with additional examples. Tightening to two or three strong sentences per connection would often improve focus.
- **"Looking Back, Looking Forward" sections**: Valuable but sometimes recapitulate points already made in the thread sections. Aim for two tight paragraphs rather than three or four.
- **Overlapping content between unit pages and shared resources**: The unit art pages and "Seeing Through Paint" sometimes cover the same ground. With the hub model sending students to separate pages, this overlap becomes more visible and should be resolved.

The editorial pass should happen *before* new content is written, so that the Science and Sculpture pages are drafted to match the tighter standard rather than the current more expansive one.

**See `Writing_and_Editing_Guide.md`** for the full set of writing and editing principles derived from Phase 4c drafting work. All new content should be written to this standard from the outset.

---

## Historical Moment Pop-Ups

### Rationale

Historical context currently lives implicitly across the philosophy pages, the timeline, and the biographical index — and that distributed approach is working. A full fourth analytical domain would risk overwhelming unit pages and, worse, could encourage students to treat "history" as the real content and philosophy, art, and music as illustrations of it. That's exactly backwards from this course's design philosophy.

But students do benefit from a quick, vivid sense of what the world felt like in each period — especially the ruptures and crises that created the conditions for the intellectual and artistic responses the site analyzes. A short pop-up or modal on each unit's landing page provides this scene-setting without claiming structural parity with the three analytical domains.

### Design Concept

Each unit landing page includes a clickable element (button, card, or banner — exact UI to be determined in implementation) that opens a brief **"Historical Moment"** pop-up. These are short (300–500 words), vivid, and focused on the one or two seismic events that define the era's political and emotional temperature. They are entry points, not analytical essays — a student who's struggling with why Milton's Satan feels so desperate might click the Baroque pop-up and suddenly understand the Thirty Years' War context, while a student who doesn't need that scaffolding can skip it entirely.

### Unit-by-Unit Content

| Unit | Title (Working) | Focus |
|------|----------------|-------|
| 00 Medieval | "The World Holds" | The relative stability of the medieval order — and the cracks appearing at the edges (the Black Death, the Great Schism) |
| 01 Renaissance | "The World Splits" | The Reformation and the wars of religion — Christendom divides and the question of authority becomes lethal |
| 02 Baroque | "The World in Crisis" | The 17th-century crisis — the Thirty Years' War, the Little Ice Age, the English Civil War; upheaval behind the grandeur |
| 03 Enlightenment | "The World Shakes" | The Lisbon earthquake and the revolutions — nature's indifference, then political transformation (American and French Revolutions, Napoleon) |
| 04 Romanticism | "The World Remade" | The Industrial Revolution and its discontents — mechanization, urbanization, colonialism, and the human cost of "progress" |
| 05 Modernism | "The World Breaks" | The World Wars, the collapse of the European order, and the Great Migration |

### Content Notes

- The working titles follow a "The World ___" pattern that traces an arc from stability through fracture. This is optional but gives the series a cumulative narrative feel.
- Each pop-up should end with a sentence or two explicitly connecting the historical moment to the unit's anchor text — e.g., the Baroque pop-up might close with a line about Milton writing *Paradise Lost* during the Restoration, in the aftermath of the Civil War he'd fought in.
- Some of this material already exists in the philosophy introductions and the timeline. The pop-ups can draw from those sources but should be written in a more vivid, less analytical register — scene-setting, not argument.
- Social and economic context (class structure, colonialism, the Great Migration) that was originally envisioned for a full Historical Context domain can be woven into these pop-ups where it's most relevant, particularly for Units 03–05.

---

## New Sub-Domain: Science (Under Philosophical Context)

### Rationale

The development of science is one of the most important through-lines in the intellectual history this course covers — from medieval natural philosophy through the Scientific Revolution, Newton, Romantic science, and the upheavals of relativity and quantum mechanics. Currently, science appears inconsistently: it's prominent in the Renaissance and Enlightenment philosophy pages (Copernicus, Galileo, Newton) but thinner elsewhere. A dedicated Science sub-section would make this thread consistent and visible across all six units.

Nesting Science under Philosophical Context rather than making it a standalone domain reflects a genuine intellectual reality: "natural philosophy" *is* science for most of the periods this course covers. The disciplinary split between philosophy and science is itself a historical development — one that only fully consolidates in the 19th century — and placing them side by side within a single domain makes that visible to students. The pairing also mirrors the Visual Art expansion (Painting + Sculpture), giving the site a clean, symmetrical structure.

The inspiration here is partly Richard Holmes's *The Age of Wonder* (2008), which demonstrates how deeply entangled scientific discovery and Romantic culture were — Humphry Davy writing poetry, the Herschels and the sublime, Shelley and galvanism. That kind of entanglement exists in every period but is easy to miss without a dedicated place to develop it.

### Proposed Analytical Threads

| Thread | Question |
|--------|----------|
| **Method and Evidence** | How do people investigate the natural world, and what counts as reliable knowledge? |
| **The Cosmos and the Human Place** | What does the prevailing picture of the physical universe look like, and where do humans fit in it? |
| **Science and Culture** | How does scientific work relate to the broader artistic, philosophical, and social world? |

### Notes

- **Method and Evidence** traces the arc from Aristotelian authority and medieval scholastic method through empiricism, the experimental method, Baconian induction, Romantic field science and self-experimentation, and the professionalization of science in the 19th and 20th centuries. This thread directly parallels the "Knowledge and Its Limits" philosophy thread but focuses on practice rather than epistemology.
- **The Cosmos and the Human Place** covers the Ptolemaic universe, the Copernican revolution, the mechanical universe of Newton, the deep-time revolution (geology, evolution), and the shattering of classical physics by relativity and quantum mechanics. This is where the "demotion narrative" lives — each period's science further displaces humanity from the center.
- **Science and Culture** is the thread that makes the domain distinctive rather than redundant with philosophy. It asks how scientists related to poets, painters, and political thinkers. Where did they overlap? Where did they diverge? This is where Davy's poetry, Darwin's impact on Tennyson, Bohr's conversations with Cubists, and Du Bois's sociological empiricism all find a home.

### Unit-by-Unit Sketch

| Unit | Key Figures and Developments | Connection to Anchor Text |
|------|------------------------------|--------------------------|
| 00 Medieval | Aristotelian natural philosophy, Adelard of Bath, Roger Bacon, medieval cosmology (Ptolemy + theology) | Establishes the baseline: a closed, hierarchical cosmos read as divine text |
| 01 Renaissance | Copernicus, Galileo, anatomy (Vesalius), the telescope and the microscope, Bacon's *Novum Organum* | *Hamlet*: "There are more things in heaven and earth..." — the old cosmology cracking open |
| 02 Baroque | Newton's *Principia*, the calculus, optics, the Royal Society, mechanical philosophy | *Paradise Lost*: Milton writing in the shadow of the new astronomy; Satan's journey through Chaos as cosmic navigation |
| 03 Enlightenment | Newtonian synthesis as cultural triumph, classification (Linnaeus), early chemistry, the Encyclopédie | *Pride and Prejudice*: rational observation as method — Austen's empiricism of social life |
| 04 Romanticism | Humphry Davy, the Herschels, Volta and galvanism, geology and deep time, Darwin, Humboldt | *Moby-Dick*: cetology chapters as Romantic science; Ishmael as naturalist-narrator; the sublime encounter with nature's scale |
| 05 Modernism | Einstein, Heisenberg, Bohr, quantum mechanics, Freud as "scientist," Du Bois's sociology | *Invisible Man*: the paint factory as industrial science; the hospital machine; invisible forces shaping visible reality |

### Source Material

- Existing philosophy pages already cover Copernicus, Galileo, Newton, and some Bacon — this material would be refactored rather than duplicated.
- *The Age of Wonder* (Holmes) is the primary inspiration for the Romanticism unit and a model for the "Science and Culture" thread generally.
- Additional research likely needed for: medieval natural philosophy (beyond Adelard), Baroque science (Newton in cultural context), and the Modernism unit's science content.

---

## New Sub-Domain: Sculpture (Under Visual Art Context)

### Rationale

The existing "Seeing Through Paint" material is strong but limited to a single medium. Sculpture tells different and complementary stories about space, materiality, public function, and the body. Adding a sculpture component for each unit would enrich the visual art domain without requiring a wholesale rewrite — the painting material stays as-is, and sculpture becomes a parallel section.

### Structural Approach

Sculpture becomes a parallel sub-section alongside the existing painting material within Visual Art Context, mirroring how Science nests alongside Philosophy. The painting material stays as-is; sculpture is additive.

### Proposed Sculpture Threads

| Thread | Question |
|--------|----------|
| **Body and Volume** | How does the sculpture render the human body in three dimensions — idealized, naturalistic, fragmented, abstracted? |
| **Material and Making** | What does the choice of material (stone, bronze, wood, found objects) say about the work's ambitions and its culture? |
| **Space and Setting** | Where does the sculpture live — cathedral portal, piazza, gallery, public park — and how does placement shape meaning? |

### Unit-by-Unit Sketch

| Unit | Key Works (Candidates) | Key Ideas |
|------|----------------------|-----------|
| 00 Medieval | Chartres Royal Portal, Bamberg Rider, misericords | Bodies subordinated to architecture; the cathedral as total program; anonymity of makers |
| 01 Renaissance | Donatello's *David*, Michelangelo's *David*, Cellini's *Perseus* | The freestanding figure returns; *contrapposto* and the classical body; the sculptor as named genius |
| 02 Baroque | Bernini's *Ecstasy of St. Teresa*, *Apollo and Daphne*; Puget | Theatrical space; marble made to look like flesh; sculpture as frozen narrative climax |
| 03 Enlightenment | Houdon's portrait busts, Canova's *Psyche Revived*, neoclassical idealism | The body as rational ideal; sculpture and civic virtue; archaeology's influence (Winckelmann) |
| 04 Romanticism | Rodin's *Burghers of Calais*, *The Kiss*, *Gates of Hell*; Rude's *La Marseillaise* | The unfinished surface; emotional intensity; sculpture breaks free of the pedestal |
| 05 Modernism | Brancusi's *Bird in Space*, Giacometti, Duchamp's *Fountain*, David Smith, assemblage | Abstraction and reduction; the readymade; welded steel; the death of the pedestal |

### Source Material

This section would require new research and writing. The painting material provides a structural model, but no existing content directly covers sculpture.

---

## Implementation Considerations

### The Hub Restructure (Prerequisite for Everything Else)

The shift from single-scroll unit pages to a hub model is the most significant architectural change in Phase 4 and should be done first, before any new content is added. This involves:

**New unit landing page template**: A lightweight page with a period introduction (1–2 paragraphs), the Historical Moment pop-up trigger, thread summaries (the one-line descriptions already in the YAML frontmatter), and navigation cards linking to each domain page. The landing page should feel like an inviting entry point, not a table of contents.

**Separate domain page template**: Each domain (Philosophy, Painting, Music — and eventually Science, Sculpture) gets its own page within the unit. These pages contain the full content currently found in the corresponding section of the existing unit page. The domain page template should include: breadcrumb navigation back to the unit hub, previous/next unit navigation within the same domain (e.g., from Baroque Philosophy to Enlightenment Philosophy), and a sidebar or footer link to the companion sub-domain (e.g., from Philosophy to Science within the same unit).

**URL structure**: Something like `/units/04-romanticism/` (hub), `/units/04-romanticism/philosophy/` (domain page), `/units/04-romanticism/science/` (sub-domain page). This is clean, predictable, and extensible.

**Migration path**: The existing unit pages can be split into the new structure without rewriting content — it's primarily a matter of moving each domain section into its own file and building the hub template. The editorial pass happens after the split, not before, so there's a clean sequence: restructure → edit → add new content.

### Impact on Shared Resources

**Thread symbol system**: A set of unique SVG pictograms has been designed for all nine current analytical threads (see the Accessibility and Design Action Plan, Part 3). These symbols are being implemented as part of the current design enhancement work — before Phase 4 begins. When Phase 4 adds Science (three new threads) and Sculpture (three new threads), new symbols will need to be designed in the same visual language. The Science thread symbols have already been designed (flask for Method and Evidence, concentric orbits for The Cosmos and the Human Place, Venn diagram for Science and Culture) using a steel-blue color family that distinguishes them from the philosophy copper tones. Sculpture thread symbols should be designed during Phase 4c in a warm gray or slate tone, keeping the same stroke weight and scale as the existing set. The `<ThreadIcon>` component being built now should be designed to accept new thread IDs without structural changes.

**"Threads Across Time" comparison tool**: Currently handles three domains with three threads each. Phase 4 adds Science (three threads) and Sculpture (three threads), bringing the total to fifteen thread comparisons across five sub-domains. The current UI — domain toggle followed by thread buttons — needs a minor update. Recommended approach: keep the three top-level domain toggles (Philosophy, Visual Art, Music) and add a sub-domain selector within Philosophy and Visual Art. When a student selects "Visual Art," they see a toggle for Painting vs. Sculpture, then the three thread buttons for whichever is selected. The thread pictograms should appear on the thread selector buttons here, reinforcing thread identity across the site. This preserves the current interaction pattern while accommodating growth.

**"Seeing Through Paint"**: Remains as-is — the full cross-period painting guide. A parallel **"Sculpting Through Time"** (or similar) shared resource page would be created for sculpture, following the same structure: all six periods on a single long-scroll page with anchor navigation. This mirrors the existing pattern and avoids bloating the painting guide.

**"Hearing Through Form"**: No changes needed.

**Biographical Index**: New figures from the Science and Sculpture content will need entries. The index component already handles cross-unit tagging, so this is additive.

**Biographical portraits in BioLink pop-ups**: Phase 4 adds portrait images to the BioLink biographical panels. When a student clicks a BioLink (e.g., "Pascal" or "Galileo"), the pop-up panel that appears should include a small portrait image — a painting, engraving, or photograph — alongside the biographical text. This transforms the pop-ups from text-only panels into something that feels more like a museum placard: name, dates, a face, and the contextual description.

Implementation considerations:

- **Image sourcing**: Most figures in the biographical index are well-known enough that public-domain portraits exist on Wikimedia Commons. For painters, their self-portraits are natural choices (Rembrandt's self-portrait for Rembrandt, for instance). For philosophers and writers, period engravings or paintings are widely available (the standard portraits of Kant, Pascal, Locke, etc.). For composers, the familiar canonical portraits (Bach, Mozart, Beethoven) are all public domain. A few figures (especially medieval ones like the anonymous author of *The Cloud of Unknowing* or Pérotin) won't have portraits — the component should handle missing images gracefully, showing just the text as it does now.
- **Image format**: Small, square-cropped images (approximately 120×120px or 150×150px) are sufficient. These are identification portraits, not art-historical reproductions — they should load fast and not compete with the biographical text for attention. A subtle circular or rounded-square crop would reinforce the museum-placard feel.
- **Data schema update**: The biographical index entries currently include name, dates, field, unit(s), biographical sketch, and "significance for this course." Add an optional `portrait` field containing the image filename. Entries without a portrait simply don't display one.
- **Layout**: The portrait should appear at the top of the pop-up panel, left-aligned or centered above the name and dates, with the biographical text flowing beneath. On the standalone `/people` index page, small portrait thumbnails could also appear on the name cards, making the index feel more browsable and visually rich.
- **Phase 4 connection**: When Science and Sculpture sub-domains add new figures to the biographical index (Humphry Davy, Hooke, Donatello, Bernini, Rodin, Brancusi, etc.), portraits should be sourced at the same time as the biographical entries are written. This is a minor addition per figure but adds up to a significant research task across all units.

### Content Schema

Science and Sculpture sub-domains should use the same YAML frontmatter schema as existing domains, with `domain:` values like `science` and `sculpture`. The existing `art` domain value for painting can remain as-is or be updated to `painting` for clarity — this is a minor migration question. Historical Moment pop-ups may not need the full frontmatter schema; they could be stored as simple Markdown files with minimal metadata (unit, title, word count) or as structured data within the hub page component.

### Content Length Targets

With the editorial pass and the hub model, aim for these approximate lengths per domain page:

| Content type | Current approximate length | Target length |
|-------------|---------------------------|---------------|
| Philosophy (existing) | 3,000–4,000 words | 2,500–3,200 words |
| Painting (existing) | 2,000–3,000 words | 1,700–2,500 words |
| Music (existing) | 2,000–3,000 words | 1,700–2,500 words |
| Science (new) | — | 2,000–2,500 words |
| Sculpture (new) | — | 1,500–2,000 words |
| Historical Moment pop-up | — | 300–500 words |

The new sub-domains should be somewhat shorter than their parent domains. They have fewer readings/artworks to discuss, and shorter content reinforces that they're companions to the main domain pages, not replacements.

### Phasing Within Phase 4

Given the scope, Phase 4 benefits from careful internal staging:

1. **4a: Hub restructure + editorial pass + biographical portraits** — Convert existing unit pages to the hub model. Split content into separate domain pages. Perform the editorial conciseness pass on all existing content. Also: source portrait images for all existing biographical index entries and update the BioLink component to display them. The portrait work can happen in parallel with the restructure since it touches a different part of the codebase (the biography data and the pop-up component, not the page templates). Starting portrait sourcing early means the feature is in place before new figures are added in 4c and 4d. *No new analytical content is written in this phase.*

2. **4b: Historical Moment pop-ups** — With the hub pages now in place, add the pop-up component and write the six Historical Moment pieces. These are short (300–500 words each) and draw on existing material. This is the first visible new content and provides a quick win.

3. **4c: Sculpture sub-domain** — Build the sculpture content for all six units and the "Sculpting Through Time" shared resource. This tests the sub-domain navigation pattern on the Visual Art side, where the "Seeing Through Paint" shared resource already provides a structural model. Update the "Threads Across Time" tool to include sculpture threads.

4. **4d: Science sub-domain** — Build the science content for all six units. Refactor existing philosophy pages to remove science material that now has its own home (Copernicus, Galileo, Newton in cultural context). Update the "Threads Across Time" tool to include science threads. This comes last because it requires the most new research and also involves editing existing content.

**Note on phasing order**: Sculpture (4c) comes before Science (4d), reversing the original plan. The rationale: sculpture is entirely additive (no existing content to refactor), while science requires editing the philosophy pages to avoid duplication. It's cleaner to add sculpture first, confirm the sub-domain pattern works, and then tackle the more complex science integration.

### Content Development Notes

- **Avoid duplication between Philosophy and Science**: These sub-domains share a container and will inevitably share figures (Newton, Bacon, Darwin). Each should treat shared material from its own angle: philosophy asks what Newton means for epistemology; science asks what the *Principia* means for method and cosmos. Cross-references via `<BioLink>` handle people who appear in both. When Science pages are added (4d), the Philosophy pages should be edited to remove or trim science content that now has its own home.
- **Avoid duplication between pop-ups and domain content**: The Historical Moment pop-ups set the scene; the philosophy and science sections analyze it. The pop-up for the Enlightenment might mention the Lisbon earthquake in three sentences; the philosophy section explores what it meant for theodicy and optimism.
- **Anchor-text connections**: Every thread section in the new sub-domains must include a "Connection to [anchor text]" subsection, as in the existing domains. These should be concise — two or three sentences, not a full paragraph — matching the tighter standard established by the editorial pass. The Historical Moment pop-ups should close with a brief anchor-text connection as well.
- **The Medieval baseline**: As with existing domains, each new sub-domain needs a strong Unit 00 that establishes the baseline the subsequent periods will react against. The pop-up for Unit 00 ("The World Holds") serves a slightly different function — it establishes what stability looked like before the cracking begins.
- **New sub-domain content should match the edited style, not the original**: Draft Science and Sculpture pages to the tighter length targets established by the editorial pass, not to the more expansive current standard.

---

## Open Questions

1. **Hub page design**: How much content should the hub page itself contain? A minimal version would be just navigation cards. A richer version might include the thread summary table, the period's epigraph quotes, and a brief contextual paragraph. The richer version risks recreating the "long page" problem at a smaller scale; the minimal version risks feeling empty. A middle ground — introduction, Historical Moment trigger, and visually appealing domain cards with one-line thread summaries — seems right.

2. **Cross-domain navigation on domain pages**: When a student is on the Romanticism Philosophy page, how easy should it be to jump to Romanticism Painting without going back to the hub? A sidebar nav or a "breadcrumb + siblings" bar at the top could handle this. The goal is to preserve the sense that the domains are connected parts of a unit, not isolated pages.

3. **Science in the Medieval unit**: Medieval natural philosophy is genuinely interesting (Adelard, Roger Bacon, Oxford Calculators) but may be hard to make accessible to students without more context than the other units require. How much scaffolding is needed?

4. **Sculpture image rights**: Painting images are already curated. Sculpture will need a new set of high-quality, freely usable images. Wikimedia Commons is the likely source, but quality and angle vary widely for three-dimensional works.

5. **"Science and Culture" thread scope**: This thread is the one that reaches furthest outside the Philosophical Context container — it asks about science's relationship to art, literature, and society. It may be the thread that most justifies the nesting (it's the bridge between sub-domains), or it may feel like it's straining against it. Worth revisiting once drafting begins.

6. **Editorial pass methodology**: Should the editorial pass be done by hand (re-reading each page and tightening), or should it involve a more systematic approach (e.g., identifying all "Connection to" subsections and applying a word-count cap)? A combination is probably best: systematic rules for the most common patterns, hand-editing for everything else.

7. **Mobile experience**: The hub model should work well on mobile — cards are a natural mobile pattern. But domain pages with embedded paintings, YouTube videos, and long-form text need testing on small screens. The current site appears to handle this reasonably well; the question is whether adding sculpture images (which often need to be shown from multiple angles) creates new mobile challenges.

---

## Phase 4c Drafting Decisions Log

Decisions made during the sculpture page drafting process. Locked unless explicitly revisited.

### Sculpture Work Selections (finalized per unit)

| Unit | Hero Work | Gallery Works |
|------|-----------|---------------|
| 00 Medieval | Gislebertus, *Last Judgment Tympanum*, Autun (c. 1130) | Chartres Royal Portal (c. 1145, Unknown) |
| 01 Renaissance | Michelangelo, *David* (1504) | Donatello, *David* (c. 1440); Michelangelo, *Pietà* (1499) |
| 02 Baroque | Bernini, *Apollo and Daphne* (1625) | Bernini, *Ecstasy of Saint Teresa* (1652); Bernini, *David* (1624); Puget, *Milo of Croton* (1682) |
| 03 Enlightenment | Houdon, *Voltaire* (1781) | Canova, *Psyche Revived by Cupid's Kiss* (1793); Washington, *Virginia State Capitol* mention in Space & Setting |
| 04 Romanticism | TBD | TBD |
| 05 Modernism | Brancusi, *Bird in Space* (1928) | Duchamp, *The Large Glass* (1915–1923); Giacometti, *City Square* (1948); David Smith, *Hudson River Landscape* (1951). *Fountain* referenced in Material & Making without gallery entry. Nevelson mentioned briefly in Space & Setting without gallery entry. |

### Visual Art Domain Card & Symbol Color Specifications (finalized)

**Color families:**

| Domain | Color | Hex | Character |
|--------|-------|-----|-----------|
| Painting threads & domain icon | Warm gold/amber | `#C9973A` | Matches existing painting thread symbols exactly |
| Sculpture threads & domain icon | Warm terracotta/bronze | `#B5714A` | Earth and stone; warm sibling to gold, clearly distinct |

These colors should be used for:
- Stroke and fill on all sculpture thread symbols (Body & Volume, Material & Making, Space & Setting)
- The sculpture domain icon (classical column)
- The painting domain icon (framed landscape canvas)
- Label text for "Painting" and "Sculpture" sub-labels within the split Visual Art hub card
- Thread label text in the Threads Across Time tool for sculpture threads

The gold `#C9973A` matches the existing site implementation — confirm against the live codebase before implementing.

**Domain icon designs (finalized):**

| Domain | Icon | Description |
|--------|------|-------------|
| Painting | Framed landscape canvas | Rectangular frame (stroke-width 4) with inner canvas recess, horizon line dividing sky and ground, small hill arc above horizon, hanging wire at top center. Color: `#C9973A`. |
| Sculpture | Classical column | Fluted shaft (slightly tapered), capital, wide abacus at top, two-step base. Three vertical fluting lines on shaft. Color: `#B5714A`. |

**Hub card layout:**
- The Visual Art hub card is the same size as the current single Painting card
- Interior is split vertically into two equal halves with a subtle divider
- Left half: painting canvas icon + "Painting" label + link
- Right half: sculpture column icon + "Sculpture" label + link
- Card header: "Visual Art" in the standard domain header style

Color family: warm gray / slate — same stroke weight as existing philosophy and science symbol sets.

| Thread | Symbol | Description |
|--------|--------|-------------|
| **Body & Volume** | Contour figure with volume arcs | Standing human figure as continuous outline (head circle, shoulder and hip connectors, bilateral body contour curves); three horizontal arcs across the torso suggest three-dimensionality. Stroke weight 2px for figure, 1px for volume arcs. |
| **Material & Making** | Hammer and stone block | Mallet hammer (handle + rectangular head) upright on the left; irregular stone block with horizontal grain lines on the right. Two objects floating in relationship — the maker's tool and raw material. Stroke weight 2px. |
| **Space & Setting** | Pedestal before/after | Left: abstract sculptural mass (ellipse) elevated on a classical pedestal (column + base). Right: same mass resting on a ground line, no pedestal. Separated by a dashed vertical divider with a small downward arrow indicating the transition. Encodes the historical arc from architectural embedding through classical elevation to Modernist removal of the pedestal. Stroke weight 1.5px. |

- **Gallery work counts vary by unit** — this is intentional and acceptable. The Baroque unit has four works; the Medieval unit has two. Counts should reflect the period's range and the pedagogical needs of the page, not a uniform template.
- **Medieval unit uses *Hamlet* as anchor text** — all three Medieval domain pages (Philosophy, Painting, Sculpture) should treat *Hamlet* as the anchor text, framing medieval values as the world the play is set in and against which Hamlet's Renaissance consciousness struggles. This directly supports the test question asking students to argue Hamlet as primarily Medieval or Renaissance. **The existing Medieval Philosophy and Medieval Painting pages need to be revised to add "Connection to *Hamlet*" subsections in each thread section.** This is a content addition, not a structural change — the thread sections stay as written; the connections are appended.
- **Bamberg Rider dropped** from Medieval gallery — too transitional in its naturalism; risks confusing the period's core argument about bodies subordinated to theological program.
- **Cellini's *Perseus* dropped** from Renaissance gallery — replaced by Michelangelo's *Pietà*, whose connection to *Hamlet*'s mortality themes and graveyard scene is stronger.

### Biographical Index Additions Needed

- **Gislebertus** — Medieval sculptor, Autun tympanum. Note anonymity convention and the significance of his signature as exception.
- **Donatello** — Renaissance sculptor, Unit 01.
- **Cellini** — Renaissance sculptor. May appear in passing even though *Perseus* was dropped from the gallery.
- **Bernini** — Baroque sculptor, Unit 02. Central figure; needs a full entry.
- **Puget** — Baroque sculptor, Unit 02.
- **Winckelmann, Johann Joachim** — Enlightenment art historian, Unit 03. Author of *Thoughts on the Imitation of Greek Works* (1755); theoretical foundation of neoclassicism; argument that great art is the product of rational, free societies.
- **Houdon, Jean-Antoine** — Enlightenment sculptor, Unit 03.
- **Canova** — Enlightenment sculptor, Unit 03.
- **Rodin** — Romanticism sculptor, Unit 04.
- **Rude** — Romanticism sculptor, Unit 04.
- **Brancusi** — Modernism sculptor, Unit 05.
- **Giacometti** — Modernism sculptor, Unit 05.
- **David Smith** — Modernism sculptor, Unit 05.
- **Duchamp** — already likely in index; confirm and add sculpture context.

### Content Flags for Existing Pages

- **Enlightenment Philosophy page**: Add **Voltaire** — he is currently absent from the unit entirely, which is a significant omission. He belongs in the Knowledge and Its Limits thread (rational skepticism, *Candide*, Lisbon earthquake response) and the Individual and Authority thread (*écrasez l'infâme*, imprisonment, exile). Consider adding an excerpt from *Candide* or the *Philosophical Dictionary* as a reading. A BioLink entry is needed regardless.
- **Medieval Philosophy page**: Add "Connection to *Hamlet*" subsections (see structural decision above).
- **Medieval Painting page**: Add "Connection to *Hamlet*" subsections (see structural decision above).

### Factual Details to Verify Before Publishing

- Michelangelo's *Pietà*: Virgin's lap described as anatomically wider than realistic — widely reported observation, worth verifying against a primary art-historical source.
- Bernini's *David* face as self-portrait: from Filippo Baldinucci's biography; accepted tradition but not documented fact. Flag in text if used.
- Donatello's *David* dating: contested between c. 1440s and c. 1460s — use "c. 1440" with awareness of the debate; verify current scholarly consensus before publishing.
