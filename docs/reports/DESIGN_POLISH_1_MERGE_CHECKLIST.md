# Design Polish Pass 1: merge checklist

## Before merge (Tim)
- [ ] Phone check on https://polish1-ap-lit-site.tmurphy-ef9.workers.dev :
  - [ ] Header at phone width: one **Menu** button; it opens the Units list and the four links; Escape/close works
  - [ ] `/units/00-medieval/music/` and one other music page: compact strip, play opens the 16:9 player, titles in the correct italic/roman
  - [ ] `/units/00-medieval/art/`: Maestà cutout sits in the mat with room above the spire
  - [ ] Home: studio cards; `/units/00-medieval/`: no "Previous —" entry
  - [ ] A BioLink popup on a subject page (e.g. Marx on Romantic Philosophy): italic titles (*Capital*, *Manifesto*, the *Pequod*), curly quotes, no asterisks
  - [ ] The same popup on your phone: it opens with the name and × visible, and a long bio scrolls to the end
  - [ ] `/units/04-romanticism/music/`: the Schubert card reads "Erlkönig" (roman, in quotes)
  - [ ] Optional, on a laptop: Tab to a BioLink, press Enter, then Tab (focus stays on ×), then Escape (focus returns to the link)
  - [ ] No sideways scrolling on any page you open
- [ ] Confirm the writing guide: your attachment didn't arrive, so `Writing_and_Editing_Guide.md` was rebuilt from the Aug 28 41-rule copy plus your Rule 42. Swap in your file if it differs
- [ ] Approve the merge

## Merge and deploy (from the main repo, per the CLAUDE.md Deploy Protocol)
This work is a branch in the main checkout, not a worktree, so the checkout must be switched to `main` first.
1. `git -C /Users/timothymurphy/ap-lit-site status` shows a clean tree (`.polish/` is excluded and stays out of git)
2. `git -C /Users/timothymurphy/ap-lit-site checkout main`
3. `git -C /Users/timothymurphy/ap-lit-site merge claude/design-polish-1 --no-edit` (fast-forward expected: `main` hasn't moved since the branch was cut at 8699b66)
4. `git -C /Users/timothymurphy/ap-lit-site branch --show-current` returns `main`
5. `cd /Users/timothymurphy/ap-lit-site && npm run deploy`
6. Spot-check the live site: one music page, the Medieval hub, the header at phone width, one BioLink popup on a subject page

## Notes
- The checkout was on `workshop-page` (commit 3d942ad, the /workshop/ page) when this work started. That commit is **not** on `main` and is not part of this merge. Switch back with `git checkout workshop-page` afterwards if that work continues.
- Schema change: `src/content.config.ts` gains an optional `poster` field and a smart-punctuation transform. Both are committed with the content.
- New build step: `plugins/smart-punct-build.mjs` runs at `astro:build:done`, and the build log prints how many pages it touched.
- New image files: `duccio-maesta-cutout.webp`, `michelangelo-pieta-cropped.jpg`, `afklint-ten-largest-no-7-cropped.jpg`. The Maestà original `duccio-maesta.jpg` is kept, though nothing references it now (Credits has no Maestà entry). It can be removed on your OK. The uncropped Pietà and af Klint files are `git rm`'d, since nothing references them now.
- Modal script changes: `Layout.astro` and `[domain].astro` (focus management and italic rendering in the BioLink popups).
- Rollback: each item is its own commit (prefixed with its ID), so `git revert <sha>` undoes one item.
