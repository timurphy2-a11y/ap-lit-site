# Pachinko World — Maps Design Handoff

**For:** Claude Design  
**Purpose:** Reproduce and iterate on the two engraved maps in the Pachinko *World of the Novel* spoke  
**Live page:** https://ap-lit-site.tmurphy-ef9.workers.dev/summer-reading/pachinko/world

---

## Overview

The Pachinko World spoke (`/summer-reading/pachinko/world`) uses a scrollytelling architecture: a sticky visual field (photo or map) sits on the left while text "beats" scroll past on the right. When the reader scrolls into a new beat, the map reveals the next layer of geography.

There are **two maps** on this page, appearing in Zones 3 and 5:

| Zone | Map | File | States |
|------|-----|------|--------|
| Zone 3 | Korea Strait — Busan to Shimonoseki | `src/components/summer-reading/KoreaStraitMap.astro` | 6 progressive reveals |
| Zone 5 | Japan — Ikaino (Osaka) to Tokyo | `src/components/summer-reading/JapanMap.astro` | 2 progressive reveals |

---

## Design Language

Both maps share an **engraved cartographic** aesthetic — old-fashioned chart plates, not modern data-viz.

### Color palette

| Role | Value | Usage |
|------|-------|-------|
| Sea / background | `#F1EADA` | Aged parchment fill for the sea; also the card/halo bg |
| Grid lines | `#C9B68E`, 0.3 opacity | Coordinate grid across both maps |
| Korean land — fill | `#ECDDC4` + `#B0541A` hatch at 42% | Hatched pattern `kmHatchKr` |
| Korean land — stroke | `#8E4112` | Outlines |
| Korean land — label/dot | `#7C3A10` (dark ember), `#B0541A` (medium ember) | City labels, dots |
| Japanese land — fill | `#E3E3DD` + `#5C6670` hatch at 38% | Hatched pattern `kmHatchJp` |
| Japanese land — stroke | `#3B454F` | Outlines |
| Japanese land — label/dot | `#2E3842` (dark graphite), `#49545F` (medium graphite) | City labels, dots |
| Route line | `#9C6B2E` | Amber dashes, arrowheads |
| Compass / scale | `#5A4A30` / `#6B6355` | Warm charcoal |
| Shoreline halo (blur) | `#DCC49B` (Korean) / `#C6C9C6` (Japanese) | Gaussian blur glow behind land edges |
| Muted text | CSS `var(--color-muted)` | Tag labels (coordinate labels, legend text) |

### Typography

| Class | Font | Style | Usage |
|-------|------|-------|-------|
| `.km-city` / `.jm-city` | `"Fraunces", ui-serif, serif` | upright, weight 600, white halo paint-order | Settlement names (Busan, Tokyo, etc.) |
| `.km-region` / `.jm-region` | `"Fraunces"` | italic, white halo | Large territory labels (Korea, Kyūshū, Honshū) |
| `.km-water` / `.jm-water` | `"Fraunces"` | italic, fill `#71808A` | Water body labels (Korea Strait, Sea of Japan) |
| `.km-island` / `.jm-island` | `"Fraunces"` | italic, fill `#2E3842` | Island names (Tsushima, Iki) |
| `.km-tag` / `.jm-tag` | `var(--font-mono)` | uppercase, letter-spacing `.12em`, fill `var(--color-muted)` | Coordinate labels, scale text, legend labels |

**Macron note:** Kyūshū and Honshū are rendered without `letter-spacing` on those specific `<text>` elements, because CSS letter-spacing detaches combining macrons from their base letters in SVG.

### Land fill patterns

Both maps use SVG `<pattern>` with hatching at 45°:

```svg
<!-- Korean land — warm ember -->
<pattern id="kmHatchKr" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
  <rect width="6" height="6" fill="#ECDDC4" />
  <line x1="0" y1="0" x2="0" y2="6" stroke="#B0541A" stroke-width="0.7" opacity="0.42" />
</pattern>

<!-- Japanese land — cool graphite -->
<pattern id="kmHatchJp" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
  <rect width="6" height="6" fill="#E3E3DD" />
  <line x1="0" y1="0" x2="0" y2="6" stroke="#5C6670" stroke-width="0.7" opacity="0.38" />
</pattern>
```

### Shoreline halo technique

Each land mass gets a blurred shadow path rendered behind the stroked path — same shape data, different fill, filtered with `feGaussianBlur stdDeviation="3.5"`. Korean halos are warm `#DCC49B`; Japanese halos are cool `#C6C9C6`.

### Furniture

Both maps include:
- **Compass rose** — 4-point, `#5A4A30`, rendered as `<path>` arrowheads + `<circle>` border + N label
- **Scale bar** — tick-marked 3-segment line with 0 and max-km labels in `.km-tag` / `.jm-tag`
- **Legend box** — rounded-rect background at 72% opacity, hatched swatches + labels

---

## Map 1: Korea Strait (`KoreaStraitMap.astro`)

**ViewBox:** `0 0 660 460`  
**File:** `src/components/summer-reading/KoreaStraitMap.astro`

### Geography

| Element | Description |
|---------|-------------|
| Korean mainland (left) | Southeastern peninsula tip — approximates real Mercator coastline around Busan, traced from Natural Earth 1:50m |
| Geoje island | Small Korean island south of the mainland |
| Kyūshū (right) | Northwestern Kyushu (large island, partial) |
| Tsushima | Narrow island in mid-strait, labeled italic |
| Iki | Small island near Kyushu, labeled italic |

### Progressive reveals (6 states)

Each state is controlled by `data-state` on `.sr-zone-map-field`; CSS accumulates all prior states' layers:

| State name | What appears | Beat text (trigger) |
|------------|-------------|---------------------|
| `route-base` | Busan dot + label (ember); Shimonoseki dot + label (graphite) | "Busan mattered geographically because it was the city Koreans crossed from when they came to Japan." |
| `route-line` | Dashed amber arc Busan → Shimonoseki + arrowhead | "The ferry route from Busan to Shimonoseki — roughly 200 kilometers…" |
| `year-1905` | Small tag "1905" at mid-route | "In 1905, the route opened as Japan gained protectorate control." |
| `volume-1930` | Thicker dashed overlay on same route (visually doubles the line) | "At its 1930 peak, 400,000 Koreans entered Japan in a single year…" |
| `inspection` | Small diamond checkpoint marker on the route arc | "Travelers were required to prove they carried at least ten yen…" |
| `ikaino-marker` | Dashed leader line from Shimonoseki area + ember dot labeled "Ikaino / Osaka →" | "Those who passed inspection arrived in Osaka and built a community in Ikaino…" |

### Static elements (always visible)

- Korean mainland land mass + Geoje island (ember hatch)
- Kyūshū land mass (graphite hatch), partial Tsushima, Iki
- "Korea" italic label
- "Kyūshū" italic label
- "Korea Strait" italic label (water, rotated −19°)
- "Tsushima" island label
- "Iki" island label
- "Yeongdo" coordinate tag (monospace, small, marks the novel's opening location)
- Coordinate grid lines (130°E vertical, 34°N horizontal)
- Grid labels ("130°E", "34°N") in `.km-tag`
- Compass rose (upper right)
- Scale bar 0–100 km (lower left)
- Legend box: Korean territory + Japanese territory swatches

---

## Map 2: Japan (`JapanMap.astro`)

**ViewBox:** `0 0 720 460`  
**File:** `src/components/summer-reading/JapanMap.astro`

### Geography

All land is graphite — the entire map is Japan. The ember color is reserved exclusively for the Ikaino community dot (a Korean enclave inside Japanese territory). Land paths trace Honshu (main island, rendered as a curving NE–SW arc) and Shikoku (smaller rectangular island, lower left).

Key landmarks:
- **Mt Fuji** — small triangle glyph with "Fuji" tag, as a geographic orientation anchor
- **Honshū** — italic label with rotation −13°
- **Shikoku** — italic label
- **Sea of Japan** (upper water label)
- **Pacific Ocean** (lower water label)

### Progressive reveals (2 states)

| State name | What appears | Beat text (trigger) |
|------------|-------------|---------------------|
| `osaka-marker` | Ember dot at Osaka/Ikaino position + label "Ikaino" (city) + "Osaka" (tag) | "After Sunja and Isak arrive in Japan, the novel's geographic center shifts to Osaka — specifically to the Ikaino neighborhood…" |
| `tokyo-marker` | Dashed amber route Osaka → Tokyo along Honshu coast + arrowhead + graphite dot at Tokyo + "Tokyo" label + "1989" tag | "The novel's later sections move to Tokyo, where Solomon works in the 1989 chapters." |

### Static elements (always visible)

- Honshu land mass (graphite hatch, large)
- Shikoku land mass (graphite hatch, small)
- Mt Fuji triangle glyph
- "Honshū" italic label (rotated)
- "Shikoku" italic label
- "Sea of Japan" water label
- "Pacific Ocean" water label
- Coordinate grid (two verticals, two horizontals — unlabeled)
- Compass rose (upper right)
- Scale bar 0–200 km (lower left)
- Legend box: Japanese territory hatch swatch + Korean community ember dot

---

## Scrolly Mechanic (How the Reveals Work)

The scrollytelling controller lives in `src/components/summer-reading/ScrollyZone.astro` (`<script>` block).

1. `.sr-zone-beat[data-beat]` elements are observed with `IntersectionObserver` using `rootMargin: '-38% 0px -38% 0px'` — so a beat activates when its top edge crosses 38% down from the top of the viewport.
2. When a beat becomes active, the script reads `beat.dataset.activates` and writes that value to `field.dataset.state` on the `.sr-zone-map-field` container.
3. CSS in `src/styles/scrolly-zones.css` uses attribute selectors to show the correct accumulated set of `[data-show-from]` groups:

```css
/* Example: when state="volume-1930", show all four states cumulatively */
.sr-zone-map-field[data-state="volume-1930"] [data-show-from="route-base"],
.sr-zone-map-field[data-state="volume-1930"] [data-show-from="route-line"],
.sr-zone-map-field[data-state="volume-1930"] [data-show-from="year-1905"],
.sr-zone-map-field[data-state="volume-1930"] [data-show-from="volume-1930"] { opacity: 1; }
```

4. All `[data-show-from]` groups start at `opacity: 0` with `transition: opacity 0.45s ease`. No JS animation — pure CSS opacity fade.

### Mobile fallback

Below 768px, all `[data-show-from]` groups are set to `opacity: 1` (static; all layers visible) and the sticky field becomes `position: static`. The scrolly mechanic simply doesn't run.

### Reduced-motion fallback

With `prefers-reduced-motion: reduce`, same treatment — all groups `opacity: 1`, no transitions.

---

## File Inventory

| File | Role |
|------|------|
| `src/components/summer-reading/KoreaStraitMap.astro` | Map 1 SVG — Korea Strait |
| `src/components/summer-reading/JapanMap.astro` | Map 2 SVG — Japan (Honshu) |
| `src/components/summer-reading/ScrollyZone.astro` | Zone wrapper + scrolly controller script |
| `src/styles/scrolly-zones.css` | All layout, beat, map field, and reveal CSS |
| `src/content/summer-reading/pachinko/world.mdx` | Zone/beat content, activates= props |
| `src/pages/summer-reading/pachinko/world.astro` | Page shell (thin wrapper) |

The migration-map scrolly experience (`/summer-reading/pachinko/migration-map`) is a separate, standalone page using a different architecture (simple `IntersectionObserver` on `.scrolly-chapter` sections, not the `ScrollyZone` component). It has its own inline SVG map built directly into the `.astro` page file.

---

## Key Design Decisions to Preserve

1. **Engraved plate aesthetic** — hatched fills over aged parchment (#F1EADA). The parchment also fills the map field background, so the SVG blends seamlessly into the container.
2. **Color as geopolitical signal** — ember = Korean, graphite = Japanese. This visual grammar runs through the entire Pachinko spoke (not just the maps). The Japan map uses an ember dot *inside* an all-graphite map as a deliberate metaphor: a Korean community enclosed within Japanese space.
3. **Accumulative not toggled** — each new scroll state *adds* to the map, never subtracts. The user's journey through the route from Korea to Japan is mirrored in the build-up of layers on screen.
4. **Fraunces for cartographic text** — the display serif carries the "historical chart" register. The monospace font (`var(--font-mono)`) is used for coordinate labels and map tags, extending the data/document idiom from elsewhere in the spoke.
5. **No JS animation in the maps** — all transitions are CSS `opacity`. The only JS is the state-switching write to `data-state`. This keeps the maps accessible and lightweight.
