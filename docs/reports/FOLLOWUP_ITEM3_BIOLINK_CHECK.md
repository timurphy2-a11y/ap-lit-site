# Follow-up item 3: BioLink authoring check (report only; nothing changed)

## 3.1 Findings
- **No build step parses a BioLink markdown file.** Nothing in `scripts/`, `package.json`, `astro.config.mjs` or `plugins/` reads `BioLink_Final.md` or looks for `### Full Name` or `**id:**` lines. The old rule is obsolete. (`scripts/` holds `crop_portrait.py`, `download_images.py`, `port_beatsheet.py` and the prose-audit tool; none touch people data.)
- **Yes: `src/components/BiographyPanel.jsx` is edited directly.** The `PEOPLE` array (line 5 onward, 150 entries) is the only source. The same array feeds the People page (`people.astro`, via `BiographyDemo`) and the inline popovers (`Layout.astro` and `[domain].astro` pass `JSON.stringify(PEOPLE)` to their click handlers).
- **Fields.** Every one of the 150 entries has `id`, `name`, `dates`, `field`, `units` (array), `bio` and `significance`; 94 also have `portrait` (optional). `id`s are unique.
- **What happens if something is missing or malformed:**
  - missing or empty `units`: the People page build throws (`person.units[0]` is read for grouping), so the build fails loudly;
  - missing `name`: `sortName()` in `people.astro` throws at build;
  - missing `bio` or `significance`: no error; the panel shows an empty paragraph;
  - missing `field` or `dates`: no error; the card shows blank or "undefined" in its search string;
  - a `units` value that is not one of the six periods: no build error; the person is silently left off the People page, and the search filter can throw in the browser;
  - a duplicate `id`: no error; `PEOPLE_INDEX` (an object built from the array) keeps the last one, the inline popover keeps the first (`PEOPLE.find`), so the two surfaces can disagree.
- **How `<BioLink id="...">` resolves.** `BioLink.astro` renders `<button class="bio-link-btn" data-bio-id="{id}">` and nothing else. On click, the page script does `PEOPLE.find(p => p.id === id)`; if nothing matches it returns silently and the button does nothing. The People page's own panel resolves through `PEOPLE_INDEX[id]`.
- **Current state:** 118 distinct `id`s are used across the `.mdx` and `.astro` files; all 118 exist in `PEOPLE` (0 unknown references). 32 entries are not referenced from any lesson page (they appear on the People page only).

## 3.2 Is there a check for unknown ids? No.
A typo in `<BioLink id="…">` ships as a dead button. **Size of adding one: small** (about an hour): a Node script (or a few lines in the existing `rehype-thread-ids` style plugin) that collects `<BioLink id>` references from `src/**/*.{mdx,astro,ts}`, loads the `PEOPLE` ids, and fails `npm run build` on any unknown id (and optionally on duplicate ids and missing required fields). Not added, as instructed.
