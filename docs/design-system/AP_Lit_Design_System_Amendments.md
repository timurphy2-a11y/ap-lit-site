# AP Literature Design System — Amendments (October 17, 2026)

**Amends:** `AP_Literature_Design_System_-_Reference.md` (Claude Design).
**Applies to:** the Cultural Background imprint. Items marked *family* apply to all three imprints.

**Purpose.** Bring the reference back in line with the course vocabulary, the live site's dates, and WCAG AA, and record the decisions Tim made on October 17. Give this file to Claude Design so the reference can be revised. Until it is, this file and the reference together are the authority.

---

## A1. Vocabulary: domains and threads (§1, §3.5, §3.6)

**Replace** "three analytical 'threads' (Philosophy, Visual Art, Music)" **with:** four **domains** (Philosophy, Painting, Sculpture, Music), each organized around three analytical **threads**:
- **Philosophy:** The Human Position; Knowledge and Its Limits; The Individual and Authority
- **Painting:** Figure & Space; Light & Shadow; Brushwork & Surface
- **Sculpture:** Body & Volume; Material & Making; Space & Setting
- **Music:** Texture & Voices; Consonance & Dissonance; Structure & Freedom

In §3.5 and §3.6, "domain color" is correct as written. Make sure no label in the system calls a domain a thread. ("Thread I · Philosophy" is retired; the unit-overview frieze is now titled "The Four Domains.")

## A2. Period dates (§1 course table)

**Replace** the dates with the site's:

| Unit | Period | Dates |
|---|---|---|
| 00 | The High Middle Ages | c. 1000–1400 |
| 01 | Renaissance & Reformation | c. 1400–1650 |
| 02 | The Baroque | c. 1600–1700 |
| 03 | The Enlightenment | c. 1700–1800 |
| 04 | Romanticism | c. 1789–1900 |
| 05 | Modernism | c. 1900–mid-1950s |

## A3. Labels: only when they add necessary information (§2, §4.4, §7, checklist item 5) — *family*

**Replace** "Opens every major section" (§7, the section label) and checklist item 5 ("Open sections with the § label pattern") **with:**

> A label, eyebrow, § label, or mono tag appears only when it adds necessary information that the rest of the page does not already state or imply. A label that repeats the breadcrumb, a selected tab, the heading, or another label is cut. When in doubt, cut.

The § pattern remains part of the system, available for long documents where sections are cited by number (handouts, study guides). It is not used to open web-page sections by default. Retired on the web: "Shared resource" labels, "Studio I · Ear"–style prefixes, "Unit" beside a two-digit numeral, and § numerals on homepage sections.

## A4. Numbering only for real sequence or reference (§2 Numbers) — *family*

**Replace** "arabic two-digit for units and cards (00, 01, 02)" **with:**

> Two-digit arabic numerals for units (00–05), which mark chronology and the course's own numbering. Number cards, rooms, or lens groups only when the content is an actual sequence or the numbers are used for reference. Roman numerals (§ I, § II) only in long documents where sections are cited.

The studio lens groups (Looking Studio, Listening Studio) are unnumbered.

## A5. Text-safe accent variants (§3.4, §3.6, §4.4) — *family accessibility rule*

The period accents as specified fail WCAG AA as small text on cream for four of six units:

| Period | Ratio on `--bg` |
|---|---|
| Medieval | 2.06 |
| Enlightenment | 3.10 |
| Baroque | 3.47 |
| Renaissance | 4.44 |

Gold, which is also the default `--acc`, fails even the 3:1 large-text threshold.

**Add** a text variant for each period. Each is a hue-preserving darkening in OKLCH to at least 4.6:1 on `--bg-raised`:

| Token | Hex | On raised / bg / sunken |
|---|---|---|
| `--acc-medieval-text` | `#815D00` | 4.66 / 5.15 / 5.47 |
| `--acc-renaissance-text` | `#A94130` | 4.68 / 5.17 / 5.49 |
| `--acc-baroque-text` | `#935500` | 4.61 / 5.09 / 5.41 |
| `--acc-enlightenment-text` | `#47687D` | 4.61 / 5.09 / 5.40 |
| `--acc-romanticism-text` | `#3D5A6D` (unchanged) | 5.66 / 6.26 / 6.64 |
| `--acc-modernism-text` | `#A03828` (unchanged) | 5.28 / 5.83 / 6.19 |

**Rule:** any text colored by a period accent uses the text variant. That covers the unit numeral, dates, breadcrumbs, mono tags, eyebrows, the drop cap, and default-accent text. The original accent stays for swatches, ticks, rules, emblems, tab underlines, pull-quote borders, and tints. Large text may use the original only where it measures at least 3:1 on its actual background.

**Note.** The Renaissance and Modernism text variants are closer in hue than the originals. The existing rule (§3.4: unit number, period name, and dates always accompany the accent) does the identifying work.

## A6. Domain colors on text (§3.5)

When a domain color colors text, use the mid or dark step. The light steps for sculpture (`#7A9178`, 2.93:1) and painting and music (about 3.7:1) are for icons, stripes, and tints only.

## A7. Page sigils: once, unboxed (§8)

A page shows its sigil once in the page header, at modest size and unboxed. A sigil is not repeated in a box when a selected tab already shows it. The 44×44 thread sigil box (§7) is unchanged for thread rows.

## A8. Headings: no decorative italics (§4.4) — *family*

**Add:** headings are set upright. Italic inside a heading is reserved for titles of works. No accent-italic on a final word or phrase.

## A9. Focus and small screens (§5, §7 Topbar, §10) — *family*

**Add:**
- **Focus:** a global `:focus-visible` style on every interactive element: a solid `--ink` outline with an offset, at 3:1 or better on all three surfaces. ("Press/active states are unstyled" still holds.)
- **Small screens:** no horizontal page scroll at 375px, and touch targets of at least 44px.
- **Topbar:**
  - It is sticky above 640px and scrolls with the page at 640px and below, where the navigation wraps to two rows.
  - Navigation order: Units · Timeline · People · Compare · Guides.
  - "Units" opens a menu of the six units: on a subject page it opens the same subject in another unit, and elsewhere it opens unit overviews.

## A10. To reconcile (no change made yet)

- **Subject tabs.** §7 specifies domain tabs as IBM Plex Sans 13px uppercase with a bordered, raised selected state. §3.6 assigns the period accent to the "tab underline." The live site uses Cormorant tabs with a sigil and an accent underline. Tim to decide which description is authoritative. Until then, the live tabs stand.
- **Body text.** No change: EB Garamond 18px, line-height 1.65, `--ink-mute`, as specified. Recorded here because the live site currently renders body text in Cormorant Garamond 21px, contrary to §4.1, and is being brought into conformance.

---

## A11. Small-screen navigation (November 19, 2026) — supersedes the phone half of A9's Topbar item

At 640px and below, the five navigation links collapse into a single **Menu** button instead of wrapping to two rows. The button is a real `<button>` with `aria-expanded`; Escape closes the Units submenu first, then the menu, and returns focus to the button. Above 640px the topbar is unchanged. (Adopted in Design Polish Pass 1, item C1.)

---

## A12. Titles of works (November 20, 2026) — *family*

Replace §2 "Titles of works" and checklist item 9 with a pointer to Writing and Editing Guide Rule 42: works published as their own volume take italics, works published inside a larger work take quotation marks, and music follows genre.
