# Medieval Timeline Extension — Implementation Spec for Claude Code

## Overview

The interactive timeline at `/timeline` currently begins at 1590. This extension adds a Medieval era spanning c. 1000–1450 with 15 events, giving the foundation unit (Unit 00) the same historical grounding as the other five periods.

## Changes Required

### 1. Add Medieval Era Definition

Add to the `ERAS` array at the beginning (before the Renaissance entry):

```javascript
{ id: "medieval", label: "The High Middle Ages", range: [1000, 1450], color: "#5B82C8" },
```

The color `#5B82C8` is the Medieval unit's steel-blue accent (the accessibility-adjusted version of the original). Adjust if the accent color has been updated during the accessibility fixes.

Note: The Medieval era has no anchor text, so there is no entry to add to the `TEXTS` array.

### 2. Add Medieval Events

Add to the beginning of the `EVENTS` array, before the "Renaissance & Reformation" comment:

```javascript
// The High Middle Ages
{ year: 1054, title: "East-West Schism", type: "political", era: "medieval", desc: "The Christian Church splits between Rome and Constantinople — Christendom's first great fracture, foreshadowing the Reformation five centuries later." },
{ year: 1088, title: "University of Bologna founded", type: "cultural", era: "medieval", desc: "The birth of the European university system — the institutional home for scholastic philosophy and the method of learning by disputation and commentary on authoritative texts." },
{ year: 1137, title: "Adelard of Bath's Natural Questions", type: "cultural", era: "medieval", desc: "An early work of natural philosophy in dialogue form — the reading in the Medieval packet — showing reason at work within the Aristotelian framework." },
{ year: 1170, title: "Murder of Thomas Becket", type: "political", era: "medieval", desc: "Henry II's knights kill the Archbishop of Canterbury in his own cathedral — a dramatic collision between royal and ecclesiastical authority." },
{ year: 1215, title: "Magna Carta", type: "political", era: "medieval", desc: "English barons force King John to accept formal limits on royal power — the first written constraint on sovereign authority, centuries before Locke." },
{ year: 1265, title: "Aquinas begins the Summa Theologica", type: "cultural", era: "medieval", desc: "The great synthesis of Aristotelian philosophy and Christian theology — the intellectual architecture of the medieval worldview at its most systematic and ambitious." },
{ year: 1267, title: "Roger Bacon's Opus Majus", type: "cultural", era: "medieval", desc: "A Franciscan friar advocates for experimental science and mathematics within the medieval framework — an early hint of the empirical turn to come." },
{ year: 1321, title: "Dante completes the Divine Comedy", type: "cultural", era: "medieval", desc: "The supreme literary expression of the medieval worldview — a guided tour of Hell, Purgatory, and Paradise that maps the entire moral and spiritual universe." },
{ year: 1343, title: "Richard Rolle's The Fire of Love", type: "cultural", era: "medieval", desc: "English mysticism — the pursuit of direct spiritual experience through love rather than intellect, part of the devotional tradition that includes The Cloud of Unknowing." },
{ year: 1347, title: "The Black Death arrives in Europe", type: "political", era: "medieval", desc: "Bubonic plague kills roughly a third of Europe's population over four years — the medieval order's greatest crisis, destabilizing feudal structures, labor markets, and the Church's authority." },
{ year: 1378, title: "The Great Schism begins", type: "political", era: "medieval", desc: "Two rival popes — one in Rome, one in Avignon — each claim supreme authority. The schism will eventually produce three simultaneous popes before its resolution in 1417, fracturing institutional Christianity's credibility from within." },
{ year: 1380, title: "Wycliffe's English Bible", type: "cultural", era: "medieval", desc: "John Wycliffe translates Scripture into English, arguing that laypeople should read God's word for themselves — a direct challenge to the Church's monopoly on interpretation, anticipating Luther by 140 years." },
{ year: 1415, title: "Jan Hus burned at the stake", type: "political", era: "medieval", desc: "The Bohemian reformer is executed for heresy despite a promise of safe conduct — a proto-Reformation martyrdom that demonstrates the lethal cost of challenging institutional authority." },
{ year: 1440, title: "Gutenberg develops the printing press", type: "cultural", era: "medieval", desc: "Movable type makes cheap, reproducible text possible for the first time — the technology that will break the Church's control over the flow of ideas and make the Renaissance and Reformation possible." },
{ year: 1453, title: "Fall of Constantinople", type: "political", era: "medieval", desc: "The Ottoman conquest ends the Eastern Roman Empire after a thousand years. Greek scholars flee west carrying classical texts, fueling the Renaissance recovery of ancient learning." },
```

### 3. Update the Timeline Range

The timeline component's overall date range will need to extend from its current start (1590) back to approximately 1000. Check how the component calculates its visible range — it may derive this from the `ERAS` array automatically, or it may have a hardcoded start year that needs updating.

### 4. Density Note

The Medieval era spans ~450 years with 15 events, compared to roughly 60–100 years per era for the other periods. This means the events are more spread out temporally. On the full timeline view, they should display comfortably. On the hub page timeline slice for Unit 00 (range: 1000–1420), all 15 events appear — verify that the slice component handles this density gracefully.

## Event Summary

| Year | Title | Type |
|------|-------|------|
| 1054 | East-West Schism | political |
| 1088 | University of Bologna founded | cultural |
| 1137 | Adelard of Bath's *Natural Questions* | cultural |
| 1170 | Murder of Thomas Becket | political |
| 1215 | Magna Carta | political |
| 1265 | Aquinas begins the *Summa Theologica* | cultural |
| 1267 | Roger Bacon's *Opus Majus* | cultural |
| 1321 | Dante completes the *Divine Comedy* | cultural |
| 1343 | Richard Rolle's *The Fire of Love* | cultural |
| 1347 | The Black Death arrives in Europe | political |
| 1378 | The Great Schism begins | political |
| 1380 | Wycliffe's English Bible | cultural |
| 1415 | Jan Hus burned at the stake | political |
| 1440 | Gutenberg develops the printing press | cultural |
| 1453 | Fall of Constantinople | political |

The events divide evenly: 7 political, 8 cultural. They trace the arc described in the Medieval philosophy page: institutional stability (universities, Aquinas, Dante) → devotional richness (Rolle, mysticism) → crisis (Black Death, Great Schism) → seeds of transformation (Wycliffe, Hus, Gutenberg, Constantinople).
