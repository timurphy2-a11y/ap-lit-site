# Phase 4a Content Status Tracker

Last updated: March 18, 2026

---

## Planning & Rules Documents

| Document | Status | Notes |
|----------|--------|-------|
| Phase 4 Planning (`Phase_4_Planning.md`) | ✅ Complete | Hub model, editorial pass, Historical Moments, Science/Sculpture sub-domains, open questions resolved |
| Phase 4 Action Plan | ✅ Complete | Who-does-what breakdown with task ownership |
| Editorial Rules (`Editorial_Rules.md`) | ✅ Complete | 8 approved rules with word-count targets and checklist — added to project folder today |
| Accessibility & Design Action Plan | ✅ Complete | Contrast fixes, design enhancements, pull quote selections, thread pictogram SVG code — handed to Claude Code |
| Pull Quote Selections | ✅ Complete | 18 quotes (3 per unit) for styled blockquotes — handed to Claude Code |

---

## Hub Restructure (Claude Code)

| Task | Status | Notes |
|------|--------|-------|
| Hub page design decisions (content level, epigraph quotes, domain cards) | ✅ Decided | Option B superseded — see `Hub_Page_Redesign_Spec.md` for authoritative layout |
| Cross-domain navigation pattern | ✅ Decided | Breadcrumb + Sibling Tabs: `Philosophy · Science \| Painting · Sculpture \| Music` |
| Hub page introductions — 6 units | ✅ Complete | `Hub_Page_Introductions_Final.md` — one paragraph per unit, finalized |
| Epigraph quote selections — 6 units | ✅ Complete | 2 quotes per unit, included in `Hub_Page_Introductions_Final.md` |
| Hub page redesign spec | ✅ Complete | `Hub_Page_Redesign_Spec.md` — authoritative layout spec for Claude Code |
| Historical Moment eye seal symbol | ✅ Designed | SVG spec included in `Hub_Page_Redesign_Spec.md` |
| Build hub page template | ⬜ Not started | Claude Code — all content and spec now ready |
| Split existing unit pages into separate domain files | ⬜ Not started | Claude Code |
| Build domain page template with sibling tab nav | ⬜ Not started | Claude Code |
| Update all internal links | ⬜ Not started | Claude Code |
| Test restructured site | ⬜ Not started | Tim + Claude Code |

---

## Interactive Timeline

| Task | Status | Notes |
|------|--------|-------|
| Medieval era extension — 15 events, c. 1000–1453 | ✅ Complete | `Medieval_Timeline_Events.md` — implementation spec ready for Claude Code |
| Extend timeline range back to c. 1000 | ⬜ Not started | Claude Code — spec included in `Medieval_Timeline_Events.md` |
| Implement Medieval era color `#5B82C8` | ⬜ Not started | Claude Code — verify against accessibility-adjusted accent color |
| Test density of Medieval events on hub page timeline slice | ⬜ Not started | Claude Code + Tim |

---

## Editorial Pass — Philosophy Pages (6 units)

Target: 1,600–2,200 words. Primary cuts: introductions, Connection To subsections, Looking Back/Forward.

| Unit | Status | Output file | Notes |
|------|--------|-------------|-------|
| 00 Medieval | ✅ Complete | `00_Medieval_Philosophy.md` | Aristotelian physics entry removed from frontmatter — will be replaced with new science reading |
| 01 Renaissance | ✅ Complete | `1_Renaissance_Philosophy.md` | |
| 02 Baroque | ✅ Complete | `2_Baroque_Philosophy.md` | |
| 03 Enlightenment | ✅ Complete | `3_Enlightenment_Philosophy.md` | |
| 04 Romantic | ✅ Complete | `4_Romantic_Philosophy.md` | |
| 05 Modernism | ✅ Complete | `5_Modernism_Philosophy.md` | Includes revised Nietzsche paragraph (sacred games / double movement) |

---

## Editorial Pass — Painting Pages (6 units)

Target: 900–1,300 words. Light touch — mostly Connection To trimming, hub overlap check. Exception: Modernism exempt (Rule 8).

| Unit | Status | Output file | Notes |
|------|--------|-------------|-------|
| 00 Medieval | ✅ Complete | `00_Medieval_Painting.md` | Intro second paragraph cut (hub territory) |
| 01 Renaissance | ✅ Complete | `1_Renaissance_Painting.md` | "enacted" verb; soliloquies sentence cleaned |
| 02 Baroque | ✅ Complete | `2_Baroque_Painting.md` | Intro rewritten; Brushwork connection revised |
| 03 Enlightenment | ✅ Complete | `3_Enlightenment_Painting.md` | Looking Back closing sentence cut |
| 04 Romantic | ✅ Complete | `4_Romantic_Painting.md` | Thread 1 Connection trimmed to primary text only |
| 05 Modernism | ⬜ Exempt | `5_Modernism_Painting.md` | Rule 8 — copied to outputs unchanged |

---

## Editorial Pass — Music Pages (6 units)

Target: 900–1,200 words. Light touch — same pattern as painting. Exception: Modernism exempt (Rule 8).

| Unit | Status | Output file | Notes |
|------|--------|-------------|-------|
| 00 Medieval | ✅ Complete | `00_Medieval_Music.md` | Intro second paragraph cut (hub territory) |
| 01 Renaissance | ✅ Complete | `1_Renaissance_Music.md` | No changes needed |
| 02 Baroque | ✅ Complete | `2_Baroque_Music.md` | Looking Forward closing sentence cut (restated in Enlightenment Music) |
| 03 Enlightenment | ✅ Complete | `3_Enlightenment_Music.md` | Looking Forward closing sentence cut (restated in Romantic Music intro) |
| 04 Romantic | ✅ Complete | `4_Romantic_Music.md` | Looking Back closing sentence cut |
| 05 Modernism | ⬜ Exempt | `5_Modernism_Music.md` | Rule 8 — copied to outputs unchanged |

---

## Phase 4b — Historical Moment Pop-Ups

| Task | Status | Notes |
|------|--------|-------|
| Historical Moment content — 6 units | ✅ Complete | `Historical_Moment_Final.md` — all six drafts finalized |
| Historical Moment eye seal symbol | ✅ Designed | SVG spec in `Hub_Page_Redesign_Spec.md` |
| Build pop-up modal component | ⬜ Not started | Claude Code — awaiting hub template completion |

---

## Biographical Portraits

| Task | Status | Notes |
|------|--------|-------|
| Compile full list of all 60+ biographical index entries | ⬜ Not started | |
| Research Wikimedia Commons portrait candidates | ⬜ Not started | |
| Flag entries with no available portrait (medieval anonyms, etc.) | ⬜ Not started | |
| Tim reviews and confirms portrait selections | ⬜ Not started | |
| Claude Code: download/crop images, update BioLink component, update `/people` index | ⬜ Not started | |

---

## Design & Accessibility (Claude Code)

| Task | Status | Notes |
|------|--------|-------|
| Contrast fixes (inactive tabs, Baroque red, Romanticism purple) | ⬜ In progress / unverified | Action plan handed to Claude Code — Tim to verify on live site |
| Painting frame / tombstone caption treatment | ⬜ In progress / unverified | |
| Pull quote styling (18 quotes selected) | ⬜ In progress / unverified | |
| Subtle section dividers between thread sections | ⬜ In progress / unverified | |
| Gallery painting hover effect | ⬜ In progress / unverified | |
| Drop caps on section introductions | ⬜ In progress / unverified | |
| Thread pictogram symbols (all 9 current threads) | ⬜ In progress / unverified | SVG code included in action plan |

---

## Known Pending Decisions / Flags

- **Medieval frontmatter**: Aristotelian physics entry removed. Tim to add replacement science reading entry once new text is selected (summer project).
- **`4__Romantic_Music.md` double underscore**: Filename inconsistency — fix before build.
- **Modernism copyright**: Picasso, Kandinsky, Matisse painting images need copyright review before site goes live.
- **Hub handoff ready**: Hub page introductions, epigraphs, and Medieval timeline spec are all complete — sufficient for Claude Code to begin hub template build and timeline extension.
