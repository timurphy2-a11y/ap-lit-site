export interface HistoricalMomentFigure {
  image: string;
  alt: string;
  caption: string;
  // 0-indexed: the figure renders immediately after paragraphs[afterParagraph].
  afterParagraph: number;
}

export interface SystemMapStage {
  title: string;
  gloss: string;
}

export interface SystemMap {
  header: string;
  subheading: string;
  stages: SystemMapStage[];
  footnote: string;
  // 0-indexed: the map renders immediately after paragraphs[afterParagraph].
  afterParagraph: number;
}

export interface HistoricalMoment {
  subtitle: string;
  paragraphs: string[];
  figure?: HistoricalMomentFigure;
  sysmap?: SystemMap;
}

// Paragraphs use *asterisks* for italic — rendered via mdItalics() in the template.
export const HISTORICAL_MOMENTS: Record<string, HistoricalMoment> = {

  '00-medieval': {
    subtitle: 'The High Middle Ages, c. 1000–1400',
    paragraphs: [
      'Around the year 1000, Latin Christian Europe was consolidating an order that joined theology, political authority, agricultural life, and the calendar. The Church marked the year through feasts and fasts, mediated the sacraments, preserved written learning, and defined the terms of salvation. Kings and lords governed locally; monasteries and parishes connected communities to institutions that extended across Europe. The order held because shared institutions gave conflict a common language.',
      'Its intellectual structure joined inherited authority to sustained argument. Scholars in the growing universities debated Aristotle and the Church Fathers, testing how far reason could explain truths received through revelation. Cathedrals translated theology into stone, glass, ritual, and light. Mystics including Hildegard of Bingen, Meister Eckhart, and the anonymous author of *The Cloud of Unknowing* examined perception, desire, and the limits of language. Western Europe\'s revival of philosophy also depended on works transmitted and transformed through the Islamic world. Arabic translations, scientific treatises, and commentaries by Avicenna and Averroes helped return Aristotle to Latin readers; Maimonides shaped Christian thinkers including Aquinas.',
      'Coherence carried costs. Christian institutions enforced religious boundaries, persecuted heresy, and subjected Jewish communities to legal restrictions and recurrent violence. Social rank often claimed divine sanction, even when peasants, towns, monarchs, and clergy contested who possessed legitimate authority. The order supplied a framework within which conflict occurred; it never eliminated conflict.',
      'By the early fourteenth century, famine, war, declining agricultural yields, and pressure on village life had weakened that framework. The Great Famine of 1315–17 killed across northern Europe. The Hundred Years\' War began in 1337. When merchant ships carried plague into Sicily in 1347, the disease struck societies already under strain.',
      'Within four years, between a third and half of Europe\'s population had died. The plague created a moral and institutional crisis as well as a demographic one. Clergy and monastic communities that remained to nurse the sick often died with them; flight and isolation offered better chances of survival than service. Processions, relics, penitential rituals, and special devotions failed to halt the disease. Jewish communities died in great numbers and also faced massacre as terrified Christians sought scapegoats. Labor scarcity gave surviving workers greater bargaining power, weakening forms of serfdom in parts of western Europe.',
      'The **danse macabre**, or Dance of Death, gave the plague\'s social meaning a visible form. Poems and public performances imagined Death leading away pope, emperor, merchant, scholar, laborer, woman, and child. Fifteenth-century paintings extended the procession across entire walls. Rank organized the living world; death removed every distinction. When Hamlet holds Yorick\'s skull, compares Alexander and Caesar to dust, and watches a gravedigger toss bones from the earth, Shakespeare places him inside this tradition.',
      'The Great Schism of 1378 exposed a second institutional fracture. Rival popes in Rome and Avignon each claimed legitimate authority and excommunicated the other\'s followers. A council called to resolve the conflict in 1409 elected another pope without securing the resignation of the existing claimants, producing three competing papal lines. The failure encouraged **conciliarism**, the argument that a general council representing the Church could exercise authority over a pope. An institution that claimed to speak with one divinely authorized voice now required another institution to determine which voice was legitimate.',
      'The unit brings together sources that medieval thinkers inherited and sources they produced: Augustine\'s account of the divided will, mystical arguments about the limits of reason, natural philosophy shaped by Aristotle, and literary confrontations with death. The Renaissance inherits an order still powerful enough to command obedience and fractured enough to invite challenge.',
    ],
    figure: {
      image: '/images/philosophy/00-medieval/dance-of-death-frieze.png',
      alt: 'Death leads a ruler, cleric, merchant, and laborer in a single restrained procession; a small gold hourglass marks time.',
      caption: 'In the Dance of Death, status does not exempt anyone from the common end.',
      afterParagraph: 5,
    },
  },

  '01-renaissance': {
    subtitle: 'Renaissance & Reformation, c. 1400–1650',
    paragraphs: [
      'Renaissance Italy joined cultural renewal to political and religious conflict. Humanists recovered Greek and Roman texts, artists studied ancient bodies and buildings, and city governments used classical history to imagine new forms of civic life. Christianity remained central. Petrarch, Ficino, and Pico treated classical philosophy as a resource for Christian thought, while patrons used wealth, art, and learning to display both devotion and power.',
      'Florence exposed the tensions inside that renewal. After the Medici were expelled in 1494, the Dominican preacher Girolamo Savonarola became the city\'s dominant religious voice. He proclaimed Christ the king of Florence and demanded reforms of clothing, entertainment, sexuality, and public behavior. Groups of young people helped collect objects condemned as vanities. In 1497, books, cosmetics, fine clothing, and works of art were burned in the Piazza della Signoria. Botticelli came under Savonarola\'s influence, although the familiar story that he threw his own paintings into the fire remains unproven. Savonarola was excommunicated, hanged, and burned in the same square in 1498. The city associated with humanist inquiry had also produced an apocalyptic program of moral regulation.',
      'In 1517, Martin Luther sent his Ninety-Five Theses to the archbishop of Mainz and, according to tradition, posted them on the door of the Castle Church in Wittenberg. Printing transformed an academic dispute into a European controversy. Within weeks, the theses circulated through German territories; translations and pamphlets carried the argument farther. Luther was excommunicated and declared an outlaw, yet political protection allowed him to continue writing and translating Scripture.',
      'For Luther, Scripture possessed greater authority than popes or councils, and conscience remained bound to the Word of God rather than private preference. The principle fractured western Christendom because Catholics and emerging Protestant communities disagreed about Scripture, sacraments, ministry, and the authority to interpret Christian teaching. Rulers adopted or resisted confessions for political as well as theological reasons. Religious division became inseparable from conflicts over territory, government, and allegiance.',
      'A related controversy altered the physical universe. Copernicus\'s heliocentric model reorganized the heavens through mathematical argument. Galileo\'s telescope revealed mountains and craters on the moon, phases of Venus, and moons orbiting Jupiter. These observations weakened the inherited synthesis of Ptolemaic astronomy and Aristotelian physics, although acceptance of the new cosmology remained slow and contested. Galileo\'s trial in 1633 demonstrated that disputes over method and evidence were also disputes over institutional authority.',
      'The Catholic response combined reform, renewal, and restriction. The Council of Trent clarified doctrine, strengthened clerical discipline, and encouraged devotional and educational programs. Catholic authorities also expanded censorship and attempted to regulate art and worship. Concerns about church music included the intelligibility of sacred words. Palestrina\'s *Missa Papae Marcelli* later became the model of polyphony that could preserve contrapuntal richness while giving the text greater clarity. A persistent legend says that the Mass single-handedly saved polyphony from a ban; the historical connection is less direct, but the music exemplifies concerns associated with Catholic reform.',
      'Shakespeare writes *Hamlet* around 1600, when these conflicts remain active. The ghost speaks from a Catholic purgatory to a prince educated at Protestant Wittenberg. Hamlet tests a supernatural command through theatrical evidence; Claudius uses ceremony, surveillance, and political competence to protect a throne acquired by murder. The play\'s world contains many authorities, and they no longer agree.',
    ],
    figure: {
      image: '/images/philosophy/01-renaissance/florence-bonfire.png',
      alt: 'Copperplate-style view of Florence\'s Piazza della Signoria in 1497. Youths and townspeople stack books, clothing, mirrors, cosmetic vessels, and art on a stepped bonfire while Dominican friars and an orderly crowd watch beneath the Palazzo Vecchio.',
      caption: 'In the Piazza della Signoria, Savonarola\'s program joined civic ceremony to moral enforcement; the objects gathered as "vanities" included books, fine clothing, cosmetics, mirrors, and art.',
      afterParagraph: 0,
    },
  },

  '02-baroque': {
    subtitle: 'The Baroque, c. 1600–1700',
    paragraphs: [
      'On 23 May 1618, Protestant nobles in Prague threw two Catholic imperial governors and their secretary from a window of Prague Castle. All three survived. Catholic accounts credited divine intervention; later Protestant versions gave the credit to a dung heap. The disputed explanations turned survival itself into confessional argument.',
      'The Defenestration of Prague helped ignite the Thirty Years\' War. The conflict began within the Holy Roman Empire, where disputes over religion and imperial authority had intensified, then widened as Denmark, Sweden, France, Spain, and other powers pursued confessional, dynastic, and territorial aims. Armies supported themselves from the territories through which they moved. Requisition, plunder, disease, displacement, and famine killed more people than battle alone. By the Peace of Westphalia in 1648, an estimated five to eight million people had died. The Holy Roman Empire lost at least a fifth of its population overall, with far higher losses in some regions.',
      'War coincided with recurrent cold and unstable weather during the coldest phase of the Little Ice Age. Shortened growing seasons and failed harvests intensified hardship in parts of Europe, although effects varied sharply by region and year. Climate did not cause the century\'s wars or determine their outcomes. It made societies already divided by political and religious conflict more vulnerable to hunger, disease, and displacement.',
      'England\'s crisis centered on sovereignty. Civil war began in 1642 after years of conflict among Charles I, Parliament, and competing religious communities. Parliament\'s victory led to a public trial in which the king was charged with using power for his private interest against the people he governed. His execution in 1649 made a radical claim: a reigning monarch could be held accountable by his subjects. The republic that followed did not resolve the problem. Charles II returned in 1660, and the restored monarchy regarded former defenders of the Commonwealth, including John Milton, with suspicion.',
      'Thomas Hobbes responded to civil war by asking what made social order possible. In *Leviathan* (1651), he imagined people living without a common authority able to settle disputes and enforce agreements. Fear, competition, and private judgment would make durable peace impossible. Individuals therefore authorize an undivided sovereign to secure their lives. Hobbes\'s sovereign may be one person or an assembly; its legitimacy rests on protection rather than divine hereditary right.',
      'Baroque art developed within these struggles over belief and power. The Catholic reform encouraged art that could instruct, move, and overwhelm its audience. Courts and churches used architecture, painting, sculpture, music, ceremony, and theatrical display to make authority visible. Caravaggio brought sacred events into violent proximity through concentrated light and ordinary bodies. Bernini joined sculpture, architecture, and illumination into environments that directed a viewer\'s movement and response. Rembrandt made light disclose attention, age, doubt, and inwardness. The period\'s grandeur emerged from patronage and religious purpose as well as crisis.',
      'The century\'s horizons also widened beyond Europe. Maritime empires linked European states to trade, colonization, missionary activity, coerced labor, and the Atlantic slave trade. Goods and information moved through networks that connected Europe with Africa, Asia, and the Americas, while conquest and enslavement distributed the costs of expansion unequally. New maps and travel accounts made distant places more available to European readers without making European knowledge of them complete or disinterested.',
      'Milton\'s imagination belongs to this enlarged geography. *Paradise Lost* moves among Heaven, Hell, Chaos, Eden, and a world described through place names reaching across Europe, Africa, Asia, and the Americas. Its scale is global and cosmic, but the poem repeatedly returns to the choices of two people. Milton composed the epic after losing his sight and his political cause. He had defended the Commonwealth and the regicide; after the Restoration, he lived under a government that could have punished him for both. His poem asks how authority can be just, how obedience can remain free, and why knowledge cannot prevent a creature from choosing what it knows will destroy it.',
    ],
    figure: {
      image: '/images/philosophy/02-baroque/defenestration-of-prague.png',
      alt: 'Baroque mezzotint-style view of a Prague Castle courtyard. Protestant nobles lean from a dark high palace window as two imperial officials wearing narrow ochre sashes fall toward the courtyard; an official document with an ochre seal hangs from the sill.',
      caption: '**Prague, 1618.** Protestant nobles throw the imperial governors and their secretary from Prague Castle. All three survived; competing explanations of that survival became part of the confessional argument.',
      afterParagraph: -1,
    },
  },

  '03-enlightenment': {
    subtitle: 'The Enlightenment, c. 1700–1800',
    paragraphs: [
      'On 1 November 1755, an earthquake struck Lisbon during the morning observances of All Saints\' Day. Buildings and churches collapsed; a tsunami entered the harbor; fires burned through the surviving city. Tens of thousands died across Lisbon and the surrounding region. The disaster became a crisis of explanation. If providence governed the world, what could justify suffering that seemed to fall without regard to guilt?',
      'Voltaire attacked the claim that every apparent evil formed part of the best possible order. Rousseau answered in his 1756 *Letter on Providence*. Nature, he argued, had not concentrated thousands of tall buildings in one place or compelled residents to risk their lives for possessions. Human choices had increased the destruction. The exchange divided two central figures of the French Enlightenment: Voltaire emphasized the cruelty of explaining suffering away; Rousseau located much of the harm in civilization\'s departure from simpler forms of life. *Candide* later turned the argument into satire. Its Pangloss preserves optimism through war, earthquake, persecution, and slavery, while the survivors eventually abandon universal explanation for the limited work of cultivating a garden.',
      'The century also built institutions around the hope that knowledge could improve life. Diderot and d\'Alembert\'s *Encyclopédie* gathered scholarship and practical arts into a collaborative work produced under recurring censorship. Periodicals, salons, coffeehouses, and correspondence created new forms of public argument. These spaces widened discussion without becoming universally open: wealth, education, race, and gender still determined who could speak and who would be heard.',
      'Political revolution tested the same promise. American colonists invoked natural rights while preserving slavery and limiting political participation. French revolutionaries declared men free and equal in rights, then disputed which people the declaration included. In Saint-Domingue, enslaved people began an uprising in 1791 that forced universal language into practice and eventually destroyed slavery and French colonial rule. The age of rights expanded human claims while exposing the boundaries that states and empires placed around them.',
      'Austen wrote *First Impressions* in 1796–1797 while Britain was at war with revolutionary France and feared invasion. She revised the manuscript before its publication as *Pride and Prejudice* in 1813, during the Napoleonic Wars. The novel does not make European conflict its subject, but militia officers, property, inheritance, and the economic stakes of marriage belong to a society shaped by war and insecurity. Its scale remains local because judgment begins there: in the difficult work of deciding what another person\'s words and actions deserve.',
    ],
    figure: {
      image: '/images/philosophy/03-enlightenment/lisbon-world-shakes.png',
      alt: 'A precise eighteenth-century-style engraving looks down a damaged Lisbon street toward the Tagus. A church has partly collapsed, small fires rise near the harbor, and a narrow slate-blue surge enters the street while five people rescue or warn one another.',
      caption: '**Lisbon, 1755.** The Lisbon earthquake joined collapsing buildings, fire, and harbor inundation in a disaster that appeared indifferent to guilt. The event became a public test of how suffering should be explained — and whether explanation could excuse inaction.',
      afterParagraph: 0,
    },
  },

  '04-romanticism': {
    subtitle: 'Romanticism, c. 1789–1900',
    paragraphs: [
      'On 15 September 1830, the Liverpool and Manchester Railway opened between a major Atlantic port and the center of Britain\'s textile industry. Within months, passengers and goods could travel between the two cities more quickly than before. Raw cotton arriving at Liverpool moved toward Manchester\'s mills; finished cloth moved outward into national and global markets. The railway did more than shorten a journey. It joined steam power, factory production, finance, and imperial trade within an accelerating system.',
      'Manchester\'s population grew more than tenfold between the mid-eighteenth and mid-nineteenth centuries. Mills gathered hundreds of workers beneath one roof, including many women and children. Factory bells and clocks disciplined labor by the hour. Machinery increased production while noise, injury, crowding, polluted air, and insecure wages shaped daily life. Workers produced goods they did not own within institutions whose purposes they did not control. Marx would describe this separation of people from their labor, its products, and one another as alienation.',
      'Industrial growth cannot be separated from slavery and empire. Manchester\'s cotton industry relied heavily on raw cotton cultivated by enslaved laborers in the Caribbean, South America, and, increasingly, the American South. Britain abolished its Atlantic slave trade in 1807 and slavery in most British colonies during the 1830s, but British manufacturers continued to profit from slave-grown American cotton. The commodity displayed in a shop or drawing room concealed the coercion, dispossession, and dangerous work that had carried it there.',
      'Romantic writers responded to this remade world without offering a single program. Wordsworth sought forms of attention that commercial calculation could not measure. Turner painted steam, fire, storms, and speed rather than retreating from modern transformation. Mary Shelley imagined scientific ambition creating a life its maker would not accept responsibility for. De Staël made literature an expression of history, institutions, religion, and national culture. The sublime, the beautiful, inward feeling, and organic form became ways of asking what industrial and bureaucratic systems left out.',
      'Melville published *Moby-Dick* in 1851, when American whaling was a dangerous, capital-intensive, globally connected industry. The *Pequod* is a workplace whose multinational crew hunts whales for owners and profit. Ahab turns that commercial voyage into a private metaphysical war. His quest depends upon the ship, labor, discipline, and global reach of the industry he commandeers. Melville\'s ocean is sublime, but it is also a place of work: crossed by ships, divided into commercial routes, and marked by the violence required to turn living bodies into commodities.',
    ],
    figure: {
      image: '/images/philosophy/04-romanticism/railway-cotton-world-remade.png',
      alt: 'Atmospheric aquatint-style panorama with Liverpool docks at left, an early steam locomotive at center, and Manchester textile mills at right. Workers move three cotton bales whose dark-slate bands repeat from dock to train to mill, while a thin slate rail connects the sites.',
      caption: '**Liverpool to Manchester, 1830.** The Liverpool and Manchester Railway connected Atlantic shipping at Liverpool with Manchester\'s mills. The repeated cotton bales make visible the commodity moving through a system that joined steam, factory labor, finance, empire, and slave-grown American cotton.',
      afterParagraph: -1,
    },
    sysmap: {
      header: 'The Railway and the Cotton System',
      subheading: 'what the finished cloth does not show',
      stages: [
        { title: 'Cultivation', gloss: 'Cotton grown by enslaved laborers, chiefly in the American South.' },
        { title: 'Atlantic shipping', gloss: 'Bales carried by sea to Liverpool, the port of a global trade.' },
        { title: 'Dock and warehouse', gloss: 'Cargo unloaded, financed, insured, and held for sale.' },
        { title: 'Rail acceleration', gloss: 'The 1830 line moves raw cotton inland and cloth outward faster than before.' },
        { title: 'Factory labor', gloss: 'Mill workers, many of them women and children, work to the clock and the bell.' },
        { title: 'Export markets', gloss: 'Finished cloth sold into national and imperial markets, its origins invisible.' },
      ],
      footnote: 'Each stage was a separate business with its own accounts. The system\'s coherence was economic rather than deliberate, and no participant had to see the whole of it for the whole to function.',
      afterParagraph: 2,
    },
  },

  '05-modernism': {
    subtitle: 'Modernism, c. 1900–1950',
    paragraphs: [
      'On July 1, 1916, British and Commonwealth forces go over the top at the Somme. In the first hour, twenty thousand men are killed. By the end of the day, the number reaches sixty thousand dead or wounded. The generals had expected the artillery bombardment to destroy the German defenses. It had not. The machine guns were intact, and they fired into the advancing men with industrial efficiency. The survivors describe walking through fields of bodies.',
      'The First World War is not simply a large war. It is the application of nineteenth-century industrial technology to the task of killing human beings at a scale and with a mechanical indifference that shatters something fundamental in European civilization. The Enlightenment\'s faith that science and reason lead to progress — that civilization is the name for human improvement — does not survive the Somme, or Verdun, or Passchendaele, or poison gas. Eight million soldiers die. Twenty million more in the influenza pandemic that follows. The war to end all wars ends nothing. Twenty years later, it happens again, worse.',
      'The Second World War introduces industrialized genocide. The Holocaust is not a pre-modern outbreak of violence; it is a modern administrative project, organized by bureaucracies, executed by railways and factories. Six million Jews, along with hundreds of thousands of Roma, disabled people, gay men, and political prisoners, are murdered with systematic efficiency. The civilization that produced Beethoven and Kant is proved to also be capable of producing this ultimate enormity.',
      'In America, the story runs differently but not separately. Even before the First World War, Black Americans were fleeing the terror of Jim Crow in the rural South. The war accelerated the movement: as white workers left for the front, Northern factories recruited Black labor, and hundreds of thousands moved to Chicago, Detroit, and Harlem. By the time the war ended, a new Black urban culture had taken root — and returning Black veterans, who had fought for a democracy that still denied them basic rights, were unwilling to return to the old arrangements. The Great Migration ultimately moved six million people over six decades, and it produced, in those Northern cities, the jazz, blues, and literary culture that would define the twentieth century.',
      'Ellison writes *Invisible Man* in the aftermath of the Second World War, publishing it in 1952. His narrator\'s journey from the South to Harlem, from innocence to experience, from belief in the available systems to a hard-won underground skepticism — this is the Modernist arc, told from within the Black American experience that European Modernism largely ignored. The world that broke in 1914 and again in 1939 had never been fully intact for the narrator\'s people. His invisibility is not a metaphor for alienation in general; it is the specific condition of living in a country that has not yet decided whether you are fully human.',
    ],
  },

};
