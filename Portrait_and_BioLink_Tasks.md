# Claude Code Task: Portrait Images & Sculptor Biographical Entries

## Overview

This task has two components that should be completed together, since both involve the biographical index (`BiographyPanel.jsx`) and the portraits directory:

1. **Fill portrait gaps** for existing figures who are missing portraits but have available public-domain images
2. **Add new biographical entries** for all sculptors introduced in the Phase 4c sculpture sub-domain, with portraits sourced at the same time

---

## Part 1: Portrait Gaps in Existing Entries

The following figures are currently in the biographical index without portrait images, but public-domain portraits exist and should be added.

### Images to Source and Add

For each figure below:
- Download the specified Wikimedia Commons image at full resolution
- Crop to a square centered on the face (approximately 1:1 aspect ratio)
- Resize to 150×150px
- Save to the portraits directory (check existing portrait filenames for naming convention — likely `portrait-[lastname].jpg` or similar)
- Add the `portrait` field to the corresponding entry in `PEOPLE` / `PEOPLE_INDEX` in `BiographyPanel.jsx`

| Figure | Portrait Source | Notes |
|--------|----------------|-------|
| **Leonardo da Vinci** | Wikimedia Commons: *Portrait of a Man in Red Chalk* (Turin, c. 1512) — `Leonardo_self_portrait.jpg` or equivalent | Widely accepted self-portrait; iconic image |
| **Michelangelo** | Wikimedia Commons: Jacopino del Conte, *Portrait of Michelangelo* (c. 1535, Casa Buonarroti) | Best authenticated painted portrait |
| **Raphael** | Wikimedia Commons: Raphael, *Self-Portrait* (c. 1506, Uffizi) — `Raffaello_Sanzio.jpg` or equivalent | Unambiguous self-portrait |
| **Palestrina** | Wikimedia Commons: Anonymous, *Portrait of Giovanni Pierluigi da Palestrina* (c. 1590s) | Attribution contested but this is the canonical image; use it |

### Figures Confirmed as Having No Available Portrait

Do **not** create placeholder entries or use unverified images for these figures. The component should already handle missing portraits gracefully (showing text only). Confirm this behavior is working correctly for:

- Pérotin (fl. c. 1200) — no contemporary image exists
- Josquin des Prez (c. 1450–1521) — no verified likeness; the commonly circulated portrait is misattributed
- Thomas Tallis (c. 1505–1585) — no authenticated portrait survives
- Duccio (c. 1255–1319) — no contemporary likeness
- Simone Martini (c. 1284–1344) — no portrait

---

## Part 2: New Sculptor Biographical Entries

Add the following entries to `BiographyPanel.jsx`. Each entry follows the existing schema:
- `id` — kebab-case identifier
- `name` — full name
- `dates` — birth–death years
- `field` — discipline
- `units` — array of unit IDs where this person appears
- `sketch` — 2–3 sentence biographical summary
- `significance` — 1–2 sentences on relevance to the course
- `portrait` — filename of portrait image (source and process per Part 1 instructions above)

Source all portrait images from Wikimedia Commons. For sculptors, self-portraits are preferred where they exist; for others, the most widely reproduced period portrait is acceptable. Process all images to 150×150px square crop before saving.

### New Entries

---

**Gislebertus**
- `id`: `gislebertus`
- `name`: Gislebertus
- `dates`: fl. c. 1120–1135
- `field`: Sculptor
- `units`: [`00-medieval`]
- `sketch`: Gislebertus carved the extraordinary sculptural program of the Cathedral of Saint-Lazare in Autun, Burgundy, including the famous Last Judgment tympanum above the west portal. Almost nothing is known of his life; his identity survives only because he inscribed his name — "Gislebertus hoc fecit" — directly beneath the feet of the Christ figure, an act of unusual self-assertion for a medieval craftsman.
- `significance`: His tympanum at Autun is the course's primary example of medieval sculpture's theological program — the body as spiritual sign, hieratic scale, and the total environment of the cathedral portal. His signature also anchors the Material & Making discussion of anonymity versus authorship.
- `portrait`: No authenticated portrait exists — omit field.

---

**Donatello**
- `id`: `donatello`
- `name`: Donatello (Donato di Niccolò di Betto Bardi)
- `dates`: c. 1386–1466
- `field`: Sculptor
- `units`: [`01-renaissance`]
- `sketch`: Donatello was the dominant sculptor of the early Italian Renaissance and the first artist since antiquity to create a freestanding nude figure — his bronze *David* (c. 1440s). Working in Florence under the patronage of the Medici, he mastered marble, bronze, and stone relief, and his innovations in perspective relief (*schiacciato*) and psychological expressiveness transformed European sculpture.
- `significance`: His *David* is the course's foundational example of the Renaissance recovery of the classical body — autonomous, self-possessed, and no longer subordinated to architectural program. The contrast between his David and Michelangelo's anchors the Body & Volume thread for Unit 01.
- `portrait`: Source from Wikimedia Commons — Paolo Uccello or workshop, *Portrait of Donatello* (from the panel of *Five Famous Men*, c. 1450s, Louvre). Crop to face.

---

**Bernini, Gian Lorenzo**
- `id`: `bernini`
- `name`: Gian Lorenzo Bernini
- `dates`: 1598–1680
- `field`: Sculptor and architect
- `units`: [`02-baroque`]
- `sketch`: Bernini was the supreme sculptor of the Baroque period and the dominant artistic figure in Rome for half a century. Patronized by a succession of popes, he transformed the city's visual landscape — Saint Peter's Square, the Fountain of the Four Rivers, the Cornaro Chapel — while producing marble sculptures of unparalleled illusionistic virtuosity. He was also an architect, stage designer, and playwright, and his total-environment approach to artistic commissions was central to the Counter-Reformation Church's program of persuasion through sensory overwhelming.
- `significance`: Bernini's work anchors all three sculpture threads for the Baroque unit. His *Apollo and Daphne* is the hero work; his *David* provides the three-*David* comparison central to Body & Volume; and the Cornaro Chapel is the Space & Setting argument's defining example.
- `portrait`: Source from Wikimedia Commons — Self-portrait (c. 1623, Borghese Gallery) or self-portrait drawing (c. 1665, Windsor Castle). Prefer the painted self-portrait.

---

**Puget, Pierre**
- `id`: `puget`
- `name`: Pierre Puget
- `dates`: 1620–1694
- `field`: Sculptor
- `units`: [`02-baroque`]
- `sketch`: Pierre Puget was the most important French Baroque sculptor, though his career was marked by conflict with the French court and periods of working in Genoa and Toulon rather than Paris. His *Milo of Croton* (1682, Louvre), showing the Greek athlete trapped by a tree and attacked by a lion, is his masterpiece — a work of intense physical agony that exemplifies the Baroque conviction that sculpture should capture the body at its moment of maximum suffering and helplessness.
- `significance`: *Milo of Croton* is the gallery example for the Baroque sculpture unit, extending the Body & Volume argument from Bernini's transforming figures to the body overwhelmed by forces it cannot master.
- `portrait`: Source from Wikimedia Commons — attributed portrait, c. 1680s. If no reliable image is available, omit field.

---

**Houdon, Jean-Antoine**
- `id`: `houdon`
- `name`: Jean-Antoine Houdon
- `dates`: 1741–1828
- `field`: Sculptor
- `units`: [`03-enlightenment`]
- `sketch`: Houdon was the preeminent portrait sculptor of the Enlightenment, producing likenesses of virtually every major intellectual and political figure of his era — Voltaire, Rousseau, Franklin, Jefferson, Washington. His ability to render the specific character of a face with psychological penetration rather than idealization made him the visual chronicler of the age of reason. His seated *Voltaire* (1781) is among the most celebrated portrait sculptures ever made.
- `significance`: Houdon's *Voltaire* is the hero work for the Enlightenment sculpture unit and the central example of the Body & Volume argument — naturalism in service of character revelation, the inner life made visible on the outer surface. His practice of distributing portrait busts across European salons anchors the Space & Setting discussion.
- `portrait`: Source from Wikimedia Commons — self-portrait bust or painted portrait. A painted portrait by Élisabeth Vigée Le Brun (c. 1790s) exists on Wikimedia; use if available and clear.

---

**Canova, Antonio**
- `id`: `canova`
- `name`: Antonio Canova
- `dates`: 1757–1822
- `field`: Sculptor
- `units`: [`03-enlightenment`]
- `sketch`: Canova was the leading neoclassical sculptor of his era, the Italian counterpart to the theoretical program advanced by Winckelmann. His marbles — *Psyche Revived by Cupid's Kiss*, *The Three Graces*, his portraits of Napoleon's family — achieved a surface refinement that seemed to transcend the distinction between stone and skin. He worked in Rome for most of his career and was celebrated across Europe as the restorer of classical ideals to modern sculpture.
- `significance`: Canova's work provides the neoclassical counterpoint to Houdon in the Enlightenment sculpture unit — idealization against particularism, the universal against the individual. His approach to marble surface also sets up the Material & Making arc from Baroque illusionism toward Enlightenment classical refinement.
- `portrait`: Source from Wikimedia Commons — self-portrait or portrait by contemporaries. A portrait by Thomas Lawrence exists; check availability.

---

**Winckelmann, Johann Joachim**
- `id`: `winckelmann`
- `name`: Johann Joachim Winckelmann
- `dates`: 1717–1768
- `field`: Art historian and archaeologist
- `units`: [`03-enlightenment`]
- `sketch`: Winckelmann was the German art historian and archaeologist whose *Thoughts on the Imitation of Greek Works in Painting and Sculpture* (1755) and *History of Ancient Art* (1764) established neoclassicism as the dominant aesthetic theory of the Enlightenment. His argument that Greek art represented the highest human achievement — and that it was inseparable from the freedom and rationality of Greek society — made aesthetics a political and moral question, not merely a technical one.
- `significance`: Winckelmann's argument that great art is the product of rational, free social conditions is the theoretical foundation for the Enlightenment Material & Making discussion. The parallel with Austen's insistence that genuine virtue requires free rational self-examination is made explicitly in the Enlightenment sculpture unit.
- `portrait`: Source from Wikimedia Commons — Anton Raphael Mengs, *Portrait of Winckelmann* (1777, Metropolitan Museum). Well-known image, clearly public domain.

---

**Rodin, Auguste**
- `id`: `rodin`
- `name`: Auguste Rodin
- `dates`: 1840–1917
- `field`: Sculptor
- `units`: [`04-romanticism`]
- `sketch`: Rodin is the dominant figure in 19th-century sculpture and one of the most influential artists of any era. His radical approach to the human figure — unfinished surfaces, psychological intensity, bodies caught at moments of maximum emotional pressure — broke decisively with neoclassical conventions and opened the path to Modernist sculpture. *The Burghers of Calais*, *The Gates of Hell*, *The Thinker*, and *The Kiss* are among the most recognized works in Western art.
- `significance`: Rodin's work anchors all three sculpture threads for the Romanticism unit. *The Burghers of Calais* is the hero work; *The Gates of Hell* provides the Material & Making argument about the unfinished surface and obsessive making; his ground-level installation intention anchors Space & Setting.
- `portrait`: Source from Wikimedia Commons — photograph by Dornac (Paul Cardon), c. 1890s, or Edward Steichen photograph. Period photographs of Rodin are widely available and public domain.

---

**Rude, François**
- `id`: `rude`
- `name`: François Rude
- `dates`: 1784–1855
- `field`: Sculptor
- `units`: [`04-romanticism`]
- `sketch`: Rude was a French Romantic sculptor best known for *La Marseillaise* (*The Departure of the Volunteers of 1792*, 1836), the high-relief sculpture on the Arc de Triomphe in Paris that became one of the defining images of French national identity. He studied under David and worked in the Napoleonic tradition before developing the passionate energy and dramatic scale characteristic of Romantic public sculpture.
- `significance`: *La Marseillaise* provides the civic/nationalist counterpoint to Rodin's intimate ground-level grief in the Romanticism sculpture unit, anchoring the Space & Setting discussion of the full range of Romantic public sculpture — from the pedestal removed to the monument elevated.
- `portrait`: Source from Wikimedia Commons — portrait photograph or engraving, c. 1840s–1850s.

---

**Brancusi, Constantin**
- `id`: `brancusi`
- `name`: Constantin Brancusi
- `dates`: 1876–1957
- `field`: Sculptor
- `units`: [`05-modernism`]
- `sketch`: Brancusi was the Romanian-French sculptor whose radical program of reduction and abstraction transformed 20th-century sculpture. Trained in Bucharest and Paris, he rejected the influence of Rodin and pursued a path of progressive simplification — stripping the human figure and natural forms down to their essential gesture. *Bird in Space*, *The Kiss*, *Sleeping Muse*, and the *Endless Column* are landmarks of Modernist art. His 1928 legal battle with US Customs, who refused to classify *Bird in Space* as sculpture, became an emblematic moment in the history of modern art's challenge to inherited categories.
- `significance`: Brancusi's *Bird in Space* is the hero work for the Modernism sculpture unit. His customs case is the page's opening story — the definitive image of what Modernist sculpture does: dismantling the assumptions that made depiction the point. His work anchors the Body & Volume argument about reduction to essential gesture.
- `portrait`: Source from Wikimedia Commons — self-portrait photograph or portrait photograph by Edward Steichen or Man Ray. Period photographs are widely available and public domain.

---

**Giacometti, Alberto**
- `id`: `giacometti`
- `name`: Alberto Giacometti
- `dates`: 1901–1966
- `field`: Sculptor and painter
- `units`: [`05-modernism`]
- `sketch`: Giacometti was the Swiss sculptor and painter whose elongated, eroded figures — attenuated to the verge of disappearance — became among the most recognizable images of postwar existential anxiety. After early Surrealist work, he developed his mature style in the late 1940s, producing figures so thin they seem worn away by time or pressure. *City Square*, *The Walking Man*, and his portrait busts are central works of 20th-century art.
- `significance`: Giacometti's *City Square* is the gallery example for the Modernism sculpture unit, providing the counterpoint to Brancusi — where Brancusi reduces to the irreducible core, Giacometti reveals the figure stripped to its last thread. Both ask the same Modernist question: what is actually there, beneath the layers of social role and projected meaning?
- `portrait`: Source from Wikimedia Commons — photograph by Henri Cartier-Bresson or other period photographer. Well-known photographic portraits exist and are available.

---

**Smith, David**
- `id`: `david-smith`
- `name`: David Smith
- `dates`: 1906–1965
- `field`: Sculptor
- `units`: [`05-modernism`]
- `sketch`: David Smith was the American sculptor who brought industrial welding techniques into fine art, creating a body of work in steel that redefined the possibilities of sculpture in the 20th century. He worked in an automobile plant and a locomotive factory before becoming an artist, and the industrial materials and methods of those jobs became the basis of his practice. His *Hudson River Landscape*, *Cubi* series, and *Voltri* sculptures are landmarks of American Modernism.
- `significance`: Smith's *Hudson River Landscape* is the gallery example for the Modernism Material & Making thread — his welded steel makes visible the industrial labor that traditional high culture preferred to keep in the factory and out of the gallery, directly paralleling Ellison's argument about the labor that American culture preferred to keep underground.
- `portrait`: Source from Wikimedia Commons — portrait photograph, c. 1950s–1960s. Documentary photographs of Smith at work exist and are widely reproduced.

---

**Duchamp, Marcel**
- `id`: `duchamp`
- `name`: Marcel Duchamp
- `dates`: 1887–1968
- `field`: Artist (Dadaist, conceptual)
- `units`: [`05-modernism`]
- `sketch`: Duchamp was the French-American artist whose radical conceptual experiments — the readymades, *The Large Glass*, *Nude Descending a Staircase* — permanently altered the question of what art is. His submission of a mass-produced urinal as *Fountain* to the Society of Independent Artists in 1917 is one of the most consequential provocations in art history. *The Bride Stripped Bare by Her Bachelors, Even* (*The Large Glass*, 1915–1923) occupied him for eight years and remains one of the most complex and debated works of the 20th century.
- `significance`: Duchamp's *Large Glass* is the gallery example for the Modernism sculpture unit, providing the Material & Making argument about intention, accident, and the dissolution of traditional craft. *Fountain* is referenced in the same section as the more extreme provocation that *The Large Glass* develops beyond.
- `portrait`: Source from Wikimedia Commons — photograph by Man Ray (c. 1920s) or other period photograph. Well-known photographic portraits exist.

---

## Image Processing Workflow for Claude Code

For each portrait image:

1. **Locate on Wikimedia Commons** — search by figure name + "portrait" or use the specific works listed above. Prefer the highest-resolution version available.

2. **Verify public domain status** — confirm the image is in the public domain (painter died 70+ years ago for paintings; pre-1928 photographs are generally public domain in the US). The Wikimedia Commons file page will list the license.

3. **Download at full resolution** using the direct file URL from Wikimedia Commons.

4. **Crop to square** centered on the face — use Python with Pillow or ImageMagick. The crop should include the face with some headroom above and chin below; shoulders optional depending on the image. For busts and sculptures used as portraits, crop to show the full head.

5. **Resize to 150×150px** using high-quality downsampling (Lanczos resampling in Pillow).

6. **Save** to the portraits directory with a consistent naming convention matching the existing portrait files in the project (check the directory for the current convention before saving).

7. **Update BiographyPanel.jsx** — add the `portrait` field to each entry with the filename. Do not add the field for figures confirmed to have no available portrait (Gislebertus, Pérotin, Josquin, Tallis, Duccio, Martini).

8. **Verify rendering** — confirm each portrait displays correctly in the BioLink pop-up at the expected size and position.

---

## Part 3: Sculpture Page Images

All sculpture pages require images for hero works and gallery works. These must be sourced, processed, and added to the site's image directory alongside the sculpture page content files.

### Color and Display Notes

Sculpture images should be displayed using the same museum-framing treatment as paintings (subtle border, tombstone captions) but using the sculpture accent color `#B5714A` for caption text and frame accent rather than the painting gold `#C9973A`.

### Copyright Status by Period

| Period | Status | Notes |
|--------|--------|-------|
| Medieval | Public domain | All works well pre-1928 |
| Renaissance | Public domain | All works well pre-1928 |
| Baroque | Public domain | All works well pre-1928 |
| Enlightenment | Public domain | All works well pre-1928 |
| Romanticism | Public domain | Rodin died 1917; Rude died 1855 |
| Modernism | **Verify carefully** | See notes below |

**Modernism copyright flags:**
- **Brancusi** — died 1957. Works entered public domain in EU January 2028; in the US, pre-1928 works are public domain. *Bird in Space* (1928) — verify the specific cast's date. The 1928 cast at MoMA should be fine for US purposes.
- **Giacometti** — died 1966. Works still under copyright in most jurisdictions until 2037. *City Square* (1948) is **likely still protected**. Check whether a Creative Commons–licensed photograph exists on Wikimedia Commons, or contact the Giacometti Foundation. Flag for Tim's review before using any image.
- **David Smith** — died 1965. Similar situation to Giacometti. *Hudson River Landscape* (1951) is likely still protected. Flag for Tim's review.
- **Duchamp's *Large Glass*** — Duchamp died 1968; work still under copyright in most jurisdictions. The Philadelphia Museum of Art holds the work and may have reproduction rights. Check Wikimedia Commons for a freely licensed photograph. Flag for Tim's review.

### Image Processing Workflow

Same process as portrait images (Part 1), but with different output dimensions:

1. **Locate on Wikimedia Commons** — search by work title + artist name. Prefer the highest-resolution version available.
2. **Verify public domain or free license status** on the Wikimedia Commons file page.
3. **Download at full resolution.**
4. **Crop** — for sculpture, show the full work including base/pedestal where relevant. Do not crop to face as with portraits. For relief sculpture (Chartres portal, Autun tympanum, Rude's *La Marseillaise*), crop to show the full composition.
5. **Resize** to site standard for art images — check existing painting image dimensions in the project (currently 1600–2000px on longest edge per the project brief). Use Lanczos resampling.
6. **Save** to the sculpture images directory following the naming convention of existing painting images (e.g., `images/sculptures/02-baroque-bernini-apollo-daphne.jpg`).
7. **Update the relevant sculpture page YAML** to reference the image filename.

### Works to Source (by unit)

| Unit | Work | Artist | Notes |
|------|------|--------|-------|
| 00 Medieval | Last Judgment Tympanum | Gislebertus | Autun; multiple good Wikimedia images exist |
| 00 Medieval | Royal Portal | Unknown | Chartres; wide shot of portal program |
| 01 Renaissance | *David* (hero) | Michelangelo | Galleria dell'Accademia; multiple images |
| 01 Renaissance | *David* | Donatello | Bargello, Florence |
| 01 Renaissance | *Pietà* | Michelangelo | St. Peter's Basilica |
| 02 Baroque | *Apollo and Daphne* (hero) | Bernini | Galleria Borghese |
| 02 Baroque | *Ecstasy of Saint Teresa* | Bernini | Cornaro Chapel — try to source a wide shot showing the full chapel installation, not just the figure group |
| 02 Baroque | *David* | Bernini | Galleria Borghese |
| 02 Baroque | *Milo of Croton* | Puget | Louvre |
| 03 Enlightenment | *Voltaire Seated* (hero) | Houdon | Comédie-Française or other cast |
| 03 Enlightenment | *Psyche Revived by Cupid's Kiss* | Canova | Louvre |
| 04 Romanticism | *Burghers of Calais* (hero) | Rodin | Prefer a photograph showing the ground-level installation as Rodin intended, not the elevated version |
| 04 Romanticism | *Gates of Hell* | Rodin | Musée Rodin, Paris |
| 04 Romanticism | *La Marseillaise* | Rude | Arc de Triomphe — try to source a shot showing the relief in its architectural context |
| 05 Modernism | *Bird in Space* (hero) | Brancusi | MoMA — verify copyright on specific cast |
| 05 Modernism | *The Large Glass* | Duchamp | Philadelphia Museum of Art — **flag for copyright review** |
| 05 Modernism | *City Square* | Giacometti | **Flag for copyright review** |
| 05 Modernism | *Hudson River Landscape* | David Smith | **Flag for copyright review** |

- **Palestrina**: Use the canonical portrait even though attribution is contested. The image is widely reproduced and is the best available likeness.
- **Gislebertus**: No portrait. The biographical entry should still be created in full; only the `portrait` field is omitted.
- **Donatello's portrait**: The attribution to Uccello's workshop is debated; if the image cannot be sourced with reasonable confidence, omit the portrait field and note this for Tim's review.
- **Quality check**: After processing, visually verify that each cropped image clearly shows the face at 150×150px. Some period paintings and engravings may be too low-resolution or too dark to crop effectively — flag any problematic images for Tim's review rather than using a poor-quality crop.
