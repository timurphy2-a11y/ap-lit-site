export type RegularEntry = {
  year: number;
  unit: '00' | '01' | '02' | '03' | '04' | '05';
  type: 'POL' | 'phil' | 'paint' | 'sculp' | 'music';
  title: string;
  note?: string;
};

export type APEntry = {
  year: number;
  unit: '00' | '01' | '02' | '03' | '04' | '05';
  type: 'AP';
  apTitle: string;
  apAuthor: string;
  apNote: string;
};

export type TimelineEntry = RegularEntry | APEntry;

export const ENTRIES: TimelineEntry[] = [

  // ── 00 · Medieval ─────────────────────────────────────────────────────────
  { year: 1066, unit: '00', type: 'POL',   title: 'Norman Conquest of England' },
  { year: 1095, unit: '00', type: 'POL',   title: 'First Crusade begins' },
  { year: 1151, unit: '00', type: 'music', title: 'Hildegard of Bingen: Ordo Virtutum',
    note: 'The earliest known polyphonic morality play, by history\'s first named female composer — mystical theology sung in full voice.' },
  { year: 1163, unit: '00', type: 'sculp', title: 'Notre-Dame de Paris begun',
    note: 'Gothic cathedral construction inaugurated; the architectural form Unit 00 takes as its anchor.' },
  { year: 1200, unit: '00', type: 'music', title: 'Pérotin: Viderunt omnes',
    note: 'Four-voice organum from the Notre-Dame school; structured polyphony replaces the single melodic line of plainchant.' },
  { year: 1215, unit: '00', type: 'POL',   title: 'Magna Carta sealed at Runnymede' },
  { year: 1265, unit: '00', type: 'phil',  title: 'Dante Alighieri born',
    note: 'The vernacular poet who will make Florentine Tuscan a literary language.' },
  { year: 1305, unit: '00', type: 'paint', title: 'Giotto: Arena Chapel frescoes completed',
    note: 'Giotto breaks Byzantine flatness — embodied figures inhabit believable space for the first time in Western painting.' },
  { year: 1321, unit: '00', type: 'phil',  title: 'Dante completes the Divine Comedy' },
  { year: 1347, unit: '00', type: 'POL',   title: 'Black Death reaches Europe' },
  { year: 1365, unit: '00', type: 'music', title: 'Machaut: Messe de Nostre Dame',
    note: 'The first complete polyphonic Mass attributable to a single composer — the Ars Nova\'s most ambitious sacred achievement.' },
  { year: 1387, unit: '00', type: 'phil',  title: 'Chaucer begins the Canterbury Tales' },
  { year: 1395, unit: '00', type: 'paint', title: 'Wilton Diptych',
    note: 'Jewel-like Gothic panel painting commissioned for Richard II; devotional imagery at the threshold of the medieval-modern divide.' },

  // ── 01 · Renaissance & Reformation ────────────────────────────────────────
  { year: 1501, unit: '01', type: 'music', title: 'Petrucci prints Harmonice Musices Odhecaton A',
    note: 'The first polyphonic music book set in movable type circulates Renaissance vocal technique across Europe.' },
  { year: 1503, unit: '01', type: 'paint', title: 'Leonardo begins the Mona Lisa' },
  { year: 1517, unit: '01', type: 'phil',  title: 'Luther posts the Ninety-Five Theses' },
  { year: 1543, unit: '01', type: 'phil',  title: 'Copernicus publishes De revolutionibus' },
  { year: 1564, unit: '01', type: 'sculp', title: 'Michelangelo dies' },
  { year: 1567, unit: '01', type: 'music', title: 'Palestrina: Missa Papae Marcelli',
    note: 'Palestrina\'s Mass becomes the Counter-Reformation model: serene voice-leading, clear text, no secular tunes fouling the sacred.' },
  { year: 1598, unit: '01', type: 'POL',   title: 'Edict of Nantes' },
  { year: 1600, unit: '01', type: 'phil',  title: 'Giordano Bruno burned at the stake' },
  { year: 1601, unit: '01', type: 'AP',
    apTitle: 'Hamlet', apAuthor: 'William Shakespeare',
    apNote: 'A prince paralyzed between medieval certainty and Renaissance doubt — the inwardness that defines the early-modern subject.' },
  { year: 1603, unit: '01', type: 'POL',   title: 'Death of Elizabeth I' },
  { year: 1605, unit: '01', type: 'POL',   title: 'Gunpowder Plot' },
  { year: 1607, unit: '01', type: 'POL',   title: 'Jamestown founded' },
  { year: 1609, unit: '01', type: 'phil',  title: 'Galileo turns the telescope skyward' },

  // ── 02 · Baroque ──────────────────────────────────────────────────────────
  { year: 1610, unit: '02', type: 'paint', title: 'Caravaggio dies',
    note: 'Tenebrism passes from his hand into the European Baroque mainstream.' },
  { year: 1618, unit: '02', type: 'POL',   title: 'Thirty Years\' War begins' },
  { year: 1620, unit: '02', type: 'POL',   title: 'Mayflower voyage' },
  { year: 1623, unit: '02', type: 'phil',  title: 'Shakespeare First Folio published' },
  { year: 1624, unit: '02', type: 'sculp', title: 'Bernini: David',
    note: 'Bernini\'s marble captures the instant before the sling releases — Baroque sculpture replaces Renaissance calm with psychological action.' },
  { year: 1625, unit: '02', type: 'sculp', title: 'Bernini: Apollo and Daphne',
    note: 'The instant of metamorphosis arrested in marble — movement, terror, and longing made permanent in the most technically demanding work of the age.' },
  { year: 1633, unit: '02', type: 'phil',  title: 'Galileo\'s trial before the Inquisition' },
  { year: 1642, unit: '02', type: 'POL',   title: 'English Civil War begins' },
  { year: 1648, unit: '02', type: 'POL',   title: 'Peace of Westphalia' },
  { year: 1649, unit: '02', type: 'POL',   title: 'Execution of Charles I' },
  { year: 1651, unit: '02', type: 'phil',  title: 'Hobbes publishes Leviathan' },
  { year: 1652, unit: '02', type: 'sculp', title: 'Bernini: Ecstasy of St. Teresa completed',
    note: 'The Cornaro Chapel fuses sculpture, painting, and theater into a single devotional experience — the Baroque total artwork realized.' },
  { year: 1656, unit: '02', type: 'paint', title: 'Velázquez paints Las Meninas' },
  { year: 1660, unit: '02', type: 'POL',   title: 'Restoration of Charles II' },
  { year: 1666, unit: '02', type: 'POL',   title: 'Great Fire of London' },
  { year: 1667, unit: '02', type: 'AP',
    apTitle: 'Paradise Lost', apAuthor: 'John Milton',
    apNote: 'A blind poet rewrites Genesis as Baroque epic — scale, light, and shadow weaponized to justify the ways of God to men.' },
  { year: 1685, unit: '02', type: 'music', title: 'J. S. Bach born' },
  { year: 1687, unit: '02', type: 'phil',  title: 'Newton\'s Principia Mathematica' },
  { year: 1688, unit: '02', type: 'POL',   title: 'Glorious Revolution' },
  { year: 1689, unit: '02', type: 'phil',  title: 'Locke\'s Two Treatises of Government' },

  // ── 03 · Enlightenment ────────────────────────────────────────────────────
  { year: 1710, unit: '03', type: 'phil',  title: 'Statute of Anne — first copyright law' },
  { year: 1733, unit: '03', type: 'paint', title: 'Hogarth: A Rake\'s Progress',
    note: 'Eight serial paintings dissect the moral machinery of 18th-century London — social satire as a new form of pictorial argument.' },
  { year: 1741, unit: '03', type: 'music', title: 'Handel composes Messiah' },
  { year: 1751, unit: '03', type: 'phil',  title: 'Diderot\'s Encyclopédie begins publication' },
  { year: 1755, unit: '03', type: 'POL',   title: 'Lisbon earthquake' },
  { year: 1762, unit: '03', type: 'phil',  title: 'Rousseau\'s Social Contract' },
  { year: 1776, unit: '03', type: 'POL',   title: 'American Declaration of Independence' },
  { year: 1781, unit: '03', type: 'phil',  title: 'Kant\'s Critique of Pure Reason' },
  { year: 1781, unit: '03', type: 'sculp', title: 'Houdon: Voltaire Seated',
    note: 'Houdon\'s marble Voltaire — sharp-eyed, wrapped in a Roman toga — becomes the canonical image of the philosophe.' },
  { year: 1784, unit: '03', type: 'paint', title: 'David: Oath of the Horatii',
    note: 'David\'s Neoclassical canvas turns Roman civic virtue into a call to sacrifice — painted five years before the Revolution it seems to prophesy.' },
  { year: 1786, unit: '03', type: 'music', title: 'Mozart\'s Marriage of Figaro premieres' },
  { year: 1793, unit: '03', type: 'sculp', title: 'Canova: Psyche Revived by Cupid\'s Kiss',
    note: 'Canova\'s Neoclassical marble translates ancient myth into ideal form — erotic tenderness achieved through rigorous geometric restraint.' },
  { year: 1799, unit: '03', type: 'paint', title: 'Goya: Los Caprichos',
    note: 'Goya\'s satirical etchings turn Enlightenment light back on the institutions claiming to carry it — folly, superstition, and corruption laid bare.' },
  { year: 1813, unit: '03', type: 'AP',
    apTitle: 'Pride and Prejudice', apAuthor: 'Jane Austen',
    apNote: 'A novel of manners that turns the Enlightenment social contract into living-room comedy — observing oneself observing others.' },

  // ── 04 · Romanticism ──────────────────────────────────────────────────────
  { year: 1789, unit: '04', type: 'POL',   title: 'French Revolution begins' },
  { year: 1793, unit: '04', type: 'POL',   title: 'Reign of Terror' },
  { year: 1798, unit: '04', type: 'phil',  title: 'Lyrical Ballads published',
    note: 'Wordsworth & Coleridge declare poetry the spontaneous overflow of powerful feelings.' },
  { year: 1804, unit: '04', type: 'POL',   title: 'Napoleon crowned Emperor' },
  { year: 1805, unit: '04', type: 'POL',   title: 'Battle of Trafalgar' },
  { year: 1815, unit: '04', type: 'POL',   title: 'Battle of Waterloo' },
  { year: 1818, unit: '04', type: 'phil',  title: 'Mary Shelley\'s Frankenstein' },
  { year: 1824, unit: '04', type: 'music', title: 'Beethoven\'s Ninth Symphony premieres' },
  { year: 1840, unit: '04', type: 'paint', title: 'Turner exhibits The Slave Ship' },
  { year: 1842, unit: '04', type: 'POL',   title: 'Chartist Movement peaks' },
  { year: 1848, unit: '04', type: 'POL',   title: 'European Revolutions' },
  { year: 1848, unit: '04', type: 'phil',  title: 'Marx & Engels: The Communist Manifesto' },
  { year: 1851, unit: '04', type: 'sculp', title: 'Great Exhibition opens in the Crystal Palace',
    note: 'The first mass display of industrial material culture — sculpture\'s subject becomes the made thing itself.' },
  { year: 1851, unit: '04', type: 'AP',
    apTitle: 'Moby-Dick', apAuthor: 'Herman Melville',
    apNote: 'A Romantic sublime turned outward across the Pacific — the white whale as the universe\'s unreadable face.' },
  { year: 1857, unit: '04', type: 'phil',  title: 'Baudelaire\'s Les Fleurs du mal' },
  { year: 1859, unit: '04', type: 'phil',  title: 'Darwin\'s On the Origin of Species' },
  { year: 1861, unit: '04', type: 'POL',   title: 'American Civil War begins' },
  { year: 1869, unit: '04', type: 'POL',   title: 'Suez Canal opens' },
  { year: 1871, unit: '04', type: 'POL',   title: 'German unification' },
  { year: 1874, unit: '04', type: 'paint', title: 'First Impressionist Exhibition (Paris)' },
  { year: 1884, unit: '04', type: 'POL',   title: 'Berlin Conference partitions Africa' },
  { year: 1899, unit: '04', type: 'phil',  title: 'Freud\'s Interpretation of Dreams' },

  // ── 05 · Modernism ────────────────────────────────────────────────────────
  { year: 1905, unit: '05', type: 'phil',  title: 'Einstein\'s special relativity' },
  { year: 1907, unit: '05', type: 'paint', title: 'Picasso paints Les Demoiselles d\'Avignon' },
  { year: 1913, unit: '05', type: 'music', title: 'Stravinsky\'s Rite of Spring premieres' },
  { year: 1913, unit: '05', type: 'sculp', title: 'Boccioni: Unique Forms of Continuity in Space',
    note: 'Boccioni\'s bronze makes Futurism\'s core claim in three dimensions — speed and force dissolve anatomical boundary into flowing mass.' },
  { year: 1914, unit: '05', type: 'POL',   title: 'World War I begins' },
  { year: 1917, unit: '05', type: 'POL',   title: 'Russian Revolution' },
  { year: 1918, unit: '05', type: 'POL',   title: 'World War I ends' },
  { year: 1922, unit: '05', type: 'phil',  title: 'Joyce\'s Ulysses · Eliot\'s The Waste Land' },
  { year: 1927, unit: '05', type: 'sculp', title: 'Brancusi: Bird in Space',
    note: 'Brancusi\'s polished bronze abstracts flight so completely that American customs officials refuse to classify it as art.' },
  { year: 1929, unit: '05', type: 'POL',   title: 'Stock-market crash' },
  { year: 1931, unit: '05', type: 'sculp', title: 'Calder invents the mobile',
    note: 'Balanced wire-and-sheet elements shift continuously with air currents — time and chance enter sculpture as formal elements.' },
  { year: 1933, unit: '05', type: 'POL',   title: 'Hitler becomes Chancellor' },
  { year: 1936, unit: '05', type: 'POL',   title: 'Spanish Civil War begins' },
  { year: 1939, unit: '05', type: 'POL',   title: 'World War II begins' },
  { year: 1941, unit: '05', type: 'paint', title: 'Jacob Lawrence: The Migration Series' },
  { year: 1945, unit: '05', type: 'POL',   title: 'Hiroshima · end of WWII' },
  { year: 1947, unit: '05', type: 'POL',   title: 'Indian independence & Partition' },
  { year: 1948, unit: '05', type: 'phil',  title: 'UN Universal Declaration of Human Rights' },
  { year: 1949, unit: '05', type: 'phil',  title: 'Beauvoir\'s The Second Sex' },
  { year: 1952, unit: '05', type: 'AP',
    apTitle: 'Invisible Man', apAuthor: 'Ralph Ellison',
    apNote: 'A novel of fragmented identity in a country that refuses to see — Modernist form meeting the unfinished American question.' },
  { year: 1954, unit: '05', type: 'POL',   title: 'Brown v. Board of Education' },
];
