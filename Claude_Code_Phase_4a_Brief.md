# Claude Code — Phase 4a Implementation Brief

## What This Is

This document tells you what to build in Phase 4a. Read it first, then consult the referenced spec documents for detail. Do not start implementing until you have read this brief in full.

---

## Context

This is an AP Literature background materials website built in Astro with React components and Tailwind CSS, deployed on Cloudflare Pages. The site covers six historical periods (Medieval through Modernism) across three domains (Philosophy, Visual Art, Music). Phase 4a is a structural and editorial overhaul — no new analytical content is written.

Full project context: `AP_Lit_Site_Project_Brief.md`
Full phase planning: `Phase_4_Planning.md`
What is complete vs. pending: `Phase_4a_Status_Tracker.md`

---

## Task 1: Replace Edited Content Files

The 17 domain content files in this folder are the final edited versions replacing the originals. They are:

**Philosophy (6 files)**
- `00_Medieval_Philosophy.md`
- `1_Renaissance_Philosophy.md`
- `2_Baroque_Philosophy.md`
- `3_Enlightenment_Philosophy.md`
- `4_Romantic_Philosophy.md`
- `5_Modernism_Philosophy.md`

**Painting (6 files)**
- `00_Medieval_Painting.md`
- `1_Renaissance_Painting.md`
- `2_Baroque_Painting.md`
- `3_Enlightenment_Painting.md`
- `4_Romantic_Painting.md`
- `5_Modernism_Painting.md`

**Music (6 files — note filename fix below)**
- `00_Medieval_Music.md`
- `1_Renaissance_Music.md`
- `2_Baroque_Music.md`
- `3_Enlightenment_Music.md`
- `4_Romantic_Music.md` ← rename from `4__Romantic_Music.md` (remove double underscore)
- `5_Modernism_Music.md`

Move these into the appropriate content directory in the Astro project. The previous versions should be replaced, not kept alongside.

---

## Task 2: Hub Page Restructure

Convert the current single-scroll unit pages into a hub-and-domain architecture.

**Spec documents:**
- `Phase_4_Planning.md` → "The Hub Model" section (URL structure, hub template design, sibling tab navigation)
- `Hub_Page_Introductions_Final.md` → content for each hub page (introduction paragraph + 2 epigraph quotes per unit)

**URL structure:**
```
/units/00-medieval/              ← hub landing page
/units/00-medieval/philosophy/   ← domain page
/units/00-medieval/painting/
/units/00-medieval/music/
```

**Hub page template contains:**
1. Period introduction paragraph (from `Hub_Page_Introductions_Final.md`)
2. Epigraph quotes — 2 per unit (from `Hub_Page_Introductions_Final.md`)
3. Historical Moment trigger element — button or card that will eventually open a pop-up. For now, implement as a placeholder element with the working title (e.g., "The World Holds") and a note that content is coming in Phase 4b. Do not build the pop-up modal yet.
4. Timeline slice — a filtered view of the interactive timeline showing only the current unit's era events. See Task 4 for the timeline spec.
5. Domain navigation cards — one card per domain (Philosophy, Painting, Music), each showing the domain name, one-line thread summaries (from frontmatter `period_summary` fields), and a link to the domain page.

**Domain page template contains:**
- Breadcrumb navigation: e.g., `The High Middle Ages > Philosophy`
- Sibling tab row: `Philosophy | Painting | Music` with current domain highlighted. Science and Sculpture tabs should be present but visually inactive/grayed — they are placeholders for future phases.
- Full domain content (migrated from current unit pages)
- Previous/next unit navigation within the same domain (e.g., `← Medieval Philosophy` / `Renaissance Philosophy →`)

---

## Task 3: Accessibility and Design Enhancements

Full spec with specific color values, SVG code for thread pictograms, and pull quote selections:
`Accessibility_and_Design_Action_Plan.md`
`Pull_Quote_Selections.md`

**Summary of changes:**
- WCAG contrast fixes: brighten inactive tab color, Baroque accent, Romanticism accent (exact values in spec)
- Painting frame and tombstone caption treatment on all painting images
- Styled pull quotes — 18 quotes specified (3 per unit), each marked in the Pull Quote Selections doc
- Subtle horizontal section dividers between thread sections
- Gallery painting hover effect (scale 1.02, smooth transition)
- Drop caps on section introduction paragraphs
- Thread pictogram SVG symbols — 9 symbols designed, SVG code provided in spec

---

## Task 4: Medieval Timeline Extension

Extend the interactive timeline (`ap-lit-timeline.jsx` or equivalent) back to c. 1000 CE.

Full spec with JavaScript-ready event data: `Medieval_Timeline_Events.md`

**Changes required:**
1. Add medieval era to the `ERAS` array: `{ id: "medieval", label: "The High Middle Ages", range: [1000, 1450], color: "#5B82C8" }`
2. Add 15 medieval events to the `EVENTS` array (all data provided in spec, copy-paste ready)
3. Extend the timeline's overall date range back to c. 1000 (check whether this is hardcoded or derived from the `ERAS` array)
4. The timeline slice on the Medieval hub page should show events in range 1000–1450

No anchor text entry is needed for Unit 00 in the `TEXTS` array.

---

## Task 5: Biographical Portrait Feature

Add portrait images to the BioLink biographical pop-up panels and the `/people` index page.

**This task has two parts:**

**Part A — Component update (implement now):**
- Add an optional `portrait` field to the biographical data schema in `BiographyPanel.jsx`
- Update the BioLink pop-up to display the portrait image when present (small, ~120×120px, circular or rounded-square crop, above the name and dates)
- Update the `/people` index page to show portrait thumbnails on name cards when present
- Handle missing portraits gracefully — show text-only panel as currently, no broken image state

**Part B — Image sourcing (pending Tim's review):**
- Portrait images have not yet been sourced. Part A can be built and deployed without any portrait images present — the feature just won't display until images are added.
- Do not source or download images yourself. Tim will review portrait candidates separately.

---

## Task Order

Complete in this sequence — each task is a deployable increment:

1. **Task 1** (content file replacement) — low risk, verify pages render correctly
2. **Task 3** (accessibility and design) — self-contained, visual improvements
3. **Task 4** (timeline extension) — self-contained, extends existing component
4. **Task 5 Part A** (portrait component) — self-contained, no images yet
5. **Task 2** (hub restructure) — most complex, do last; requires Tasks 1 and 3 to be complete first

Deploy and verify after each task before moving to the next.

---

## Known Issues to Fix

- `4__Romantic_Music.md` has a double underscore in the filename — fix to `4_Romantic_Music.md` when migrating content (covered in Task 1)
- Modernism painting images (Picasso, Kandinsky, Matisse) require copyright review before the site goes fully public — flag but do not remove

---

## What Is NOT In Scope for Phase 4a

Do not build any of the following — they are later phases:
- Historical Moment pop-up content and modal (Phase 4b)
- Sculpture sub-domain content or pages (Phase 4c)
- Science sub-domain content or pages (Phase 4d)
- New biographical index entries for Science or Sculpture figures
