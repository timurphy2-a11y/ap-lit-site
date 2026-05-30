# Pachinko World — Session Handoff (R1 Revisions)
AP Literature Summer Reading Site | Hopkinton Public Schools
Written: May 2026

---

## Read this first

This handoff is for a **continuing session**, not a fresh start. The Pachinko World page is fully built and deployed. The next session's job is to apply the round-1 revision punch list (items 1–5 and 8 below). **Load the repo before reading the revision items** — every reference to "the cream card panel," "beat dwell," "cascade entries," etc. points at code that already exists.

Two URLs are live:
- **Production (original):** `https://ap-lit-site.tmurphy-ef9.workers.dev/summer-reading/pachinko/world`
- **Preview (current build):** `https://ap-lit-site-preview.tmurphy-ef9.workers.dev/summer-reading/pachinko/world`

The preview Worker is a separate Cloudflare deployment (Worker name `ap-lit-site-preview`). It does not affect production. Revisions should be deployed to preview again for review before touching production.

---

## What was built — architecture summary

A full-spoke scrollytelling page at `/summer-reading/pachinko/world` using a new component system:

**New components (all untracked/uncommitted in main repo):**
- `src/components/summer-reading/ScrollyZone.astro` — zone wrapper, owns all scroll behavior
- `src/components/summer-reading/Beat.astro` — IO-observed text unit with `data-beat` attribute
- `src/components/summer-reading/ZoneSeam.astro` — rosette motif between zones
- `src/components/summer-reading/CascadeEntry.astro` — timeline pin entry
- `src/components/summer-reading/KoreaStraitMap.astro` — SVG schematic map, 6 progressive states
- `src/components/summer-reading/JapanMap.astro` — SVG schematic map, 2 progressive states

**New CSS:**
- `src/styles/scrolly-zones.css` — entire scrolly zone architecture (imported by `summer-reading.css`)

**Modified files:**
- `src/components/summer-reading/index.ts` — exports the 4 new components
- `src/content/summer-reading/pachinko/world.mdx` — rewritten to ScrollyZone markup
- `src/styles/summer-reading.css` — added `@import './scrolly-zones.css'`

**Note: none of these changes are committed to git.** They exist as working-tree modifications and new untracked files in the main repo at `/Users/timothymurphy/ap-lit-site`.

**Architecture recap (one mechanic, two levers):**
- Sticky `position: sticky; top: 0; height: 100vh` visual field (photo/map/cascade/ground)
- Beats container pulled back with `margin-top: -100vh`, z-index:1 over the field
- IntersectionObserver (`threshold: 0`, `rootMargin: '-38% 0px -38% 0px'`) activates beats as they enter the center 24% of the viewport
- Beat opacity: `0.2` → `1` on `.is-active` (450ms ease transition)
- Map state forwarded via `field.dataset.state` → CSS accumulative reveals on `[data-show-from]` elements
- Cascade zone uses CSS Grid (64px rail + 1fr content) instead of the overlay mechanic
- Mobile (<768px) and `prefers-reduced-motion`: CSS static fallback, all beats full opacity

**Seven zones + six seams:**
1. Zone 1 — photo/contemplative/cream — Yeongdo 1921 — 3 beats (+ persistent caption)
2. Zone 2 — photo/steady/tinted — Main street of Fusan — 2 beats
3. Zone 3 — map/driving/cream — Korea Strait crossing — 6 beats with `activates` forwarding
4. Zone 4 — cascade/driving/tinted — Timeline 1876–1989 — lead Beat + 12 CascadeEntries
5. Zone 5 — map/steady/cream — Japan (Osaka→Tokyo) — 3 beats (1 termcard for Ikaino)
6. Zone 6 — ground/still/tinted — Four Generations (SideBySide)
7a. Zone 7a — photo/contemplative/cream — Pachinko machine — 3 beats
7b. Zone 7b — ground/still/cream — 2 PullQuotes + EndSignature

---

## Design tokens (scrolly-zones.css / tokens.css)

```
--color-cream:   #F6F1E8    (zone ground, beat card bg)
--color-card:    #EDE8DC    (tinted zone ground)
--color-ink:     #2C2820    (body text)
--color-muted:   #6B6355    (secondary text)
--color-rule:    #C8C0B0    (cascade stem, borders)
--p-teal:        #2AA8A0    (pachinko accent — teal)
--p-orange:      #C4722A    (pachinko accent — orange)
Beat card bg:    rgba(246, 241, 232, 0.93)   (cream at 93% opacity)
```

**Tempo presets (--beat-dwell):**
- `contemplative`: 360px
- `steady`: 280px
- `driving`: 170px
- `still`: 0px

---

## Revision punch list (R1)

Implement in this order per the revision note.

### 1. BLOCKING — Map-field beats missing opaque cream card panel

**Problem:** `map`-field beats render text directly on the pale SVG map background without the 93%-opacity cream card. Only `photo`-field beats get the card.

**Fix:** The CSS `sr-beat-card` rule already applies the cream card (`rgba(246, 241, 232, 0.93)`) to `.sr-beat-card` inside `.sr-zone-beats`. But map zones share the same overlay structure. Check whether the card background is being overridden or stripped for map zones. The fix should be in `scrolly-zones.css` — likely a missing or accidentally-overriding rule. Map-field beat text must meet WCAG 4.5:1 over the SVG background.

---

### 2. Images smaller relative to text boxes

**Current:** The sticky photo/map field is full-bleed (100% viewport width).

**Change:** Shrink the visual field to ~70–80% of viewport width, centered, with cream ground on both sides. The text boxes then have ground to sit on rather than fighting the image.

**Starting value to try:** `width: 75%; margin-inline: auto;` on `.sr-zone-field` (or a CSS custom property `--zone-field-width: 75%`).

**Applies to:** all `photo` and `map` zone fields. Not cascade or ground zones.

**Constraint:** maintain aspect ratio, no awkward cropping. The `object-fit: cover` on the photo should handle this if the field height stays `100vh`.

**Surface this value** for tuning — put it in a single CSS variable, not scattered.

---

### 3. Left/right beat boxes pushed farther toward edges

**Current:** Left and right beats sit roughly 1/3 inset from center. With the now-narrower image, the outer edges have more room.

**Change:** Push left-aligned beats toward the left edge; right-aligned toward the right edge. They should clearly flank the image, reading as intentional left/right positioning.

**Guardrails:**
- Keep an outer margin (don't touch the viewport edge) — something like `padding: 0 var(--s-4)` or a min outer margin
- Keep minimum readable line length — don't let the box become a narrow column. Floor around `20rem` or `320px`
- The box must not overlap the centered image

**Implementation:** Adjust the flex layout in `.sr-zone-beats`. Currently `.sr-zone-beat--left { justify-content: flex-start; }` with `padding: 0 var(--s-5)`. The outer padding needs to be reduced; the box max-width or position logic may need changing.

**Surface the chosen inset value** for tuning.

---

### 4. Cascade timeline rebuild — accumulate, don't fade

This is a **reconception**, not a tweak. The current behavior fades inactive entries to 0.2 opacity (same IO mechanic as beats). The new behavior:

**Requirements:**
- Tight entry spacing — multiple entries visible simultaneously
- Entries **stay fully visible once revealed** — no fading back to 0.2
- "Emphasis shifts, nothing disappears": the newest-revealed entry gets a brief emphasis (darker, slightly larger) as it lands, then settles to calm-full as the next arrives
- **Stronger pin-rail**: the left column stem should read as a connecting spine — consider darker color, slightly thicker stroke, or a visible dot-to-dot connection
- **Darker dates**: `--p-orange` (`#C4722A`) at current contrast is too low. Darken for `sr-cascade-year` — try `#8B4A10` or similar, confirm legibility on `#EDE8DC`

**Mechanical change:** Instead of IO toggling `is-active` (opacity 0.2 ↔ 1), use a "revealed" state model:
- First time an entry intersects the IO zone → add class `is-revealed` (permanent, stays)
- Simultaneously add `is-newest` to the current entry, remove it from the previous one
- CSS: `is-revealed` → full opacity; `is-newest` → brief emphasis (font-weight bump or color), then transitions to calm after `is-revealed` is set without `is-newest`

**Spacing:** Reduce `margin-bottom` on `.sr-cascade-entry` — currently `var(--beat-dwell, 170px)`. Bring it down to something like `var(--s-8)` or `48px`. Multiple entries should stack in view.

**Surface the chosen spacing value** for tuning.

---

### 5. Pause beat — dwell tuning (Option A, confirmed)

**What this is:** The teacher wants beats to feel like they "pause" when centered — a held moment before the next beat takes over. **Implement as increased dwell distance only. Do not build scroll-pinning.**

**Mechanism:** The existing `--beat-dwell` CSS custom property controls the `margin-top` on each beat (the scroll distance between beats). A larger value = the beat stays in the center band longer before the next one enters.

**Change:** Increase `--beat-dwell` values across all photo/map tempos. Current values:
- `contemplative`: 360px → try ~500–600px
- `steady`: 280px → try ~400–450px  
- `driving`: 170px → keep tight or increase slightly to ~220px

These are **calibration values**. Surface all three for tuning. Put them in the single location in `scrolly-zones.css` where tempo presets are defined (already a single block at the top of the file).

---

### 8. Korea Strait map composition — nudge crowded elements

On the Korea Strait map (Zone 3), three elements cluster in the same area: the `volume-1930` "400,000" display number, the `route-line` "≈200 km" label, and the route line itself.

**Fix:** In `KoreaStraitMap.astro`, adjust the y-coordinates of the "400,000" text and "Koreans entered Japan in 1930" line downward (currently at y=400/418) so they don't collide with the "≈200 km" label (at y=344). Move the 400,000 group to approximately y=440/458.

---

## Items NOT being built this round

- **#6 (image provenance):** Non-code task for the teacher. Three images need licensing verification (`p1-yeongdo-1921.jpg`, `p2-main-street-fusan.jpg`, `p3-pachinko-machine.jpg`). Do not block build on this.
- **Scroll-pinning (Option B):** Explicitly excluded per revision note. Do not build.
- **Any other spoke pages:** Still Pachinko World only.

---

## Deploy protocol

After revisions, deploy to preview only (not production):

```bash
# From /Users/timothymurphy/ap-lit-site
npm run build && npx wrangler deploy --name ap-lit-site-preview
```

Preview URL: `https://ap-lit-site-preview.tmurphy-ef9.workers.dev/summer-reading/pachinko/world`

**Do not run `npm run deploy`** (that targets the production `ap-lit-site` Worker).

---

## Values to surface after this session

The revision note explicitly asks for these to be called out so the teacher can tune them:

| Parameter | CSS location | Current value | Your chosen value |
|---|---|---|---| 
| Image field width | `scrolly-zones.css` `.sr-zone-field` | 100% (full bleed) | ___ |
| Beat outer inset | `scrolly-zones.css` `.sr-zone-beat` padding | `var(--s-5)` | ___ |
| Beat min-width | `scrolly-zones.css` `.sr-beat-card` | `none` | ___ |
| Dwell — contemplative | `scrolly-zones.css` tempo preset | 360px | ___ |
| Dwell — steady | `scrolly-zones.css` tempo preset | 280px | ___ |
| Dwell — driving | `scrolly-zones.css` tempo preset | 170px | ___ |
| Cascade entry spacing | `scrolly-zones.css` `.sr-cascade-entry` | `var(--beat-dwell, 170px)` | ___ |
| Date color (cascade) | `scrolly-zones.css` `.sr-cascade-year` | `#C4722A` | ___ |

---

## Known verification status from build session

- Script activates first beat in each zone on page load ✅
- CSS `.is-active → opacity: 1` works ✅
- IO fires correctly for gradual user scrolling ✅
- Korea Strait map: 6 accumulative state reveals ✅
- Japan map: 2 accumulative state reveals ✅
- Cascade layout and 12 entries present ✅
- Ground zones at full opacity ✅
- ZoneSeams with Rosette motifs ✅
- No JS console errors ✅

`prefers-reduced-motion` and mobile layout fallbacks were implemented in CSS but **not confirmed by live test** — re-verify after this round of changes (#7 from revision note).
