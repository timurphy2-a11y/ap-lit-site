# Symbol & Icon Implementation Instructions

## For Claude Code

This document specifies three sets of visual changes to implement on the AP Literature site:

1. **Three new sculpture thread pictogram symbols** — added to the `<ThreadIcon>` component
2. **New Painting sub-card icon** — replacing the current painting icon on hub page Visual Art cards
3. **New Sculpture sub-card icon** — replacing the current sculpture icon (column/pedestal) on hub page Visual Art cards

---

## 1. Sculpture Thread Pictogram Symbols

These are small (~24×24px) SVG pictograms used in the same contexts as the existing nine thread symbols: sidebar thread cards, "Threads Across Time" comparison tool, thread section headings. They should be added to the `<ThreadIcon>` component with the thread IDs shown below.

### Design principles (shared with existing symbols)
- Single gesture, 3–6 strokes
- Fits in ~24×24px viewbox
- Uses `stroke-linecap="round"` throughout
- Uses `currentColor` for strokes so the component can control color via CSS

### Symbol: Body & Volume
**Thread ID**: `body-volume`
**Color**: `#A08E78` (warm stone)
**Concept**: Sphere with cross-contour arc — a circle becomes a sphere when you add one curving cross-contour line.

```svg
<svg viewBox="-15 -15 30 30" width="24" height="24">
  <circle cx="0" cy="0" r="13" fill="none" stroke="#A08E78" stroke-width="1.5"/>
  <path d="M-12,2 Q0,-6 12,2" fill="none" stroke="#A08E78" stroke-width="1.3" stroke-linecap="round"/>
  <path d="M-10,8 Q0,3 10,8" fill="none" stroke="#A08E78" stroke-width="1" stroke-linecap="round" opacity="0.5"/>
</svg>
```

### Symbol: Material & Making
**Thread ID**: `material-making`
**Color**: `#8A8279` (neutral slate)
**Concept**: Single form with rough left edge, smooth right edge — the *non-finito* idea as a glyph.

```svg
<svg viewBox="-12 -16 24 32" width="24" height="24">
  <path d="M6,-14 L6,14" stroke="#8A8279" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M6,-14 L-4,-13" stroke="#8A8279" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M6,14 L-3,13" stroke="#8A8279" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M-4,-13 L-8,-9 L-5,-4 L-10,0 L-6,5 L-9,9 L-3,13"
        fill="none" stroke="#8A8279" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <line x1="1" y1="-6" x2="5" y2="-6" stroke="#8A8279" stroke-width="0.8" stroke-linecap="round" opacity="0.5"/>
  <line x1="0" y1="4" x2="5" y2="4" stroke="#8A8279" stroke-width="0.8" stroke-linecap="round" opacity="0.5"/>
</svg>
```

### Symbol: Space & Setting
**Thread ID**: `space-setting`
**Color**: `#7A8A96` (cool blue-gray)
**Concept**: Arch with small form inside — the architectural container that gives sculpture its meaning.

```svg
<svg viewBox="-16 -18 32 36" width="24" height="24">
  <path d="M-14,14 L-14,-2 Q-14,-14 0,-16 Q14,-14 14,-2 L14,14"
        fill="none" stroke="#7A8A96" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="0" cy="4" r="5" fill="none" stroke="#7A8A96" stroke-width="1.3"/>
  <line x1="-14" y1="14" x2="14" y2="14" stroke="#7A8A96" stroke-width="1.5" stroke-linecap="round"/>
</svg>
```

---

## 2. Painting Sub-Card Icon (Hub Pages)

Replaces the current painting icon on the Visual Art domain card on all six hub pages. This is a larger icon (~40–50px rendered) showing a framed painting with horizontal brushstrokes in multiple colors.

**Where it appears**: Hub page (`/units/XX-period/`) → Visual Art card → Painting sub-card

```svg
<svg viewBox="-28 -28 56 56" width="48" height="48">
  <!-- Outer frame -->
  <rect x="-26" y="-26" width="52" height="52" rx="3" fill="none" stroke="#B8925A" stroke-width="1.8"/>
  <!-- Inner mat -->
  <rect x="-21" y="-21" width="42" height="42" rx="1" fill="none" stroke="#B8925A" stroke-width="0.4" opacity="0.4"/>
  <!-- Brushstrokes — varied colors and widths for painterly feel -->
  <line x1="-17" y1="-15" x2="17" y2="-14" stroke="#C87A4A" stroke-width="3.5" stroke-linecap="round" opacity="0.75"/>
  <line x1="-16" y1="-6" x2="18" y2="-6.5" stroke="#8B6E4E" stroke-width="3" stroke-linecap="round" opacity="0.65"/>
  <line x1="-17" y1="2" x2="16" y2="2.5" stroke="#D4B86A" stroke-width="4" stroke-linecap="round" opacity="0.7"/>
  <line x1="-14" y1="10" x2="18" y2="10" stroke="#6A8FA8" stroke-width="3" stroke-linecap="round" opacity="0.6"/>
  <line x1="-17" y1="17" x2="17" y2="18" stroke="#7EA87E" stroke-width="3" stroke-linecap="round" opacity="0.55"/>
</svg>
```

### Color reference
| Stroke | Hex | Opacity | Width |
|--------|-----|---------|-------|
| Warm sienna | `#C87A4A` | 0.75 | 3.5px |
| Dark umber | `#8B6E4E` | 0.65 | 3px |
| Warm gold | `#D4B86A` | 0.70 | 4px |
| Cool blue | `#6A8FA8` | 0.60 | 3px |
| Sage green | `#7EA87E` | 0.55 | 3px |

### Design notes
- Strokes are not perfectly horizontal — slight y-offset variation (±0.5px) gives a hand-painted feel
- Frame stroke `#B8925A` at 1.8px with 3px corner radius
- Inner mat stroke is the same color at 0.4px and 40% opacity

---

## 3. Sculpture Sub-Card Icon (Hub Pages)

Replaces the current sculpture icon (brown pedestal/column) on the Visual Art domain card on all six hub pages. This is a classical pillar with three vertical flutes in the sculpture thread colors.

**Where it appears**: Hub page (`/units/XX-period/`) → Visual Art card → Sculpture sub-card

```svg
<svg viewBox="-17 -36 34 68" width="34" height="68">
  <!-- Capital -->
  <rect x="-15" y="-34" width="30" height="6" rx="2" fill="none" stroke="#8A8279" stroke-width="1.5"/>
  <!-- Shaft -->
  <rect x="-10" y="-28" width="20" height="56" rx="1" fill="none" stroke="#8A8279" stroke-width="1.5"/>
  <!-- Three vertical flutes in sculpture thread colors -->
  <line x1="-5" y1="-24" x2="-5" y2="24" stroke="#A08E78" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
  <line x1="0" y1="-24" x2="0" y2="24" stroke="#8A8279" stroke-width="2.5" stroke-linecap="round" opacity="0.55"/>
  <line x1="5" y1="-24" x2="5" y2="24" stroke="#7A8A96" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
  <!-- Base -->
  <rect x="-15" y="28" width="30" height="6" rx="2" fill="none" stroke="#8A8279" stroke-width="1.5"/>
</svg>
```

### Design notes
- Proportions are deliberately taller/narrower than a square to read as a column
- Shaft is 20×56px; capital and base are 30×6px
- The three flute colors match the three sculpture thread symbol colors:
  - Left flute: `#A08E78` (warm stone) = Body & Volume thread
  - Center flute: `#8A8279` (neutral slate) = Material & Making thread
  - Right flute: `#7A8A96` (cool blue-gray) = Space & Setting thread
- Flutes are 2.5px stroke, spaced 5px apart, at 55–60% opacity
- Outline/structural stroke color: `#8A8279` at 1.5px
- The painting and sculpture icons form a deliberate pair: horizontal brushstrokes vs. vertical flutes, both under the Visual Art umbrella

---

## Implementation Checklist

- [ ] Add three sculpture thread symbols to the `<ThreadIcon>` component with IDs `body-volume`, `material-making`, `space-setting`
- [ ] Verify sculpture thread symbols render correctly in thread cards on sculpture domain pages
- [ ] Replace the painting sub-card icon on all six hub pages with the new brushstroke frame SVG
- [ ] Replace the sculpture sub-card icon on all six hub pages with the new fluted pillar SVG
- [ ] Verify both sub-card icons render correctly on the dark card background
- [ ] Test at multiple viewport sizes — icons should remain legible on mobile
- [ ] Verify the sculpture pillar icon's taller aspect ratio does not break the card layout (it is intentionally non-square; the card layout may need a small height adjustment to accommodate)
