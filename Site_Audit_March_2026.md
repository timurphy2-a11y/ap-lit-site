# Site Audit — Design, Visual & Color
## For Claude Code Implementation

Audit conducted March 2026 against the live site at https://ap-lit-site.tmurphy-ef9.workers.dev/

---

## Priority 1 — Fix Immediately

### 1. Hub pages: era accent color is absent

**The problem:** Every hub page looks nearly identical — dark brown background, cream body text, faint muted-gold on the "UNIT 0X" label. The home page unit cards use era accent colors assertively (gold for Renaissance, rose-red for Baroque, purple for Romanticism, green for Modernism). The domain pages use era accent colors correctly on the "UNIT 0X" label, the active tab underline, the Core Text badge, and the thread cards. But on hub pages, the accent color is almost invisible — a very faint muted tone on the unit number only. All six hubs look like one generic template.

**The fix:** Carry the era accent color into the hub page more assertively. Specifically:
- The **period title (h1)** should be in the era accent color, matching how domain page h1s feel distinctive. This single change has the most visual impact.
- The **"UNIT 0X" label** on the hub should use the same bright accent as the domain pages — it currently renders much more muted on the hub than on the domain pages.
- The **domain card labels** ("PHILOSOPHY", "PAINTING", "MUSIC") could use the era accent color at low opacity or as a tint.
- The **Historical Moment band border and eyebrow text** already use amber — if each unit overrides this with its own era accent color instead, the band becomes another carrier of unit identity.
- The **timeline dots** could be era accent colored.

The goal is for a student landing on the Baroque hub to immediately feel "this is the Baroque" through color — the same way the home page unit cards communicate it at a glance.

---

### 2. Science and Sculpture ghost tabs — remove entirely

**The problem:** All domain pages show a tab row reading "Philosophy · Painting · Music · Science · Sculpture" with Science and Sculpture grayed out but occupying horizontal space. The Science sub-domain was scrapped; Sculpture is a future Phase 4c addition not yet built. These placeholder tabs make the navigation look incomplete and broken.

**The fix:** Remove Science and Sculpture from the tab row entirely. When Sculpture content is ready (Phase 4c), the tab can be added back. The tab row should currently read only: "Philosophy · Painting · Music"

---

### 3. Several painting pages return error

**The problem:** The following pages returned error screens during the audit:
- `/units/01-renaissance/painting/`
- `/units/03-enlightenment/painting/`
- `/units/05-modernism/painting/`
- `/art` (the shared Art overview page)
- `/music` (the shared Music overview page)

Philosophy and music domain pages load correctly. The Baroque and Romanticism painting pages were not tested but may also be affected. This needs diagnosis before portrait images are integrated, since the BiographyPanel implementation will touch these pages.

---

## Priority 2 — Refinements

### 4. "No core text" string on Medieval hub

**The problem:** The Medieval hub metadata line reads "c. 1000–1400 · No core text" — "No core text" renders as a placeholder or error string rather than intentional content. The home page handles this gracefully by showing "Foundation unit" on the Medieval card instead.

**The fix:** Either replace "No core text" with "Foundation unit" to match the home page, or omit the core text field entirely for Unit 00 since the introduction paragraph already explains this clearly.

---

### 5. Hub heading section feels bare without era color

**The problem:** The top section of each hub (unit label + period title + metadata line) is cream-on-dark with no accent color. It reads as generic. Compare to the domain pages where the "UNIT 02" label in bright rose-red and the Core Text badge in the era accent immediately orient the student.

**The fix:** This is largely resolved by fix #1 above (putting the h1 in era accent color). Additionally, the Core Text badge visible on domain pages ("CORE TEXT Paradise Lost — John Milton") does not appear on hub pages — adding it to the hub heading block would be a useful consistency fix and would carry the era accent color via the badge background.

---

### 6. Domain page tab bar: sticky scrolling works well, but Science/Sculpture gaps

This is a secondary note to fix #2 — the sticky tab bar that follows the user while scrolling is a good implementation. Once the ghost tabs are removed and the bar reads "Philosophy · Painting · Music" only, it will look clean and complete.

---

### 7. Pull quotes rendering well — no changes needed

The Pascal pull quote on the Baroque Philosophy page is rendering correctly with the left accent border. The styling looks good. No changes needed here.

---

### 8. BioLinks are working and well-styled

The inline BioLinks (Milton, Hobbes, Pascal, Galileo etc.) are rendering correctly in the body text — gold underline on hover, clearly clickable. The Biographical Index at `/people` is partially implemented with some portraits already showing. Once the full portrait set is added this page will look strong.

---

### 9. Bottom page navigation is clean

The Previous/Next navigation at the bottom of domain pages ("← Renaissance & Reformation Philosophy · Unit 02 Overview · The Enlightenment Philosophy →") is clean and functional. The center "Unit 02 Overview" link back to the hub is a good addition.

---

### 10. Timeline is strong — no changes needed

The full timeline at `/timeline` is well executed. Era filter tabs, color-coded events, the highlighted AP Lit Text entries, and the legend all work correctly. No changes needed.

---

### 11. People index: placeholder squares for missing portraits

The biographical index at `/people` shows gray placeholder squares for figures without portraits. Once the full portrait set is added these will be replaced. In the meantime the placeholder squares look slightly rough — consider replacing them with an initial-based avatar (the figure's initials in a colored circle, using the era accent color) rather than a blank gray square. This is a lower-priority polish item.

---

### 12. Home page: lower unit cards cropped

The home page shows the top row of unit cards fully, but the second row (Units 03–05) is cropped at the bottom of the viewport. This is fine — it's a natural invitation to scroll. No change needed, but worth noting that Units 03, 04, and 05 labels and titles should be tested for full visibility on various screen sizes.

---

## Summary for Claude Code

### Must fix:
1. Carry era accent color into hub pages — minimum: h1 title in accent color, "UNIT 0X" label matching domain page brightness
2. Remove Science and Sculpture ghost tabs from all domain pages
3. Diagnose and fix painting page errors (Renaissance, Enlightenment, Modernism painting pages returning error screens)

### Should fix:
4. Replace "No core text" string on Medieval hub with "Foundation unit" or omit
5. Add Core Text badge to hub heading block for visual consistency with domain pages

### Polish:
6. Replace blank gray portrait placeholders on People index with initial-based avatars using era accent colors
7. Historical Moment band: override amber color with unit's own era accent color per unit
