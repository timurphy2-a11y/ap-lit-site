import { useState, useEffect, useCallback } from "react";

// ─── PEOPLE DATA ────────────────────────────────────────────────────────────
// Each entry: id, name, dates, field, unit(s), bio, significance
const PEOPLE = [
  // ── ANCIENT ───────────────────────────────────────────────────────────────
  {
    id: "aristotle",
    name: "Aristotle",
    dates: "384–322 BCE",
    field: "Philosopher & Scientist",
    units: ["00-medieval"],
    bio: "A student of Plato and tutor to Alexander the Great, Aristotle founded the Lyceum in Athens and systematized knowledge across an extraordinary range of fields: logic, biology, physics, ethics, politics, rhetoric, and poetics. His works were largely lost to Western Europe after the fall of Rome, transmitted through Arabic scholarship, and reintroduced in the twelfth and thirteenth centuries through translations that transformed Medieval intellectual life.",
    significance: "Aristotle is the 'authority' the Medieval Philosophy page names as one of the two pillars of Medieval knowledge, second only to divine revelation. His physics (four elements, 'natural' places, a fixed and finite cosmos) structured how educated people understood the physical world for nearly two thousand years. When Adelard of Bath reasons from first principles about why the earth doesn't fall, he is working within an Aristotelian framework. Aquinas's entire philosophical project is the effort to reconcile Aristotle's reason with Christian faith. When Copernicus and Galileo dismantle that cosmology, they are dismantling Aristotle.",
  },
  // ── MEDIEVAL ──────────────────────────────────────────────────────────────
  {
    id: "augustine",
    name: "St. Augustine of Hippo",
    dates: "354–430 CE",
    field: "Theologian & Philosopher",
    units: ["00-medieval"],
    bio: "Born in Roman North Africa, Augustine led a restless early life marked by intellectual ambition and moral struggle before his dramatic conversion to Christianity at age 31. He became Bishop of Hippo and spent the rest of his life writing — producing more than five million words that would shape Western theology for over a millennium.",
    significance: "The Confessions establishes the template for all subsequent Western autobiography: the self examined not as a fixed essence but as a drama of will, desire, and surrender. His account of a divided self — knowing the good but unable to do it — runs as a thread through Hamlet's paralysis, the Romantic obsessive, and Ellison's narrator.",
    portrait: "/images/portraits/portrait-augustine.jpg",
  },
  {
    id: "adelard",
    name: "Adelard of Bath",
    dates: "c. 1080–c. 1152",
    field: "Natural Philosopher",
    units: ["00-medieval"],
    bio: "An English scholar who traveled extensively through France, Sicily, and the Arab world, Adelard translated key Arabic and Greek scientific texts into Latin, transmitting Euclid's Elements and Ptolemy's astronomical tables to medieval Europe. His Natural Questions, written as a dialogue with his nephew, applied rational inquiry to questions about the natural world — why the earth doesn't fall, why the sea is salty.",
    significance: "Adelard represents the overlooked empirical strain within medieval thought. His insistence on 'reason' over 'authority' in natural inquiry anticipates the Renaissance scientific revolution by three centuries — complicating any simple narrative that reason only arrived with Galileo.",
    portrait: "/images/portraits/portrait-adelard.jpg",
  },
  {
    id: "aquinas",
    name: "Thomas Aquinas",
    dates: "1225–1274",
    field: "Theologian & Philosopher",
    units: ["00-medieval"],
    bio: "Born into a minor Italian noble family and educated at the University of Naples and then Paris, Aquinas joined the Dominican order against his family's wishes — his brothers kidnapped him and held him for a year to change his mind. He spent his career reconciling Aristotle's newly recovered philosophy with Christian theology, producing the Summa Theologiae, an enormous systematic account of Christian doctrine organized as a series of disputed questions. He died at 49, leaving the Summa unfinished.",
    significance: "Aquinas represents the medieval intellectual project at its most ambitious: reason and faith are not enemies but complementary paths to the same truth. His synthesis — the most confident integration of philosophy and theology the Western tradition ever attempted — is what the Reformation will fracture. The questions he thought resolved (the nature of God, the basis of authority, the relationship of the individual to the Church) will be reopened and never closed again.",
    portrait: "/images/portraits/portrait-aquinas-thomas.jpg",
  },
  {
    id: "bede",
    name: "Bede",
    dates: "c. 673–735",
    field: "Monk, Historian & Scholar",
    units: ["00-medieval"],
    bio: "A monk at the twin monastery of Wearmouth-Jarrow in Northumbria, Bede wrote the Ecclesiastical History of the English People, completed around 731, drawing on correspondence and documents gathered from across England.",
    significance: "His account of King Edwin's conversion council includes a counselor's comparison of human life to a sparrow's flight through a warm hall during a winter storm — an image of mortal life defined by its brevity and by ignorance of what precedes and follows it. The Philosophy page's hero image and its Hamlet connection (\"there is special providence in the fall of a sparrow\") both draw on this passage.",
  },
  {
    id: "boethius",
    name: "Boethius",
    dates: "c. 480–524",
    field: "Philosopher & Statesman",
    units: ["00-medieval"],
    bio: "A Roman senator who served at the summit of government under the Ostrogothic king Theodoric, Boethius was imprisoned and executed after an accusation of treason. He wrote The Consolation of Philosophy while awaiting death.",
    significance: "The dialogue's account of Fortune's wheel — wealth, office, and reputation occupying unstable positions that must inevitably turn — became one of the most widely read texts of the Middle Ages. Hamlet invokes it directly when he asks the Player to recite the speech demanding the wheel be broken rather than accepted.",
  },
  {
    id: "alhaytham",
    name: "Ibn al-Haytham",
    dates: "c. 965–c. 1040",
    field: "Mathematician & Scientist",
    units: ["00-medieval"],
    bio: "Working in Cairo, Ibn al-Haytham wrote the Book of Optics, joining mathematical analysis to controlled experiment in his study of light and vision. He instructed investigators to challenge received texts and to suspect their own judgment while doing so.",
    significance: "His work demonstrates that systematic observation did not begin in Renaissance Europe. Later Latin science developed partly through methods and texts, including his, produced in the Islamic world and transmitted through translation.",
  },
  {
    id: "ockham",
    name: "William of Ockham",
    dates: "c. 1287–1347",
    field: "Philosopher & Theologian",
    units: ["00-medieval"],
    bio: "A Franciscan friar educated at Oxford, Ockham wrote on logic, theology, and political authority, and was summoned to the papal court at Avignon to answer charges of unorthodoxy. The principle of parsimony now called Ockham's razor is his, though the razor image and the familiar name are later attributions.",
    significance: "Ockham's emphasis on God's absolute freedom to have created a radically different order made creation a less secure guide to God's nature than Aquinas had proposed — a fracture inside the scholastic synthesis that anticipated the separation of natural science from theology.",
  },
  // ── RENAISSANCE ───────────────────────────────────────────────────────────
  {
    id: "petrarch",
    name: "Francesco Petrarch",
    dates: "1304–1374",
    field: "Poet & Humanist",
    units: ["01-renaissance"],
    bio: "An Italian scholar and poet who searched monastic libraries for neglected classical manuscripts — recovering letters of Cicero long thought lost — Petrarch helped establish the study of language, history, and moral philosophy as preparation for active life. He is often called the father of Renaissance humanism, though his Christian commitments remained central throughout his career.",
    significance: "In the Secretum, Petrarch stages a dialogue between himself and 'Augustine,' who exposes his love of Laura, desire for literary fame, and attachment to worldly achievement as obstacles to spiritual freedom. Petrarch accepts the diagnosis without completing the conversion it demands — a divided self that anticipates Hamlet's own inability to act on what he knows he ought to do.",
  },
  {
    id: "pico",
    name: "Giovanni Pico della Mirandola",
    dates: "1463–1494",
    field: "Humanist Philosopher",
    units: ["01-renaissance"],
    bio: "A child prodigy of the Italian Renaissance, Pico could read Hebrew, Aramaic, Greek, and Latin. At 23 he proposed to defend 900 theses in Rome — a project the Pope banned as heretical. His Oration on the Dignity of Man, written as a preface to that debate, was never delivered in his lifetime but became the Renaissance's most celebrated statement of human potential.",
    significance: "Pico's God gives Adam no fixed nature — only the freedom to become whatever he chooses. This single idea explodes the medieval framework that assigned every creature a fixed place. Hamlet's 'what a piece of work is a man' is its echo — and its dark revision.",
    portrait: "/images/portraits/portrait-pico-giovanni.jpg",
  },
  {
    id: "castiglione",
    name: "Baldassare Castiglione",
    dates: "1478–1529",
    field: "Courtier & Diplomat",
    units: ["01-renaissance"],
    bio: "A courtier at Urbino and later a papal diplomat, Castiglione set The Book of the Courtier (1528) as a series of evening conversations at the Urbino court, where the speakers define the ideal courtier through education, physical skill, conversation, artistic judgment, and the ability to advise a ruler.",
    significance: "Castiglione calls the art of concealing effort sprezzatura — disciplined performance that must appear natural and unforced. The courtier creates a persuasive public self, but the performance depends entirely on rank, audience, and power. Hamlet's antic disposition, Claudius's public composure, and Osric's affectations all test what a performed identity can conceal and reveal.",
  },
  {
    id: "copernicus",
    name: "Nicolaus Copernicus",
    dates: "1473–1543",
    field: "Astronomer & Mathematician",
    units: ["01-renaissance"],
    bio: "A Polish polymath who spent most of his life as a church canon in northern Poland, Copernicus developed his heliocentric model over decades but delayed publishing it until the year of his death — reportedly receiving the printed book on his deathbed. He was motivated less by observation than by mathematical elegance: the Ptolemaic system required ever more complex corrections, while his sun-centered model was simpler.",
    significance: "The Revolutions of the Heavenly Bodies removes the earth — and humanity — from the center of the universe. The philosophical consequences took a century to unfold: Pascal trembles in their wake, and the loss of cosmic centrality haunts Western thought from the Baroque onward.",
    portrait: "/images/portraits/portrait-copernicus-nicolaus.jpg",
  },
  {
    id: "galileo",
    name: "Galileo Galilei",
    dates: "1564–1642",
    field: "Astronomer and Natural Philosopher",
    units: ["01-renaissance", "02-baroque"],
    bio: "A mathematician at Padua and later court philosopher in Florence, Galileo built telescopes powerful enough to show an irregular lunar surface, the phases of Venus, and four moons orbiting Jupiter. The Roman Inquisition tried him in 1633 and confined him to his villa at Arcetri for the rest of his life, where Milton reported visiting him during his Italian travels of 1638 or 1639.",
    significance: "Telescopic observation weakened the inherited division between a corruptible earth and perfect heavens without instantly producing universal acceptance of heliocentrism; geocentric, heliocentric, and hybrid models continued to compete. Galileo is the only contemporary named in Paradise Lost, and the epic's \"optic glass\" turns the instrument into an image of enlarged sight that still requires interpretation. Meeting him did not make Milton a committed Copernican.",
    portrait: "/images/portraits/portrait-galileo-galilei.jpg",
  },
  {
    id: "descartes",
    name: "René Descartes",
    dates: "1596–1650",
    field: "Philosopher & Mathematician",
    units: ["01-renaissance"],
    bio: "A French mathematician who spent most of his adult life in the Netherlands, Descartes invented analytic geometry, laid foundations for modern optics, and — most influentially — attempted to rebuild all human knowledge from scratch. His Discourse on the Method describes his method of radical doubt: strip away every belief that could possibly be false, and see what remains. What remained was 'I think, therefore I am.'",
    significance: "Cogito ergo sum is the pivot point of Western philosophy: the self-knowing individual consciousness as the only reliable foundation for knowledge. Everything built on that foundation — and everything lost when the Modernists discover the unconscious — traces back to Descartes' fireside experiment.",
    portrait: "/images/portraits/portrait-descartes-rene.jpg",
  },
  {
    id: "luther",
    name: "Martin Luther",
    dates: "1483–1546",
    field: "Theologian and Reformer",
    units: ["01-renaissance", "02-baroque"],
    bio: "An Augustinian friar and professor of biblical theology at Wittenberg whose Ninety-Five Theses of 1517 opened the Reformation. He held Scripture to possess greater authority than popes or councils and conscience to be bound to the Word of God rather than to private preference. In The Bondage of the Will (1525) he answered Erasmus directly.",
    significance: "'Here I stand' is the inversion of Augustine's surrender. Where Augustine submits his individual conscience to divine authority, Luther sets individual conscience against institutional authority — and survives. Luther also denies that the fallen will has any independent capacity to choose salvation: grace saves rather than assists a neutral will. He distinguishes the God revealed through Christ and Scripture from the divine will inaccessible to human speculation — the hidden God, which supplies the theological force behind Pascal's account of a God who gives signs sufficient for seekers without compelling belief.",
    portrait: "/images/portraits/portrait-luther-martin.jpg",
  },
  {
    id: "machiavelli",
    name: "Niccolò Machiavelli",
    dates: "1469–1527",
    field: "Political Thinker & Civil Servant",
    units: ["01-renaissance"],
    bio: "Second chancellor of the Florentine Republic for fourteen years, responsible for diplomacy and the citizen militia, Machiavelli was dismissed, imprisoned, and tortured after the Medici restoration in 1512. He wrote The Prince in political exile, asking not what virtues a ruler ought to possess but what actions actually preserve a state among people who do not consistently act well.",
    significance: "Machiavelli evaluates cruelty and deception through political necessity rather than conventional moral reputation, and his image of Fortune as a flooding river — which preparation can channel but never abolish — revises Boethius's wheel of detachment into a doctrine of foresight. Claudius's competence in Hamlet's opening court scene, and the prayer scene's gap between effective action and moral legitimacy, belong to this same argument.",
  },
  {
    id: "shakespeare",
    name: "William Shakespeare",
    dates: "1564–1616",
    field: "Playwright & Poet",
    units: ["00-medieval", "01-renaissance"],
    bio: "Born in Stratford-upon-Avon, Shakespeare came to London in the late 1580s and became both a working playwright and shareholder in the Globe Theatre. He wrote approximately 37 plays and 154 sonnets over two decades. Almost nothing is known of his inner life; we have signatures, legal documents, and the works themselves. Stephen Greenblatt's Will in the World is a sustained attempt to reconstruct the man from the works.",
    significance: "Hamlet is the course's first major literary text and its one dual anchor, read against both the Medieval and Renaissance units — a play in which a mind still shaped by medieval certainties (divine judgment, hierarchical duty, ghosts with unfinished business) collides with Renaissance optimism (Pico's self-creating human) and Renaissance anxiety (Montaigne's self-doubting essayist), producing a character who cannot act. Understanding Shakespeare's historical moment — the dying years of Elizabeth I, the Reformation's fractures, the new science's vertigo — is essential to reading the play in either direction.",
    portrait: "/images/portraits/portrait-shakespeare-william.jpg",
  },
  // ── BAROQUE ───────────────────────────────────────────────────────────────
  {
    id: "hobbes",
    name: "Thomas Hobbes",
    dates: "1588–1679",
    field: "Philosopher",
    units: ["02-baroque", "03-enlightenment"],
    bio: "An English philosopher who worked as tutor and secretary to the Cavendish family and spent the civil-war years in exile in Paris. Leviathan (1651) grounds political authority in a covenant among individuals rather than in divine hereditary right. Hobbes was also a thoroughgoing materialist: he explained nature, sensation, thought, and action through matter in motion, and treated human deliberation as a causal process rather than an uncaused act of will.",
    significance: "The state of nature names a condition without a recognized common authority able to settle disputes and enforce agreements — not a claim that human beings are innately wicked. The sovereign may be one person or an assembly, and subjects retain the right to resist direct threats to their lives, since self-preservation is the purpose for which the authority was created.",
    portrait: "/images/portraits/portrait-hobbes-thomas.jpg",
  },
  {
    id: "pascal",
    name: "Blaise Pascal",
    dates: "1623–1662",
    field: "Mathematician, Scientist, and Religious Thinker",
    units: ["02-baroque"],
    bio: "A French mathematician who contributed to projective geometry, the early theory of probability, and the study of atmospheric pressure and the vacuum, and who built one of the first mechanical calculators. After 1654 he associated closely with the Jansenist community at Port-Royal. The Pensées are fragments of an unfinished defense of the Christian religion, published after his death.",
    significance: "His two infinities and the thinking reed belong to the Human Position thread: consciousness confers dignity without conferring mastery. The heart in the Pensées names an immediate faculty through which first principles and religious truth may be apprehended without discursive proof — not emotion opposed to intellect. The river fragment turns justice bounded by political custom into a problem, and the distinction between knowing that God exists and loving God carries into Milton's Satan.",
    portrait: "/images/portraits/portrait-pascal-blaise.jpg",
  },
  {
    id: "milton",
    name: "John Milton",
    dates: "1608–1674",
    field: "Poet and Political Writer",
    units: ["02-baroque"],
    bio: "An English poet who served the Commonwealth as Secretary for Foreign Tongues and defended the regicide in print. He lost his sight entirely by 1652 and composed Paradise Lost through dictation. After the Restoration in 1660 he was briefly imprisoned and remained politically vulnerable. He held a vital, animist conception of created matter, imagining existence as a continuum in which matter may become increasingly refined rather than as two separate substances.",
    significance: "Milton reported visiting Galileo at Arcetri, and Galileo is the only contemporary he names in Paradise Lost. The poem's cosmology stays deliberately open among competing astronomical models. His defense of responsible freedom — creatures \"sufficient to have stood, though free to fall\" — diverges from strict accounts of the bound will without making the poem an answer to Luther or a refutation of Hobbes, and the simple label \"Arminian\" understates his theological independence.",
    portrait: "/images/portraits/portrait-milton-john.jpg",
  },
  {
    id: "newton",
    name: "Isaac Newton",
    dates: "1642–1727",
    field: "Mathematician and Natural Philosopher",
    units: ["02-baroque", "03-enlightenment"],
    bio: "Lucasian Professor of Mathematics at Cambridge and later Master of the Mint. Beyond the Principia he worked extensively on optics, alchemy, chronology, and biblical interpretation, which occupied a large part of his writing life.",
    significance: "The Principia (1687) is an influential mathematical synthesis rather than a final achievement: the same laws of motion and gravitation explain terrestrial and celestial movement, joining observation, mathematics, inherited problems, and the work of many earlier investigators. Its reach remained specific. Mathematical success in natural philosophy did not make the same method sufficient for every kind of truth.",
    portrait: "/images/portraits/portrait-newton-isaac.jpg",
  },
  {
    id: "cavendish",
    name: "Margaret Cavendish",
    dates: "1623–1673",
    field: "Natural Philosopher, Poet, and Playwright",
    units: ["02-baroque"],
    bio: "Duchess of Newcastle, and one of the first Englishwomen to publish extensively under her own name across natural philosophy, poetry, fiction, and drama. She defended a vital, self-moving conception of matter against mechanical accounts of nature, and criticized the reliance of the new experimental societies on instruments. In 1667 she became the first woman to attend a meeting of the Royal Society.",
    significance: "The Blazing World (1666) mixes fiction, satire, natural philosophy, and utopian experiment. Its Empress interrogates groups of specialist investigators and reorganizes their institutions, attacking the tendency of instruments and learned societies to multiply appearances without producing agreement. The work gives a woman authority denied her in the institutions she examines, and in doing so becomes an experiment in intellectual rule rather than a simple fantasy of liberation.",
    portrait: "/images/portraits/portrait-cavendish-margaret.jpg",
  },
  {
    id: "lanyer",
    name: "Aemilia Lanyer",
    dates: "1569–1645",
    field: "Poet",
    units: ["02-baroque"],
    bio: "An English poet of Venetian-Jewish musical descent who moved in court circles and later ran a school. Salve Deus Rex Judaeorum (1611) was the first substantial English poetry collection published by a woman with an explicit claim to literary authorship, framed by an extended community of female dedicatees and designed to attract patronage. Historical records also spell her name Emilia Lanier and Aemilia Bassano.",
    significance: "\"Eve's Apology in Defence of Women\" gives the argument to Pilate's wife: Adam possesses greater strength, receives the command directly, and knowingly accepts the fruit, while Eve is deceived. Lanyer does not need to make Eve faultless. She challenges the interpretive authority that allowed men to assign guilt to women while minimizing male choice.",
    portrait: "/images/portraits/portrait-lanyer.jpg",
  },
  {
    id: "erasmus",
    name: "Desiderius Erasmus",
    dates: "c. 1466–1536",
    field: "Humanist and Theologian",
    units: ["02-baroque"],
    bio: "A Dutch humanist, priest, and editor whose Greek New Testament and editions of the Church Fathers reshaped biblical scholarship. He criticized clerical abuses while remaining within the Catholic Church, and resisted the confessional division that followed Luther's break.",
    significance: "On Free Will (1524) defends a limited human capacity to respond to divine grace, grounded in a concern for moral exhortation and responsibility: commands and warnings in Scripture presuppose some power to respond. The dispute with Luther is a controversy inside Christian theology about grace and the will, not a conflict between religion and human freedom.",
  },
  {
    id: "calvin",
    name: "John Calvin",
    dates: "1509–1564",
    field: "Theologian and Reformer",
    units: ["02-baroque"],
    bio: "A French reformer trained in law and humanist letters who led the reformation in Geneva. The Institutes of the Christian Religion, revised repeatedly between 1536 and 1559, became the most systematic Protestant theology of the century and shaped reformed churches across Europe, including the English communities in which Milton was raised.",
    significance: "Calvin emphasizes divine sovereignty, election, and providence, and the inability of fallen humanity to merit salvation. His theology forms much of the confessional environment in which Milton developed his own positions — and against which Milton's insistence that foreknowledge does not compel the actions foreknown reads as a deliberate divergence.",
  },
  // ── ENLIGHTENMENT ─────────────────────────────────────────────────────────
  {
    id: "locke",
    name: "John Locke",
    dates: "1632–1704",
    field: "Political Philosopher",
    units: ["03-enlightenment"],
    bio: "An English philosopher whose Two Treatises of Government (1689) argued that political authority is legitimate only when it rests on the consent of the governed, and that a government which violates its citizens' natural rights — to life, liberty, and property — may legitimately be overthrown. He wrote in the shadow of the Glorious Revolution that had just deposed James II.",
    significance: "Locke translates the Reformation's principle of individual conscience into political theory: as Luther set individual judgment against the Church, Locke sets individual rights against the Crown. His ideas fueled the American and French revolutions and remain foundational to liberal democratic theory — the starting point for every subsequent argument about the limits of legitimate authority.",
    portrait: "/images/portraits/portrait-locke-john.jpg",
  },
  {
    id: "bacon",
    name: "Francis Bacon",
    dates: "1561–1626",
    field: "Philosopher and Lord Chancellor",
    units: ["03-enlightenment"],
    bio: "An English lawyer and statesman who rose to Lord Chancellor under James I before being convicted of accepting bribes from litigants and stripped of office — a fall he accepted without much protest, since by his own account judges of the age routinely took such gifts. He argued for a reformed method of natural inquiry built on observation, controlled comparison, and collaborative work; The Advancement of Learning appeared in 1605. He died, according to legend, of a chill caught while stuffing a chicken with snow to test whether cold could preserve meat.",
    significance: "The river of time is Bacon's polemical image, not a settled historical account: what is light and inflated floats downstream to the present while what is weighty and solid sinks. It reverses the presumption that survival establishes truth, making tradition evidence to investigate rather than a verdict that ends investigation — it does not prove that profound traditions necessarily disappeared. Enlightenment writers inherit that suspicion of inherited authority and extend it from natural philosophy to texts, institutions, and history itself.",
  },
  {
    id: "diderot",
    name: "Denis Diderot",
    dates: "1713–1784",
    field: "Writer, Philosopher, and Editor",
    units: ["03-enlightenment"],
    bio: "A French writer who directed the Encyclopédie with Jean le Rond d'Alembert for over twenty years, working under recurring censorship and the threat of suppression — the French crown revoked its publishing license in 1759, and Diderot continued the project partly in secret. He was also a materialist with a sustained interest in determinism, and wrote fiction, criticism, and dialogues, much of which circulated only in manuscript during his lifetime. Catherine the Great, an admirer, bought his library and paid him to serve as its librarian without ever requiring him to leave Paris.",
    significance: "The Encyclopédie reorganized authority as well as information: articles on artisans' tools and manufacture appeared beside philosophy, theology, and natural science, and its cross-reference system let an apparently neutral arrangement of subjects expose contradictions and redirect readers toward controversial arguments. Jacques the Fatalist and His Master — composed largely in the 1770s but not published in France until 1796 — makes its form enact the problem of knowledge and responsibility, through interrupted stories, an argumentative narrator, and an unresolved relation between determinism and free choice.",
  },
  {
    id: "hume",
    name: "David Hume",
    dates: "1711–1776",
    field: "Philosopher and Historian",
    units: ["03-enlightenment"],
    bio: "A Scottish philosopher, essayist, and historian whose Treatise of Human Nature (1739–1740) applied empirical method to the workings of the mind itself; it sold so poorly on publication that Hume said it 'fell dead-born from the press.' His multi-volume History of England, not the Treatise, made him famous and wealthy during his lifetime. He was denied a university chair twice, partly over suspicions of atheism, and spent years in Paris as a celebrated figure among the philosophes before dying, by his own account and Adam Smith's, with unusual serenity.",
    significance: "Observation of one billiard ball striking another supplies sequence and repeated conjunction, not a necessary power binding the events; the expectation that similar causes produce similar effects comes from custom or habit, not from reason. This is mitigated skepticism rather than total doubt — inquiry continues, but its conclusions remain corrigible. The backgammon passage, in which Hume dines and plays games with friends after philosophy leaves him unable to justify his own beliefs, marks the return from abstract crisis to ordinary sociability, not a refutation of the doubt. His critical rigor did not prevent him from making racist claims in the essay 'Of National Characters,' a contradiction his admirers have had to reckon with rather than explain away.",
  },
  {
    id: "voltaire",
    name: "Voltaire (François-Marie Arouet)",
    dates: "1694–1778",
    field: "Writer & Philosopher",
    units: ["03-enlightenment"],
    bio: "Born François-Marie Arouet in Paris, Voltaire adopted his pen name after a stint in the Bastille for satirizing the Regent. He spent decades writing plays, histories, philosophical tales, and an enormous correspondence, eventually settling at Ferney, near the Swiss border, where he could flee French jurisdiction if necessary. He was the most famous writer in Europe and the most relentless prosecutor of religious intolerance, judicial corruption, and institutional cruelty the Enlightenment produced.",
    significance: "Voltaire appears in two of the unit's threads. In Knowledge and Its Limits, Candide demolishes the Leibnizian claim that this is the best of all possible worlds: the joke is that a system designed to explain everything away can never be refuted by anything that actually happens. The remedy — 'we must cultivate our garden' — abandons system in favor of practical work. In the Individual and Authority thread, the Calas affair is his defining act. When a Protestant merchant was broken on the wheel on false charges fueled by anti-Protestant hysteria, Voltaire spent three years writing pamphlets, building alliances across Europe, and forcing the French crown to overturn the verdict. This is Kant's public use of reason before Kant named it.",
  },
  {
    id: "rousseau",
    name: "Jean-Jacques Rousseau",
    dates: "1712–1778",
    field: "Philosopher & Writer",
    units: ["03-enlightenment", "04-romanticism"],
    bio: "A Genevan-born philosopher and writer whose work moved across political philosophy, education, music, fiction, and autobiography, Rousseau argued that human beings are naturally good but corrupted by civilization — a direct challenge to Hobbes and a radical revision of the Enlightenment's faith in reason and progress. The Confessions, composed c. 1765–1770 and published after his death, announced a project of self-revelation its author believed to be without precedent. He abandoned his five children to an orphanage. He died convinced he was being persecuted. He was probably right.",
    significance: "Rousseau appears twice in this course because he belongs to two periods. As Enlightenment critic, his concept of amour-propre — the corrupting need to be esteemed by others — is the key to Pride and Prejudice's social dynamics. As Romantic pioneer, his Confessions make the individual life a possible source of knowledge, since sensations and emotions have histories that abstract accounts of human nature miss. Yet the self he reveals there is not transparent even to itself: memory selects and reshapes, confession can become performance, and the wish to appear wholly sincere opens new forms of self-deception.",
    portrait: "/images/portraits/portrait-rousseau-jean-jacques.jpg",
  },
  {
    id: "kant",
    name: "Immanuel Kant",
    dates: "1724–1804",
    field: "Philosopher",
    units: ["03-enlightenment", "04-romanticism"],
    bio: "A Prussian philosopher who spent his entire life within 50 miles of his birthplace, Kant almost never traveled, never married, and was famous for the clock-like regularity of his daily walks. His three Critiques — Pure Reason, Practical Reason, and Judgment — rewrote the foundations of epistemology, ethics, and aesthetics; the Critique of the Power of Judgment (1790) treats beauty and the sublime as philosophical problems rather than matters of taste alone. He claimed that reading Hume 'awakened him from his dogmatic slumber.'",
    significance: "Kant's motto for the Enlightenment — Sapere aude, 'dare to know' — captures the period's core challenge to intellectual timidity. His distinction between the public use of reason (always free) and private obedience (sometimes required) provides a framework for understanding how the Enlightenment thinks about the individual's relationship to institutions — including its central argument against Hobbes. Kant also theorized the sublime rather than warning against it: the mind encounters what imagination cannot adequately gather into one presentable whole, and through that failure becomes aware of powers in itself not reducible to sensory magnitude. The Romantics inherit this structure directly — Emerson's dissolving self is a Romantic development of Kant's category, not a violation of it.",
    portrait: "/images/portraits/portrait-kant-immanuel.jpg",
  },
  {
    id: "leibniz",
    name: "Gottfried Wilhelm Leibniz",
    dates: "1646–1716",
    field: "Philosopher & Mathematician",
    units: ["03-enlightenment"],
    bio: "A German polymath who independently invented calculus at the same time as Newton — producing a bitter priority dispute that consumed both men's later years — Leibniz also made foundational contributions to logic, physics, and metaphysics. His philosophical system argued that God, being perfect, could only have created the most rational and harmonious universe possible. He served various German courts as diplomat, historian, and librarian, and then died largely forgotten, attended only by his secretary.",
    significance: "Leibniz is named in the Enlightenment Philosophy page as the target of Voltaire's satire in Candide: the 'Leibnizian formula that we live in the best of all possible worlds' is the philosophical optimism that Pangloss insists on through every catastrophe. His system — logically coherent but unfalsifiable by experience — is exactly what Voltaire's satire exposes as insufficient. He is also named in the Enlightenment Historical Moment as the intellectual whose confidence the Lisbon earthquake devastates. The earthquake did not refute Leibniz's argument, but it made the argument feel indecent.",
  },
  {
    id: "smith",
    name: "Adam Smith",
    dates: "1723–1790",
    field: "Moral Philosopher & Economist",
    units: ["03-enlightenment"],
    bio: "A Scottish philosopher best known as the father of modern economics (The Wealth of Nations, 1776), Smith was equally interested in moral psychology. His earlier Theory of Moral Sentiments (1759) argues that sympathy — the imaginative act of placing yourself in another person's position — is the foundation of all moral life. He never married, lived with his mother for most of his life, and reportedly had almost no memory of practical affairs.",
    significance: "Smith's Theory of Moral Sentiments provides the direct philosophical framework for Pride and Prejudice. His 'impartial spectator' — the internalized fair-minded observer through whose eyes we judge ourselves — is precisely what Elizabeth Bennet must learn to consult honestly. And his account of sympathy as imaginative projection explains both the novel's social machinery and its moral growth.",
    portrait: "/images/portraits/portrait-smith-adam.jpg",
  },
  {
    id: "pope",
    name: "Alexander Pope",
    dates: "1688–1744",
    field: "Poet & Critic",
    units: ["03-enlightenment"],
    bio: "England's greatest poet of the Augustan age, Pope was a Catholic in a Protestant country and physically disabled from spinal tuberculosis — disadvantages that, combined with his genius, made him the most celebrated and most savagely satirized writer of his era. He translated Homer, edited Shakespeare (badly), and wrote in heroic couplets with a precision and wit that have never been surpassed.",
    significance: "Pope's Essay on Criticism codifies the Enlightenment's aesthetic and epistemological values: follow Nature, respect the rules derived from Nature, and cultivate judgment over mere cleverness. His famous couplet about Newton — 'God said, Let Newton be! and all was Light' — captures the era's confidence that reason had finally illuminated the universe. His formal perfection is the sonic equivalent of sonata form.",
    portrait: "/images/portraits/portrait-pope-alexander.jpg",
  },
  {
    id: "wollstonecraft",
    name: "Mary Wollstonecraft",
    dates: "1759–1797",
    field: "Philosopher & Writer",
    units: ["03-enlightenment"],
    bio: "An English writer who grew up in poverty and domestic violence, Wollstonecraft became a teacher, governess, and eventually a professional writer in London. Her Vindication of the Rights of Woman (1792) argued that women's apparent inferiority was the product of education and circumstance, not nature — and that denying women rational education corrupted them and impoverished society. She died eleven days after giving birth to her daughter, the future Mary Shelley.",
    significance: "Wollstonecraft applies the Enlightenment's most fundamental principle — all rational beings deserve equal respect and equal right to self-governance — to women. Her argument is the logical extension of Locke and Kant, and it makes explicit what Austen dramatizes more obliquely: the structures of female dependency distort both moral character and rational judgment.",
    portrait: "/images/portraits/portrait-wollstonecraft-mary.jpg",
  },
  {
    id: "austen",
    name: "Jane Austen",
    dates: "1775–1817",
    field: "Novelist",
    units: ["03-enlightenment"],
    bio: "Born in Hampshire into a clergyman's family, Austen began writing as a teenager and produced six completed novels, several unfinished works, and a rich correspondence — all while managing household duties and maintaining a social life that she mined for material. She never married, declined at least one proposal, and published anonymously. Pride and Prejudice, begun as First Impressions around 1796, was published in 1813 to immediate success.",
    significance: "Austen is the course's Enlightenment core text author, though she writes during the Romantic period. Her intellectual commitments — rational judgment, social observation, the belief that character can be improved through honest self-examination — are fundamentally 18th-century. She dramatizes, with surgical precision, the social psychology that Rousseau and Smith theorize.",
    portrait: "/images/portraits/portrait-austen-jane.jpg",
  },
  // ── ROMANTICISM ───────────────────────────────────────────────────────────
  {
    id: "burke",
    name: "Edmund Burke",
    dates: "1729–1797",
    field: "Philosopher & Statesman",
    units: ["04-romanticism"],
    bio: "An Irish-born member of the British Parliament who spent his political career on unfashionable causes — conciliation with the American colonies, the impeachment of a colonial governor, Catholic relief in Ireland. He was not quite thirty when he published A Philosophical Enquiry into the Origin of Our Ideas of the Sublime and Beautiful, an early work he never much returned to and which outlived all his politics. Late in life his Reflections on the Revolution in France attacked the Revolution while it was still popular in England and cost him most of his friendships.",
    significance: "Burke supplies Romanticism's central aesthetic term decades before there is a Romantic movement to use it. His distinction is the one the unit runs on: the beautiful is smooth, small, harmonious, and comprehensible; the sublime is vast, obscure, powerful, and terrifying, and its effect depends on the mind failing to take it in. That failure is the point. It is the exact experience Friedrich paints, Turner dissolves into light, and Melville puts a whale at the center of — and it explains why the white whale must remain unknowable for the novel to work.",
  },
  {
    id: "shelley_pbs",
    name: "Percy Bysshe Shelley",
    dates: "1792–1822",
    field: "Poet & Essayist",
    units: ["04-romanticism"],
    bio: "An English poet whose political radicalism, atheism, and unconventional life kept him at the edge of respectable literary culture. A Defence of Poetry was composed in 1821 and published in 1840, after his death by drowning in Italy.",
    significance: "Reason and imagination are complementary, not rivals: reason enumerates qualities already known and respects differences, while imagination perceives the value of those qualities separately and as a whole. His argument does not claim that poets possess higher factual knowledge than scientists or philosophers. It claims that moral and political change depends on the capacity to imagine lives, connections, and values not yet contained in an established vocabulary.",
    portrait: "/images/portraits/portrait-shelley-percy.jpg",
  },
  {
    id: "shelley_mary",
    name: "Mary Shelley",
    dates: "1797–1851",
    field: "Novelist",
    units: ["04-romanticism"],
    bio: "The daughter of Mary Wollstonecraft, who died days after her birth, and the philosopher William Godwin. She began Frankenstein in 1816 near Geneva and published it in 1818 at the age of twenty. She continued writing novels, stories, travel writing, and editions of Percy Shelley's work after his death.",
    significance: "Frankenstein turns scientific ambition into a question about responsibility: the maker abandons what he has made and refuses the obligations that creation incurs. The creature's demand for recognition, and the sympathy the novel extends to him, make it an early study of the outsider produced by others' refusal rather than by nature.",
  },
  {
    id: "wordsworth",
    name: "William Wordsworth",
    dates: "1770–1850",
    field: "Poet",
    units: ["04-romanticism"],
    bio: "Born in the Lake District of England, Wordsworth spent his early adulthood walking enormous distances across the British countryside and through revolutionary France, where he fathered a child he largely abandoned. With Coleridge he published Lyrical Ballads in 1798, the founding document of English Romanticism. The Preface he added to the second edition is his poetic manifesto: poetry should use 'the real language of men' and take 'incidents and situations from common life' rather than the elevated diction of neoclassicism. He lived into old age and conservative respectability, eventually becoming Poet Laureate.",
    significance: "Wordsworth establishes nature not as backdrop but as moral teacher — a presence that can 'restore' and 'heal' the mind exhausted by urban modernity. His 'spots of time' — formative childhood experiences lodged in memory and periodically revisited — prefigure the Modernist interest in memory as the self's real archive. Eilenberger reads him as the origin of the Romantic attempt to find meaning through individual experience rather than inherited structure.",
    portrait: "/images/portraits/portrait-wordsworth-william.jpg",
  },
  {
    id: "emerson",
    name: "Ralph Waldo Emerson",
    dates: "1803–1882",
    field: "Essayist & Philosopher",
    units: ["04-romanticism"],
    bio: "An American essayist and lecturer, formerly a Unitarian minister, whose essay Nature (1836) helped define Transcendentalism. He worked as a public lecturer for much of his life and wrote for an audience he addressed directly.",
    significance: "Standing beneath an open sky he becomes a \"transparent eye-ball\": \"I am nothing; I see all.\" The ordinary boundary between observer and landscape seems to dissolve within a larger unity. This is one form of the Romantic sublime rather than irrational transport, and it does not mean Emerson abandons thought: his complaint is that habit and use narrow perception, turning a landscape into property, commodity, route, or resource, and that attention can recover the relations those categories conceal.",
    portrait: "/images/portraits/portrait-emerson-ralph.jpg",
  },
  {
    id: "marx",
    name: "Karl Marx",
    dates: "1818–1883",
    field: "Philosopher & Political Economist",
    units: ["04-romanticism"],
    bio: "Trained in philosophy with a doctorate on ancient Greek thought, Marx was closed out of an academic career by Prussian politics and moved into journalism. Censorship of the Rheinische Zeitung was followed by exile in Paris, Brussels, and finally London, where he wrote Capital. The Communist Manifesto, written with Friedrich Engels, appeared in 1848.",
    significance: "His path runs through Hegel and Feuerbach rather than through Romantic feeling converted into politics. Hegel located alienation in consciousness and social life; Feuerbach relocated it in religious projection; Marx relocates it materially, in labor and property — the worker is separated from the product, from the activity of production, from other people, and from human capacities. The Manifesto treats the bourgeoisie as revolutionary in its own right, remaking production and the globe, so \"callous cash payment\" and \"all that is solid melts into air\" describe a system's productivity and its exploitation together. Reading the Pequod as a workplace and commercial venture is an analytical parallel; Melville did not construct the novel as an illustration of Marx.",
    portrait: "/images/portraits/portrait-marx-karl.jpg",
  },
  {
    id: "schiller",
    name: "Friedrich Schiller",
    dates: "1759–1805",
    field: "Playwright, Poet & Philosopher",
    units: ["04-romanticism"],
    bio: "A German dramatist and philosopher, trained in medicine, whose Letters on the Aesthetic Education of Man (1795) responded to the French Revolution's violence by asking how a people becomes capable of political freedom.",
    significance: "Schiller keeps the unit from becoming a story of reason against feeling. He argues that sense and reason are reconciled through aesthetic experience rather than by one subordinating the other, and that a free political order requires citizens whose faculties are not at war. Aesthetic education is a condition of freedom, not a retreat from it.",
    portrait: "/images/portraits/portrait-schiller-friedrich.jpg",
  },
  {
    id: "melville",
    name: "Herman Melville",
    dates: "1819–1891",
    field: "Novelist & Short Story Writer",
    units: ["04-romanticism"],
    bio: "An American writer who sailed on a whaler, a naval frigate, and merchant ships before turning that experience into fiction. Moby-Dick (1851) appeared when American whaling was a dangerous, capital-intensive, globally connected industry; \"Bartleby, the Scrivener\" followed in 1853 and Benito Cereno in 1855. His later years were spent as a customs inspector in New York.",
    significance: "Melville's sea is a workplace and a global commercial space as well as a sublime one: crossed by routes, owned in Nantucket, worked by a multinational crew under the lay system. The novel holds two forms of Romantic subjectivity apart — Ahab's monomaniacal certainty, which converts a private interpretation into the ship's purpose, and Ishmael's provisional, relational narration, which lets several explanations remain in play. Read together, Moby-Dick, \"Bartleby,\" and Benito Cereno examine authority from three directions: seized, refused, and misread.",
    portrait: "/images/portraits/portrait-melville-herman.jpg",
  },
  {
    id: "goethe",
    name: "Johann Wolfgang von Goethe",
    dates: "1749–1832",
    field: "Writer",
    units: ["04-romanticism"],
    bio: "A German poet, novelist, dramatist, and administrator whose long career spanned the Sturm und Drang, Weimar classicism, and the early nineteenth century. The Sorrows of Young Werther (1774) made him famous across Europe while he was in his twenties.",
    significance: "Werther became a widely imitated model of exceptional sensibility. He treats the force of his response to nature, art, and Lotte as evidence of a depth ordinary society cannot accommodate; Albert, Lotte's fiancé and later husband, is steady, employed, and bound to practical obligations, and Werther borrows Albert's pistols to end his life. Goethe's stance is critical and ambivalent rather than a simple warning: the suffering is real, and so are the self-dramatization and the refusal of limits. Reports of imitative dress and suicide surrounded the novel, but the number and direct causation of such deaths remain historically uncertain.",
  },
  {
    id: "destael",
    name: "Germaine de Staël",
    dates: "1766–1817",
    field: "Writer and Political Thinker",
    units: ["04-romanticism"],
    bio: "A French-Swiss novelist, critic, and political thinker whose salon and correspondence made her a center of European intellectual life. Corinne (1807) and On Germany (1813) were written amid conflict with Napoleon, who restricted her movements and ordered the destruction of the 1810 French printing of On Germany; it was published abroad in 1813.",
    significance: "A major interpreter and transmitter of German Romanticism, she introduced many French and British readers to German literature, philosophy, religion, and the distinction between classical and Romantic art. Corinne joins artistic vocation to gender, national culture, and the Romantic life made into public performance. Her career shows Romantic individualism operating through salons, correspondence, translation, travel, exile, and the Coppet network rather than solitary inspiration alone.",
  },
  {
    id: "feuerbach",
    name: "Ludwig Feuerbach",
    dates: "1804–1872",
    field: "Philosopher",
    units: ["04-romanticism"],
    bio: "A German philosopher trained in the Hegelian tradition whose The Essence of Christianity (1841) argued that theology is anthropology: statements about God are statements about human nature in idealized form. The book's influence on the generation that included Marx and Engels was immediate.",
    significance: "Religious projection is the attribution of idealized human powers — reason, love, will — to an external divine being. Alienation is the process by which people become subordinate to powers derived from their own nature but no longer recognized as their creation. Applied to Ahab this is an interpretive lens, not a documented source: nothing establishes that Melville borrowed the theory. The sequence Hegel → Feuerbach → Marx relocates alienation from consciousness to religion to labor and property; each thinker transforms the concept rather than repeating it.",
  },
  {
    id: "darwin",
    name: "Charles Darwin",
    dates: "1809–1882",
    field: "Naturalist",
    units: ["04-romanticism"],
    bio: "An English naturalist whose voyage aboard the Beagle (1831–1836) supplied observations he worked over for decades. He developed natural selection privately in the late 1830s and accumulated evidence for twenty years. Alfred Russel Wallace independently formulated a theory of natural selection and sent Darwin a manuscript in 1858; their writings were presented jointly that year, and Darwin published On the Origin of Species in 1859.",
    significance: "Natural selection works through heritable variation together with differential survival and reproduction — nature does not consciously choose. The mechanism challenged fixed species and the requirement that each adaptation result from a separately intended design, and it places human beings on one branch of a history rather than at its summit. Darwin did not prove the universe meaningless, disprove religious belief, or show that evolution is governed by chance alone. Origin belongs to Moby-Dick's intellectual afterlife: it appeared eight years after the novel.",
  },
  {
    id: "dostoevsky",
    name: "Fyodor Dostoevsky",
    dates: "1821–1881",
    field: "Novelist",
    units: ["04-romanticism"],
    bio: "A Russian novelist arrested in 1849 for involvement with the Petrashevsky Circle and subjected to a staged mock execution at Semyonovsky Square: the death sentence had already been commuted, but the prisoners were not told until they had undergone the ritual. He served four years of penal servitude in Omsk followed by compulsory military service. Notes from Underground appeared in 1864 and Crime and Punishment in 1866.",
    significance: "Notes from Underground attacks the belief that scientific knowledge and enlightened self-interest could make human conduct predictable: people may reject an apparently beneficial order simply to prove that they remain free. The narrator is not a triumphant rebel — his hypertrophied self-consciousness becomes paralysis and damages every mutual relationship. Crime and Punishment continues the unit's concerns: the exceptional individual, a private theory used to authorize violence, guilt, alienation, and the uncertain possibility of moral renewal. The comparison with Bartleby is an interpretive analogy, not influence or twinship.",
  },
  // ── MODERNISM ─────────────────────────────────────────────────────────────
  {
    id: "nietzsche",
    name: "Friedrich Nietzsche",
    dates: "1844–1900",
    field: "Philosopher",
    units: ["05-modernism"],
    bio: "A classical philologist who left his professorship at Basel in 1879 and wrote his major books in the following decade. The parable of the madman appears in The Gay Science (1882). After his collapse in 1889 his sister Elisabeth Förster-Nietzsche took control of his manuscripts and reputation, assembling and editing material in ways that served her own nationalist and antisemitic politics.",
    significance: "\"God is dead\" describes a cultural event rather than a metaphysical report: Christian moral language continues after belief in its divine foundation has weakened, so inherited values can no longer justify themselves by invoking an authority everyone accepts. The madman's question is about responsibility — who human beings must become to prove worthy of what they have done. Nietzsche did not predict totalitarianism, and secularization does not necessarily produce it. Later movements appropriated him selectively and distorted his work; that reception is not his doctrine.",
    portrait: "/images/portraits/portrait-nietzsche-friedrich.jpg",
  },
  {
    id: "freud",
    name: "Sigmund Freud",
    dates: "1856–1939",
    field: "Founder of Psychoanalysis",
    units: ["05-modernism"],
    bio: "A Viennese neurologist who developed psychoanalysis as a theory of mind and a clinical practice. The Interpretation of Dreams appeared in 1899, Civilization and Its Discontents in 1930. He fled Vienna for London in 1938 after the Nazi annexation of Austria.",
    significance: "Dreams, symptoms, slips of the tongue, repression, and repetition suggest that conscious reasons do not exhaust the motives shaping action. Psychoanalysis claims indirect access to unconscious conflict through interpretation; it does not declare the mind a sealed interior that can never be approached. Civilization and Its Discontents offers one psychological account of how social order redirects aggression and desire without eliminating them. It is not a sufficient explanation of fascism, war, or the Holocaust, and existentialists contested psychoanalytic explanations wherever they appeared to remove freedom or responsibility.",
    portrait: "/images/portraits/portrait-freud-sigmund.jpg",
  },
  {
    id: "wittgenstein",
    name: "Ludwig Wittgenstein",
    dates: "1889–1951",
    field: "Philosopher",
    units: ["05-modernism"],
    bio: "Born into a wealthy Viennese family, Wittgenstein studied with Russell at Cambridge and wrote the Tractatus Logico-Philosophicus partly while serving in the Austro-Hungarian army; it was published in 1921. He left philosophy for a decade, returned to Cambridge in 1929, and developed a substantially different account of language published after his death as Philosophical Investigations (1953).",
    significance: "The Tractatus seeks the logical form that allows propositions to picture facts, and its final proposition — \"Whereof one cannot speak, thereof one must be silent\" — marks a boundary around factual propositions, leaving ethics, value, and the meaning of life outside what the book believes logic can state. He then compares his own propositions to a ladder to be discarded after it has been climbed. The later philosophy abandons much of that framework and studies the varied uses of language within forms of life. The philosopher who drew a single boundary concluded that language works through practices more diverse than his first system allowed.",
    portrait: "/images/portraits/portrait-wittgenstein-ludwig.jpg",
  },
  {
    id: "einstein",
    name: "Albert Einstein",
    dates: "1879–1955",
    field: "Physicist",
    units: ["05-modernism"],
    bio: "Working as a patent examiner in Bern, Einstein published the special theory of relativity in 1905 and general relativity in 1915. He left Germany in 1933 and spent the rest of his career at the Institute for Advanced Study in Princeton.",
    significance: "Relativity does not mean that everything depends upon the observer. Observers moving relative to one another may assign different spatial and temporal coordinates to the same events, but the theory's central principles are invariant: the laws of physics take the same form for inertial observers, and the speed of light in a vacuum is constant. Coordinate-dependent measurement is not subjective opinion. Einstein transformed classical physics while retaining a commitment to a lawful and intelligible universe, and his later resistance to interpretations of quantum mechanics that made physical reality fundamentally indeterminate shows how deep that commitment ran.",
    portrait: "/images/portraits/portrait-einstein-albert.jpg",
  },
  {
    id: "dubois",
    name: "W. E. B. Du Bois",
    dates: "1868–1963",
    field: "Sociologist, Historian, and Activist",
    units: ["05-modernism"],
    bio: "The first African American to earn a doctorate from Harvard, Du Bois produced pioneering empirical sociology, helped found the NAACP in 1909, and edited The Crisis for nearly a quarter century. The Souls of Black Folk appeared in 1903. He spent his final years in Ghana.",
    significance: "Double consciousness names \"this sense of always looking at one's self through the eyes of others, of measuring one's soul by the tape of a world that looks on in amused contempt and pity\" — a historically specific analysis of Black American life under a racial order, together with the figure of the veil. It is not the same as Sartre's Look, which analyzes a general structure of being seen by another consciousness, nor Rousseau's amour-propre, which shows identity becoming dependent on social judgment in general. The comparison is structural, not an identity. His conflict with Booker T. Washington concerned political rights, higher education, leadership, and the terms on which Black citizenship could be claimed. Invisible Man does not reject Du Bois and Washington as equally inadequate systems.",
    portrait: "/images/portraits/portrait-dubois-web.jpg",
  },
  {
    id: "washington",
    name: "Booker T. Washington",
    dates: "1856–1915",
    field: "Educator and Political Leader",
    units: ["05-modernism"],
    bio: "Born into slavery in Virginia, Washington founded the Tuskegee Institute in 1881 and built it into a major center of industrial education. His 1895 Atlanta Exposition address made him the most powerful Black public figure in the United States and the principal broker of white philanthropic funding for Black institutions.",
    significance: "The Atlanta address must be read within the violence, disfranchisement, and constrained political possibilities of the 1890s. It proposed economic advancement, industrial education, institution-building, and strategic accommodation within segregation. Du Bois and others argued that this conceded civil and political rights that could not be recovered later. Ellison's Founder and Bledsoe are transformations of the Washington and Tuskegee legacy, not portraits: Bledsoe's cynicism is Ellison's satire of institutional power, not Washington's hidden essence.",
    portrait: "/images/portraits/portrait-washington-bt.jpg",
  },
  {
    id: "ellison",
    name: "Ralph Ellison",
    dates: "1913–1994",
    field: "Novelist and Essayist",
    units: ["05-modernism"],
    bio: "Born in Oklahoma City and trained as a musician at Tuskegee, Ellison came to New York in 1936, worked for the Federal Writers' Project, and was encouraged into fiction by Richard Wright. He engaged closely with the Communist left before breaking with it during the 1940s, served in the merchant marine during the war, and published Invisible Man in 1952.",
    significance: "The Brotherhood draws on Communist Party history — interracial organizing beside internal discipline, strategic reversals, and the subordination of Black political concerns to a theory of class — while departing from literal allegory. Blues and jazz are formal resources rather than atmosphere: improvisation, repetition with variation, competing voices, and the conversion of suffering into form. The underground ending is hibernation and possible preparation for social return. It is not completed liberation, and the epilogue leaves open whether the narrator can reappear in public without accepting another identity prepared in advance.",
    portrait: "/images/portraits/portrait-ellison-ralph.jpg",
  },
  {
    id: "sartre",
    name: "Jean-Paul Sartre",
    dates: "1905–1980",
    field: "Philosopher, Novelist, and Playwright",
    units: ["05-modernism"],
    bio: "A French philosopher whose major work was written during and after the German occupation of France. Being and Nothingness appeared in 1943 and Existentialism Is a Humanism in 1946. He declined the Nobel Prize in Literature in 1964.",
    significance: "Human existence combines facticity — body, past actions, social position, history, material conditions — with transcendence, the capacity to project possibilities and act beyond an established description. The two are inseparable dimensions of situated freedom, not stages. Bad faith is the distortion that reduces a person either to established facts and roles or to an imaginary freedom without conditions; the waiter who performs his role with exaggerated precision illustrates the first, and the occupation itself is not the error. The Look names the moment when another consciousness fixes someone as an object: a man absorbed at a keyhole hears a step behind him and suddenly experiences himself as seen. Sartre described the young Jean Genet, caught stealing and named a thief, as \"pinned like a butterfly\" to an identity — a label converted into an alleged essence, though Genet's later choices are not determined by it. Applied to Invisible Man, the vocabulary illuminates assigned roles, renaming, and action within racial facticity. Black identity is not a freely chosen performance.",
  },
  {
    id: "camus",
    name: "Albert Camus",
    dates: "1913–1960",
    field: "Novelist, Essayist, and Journalist",
    units: ["05-modernism"],
    bio: "Born into poverty in French Algeria, Camus worked as a journalist and joined the French Resistance during the occupation. The Stranger and The Myth of Sisyphus both appeared in 1942. He received the Nobel Prize in Literature in 1957 and died in a car accident three years later.",
    significance: "The absurd is a relation, not a property of the world: it arises in the confrontation between the human demand for intelligibility, justice, and purpose and a universe that does not answer that demand. It belongs neither to the mind nor to the world alone, and it is not a synonym for nonsense or nihilism. Revolt is lucid persistence — Sisyphus pushes the stone knowing it will fall, acting without a promise that the universe will reward or complete his labor — and at the end of The Stranger Meursault opens himself to \"the benign indifference of the universe.\" The Stranger is set in colonial Algeria and leaves its Arab victim unnamed; its formal existential problem cannot be separated completely from the unequal colonial world it renders.",
  },
  {
    id: "arendt",
    name: "Hannah Arendt",
    dates: "1906–1975",
    field: "Political Theorist",
    units: ["05-modernism"],
    bio: "Raised in a German Jewish family and educated at Marburg and Heidelberg, Arendt fled Germany in 1933, was interned in France, escaped, and reached New York in 1941. The Origins of Totalitarianism appeared in 1951, The Human Condition in 1958, and Eichmann in Jerusalem in 1963.",
    significance: "Totalitarianism is analyzed through ideology, terror, atomization, and the destruction of a shared political world. Modern mass society can leave people without durable civic relationships or a secure place in common; ideological movements then offer belonging, historical purpose, and a complete explanation, and domination recruits as well as terrorizes. The banality of evil names thoughtlessness rather than obedience: Eichmann organized deportations through administrative work, and his clichés and careerism prevented serious judgment about what he was doing. \"Banality\" does not make the crime ordinary, innocent, or excusable, and it does not remove his agency. Her positive alternative is public action among plural persons who appear before one another as speakers and agents; private reflection can prepare such action but cannot permanently replace it.",
  },
  {
    id: "godel",
    name: "Kurt Gödel",
    dates: "1906–1978",
    field: "Logician",
    units: ["05-modernism"],
    bio: "An Austrian logician who moved in the intellectual world of the Vienna Circle while holding philosophical commitments — mathematical realism among them — quite different from the group's dominant positions. He published the incompleteness theorems in 1931 and later joined the Institute for Advanced Study in Princeton, where he became a close friend of Einstein.",
    significance: "The first incompleteness theorem: any consistent, effectively axiomatized formal system capable of expressing sufficient arithmetic contains statements it can neither prove nor disprove. The second: under related conditions, such a system cannot prove its own consistency. The results concern formal mathematical systems. They do not prove that every worldview is incomplete, that truth is subjective, or that institutions cannot understand themselves. The connection to Invisible Man is a labeled analogy and nothing more: the novel repeatedly enters systems whose assumptions prevent them from registering what they exclude.",
  },
  {
    id: "eilenberger",
    name: "Wolfram Eilenberger",
    dates: "b. 1972",
    field: "Philosopher and Writer",
    units: ["05-modernism"],
    bio: "A German philosopher and writer whose Time of the Magicians (2018) follows Wittgenstein, Heidegger, Benjamin, and Cassirer through the decade after the First World War.",
    significance: "His account describes philosophy after 1918 as a search for foundations conducted by thinkers who no longer agreed about what a foundation could be. The result was neither a common doctrine nor a general surrender of knowledge: logic, language, experience, history, and value were reconstructed through competing methods. The assigned chapter, \"Without Foundation,\" supplies the unit's picture of that competition.",
  },
  {
    id: "heidegger",
    name: "Martin Heidegger",
    dates: "1889–1976",
    field: "Philosopher",
    units: ["05-modernism"],
    bio: "A German philosopher whose Being and Time (1927) reoriented European thought about existence, time, and everyday human being. He became rector of Freiburg in 1933, joined the Nazi Party, publicly supported the regime, and never offered an adequate later repudiation.",
    significance: "Thrownness names finding oneself already situated within a world, history, language, relationships, and possibilities one did not choose. Authenticity means owning one's finite possibilities, not escaping every social relation or celebrating heroic will. No direct causal formula runs from the philosophy to the politics; his conduct instead raises the question of how philosophical sophistication can coexist with moral and political failure. His intellectual and personal relationship with Hannah Arendt belongs to both biographies without making either a supporting character in the other.",
  },
  {
    id: "heisenberg",
    name: "Werner Heisenberg",
    dates: "1901–1976",
    field: "Physicist",
    units: ["05-modernism"],
    bio: "A German physicist who formulated matrix mechanics in 1925 and the uncertainty relations in 1927, and who led German nuclear research during the Second World War.",
    significance: "The uncertainty relations state that the spreads in position and momentum distributions cannot both be made arbitrarily small in the same quantum state. This is a fact about state preparation, not a flaw in instruments or the disturbance of an otherwise classically definite object by an observer. Interpretations differ over whether individual particles possess definite values before measurement; that reality itself has no determinate properties is a disputed position, not a settled fact. \"Uncertainty\" is a technical relation in quantum mechanics and not a metaphor for cultural confusion — Gödel supplies this unit's principal account of a rigorously demonstrated formal limit.",
  },
  // ── VISUAL ARTISTS ────────────────────────────────────────────────────────
  {
    id: "duccio",
    name: "Duccio di Buoninsegna",
    dates: "c. 1255–c. 1319",
    field: "Painter",
    units: ["00-medieval"],
    bio: "The founder of the Sienese school of painting, Duccio created the Maestà altarpiece for Siena Cathedral — a monumental two-sided work depicting the Virgin enthroned and scenes from the Passion. When it was completed in 1311, the city processed it through the streets in celebration. Working in tempera and gold leaf, he began to soften the rigid Byzantine style with hints of human emotion and spatial depth.",
    significance: "Duccio represents the medieval painting tradition at its most refined: gold backgrounds signifying the divine realm, hierarchical scale, stylized figures whose holiness is expressed through formal convention rather than naturalistic illusion. Understanding this tradition makes the Renaissance revolution in perspective and realism comprehensible — not as progress from error but as a fundamental shift in what painting is for.",
    portrait: "/images/portraits/portrait-duccio.jpg",
  },
  {
    id: "martini",
    name: "Simone Martini",
    dates: "c. 1284–1344",
    field: "Painter",
    units: ["00-medieval"],
    bio: "A Sienese painter who worked at the papal court in Avignon and was a friend of the poet Petrarch, Martini created some of the most refined and courtly images of the late medieval period. His Annunciation altarpiece (1333) achieves an extraordinary elegance within the gold-ground tradition — the angel Gabriel and the Virgin rendered with a delicacy that borders on the Gothic. Petrarch famously asked him to paint a portrait of Laura.",
    significance: "Martini's Annunciation illustrates the defining characteristics of medieval visual theology: gold ground as sacred space, the event happening outside ordinary time and place, figures whose gestures and expressions communicate spiritual states rather than psychological realism. The contrast with Renaissance portraiture — which puts specific individuals in specific spaces — is the visual history of the period shift in one comparison.",
    portrait: "/images/portraits/portrait-martini-simone.jpg",
  },
  {
    id: "giotto",
    name: "Giotto di Bondone",
    dates: "c. 1267–1337",
    field: "Painter",
    units: ["00-medieval"],
    bio: "A Florentine painter whose frescoes for the Arena (Scrovegni) Chapel in Padua, painted around 1305, broke with the gold-ground tradition his contemporaries were still refining. Giotto set his scenes in believable architecture and landscape, gave his figures the bulk and weight of bodies that occupy space, and was willing to turn a figure away from the viewer to open depth behind it. Writing more than two centuries later, Vasari credited him with reviving painting after generations of what Vasari dismissed as the Greek manner — the Renaissance passing judgment on the Middle Ages, and worth reading as a verdict rather than a neutral description. The chapel was built by Enrico Scrovegni, whose father Reginaldo is traditionally identified with the Paduan usurer Dante consigned to the seventh circle of the Inferno.",
    significance: "Giotto is the hinge the Medieval-to-Renaissance transition actually turns on, and he sits inside the Medieval unit rather than after it. The Medieval Painting page uses him in Looking Forward to correct an impression the rest of the unit could easily leave: that nobody challenged the gold ground until the 1500s. Duccio, whose Maestà is a gallery piece on that page, softens the Byzantine paradigm from within — the drapery loosens, the faces warm. Giotto abandons the paradigm outright, six years earlier. The shift the Renaissance completes is a ramp that starts in the Middle Ages, not a cliff edge between two units.",
    portrait: "/images/portraits/portrait-giotto.jpg",
  },
  {
    id: "perotinus",
    name: "Pérotin",
    dates: "c. 1160–c. 1230",
    field: "Composer",
    units: ["00-medieval"],
    bio: "A composer associated with the Notre Dame school in Paris — the first major center of written polyphonic music — Pérotin expanded the two-voice organum of his predecessor Léonin into three and four simultaneous voices. Almost nothing is known of his life; his name appears in a single 13th-century treatise. His surviving works include Viderunt omnes and Sederunt principes, massive four-voice works that were revolutionary in their time.",
    significance: "Pérotin represents the birth of Western harmony: the moment when a single chant melody becomes the foundation for multiple independent voices moving simultaneously. His slow-moving tenor (the original chant) supporting faster, interweaving upper voices establishes the basic texture of Western polyphony — the template that Palestrina will refine and Bach will push to its ultimate complexity.",
    portrait: "/images/portraits/portrait-perotinus.jpg",
  },
  {
    id: "brunelleschi",
    name: "Filippo Brunelleschi",
    dates: "1377–1446",
    field: "Architect & Engineer",
    units: ["01-renaissance"],
    bio: "A goldsmith by training who became the most consequential architect of the early Renaissance. In 1401 he entered the competition to design new bronze doors for the Florence Baptistery and lost to Lorenzo Ghiberti; according to his fifteenth-century biographer he left almost immediately for Rome with Donatello, where he spent years measuring the ruins of ancient buildings. Out of that surveying came linear perspective. He is said to have demonstrated it with a small painted panel of the Baptistery, viewed through a peephole against a mirror. He later engineered the dome of Florence Cathedral, which no one had known how to build.",
    significance: "Perspective was an engineer's discovery before it was a painter's tool, and naming its inventor turns the Figure & Space thread's central claim from an assertion into an event. The 1401 competition also makes the period's origin story unexpectedly human: the losing entrant takes a consolation trip to Rome and returns with the system that will organize European painting for five hundred years. Worth noting that the peephole demonstration reaches us only through Brunelleschi's biographer Manetti, writing decades after the fact.",
    portrait: "/images/portraits/portrait-brunelleschi-filippo.jpg",
  },
  {
    id: "masaccio",
    name: "Masaccio",
    dates: "1401–1428",
    field: "Painter",
    units: ["01-renaissance"],
    bio: "Tommaso di Ser Giovanni, called Masaccio — roughly \"clumsy Tom,\" a nickname contemporaries seem to have meant affectionately, about a young man indifferent to everything except painting. Born in 1401, dead before he was twenty-seven. In that short career he painted the Brancacci Chapel frescoes and the Holy Trinity at Santa Maria Novella (c. 1427), the first painting known to use systematic linear perspective. Contemporary accounts describe the effect as something close to magic: depth where there had only been a flat wall.",
    significance: "Masaccio is where Brunelleschi's geometry becomes a painter's instrument. In the Trinity, perspective is not a setting for the subject but the subject itself — the construction converges in the body of the crucified Christ, so the mathematics and the theology arrive at the same point. Every painting on the Renaissance page postdates him by seventy years or more. He is the moment at which the thing those paintings take for granted was invented.",
    portrait: "/images/portraits/portrait-masaccio.jpg",
  },
  {
    id: "leonardo",
    name: "Leonardo da Vinci",
    dates: "1452–1519",
    field: "Painter, Engineer & Anatomist",
    units: ["01-renaissance"],
    bio: "Born near Vinci, the illegitimate son of a notary — a status that barred him from the professions and pointed him instead toward a workshop. He trained under Verrocchio in Florence, then spent seventeen years in Milan working for Ludovico Sforza as painter, military engineer, and designer of court entertainments, which is where he painted the Last Supper. He left thousands of pages of notebooks on anatomy, water, flight, and optics, almost none of it published in his lifetime, and finished very few paintings. He died in France in 1519.",
    significance: "Leonardo carries the Light & Shadow thread through sfumato, the smoky, edgeless modelling that lets the eye supply what the brush withholds. He is also half of the rivalry that personifies two Renaissance temperaments: around 1504 the Florentine government set him and Michelangelo to paint opposing battle murals in the Palazzo Vecchio, and neither was ever finished. Leonardo argued that painting was the superior art precisely because it was clean, quiet, gentlemanly work, while sculpture was dust and manual labour — an argument aimed squarely at the younger man working across the hall.",
    portrait: "/images/portraits/portrait-davinci-leonardo.jpg",
  },
  {
    id: "michelangelo",
    name: "Michelangelo Buonarroti",
    dates: "1475–1564",
    field: "Sculptor, Painter & Architect",
    units: ["01-renaissance"],
    bio: "Florentine, apprenticed to Ghirlandaio and then taken into the Medici household as a teenager. He carved the Pietà at twenty-four and began the David at twenty-six, painted the Sistine ceiling between 1508 and 1512, and was still designing the dome of St Peter's in his eighties. He considered himself a sculptor and resented painting, taking the Sistine commission in the belief that his rival Bramante had engineered it in order to make him fail. His biographer Condivi records that he worked to the point of collapse and slept in his clothes and boots.",
    significance: "Michelangelo anchors both the Body & Volume and Material & Making threads for Unit 01 — the David as the Renaissance's most concentrated image of human agency, the Pietà signature as the moment the named maker arrives. He is also the other half of the Palazzo Vecchio rivalry: commissioned around 1504 to paint a battle scene facing Leonardo's, he chose a company of soldiers surprised while bathing and scrambling for their weapons — bodies caught mid-movement, where Leonardo painted faces and horses. Even in a painting contest, he was arguing for sculpture.",
    portrait: "/images/portraits/portrait-michelangelo.jpg",
  },
  {
    id: "raphael",
    name: "Raphael",
    dates: "1483–1520",
    field: "Painter & Architect",
    units: ["01-renaissance"],
    bio: "Born Raffaello Sanzio in Urbino, Raphael came to Rome in 1508 and spent the remaining twelve years of his short life producing some of the most harmonious and technically accomplished paintings of the Renaissance. His School of Athens — depicting the great philosophers of antiquity gathered in a single idealized space — is the Renaissance's self-portrait as intellectual program. He died on his 37th birthday, possibly of exhaustion from overwork.",
    significance: "The School of Athens gathers Plato, Aristotle, Socrates, Pythagoras, and Euclid in a single architectural space — the Renaissance dream of recovering and synthesizing all ancient wisdom. The painting embodies the period's confidence that human reason, properly directed, can comprehend the whole of knowledge. The contrast with medieval manuscripts, where ancient authorities appear as texts rather than people, captures the shift in historical self-understanding.",
    portrait: "/images/portraits/portrait-raphael.jpg",
  },
  {
    id: "holbein",
    name: "Hans Holbein the Younger",
    dates: "c. 1497–1543",
    field: "Painter",
    units: ["01-renaissance"],
    bio: "Born in Augsburg and trained by his father, Holbein established himself in Basel until the Reformation there collapsed the market for religious painting. He left for England in 1526 carrying a letter of introduction from Erasmus to Thomas More, returned in 1532, and became painter to the court of Henry VIII — which is why the Tudor monarchy still looks, to us, the way Holbein saw it. He died in London in 1543, probably of plague.",
    significance: "The Ambassadors (1533) carries the Brushwork & Surface thread for Unit 01 and is the only Northern work on the Renaissance painting page. It makes two arguments at once: an oil technique so precise that silk, fur, wood, and metal are each individually convincing, and an anamorphic skull that the same technique refuses to make legible from the position the picture assigns its viewer. Holbein painted it in the hinge year of the English Reformation, which makes him the page's one direct connection to the second half of the unit's title.",
    portrait: "/images/portraits/portrait-holbein-hans.jpg",
  },
  {
    id: "vasari",
    name: "Giorgio Vasari",
    dates: "1511–1574",
    field: "Painter, Architect & Art Historian",
    units: ["01-renaissance"],
    bio: "Painter, architect, and the first art historian. His Lives of the Most Excellent Painters, Sculptors, and Architects (1550, expanded 1568) invented the artist biography as a genre and supplied most of the anecdotes still repeated about Renaissance artists five centuries later. He designed the Uffizi. Working in Florence under Medici patronage, he wrote a history in which art declines with Rome, sleeps through the Middle Ages, and is reborn — rinascita — in Tuscany.",
    significance: "Vasari is the source of much of what this site reports and also the source of several things it corrects. The word \"Renaissance\" is his. So is \"Gothic\" as an insult, and so is the marble-and-Florence-centred account of sculpture that writes the terracotta tradition out. He recurs across units, which makes him useful for the source-criticism thread: students can watch a single sixteenth-century writer shape what the twenty-first century assumes it already knows.",
    portrait: "/images/portraits/portrait-vasari-giorgio.jpg",
  },
  {
    id: "josquin",
    name: "Josquin des Prez",
    dates: "c. 1450–1521",
    field: "Composer",
    units: ["01-renaissance"],
    bio: "The most celebrated composer of the Renaissance, Josquin worked at courts and churches across Italy and France — including the Sistine Chapel choir — before retiring to his native Low Countries. Luther praised him as 'master of the notes'; his contemporaries regarded him as the first composer whose personal style was unmistakably his own. More spurious works were attributed to him than to any other composer of the era.",
    significance: "Josquin's Ave Maria...virgo serena is the Renaissance Music page's first gallery piece, demonstrating how imitative polyphony actually works: voices entering one at a time with the same melody, then regrouping into duets, trios, and full choir. He is also the point at which the composer becomes a public figure. Movable type reached music in 1501, at the height of his career, and printed partbooks carried his work across Europe faster than music had ever traveled before — making him the first composer famous on a continental scale, and speeding up the rate at which music itself changed, because now everyone could study him.",
    portrait: "/images/portraits/portrait-josquin.jpg",
  },
  {
    id: "tallis",
    name: "Thomas Tallis",
    dates: "c. 1505–1585",
    field: "Composer",
    units: ["01-renaissance"],
    bio: "An English composer who survived the entire English Reformation — serving Henry VIII, Edward VI, Mary I, and Elizabeth I in turn, navigating the shift from Catholic to Protestant worship with remarkable diplomatic skill. His Spem in Alium (c. 1570) is a motet for 40 independent voices arranged in eight choirs of five voices each — the most technically complex choral work of the Renaissance.",
    significance: "Tallis demonstrates that Renaissance polyphony reached its apex not in Rome but in England, and that the Reformation did not simply destroy the Catholic musical tradition but transformed it. His ability to compose in both Catholic and Protestant styles illustrates the period's central tension between institutional authority and individual conscience — the same tension that Luther dramatized in theology and Shakespeare in drama.",
    portrait: "/images/portraits/portrait-tallis-thomas.jpg",
  },
  {
    id: "velazquez",
    name: "Diego Velázquez",
    dates: "1599–1660",
    field: "Painter",
    units: ["02-baroque"],
    bio: "The leading painter of the Spanish Golden Age, Velázquez spent most of his career as court painter to Philip IV in Madrid, producing portraits, mythological scenes, and history paintings of extraordinary technical mastery. Las Meninas (1656) — a painting of the royal family being painted, with Velázquez himself visible in the composition — is one of the most analyzed and philosophically complex works in Western art.",
    significance: "Las Meninas raises the Baroque's central questions about representation and reality to their highest pitch: who is looking at whom, what is the painting depicting, where is the viewer positioned? The work's multiple mirrors and reflections make the act of seeing itself the subject — an epistemological puzzle that connects directly to the Baroque's anxiety about knowledge, illusion, and the limits of what we can know.",
    portrait: "/images/portraits/portrait-velazquez-diego.jpg",
  },
  {
    id: "vivaldi",
    name: "Antonio Vivaldi",
    dates: "1678–1741",
    field: "Composer & Violinist",
    units: ["02-baroque"],
    bio: "A Venetian priest known as 'the Red Priest' for his red hair, Vivaldi spent most of his career as music director at the Ospedale della Pietà — an orphanage for illegitimate or abandoned girls, whose musical ensemble became the finest in Venice. He composed over 500 concertos, including The Four Seasons, 46 operas, and sacred music in abundance. He died in poverty in Vienna, largely forgotten.",
    significance: "Vivaldi's concertos are the Baroque's democratic form: a solo voice in dialogue with the ensemble, asserting individual expression within a collective structure. The ritornello form — a recurring theme for the full orchestra, with solo episodes between — is the Baroque's answer to the individual-authority question in music: the group provides structure, the soloist provides variety and freedom, neither destroys the other.",
    portrait: "/images/portraits/portrait-vivaldi-antonio.jpg",
  },
  {
    id: "watteau",
    name: "Jean-Antoine Watteau",
    dates: "1684–1721",
    field: "Painter",
    units: ["03-enlightenment"],
    bio: "A Flemish-born painter who came to Paris and invented the fête galante — a new genre depicting elegantly dressed figures in parklike settings, playing music, conversing, and performing the rituals of courtship with a melancholy grace. He died of tuberculosis at 36, producing fewer than 200 paintings in a short career. His work was so distinctive that the Académie Royale created a new genre category just to accommodate it.",
    significance: "Watteau's fêtes galantes are the Enlightenment's social world made visible: people performing for each other, managing appearances, seeking and granting approval in the carefully choreographed theater of polite society. This is Rousseau's amour-propre given form — 'being and appearing became two entirely different things.' His figures are always slightly apart from each other, performing closeness rather than experiencing it.",
    portrait: "/images/portraits/portrait-watteau-jean.jpg",
  },
  {
    id: "boucher",
    name: "François Boucher",
    dates: "1703–1770",
    field: "Painter",
    units: ["03-enlightenment"],
    bio: "The premier painter of the French Rococo and court painter to Louis XV, Boucher produced paintings, tapestries, porcelain designs, and theater sets in prodigious quantities. A favorite of Madame de Pompadour, he painted mythological scenes, pastoral idylls, and portraits with an ornamental elegance that became the defining image of Ancien Régime French culture. Diderot criticized him savagely; posterity has been kinder.",
    significance: "Boucher's work represents the Enlightenment aristocratic ideal — decorative, pleasurable, technically brilliant, and deliberately untroubled by the period's deeper questions. His mythological paintings translate classical subjects into the language of contemporary French court life, normalizing privilege and beauty as natural conditions. The contrast with Wollstonecraft's critique of women's ornamental education is the period's central political tension made visual.",
    portrait: "/images/portraits/portrait-boucher-francois.jpg",
  },
  {
    id: "fragonard",
    name: "Jean-Honoré Fragonard",
    dates: "1732–1806",
    field: "Painter",
    units: ["03-enlightenment"],
    bio: "A student of Boucher and one of the most technically gifted painters of the Rococo, Fragonard produced work that ranges from frankly erotic commissions for aristocratic patrons to intimate genre scenes and portraits of spontaneous charm. The Swing (1767) — a noblewoman on a garden swing, her shoe flying toward her admiring suitor below — captures the period's combination of social performance and barely concealed transgression.",
    significance: "Fragonard's work embodies the Enlightenment's social world at its most playful and its most revealing. His figures are exquisitely dressed, beautifully composed, and entirely absorbed in the management of appearances — exactly the social theater that Adam Smith analyzes and Austen dramatizes. His light, pastel palette and feathery brushwork are the visual equivalent of the drawing-room comedy of manners.",
    portrait: "/images/portraits/portrait-fragonard-jean.jpg",
  },
  {
    id: "gainsborough",
    name: "Thomas Gainsborough",
    dates: "1727–1788",
    field: "Painter",
    units: ["03-enlightenment"],
    bio: "An English painter equally celebrated for portraits and landscapes, Gainsborough trained in London before establishing a fashionable portrait practice in Bath and later London, where he became a founding member of the Royal Academy. He preferred landscape painting, calling it his private pleasure, but portrait commissions from the gentry and aristocracy paid the bills — and often let him combine both, setting his sitters against the land they owned.",
    significance: "Mr and Mrs Andrews (c. 1750) fuses the Rococo's polished self-display with a distinctly English subject: the couple pose with the same practiced ease as any French sitter, but the acres of freshly harvested wheat filling half the canvas turn the portrait into a document of property as much as of persons. Gainsborough's loose, feathery brushwork softens what is, underneath, a fairly blunt assertion of land and status.",
    portrait: "/images/portraits/portrait-gainsborough-thomas.jpg",
  },
  {
    id: "kauffman",
    name: "Angelica Kauffman",
    dates: "1741–1807",
    field: "Painter",
    units: ["03-enlightenment"],
    bio: "A Swiss-born history painter who trained across Italy before settling in London, Kauffman was one of only two women among the Royal Academy's founding members in 1768 (the other being Mary Moser); neither woman is depicted actually present in Johann Zoffany's group portrait of the Academicians, since women were barred from the life-drawing sessions the painting shows. She specialized in history painting — then considered the most prestigious and most exclusively male genre — with subjects drawn from classical antiquity and English literature.",
    significance: "Cornelia, Mother of the Gracchi (c. 1785) exemplifies Neoclassicism's turn from Rococo pleasure toward moral instruction: a Roman matron, asked to display her jewels, gestures instead to her sons as her only treasures. Kauffman paints this exemplum virtutis with a decorative refinement inherited from the Rococo she is politically repudiating — proof that Neoclassical austerity and Rococo elegance are techniques, not just ideologies, and can serve opposite arguments.",
    portrait: "/images/portraits/portrait-kauffman-angelica.jpg",
  },
  {
    id: "david-jl",
    name: "Jacques-Louis David",
    dates: "1748–1825",
    field: "Painter",
    units: ["03-enlightenment"],
    bio: "The dominant French painter of the Neoclassical and revolutionary period, David trained in the history-painting tradition before becoming an active political partisan of the Revolution — he sat in the National Convention and voted for the execution of Louis XVI. He later served Napoleon as an official painter, producing the coronation and battle scenes that defined the Empire's visual propaganda, and spent his final years in exile in Brussels after Napoleon's fall.",
    significance: "The Death of Marat (1793), painted within months of the murder it depicts, converts a fellow revolutionary's assassination into a modern martyrdom: no allegory, no classical drapery, just a wound, a bare table, and a dedication signed like an epitaph. It is Neoclassicism's severe, moralizing style put directly in the service of revolutionary politics — the logical endpoint of everything Kauffman's Cornelia gestures toward, with the Rococo's decorative pleasure stripped away entirely.",
    portrait: "/images/portraits/portrait-david-jacques-louis.jpg",
  },
  {
    id: "haydn",
    name: "Joseph Haydn",
    dates: "1732–1809",
    field: "Composer",
    units: ["03-enlightenment"],
    bio: "An Austrian composer who spent nearly three decades in the service of the Esterházy family at their palace in rural Hungary — formally a uniformed household servant, and by every account content in the role — Haydn worked in productive isolation that he credited with forcing him to be original. He composed 104 symphonies, 68 string quartets, and a vast body of other works, essentially inventing the modern symphony and string quartet as coherent forms. His late London symphonies, composed in his sixties after he had finally traveled beyond the Esterházy estate, made him an international celebrity.",
    significance: "Haydn is the Enlightenment Music page's second voice and its counterweight to Mozart. His \"Surprise\" Symphony — a gentle, predictable melody suddenly interrupted by a fortissimo chord — demonstrates Classical formal intelligence: the joke works because the form creates precise expectations the composer can then subvert. The page draws a direct parallel to Austen: \"The composer plays with the listener's expectations within the same formal framework that Austen manipulates at every level of structure in her novels.\" The Op. 33 quartets, which he described as written in an entirely new and special way, show the other face of that intelligence — four instruments trading material as equals rather than one melody with three accompanists. He is also the page's social counter-example: where Mozart went freelance, Haydn stayed in livery and was happy there. Haydn the court servant, Mozart the freelancer, and Beethoven the individualist answerable to nobody make a three-stage arc of what a composer was permitted to be.",
    portrait: "/images/portraits/portrait-haydn-joseph.jpg",
  },
  {
    id: "friedrich",
    name: "Caspar David Friedrich",
    dates: "1774–1840",
    field: "Painter",
    units: ["04-romanticism"],
    bio: "A German Romantic painter who spent most of his career in Dresden, Friedrich specialized in landscapes of extraordinary atmospheric intensity — lone figures contemplating vast mountain ranges, misty seas, or ruined abbeys under dramatic skies. His Wanderer above the Sea of Fog (c. 1818) — a solitary figure standing on a rocky peak, his back to the viewer, gazing out over cloud-filled valleys — is the defining image of the Romantic individual.",
    significance: "Friedrich's Wanderer is the Romantic sublime in concentrated form: the solitary self confronting a nature so vast and unknowable that ordinary perception dissolves. The figure's back-turned posture invites the viewer to occupy his position — to experience the sublime vicariously, which is the Romantic artwork's primary function. His landscapes connect directly to Emerson's transparent eyeball and Turner's vortices of light.",
    portrait: "/images/portraits/portrait-friedrich-caspar.jpg",
  },
  {
    id: "delacroix",
    name: "Eugène Delacroix",
    dates: "1798–1863",
    field: "Painter",
    units: ["04-romanticism"],
    bio: "The leader of the French Romantic school, Delacroix was celebrated for his vivid color, dynamic composition, and emotional intensity — a direct challenge to the cool, linear neoclassicism of his rival Ingres. His Liberty Leading the People (1830), painted in response to the July Revolution, depicts an allegorical woman bearing the tricolor over a barricade strewn with corpses — one of the 19th century's most powerful images of political passion.",
    significance: "Delacroix's Liberty connects the Romantic visual tradition to the political upheavals that define the period. His compositional energy — figures surging diagonally from lower right to upper left, color deployed for emotional rather than decorative effect — is the visual equivalent of Beethoven's Fifth: feeling overflowing inherited formal constraints. His work illustrates how the Romantic period transforms political engagement into aesthetic experience.",
    portrait: "/images/portraits/portrait-delacroix-eugene.jpg",
  },
  {
    id: "gericault",
    name: "Théodore Géricault",
    dates: "1791–1824",
    field: "Painter",
    units: ["04-romanticism"],
    bio: "A French painter who died at 32 from complications of a riding accident, Géricault lived intensely and briefly. His Raft of the Medusa (1818–19) — a monumental painting depicting survivors of a real shipwreck, adrift and dying on a makeshift raft — caused a scandal at the Salon for its refusal of heroic convention and its unflinching depiction of suffering, desperation, and death. He interviewed survivors and studied corpses to get the details right.",
    significance: "The Raft of the Medusa brought contemporary political scandal into the monumental scale previously reserved for classical history painting. Géricault refused to aestheticize suffering — the bodies on the raft are dying, not posing — and this insistence on truth over beauty is the Romantic artist's political act. The connection to Melville's ocean, where bodies actually disappear beneath the waves, is direct.",
    portrait: "/images/portraits/portrait-gericault-theodore.jpg",
  },
  {
    id: "bonheur",
    name: "Rosa Bonheur",
    dates: "1822–1899",
    field: "Painter",
    units: ["04-romanticism"],
    bio: "Trained by her father after being expelled from a series of schools, Bonheur spent her working life painting animals and studying them at markets, farms, and slaughterhouses. She held a police permit allowing her to wear trousers, renewed every six months, on the grounds that skirts were impractical for the places her work required. The Horse Fair made her internationally famous, toured Britain and America to enormous crowds, and was eventually bought for the Metropolitan Museum. She was the first woman awarded the Grand Cross of the Légion d'honneur, and lived openly with her partner Nathalie Micas for over forty years.",
    significance: "Bonheur locates the Romantic sublime in animal power rather than landscape. The horses in The Horse Fair generate the same overwhelming force as Turner's storms and Friedrich's fog, but concentrated into muscle and mass, with men visibly failing to control it — which is the whale hunt in Moby-Dick rendered on land. She also marks the seam where Romanticism hardens into Realism: the sensibility is Romantic, the observation is exact, and the combination is what the second half of the century does with the first half's ambitions.",
    portrait: "/images/portraits/portrait-bonheur-rosa.jpg",
  },
  {
    id: "debussy",
    name: "Claude Debussy",
    dates: "1862–1918",
    field: "Composer",
    units: ["05-modernism"],
    bio: "A French composer who studied at the Paris Conservatoire and developed a radically new musical language influenced by Symbolist poetry, Impressionist painting, and the gamelan music he heard at the 1889 Paris Exposition. He rejected the German symphonic tradition and the dense developmental logic of Brahms and Wagner in favor of atmosphere, color, and a static, shimmering harmonic language. He died of rectal cancer during the German bombardment of Paris in 1918.",
    significance: "Debussy is the Modernism Music page's foundational figure. He treated the orchestra as a chamber ensemble of individual voices, raised timbre from surface color to a structural element, and established tonality by assertion rather than by harmonic function — innovations Stravinsky inherited and transformed. What Debussy did for timbre, Stravinsky did for rhythm. La Mer (1905) is Romantic in feeling and Modernist in method: it evokes the sea not by depicting it but by building a shimmering field in which no single line leads.",
    portrait: "/images/portraits/portrait-debussy-claude.jpg",
  },
  {
    id: "manet",
    name: "Édouard Manet",
    dates: "1832–1883",
    field: "Painter",
    units: ["05-modernism"],
    bio: "A French painter who is considered the bridge between Realism and Impressionism, Manet scandalized the Paris Salon with works that combined modern subjects with techniques that challenged academic painting conventions. His Olympia (1863) — a nude staring directly at the viewer with frank, unapologetic defiance — was compared to a playing card for its flat handling of paint. He spent his career fighting for recognition from the establishment he was simultaneously undermining.",
    significance: "Manet's Bar at the Folies-Bergère presents the central Modernist visual puzzle: a barmaid whose reflection in the mirror behind her doesn't match her position, creating a spatial impossibility. The viewer cannot occupy a single coherent position relative to the scene. This is the visual equivalent of Picasso's multiple simultaneous viewpoints — the coherent perspective that organized Western painting since the Renaissance begins to crack.",
    portrait: "/images/portraits/portrait-manet-edouard.jpg",
  },
  {
    id: "matisse",
    name: "Henri Matisse",
    dates: "1869–1954",
    field: "Painter & Sculptor",
    units: ["05-modernism"],
    bio: "A French painter who began as a law clerk and became, along with Picasso, one of the defining figures of 20th-century art. His Fauvist period — using non-naturalistic color with explosive freedom — shocked Paris in 1905; his later work, including the cut-paper collages made when arthritis prevented him from painting, achieved a serenity that belied the period's violence. He and Picasso were rivals, admirers, and the two poles of Modernist painting.",
    significance: "Where Picasso's Cubism fragments and analyzes, Matisse's work simplifies and intensifies — color freed from its descriptive function to carry pure emotional weight. His Dance (1910) reduces human figures to silhouettes of pure rhythm. This is the other face of Modernist rupture: not the anxiety of fragmentation but the liberation of form from representation, allowing painting to pursue feeling directly.",
    portrait: "/images/portraits/portrait-matisse-henri.jpg",
  },
  {
    id: "kandinsky",
    name: "Wassily Kandinsky",
    dates: "1866–1944",
    field: "Painter & Art Theorist",
    units: ["05-modernism"],
    bio: "A Russian painter who abandoned a promising legal career at 30 to study painting in Munich, Kandinsky is generally credited as the first painter to produce purely abstract works — compositions in which color and form refer to nothing in the visible world. His Composition VII (1913) was painted in a single day after months of preparatory studies. He taught at the Bauhaus until the Nazis closed it in 1933, then fled to Paris.",
    significance: "Kandinsky's abstraction is the visual equivalent of Schoenberg's twelve-tone method: the inherited system of representation is abandoned entirely. Just as Schoenberg freed music from tonal hierarchy, Kandinsky freed painting from the requirement to depict the visible world. His theoretical writings argued that color and form could speak directly to the soul — bypassing representation and addressing emotion without mediation.",
    portrait: "/images/portraits/portrait-kandinsky-wassily.jpg",
  },
  {
    id: "caravaggio",
    name: "Caravaggio",
    dates: "1571–1610",
    field: "Painter",
    units: ["02-baroque"],
    bio: "Born Michelangelo Merisi in Milan, Caravaggio came to Rome as a young man and transformed European painting through his radical use of chiaroscuro — extreme contrasts of light and shadow. He was also violent, unstable, and twice accused of murder; he spent his final years as a fugitive, continuing to paint. He died at 38, possibly of malaria or poisoning, with a papal pardon reportedly on its way.",
    significance: "Caravaggio's chiaroscuro is the visual equivalent of the Baroque's intellectual project: extremes in dramatic opposition, ordinary figures treated with monumental gravity, sacred subjects rendered with physical immediacy. His influence on Rembrandt, Rubens, and Velázquez — and on every dramatic use of light and shadow since — is incalculable.",
    portrait: "/images/portraits/portrait-caravaggio.jpg",
  },
  {
    id: "artemisia",
    name: "Artemisia Gentileschi",
    dates: "1593–1656",
    field: "Painter",
    units: ["02-baroque"],
    bio: "Trained in her father Orazio's Roman workshop, Gentileschi became the first woman admitted to Florence's Accademia del Disegno and built an international career that took her from Rome to Florence, Venice, and eventually London, painting for the Medici, the Barberini, and other major patrons. She specialized in scenes of biblical and mythological women — Judith, Susanna, Cleopatra — rendered with a physical directness rare among her contemporaries. Her Judith Slaying Holofernes, of which she painted at least two versions, is now considered one of the defining images of Italian Baroque painting.",
    significance: "Gentileschi absorbed Caravaggio's tenebrism directly — the same extreme contrasts of light and dark, the same refusal to soften violence with decorum — and turned it on female protagonists who act rather than merely appear. Where much Baroque painting stages women as objects to be looked at, her Judith is the one gripping the sword. She extends the period's larger argument that ordinary bodies, seen in extremity, can carry the weight of sacred and heroic subjects.",
  },
  {
    id: "rembrandt",
    name: "Rembrandt van Rijn",
    dates: "1606–1669",
    field: "Painter & Printmaker",
    units: ["02-baroque"],
    bio: "The greatest Dutch painter of the Golden Age, Rembrandt produced over 300 paintings, 300 etchings, and 2,000 drawings across a career that traced a remarkable arc from early fame and prosperity to financial ruin and personal loss. His late self-portraits — among the most psychologically penetrating works in the history of art — were painted after his bankruptcy, the death of his wife, and the death of his son.",
    significance: "Rembrandt's use of light — not Caravaggio's theatrical spotlight but a warmer, more diffused illumination that seems to come from within the figure — creates an effect of extraordinary psychological depth. His late work embodies Pascal's insight that human dignity consists precisely in consciousness of one's own fragility.",
    portrait: "/images/portraits/portrait-rembrandt.jpg",
  },
  {
    id: "vermeer",
    name: "Johannes Vermeer",
    dates: "1632–1675",
    field: "Painter",
    units: ["02-baroque"],
    bio: "A Delft painter who worked slowly and left fewer than forty known paintings, Vermeer supported his large family partly through his father's inn and art-dealing business while producing a small body of interior scenes prized for their luminous, almost photographic clarity. He rarely left Delft, and his reputation was largely forgotten for two centuries until 19th-century critics rediscovered him.",
    significance: "Vermeer represents the Baroque's other pole from Caravaggio and Rembrandt: rather than thick impasto or theatrical shadow, he builds surfaces of near-invisible, glassy smoothness, using light not to dramatize but to describe — the exact fall of daylight across a wall, a sleeve, a face. His quiet Protestant interiors are the visual counterpart to the period's Southern Catholic theatricality, proof that Baroque light could serve contemplation as easily as spectacle.",
  },
  {
    id: "turner",
    name: "J.M.W. Turner",
    dates: "1775–1851",
    field: "Painter",
    units: ["04-romanticism"],
    bio: "The son of a London barber, Turner began exhibiting at the Royal Academy at 15 and became the most celebrated British painter of the 19th century. His late works — in which ships, storms, and sunsets dissolve into swirling vortices of light and color — were so radical that contemporaries sometimes struggled to identify the subject. He lived secretly under a false name in a Chelsea boarding house for the last years of his life.",
    significance: "Turner is the visual equivalent of the Romantic sublime: nature not as ordered landscape but as overwhelming, terrifying, beautiful force that dwarfs and potentially annihilates the human figure within it. His late paintings of storms and shipwrecks map directly onto Melville's ocean — the encounter with what exceeds comprehension.",
    portrait: "/images/portraits/portrait-turner-jmw.jpg",
  },
  {
    id: "picasso",
    name: "Pablo Picasso",
    dates: "1881–1973",
    field: "Painter & Sculptor",
    units: ["05-modernism"],
    bio: "Born in Málaga, Spain, Picasso came to Paris in 1900 and co-invented Cubism with Georges Braque — shattering the coherent picture plane and representing objects from multiple simultaneous viewpoints. He produced an estimated 20,000 works across painting, sculpture, ceramics, and printmaking. Guernica (1937), painted in response to the Nazi bombing of a Basque town, is the 20th century's greatest political artwork.",
    significance: "Cubism is the visual equivalent of Modernist fragmentation: the unified perspective that had organized Western painting since the Renaissance is broken apart, replaced by multiple simultaneous viewpoints that cannot be reconciled into a single coherent image. This is what the Modernist unconscious looks like — the self no longer a unified subject but a collection of angles that refuse to cohere.",
    portrait: "/images/portraits/portrait-picasso-pablo.jpg",
  },
  {
    id: "cezanne",
    name: "Paul Cézanne",
    dates: "1839–1906",
    field: "Painter",
    units: ["05-modernism"],
    bio: "Born in Aix-en-Provence to a wealthy banking family, Cézanne largely rejected Impressionism's interest in fleeting atmospheric effect in favor of a search for underlying structure — famously aiming to \"treat nature by the cylinder, the sphere, the cone.\" He painted the mountain near his home, Mont Sainte-Victoire, dozens of times over the last decade of his life, reworking the same view as a problem rather than a subject. He lived and worked largely in isolation, exhibited rarely, and died having sold relatively little; a major retrospective of his work in Paris in 1907, the year after his death, reshaped an entire generation of younger painters who saw it.",
    significance: "Cézanne is the hinge the unit's own Figure & Space argument depends on. His late paintings replace a single fixed viewpoint with planes of color seen from several angles at once — the technical root of Cubism, which Picasso and Braque built directly out of his example after the 1907 retrospective. Without Cézanne's prior fracturing of form, Picasso's Demoiselles reads as an arrival with no departure point.",
  },
  {
    id: "vangogh",
    name: "Vincent van Gogh",
    dates: "1853–1890",
    field: "Painter",
    units: ["05-modernism"],
    bio: "A Dutch painter who took up art seriously only in his late twenties, after failed careers as an art dealer and a lay preacher, Van Gogh produced almost his entire body of work in a single decade before his death by suicide at thirty-seven. He sold only one painting in his lifetime. The Starry Night was painted from memory and imagination while he was a voluntary patient at an asylum in Saint-Rémy-de-Provence, recovering from a breakdown. His brother Theo, an art dealer, supported him financially and emotionally throughout, and their surviving correspondence is one of the richest first-person records of any painter's working mind.",
    significance: "Van Gogh's brushwork is visible, directional, and emotionally charged rather than descriptive — paint used to record feeling rather than optical fact, which is the psychological root of both Expressionism and, later, Abstract Expressionism. He supplies the unit's Brushwork & Surface thread its clearest precedent: the moment the painted mark stops hiding behind the image and starts declaring itself.",
  },
  {
    id: "afklint",
    name: "Hilma af Klint",
    dates: "1862–1944",
    field: "Painter",
    units: ["05-modernism"],
    bio: "A Swedish painter trained at the Royal Academy of Fine Arts in Stockholm, af Klint began producing fully non-objective, abstract paintings as early as 1906 as part of a spiritualist and Theosophical practice conducted with a small circle of women who believed themselves in contact with higher consciousness through automatic drawing. She painted more than a thousand such works over her lifetime but showed almost none of them publicly, and her will stipulated that the paintings not be exhibited until twenty years after her death. They remained little known even after that, only entering wider art-historical recognition and major museum exhibitions decades later.",
    significance: "Af Klint painted fully abstract compositions several years before Kandinsky's first non-representational work, complicating any account of abstraction that treats Kandinsky as its origin point. Her practice reframes what abstraction is for: not a formal experiment but an attempt to depict a reality she believed ordinary sight could not reach — a claim the unit's Light & Shadow thread already makes about Kandinsky, now shown to have an earlier and independent source.",
  },
  {
    id: "braque",
    name: "Georges Braque",
    dates: "1882–1963",
    field: "Painter",
    units: ["05-modernism"],
    bio: "A French painter who developed Cubism alongside Picasso between roughly 1908 and 1914, working so closely with him during this period that the two used private nicknames for each other, \"Wilbur and Orville,\" after the Wright brothers — each seeing the other's fracturing of pictorial space as the artistic equivalent of inventing powered flight. Braque's early Cubist landscapes at L'Estaque, built from faceted planes derived from Cézanne, were foundational to the style's development. He served and was wounded in the First World War, after which his and Picasso's paths diverged.",
    significance: "Braque supplies the second half of a partnership the site's own Figure & Space thread already names but does not individually source. His L'Estaque landscapes are the direct bridge between Cézanne's late fracturing of form and the fully developed Cubism of Les Demoiselles and after.",
  },
  {
    id: "monet",
    name: "Claude Monet",
    dates: "1840–1926",
    field: "Painter",
    units: ["05-modernism"],
    bio: "The central figure of French Impressionism, whose Impression, Sunrise gave the movement its name after a hostile critic used the word as an insult. Monet spent the winter of 1870–71 in London, where he saw Turner's late paintings, though he played down the debt in later life. From 1883 he lived at Giverny, northwest of Paris, where he built the water garden that became his only subject for the last thirty years of his life. He painted the grandes décorations — some forty large panels, including the MoMA triptych — from 1914 until his death, working through cataracts and within earshot of the Western Front, and pledged the cycle to France the day after the 1918 Armistice as a monument to peace.",
    significance: "Monet's late water lilies are the site's clearest case of recognition arriving late and from an unexpected direction. Dismissed for roughly two decades after his death as decorative and out of step, they were re-canonized in the 1950s when the scale and allover composition of Abstract Expressionism made them suddenly legible — MoMA became the first American museum to acquire one. The work did not change; the frame for seeing it did. That is the structure of Brancusi's customs case, of Hilma af Klint's posthumous rediscovery, and of Invisible Man itself.",
  },
  {
    id: "pollock",
    name: "Jackson Pollock",
    dates: "1912–1956",
    field: "Painter",
    units: ["05-modernism"],
    bio: "An American painter who developed his signature drip technique in the late 1940s, laying raw canvas on the floor of his Long Island barn and pouring, flinging, and dripping paint onto it from above rather than applying it with a brush to an upright surface. The resulting all-over compositions — Number 1A, 1948 and Autumn Rhythm among them — abandoned figure, ground, and a fixed vantage point entirely, replacing them with the record of the artist's own movement around the canvas. He died in a car accident at 44, already the most famous painter in America.",
    significance: "Pollock is named on the Modernism painting page's Brushwork & Surface thread as the endpoint of its argument — the artist's gesture as the work's primary content — and is cited again in the Water Lilies analysis panel as the reason Monet's dismissed late panels became legible: Abstract Expressionism's scale and all-over composition retrained the eye that later saw Monet clearly.",
  },
  {
    id: "mondrian",
    name: "Piet Mondrian",
    dates: "1872–1944",
    field: "Painter",
    units: ["05-modernism"],
    bio: "A Dutch painter who arrived at total abstraction gradually, reducing landscapes and trees over successive canvases to horizontal and vertical lines before abandoning representation altogether. Working within the De Stijl movement and his own theory of Neoplasticism, he restricted his mature paintings to black grid lines and flat blocks of white, gray, and the three primary colors — a vocabulary he considered universal rather than personal. He emigrated to New York in 1940, where the city's rhythm entered his final works before his death in 1944.",
    significance: "Mondrian's grid paintings are named on the Modernism painting page's Light & Shadow thread as one of two examples — alongside Rothko — of light produced by color relationships on the canvas rather than depicted from an external source, the thread's clearest statement of Modernist painting generating its own luminosity.",
  },
  {
    id: "rothko",
    name: "Mark Rothko",
    dates: "1903–1970",
    field: "Painter",
    units: ["05-modernism"],
    bio: "A Latvian-born American painter who arrived at his mature style around 1949: large canvases holding two or three soft-edged rectangles of color, stacked and hovering against a colored ground. He intended the scale and the color relationships to produce a direct, overwhelming emotional and near-religious experience in the viewer standing close to the canvas, not a formal exercise in color theory. The Rothko Chapel in Houston, completed shortly before his death by suicide in 1970, is the fullest realization of that ambition.",
    significance: "Rothko's color fields are named alongside Mondrian's grids on the Modernism painting page's Light & Shadow thread as an example of light produced by the interaction of colors on the canvas rather than depicted from a lighting source — the thread's argument that painting's luminosity becomes self-generated rather than borrowed from the visible world.",
  },
  // ── COMPOSERS ─────────────────────────────────────────────────────────────
  {
    id: "hildegard",
    name: "Hildegard of Bingen",
    dates: "1098–1179",
    field: "Abbess, Composer, Mystic & Polymath",
    units: ["00-medieval"],
    bio: "A German abbess who entered monastic life at age 8 and experienced visions throughout her life, Hildegard was one of the most remarkable figures of the twelfth century. She composed an extensive body of sacred music (the largest surviving body of plainchant attributed to a single composer), wrote on natural history and medicine, corresponded with popes and emperors, preached publicly across Germany, and produced the Scivias, a record of her visions. She was posthumously declared a Doctor of the Church in 2012.",
    significance: "Hildegard is named in the Medieval Historical Moment and appears in the philosophy page as an example of the intellectual richness within Medieval culture. Her music represents the most sophisticated individual compositional voice within the plainchant tradition, demonstrating that the Medieval aesthetic of communal anonymity coexisted with genuine individual artistry. Her visions also model the Medieval epistemological claim that the deepest truths arrive through divine revelation rather than rational inquiry.",
  },
  {
    id: "machaut",
    name: "Guillaume de Machaut",
    dates: "c. 1300–1377",
    field: "Composer & Poet",
    units: ["00-medieval"],
    bio: "The dominant musical and literary figure of fourteenth-century France, and the last of the great medieval poet-composers. Machaut served as secretary to John of Luxembourg, King of Bohemia, and later held a canonry at Reims, where he spent his final decades supervising the copying of his own complete works — an act of authorial self-curation with almost no precedent in the period. He wrote in nearly every form available to him, sacred and secular, and his Messe de Nostre Dame is the earliest complete setting of the Mass ordinary attributable to a single named composer.",
    significance: "Machaut supplies medieval music's missing second pole: not the serene, anonymous chant tradition of the centuries before 1200, but the fractured, secular, intellectually extreme art of an age reshaped by plague, papal schism, and unending war. His isorhythmic motets layer independent texts over a hidden rhythmic scaffold of formidable complexity, which reframes medieval music as structurally extreme rather than primitive. On the Renaissance Music page, he is the reason polyphony cannot be called a Renaissance invention — Machaut built motets of real complexity two centuries before Palestrina, though his lowest voice still served as a scaffold for the others rather than an equal partner.",
  },
  {
    id: "palestrina",
    name: "Giovanni Pierluigi da Palestrina",
    dates: "c. 1525–1594",
    field: "Composer",
    units: ["01-renaissance"],
    bio: "The most celebrated composer of Renaissance polyphony, Palestrina spent most of his career at various Roman churches including St. Peter's Basilica. His music was held up as the model of correct Catholic sacred style after the Council of Trent — serene, balanced, and controlled. He is the only Renaissance composer to have a legendary narrative attached to his name: the probably false but enduring story that his Missa Papae Marcelli saved polyphony from being banned by the Church.",
    significance: "Palestrina's Sicut Cervus is the Renaissance Music page's featured work and the period's demonstration of polyphony under control: four independent voices, none of them dominant, every dissonance prepared and resolved. His historical importance is narrower and sharper than 'balance.' The Council of Trent had objected that church polyphony buried the words it was setting; Palestrina's technique — moving one voice onto a new syllable while the others hold open vowels — proved that full polyphony could keep a text intelligible. He became the model later centuries taught from, which is why counterpoint is still learned in his style today. As the musicologist Donald Grout observed, no composer before Bach would be as well known by name.",
    portrait: "/images/portraits/portrait-palestrina.jpg",
  },
  {
    id: "casulana",
    name: "Maddalena Casulana",
    dates: "c. 1544–c. 1590",
    field: "Composer, Singer & Lutenist",
    units: ["01-renaissance"],
    bio: "An Italian madrigalist, singer, and lutenist, probably born near Siena and educated in Florence. In 1568 she published Il primo libro de madrigali a quattro voci in Venice — the first entire book of music by a woman to be printed and published in the history of Western music. She worked across northern Italy and traveled as far as the imperial court at Vienna; Orlande de Lassus, the most celebrated composer of the age, conducted a work of hers at a ducal wedding in Munich. Sixty-six of her madrigals survive, seventeen of them recovered only in 2022, when a partbook looted during the Second World War was identified in a Moscow library.",
    significance: "Casulana answers a question the sacred repertoire on the Renaissance Music page cannot: who was permitted to compose. The madrigal was secular, printed, and commercially circulated, which made it the one corner of Renaissance music where an outsider could publish under her own name. Her dedication to Isabella de' Medici names the target directly — she means to show the world 'the vain error of men' who believed they alone possessed the gifts of intellect. Written in 1568, it belongs beside Pico on human self-creation and Luther on private conscience: the Renaissance claim that a person may define what they are, made by someone the period did not expect to make it.",
  },
  {
    id: "gesualdo",
    name: "Carlo Gesualdo",
    dates: "c. 1566–1613",
    field: "Composer & Prince of Venosa",
    units: ["01-renaissance"],
    bio: "An Italian nobleman and madrigalist who inherited the principality of Venosa. Independently wealthy and answerable to no patron and no paying audience, he wrote exactly as he pleased, producing chromatic harmony more unstable than anything else composed for the next three hundred years. In 1590 he discovered his first wife's affair and had her and her lover killed; as a nobleman he was never prosecuted. His most radical music dates from the years afterward.",
    significance: "Gesualdo is named on the Renaissance Music page to mark the limit of the period's rules. The page's account of dissonance — prepared, brief, promptly resolved — is accurate for the sacred mainstream and not for the secular edge, where composers pushed harmony toward incoherence in pursuit of a text's meaning. His independence is as much the point as his harmony: freedom from having to please a patron produced music that pleased almost nobody for three centuries, and then sounded prophetic.",
  },
  {
    id: "weelkes",
    name: "Thomas Weelkes",
    dates: "c. 1576–1623",
    field: "Composer & Organist",
    units: ["01-renaissance"],
    bio: "An English madrigalist and cathedral organist who spent most of his career at Chichester Cathedral, where his musical gifts were eventually outweighed, in his employers' judgment, by his drinking. His madrigals are the most harmonically inventive of the English school. 'As Vesta Was from Latmos Hill Descending' was written for The Triumphs of Oriana, a collection published in 1601 in which twenty-five composers each honored Elizabeth I with a madrigal ending on the same refrain.",
    significance: "Weelkes gives the Renaissance Music page word painting a student can hear without a translation. In 'As Vesta,' descending lines descend and ascending lines ascend, 'two by two' is sung by two voices and 'three by three' by three, 'all alone' is left to a single voice, and 'long live fair Oriana' is held long. It is the period's humanist conviction about words made mechanically audible. It is also the bridge to the Baroque: Purcell will use the same device on Dido's descending lament, but to make a listener feel one specific person's grief rather than a general idea of sorrow.",
  },
  {
    id: "purcell",
    name: "Henry Purcell",
    dates: "1659–1695",
    field: "Composer",
    units: ["02-baroque"],
    bio: "The greatest English composer of the Baroque period and one of the greatest in the history of English music, Purcell served as organist at Westminster Abbey and composed prolifically for court, church, theater, and private entertainment. He died at 36, possibly from a chill contracted after being locked out of his own house by his wife. His opera Dido and Aeneas, written for a girls' school in Chelsea around 1689, contains some of the most beautiful music of the entire Baroque period.",
    significance: "Purcell's 'Dido's Lament' is a gallery piece on the Baroque Music page, and the What to Listen For section calls it 'one of the most beautiful short works in the entire Western canon.' The lament demonstrates the passacaglia principle: a short, chromatically descending bass line that repeats eleven times beneath the vocal melody, 'unwavering as fate,' while Dido's line chafes against it in harmonic dissonances that 'produce an ache that has moved audiences for three hundred years.' It represents the Baroque's emotional extremity at its most concentrated.",
  },
  {
    id: "bach",
    name: "Johann Sebastian Bach",
    dates: "1685–1750",
    field: "Composer",
    units: ["02-baroque"],
    bio: "Born in Eisenach into a dynasty of musicians, Bach spent his career as a court musician and church organist in various German cities, working in relative obscurity. He had 20 children (7 survived him), wrote around 1,100 known works, and was largely forgotten after his death until Mendelssohn revived the St. Matthew Passion in 1829. He never traveled far from central Germany, never met Handel, and probably never heard most of his own major works performed well.",
    significance: "Bach's standing is history's verdict rather than his own century's. Leipzig hired him in 1723 only after Telemann, Graupner, and Fasch had each turned the post down; he was known in his lifetime chiefly as an organist, and his own sons found his continued devotion to the fugue embarrassingly old-fashioned. What later listeners heard, and his contemporaries largely did not, is what separates him from the period's other masters of craft. Most Baroque music sets out to represent extreme feeling in a general, catalogued way. Bach's delivers those exalted states and seems at the same time to let you hear one particular person's faith — the structure fully analyzable, the feeling surviving the analysis intact.",
    portrait: "/images/portraits/portrait-bach-johann.jpg",
  },
  {
    id: "handel",
    name: "George Frideric Handel",
    dates: "1685–1759",
    field: "Composer",
    units: ["02-baroque"],
    bio: "Born the same year as Bach in Halle, Germany, Handel became the foremost opera composer in Europe before shifting, after a series of commercial failures, to the oratorio form. Messiah (1741) was composed in a legendary 24 days of sustained inspiration and premiered in Dublin to immediate acclaim. The Dublin choir was drawn from the city's two cathedral choirs, one of them St Patrick's, whose dean was Jonathan Swift — by then elderly and irascible, and briefly minded to forbid his singers from performing with what he called a \"club of fiddlers in Fishamble Street.\" He spent most of his adult life in London, became a British citizen, and died one of the most celebrated musicians in Europe.",
    significance: "Where Bach's music rewards solitary study and careful listening, Handel's Messiah is designed for public experience — monumental, dramatic, emotionally overwhelming. The Hallelujah Chorus is the Baroque's democratic sublime: its audience famously rises to its feet and has never quite sat down again.",
    portrait: "/images/portraits/portrait-handel-george.jpg",
  },
  {
    id: "monteverdi",
    name: "Claudio Monteverdi",
    dates: "1567–1643",
    field: "Composer",
    units: ["02-baroque"],
    bio: "The pivotal figure between the Renaissance and the Baroque, and the composer who turned opera from an experiment into an art. Monteverdi spent his early career at the Gonzaga court in Mantua and his last thirty years as director of music at St Mark's in Venice. He was a great madrigalist before he was anything else, and he defended his increasingly free handling of dissonance as a seconda pratica — a second practice in which the words command the music rather than the reverse. L'Orfeo was first performed at Mantua in February 1607, while Shakespeare was still writing for the King's Men.",
    significance: "Monteverdi supplies the invention the rest of the Baroque runs on. Opera was not stumbled into: the Florentine and Mantuan academies set out deliberately to recover what they believed ancient Greek tragedy had done to its audiences, on the theory that its characters had sung rather than spoken. That makes opera the Renaissance humanist project completing itself in music — the same recovery of antiquity the Renaissance painting and sculpture pages describe, arriving a century later in sound. Everything downstream on the Baroque Music page, Purcell's Dido included, descends from what Monteverdi worked out at Mantua.",
  },
  {
    id: "strozzi",
    name: "Barbara Strozzi",
    dates: "1619–1677",
    field: "Composer & Singer",
    units: ["02-baroque"],
    bio: "A Venetian singer and composer, almost certainly the illegitimate daughter of the poet and librettist Giulio Strozzi, who raised her in his household, arranged her composition lessons with Francesco Cavalli, and founded an academy over which she presided. Between 1644 and 1664 she published eight volumes of her own music and put more secular vocal music into print than any other composer of her generation — without a church post, without steady noble patronage, and without ever writing for the stage, which was effectively closed to women. Almost all of it is for solo soprano. She was writing for herself to sing.",
    significance: "Strozzi is the Baroque Music page's private pole. Purcell's Dido laments in a theatre and Handel's chorus fills a hall; Strozzi's laments were written for a room, a small audience of connoisseurs, and her own voice. The preface to her first volume registers what publishing cost a woman in 1644 — she goes ahead knowing that \"swords of slander\" are already drawn against the book. Men who found a self-supporting woman composer difficult to explain circulated the rumour that she was a courtesan. She supported herself instead by selling printed music: the same technology that had made Josquin famous a century and a half earlier, now making a career possible for someone no institution would employ.",
  },
  {
    id: "mozart",
    name: "Wolfgang Amadeus Mozart",
    dates: "1756–1791",
    field: "Composer",
    units: ["03-enlightenment"],
    bio: "Born in Salzburg to a court musician who recognized and aggressively cultivated his children's gifts, Mozart toured Europe as a child prodigy alongside his older sister Nannerl, a keyboard player of comparable early promise. In 1781 he broke with his employer, the Archbishop of Salzburg, and was shown the door by the archbishop's steward with a literal kick — after which he supported himself in Vienna as an independent freelance composer, at a time when a musician's security meant attaching himself to a patron. He found fame there and never financial stability, and died at 35, leaving the Requiem unfinished. Two legends that reach most students through the film Amadeus are false: he was not poisoned by Salieri, a story that surfaced decades afterward from Salieri himself while confined in an asylum, and he was not flung into a pauper's pit but buried in a common grave, the ordinary Viennese practice of the day. He composed over 600 works and improved every form he touched.",
    significance: "Mozart is the Enlightenment Music page's central figure and the course's sonic equivalent of Austen: wit, clarity, formal control, real depth delivered inside elegant structure. Four of the page's works are his, chosen to show one style doing very different jobs — textbook sonata form in Eine kleine Nachtmusik, the individual-in-society of the K. 467 Andante, the comedy of manners in Figaro, and the G minor symphony, where the same materials and the same procedures produce agitation instead of charm. His break from patronage is what makes him the era's emblem rather than only its greatest talent: the individual asserting independence from inherited hierarchy is the Enlightenment's central story, and Mozart lived it.",
    portrait: "/images/portraits/portrait-mozart-wolfgang.jpg",
  },
  {
    id: "martines",
    name: "Marianna Martines",
    dates: "1744–1812",
    field: "Composer, Singer & Keyboardist",
    units: ["03-enlightenment"],
    bio: "A Viennese composer, singer, and keyboard player who grew up in the Altes Michaelerhaus on the Michaelerplatz — a building whose floors ran in order of social rank, with a dowager princess of the Esterházy family on the lowest floor, the Martines family on the third, and a struggling young Joseph Haydn in a cold attic room at the top. The poet Metastasio, who lodged with her family, arranged for Haydn to teach her keyboard from the age of seven. She never married and never held a court post, which would have been thought unseemly for a woman of her class; Metastasio's estate left her independent instead. Mozart was a regular guest at her weekly salons and wrote four-hand sonatas to play with her. In 1773 she became the first woman admitted to the Accademia Filarmonica of Bologna. Around seventy works survive of a reported two hundred.",
    significance: "Martines answers a question the symphonies on this page cannot reach: who actually made music in this period, and where. Her keyboard sonatas belong to the genre the middle-class market invented — music written to be played at home, by amateurs, on the instrument that stands in half the drawing rooms of Pride and Prejudice. She also shows the era's promise of individual opportunity running into its limits. Financially independent and admired across Europe, she still confined her published work to the light galant style rather than the learned counterpoint she had written to gain admission at Bologna. Maria Rosa Coccia, who did publish her counterpoint, was attacked for it and never recovered. What Martines chose not to print is as informative as what she did.",
  },
  {
    id: "nannerl",
    name: "Maria Anna Mozart",
    dates: "1751–1829",
    field: "Keyboardist",
    units: ["03-enlightenment"],
    bio: "Wolfgang's older sister, called Nannerl, and by contemporary accounts a keyboard player of extraordinary gifts. The two toured Europe together as children, billed jointly, and their father presented her talent as the equal of her brother's. At eighteen she was withdrawn from touring, an unmarried woman of marriageable age no longer being able to perform publicly. Her brother's letters praise compositions of hers that do not survive. She married a magistrate, raised a family, taught keyboard in a provincial town, and outlived Wolfgang by thirty-eight years.",
    significance: "Nannerl Mozart appears on the Enlightenment Music page for what the period did not let happen. The Enlightenment's defining claim is that ability rather than birth should decide what a person becomes — and the most famous musical household in Europe produced two prodigies, kept one, and sent the other home. That collision between a promise of individual opportunity and its limits for women is also, precisely, Austen's subject: Pride and Prejudice is a novel about intelligent women whose futures are settled by marriage because nothing else is available to settle them.",
  },
  {
    id: "beethoven",
    name: "Ludwig van Beethoven",
    dates: "1770–1827",
    field: "Composer",
    units: ["04-romanticism"],
    bio: "Born in Bonn, Beethoven moved to Vienna at 22 and spent the rest of his life there. He began losing his hearing in his late 20s and was completely deaf for the final decade of his life, during which he composed the Ninth Symphony, the late string quartets, and the Missa Solemnis, some of the most transcendent music in the Western canon. He never married, had a famously chaotic domestic life, and was a passionate supporter of revolutionary ideals. At the 1824 premiere of the Ninth he stood on stage beside the conductor giving tempo indications to an orchestra he could not hear; at the end, unable to hear the ovation behind him, he had to be turned around by the contralto Caroline Unger so that he could see it.",
    significance: "Beethoven is the hinge figure between Classical and Romantic: his Fifth Symphony uses Classical sonata form but charges it with Romantic emotional force, its four famous opening notes pursued and transformed with obsessive intensity through an entire movement. He is the first composer whose inner emotional life is understood as the primary subject of his music, establishing the Romantic ideal of the artist-as-heroic-individual. The \"fate knocking at the door\" gloss on those four notes is almost certainly invention: it comes from Anton Schindler, a notoriously unreliable witness, and what Beethoven reportedly said was that he took the figure from birdsong. The nineteenth century preferred fate. It preferred Beethoven himself in the same key — the era did not merely admire him but deified him, and the modern picture of the composer as a solitary genius wrestling with the infinite is built largely out of him.",
    portrait: "/images/portraits/portrait-beethoven-ludwig.jpg",
  },
  {
    id: "schubert",
    name: "Franz Schubert",
    dates: "1797–1828",
    field: "Composer",
    units: ["04-romanticism"],
    bio: "An Austrian composer who died at 31, probably of typhoid fever complicated by the effects of syphilis, having composed over 600 songs, nine symphonies, chamber music, and piano works of extraordinary quality and imagination. He lived in Vienna his entire life, almost entirely without institutional employment or financial stability, supported by a circle of friends who organized informal concerts (Schubertiaden) in his honor. His late works — the song cycles Winterreise and Schwanengesang, the String Quintet in C major — were largely unperformed in his lifetime.",
    significance: "Schubert's Der Erlkönig is a gallery piece on the Romantic Music page. The What to Listen For section describes it at length: a single continuous, galloping piano figure sustaining four characters — narrator, father, child, and the supernatural Elf King — across a song that ends without comfort. The Structure & Freedom section uses it as a smaller-scale example of the idée fixe principle: 'a single galloping figure in the piano, sustained without interruption across the entire song, drives father and dying child through the night with the relentlessness of an idea that cannot be abandoned.'",
  },
  {
    id: "berlioz",
    name: "Hector Berlioz",
    dates: "1803–1869",
    field: "Composer & Conductor",
    units: ["04-romanticism"],
    bio: "A French composer who abandoned medical studies to attend the Paris Conservatoire, Berlioz became the most innovative orchestral thinker of the Romantic period. His Symphonie fantastique (1830), composed at 27 in the grip of an obsessive infatuation with the Irish actress Harriet Smithson — whom he first saw playing Ophelia in Hamlet with an English company in Paris, and whom he later married, unhappily — invented the program symphony. He was also a brilliant music critic and wrote a still-valuable treatise on orchestration. His music was more admired in Germany than in France during his lifetime.",
    significance: "The Symphonie fantastique carries two of the Romantic Music page's central ideas at once. It is the page's demonstration of the idée fixe — one theme standing for the composer's beloved, returning in every movement and transformed from tender to mocking to grotesque as his obsession curdles. Berlioz glossed the term himself as a fixed idea, a monomania: obsession understood as an illness, which is precisely Ahab. It is also the page's clearest case of program music, since Berlioz printed a narrative program and said it should be read as the spoken text of an opera. And its fifth movement closes a loop across five centuries of the site: it quotes the Dies Irae, the medieval plainchant heard on the Medieval Music page, states it solemnly on low brass, then speeds it up and twists it into a witches' dance.",
  },
  {
    id: "wagner",
    name: "Richard Wagner",
    dates: "1813–1883",
    field: "Composer",
    units: ["04-romanticism"],
    bio: "A German composer who wrote his own libretti and developed the concept of the Gesamtkunstwerk — total artwork — fusing music, text, drama, and visual spectacle into a unified experience. His Ring Cycle runs 15 hours across four operas. He was also a virulent antisemite whose writings influenced the Nazis, and the political history of his music remains contested. He died in Venice, having just completed Parsifal.",
    significance: "Wagner's Tristan chord — a dissonance that refuses to resolve for four hours — is the musical equivalent of the Romantic sublime: tension so extreme it exceeds the structures designed to contain it. The Prelude to Tristan und Isolde is the sound of yearning without resolution, the sound of Ahab's obsession, the sound of what the Romantic era does when feeling overwhelms form.",
    portrait: "/images/portraits/portrait-wagner-richard.jpg",
  },
  {
    id: "mahler",
    name: "Gustav Mahler",
    dates: "1860–1911",
    field: "Composer & Conductor",
    units: ["04-romanticism", "05-modernism"],
    bio: "An Austrian composer and the most important conductor of his era, Mahler led the Vienna Court Opera and later the New York Philharmonic while composing ten symphonies (the tenth unfinished) of extraordinary scale and ambition. His symphonies can last ninety minutes and employ massive orchestras, offstage brass, and (building on the ground-breaking example of Beethoven's ninth symphony) vocal soloists; they range from folk-song simplicity to the edge of atonality. He died at 50 from bacterial endocarditis, having conducted his final New York Philharmonic concert from a sickbed.",
    significance: "Mahler appears in two units on this site. The Romantic Music page names him in Looking Back as the final step in the expansion of form: 'Mahler's symphonies are twice again as long as Beethoven's.' The Modernism Music page uses him as the hinge figure in the 'abortive gesture' narrative, the composer who did the technically 'wrong' thing for expressive reasons, pushing the tonal system to the point where Schoenberg's abandonment of it was the next inevitable step. Beethoven began the Romantic revolution; Mahler exhausted it.",
  },
  {
    id: "verdi",
    name: "Giuseppe Verdi",
    dates: "1813–1901",
    field: "Composer",
    units: ["04-romanticism"],
    bio: "The dominant figure of Italian opera and, by the end of his life, a national symbol. Born in a village in the Duchy of Parma and rejected by the Milan Conservatory, Verdi trained privately and found his first great success with Nabucco in 1842; his last two operas, Otello and Falstaff, are Shakespeare settings written in his seventies and eighties. He was born in the same year as Wagner and pursued the opposite ideal — melody, voice, and recognizable human feeling rather than harmony, myth, and metaphysics. When he died in Milan in January 1901, an estimated 200,000 people lined the streets in silence for his funeral procession.",
    significance: "Verdi supplies the pole the Romantic Music page was missing. Everything else on it comes from the German and French traditions and points toward harmony, interiority, and metaphysics; Verdi is the melodic, humane, popular alternative, and the page's only instance of musical nationalism. \"Va, pensiero,\" the chorus of exiled Hebrews in Nabucco, was written in 1842 and became over the following decades the unofficial anthem of the Risorgimento. Its reach measures something specific: after the failed revolutions of 1848, open political nationalism was suppressed across the Italian states and the Habsburg lands, and national feeling moved into the arts because that was the one place left for it. For an occupied people, music was not a decoration of politics but a substitute for it.",
  },
  {
    id: "clara-schumann",
    name: "Clara Schumann",
    dates: "1819–1896",
    field: "Pianist & Composer",
    units: ["04-romanticism"],
    bio: "One of the great pianists of the nineteenth century, with a concert career of sixty-one years, and a composer whose work went largely unexamined for a hundred years after her death. Trained relentlessly by her father Friedrich Wieck, she was touring at eleven and published at eleven. She married Robert Schumann in 1840, after the couple sued her father for the right to wed; she bore eight children, and after Robert's death in 1856 gave much of her career to performing and editing his music. She also reshaped what a piano recital was, playing from memory and displacing virtuoso showpieces with Bach, Beethoven, and Schubert.",
    significance: "Clara Schumann is the Romantic Music page's chamber voice, and the last stop on a line the site traces across four units. Her Piano Trio in G minor is her most ambitious work, written in 1846 between the birth of her fourth child and a miscarriage, and meant for dedication to Fanny Mendelssohn Hensel — a dedication dropped when Hensel died. Seven years earlier, at twenty, she had written in her diary that a woman must not desire to compose, since none had ever been able to. That line is famous and almost always quoted alone, which misrepresents it: she wrote it inside a jealous comparison with another woman composer, contradicted herself in the same entry, and went on composing for fifteen more years. In October 1846, having just heard the Trio played through, she wrote that there is nothing greater than the joy of composing something oneself and then listening to it.",
  },
  {
    id: "mendelssohn",
    name: "Felix Mendelssohn",
    dates: "1809–1847",
    field: "Composer & Conductor",
    units: ["04-romanticism"],
    bio: "A German composer, conductor, and pianist born into a prosperous and intellectually distinguished Berlin family. A prodigy on the scale of Mozart, he wrote the Octet at sixteen and the Midsummer Night's Dream overture at seventeen. As a conductor he revived Bach's St Matthew Passion in 1829 and effectively began the modern Bach revival. His sister Fanny Mendelssohn Hensel was a composer of comparable gifts whose professional publication the family, Felix included, discouraged; several of her songs first appeared in print under his name.",
    significance: "The Hebrides Overture is the Romantic Music page's most direct demonstration of program music. Mendelssohn sketched its opening phrase during an 1829 tour of Scotland and built from it a concert overture with no plot and no characters, which is simply the sound of a particular sea against particular rock. He is also the page's counterweight to Romantic excess: his Romanticism keeps Classical proportion, evidence that the era's expressive expansion did not require abandoning inherited form. And the Bach revival he led is the mechanism behind a claim the Baroque page makes — that a composer's reputation can be settled a century after his death.",
  },
  {
    id: "stravinsky",
    name: "Igor Stravinsky",
    dates: "1882–1971",
    field: "Composer",
    units: ["05-modernism"],
    bio: "Born near St. Petersburg, Stravinsky became the most influential composer of the 20th century through his work for Diaghilev's Ballets Russes — The Firebird, Petrushka, and The Rite of Spring. The 1913 premiere of The Rite caused a near-riot. He lived through two world wars, the Russian Revolution, and the Holocaust, reinventing his style multiple times: primitivism, neoclassicism, serialism.",
    significance: "The Rite of Spring's pounding, irregularly accented chords are Modernism's musical declaration of independence: inherited formal structures shattered, replaced by something visceral, violent, and radically new. Its 1913 premiere provoked a riot — which is what Modernism often does when it arrives.",
    portrait: "/images/portraits/portrait-stravinsky-igor.jpg",
  },
  {
    id: "schoenberg",
    name: "Arnold Schoenberg",
    dates: "1874–1951",
    field: "Composer",
    units: ["05-modernism"],
    bio: "A Viennese composer who pushed the late Romantic chromatic style to its logical extreme and then, around 1908, abandoned tonality altogether — composing in a 'freely atonal' style before systematizing his approach into the twelve-tone method in the early 1920s. He fled Nazi Germany in 1933, settled in Los Angeles, and spent his final decades teaching at UCLA, where his students included John Cage.",
    significance: "Schoenberg's twelve-tone method abolishes the tonal hierarchy — no home key, no consonance, no resolution. The effect is music that sounds permanently unanchored, which is the sonic equivalent of the narrator's condition in Invisible Man: an identity with no stable center, in a world that offers no reliable resolution.",
    portrait: "/images/portraits/portrait-schoenberg-arnold.jpg",
  },
  {
    id: "ellington",
    name: "Duke Ellington",
    dates: "1899–1974",
    field: "Composer, Bandleader & Pianist",
    units: ["05-modernism"],
    bio: "Born Edward Kennedy Ellington in Washington, D.C., Ellington became the most important composer in the history of jazz — composing over 1,000 works ranging from three-minute dance numbers to extended concert pieces. His orchestra maintained a consistent identity for 50 years through the Depression, World War II, and the Civil Rights era. Black, Brown and Beige, premiered at Carnegie Hall in 1943, was his most ambitious attempt to tell the story of African American experience through music.",
    significance: "Ellington is the course's demonstration that Modernism cannot be represented by the European avant-garde alone. The jazz tradition — with its improvisatory freedom within structural constraints, its fluid relationship between soloist and ensemble, its roots in African American experience — is the direct formal model for Invisible Man. Ellison understood his narrator as a jazz soloist, and Ellington is the master of that form.",
    portrait: "/images/portraits/portrait-ellington-duke.jpg",
  },

  // ── SCULPTORS ─────────────────────────────────────────────────────────────
  {
    id: "gislebertus",
    name: "Gislebertus",
    dates: "fl. c. 1120–1135",
    field: "Sculptor",
    units: ["00-medieval"],
    bio: "Gislebertus carved the extraordinary sculptural program of the Cathedral of Saint-Lazare in Autun, Burgundy, including the famous Last Judgment tympanum above the west portal. Almost nothing is known of his life; his identity survives only because he inscribed his name — \"Gislebertus hoc fecit\" — directly beneath the feet of the Christ figure, an act of unusual self-assertion for a medieval craftsman.",
    significance: "His tympanum at Autun is the course's primary example of medieval sculpture's theological program — the body as spiritual sign, hieratic scale, and the total environment of the cathedral portal. His signature also anchors the Material & Making discussion of anonymity versus authorship.",
    portrait: "/images/portraits/portrait-gislebertus.jpg",
  },
  {
    id: "ghiberti",
    name: "Lorenzo Ghiberti",
    dates: "1378–1455",
    field: "Sculptor & Goldsmith",
    units: ["01-renaissance"],
    bio: "The Florentine goldsmith who won the 1401 Baptistery-doors competition against Brunelleschi, and then spent most of the next fifty years on the commission. The first set of doors took twenty-one years. The second, begun in 1425, took twenty-seven more and is traditionally said to have been called the Gates of Paradise by Michelangelo. Ghiberti also wrote the Commentarii, among the earliest autobiographies by a European artist.",
    significance: "Ghiberti is the other half of the 1401 competition — the man who won, and whose victory is what sent Brunelleschi to Rome. He also belongs to the Material & Making thread on his own terms: a craftsman who wrote his own life at a moment when most sculptors left no record at all, seventy years before Michelangelo signed the Pietà. The named maker does not begin with Michelangelo; it begins with men like this one.",
    portrait: "/images/portraits/portrait-ghiberti-lorenzo.jpg",
  },
  {
    id: "della-robbia",
    name: "Luca della Robbia",
    dates: "c. 1399–1482",
    field: "Sculptor",
    units: ["01-renaissance"],
    bio: "A Florentine sculptor of Donatello's generation. His marble Cantoria — the singing gallery carved for Florence Cathedral in the 1430s — is canonical early Renaissance relief. He is better remembered for what he did next: developing a tin-glazed terracotta that held its colour permanently, and founding a family workshop that supplied glazed reliefs to churches, hospitals, and civic buildings in Tuscany for three generations.",
    significance: "Della Robbia is the evidence that Renaissance sculpture was not only marble and bronze. Glazed terracotta was prestigious in its own moment — cathedral and guild commissions, not ornament — and was filed under \"decorative\" only later. That reclassification is exactly the Vasari-inherited bias the Material & Making thread risks reproducing. Naming him lets the thread state the accurate three-part case: marble, bronze, and glazed terracotta.",
    portrait: "/images/portraits/portrait-della-robbia-luca.jpg",
  },
  {
    id: "donatello",
    name: "Donatello (Donato di Niccolò di Betto Bardi)",
    dates: "c. 1386–1466",
    field: "Sculptor",
    units: ["01-renaissance"],
    bio: "Donatello was the dominant sculptor of the early Italian Renaissance and the first artist since antiquity to create a freestanding nude figure — his bronze David (c. 1440s). Working in Florence under the patronage of the Medici, he mastered marble, bronze, and stone relief, and his innovations in perspective relief (schiacciato) and psychological expressiveness transformed European sculpture.",
    significance: "His David is the course's foundational example of the Renaissance recovery of the classical body — autonomous, self-possessed, and no longer subordinated to architectural program. The contrast between his David and Michelangelo's anchors the Body & Volume thread for Unit 01.",
    portrait: "/images/portraits/portrait-donatello.jpg",
  },
  {
    id: "bernini",
    name: "Gian Lorenzo Bernini",
    dates: "1598–1680",
    field: "Sculptor and architect",
    units: ["02-baroque"],
    bio: "Bernini was the supreme sculptor of the Baroque period and the dominant artistic figure in Rome for half a century. Patronized by a succession of popes, he transformed the city's visual landscape — Saint Peter's Square, the Fountain of the Four Rivers, the Cornaro Chapel — while producing marble sculptures of unparalleled illusionistic virtuosity. He was also an architect, stage designer, and playwright, and his total-environment approach to artistic commissions was central to the Counter-Reformation Church's program of persuasion through sensory overwhelming.",
    significance: "Bernini's work anchors all three sculpture threads for the Baroque unit. His Apollo and Daphne is the hero work; his David provides the three-David comparison central to Body & Volume; and the Cornaro Chapel is the Space & Setting argument's defining example.",
    portrait: "/images/portraits/portrait-bernini-gian-lorenzo.jpg",
  },
  {
    id: "puget",
    name: "Pierre Puget",
    dates: "1620–1694",
    field: "Sculptor",
    units: ["02-baroque"],
    bio: "Pierre Puget was the most important French Baroque sculptor, though his career was marked by conflict with the French court and periods of working in Genoa and Toulon rather than Paris. His Milo of Croton (1682, Louvre), showing the Greek athlete trapped by a tree and attacked by a lion, is his masterpiece — a work of intense physical agony that exemplifies the Baroque conviction that sculpture should capture the body at its moment of maximum suffering and helplessness.",
    significance: "Milo of Croton is the gallery example for the Baroque sculpture unit, extending the Body & Volume argument from Bernini's transforming figures to the body overwhelmed by forces it cannot master.",
    portrait: "/images/portraits/portrait-puget-pierre.jpg",
  },
  {
    id: "houdon",
    name: "Jean-Antoine Houdon",
    dates: "1741–1828",
    field: "Sculptor",
    units: ["03-enlightenment"],
    bio: "Houdon was the preeminent portrait sculptor of the Enlightenment, producing likenesses of virtually every major intellectual and political figure of his era — Voltaire, Rousseau, Franklin, Jefferson, Washington. His ability to render the specific character of a face with psychological penetration rather than idealization made him the visual chronicler of the age of reason. His seated Voltaire (1781) is among the most celebrated portrait sculptures ever made.",
    significance: "Houdon's Voltaire is the hero work for the Enlightenment sculpture unit and the central example of the Body & Volume argument — naturalism in service of character revelation, the inner life made visible on the outer surface. His practice of distributing portrait busts across European salons anchors the Space & Setting discussion.",
    portrait: "/images/portraits/portrait-houdon-jean-antoine.jpg",
  },
  {
    id: "washington-gw",
    name: "George Washington",
    dates: "1732–1799",
    field: "General & Statesman",
    units: ["03-enlightenment"],
    bio: "Commander of the Continental Army during the American Revolution and the first President of the United States, Washington was, by his own choice, the new republic's central proof that political power could be relinquished as well as won — he declined a third term and returned to private life at Mount Vernon. Jefferson arranged for Houdon to travel to Mount Vernon in 1785 to model his likeness directly from life.",
    significance: "Houdon's standing marble figure of Washington, commissioned for the Virginia State Capitol, keeps him in his actual Continental Army uniform rather than the Roman toga convention expected of civic statues — but sets a bundle of ceremonial rods (fasces) under his arm, cloak and sword slung across it, with a plow standing behind him, arguing visually that the American Revolution's general was also its Cincinnatus, a citizen who set down power voluntarily. It is the Enlightenment's Body & Volume and Space & Setting arguments fused into a single civic monument.",
    portrait: "/images/portraits/portrait-washington-george.jpg",
  },
  {
    id: "canova",
    name: "Antonio Canova",
    dates: "1757–1822",
    field: "Sculptor",
    units: ["03-enlightenment"],
    bio: "Canova was the leading neoclassical sculptor of his era, the Italian counterpart to the theoretical program advanced by Winckelmann. His marbles — Psyche Revived by Cupid's Kiss, The Three Graces, his portraits of Napoleon's family — achieved a surface refinement that seemed to transcend the distinction between stone and skin. He worked in Rome for most of his career and was celebrated across Europe as the restorer of classical ideals to modern sculpture.",
    significance: "Canova's work provides the neoclassical counterpoint to Houdon in the Enlightenment sculpture unit — idealization against particularism, the universal against the individual. His approach to marble surface also sets up the Material & Making arc from Baroque illusionism toward Enlightenment classical refinement.",
    portrait: "/images/portraits/portrait-canova-antonio.jpg",
  },
  {
    id: "winckelmann",
    name: "Johann Joachim Winckelmann",
    dates: "1717–1768",
    field: "Art historian and archaeologist",
    units: ["03-enlightenment"],
    bio: "Winckelmann was the German art historian and archaeologist whose Thoughts on the Imitation of Greek Works in Painting and Sculpture (1755) and History of Ancient Art (1764) established neoclassicism as the dominant aesthetic theory of the Enlightenment. His argument that Greek art represented the highest human achievement — and that it was inseparable from the freedom and rationality of Greek society — made aesthetics a political and moral question, not merely a technical one.",
    significance: "Winckelmann's argument that great art is the product of rational, free social conditions is the theoretical foundation for the Enlightenment Material & Making discussion. The parallel with Austen's insistence that genuine virtue requires free rational self-examination is made explicitly in the Enlightenment sculpture unit.",
    portrait: "/images/portraits/portrait-winckelmann-johann.jpg",
  },
  {
    id: "rodin",
    name: "Auguste Rodin",
    dates: "1840–1917",
    field: "Sculptor",
    units: ["04-romanticism"],
    bio: "Rodin is the dominant figure in 19th-century sculpture and one of the most influential artists of any era. His radical approach to the human figure — unfinished surfaces, psychological intensity, bodies caught at moments of maximum emotional pressure — broke decisively with neoclassical conventions and opened the path to Modernist sculpture. The Burghers of Calais, The Gates of Hell, The Thinker, and The Kiss are among the most recognized works in Western art.",
    significance: "Rodin's work anchors all three sculpture threads for the Romanticism unit. The Burghers of Calais is the hero work; The Gates of Hell provides the Material & Making argument about the unfinished surface and obsessive making; his ground-level installation intention anchors Space & Setting.",
    portrait: "/images/portraits/portrait-rodin-auguste.jpg",
  },
  {
    id: "rude",
    name: "François Rude",
    dates: "1784–1855",
    field: "Sculptor",
    units: ["04-romanticism"],
    bio: "Rude was a French Romantic sculptor best known for La Marseillaise (The Departure of the Volunteers of 1792, 1836), the high-relief sculpture on the Arc de Triomphe in Paris that became one of the defining images of French national identity. He studied under David and worked in the Napoleonic tradition before developing the passionate energy and dramatic scale characteristic of Romantic public sculpture.",
    significance: "La Marseillaise provides the civic/nationalist counterpoint to Rodin's intimate ground-level grief in the Romanticism sculpture unit, anchoring the Space & Setting discussion of the full range of Romantic public sculpture — from the pedestal removed to the monument elevated.",
    portrait: "/images/portraits/portrait-rude-francois.jpg",
  },
  {
    id: "brancusi",
    name: "Constantin Brancusi",
    dates: "1876–1957",
    field: "Sculptor",
    units: ["05-modernism"],
    bio: "Brancusi was the Romanian-French sculptor whose radical program of reduction and abstraction transformed 20th-century sculpture. Trained in Bucharest and Paris, he rejected the influence of Rodin and pursued a path of progressive simplification — stripping the human figure and natural forms down to their essential gesture. Bird in Space, The Kiss, Sleeping Muse, and the Endless Column are landmarks of Modernist art. His 1928 legal battle with US Customs, who refused to classify Bird in Space as sculpture, became an emblematic moment in the history of modern art's challenge to inherited categories.",
    significance: "Brancusi's Bird in Space is the hero work for the Modernism sculpture unit. His customs case is the page's opening story — the definitive image of what Modernist sculpture does: dismantling the assumptions that made depiction the point. His work anchors the Body & Volume argument about reduction to essential gesture.",
    portrait: "/images/portraits/portrait-brancusi-constantin.jpg",
  },
  {
    id: "giacometti",
    name: "Alberto Giacometti",
    dates: "1901–1966",
    field: "Sculptor and painter",
    units: ["05-modernism"],
    bio: "Giacometti was the Swiss sculptor and painter whose elongated, eroded figures — attenuated to the verge of disappearance — became among the most recognizable images of postwar existential anxiety. After early Surrealist work, he developed his mature style in the late 1940s, producing figures so thin they seem worn away by time or pressure. City Square, The Walking Man, and his portrait busts are central works of 20th-century art.",
    significance: "Giacometti's City Square is the gallery example for the Modernism sculpture unit, providing the counterpoint to Brancusi — where Brancusi reduces to the irreducible core, Giacometti reveals the figure stripped to its last thread. Both ask the same Modernist question: what is actually there, beneath the layers of social role and projected meaning?",
    portrait: "/images/portraits/portrait-giacometti-alberto.jpg",
  },
  {
    id: "kollwitz",
    name: "Käthe Kollwitz",
    dates: "1867–1945",
    field: "Printmaker & Sculptor",
    units: ["05-modernism"],
    bio: "A German artist working primarily in printmaking and sculpture, Kollwitz depicted poverty, grief, and the toll of war with unflinching directness across a career spanning both World Wars. Her younger son Peter was killed in Flanders in the war's first months, in 1914; she spent nearly two decades producing The Grieving Parents, a granite memorial of two kneeling figures, for the German war cemetery where he is buried. She continued working under the Nazi regime, which forced her resignation from the Prussian Academy of Arts and banned her work from exhibition; her grandson, also named Peter, was killed in the Second World War.",
    significance: "Kollwitz gives the unit's Body & Volume thread a mode of the body neither Brancusi's reduction nor Giacometti's attenuation supplies: the body left whole and specific but hollowed by grief, made permanent as public rather than private mourning. She fills a gap the unit's own introduction opens by naming two World Wars as Modernism's defining ruptures, and never otherwise showing what those wars did to a body.",
  },
  {
    id: "david-smith",
    name: "David Smith",
    dates: "1906–1965",
    field: "Sculptor",
    units: ["05-modernism"],
    bio: "David Smith was the American sculptor who brought industrial welding techniques into fine art, creating a body of work in steel that redefined the possibilities of sculpture in the 20th century. He worked in an automobile plant and a locomotive factory before becoming an artist, and the industrial materials and methods of those jobs became the basis of his practice. His Hudson River Landscape, Cubi series, and Voltri sculptures are landmarks of American Modernism.",
    significance: "Smith's Hudson River Landscape is the gallery example for the Modernism Material & Making thread — his welded steel makes visible the industrial labor that traditional high culture preferred to keep in the factory and out of the gallery, directly paralleling Ellison's argument about the labor that American culture preferred to keep underground.",
    portrait: "/images/portraits/portrait-smith-david.jpg",
  },
  {
    id: "duchamp",
    name: "Marcel Duchamp",
    dates: "1887–1968",
    field: "Artist (Dadaist, conceptual)",
    units: ["05-modernism"],
    bio: "Duchamp was the French-American artist whose radical conceptual experiments — the readymades, The Large Glass, Nude Descending a Staircase — permanently altered the question of what art is. His submission of a mass-produced urinal as Fountain to the Society of Independent Artists in 1917 is one of the most consequential provocations in art history. The Bride Stripped Bare by Her Bachelors, Even (The Large Glass, 1915–1923) occupied him for eight years and remains one of the most complex and debated works of the 20th century.",
    significance: "Duchamp's Large Glass was the Modernism sculpture page's Material & Making gallery example in an earlier version of the page; it was removed as harder for students at this level than the page's other choices, with the classification argument carried instead by the Brancusi customs case and the Material & Making thread rebuilt around Picasso's Guitar and Smith's welded steel. Duchamp is no longer named on that page at all — he is referenced instead in the Romanticism sculpture unit's Looking Forward, as the figure who pushes past Brancusi's reduction to ask whether the sculptor needs to make anything.",
    portrait: "/images/portraits/portrait-duchamp-marcel.jpg",
  },
];

// ─── INDEX BY ID ─────────────────────────────────────────────────────────────
const PEOPLE_INDEX = Object.fromEntries(PEOPLE.map((p) => [p.id, p]));

// ─── UNIT ACCENT COLORS ───────────────────────────────────────────────────────
const UNIT_COLORS = {
  "00-medieval":      "#C9A24B",
  "01-renaissance":   "#B54C3A",
  "02-baroque":       "#B07028",
  "03-enlightenment": "#698BA1",
  "04-romanticism":   "#3D5A6D",
  "05-modernism":     "#A03828",
};

const UNIT_ORDER = [
  "00-medieval", "01-renaissance", "02-baroque",
  "03-enlightenment", "04-romanticism", "05-modernism",
];
const UNIT_LABELS = {
  "00-medieval":      "The High Middle Ages",
  "01-renaissance":   "Renaissance & Reformation",
  "02-baroque":       "The Baroque",
  "03-enlightenment": "The Enlightenment",
  "04-romanticism":   "Romanticism",
  "05-modernism":     "Modernism",
};
const UNIT_TEXTS = {
  "00-medieval":      "Foundation",
  "01-renaissance":   "Hamlet",
  "02-baroque":       "Paradise Lost",
  "03-enlightenment": "Pride and Prejudice",
  "04-romanticism":   "Moby-Dick",
  "05-modernism":     "Invisible Man",
};

// ─── BIOGRAPHY PANEL ─────────────────────────────────────────────────────────
function BiographyPanel({ personId, onClose }) {
  const person = PEOPLE_INDEX[personId];
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!person) return null;

  const accent = UNIT_COLORS[person.units[0]] || "var(--acc)";

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.72)",
        backdropFilter: "blur(4px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "stretch",
        justifyContent: "flex-end",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(480px, 100vw)",
          height: "100vh",
          background: "var(--bg-raised)",
          borderLeft: "1px solid var(--rule-strong)",
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          animation: "slideIn 0.25s ease-out",
        }}
      >
        {/* Top accent strip */}
        <div style={{ height: "4px", background: accent, flexShrink: 0 }} />

        {/* Header */}
        <div style={{
          padding: "28px 28px 20px",
          borderBottom: "1px solid var(--rule)",
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", flex: 1, paddingRight: "12px" }}>
              {person.portrait && (
                <img
                  src={person.portrait}
                  alt={person.name}
                  style={{
                    width: "72px",
                    height: "72px",
                    objectFit: "cover",
                    flexShrink: 0,
                    border: "1px solid var(--rule)",
                  }}
                />
              )}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10.5px",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: accent,
                  marginBottom: "8px",
                }}>
                  {person.field}
                </div>
                <h2 style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 400,
                  fontSize: "22px",
                  lineHeight: 1.15,
                  color: "var(--ink)",
                  margin: "0 0 6px",
                }}>
                  {person.name}
                </h2>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "var(--ink-soft)",
                  letterSpacing: "0.06em",
                }}>
                  {person.dates}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                color: "var(--ink-soft)",
                cursor: "pointer",
                fontSize: "22px",
                lineHeight: 1,
                padding: "2px 6px",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "var(--ink)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "var(--ink-soft)"; }}
            >
              ✕
            </button>
          </div>

          {/* Unit tags */}
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {person.units.map((u) => (
              <span key={u} style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11.5px",
                padding: "3px 8px",
                border: `1px solid ${UNIT_COLORS[u] || "var(--rule)"}55`,
                color: UNIT_COLORS[u] || "var(--ink-soft)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}>
                {UNIT_LABELS[u]}
              </span>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "24px 28px", flex: 1 }}>
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--ink-soft)",
            marginBottom: "12px",
          }}>
            Life & Work
          </div>
          <p style={{
            fontFamily: "var(--font-display)",
            fontSize: "15px",
            lineHeight: 1.8,
            color: "var(--ink-mute)",
            margin: "0 0 28px",
          }}>
            {person.bio}
          </p>

          <div style={{ borderTop: "1px solid var(--rule)", paddingTop: "24px" }}>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--ink-soft)",
              marginBottom: "12px",
            }}>
              Significance for This Course
            </div>
            <p style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: "15px",
              lineHeight: 1.8,
              color: "var(--ink-mute)",
              margin: 0,
            }}>
              {person.significance}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: "12px 28px",
          borderTop: "1px solid var(--rule)",
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "var(--ink-soft)",
          letterSpacing: "0.06em",
          flexShrink: 0,
        }}>
          Press Esc to close
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

// ─── BIO LINK ─────────────────────────────────────────────────────────────────
export function BioLink({ id, children, onOpen }) {
  const person = PEOPLE_INDEX[id];
  if (!person) return <span>{children}</span>;
  const accent = UNIT_COLORS[person.units[0]] || "var(--acc)";

  return (
    <button
      onClick={() => onOpen(id)}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        fontFamily: "inherit",
        fontSize: "inherit",
        color: accent,
        textDecoration: "underline",
        textDecorationStyle: "dotted",
        textDecorationColor: `${accent}88`,
        textUnderlineOffset: "3px",
        transition: "color 150ms, text-decoration-color 150ms",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--ink)";
        e.currentTarget.style.textDecorationColor = accent;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = accent;
        e.currentTarget.style.textDecorationColor = `${accent}88`;
      }}
    >
      {children}
    </button>
  );
}

// ─── PERSON CARD ─────────────────────────────────────────────────────────────
function PersonCard({ person, onClick }) {
  const accent = UNIT_COLORS[person.units[0]] || "var(--acc)";
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        background: hovered ? "#E0D5BD" : "var(--bg-raised)",
        border: hovered ? "1px solid var(--rule-strong)" : "1px solid var(--rule)",
        padding: "12px 14px 12px 22px",
        cursor: "pointer",
        textAlign: "left",
        transition: "background 150ms, border-color 150ms",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        width: "100%",
      }}
    >
      {/* Left accent swatch */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0,
        width: "4px",
        background: accent,
      }} />

      {/* Portrait */}
      {person.portrait ? (
        <img
          src={person.portrait}
          alt={person.name}
          style={{
            width: "40px",
            height: "40px",
            objectFit: "cover",
            flexShrink: 0,
            border: "1px solid var(--rule)",
          }}
        />
      ) : (
        <div style={{
          width: "40px",
          height: "40px",
          flexShrink: 0,
          background: "var(--bg-sunken)",
          border: "1px solid var(--rule)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-mono)",
          fontSize: "12px",
          color: "var(--ink-soft)",
          letterSpacing: "0.04em",
        }}>
          {person.name.split(' ').filter(w => w[0] === w[0]?.toUpperCase()).slice(-2).map(w => w[0]).join('')}
        </div>
      )}

      {/* Info */}
      <div style={{ minWidth: 0 }}>
        <div style={{
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          fontSize: "15px",
          color: "var(--ink)",
          marginBottom: "3px",
          lineHeight: 1.2,
        }}>
          {person.name}
        </div>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: "12px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "var(--ink-soft)",
        }}>
          {person.field}
        </div>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: "12px",
          color: "var(--ink-soft)",
          marginTop: "2px",
          opacity: 0.75,
        }}>
          {person.dates}
        </div>
      </div>
    </button>
  );
}

// ─── MAIN PAGE COMPONENT ──────────────────────────────────────────────────────
function groupByPrimaryUnit(people) {
  const groups = {};
  UNIT_ORDER.forEach((u) => { groups[u] = []; });
  people.forEach((p) => {
    const u = p.units[0];
    if (groups[u]) groups[u].push(p);
  });
  return groups;
}

export default function BiographyDemo() {
  const [activePerson, setActivePerson] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeUnit, setActiveUnit] = useState(null);

  const groups = groupByPrimaryUnit(PEOPLE);

  const filteredPeople = searchQuery.trim()
    ? PEOPLE.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.field.toLowerCase().includes(searchQuery.toLowerCase()) ||
        UNIT_LABELS[p.units[0]].toLowerCase().includes(searchQuery.toLowerCase())
      ).filter((p) => !activeUnit || p.units[0] === activeUnit)
    : null;

  const tabStyle = (active, activeColor) => ({
    fontFamily: "var(--font-mono)",
    fontSize: "11px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    padding: "5px 14px",
    background: active ? "var(--bg-raised)" : "none",
    border: active
      ? `1px solid ${activeColor || "var(--rule-strong)"}`
      : "1px solid transparent",
    color: active ? "var(--ink)" : "var(--ink-soft)",
    cursor: "pointer",
    transition: "color 150ms, background 150ms, border-color 150ms",
  });

  return (
    <div>
      {/* Period filter tabs */}
      <div style={{
        borderBottom: "1px solid var(--rule)",
        background: "var(--bg)",
        padding: "0 var(--gutter)",
      }}>
        <div style={{
          maxWidth: "900px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          gap: "2px",
          padding: "12px 0",
        }}>
          <button onClick={() => setActiveUnit(null)} style={tabStyle(!activeUnit, "var(--rule-strong)")}>
            All Periods
          </button>
          {UNIT_ORDER.map((u) => (
            <button key={u} onClick={() => setActiveUnit(u)} style={tabStyle(activeUnit === u, UNIT_COLORS[u])}>
              {UNIT_LABELS[u]}
            </button>
          ))}
        </div>
      </div>

      {/* Search bar */}
      <div style={{
        background: "var(--bg-sunken)",
        borderBottom: "1px solid var(--rule)",
        padding: "10px var(--gutter)",
      }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <input
            type="text"
            placeholder="Search by name, field, or period…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              maxWidth: "400px",
              padding: "8px 14px",
              background: "var(--bg-sunken)",
              border: "1px solid var(--rule)",
              color: "var(--ink)",
              fontFamily: "var(--font-ui)",
              fontSize: "14px",
              outline: "none",
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 var(--gutter) 80px" }}>
        {filteredPeople ? (
          <div>
            <div style={{
              padding: "24px 0 16px",
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--ink-soft)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}>
              {filteredPeople.length} result{filteredPeople.length !== 1 ? "s" : ""}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "8px" }}>
              {filteredPeople.map((p) => (
                <PersonCard key={p.id} person={p} onClick={() => setActivePerson(p.id)} />
              ))}
            </div>
          </div>
        ) : (
          UNIT_ORDER
            .filter((u) => !activeUnit || u === activeUnit)
            .map((unitId) => {
              const people = groups[unitId];
              if (!people.length) return null;
              const accent = UNIT_COLORS[unitId];
              return (
                <div key={unitId} style={{ paddingTop: "48px" }}>
                  {/* Section label */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "20px",
                    paddingBottom: "14px",
                    borderBottom: "1px solid var(--rule)",
                  }}>
                    <div style={{ width: "3px", height: "14px", background: accent, flexShrink: 0 }} />
                    <span style={{
                      fontFamily: "var(--font-ui)",
                      fontSize: "11px",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--ink-soft)",
                    }}>
                      {UNIT_LABELS[unitId]}
                    </span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--ink-soft)", opacity: 0.5 }}>·</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontStyle: "italic", color: "var(--ink-soft)" }}>
                      {UNIT_TEXTS[unitId]}
                    </span>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "8px" }}>
                    {people.map((p) => (
                      <PersonCard key={p.id} person={p} onClick={() => setActivePerson(p.id)} />
                    ))}
                  </div>
                </div>
              );
            })
        )}
      </div>

      {activePerson && (
        <BiographyPanel personId={activePerson} onClose={() => setActivePerson(null)} />
      )}
    </div>
  );
}

export { PEOPLE, PEOPLE_INDEX, BiographyPanel };
