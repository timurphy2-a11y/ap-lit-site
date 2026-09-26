# Accessibility Fixes & Design Enhancement Plan

## For Implementation by Claude Code

This document describes accessibility issues found during a WCAG contrast audit of the AP Literature Background Materials site (https://mellifluous-froyo-bcc70b.netlify.app/), along with design enhancements to strengthen the site's museum-exhibit aesthetic. The accessibility fixes are **priority 1** — they should be implemented before any design enhancements.

---

## Part 1: Accessibility Fixes (Priority 1)

### Background

The site uses a dark-mode palette: very dark brown background (`rgb(26, 20, 12)`) with cream/parchment body text (`rgb(242, 232, 213)`). The core reading experience is excellent (15:1 contrast ratio, WCAG AAA). But several secondary UI elements fall below WCAG AA thresholds, and two of the six unit accent colors fail for normal-sized text. The site's primary user is a teacher who is red-green colorblind; approximately 8% of male students share some form of color vision deficiency.

### WCAG Contrast Audit Results

**Page background for all calculations: `rgb(26, 20, 12)`**

#### Passing — No Action Needed

| Element | Color | Ratio | Grade |
|---------|-------|-------|-------|
| Body text (cream) | `rgb(242, 232, 213)` | 15.03:1 | AAA |
| H2 headings (white) | `rgb(255, 255, 255)` | 18.27:1 | AAA |
| Unit 01 Renaissance accent (gold) | `rgb(232, 168, 32)` | 8.75:1 | AAA |
| Unit 03 Enlightenment accent (sky blue) | `rgb(72, 160, 224)` | 6.42:1 | AA |
| Unit 05 Modernism accent (green) | `rgb(58, 168, 122)` | 6.14:1 | AA |
| Unit 00 Medieval accent (steel blue) | `rgb(91, 130, 200)` | 4.76:1 | AA |
| BioLink text (gold) | `rgb(232, 168, 32)` | 8.75:1 | AAA |

#### Failing — Fixes Required

**FIX 1 (Critical): Inactive tab labels and section headers**
- Current: `rgb(110, 94, 72)` — **2.92:1 — FAILS all WCAG levels**
- Used for: inactive domain tabs ("Visual Art", "Music" when not selected), section headers like "ANALYTICAL THREADS", "READINGS", "FEATURED LISTENING", "GALLERY", date/subtitle text, and similar secondary labels throughout the site
- **Fix**: Brighten to approximately `rgb(160, 145, 120)` or lighter — target **minimum 4.5:1** for normal text
- Suggested value: `rgb(165, 150, 125)` → ~5.2:1 (AA for normal text)
- This is the single most impactful accessibility fix. These labels appear on every page and are currently genuinely hard to read.

**FIX 2 (Important): Unit 02 Baroque accent color**
- Current: `rgb(192, 64, 80)` — **3.56:1 — FAILS for normal text** (passes AA for large text only)
- Used for: "Unit 02" label, active Philosophy tab on Baroque page, "Connection to *Paradise Lost*" headings, thread card titles
- **Fix**: Brighten to approximately `rgb(215, 90, 105)` — target **minimum 4.5:1**
- Suggested value: `rgb(220, 95, 108)` → ~4.8:1 (AA for normal text)
- Keep the hue/character of the color — just push it lighter.

**FIX 3 (Important): Unit 04 Romanticism accent color**
- Current: `rgb(155, 88, 184)` — **3.90:1 — FAILS for normal text** (passes AA for large text only)
- Used for: "Unit 04" label, active Philosophy tab on Romanticism page, thread card titles
- **Fix**: Brighten to approximately `rgb(180, 115, 205)` — target **minimum 4.5:1**
- Suggested value: `rgb(185, 120, 210)` → ~5.0:1 (AA for normal text)

**FIX 4 (Recommended): Nav link color**
- Current: `rgb(160, 144, 112)` — **5.85:1 — passes AA but not AAA**
- Used for: top navigation links ("Timeline", "People", "Compare", "Art", "Music"), previous/next unit links
- This passes AA and is not strictly failing, but given that these are navigation elements that need to be easily scannable, bumping brightness slightly would help.
- **Optional fix**: Brighten to `rgb(175, 160, 130)` → ~6.8:1 (closer to AAA)

### Color Blindness Considerations

**FIX 5 (Recommended): Don't rely on color alone to distinguish units or threads**

The six unit accent colors after fixes:

| Unit | Color | Character |
|------|-------|-----------|
| 00 | Steel blue | Cool |
| 01 | Warm gold | Warm, bright |
| 02 | Rose-red (brightened) | Warm, saturated |
| 03 | Sky blue | Cool, bright |
| 04 | Purple (brightened) | Cool, saturated |
| 05 | Green | Cool, medium |

For red-green colorblind users (protanopia/deuteranopia — ~8% of men), Units 02 (rose-red) and 05 (green) may appear similar, and Unit 04 (purple) may shift toward blue, potentially merging with Units 00 or 03.

The site already handles this well in most cases — unit numbers (00–05) and titles are always visible alongside the accent color. But:

- **Thread cards in the sidebar** use color-coded left borders (e.g., rose for "Human Position", gold for "Knowledge", teal for "Individual and Authority"). Consider adding a subtle icon or shape marker to each thread in addition to the color. For example: a small circle ● for Thread 1, a diamond ◆ for Thread 2, a square ■ for Thread 3. These are lightweight and reinforce the thread identity without relying on color.
- **Ensure the `alt` text or `aria-label` on any color-only elements includes the unit or thread name**, so screen readers can identify them.

### Implementation Notes

- All fixes are CSS color changes — no structural HTML changes needed.
- Search the codebase for the exact color values being replaced (some may be defined as CSS custom properties, Tailwind classes, or inline values).
- After applying fixes, visually verify on: the home page unit cards, a unit page (check tabs, thread cards, section labels), the "Threads Across Time" comparison page, and the "Seeing Through Paint" page.
- Test with a browser extension that simulates color vision deficiency (e.g., Chrome DevTools → Rendering → Emulate vision deficiencies) to verify the palette works for colorblind users.

---

## Part 2: Design Enhancements (Priority 2)

The site already has a strong aesthetic — dark, warm, content-focused, with a scholarly feel. The "museum exhibit" analogy is apt: dark walls, well-lit objects, quiet sophistication. These suggestions are about refining that identity, not changing it.

### Enhancement 1: Painting Presentation — Museum-Style Framing

Currently, paintings are displayed as rectangular images flush against the dark background. This works, but adding a subtle frame treatment would reinforce the museum-exhibit metaphor and give the paintings more visual presence.

**Suggestion**: Add a thin, warm-toned border (1–2px, `rgba(180, 165, 140, 0.3)`) around painting images, with a slightly wider `padding` creating a narrow "mat" effect between the image and the border. The dark background already functions as the museum wall; the frame signals that this is an object being presented for contemplation.

```css
/* Example — adjust values to taste */
.painting-image {
  border: 1px solid rgba(180, 165, 140, 0.3);
  padding: 6px;
  background: rgba(180, 165, 140, 0.05); /* very subtle mat */
}
```

Keep this subtle — the paintings should be the focus, not the frame. No drop shadows or heavy borders.

### Enhancement 2: Tombstone-Style Captions

Museum exhibits use a consistent caption format called a "tombstone" — title, artist, date, medium, and collection, arranged in a specific typographic hierarchy. The site already includes this information beneath paintings, but the formatting could be tightened to feel more intentionally museum-like.

**Suggestion**: Style painting captions with:
- **Title** in italic, slightly larger than the rest
- **Artist name** in small caps or regular weight
- **Date · Medium** on a second line in the secondary text color
- **Collection/Location** on a third line, same secondary color

This is a small typography refinement, not a layout change. The goal is to make each painting feel like it has a proper museum label beneath it.

### Enhancement 3: Pull Quotes for Key Philosophical Passages

The philosophy sections contain powerful quotations from primary sources (Pascal's "thinking reed," Pico's oration, Emerson's "transparent eyeball"). Currently these sit inline with the body text. Pulling the most important one or two per section into a styled blockquote — slightly larger, with the source attribution styled beneath — would create visual breathing room and give students an anchor point on the page.

**Suggestion**: Style for key quotations:
- Slightly larger font size (1.1em)
- Left border in the unit's accent color (already used for thread cards)
- Generous top/bottom margin
- Source attribution right-aligned beneath in the secondary text color
- Use sparingly — one or two per domain section, not every quotation

### Enhancement 4: Subtle Section Dividers

The current site uses whitespace to separate sections, which is clean. But within the long domain sections, a subtle horizontal rule between major subsections (between thread analyses, for instance) could help students track their position.

**Suggestion**: A thin, barely-visible horizontal rule — `1px solid rgba(180, 165, 140, 0.15)` — between each thread section. Not a bold divider, just a whisper of structure. Museums use similar subtle lines between wall panels of text.

### Enhancement 5: Painting Gallery — Hover Effect

The gallery paintings at the bottom of each art section are currently static images in a grid. Adding a subtle hover effect — a slight scale (1.02) with a smooth transition and a brief reveal of the painting's title — would invite interaction and make the gallery feel more alive without being distracting.

```css
.gallery-image {
  transition: transform 0.3s ease;
}
.gallery-image:hover {
  transform: scale(1.02);
}
```

### Enhancement 6: Typography Refinement — Drop Caps

Consider adding a drop cap to the first paragraph of each major section introduction. This is a classic book-design convention that signals "this is where the essay begins" and reinforces the literary, scholarly character of the site. Use the unit accent color for the drop cap letter.

```css
.intro-paragraph::first-letter {
  float: left;
  font-size: 3.2em;
  line-height: 0.8;
  padding-right: 8px;
  padding-top: 4px;
  color: var(--unit-accent-color);
  font-family: serif; /* or the site's heading font */
}
```

This should only appear on the main introduction paragraph of each domain section, not on every paragraph.

### Enhancements NOT Recommended

- **Background textures or patterns**: The clean dark background is one of the site's strengths. Don't add linen textures, parchment backgrounds, or similar effects — they'd feel decorative rather than scholarly.
- **Parallax scrolling or animation on paintings**: Museums present art in stillness. Keep images static.
- **Ornamental dividers or flourishes**: Decorative swirls, ornamental rules, or calligraphic elements would push the design toward "Renaissance Faire" rather than "museum exhibit." Keep it clean.
- **Lightbox/modal for paintings**: The current inline presentation works well. A lightbox would add interaction overhead without much benefit for reproductions at this size.

---

## Part 3: Analytical Thread Symbols (Enhancement 7)

### Concept

Each of the nine analytical threads gets a unique pictogram — a small, meaningful symbol that evokes the thread's guiding question. These replace the current basic geometric markers (●◆■) on thread cards with symbols that are more distinctive, more evocative, and more useful for colorblind accessibility (since thread identity can now be read from shape alone, not just color).

The symbols should feel like **museum wayfinding icons** — clean, minimal, stroke-based, immediately recognizable at small sizes (16–20px). They use the same warm, muted tones as the rest of the site palette, with each domain having a slightly different color temperature.

### Design Specifications

All symbols are drawn as inline SVGs, approximately 24×24px, using 1–1.5px strokes with rounded linecaps. They should be implemented as a reusable component (e.g., `<ThreadIcon thread="human-position" />`) that can be used anywhere thread identity needs to be signaled: sidebar thread cards, the "Threads Across Time" comparison tool, thread section headings within domain pages, and eventually the Phase 4 Science and Sculpture threads.

### The Nine Current Thread Symbols

#### Philosophy Threads (warm copper tones — `#D4966A` family)

**The Human Position** — A stick figure standing on a horizon line, arms slightly extended. Evokes "where do we stand in the order of things?" The figure is centered, upright, small against implied space.

```svg
<!-- ~24x30 viewbox, stroke #D4966A, 1.5px -->
<circle cx="0" cy="-14" r="5" fill="none" stroke="currentColor" stroke-width="1.5"/>
<line x1="0" y1="-9" x2="0" y2="6" stroke="currentColor" stroke-width="1.5"/>
<line x1="-8" y1="-3" x2="8" y2="-3" stroke="currentColor" stroke-width="1.5"/>
<line x1="0" y1="6" x2="-6" y2="16" stroke="currentColor" stroke-width="1.5"/>
<line x1="0" y1="6" x2="6" y2="16" stroke="currentColor" stroke-width="1.5"/>
```

**Knowledge and Its Limits** — An open eye. The almond-shaped outline with a circle iris and filled pupil. Evokes seeing, perception, the act of knowing — and the boundary of what can be seen.

```svg
<!-- ~24x22 viewbox, stroke #C8A84E, 1.5px -->
<path d="M-12,0 Q0,-11 12,0 Q0,11 -12,0Z" fill="none" stroke="currentColor" stroke-width="1.5"/>
<circle cx="0" cy="0" r="4" fill="none" stroke="currentColor" stroke-width="1.5"/>
<circle cx="0" cy="0" r="1.5" fill="currentColor"/>
```

**The Individual and Authority** — A horizontal bar (authority/structure) with a single vertical line descending from it, ending in a small open circle (the individual beneath). Evokes the relationship between person and power, the weight of structure on the self.

```svg
<!-- ~20x24 viewbox, stroke #6AA3B8, 1.5px -->
<line x1="-10" y1="-12" x2="10" y2="-12" stroke="currentColor" stroke-width="2.5"/>
<line x1="0" y1="-12" x2="0" y2="12" stroke="currentColor" stroke-width="1.5"/>
<circle cx="0" cy="12" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
```

#### Painting Threads (warm gold/brown tones)

**Figure and Space** — A tiny figure silhouette inside a rectangular frame. Evokes the relationship between the human body and the pictorial space that contains it — the central question of this thread across all six periods.

```svg
<!-- ~26x26 viewbox, stroke #B8925A, 1.2px -->
<rect x="-13" y="-13" width="26" height="26" rx="2" fill="none" stroke="currentColor" stroke-width="1"/>
<circle cx="0" cy="-5" r="3" fill="none" stroke="currentColor" stroke-width="1.2"/>
<path d="M-5,10 L-3,2 L0,0 L3,2 L5,10" fill="none" stroke="currentColor" stroke-width="1.2"/>
```

**Light and Shadow** — A circle divided vertically: left half filled, right half open. The simplest possible representation of the interplay between illumination and darkness.

```svg
<!-- ~22x22 viewbox, stroke #D4B86A, 1.2px -->
<circle cx="0" cy="0" r="11" fill="none" stroke="currentColor" stroke-width="1.2"/>
<path d="M0,-11 A11,11 0 0,0 0,11Z" fill="currentColor" opacity="0.7"/>
```

**Brushwork and Surface** — Three short diagonal strokes of varying thickness, like actual brushmarks on a surface. Thickest on the left, thinnest on the right — suggesting the range from heavy impasto to delicate glazing.

```svg
<!-- ~22x18 viewbox, stroke #9E8B6E -->
<line x1="-10" y1="8" x2="-4" y2="-8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
<line x1="-2" y1="10" x2="4" y2="-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
<line x1="6" y1="8" x2="12" y2="-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
```

#### Music Threads (green-earth tones)

**Texture and Voices** — Three horizontal parallel lines of equal weight. Evokes a staff fragment, parallel melodic voices, the layered texture of polyphony.

```svg
<!-- ~24x16 viewbox, stroke #7EA87E, 1.5px -->
<line x1="-12" y1="-8" x2="12" y2="-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
<line x1="-10" y1="0" x2="10" y2="0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
<line x1="-12" y1="8" x2="12" y2="8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
```

**Consonance and Dissonance** — A smooth wave on the left meeting a jagged wave on the right. Directly visualizes the thread's subject: harmonic smoothness versus tension.

```svg
<!-- ~24x14 viewbox, stroke #A0845C, 1.5px -->
<path d="M-12,4 Q-6,-10 0,4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
<path d="M0,4 L4,-8 L8,2 L12,-6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
```

**Structure and Freedom** — A 2×3 grid of dots with the last dot displaced from its expected position, trailing a faint dashed line from where it "should" be. Evokes inherited structure and the impulse to break free of it.

```svg
<!-- ~20x14 viewbox, fill #8B7A62 -->
<circle cx="-8" cy="-6" r="2" fill="currentColor"/>
<circle cx="0" cy="-6" r="2" fill="currentColor"/>
<circle cx="8" cy="-6" r="2" fill="currentColor"/>
<circle cx="-8" cy="2" r="2" fill="currentColor"/>
<circle cx="0" cy="2" r="2" fill="currentColor"/>
<circle cx="12" cy="-2" r="2" fill="currentColor"/>
<path d="M8,2 Q10,0 12,-2" fill="none" stroke="currentColor" stroke-width="0.8" stroke-dasharray="2 2"/>
```

### Phase 4 Thread Symbols (For Future Implementation)

When the Science sub-domain is added (Phase 4d), these three symbols should be used. They share a steel-blue color family (`#7E9CB8`) that distinguishes them from the philosophy copper tones while remaining within the warm-neutral palette.

**Method and Evidence** — A flask/beaker outline. Evokes laboratory investigation, the physical practice of science.

```svg
<path d="M-4,-12 L-4,-2 L-10,10 L10,10 L4,-2 L4,-12Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
<line x1="-5" y1="-12" x2="5" y2="-12" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
```

**The Cosmos and the Human Place** — Concentric circles (planetary orbits) with a small filled dot at center and another on an outer ring. Evokes the Copernican picture of the universe and the question of where humanity fits in it.

```svg
<circle cx="0" cy="0" r="11" fill="none" stroke="currentColor" stroke-width="0.8"/>
<circle cx="0" cy="0" r="6" fill="none" stroke="currentColor" stroke-width="0.8"/>
<circle cx="0" cy="0" r="2" fill="currentColor"/>
<circle cx="9" cy="5" r="1.5" fill="currentColor"/>
```

**Science and Culture** — Two overlapping circles (Venn diagram). Evokes the intersection of scientific and artistic/literary worlds — the thread's central question.

```svg
<circle cx="-5" cy="0" r="9" fill="none" stroke="currentColor" stroke-width="1.2"/>
<circle cx="5" cy="0" r="9" fill="none" stroke="currentColor" stroke-width="1.2"/>
```

Sculpture thread symbols (Phase 4c) should be designed when that content is closer to implementation. They should use a color family distinct from both the painting gold-browns and the science steel-blues — perhaps a warm gray or slate tone. The three threads (Body and Volume, Material and Making, Space and Setting) suggest symbols like: a three-dimensional cube or sphere for Body and Volume, a chisel or hammer for Material and Making, and an arch or architectural niche for Space and Setting. These are preliminary ideas to be refined later.

### Where Symbols Appear

Thread symbols should be used consistently everywhere thread identity is displayed:

1. **Sidebar thread cards** on unit pages (replacing current ●◆■ markers)
2. **"Threads Across Time" comparison tool** — next to each thread name in the selector buttons and in the period cards
3. **Thread section headings** within domain pages (e.g., next to "## The Human Position" in the philosophy text)
4. **The hub page** (Phase 4) — in the thread summary area, giving students a visual map of the analytical framework before they dive into content
5. **"Seeing Through Paint" / "Hearing Through Form"** shared resource pages — in the thread summary boxes at the bottom of each period section

### Accessibility Note

These symbols directly address the colorblind accessibility concern from Part 1 (Fix 5). With pictograms in place, thread identity is conveyed through **both** color and shape. A student with protanopia who can't distinguish the rose thread card from the teal thread card can still tell the eye (Knowledge) from the parallel lines (Texture) from the half-moon (Light and Shadow). The symbols make the color coding supplementary rather than essential — which is exactly what WCAG guidelines recommend.

---

## Summary of Changes

### Must Do (Accessibility)
1. Brighten inactive tab / section label color from `rgb(110, 94, 72)` to ~`rgb(165, 150, 125)`
2. Brighten Baroque accent from `rgb(192, 64, 80)` to ~`rgb(220, 95, 108)`
3. Brighten Romanticism accent from `rgb(155, 88, 184)` to ~`rgb(185, 120, 210)`
4. Optionally brighten nav links from `rgb(160, 144, 112)` to ~`rgb(175, 160, 130)`

### Nice to Have (Design)
1. Subtle frame/mat treatment on painting images
2. Museum-style tombstone captions for paintings
3. Styled pull quotes for key philosophical passages (see separate Pull Quote Selections document)
4. Subtle horizontal rules between thread sections
5. Hover effect on gallery paintings
6. Drop cap on section introduction paragraphs
7. **Analytical thread pictograms** — unique SVG symbols for all nine threads, replacing basic geometric markers (see Part 3 above). This also resolves the colorblind accessibility concern (former Fix 5) by making thread identity readable from shape alone.
