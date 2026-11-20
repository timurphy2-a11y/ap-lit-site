# Design Polish Pass 2 (Phase 2 choices): report

**Status:** built on `claude/design-polish-2`, a clean branch from `main` (a044a3f, the Phase 1 merge, live as version 4c327286). Preview: https://phase2-ap-lit-site.tmurphy-ef9.workers.dev. Nothing is merged or deployed.

## What was built
| Item | Choice | Commit | What changed |
|---|---|---|---|
| Docs | – | 5efa2bf | `docs/design-system/` holds Reference v2 and the amendments; **A12** added as worded; CLAUDE.md points at both |
| C2 | B | 1730dae | Subject-page header spans the full gutter (logo at x=58 like every other page). Frieze, breadcrumb, tabs, plates, prose and footer keep their positions (checked at 1440 and 375) |
| C4 | A | e618ae7 | All intro paragraphs 18px; their left edges now align at 452 |
| C5b | A | 689b773 | Thread card titles in Cormorant Garamond 600, 20px |
| C10 | all four cuts | 97f6373 | Removed "Open domain" (24 hub cards; the arrow stays, right-aligned and hidden from screen readers), the 39 gallery eyebrows that repeated the thread title, "01 — Sub-thread" (72), and the jump-nav numerals (72). The thread title now sits centred beside its sigil. Dead CSS removed |
| B5 | remove both | 907ce4d | Hub "NN of 06" and subject "NN / Subject" removed; "Image Credits" moves to the right end of the footer |
| C3 | adopt | 3311df9 | 182 label rules in 23 files rewritten to the three Reference v2 §4.4 styles |

**C3 result:** uppercase label styles across the 47 AP pages go from **43 to 4**:
- Mono 12px/0.14em (tags): 785 uses.
- Sans 500 13px/0.08em (UI labels): 377.
- Mono 13px/0.22em (eyebrows): 159.
- The topbar's Sans 14px/0.06em (§7): 235, unchanged.
- The five Enlightenment document-card dates used to inherit 15px from `.doc-card p` (a specificity clash on `main`). They now take the UI label style and measure 13px/0.08em.
- Summer-reading and the topbar were not touched.

## Verification
- **Build** passes; 0 console errors on all 47 AP pages at 1440 and 375.
- **Rendered-text diff against `main`.**
  - Static HTML: the only removed lines are the approved cuts (72 jump-nav numerals, 24 "Open domain", 24 subject footers, 6 hub counters). Nothing was added.
  - Runtime text against production, which includes script-built labels: the same, plus 72 "NN — Sub-thread" and 39 gallery eyebrows (Figure & Space ×6, Light & Shadow ×6, Texture & Voices ×6, Body & Volume ×6, Brushwork & Surface ×5, Consonance & Dissonance ×5, Structure & Freedom ×3, Material & Making ×2).
  - One caption on Musical Forms differs only by animation timing (both strings are in both builds).
  - Script data differs only on the 24 subject pages, where the label code was removed.
- **375px:** no horizontal scroll on any of the 47 pages.
- **Contrast:** everything passes except the decorative breadcrumb `/`, People `·`, and the Musical Forms stage arrow `→` (2.41:1). All three are identical on production; the arrow just wasn't in the 16-page Phase 1 sample.
- **Keyboard:** visible focus on the header, hub domain cards, subject tabs and thread cards; the phone Menu opens and Escape returns focus to it; all 320 BioLink popups move focus to Close and return it on Escape.

## Screenshots (375, production on the left, preview on the right)
In `.polish/phase2-shots/` (untracked): `people-top`, `people-list`, `people-list-2`, `paint-top`, `paint-cards`, `paint-cards-2` (`*-375-pair.png`).
- **People:** essentially unchanged. Roles and dates were already 12px/0.14em; group headings go from 0.18em to 0.22em tracking.
- **Seeing Through Paint:** the card byline and the "Full unit: …" link grow from 10–10.5px to 12px. The link now wraps to two lines on a phone ("FULL UNIT: RENAISSANCE & / REFORMATION →"). This is the main wrapping effect to judge.

## After sign-off
Merge per the Deploy Protocol. Then delete `claude/design-polish-2-proposals`, which is the only place the `?p2=` prototypes and the `/p2/` page exist. The polish2 Worker version stays in Cloudflare's version list but receives no traffic.
