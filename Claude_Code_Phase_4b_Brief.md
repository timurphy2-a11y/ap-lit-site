# Claude Code — Hub Redesign & Historical Moment Brief

## What This Is

Two related tasks: redesigning the hub page layout, and implementing the Historical Moment pop-up content and component. Read this brief first, then the referenced documents.

---

## Context

The hub pages were built in Phase 4a. The current implementation follows the design decisions in `Phase_4_Planning.md`, but those decisions have been superseded by a redesign. The new spec is in `Hub_Page_Redesign_Spec.md` — that document is authoritative and overrides anything in `Phase_4_Planning.md` about hub page layout.

---

## Task 1: Hub Page Redesign

**Spec:** `Hub_Page_Redesign_Spec.md`

The hub pages need to be redesigned to feel lighter and more like a jumping-off point. The current layout has too much content. The new layout order is:

1. Period heading block
2. Epigraphs (stacked vertically, smaller than body text, left border rule)
3. Introduction paragraph (the only full prose paragraph)
4. Historical Moment trigger button (small, inline — see Task 2)
5. Domain navigation cards (3-column grid, symbols + thread names only, **entire card is clickable**)
6. Timeline strip (horizontal, small font, scrollable)

Key changes from current implementation:
- Epigraphs move above the introduction paragraph, stacked vertically not side by side
- Domain cards show thread pictogram + thread name only — remove all summary sentences
- The entire card area is the click target (wrap in `<a>` tag), not just the text
- Timeline strip is horizontal with small labels, sits below the cards
- Historical Moment trigger is a small button, not a full card or banner

Full layout specifications including font sizes, spacing, border styles, and the eye seal SVG icon are all in `Hub_Page_Redesign_Spec.md`.

The hub introduction paragraph content and epigraph quotes for all six units are in `Hub_Page_Introductions_Final.md`.

---

## Task 2: Historical Moment Pop-Up

**Content:** `Historical_Moment_Final.md`
**Icon spec:** `Hub_Page_Redesign_Spec.md` (section 4, Historical Moment Trigger)

### Component

Build a modal/pop-up component that:
- Opens when the Historical Moment trigger button is clicked
- Displays the unit's Historical Moment text
- Has a clear close button
- Works on mobile
- Matches the site's dark museum-exhibit aesthetic

The trigger button uses the eye seal icon as specified in `Hub_Page_Redesign_Spec.md`. The button text follows the pattern: "The world in crisis — historical moment" (title from `Historical_Moment_Final.md` + "historical moment" label).

### Content

`Historical_Moment_Final.md` contains all six Historical Moment texts, one per unit:

| Unit | Title |
|------|-------|
| 00 Medieval | The World Holds |
| 01 Renaissance | The World Splits |
| 02 Baroque | The World in Crisis |
| 03 Enlightenment | The World Shakes |
| 04 Romanticism | The World Remade |
| 05 Modernism | The World Breaks |

Store the content as Markdown files in the appropriate content directory (e.g. `content/units/00-medieval/historical-moment.md`) or as structured data — whichever fits the existing content architecture more cleanly. Each file needs minimal frontmatter: unit, title, word count is sufficient.

### Content format in the pop-up

- Title ("The World in Crisis") as a heading
- Period and dates as a subheading
- Body text rendered as prose paragraphs
- The text ends with a connection to the anchor text — this closing section does not need special styling, it flows naturally from the preceding paragraphs

---

## Task Order

1. Redesign hub page layout (Task 1) — structural change, verify all six hub pages render correctly
2. Build Historical Moment modal component with placeholder content — confirm the open/close interaction works
3. Populate with actual Historical Moment content from `Historical_Moment_Final.md`
4. Deploy and verify on mobile

---

## What Is NOT in Scope

- No changes to domain page content or layout
- No changes to the sibling tab navigation on domain pages
- No new biographical index entries
- Science and Sculpture tabs on domain pages remain as inactive placeholders
