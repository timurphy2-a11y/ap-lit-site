# Handoff: TFA Culture Spoke — Scrollytelling Build (Revised Proof of Concept)
AP Literature Summer Reading Contextual Site | Hopkinton Public Schools
Written: May 2026 | For Claude Code session starting cold

---

## What this handoff is

The Pachinko World scrollytelling spoke (`/summer-reading/pachinko/world`) is **complete and deployed to preview**. This document hands off the next build: a **revised proof of concept** for the TFA Culture spoke (`/summer-reading/tfa/culture`).

**The teacher will provide the authoritative documents for this build — a new beat sheet and a new build brief — at the start of the session. Do not begin building until you have received and read both.** This handoff covers only the codebase orientation: what already exists, how the architecture works, and the deploy protocol. All content decisions (zone structure, tempo assignments, prose, images) come from the teacher's new documents.

Read this document in full before touching any file.

---

## State of the codebase going in

### What's already built and working

The scrollytelling architecture is proven. All components exist and are in production on the preview site. You are reusing them, not rebuilding them.

**Components** (all in `src/components/summer-reading/`):
- `ScrollyZone.astro` — zone wrapper; owns IntersectionObserver logic
- `Beat.astro` — a single observed text beat (prose, termcard, pullquote variants)
- `ZoneSeam.astro` — motif boundary between zones (dot-cluster for TFA)
- `CascadeEntry.astro` — cascade timeline entries (Pachinko only; not used here)
- `SectionOpener.astro` — zone openers; TFA variant uses `UliCurve` + `AkweteChevron` rule
- `SectionTerminator.astro` — zone closers; TFA variant uses dot-cluster
- `EndSignature.astro` — triangle terminator (page end)
- `ProseBlock.astro`, `TermCard.astro`, `PullQuote.astro`, `SideBySide.astro`, `ImageBlock.astro`

**CSS** (in `src/styles/scrolly-zones.css`):
The calibration block at the top of the file is the single place to tune spacing values:
```css
:root {
  --zone-field-width:      60%;    /* sticky image/map width as % of container */
  --beat-outer-inset:      var(--s-2);
  --cascade-entry-spacing: var(--s-8);
  --cascade-date-color:    #8B4A10;
}
.sr-scrolly-zone[data-tempo="contemplative"] { --beat-dwell: 540px; }
.sr-scrolly-zone[data-tempo="steady"]        { --beat-dwell: 420px; }
.sr-scrolly-zone[data-tempo="driving"]       { --beat-dwell: 220px; }
.sr-scrolly-zone[data-tempo="still"]         { --beat-dwell: 0px; }
```

**Design tokens** (in `src/styles/tokens.css`):
TFA-specific tokens include `--t-ochre`, `--t-umber`, `--t-terra`, `--t-cream`. Use these; do not approximate.

**TFA motif components** (already built):
- `UliCurve.astro` — section opener motif
- `UliTendril.astro` — pull-quote brackets and term-card corner accents
- `UliDotCluster.astro` — section terminator motif
- `AkweteChevron.astro` — decorative rule beneath section headings
- `TriangleTerminator.astro` — page-end terminator (used by `EndSignature`)

**One important difference from Pachinko:** TFA term cards carry uli paired-tendril corner accents. Verify `TermCard.astro` applies them when `text="tfa"`.

---

## What you are building

Convert `src/content/summer-reading/tfa/culture.mdx` from its current non-scrolly structure into the full-spoke scrollytelling architecture. The `.astro` layout file (`src/pages/summer-reading/tfa/culture.astro`) is correct and needs no changes — only `culture.mdx` changes.

**The teacher will provide a new beat sheet and a new build brief.** Those two documents define everything about this build: zone structure, tempo assignments, section contents, image choices, and the definition of done. Read them before writing a single line of MDX.

The one architectural reference that remains useful regardless of the new documents: `scrollyzone_component_spec.md` (also in Downloads) describes the component API — props, the fixed one-mechanic rule, and mobile fallback behavior. Read it if you need to understand how `ScrollyZone`, `Beat`, and `ZoneSeam` work.

**Note on URL:** some older planning documents refer to this spoke as `/summer-reading/tfa/society`. The actual site URL is `/summer-reading/tfa/culture`. Build at the existing path; do not create a new route.

---

## Images — what's already in the folder

The teacher's new beat sheet will specify which images are used and their filenames. For reference, what currently exists in `/public/images/summer-reading/tfa/`:

```
Met_Ozo_stool_312450.png
Met_Ikenga_314139.png
Chuu_Krydz_Ikwuemesi_Playing_with_Time_and_Memory_2020.jpg
t1-bonny-chiefs.jpg   t1-igboland-map.jpg   t1-lugard-sokoto.jpg   t1-yam-barn.jpg
t2-akwete-cloth.jpg   t2-igbo-masquerade.jpg   t2-uli-wall-designs.jpg
t3-africa-1914.jpg    t3-berlin-conference.jpg  t3-lugard-rest-house.jpg
t4-chinua-achebe.jpg  t4-dennis.jpg  t4-frederick-lugard.jpg  t4-joyce-cary.jpg
```

Flag any image the beat sheet calls for that is not in this list rather than guessing at filenames. The teacher will add missing files before deploy.

---

## One open architectural question to flag to the teacher

The current `ScrollyZone` supports `field: 'photo' | 'map' | 'cascade' | 'ground'`. If the new beat sheet calls for a sticky diagram zone (the cosmological descent was specified this way in earlier drafts), there is no `diagram` field yet. If the new documents specify one, ask the teacher how they want it handled before implementing — the `map` field pattern (`KoreaStraitMap.astro` / `data-show-from` / `data-state`) is the closest existing analog and would serve as the model. Do not invent a new field type without confirming.

---

## Deploy target — PREVIEW ONLY

**Never run `npm run deploy`.** That deploys to production.

Preview only:
```bash
npx wrangler deploy --name ap-lit-site-preview
```

Always build first: `npm run build`

Preview URL: `https://ap-lit-site-preview.tmurphy-ef9.workers.dev/summer-reading/tfa/culture`

---

## Definition of done

Defined entirely by the teacher's new build brief. Read it, follow its stop conditions, and report whatever evaluation questions it specifies. Do not build any other spoke.

---

## What NOT to do

- **Do not begin building until you have received and read the teacher's new beat sheet and build brief.** This handoff is orientation only.
- Do not build other spokes or pages.
- Do not invent per-zone scroll behaviors, easings, or parallax.
- Do not impose uniform sticky-still alternation — tempo is per section by content type, per the beat sheet.
- Do not approximate design tokens or substitute motifs — flag gaps.
- Do not re-chunk or rewrite beat sheet prose.
- Do not use GSAP or any scroll library — IntersectionObserver + CSS only.
- Do not deploy to production (`npm run deploy`) — preview only.

---

## Quick orientation — codebase files to read

```
src/content/summer-reading/tfa/culture.mdx        ← the file you're rewriting
src/components/summer-reading/ScrollyZone.astro    ← zone wrapper + IntersectionObserver
src/components/summer-reading/Beat.astro           ← observed text beat
src/components/summer-reading/ZoneSeam.astro       ← motif boundary between zones
src/components/summer-reading/KoreaStraitMap.astro ← model for any sticky diagram zone
src/styles/scrolly-zones.css                       ← calibration block at top
src/styles/tokens.css                              ← TFA design tokens (--t-ochre, --t-umber, --t-terra)
```

`KoreaStraitMap.astro` is worth reading closely even before the new docs arrive — its `data-show-from` / `data-state` pattern is how any sticky visual-field zone (map, diagram, or otherwise) works in this codebase. The working Pachinko World page at `https://ap-lit-site-preview.tmurphy-ef9.workers.dev/summer-reading/pachinko/world` is the live reference for how the whole architecture feels.
