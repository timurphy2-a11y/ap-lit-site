export interface HubEvent {
  year: number;
  title: string;
  type: 'political' | 'cultural';
}

// Curated 5-event shortlist per unit for hub page timeline strips (approved)
export const HUB_EVENTS: Record<string, HubEvent[]> = {
  '00-medieval': [
    { year: 1088, title: 'University of Bologna founded', type: 'cultural' },
    { year: 1265, title: 'Aquinas begins the Summa Theologica', type: 'cultural' },
    { year: 1321, title: 'Dante completes the Divine Comedy', type: 'cultural' },
    { year: 1347, title: 'The Black Death arrives in Europe', type: 'political' },
    { year: 1440, title: 'Gutenberg develops the printing press', type: 'cultural' },
  ],
  '01-renaissance': [
    { year: 1600, title: 'Giordano Bruno burned at the stake', type: 'cultural' },
    { year: 1603, title: 'Death of Elizabeth I', type: 'political' },
    { year: 1609, title: "Galileo's telescope observations", type: 'cultural' },
    { year: 1623, title: 'Shakespeare First Folio published', type: 'cultural' },
    { year: 1633, title: "Galileo's trial", type: 'cultural' },
  ],
  '02-baroque': [
    { year: 1642, title: 'English Civil War begins', type: 'political' },
    { year: 1649, title: 'Execution of Charles I', type: 'political' },
    { year: 1651, title: 'Hobbes publishes Leviathan', type: 'cultural' },
    { year: 1687, title: "Newton's Principia", type: 'cultural' },
    { year: 1689, title: "Locke's Two Treatises of Government", type: 'cultural' },
  ],
  '03-enlightenment': [
    { year: 1762, title: "Rousseau's Social Contract", type: 'cultural' },
    { year: 1776, title: 'American Declaration of Independence', type: 'political' },
    { year: 1789, title: 'French Revolution begins', type: 'political' },
    { year: 1793, title: 'Reign of Terror', type: 'political' },
    { year: 1805, title: 'Battle of Trafalgar', type: 'political' },
  ],
  '04-romanticism': [
    { year: 1848, title: 'European Revolutions', type: 'political' },
    { year: 1851, title: 'Great Exhibition in London', type: 'cultural' },
    { year: 1859, title: "Darwin's On the Origin of Species", type: 'cultural' },
    { year: 1861, title: 'American Civil War begins', type: 'political' },
    { year: 1874, title: 'First Impressionist Exhibition', type: 'cultural' },
  ],
  '05-modernism': [
    { year: 1905, title: "Einstein's special relativity", type: 'cultural' },
    { year: 1914, title: 'World War I begins', type: 'political' },
    { year: 1922, title: "Joyce's Ulysses & Eliot's The Waste Land", type: 'cultural' },
    { year: 1939, title: 'World War II begins', type: 'political' },
    { year: 1954, title: 'Brown v. Board of Education', type: 'political' },
  ],
};

export interface TimelineEvent {
  year: number;
  title: string;
  type: 'political' | 'cultural';
  era: string;
  desc: string;
}

// Maps course unit IDs to timeline era IDs
export const UNIT_ERA_MAP: Record<string, string> = {
  '00-medieval':      'medieval',
  '01-renaissance':   'renaissance',
  '02-baroque':       'enlightenment',
  '03-enlightenment': 'revolution',
  '04-romanticism':   'victorian',
  '05-modernism':     'modern',
};

export const EVENTS: TimelineEvent[] = [
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

  // Renaissance & Reformation
  { year: 1598, title: "Edict of Nantes", type: "political", era: "renaissance", desc: "Henry IV grants French Protestants substantial civil rights, temporarily easing decades of religious warfare." },
  { year: 1600, title: "Giordano Bruno burned at the stake", type: "cultural", era: "renaissance", desc: "The philosopher is executed in Rome for heresy, marking the violent collision between new cosmological thinking and Church authority." },
  { year: 1603, title: "Death of Elizabeth I", type: "political", era: "renaissance", desc: "The Tudor dynasty ends; James VI of Scotland becomes James I of England, uniting the two crowns." },
  { year: 1605, title: "Gunpowder Plot", type: "political", era: "renaissance", desc: "Catholic conspirators attempt to blow up Parliament, deepening anti-Catholic sentiment in England." },
  { year: 1607, title: "Jamestown founded", type: "political", era: "renaissance", desc: "The first permanent English settlement in North America begins the colonial project that will reshape the Atlantic world." },
  { year: 1609, title: "Galileo's telescope observations", type: "cultural", era: "renaissance", desc: "Galileo observes Jupiter's moons and lunar craters, providing concrete evidence for Copernican cosmology." },
  { year: 1610, title: "Caravaggio dies", type: "cultural", era: "renaissance", desc: "The revolutionary painter whose chiaroscuro transformed European art dies at 38, leaving a legacy that would define Baroque visual culture." },
  { year: 1618, title: "Thirty Years' War begins", type: "political", era: "renaissance", desc: "A catastrophic conflict engulfs Central Europe, beginning as religious war and evolving into a struggle for continental power." },
  { year: 1620, title: "Mayflower voyage", type: "political", era: "renaissance", desc: "English Separatists establish Plymouth Colony, extending the Reformation's fractures into the New World." },
  { year: 1623, title: "Shakespeare First Folio published", type: "cultural", era: "renaissance", desc: "Seven years after Shakespeare's death, his collected plays are printed — preserving roughly half his works that might otherwise have been lost." },
  { year: 1633, title: "Galileo's trial", type: "cultural", era: "renaissance", desc: "The Inquisition forces Galileo to recant heliocentrism, crystallizing the tension between empirical science and institutional religion." },
  { year: 1648, title: "Peace of Westphalia", type: "political", era: "renaissance", desc: "Ends the Thirty Years' War and establishes the principle of state sovereignty that will underpin European politics for centuries." },

  // Civil War & Enlightenment (Baroque)
  { year: 1642, title: "English Civil War begins", type: "political", era: "enlightenment", desc: "Parliament and Crown go to war, a conflict that will produce regicide, republic, and ultimately shape modern ideas about constitutional government." },
  { year: 1649, title: "Execution of Charles I", type: "political", era: "enlightenment", desc: "The king is publicly beheaded — an act of revolutionary violence that shocks Europe and raises fundamental questions about sovereignty and divine right." },
  { year: 1651, title: "Hobbes publishes Leviathan", type: "cultural", era: "enlightenment", desc: "Writing from the wreckage of civil war, Hobbes argues that only absolute sovereign authority can prevent the 'war of all against all.'" },
  { year: 1660, title: "Restoration of Charles II", type: "political", era: "enlightenment", desc: "The monarchy returns after the failed Commonwealth, but on altered terms — Parliament's power is permanently enlarged." },
  { year: 1666, title: "Great Fire of London", type: "political", era: "enlightenment", desc: "The fire destroys medieval London; Christopher Wren's rebuilding — including St. Paul's Cathedral — will physically reshape the city." },
  { year: 1687, title: "Newton's Principia", type: "cultural", era: "enlightenment", desc: "Newton publishes his laws of motion and universal gravitation, providing the mathematical foundation for the scientific revolution." },
  { year: 1688, title: "Glorious Revolution", type: "political", era: "enlightenment", desc: "James II is deposed in favor of William and Mary, establishing parliamentary supremacy and constitutional monarchy in England." },
  { year: 1689, title: "Locke's Two Treatises of Government", type: "cultural", era: "enlightenment", desc: "Locke articulates natural rights and government by consent — ideas that will fuel revolutions in America and France a century later." },
  { year: 1710, title: "Statute of Anne", type: "cultural", era: "enlightenment", desc: "The first modern copyright law, reflecting the emergence of authorship as a legally recognized form of intellectual property." },

  // Revolution & Romanticism (Enlightenment unit)
  { year: 1751, title: "Diderot's Encyclopédie begins", type: "cultural", era: "revolution", desc: "The great Enlightenment project to systematize all human knowledge, challenging the Church's monopoly on intellectual authority." },
  { year: 1755, title: "Lisbon earthquake", type: "political", era: "revolution", desc: "The catastrophic earthquake kills tens of thousands and shakes Enlightenment optimism — Voltaire's Candide is partly a response." },
  { year: 1762, title: "Rousseau's Social Contract", type: "cultural", era: "revolution", desc: "Rousseau argues that legitimate political authority rests on a social contract among citizens, not divine right — a philosophical bombshell." },
  { year: 1776, title: "American Declaration of Independence", type: "political", era: "revolution", desc: "The American colonies break from Britain, translating Enlightenment philosophy into revolutionary political action." },
  { year: 1781, title: "Kant's Critique of Pure Reason", type: "cultural", era: "revolution", desc: "Kant redraws the boundaries of human knowledge, arguing that the mind actively structures experience rather than passively receiving it." },
  { year: 1789, title: "French Revolution begins", type: "political", era: "revolution", desc: "The storming of the Bastille ignites a revolution that will overthrow the monarchy, terrify Europe, and redefine the possibilities of political change." },
  { year: 1793, title: "Reign of Terror", type: "political", era: "revolution", desc: "The Revolution devours itself; the Committee of Public Safety executes thousands, raising agonizing questions about revolutionary violence and idealism." },
  { year: 1798, title: "Lyrical Ballads published", type: "cultural", era: "revolution", desc: "Wordsworth and Coleridge's collection launches English Romanticism, turning poetry toward common speech, individual feeling, and the natural world." },
  { year: 1804, title: "Napoleon crowned Emperor", type: "political", era: "revolution", desc: "Napoleon crowns himself, betraying republican ideals — Beethoven famously scratches his dedication from the Eroica Symphony." },
  { year: 1805, title: "Battle of Trafalgar", type: "political", era: "revolution", desc: "Nelson's victory secures British naval supremacy for a century but costs him his life — the event shapes the world Austen's characters inhabit." },
  { year: 1815, title: "Battle of Waterloo", type: "political", era: "revolution", desc: "Napoleon's final defeat; the Congress of Vienna redraws Europe's map and attempts to restore the old order." },
  { year: 1818, title: "Mary Shelley's Frankenstein", type: "cultural", era: "revolution", desc: "Shelley's novel fuses Romantic imagination with scientific anxiety, creating a founding text of both science fiction and the critique of unchecked ambition." },
  { year: 1824, title: "Beethoven's Ninth Symphony premiered", type: "cultural", era: "revolution", desc: "The symphony's choral finale, setting Schiller's 'Ode to Joy,' becomes the supreme expression of Romantic universalism and human aspiration." },

  // Industrial Age & Realism (Romanticism unit)
  { year: 1842, title: "Chartist Movement peaks", type: "political", era: "victorian", desc: "Working-class agitation for political reform in Britain — universal male suffrage, secret ballots — pressures the establishment toward democratic expansion." },
  { year: 1848, title: "European Revolutions", type: "political", era: "victorian", desc: "A wave of uprisings sweeps across Europe — France, the German states, the Habsburg Empire, Italy — demanding constitutional government and national self-determination." },
  { year: 1848, title: "Marx & Engels publish The Communist Manifesto", type: "cultural", era: "victorian", desc: "Written on the eve of revolution, the Manifesto reframes history as class struggle and calls for the overthrow of capitalism." },
  { year: 1851, title: "Great Exhibition in London", type: "cultural", era: "victorian", desc: "The Crystal Palace showcases industrial progress and imperial confidence — the same year Melville publishes his dark counter-narrative of obsession and doom." },
  { year: 1857, title: "Baudelaire's Les Fleurs du mal", type: "cultural", era: "victorian", desc: "Baudelaire's poetry of urban decay, beauty, and ennui inaugurates literary modernism decades before the term exists." },
  { year: 1859, title: "Darwin's On the Origin of Species", type: "cultural", era: "victorian", desc: "Darwin's theory of evolution by natural selection upends humanity's understanding of its place in nature, with profound consequences for religion, philosophy, and literature." },
  { year: 1861, title: "American Civil War begins", type: "political", era: "victorian", desc: "The war that Moby-Dick seemed to anticipate erupts — a struggle over slavery, union, and the meaning of American democracy." },
  { year: 1869, title: "Suez Canal opens", type: "political", era: "victorian", desc: "The canal reshapes global trade and deepens European imperial penetration of the Middle East and Asia." },
  { year: 1871, title: "German unification", type: "political", era: "victorian", desc: "Bismarck's wars consolidate the German Empire, fundamentally altering the European balance of power." },
  { year: 1874, title: "First Impressionist Exhibition", type: "cultural", era: "victorian", desc: "Monet, Renoir, Degas, and others exhibit independently, breaking from academic painting and revolutionizing how art represents perception and light." },
  { year: 1884, title: "Berlin Conference", type: "political", era: "victorian", desc: "European powers partition Africa among themselves, formalizing the colonial 'Scramble for Africa' with catastrophic consequences." },
  { year: 1899, title: "Freud's The Interpretation of Dreams", type: "cultural", era: "victorian", desc: "Freud's foundational psychoanalytic text argues that dreams reveal unconscious desires — an idea that will pervade 20th-century literature and thought." },

  // World Wars & Modernism
  { year: 1905, title: "Einstein's special relativity", type: "cultural", era: "modern", desc: "Einstein upends Newtonian physics, suggesting that time and space are relative — a conceptual revolution that resonates through Modernist art and literature." },
  { year: 1907, title: "Picasso's Les Demoiselles d'Avignon", type: "cultural", era: "modern", desc: "Picasso shatters pictorial convention, inaugurating Cubism and the Modernist assault on unified perspective." },
  { year: 1913, title: "Stravinsky's Rite of Spring premieres", type: "cultural", era: "modern", desc: "The Paris premiere provokes a riot — the ballet's primal rhythms and dissonance signal Modernism's radical break with 19th-century aesthetic norms." },
  { year: 1914, title: "World War I begins", type: "political", era: "modern", desc: "The assassination of Archduke Franz Ferdinand triggers a continental war of unprecedented industrial violence, killing millions and destroying the old European order." },
  { year: 1917, title: "Russian Revolution", type: "political", era: "modern", desc: "The Bolsheviks seize power, creating the world's first communist state and inaugurating an ideological struggle that will define the 20th century." },
  { year: 1918, title: "World War I ends", type: "political", era: "modern", desc: "The armistice brings a hollow peace; the war's carnage generates a 'Lost Generation' of writers — Hemingway, Remarque, Owen — haunted by what they witnessed." },
  { year: 1922, title: "Joyce's Ulysses & Eliot's The Waste Land", type: "cultural", era: "modern", desc: "Two landmark works published the same year: Joyce reimagines the novel as stream of consciousness; Eliot composes a fragmented elegy for a shattered civilization." },
  { year: 1929, title: "Stock market crash", type: "political", era: "modern", desc: "The Wall Street crash triggers the Great Depression, devastating economies worldwide and fueling the rise of fascism and authoritarian movements." },
  { year: 1933, title: "Hitler becomes Chancellor", type: "political", era: "modern", desc: "The Nazi seizure of power begins Germany's descent into totalitarianism, persecution, and ultimately genocide." },
  { year: 1936, title: "Spanish Civil War begins", type: "political", era: "modern", desc: "The war becomes a proving ground for fascism and a cause célèbre for international leftists — Orwell, Hemingway, and others witness and write about it." },
  { year: 1939, title: "World War II begins", type: "political", era: "modern", desc: "Germany invades Poland, initiating a global conflict that will kill an estimated 70–85 million people and culminate in the Holocaust and the atomic bomb." },
  { year: 1945, title: "Hiroshima & end of WWII", type: "political", era: "modern", desc: "The atomic bombings of Hiroshima and Nagasaki end the war and inaugurate the nuclear age, forcing humanity to confront the possibility of its own extinction." },
  { year: 1947, title: "Indian independence & Partition", type: "political", era: "modern", desc: "The end of British rule in India — accompanied by catastrophic sectarian violence — signals the beginning of the end for European colonial empires." },
  { year: 1948, title: "UN Universal Declaration of Human Rights", type: "cultural", era: "modern", desc: "In the aftermath of the Holocaust, the international community attempts to codify universal human dignity — an aspirational document whose promises remain unevenly fulfilled." },
  { year: 1949, title: "Beauvoir's The Second Sex", type: "cultural", era: "modern", desc: "Beauvoir's foundational feminist text argues that 'one is not born, but rather becomes, a woman' — a landmark in existentialist philosophy and gender theory." },
  { year: 1954, title: "Brown v. Board of Education", type: "political", era: "modern", desc: "The Supreme Court rules school segregation unconstitutional, a legal turning point in the Civil Rights Movement — the world Ellison's narrator navigates." },
];
