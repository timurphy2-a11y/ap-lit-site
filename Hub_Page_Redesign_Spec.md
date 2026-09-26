# Hub Page Redesign Spec

## Overview

The hub page should feel like a foyer, not a gallery — a clean jumping-off point rather than a dense overview. The current implementation has too much content competing for attention. This spec supersedes the hub design decisions recorded in Phase_4_Planning.md.

---

## Layout Order (top to bottom)

1. **Period heading block**
2. **Epigraphs**
3. **Introduction paragraph**
4. **Domain navigation cards** (3-column grid)
5. **Historical Moment band** (full-width, amber-tinted)
6. **Timeline strip** (horizontal)

---

## Section Specifications

### 1. Period Heading Block

- Unit number in small sans-serif, muted/tertiary color, letter-spaced (e.g. "Unit 02")
- Period name as h1 — large, serif, font-weight 500
- Dates · Core text · Author in small sans-serif, secondary color, on one line

### 2. Epigraphs

- Stack vertically (not side by side)
- Left border rule in secondary border color (2px)
- Quotes in serif italic, 13px, secondary text color, line-height 1.6
- Attribution in sans-serif, 11px, tertiary text color, beneath each quote
- Margin below the block before the introduction paragraph

### 3. Introduction Paragraph

- Serif body text, 15px, line-height 1.75
- Primary text color
- This is the only full prose paragraph on the hub page

### 4. Domain Navigation Cards

- 3-column grid (Philosophy, Painting, Music), equal width
- `grid-template-columns: repeat(3, minmax(0, 1fr))`, gap 12px
- Each card:
  - The **entire card is the click target** — wrap each card in an `<a>` tag linking to the domain page, not just the domain label or thread names. `display: block` on the anchor so it fills the card area.
  - Border: 0.5px solid tertiary border color
  - Border radius: lg
  - Padding: 1rem
  - Cursor: pointer
  - Domain label: sans-serif, 11px, tertiary color, letter-spaced, margin-bottom 0.75rem
  - Thread list: 3 rows, each row = thread pictogram icon (16×16px) + thread name
  - Thread name: sans-serif, 12px, secondary text color
  - Row gap: 8px
  - **No thread summary sentences** — symbol and name only
  - **No hover summary text** — keep it clean
- Card hover state: border color upgrades to secondary border color

### 5. Historical Moment Band

The Historical Moment sits below the domain cards as a full-width band — visually distinct from the cards through color rather than position. This placement creates a natural reading sequence: here's what to study analytically (the cards), here's the historical world behind it (the band), here's when it happened (the timeline).

**Visual treatment:**
- Full width, same width as the card grid above
- Background: `rgba(180, 140, 70, 0.08)` — very subtle warm amber tint
- Border: `0.5px solid rgba(180, 140, 70, 0.35)` — amber-toned, distinct from the plain tertiary border on the domain cards
- Border radius: md (8px)
- Padding: 14px 20px
- Margin: 0 0 1.75rem (same spacing rhythm as the card grid above)
- Hover state: background deepens to `rgba(180, 140, 70, 0.13)`, border to `rgba(180, 140, 70, 0.55)`
- The **entire band is the click target** — wrap in an `<a>` tag, `display: flex`

**Interior layout (flex row, space-between):**
- Left side:
  - Eyebrow label: sans-serif, 10px, letter-spacing 0.1em, `rgba(180, 140, 70, 0.7)`, uppercase — reads "Historical moment"
  - Title: serif italic, 16px, primary text color — reads the unit's Historical Moment title (e.g. "The world in crisis")
  - Stack vertically, gap 3px
- Right side:
  - Arrow indicator: `→`, sans-serif, 18px, `rgba(180, 140, 70, 0.6)`

**No icon required.** The amber tint, the eyebrow label, and the italic serif title together communicate the element's distinct function. The color treatment does the work that the icon was trying to do.

**On click:** opens the Historical Moment pop-up modal containing the unit's Historical Moment text from `Historical_Moment_Final.md`.

### 6. Timeline Strip

- Section label: sans-serif, 11px, tertiary color, letter-spaced ("Timeline · c. 1600–1700")
- Top border rule separating it from the band above
- Horizontal layout: events spaced proportionally along a thin line (1px, tertiary color)
- Each event: dot (7px circle, tertiary fill) on the line + year label (10px, secondary) + event name (10px, tertiary) stacked below
- Overflow: horizontally scrollable on mobile (`overflow-x: auto`)
- Font sizes deliberately small — this is a scannable reference, not the main content
- Show only the 5 key events for the unit's era (selected and confirmed per unit — see tracker)
- The anchor text publication (e.g. "Paradise Lost, 1667") should be visually distinguished from historical events — slightly darker dot

---

## What Is Removed from the Current Hub

- Thread summary sentences from the domain cards
- Any full thread overview table
- Any descriptive text beyond the single introduction paragraph
- Side-by-side epigraph layout
- Icon-based Historical Moment trigger (replaced by the amber band)

---

## Mobile Considerations

- Domain cards: collapse to single column on narrow screens (below ~480px)
- Timeline strip: horizontally scrollable, does not wrap
- Epigraphs: already single column, no change needed

---

## Relationship to Phase_4_Planning.md

The hub design decisions recorded in Phase_4_Planning.md (Open Questions 1 and 2, now resolved) described the general structure correctly but did not specify the minimal, foyer-like aesthetic now established here. This document is the authoritative spec for hub page implementation. The sibling tab navigation on domain pages (breadcrumb + Philosophy · Science | Painting · Sculpture | Music) remains as specified in Phase_4_Planning.md.
