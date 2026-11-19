# Design Polish Pass 1: Phase 2 proposals

Nothing here is applied. Source checked: `AP Literature Design System - Reference v2.md` (Downloads). The amendments file named in CLAUDE.md was not found on this machine, so where it might override v2 I could not check.
Before screenshots are in `.polish/baseline-shots/` (12 pages × 1440 and 375). I did not build after-state mockups for every option; I will build the chosen option, then screenshot it.

## C2. Page and header widths
Measured at 1440: logo left edge is x=58 on Home, hubs, Timeline, People, Compare, guides and Studio, and x=138 on all 24 domain pages (an 80px jump; your brief said 72).
- **Reference:** `--col` 860px (prose), `--col-wide` 1100px "outer wrap on grid pages". Silent on header width and on 1165, 1190 and 1310px.
- **Option A:** one container width sitewide. Recommend 1165px (the Timeline, People, Studio and domain width), with the 1310 hubs and 1190 guide trimmed to it. Changes the hubs most.
- **Option B (recommended):** one fixed header width (1310px, the current majority), and each page keeps its own content width but aligns its left edge to the logo. Smaller change, but narrower pages sit visibly indented from the header on the right.
The reference's 1100px matches neither; if the reference should win, 1100px is Option A with a different number.

## C3. Label system
Inventory of uppercase labels on the 12 baseline pages: **34 distinct (family, size, tracking) styles**. Biggest groups: Plex Mono 12px/0.14em (164 uses), Plex Mono 11.5px/0.14em (114, one page), Plex Sans 14px/0.06em (60, the header and nav). Sizes below 11px: Mono 10px, 10.5px, 9.5px (about 75 uses on six pages).
- **Reference:** UI label Plex Sans 13px/500, 0.08em; section label and eyebrow Plex Mono 13px, 0.22em; mono tags `--track-label` 0.14em. No size below 13px is specified for labels, so 11px is a floor you set, not the reference's.
- **Proposal, three tokens:**

| Token | Face | Size / tracking | Replaces |
|---|---|---|---|
| `nav` | Plex Sans 500 | 13px / 0.08em | header nav 14px, tabs, buttons, toggles 11–13px Sans styles, mobile "Foundations/Deeper" 9.5px |
| `eyebrow` | Plex Mono | 12px / 0.18em | the 12px, 11.5px and 13px Mono styles (0.14–0.22em), thread tags 9.5px, Seeing Through Paint 10/10.5px |
| `meta` | Plex Mono | 11px / 0.14em | dates, footers, card captions, anything now 9.5–11px Mono |
The Medieval hub's nine styles collapse to these three. Sizes of 11px and above keep the tracked-uppercase voice. I can produce the complete row-by-row mapping (all 34 styles) once you choose the tokens.

## C4. Anchor paragraph in domain intros
Checked all 24 domain pages. The 18.5px, 445px-left paragraph exists on **21 of 24**, with 18px at 452px for the first paragraph. Exceptions: Enlightenment Painting and Romanticism Painting have only the 18px paragraph. It is not only the Hamlet paragraph: it is the second intro paragraph everywhere (the template sets `.reading > p` to 18.5px and the first paragraph differs).
- **Reference:** silent. It defines the drop cap on the first paragraph but no anchor-paragraph component.
- **Proposal (reference silent, so default):** align to the prose column at 18px, remove the 18.5px/445px rule. If you want the anchor paragraph distinct, the alternative is a labeled treatment (a left rule in the period accent plus the existing "Anchor: Hamlet" label), but that adds a component the reference does not describe.

## C5b. Thread summary card title font
- **Reference:** silent on this card (it specifies thread-sigil rows and says the title shares the domain color). Everywhere else headings are Cormorant.
- **Proposal:** Cormorant Garamond 500, about 20px (card width allows two lines), domain text colour unchanged.

## C10. Labels that repeat information
The reference states the rule directly (§6: a label that repeats the breadcrumb, tab, heading or another label is cut; when in doubt, cut), so these follow it:
- Hub domain cards: remove "Open domain →" (4 per hub, 24 sitewide); card keeps `aria-label` such as "Medieval Philosophy".
- Gallery eyebrows equal to their sub-thread title: remove. I will list every one with its page before applying.
- "01 — Sub-thread" becomes "01".
- "Anchor: Hamlet": keep.
Before screenshots: Medieval hub and Medieval Philosophy in `.polish/baseline-shots/`.

## B5. Hub footer counter
Every hub shows "NN of 06": 00 of 06, 01 of 06, 02 of 06, 03 of 06, 04 of 06, 05 of 06. The numerals run 00 to 05 (six units), so the last hub says "05 of 06", which reads as if a sixth unit were missing (the arithmetic is off by one).
- **Option 1:** "Unit 00 of 05" (zero-based, consistent with the unit numerals).
- **Option 2:** "1 of 6" … "6 of 6" (position count; mismatches the 00–05 numerals).
- **Option 3 (recommended):** drop the counter. The pager already shows neighbouring units, and the reference's label rule says a label stays only when it adds information.
