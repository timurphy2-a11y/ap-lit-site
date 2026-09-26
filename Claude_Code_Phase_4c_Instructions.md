# Claude Code Instructions: Phase 4c — Sculpture Sub-Domain Implementation

## Overview

This prompt covers the full implementation of the sculpture sub-domain for the AP Literature background materials site. The zip file attached contains all content files and task specifications. Read every referenced file carefully before beginning any implementation work.

**Files in the zip:**
- `00_Medieval_Sculpture.md` through `5_Modernism_Sculpture.md` — six sculpture content pages, one per unit
- `Sculpting_Through_Time.md` — the cross-period shared resource page
- `Portrait_and_BioLink_Tasks.md` — specifications for biographical index entries, portrait images, and sculpture page images
- `Phase_4_Planning.md` — full project planning doc; the Phase 4c Decisions Log section contains finalized design specs
- `Writing_and_Editing_Guide.md` — editorial style guide (reference only; content is already written)

---

## Task 1: Add Sculpture Content Pages to the Site

The six sculpture content files follow the same YAML frontmatter schema as the existing painting pages (`domain: art`). They use `domain: sculpture` and introduce three new thread IDs: `body-volume`, `material-making`, `space-setting`.

**Steps:**
1. Place each sculpture `.md` file in the correct unit content directory, parallel to the existing painting file. For example, `2_Baroque_Sculpture.md` belongs alongside `2_Baroque_Painting.md` in `content/units/02-baroque/`.
2. Verify the YAML frontmatter parses correctly — pay attention to the `gallery_sculptures` field, which uses `hero_sculpture` instead of `hero_painting`.
3. The `Gates of Hell` entry in `4_Romanticism_Sculpture.md` has a date range (`"1880–1917"`) rather than a single integer. Ensure the date field handles string values without breaking the renderer.

---

## Task 2: Add Sculpting Through Time Shared Resource

`Sculpting_Through_Time.md` is a new shared resource page, parallel to `Seeing Through Paint` and `Hearing Through Form`.

**Steps:**
1. Place it in the shared resources directory alongside the other two cross-period guides.
2. Add a link to it in the shared resources navigation (wherever `Seeing Through Paint` and `Hearing Through Form` are linked).
3. The page uses anchor navigation between three thread sections (`body-volume`, `material-making`, `space-setting`) — implement the same anchor nav pattern used on the painting shared resource.

---

## Task 3: Update the Visual Art Hub Card

The unit hub pages currently show a single "Painting" card linking to the painting domain page. This must be updated to a split "Visual Art" card containing both Painting and Sculpture sub-domain links.

**Specification (from Phase_4_Planning.md — Phase 4c Decisions Log):**
- The Visual Art card is the same total size as the current Painting card
- Interior split vertically into two equal halves with a subtle divider
- Left half: painting canvas icon + "Painting" label + link to painting page
- Right half: sculpture column icon + "Sculpture" label + link to sculpture page
- Card header: "Visual Art" in the standard domain header style

**Domain icon designs:**

*Painting icon* — framed landscape canvas, color `#C9973A`:
- Rectangular frame, stroke-width 4, rx 3
- Inner canvas recess (1px stroke, 40% opacity)
- Sky fill (upper area, 8% opacity) and ground fill (lower area, 18% opacity)
- Horizon line (stroke-width 1.5)
- Small hill arc above horizon
- Hanging wire (two lines meeting at top center)

*Sculpture icon* — classical column, color `#B5714A`:
- Fluted shaft (slightly tapered path), capital, wide abacus at top
- Three vertical fluting lines on shaft (0.8px, 45% opacity)
- Two-step base (inner rect + outer plinth)
- All fills at 15–85% opacity as appropriate for depth

---

## Task 4: Add Sculpture Thread Symbols

Three new thread symbols are needed. They use the terracotta color `#B5714A` and the same stroke weight and scale as existing thread symbols.

**Symbol designs (from Phase_4_Planning.md — Phase 4c Decisions Log):**

*Body & Volume* — contour figure with volume arcs:
- Head circle (r=14, stroke-width 2)
- Bilateral body contour curves, shoulder connector, hip connector (all stroke-width 2)
- Three horizontal arcs across torso suggesting volume (stroke-width 1, 60% opacity)

*Material & Making* — hammer and stone block:
- Irregular stone block with 3 horizontal grain lines (stroke-width 0.8)
- Mallet hammer (handle rect + head rect) to the left of the block

*Space & Setting* — pedestal before/after:
- Left: elliptical sculptural mass on classical pedestal (column body + base)
- Dashed vertical divider with small downward arrow
- Right: same elliptical mass on a ground line, no pedestal

Register these three thread IDs in the `ThreadIcon` component: `body-volume`, `material-making`, `space-setting`. The component should already accept new IDs without structural changes per the Phase 4 plan.

---

## Task 5: Update the Threads Across Time Tool

The comparison tool currently handles Philosophy, Painting, and Music. Add Sculpture as a sub-domain under Visual Art.

**Specification:**
- Keep the three top-level domain toggles (Philosophy, Visual Art, Music)
- Under Visual Art, add a Painting / Sculpture sub-toggle
- When Sculpture is selected, show the three sculpture thread buttons with their new symbols
- Thread pictograms should appear on thread selector buttons

---

## Task 6: Biographical Index — New Sculptor Entries and Portrait Images

Read `Portrait_and_BioLink_Tasks.md` in full before beginning this task. It contains:

- **Part 1** — four existing figures missing portraits (Leonardo, Michelangelo, Raphael, Palestrina) with specific Wikimedia Commons sources
- **Part 2** — eleven new sculptor biographical entries with full text, all fields, and portrait sourcing instructions
- **Part 3** — sculpture page image sourcing with copyright flags

**Image processing workflow** (applies to both portrait and sculpture images):
1. Source from Wikimedia Commons — verify public domain or free license status on the file page
2. For portraits: crop to square centered on face, resize to 150×150px, Lanczos resampling
3. For sculpture works: show full work, resize to 1600–2000px on longest edge, Lanczos resampling
4. Save to appropriate directory following existing naming conventions
5. Update BiographyPanel.jsx with new entries and `portrait` fields
6. Update sculpture page YAML with image filenames

**Copyright flags — do not source images without Tim's review:**
- Giacometti's *City Square* (1948)
- David Smith's *Hudson River Landscape* (1951)
- Duchamp's *The Large Glass* (1915–1923)

For these three works, add placeholder image references in the YAML and leave a `TODO: copyright review` comment. Source all other images and proceed with implementation.

---

## Task 7: Add Sculpting Through Time to Navigation and Update Seeing Through Paint Links

- Add "Sculpting Through Time" to the shared resources navigation alongside "Seeing Through Paint" and "Hearing Through Form"
- Verify that "Seeing Through Paint" links on painting pages still resolve correctly after any directory changes

---

## Verification Checklist

Before marking complete, verify:

- [ ] All six sculpture pages render correctly with hero image, gallery images, thread sections, and Looking Back/Forward sections
- [ ] `domain: sculpture` is correctly handled by the page template
- [ ] Three new thread IDs register in ThreadIcon component without errors
- [ ] Visual Art hub card renders correctly with split layout at all breakpoints
- [ ] Sculpting Through Time renders with working anchor navigation between thread sections
- [ ] Threads Across Time tool handles Sculpture sub-domain toggle
- [ ] All new BioLink entries display correctly in pop-up panel
- [ ] Portrait images display at correct size and position
- [ ] Sculpture images display with museum framing treatment using `#B5714A` accent color
- [ ] Copyright-flagged works show placeholder rather than missing image error
- [ ] Site builds and deploys without errors on Cloudflare Pages
