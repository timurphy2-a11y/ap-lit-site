# AP Lit Site — Redesign Handoff

## What this is

A multi-session redesign of an AP Literature course website built in Astro + React. The goal is to apply a unified design system to every page. This handoff covers what's done and what remains.

---

## Worktree

All work lives in a git worktree (branch `sweet-neumann-54199e`):

```
/Users/timothymurphy/ap-lit-site/.claude/worktrees/sweet-neumann-54199e/
```

Preview server: `npx astro dev --port 4322` from the worktree directory.  
Deploy: see memory file `reference_deploy_command.md`.  
Live site: https://ap-lit-site.tmurphy-ef9.workers.dev/

---

## Design system

All design tokens live in `src/layouts/Layout.astro` inside `<style is:global>`:

```css
:root {
  --bg:          #141110;
  --bg-raised:   #1b1714;
  --bg-sunken:   #0d0b0a;
  --ink:         #E8DFD0;
  --ink-mute:    #B8AE9D;
  --ink-soft:    #9A8F7E;
  --rule:        #3A332C;
  --rule-strong: #5A4F44;
  --acc:         #C9A24B;

  --font-display: 'Spectral', Georgia, serif;
  --font-ui:      'IBM Plex Sans', system-ui, sans-serif;
  --font-mono:    'IBM Plex Mono', ui-monospace, monospace;

  --gutter: clamp(20px, 4vw, 64px);
}
```

Per-period accent colors (used as `--acc` on scoped elements via inline `style`):
- `00-medieval`      → `#C9A24B`
- `01-renaissance`   → `#B54B3A`
- `02-baroque`       → `#D4A24C`
- `03-enlightenment` → `#6B8CA3`
- `04-romanticism`   → `#3E5B6E`
- `05-modernism`     → `#A03828`

Typography hierarchy:
- **Display / headings**: Spectral, weight 300–400, `letter-spacing: -0.02em`
- **UI / nav / labels**: IBM Plex Sans, uppercase, `letter-spacing: 0.06–0.22em`
- **Dates / codes / tags**: IBM Plex Mono

Key visual patterns established across completed pages:
- 4px left accent swatch on cards (via `position: absolute; left: 0; width: 4px; background: var(--acc)`)
- Section labels: `§ N · LABEL ──────── SUBTITLE` (mono `§`, UI text, flex `rule-line`)
- Cards: `bg-raised` background, `1px solid var(--rule)` border, square corners (no border-radius)
- Hover: `background: #221d19` or `#231e1a`
- Sticky topbar at `top: 0; z-index: 40`, height ~57px — secondary sticky elements use `top: 57px`

---

## Completed pages

| File | Status |
|------|--------|
| `src/layouts/Layout.astro` | ✅ Redesigned — sticky topbar, design tokens, bio modal |
| `src/pages/index.astro` | ✅ Redesigned — Card Codex layout, resources sigils, uses Layout.astro |
| `src/pages/compare.astro` | ✅ Redesigned — domain tabs, thread buttons, period cards with swatches |
| `src/pages/seeing-through-paint.astro` | ✅ Redesigned — period nav, prose+sidebar layout, gallery, ThreadIcons |
| `src/pages/sculpting-through-time.astro` | ✅ Redesigned — thread nav, arc blocks, 3-col sculpture card grid |
| `src/pages/hearing-through-form.astro` | ✅ Redesigned — same structure as painting guide, Featured Listening sidebar |
| `src/pages/units/[unit]/[domain].astro` | ✅ Fixed hero plate rendering (added `display: block` to `figure.hero-plate .img`) |

---

## Remaining work

### 1. `src/components/APLitTimeline.jsx` (528 lines)
**Page**: `/timeline`  
**Wrapper**: `src/pages/timeline.astro` (2 lines — just `<Layout><APLitTimeline client:load /></Layout>`)

**Current state**: Self-contained React component with fully inline `style={{...}}` props. Uses hardcoded colors (`#0f0f0f`, `#C4A24E`, `#2C1810`, `#e8e0d4`) and wrong fonts (Libre Baskerville + DM Sans loaded via an inline `<link>` tag).

**What it does**: Vertical timeline of ~60 historical events, filterable by era. Left column = year, center = dot on a vertical line, right = event card. Core texts (Hamlet, Paradise Lost, etc.) appear as highlighted cards. Clicking an event opens a detail panel. Era buttons at top filter the view.

**What needs to change**:
- Replace the inline `<link>` for Libre Baskerville + DM Sans — fonts are already loaded by Layout.astro
- Swap all hardcoded colors to CSS custom properties (`var(--bg)`, `var(--ink)`, etc.)
- The era color palette (`#8B4513`, `#2E5A4C`, `#7B2D3B`, etc.) should map to the per-period accent colors above
- Era filter buttons: replace rounded pill buttons with the square monospace tab pattern used across the site
- Event cards: replace rounded-corner cards (`borderRadius: "6px"`) with square cards (`border: 1px solid var(--rule)`, no radius)
- Timeline dot and line: dot = `var(--acc)` fill, line = `1px solid var(--rule)`
- Core text cards: left swatch pattern (3–4px accent strip) instead of a special background color
- Detail panel (opens on click): redesign with `bg-raised`, Spectral heading, mono field label — matching the bio modal style in Layout.astro
- Remove the component's own header section (the `<h1>Historical Timeline</h1>` block) — replace with a proper hero section following the `g-hero` pattern from the guide pages
- The component adds a full-page container with `minHeight: "100vh"` and its own background — this wrapper should just be a transparent `<div>` since Layout.astro handles the page background

### 2. `src/components/BiographyPanel.jsx` (1388 lines)
**Page**: `/people`  
**Wrapper**: `src/pages/people.astro` (2 lines — just `<Layout><BiographyDemo client:load /></Layout>`)

**Current state**: Large React component. All styling is inline `style={{...}}`. Fonts are DM Sans (loaded via an inline `<link>`). Colors are hardcoded (`#F0EAE0`, `#888`, `#222`, etc.) with a `colors` object pattern.

**What it does**: Searchable, filterable biographical index of ~60 people (philosophers, artists, composers, writers) across all 6 units. Left panel = search + unit filter + scrollable person list. Right panel = detail view with portrait, name, dates, field, bio text, and "significance" paragraph. The list items show name, dates, field tag, and unit color tag.

**What needs to change**:
- Remove inline `<link>` for DM Sans — already loaded by Layout.astro
- The component has a `colors` object with hardcoded accent/text/bg values per selection state — replace with CSS custom properties
- `UNIT_COLORS` map (hardcoded `accent` + `text` per unit) should use the per-period accent values above
- Search input: replace the current rounded input with a square `border: 1px solid var(--rule)` input, `background: var(--bg-sunken)`, IBM Plex Sans, `color: var(--ink)`
- Unit filter buttons: same square monospace tab pattern as era buttons on Timeline
- Person list items: square cards with left accent swatch (color = unit accent), name in Spectral 400 22px, field in IBM Plex Mono uppercase 10.5px, dates in mono
- Portrait images: square crop (`object-fit: cover`), `border: 1px solid var(--rule)` — no border-radius
- Detail panel: Spectral heading for name, mono for field + dates, `font-family: var(--font-display)` body text, `border-top: 1px solid var(--rule)` divider before the Significance paragraph
- Page hero: same pattern as other pages — remove the component's own centered `<h1>` header block and replace with a proper `§ II · BIOGRAPHICAL INDEX` section label above the component
- The outer container sets `backgroundColor: "#111"` or similar — should be transparent

---

## Technical notes for React component styling

Both components use fully inline styles. The cleanest approach is to add a CSS module or a `<style>` tag in the `.astro` wrapper page, and replace inline style objects with className references. Alternatively, thread CSS custom properties through inline `style` only for dynamic per-item values (accent colors), and put structural/decorative styles into CSS.

The **Tailwind v4 cascade gotcha**: any CSS in a `<style is:global>` block (non-layered) will beat Tailwind utility classes in `@layer utilities`. Avoid `<style is:global>` in these pages; use scoped `<style>` or CSS modules instead.

The **bio modal** in Layout.astro already handles the click-to-open pattern for the `BioLink` component. The BiographyPanel has its own separate modal/detail panel system (a right-side detail column, not a modal) — those are independent and should not be merged.

---

## Where to start

1. Read this file and the two component files fully before writing any code
2. `APLitTimeline.jsx` is shorter (528 lines) and structurally simpler — start there
3. `BiographyPanel.jsx` is 1388 lines and has more complex state — do it second
4. Both `.astro` page wrappers (`timeline.astro`, `people.astro`) may need a hero section added above the component slot
