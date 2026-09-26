# AP Literature Background Materials Web Site — Project Brief

## Overview

This project is building an interactive web site that provides historical, philosophical, artistic, and musical background context for an AP Literature course. The site is designed as a student-facing reference tool — browsable independently, not primarily a presentation tool for the classroom.

The course is organized around five core literary texts, each paired with a historical and aesthetic period. The site provides background context for each unit across three domains (philosophy, visual art, music), using a consistent set of analytical "threads" that students can trace across all five periods.

The site will be built using Astro (a static site framework) and deployed on Netlify or a similar free hosting service. Interactive elements (timelines, comparison tools, etc.) will be built as React components embedded within Astro pages. The build phase will use Claude Code working directly in the project repository.

---

## The Six Units

| Unit | Period | Core Text(s) | Author |
|------|--------|-------------|--------|
| 00 | The High Middle Ages (c. 1000–1400) | *Hamlet* (dual anchor) | Shakespeare |
| 01 | Renaissance & Reformation (c. 1400–1700) | *Hamlet* | Shakespeare |
| 02 | The Baroque (c. 1600–1700) | *Paradise Lost* | Milton |
| 03 | The Enlightenment (c. 1700–1800) | *Pride and Prejudice* | Austen |
| 04 | Romanticism (c. 1789–1880) | *Moby-Dick*, "Bartleby, the Scrivener", *Benito Cereno* | Melville |
| 05 | Modernism (c. 1900–1950) | *Invisible Man* | Ellison |

### The Medieval Foundation (Unit 00)

The Medieval unit shares its anchor text with the Renaissance unit: *Hamlet* is read against both. Unit 00 establishes the intellectual baseline that all subsequent periods react against — a divinely ordered universe, humanity in a fixed position within it, knowledge grounded in revelation and authority, and the individual's proper posture as one of obedience and surrender. Hamlet inhabits that world with a mind already leaving it, which is why the play works in both directions: Unit 00 reads it as the world Hamlet cannot escape, Unit 01 as the consciousness that escapes it. Without this baseline, the Renaissance revolution has nothing to push against, and the full arc of the course — from medieval certainty to Modernist crisis — is invisible. The Medieval unit's philosophy page includes readings from Augustine, *The Cloud of Unknowing*, "The Unquiet Grave," and Adelard of Bath.

### Key Periodization Decisions

These pairings are intentional and sometimes unconventional:

- **Paradise Lost as Baroque** (not Enlightenment): Milton's grandeur, dramatic contrasts, theological drama, and sensory intensity align with Baroque aesthetics. Connects to Caravaggio, Bernini, Monteverdi, Bach.
- **Pride and Prejudice as Enlightenment** (not Romantic): Tendentious but defensible. Austen writes during the Romantic period, but her intellectual commitments — rational judgment, social observation, skepticism of emotional excess — are fundamentally 18th-century/Augustan.
- **Moby-Dick as Romantic** (not Realism): The sublime, obsessive questing, individual consciousness against an indifferent universe, the imagination's encounter with what exceeds comprehension. "Bartleby" and *Benito Cereno* extend this into darker territory — nihilistic refusal and political inscrutability.

### Additional Context

- The Romanticism unit is the only one with **multiple core texts** (all by Melville).

---

## Three-Domain Structure with Analytical Threads

Each unit page on the site has three content sections, each organized around three persistent analytical "threads" — formal categories that remain constant while their content changes dramatically across periods. Students can track how the same question gets answered differently in each era.

### Philosophy Threads

| Thread | Question |
|--------|----------|
| **The Human Position** | What is a human being, and where do we stand in the order of things? |
| **Knowledge and Its Limits** | How do we know what we know, and how far can knowledge take us? |
| **The Individual and Authority** | What is the relationship between the person and the structures that govern them? |

### Visual Art Threads (from "Seeing Through Paint")

| Thread | Question |
|--------|----------|
| **Figure & Space** | How is the human figure placed within the pictorial space? |
| **Light & Shadow** | How does the painting use light — its source, quality, and emotional effect? |
| **Brushwork & Surface** | What is the physical character of the paint itself? |

### Music Threads (from "Hearing Through Form")

| Thread | Question |
|--------|----------|
| **Texture & Voices** | How many voices are active, and how do they relate to each other? |
| **Consonance & Dissonance** | How does the music handle tension and resolution? |
| **Structure & Freedom** | How does the music relate to inherited formal structures? |

### Narrative Introduction Format

Each domain section within a unit follows the same structure:
1. **Introduction** — contextualizes the period and connects to the anchor text
2. **Three thread sections** — each states the guiding question, explains the period's answer (contrasted with the medieval baseline and previous period), and includes a "Connection to [anchor text]" subsection
3. **Looking Back, Looking Forward** — explicitly traces the contrast with the previous period and foreshadows the next

---

## Existing Content Inventory

### Completed for the Site

- **Philosophy narrative introductions**: All six units including Medieval foundation (Markdown files with Astro-ready frontmatter)
  - `content/units/00-medieval/philosophy.md`
  - `content/units/01-renaissance/philosophy.md`
  - `content/units/02-baroque/philosophy.md`
  - `content/units/03-enlightenment/philosophy.md`
  - `content/units/04-romanticism/philosophy.md`
  - `content/units/05-modernism/philosophy.md`

- **Music narrative introductions**: All six units (Markdown files with Astro-ready frontmatter)
  - `content/units/00-medieval/music.md`
  - `content/units/01-renaissance/music.md`
  - `content/units/02-baroque/music.md`
  - `content/units/03-enlightenment/music.md`
  - `content/units/04-romanticism/music.md`
  - `content/units/05-modernism/music.md`

- **Interactive timeline**: React component covering 1590–1955, with all five texts placed within European political and intellectual/cultural events. Filterable by era and event type.
  - `src/components/APLitTimeline.jsx`
  - **Medieval extension**: 15 events (c. 1000–1453) drafted and ready for implementation. Spec in `Medieval_Timeline_Events.md`. Extends timeline range back to c. 1000 and adds the medieval era in steel-blue (`#5B82C8`). No anchor text entry needed for Unit 00.

- **Biographical index**: React component providing brief biographical sketches for all writers, philosophers, artists, and composers referenced across the course. Includes a standalone browsable index page and an inline `BioLink` component for embedding in unit page text.
  - `src/components/BiographyPanel.jsx`
  - 40+ entries covering all six units, from Augustine and Adelard of Bath through Ellison and Ellington
  - Each entry includes: name, dates, field, unit(s), biographical sketch, and a "significance for this course" paragraph tracing the person's relevance to the course's intellectual arc
  - Color-coded by unit; people who appear in multiple units (e.g., Rousseau, Newton) carry tags for each
  - Accessible as a shared resource at `/people` and via `<BioLink id="...">` inline links throughout unit pages

- **Pascal *Pensées* excerpts**: Word document with student headnote, "Two Infinities" (Fragment 199), and "Thinking Reed" cluster (Fragments 200, 113, 114, 347). For the Baroque unit reading packet.

- **Hub page introductions and epigraphs**: One introductory paragraph and two epigraph quotes per unit (all six units). Finalized in `Hub_Page_Introductions_Final.md`. Ready for Claude Code to implement in hub page template.

### Completed Previously (Need Adaptation for Site)

- **"Seeing Through Paint"** — Full cross-period visual art guide (Medieval through Modernism). Exists as both a Word document and an HTML/Google Sites version. Organized by the three art threads. Includes key paintings with analysis for each period.

- **"Hearing Through Form"** — Full cross-period music guide (Medieval through Modernism). Exists as both a Word document and an HTML/Google Sites version. Organized by the three music threads. Includes key listening recommendations with analysis.

- **Reading packets** for each period (PDFs uploaded in this conversation):
  - Medieval: Augustine, *Cloud of Unknowing*, Adelard of Bath, Aristotelian physics
  - Renaissance: Pico della Mirandola, Gopnik on Galileo, Greenblatt (*Swerve* and *Will in the World*), Descartes, Copernicus, Galileo, Luther
  - Baroque: Lanyer, Cavendish, Newton
  - Enlightenment: Hobbes, Locke, Rousseau (*Social Contract*), Pope, Kant, Newton. Supplemental: Wollstonecraft, Kant (duplicate)
  - Romanticism: Rousseau (*Confessions*), Shelley (*Defence of Poetry*), Emerson (*Nature*), Marx/Engels (*Communist Manifesto*). Recently added: Schiller (*Letters on Aesthetic Education*)
  - Modernism: Nietzsche, Eilenberger (*Time of the Magicians*), Wittgenstein (*Tractatus*), Freud (*Civilization and Its Discontents*)

### Pending / In Progress

- **Adam Smith excerpt** (*Theory of Moral Sentiments*) for the Enlightenment unit — focusing on the impartial spectator and sympathy as imaginative projection. To be created with student headnote.
- **Rousseau revision** for the Enlightenment unit — reworking the excerpt to focus on *amour-propre* from the *Discourse on the Origin of Inequality* (1755) rather than the *Social Contract*. The concept of amour-propre (the need to be esteemed by others, seeing yourself through others' eyes) connects directly to the social dynamics of *Pride and Prejudice*.
- **Art and music content adaptation** — The existing "Seeing Through Paint" and "Hearing Through Form" guides need to be broken into per-unit Markdown files following the same frontmatter schema as the philosophy files, while also maintaining full cross-period versions as shared resources.
- **Modernism supplementary reading** — Consider adding a reading from the Black American intellectual tradition (Du Bois on double consciousness, or Alain Locke's "The New Negro") to complement the European philosophical sources and connect more directly to *Invisible Man*.
- **Comparative/cross-era interactive elements** — Side-by-side comparison tools for art (e.g., Caravaggio vs. Turner vs. Picasso) and potentially audio-enabled music comparisons.
- **BioLink integration** — Once unit pages are built, inline `<BioLink>` components need to be added wherever author and figure names appear in philosophy and music text pages.

---

## Site Architecture

Unit pages are structured as **hubs** that link out to separate domain pages, rather than a single long scroll. Each hub contains a brief period introduction, epigraph quotes, a Historical Moment pop-up trigger, a filtered slice of the interactive timeline showing only that period's events, and navigation cards linking to each domain page.

```
Home Page
├── Course introduction and navigation
├── Interactive Timeline (shared resource, c. 1000–1955)
│
├── Unit Hubs (landing pages — lightweight, navigational)
│   ├── 00: The High Middle Ages (Hamlet — dual anchor with 01)
│   │   ├── Period introduction + epigraph quotes
│   │   ├── Historical Moment pop-up trigger ("The World Holds")
│   │   ├── Timeline slice (c. 1000–1450)
│   │   └── Domain cards → Philosophy / Painting / Music
│   ├── 01: Hamlet — Renaissance & Reformation
│   │   ├── Period introduction + epigraph quotes
│   │   ├── Historical Moment pop-up trigger ("The World Splits")
│   │   ├── Timeline slice (c. 1400–1650)
│   │   └── Domain cards → Philosophy / Painting / Music
│   ├── 02: Paradise Lost — The Baroque
│   ├── 03: Pride and Prejudice — The Enlightenment
│   ├── 04: Moby-Dick / Bartleby / Benito Cereno — Romanticism
│   └── 05: Invisible Man — Modernism
│
├── Domain Pages (full content, reached from hub cards)
│   ├── /units/[unit]/philosophy/
│   ├── /units/[unit]/painting/
│   └── /units/[unit]/music/
│   Each domain page includes:
│   ├── Breadcrumb navigation (e.g., Romanticism > Philosophy)
│   ├── Sibling tab row (Philosophy · Science | Painting · Sculpture | Music)
│   ├── Introduction + three thread sections with Connection To subsections
│   └── Looking Back / Looking Forward
│
├── Shared Resources
│   ├── Interactive Timeline (full, c. 1000–1955, filterable by era and type)
│   ├── Biographical Index (/people) — all figures across all units
│   ├── Seeing Through Paint (full cross-period painting guide)
│   ├── Hearing Through Form (full cross-period music guide)
│   └── [Future: Essay Writing Guide]
│
└── [Future: Instructional Materials]
```

### Historical Moment Pop-Ups

Each unit hub page includes a clickable trigger that opens a short (300–500 word) pop-up providing vivid historical scene-setting for the period. These are entry points, not analytical essays — focused on the one or two seismic events that define the era's political and emotional temperature.

| Unit | Pop-up Title | Focus |
|------|-------------|-------|
| 00 Medieval | "The World Holds" | Medieval stability — and the cracks appearing at the edges (Black Death, Great Schism) |
| 01 Renaissance | "The World Splits" | The Reformation and wars of religion — Christendom divides |
| 02 Baroque | "The World in Crisis" | The Thirty Years' War, the English Civil War, upheaval behind the grandeur |
| 03 Enlightenment | "The World Shakes" | The Lisbon earthquake; the American and French Revolutions |
| 04 Romanticism | "The World Remade" | The Industrial Revolution and its human cost |
| 05 Modernism | "The World Breaks" | The World Wars, the collapse of the European order, the Great Migration |

*Historical Moment content not yet drafted — Phase 4b task.*

### Content File Schema

All content files use Markdown with YAML frontmatter. The frontmatter follows a consistent schema across domains:

```yaml
unit: "01-renaissance"          # Unit identifier
period: "Renaissance & Reformation"  # Display name
dates: "c. 1400–1700"          # Date range
core_text: "Hamlet"             # Primary literary text
author: "Shakespeare"           # Text author
domain: philosophy              # Content domain (philosophy/art/music)
threads:                        # The three analytical threads for this domain
  - id: human-position
    label: "The Human Position"
    period_summary: "One-line summary of this period's answer"
readings:                       # Source readings with thread tags
  - title: "Reading Title"
    author: "Author"
    date: 1486
    threads: [human-position, knowledge-limits]  # Which threads this reading addresses
compare_back: "medieval"        # Previous period for "Looking Back"
compare_forward: "baroque"      # Next period for "Looking Forward"
```

This schema enables programmatic generation of:
- Thread-based filtering (show all readings tagged "knowledge-limits" across all units)
- Cross-unit navigation (next/previous unit links)
- Reading-to-thread mapping displays
- Automatic "Looking Back / Looking Forward" linking

---

## Technical Plan

### Stack
- **Framework**: Astro (static site generator, content-focused)
- **Interactive components**: React (embedded in Astro pages where needed)
- **Styling**: Tailwind CSS
- **Hosting**: Cloudflare Pages (migrated from Netlify — generous free tier, unlimited bandwidth, native Astro support)
- **Version control**: GitHub
- **Content format**: Markdown with YAML frontmatter in content collections

### Build Approach
- Use **Claude Code** for the site build phase (working directly in the project repository)
- Content files written in this chat interface are already formatted for direct use in Astro content collections
- The teacher (Tim) has no prior web development experience beyond a Dreamweaver course ~15 years ago; Claude Code will handle technical implementation while Tim focuses on content and design decisions

### Development Roadmap

1. **Phase 1: Foundations** ✅ — Astro project scaffolded, GitHub connected, site deployed on Cloudflare Pages
2. **Phase 2: Content architecture** ✅ — Unit page templates built, content collections established, navigation in place
3. **Phase 3: Interactive elements** ✅ — Timeline and biographical index integrated
4. **Phase 4: Expansion** — Hub restructure, editorial pass, Historical Moments, Science sub-domain, Sculpture sub-domain. See `Phase_4_Planning.md` for full detail.

---

## Key Design Principles

- **Student-facing reference tool**: Designed for independent browsing, not classroom projection
- **Consistent structure across units**: Same three domains, same three threads per domain, same narrative format — so students always know where they are
- **Cross-era visibility**: The threads and "Looking Back/Forward" sections make the intellectual trajectory across periods visible and traceable
- **Content-first**: The site should feel like a rich, well-organized library of materials, not a flashy web app. Interactive elements serve the content, not the other way around.
- **Extensible**: Architecture accommodates future additions (instructional materials, essay guides) without requiring redesign
