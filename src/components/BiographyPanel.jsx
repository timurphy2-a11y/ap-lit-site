import { useState, useEffect, useCallback } from "react";

// ─── PEOPLE DATA ────────────────────────────────────────────────────────────
// Each entry: id, name, dates, field, unit(s), bio, significance
const PEOPLE = [
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
  // ── RENAISSANCE ───────────────────────────────────────────────────────────
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
    field: "Physicist & Astronomer",
    units: ["01-renaissance"],
    bio: "Born the same year as Shakespeare, Galileo transformed natural philosophy through his insistence on observation and experiment over inherited authority. He improved the telescope, observed Jupiter's moons and the lunar surface, and developed the mathematics of projectile motion. Tried by the Inquisition in 1633 and forced to recant heliocentrism, he spent his final years under house arrest — continuing to work.",
    significance: "Galileo's rebuke to the Aristotelians — 'bring us arguments and demonstrations, not texts and authorities' — is the epistemological revolution in a sentence. His confrontation with the Inquisition dramatizes the individual-versus-institution conflict at its most charged, and his defiance (legendary or not: 'and yet it moves') becomes a model for every subsequent thinker who follows evidence against official pressure.",
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
    field: "Theologian & Reformer",
    units: ["01-renaissance"],
    bio: "An Augustinian friar and professor of theology at the University of Wittenberg, Luther's 1517 posting of his Ninety-Five Theses — challenging the Church's sale of indulgences — ignited the Reformation. Excommunicated by the Pope and condemned by the Holy Roman Emperor, he refused to recant at the Diet of Worms in 1521. He translated the Bible into German, shaping the German language while placing Scripture in the hands of ordinary readers.",
    significance: "'Here I stand' is the inversion of Augustine's surrender. Where Augustine submits his individual conscience to divine authority, Luther sets individual conscience against institutional authority — and survives. Once that move is made, the entire medieval framework of obedience shifts. The Protestant Reformation is the first act of a drama that runs through Locke's consent theory, Thoreau's civil disobedience, and Ellison's underground refusal.",
    portrait: "/images/portraits/portrait-luther-martin.jpg",
  },
  {
    id: "shakespeare",
    name: "William Shakespeare",
    dates: "1564–1616",
    field: "Playwright & Poet",
    units: ["01-renaissance"],
    bio: "Born in Stratford-upon-Avon, Shakespeare came to London in the late 1580s and became both a working playwright and shareholder in the Globe Theatre. He wrote approximately 37 plays and 154 sonnets over two decades. Almost nothing is known of his inner life; we have signatures, legal documents, and the works themselves. Stephen Greenblatt's Will in the World is a sustained attempt to reconstruct the man from the works.",
    significance: "Hamlet is the course's first major literary text — the play in which Renaissance optimism (Pico's self-creating human) collides with Renaissance anxiety (Montaigne's self-doubting essayist) and produces a character who cannot act. Understanding Shakespeare's historical moment — the dying years of Elizabeth I, the Reformation's fractures, the new science's vertigo — is essential to reading the play.",
    portrait: "/images/portraits/portrait-shakespeare-william.jpg",
  },
  // ── BAROQUE ───────────────────────────────────────────────────────────────
  {
    id: "hobbes",
    name: "Thomas Hobbes",
    dates: "1588–1679",
    field: "Political Philosopher",
    units: ["02-baroque"],
    bio: "An English philosopher who witnessed the English Civil War and the execution of Charles I, Hobbes wrote Leviathan (1651) in exile in Paris. He argued that in a state of nature, human life is 'solitary, poor, nasty, brutish, and short,' and that the only escape is to surrender individual rights to an absolute sovereign. He lived to 91, surviving the Interregnum, the Restoration, and the Great Fire of London.",
    significance: "Hobbes and Milton are the great antagonists of the Baroque unit. Where Hobbes argues that freedom leads to catastrophe and demands submission to absolute authority, Milton insists that obedience must be freely chosen to mean anything. The tension between them maps directly onto Paradise Lost's central question: why does God allow Adam and Eve to fall?",
    portrait: "/images/portraits/portrait-hobbes-thomas.jpg",
  },
  {
    id: "pascal",
    name: "Blaise Pascal",
    dates: "1623–1662",
    field: "Mathematician, Physicist & Theologian",
    units: ["02-baroque"],
    bio: "A French child prodigy who published a mathematical treatise at 16, invented one of the first mechanical calculators, and made fundamental contributions to probability theory and fluid mechanics — all before his religious conversion at 31. After a mystical experience in 1654, he devoted himself entirely to theology, producing the fragmentary notes collected posthumously as the Pensées.",
    significance: "Pascal is the course's crucial transitional figure: a man who mastered the new science and then confronted its terrifying implications. His 'Two Infinities' places the self between an infinite universe and an infinitely small world, with no stable ground. The Baroque unit crystallizes around his question: now that the cosmos is vast and indifferent, what is left of human dignity?",
    portrait: "/images/portraits/portrait-pascal-blaise.jpg",
  },
  {
    id: "milton",
    name: "John Milton",
    dates: "1608–1674",
    field: "Poet & Political Pamphleteer",
    units: ["02-baroque"],
    bio: "An English poet who devoted his early career to elaborate self-preparation for a great poetic work, then spent his middle decades as a polemicist for the Commonwealth that executed Charles I. He went blind in 1651, continuing to work through dictation. Paradise Lost was composed after the Restoration had politically defeated everything Milton had fought for — a blind, aging man dictating the greatest epic in English to his daughters.",
    significance: "Paradise Lost is a Baroque masterwork: vast scale, cosmic contrasts, theological drama, and a style of extraordinary elaboration. But it is also a poem about defeat — about what freedom costs when it is used badly, and whether a just God can be reconciled with a suffering world. Milton's Satan, who chooses Hell over submission, is one of literature's great anti-heroes — and one of its most dangerous.",
    portrait: "/images/portraits/portrait-milton-john.jpg",
  },
  {
    id: "newton",
    name: "Isaac Newton",
    dates: "1643–1727",
    field: "Physicist & Mathematician",
    units: ["02-baroque", "03-enlightenment"],
    bio: "Born prematurely on Christmas Day (by the old calendar), Newton worked in near-isolation at Cambridge and during two plague years in Lincolnshire, during which he developed calculus, the theory of gravity, and the laws of motion. He was also an obsessive alchemist, a biblical chronologist, and Warden of the Royal Mint. He died a virgin, having devoted little of his life to anything other than work.",
    significance: "The Principia Mathematica (1687) is the scientific revolution's crowning achievement — a mathematical framework that explains everything from falling apples to planetary orbits. Newton gives the Enlightenment its foundation: if the universe operates by discoverable laws, reason can in principle explain everything. Pope's couplet captures the cultural mood: 'God said, Let Newton be! and all was Light.'",
    portrait: "/images/portraits/portrait-newton-isaac.jpg",
  },
  {
    id: "cavendish",
    name: "Margaret Cavendish",
    dates: "1623–1673",
    field: "Writer, Philosopher & Scientist",
    units: ["02-baroque"],
    bio: "Duchess of Newcastle and one of the most prolific writers of the seventeenth century, Cavendish wrote poetry, plays, autobiography, natural philosophy, and what is considered one of the first science fiction novels — The Blazing World (1666). She was the first woman admitted to attend a meeting of the Royal Society, though never as a member. Contemporaries called her 'Mad Madge'; she called herself a 'Margaret the First.'",
    significance: "Cavendish's Blazing World imagines a utopian world where a woman has absolute intellectual and political authority — a direct challenge to the institutional structures that excluded women from the scientific revolution. She raises questions about who gets to pursue knowledge, and on whose terms, that the Baroque unit's male thinkers largely ignore.",
    portrait: "/images/portraits/portrait-cavendish-margaret.jpg",
  },
  {
    id: "lanyer",
    name: "Aemilia Lanyer",
    dates: "1569–1645",
    field: "Poet",
    units: ["02-baroque"],
    bio: "Daughter of a Venetian court musician and mistress to Queen Elizabeth's Lord Chamberlain, Lanyer published Salve Deus Rex Judaeorum in 1611 — the first book of original poetry published by a woman in England. Her poem includes 'Eve's Apology in Defense of Women,' which reinterprets the Fall to argue that Adam bore greater moral responsibility than Eve.",
    significance: "Lanyer challenges the foundational narrative that has justified women's subordination for over a millennium. Her 'Eve's Apology' asks: who controls the interpretation of the stories that shape our culture? And what happens when a woman claims the authority to reread those stories? The question is directly relevant to Paradise Lost and to every subsequent period's engagement with inherited authority.",
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
    id: "rousseau",
    name: "Jean-Jacques Rousseau",
    dates: "1712–1778",
    field: "Philosopher & Writer",
    units: ["03-enlightenment", "04-romanticism"],
    bio: "A Genevan-born philosopher who spent much of his life in Paris and in conflict with everyone around him, Rousseau argued that human beings are naturally good but corrupted by civilization — a direct challenge to Hobbes and a radical revision of the Enlightenment's faith in reason and progress. He abandoned his five children to an orphanage. He died convinced he was being persecuted. He was probably right.",
    significance: "Rousseau appears twice in this course because he belongs to two periods. As Enlightenment critic, his concept of amour-propre — the corrupting need to be esteemed by others — is the key to Pride and Prejudice's social dynamics. As Romantic pioneer, his Confessions — the first modern autobiography — opens the door to radical emotional self-disclosure and individual uniqueness that defines the Romantic era.",
    portrait: "/images/portraits/portrait-rousseau-jean-jacques.jpg",
  },
  {
    id: "kant",
    name: "Immanuel Kant",
    dates: "1724–1804",
    field: "Philosopher",
    units: ["03-enlightenment"],
    bio: "A Prussian philosopher who spent his entire life within 50 miles of his birthplace, Kant almost never traveled, never married, and was famous for the clock-like regularity of his daily walks. His three Critiques — Pure Reason, Practical Reason, and Judgment — rewrote the foundations of epistemology, ethics, and aesthetics. He claimed that reading Hume 'awakened him from his dogmatic slumber.'",
    significance: "Kant's motto for the Enlightenment — Sapere aude, 'dare to know' — captures the period's core challenge to intellectual timidity. His distinction between the public use of reason (always free) and private obedience (sometimes required) provides a framework for understanding how the Enlightenment thinks about the individual's relationship to institutions — including its central argument against Hobbes.",
    portrait: "/images/portraits/portrait-kant-immanuel.jpg",
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
    id: "shelley_pbs",
    name: "Percy Bysshe Shelley",
    dates: "1792–1822",
    field: "Poet & Essayist",
    units: ["04-romanticism"],
    bio: "Expelled from Oxford for co-authoring a pamphlet on atheism, eloped with two women (the second was Mary Godwin, future author of Frankenstein), and spent most of his adult life in Italy, producing some of the greatest lyric poetry in English. He drowned in a sailing accident at 29. A Defence of Poetry was written in 1821 in response to a friend's essay arguing that poetry was useless in the modern age.",
    significance: "Shelley's Defence is the Romantic manifesto for the imagination's supremacy: poets are 'the unacknowledged legislators of the world' because they perceive the hidden connections and values that analytical reason misses. His distinction between reason (which enumerates) and imagination (which perceives value) is the Romantic era's core epistemological claim.",
    portrait: "/images/portraits/portrait-shelley-percy.jpg",
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
    bio: "A former Unitarian minister from Boston who resigned his pulpit after his first wife's death and developed a philosophy of self-reliance, individual spiritual experience, and the transcendent unity of nature. He was the center of the Transcendentalist circle that included Thoreau, Margaret Fuller, and the young Melville's acquaintance. His essays are written in a style of concentrated, aphoristic intensity — sentences that demand to be read slowly.",
    significance: "Emerson's Nature provides the philosophical vocabulary for Melville's ocean: the Romantic sublime as the ego-dissolving encounter with something vast enough to break ordinary perception. His 'transparent eyeball' — becoming nothing, seeing all — is the ecstatic version of what Ishmael pursues. Ahab is Emersonian self-reliance pushed past the point of catastrophe.",
    portrait: "/images/portraits/portrait-emerson-ralph.jpg",
  },
  {
    id: "marx",
    name: "Karl Marx",
    dates: "1818–1883",
    field: "Philosopher & Political Economist",
    units: ["04-romanticism"],
    bio: "A German philosopher who spent most of his adult life in London in near-poverty, supported by his collaborator Friedrich Engels. Marx combined Hegel's dialectical method, Ricardo's political economy, and the Romantic critique of industrial capitalism into a theory of history as class struggle. The Communist Manifesto (1848), written with Engels, is the shortest and most consequential of his works.",
    significance: "Marx and Engels appear in the Romanticism unit because the Manifesto is, among other things, a Romantic critique of Enlightenment rationality applied to economics. The bourgeoisie has rationalized everything — and in doing so has made the world knowable and profitable at the cost of making it inhuman. 'All that is solid melts into air' is a Romantic lament in revolutionary clothing.",
    portrait: "/images/portraits/portrait-marx-karl.jpg",
  },
  {
    id: "schiller",
    name: "Friedrich Schiller",
    dates: "1759–1805",
    field: "Playwright, Poet & Philosopher",
    units: ["04-romanticism"],
    bio: "A German playwright and poet whose early plays — The Robbers, Don Carlos — made him famous across Europe and inspired Beethoven (who set his 'Ode to Joy' in the Ninth Symphony). His later theoretical works, especially the Letters on the Aesthetic Education of Man (1795), developed a philosophy of art as the activity through which human beings achieve their fullest integration of reason and feeling.",
    significance: "Schiller's concept of the 'play drive' — the synthesis of the sensuous and rational that is achieved through aesthetic experience — offers a philosophical framework for the Romantic privileging of art and imagination. His argument that art is not a luxury but the activity through which we become whole has direct bearing on Melville's encyclopedic, formally daring novel.",
    portrait: "/images/portraits/portrait-schiller-friedrich.jpg",
  },
  {
    id: "melville",
    name: "Herman Melville",
    dates: "1819–1891",
    field: "Novelist & Short Story Writer",
    units: ["04-romanticism"],
    bio: "Born in New York City to a family that fell into poverty after his father's death, Melville went to sea as a young man, was briefly held captive by Polynesian islanders, and served on a naval vessel before returning to write novels based on his experiences. Moby-Dick (1851) was a commercial failure; he published Bartleby, the Scrivener in 1853 and Benito Cereno in 1855, also to limited recognition. He died in obscurity; the 20th century rediscovered him.",
    significance: "Melville's three texts form the Romanticism unit's core — each a different angle on the period's central questions. Moby-Dick is the Romantic sublime pushed to catastrophe. 'Bartleby' is passive resistance as existential statement. Benito Cereno stages the political nightmare hidden beneath apparent order. Together they trace the Romantic era's optimism about individual vision into its darkest consequences.",
    portrait: "/images/portraits/portrait-melville-herman.jpg",
  },
  // ── MODERNISM ─────────────────────────────────────────────────────────────
  {
    id: "nietzsche",
    name: "Friedrich Nietzsche",
    dates: "1844–1900",
    field: "Philosopher",
    units: ["05-modernism"],
    bio: "A German philosopher and classical philologist who spent his productive years in boarding houses across Switzerland and Italy, suffering from severe migraines and increasingly precarious health. He published books of increasing radicalism and brilliance through the 1880s, then collapsed in Turin in 1889 — reportedly throwing his arms around a horse being beaten — and spent his final eleven years in mental incapacity.",
    significance: "Nietzsche's 'Parable of the Madman' is the foundational text of Modernist crisis: God is dead, and we have killed him — but this is not liberation, it is catastrophe. Without the structure God provided (meaning, morality, purpose), the universe is 'an infinite nothing.' The Modernist period is, in large part, the cultural working-out of what Nietzsche's madman announces.",
    portrait: "/images/portraits/portrait-nietzsche-friedrich.jpg",
  },
  {
    id: "freud",
    name: "Sigmund Freud",
    dates: "1856–1939",
    field: "Neurologist & Founder of Psychoanalysis",
    units: ["05-modernism"],
    bio: "A Viennese neurologist who developed psychoanalysis through his clinical work with patients suffering from hysteria and other psychological conditions. His theory of the unconscious — a realm of repressed desires and memories that shapes behavior without conscious knowledge — transformed Western culture's understanding of the self. He fled Vienna after the Nazi annexation in 1938 and died in London the following year.",
    significance: "Freud destroys the Enlightenment's confident rational subject: the self is not unified, not fully self-knowing, and not in charge of its own decisions. Civilization and Its Discontents extends the analysis to society: the repression that makes civilization possible also produces chronic unhappiness and, in extreme cases, the redirected aggression of warfare and atrocity. The Modernist fractured self traces directly to Freud.",
    portrait: "/images/portraits/portrait-freud-sigmund.jpg",
  },
  {
    id: "wittgenstein",
    name: "Ludwig Wittgenstein",
    dates: "1889–1951",
    field: "Philosopher",
    units: ["05-modernism"],
    bio: "Born into one of the wealthiest families in Vienna, Wittgenstein gave away his entire inheritance, worked as a village schoolteacher, a gardener, and a hospital porter at various points in his life. He wrote two philosophies that contradict each other — the Tractatus (1922) and the Philosophical Investigations (1953) — and regarded both as significant. He is the only philosopher in history to have started two major philosophical movements.",
    significance: "The Tractatus attempts to draw the limits of what language can meaningfully say — and concludes that the most important questions (ethics, meaning, the nature of existence) fall outside those limits: 'Whereof one cannot speak, thereof one must be silent.' This is the ultimate epistemological crisis: not just that knowledge has limits, but that the very tools we use to think about limits are inadequate to the task.",
    portrait: "/images/portraits/portrait-wittgenstein-ludwig.jpg",
  },
  {
    id: "einstein",
    name: "Albert Einstein",
    dates: "1879–1955",
    field: "Theoretical Physicist",
    units: ["05-modernism"],
    bio: "Born in Ulm, Germany, Einstein published four papers in 1905 — his 'miracle year' — that included the special theory of relativity and the equation E=mc². He developed the general theory of relativity between 1907 and 1915, replacing Newton's conception of gravity with a framework in which mass curves spacetime itself. He received the Nobel Prize in 1921. After the Nazi seizure of power he emigrated to the United States and spent his final decades at the Institute for Advanced Study in Princeton. He spent the last years of his life attempting — unsuccessfully — to develop a unified field theory.",
    significance: "Einstein's work does not merely refine Newton; it demonstrates that Newton's absolute space and time were useful fictions. The speed of light is constant; everything else — simultaneity, length, mass — is relative to the observer's frame. This is the scientific embodiment of the Modernist crisis of objectivity: there is no view from nowhere, no fixed framework from which to measure everything else. Eilenberger's four philosophers were living through the cultural shock wave of exactly this discovery.",
    portrait: "/images/portraits/portrait-einstein-albert.jpg",
  },
  {
    id: "dubois",
    name: "W.E.B. Du Bois",
    dates: "1868–1963",
    field: "Sociologist, Historian & Civil Rights Leader",
    units: ["05-modernism"],
    bio: "The first Black American to receive a PhD from Harvard, Du Bois spent his career combining rigorous scholarship, political activism, and literary art. The Souls of Black Folk (1903) established him as the foremost intellectual of Black American life in the early twentieth century. He debated Washington, co-founded the NAACP, edited The Crisis for decades, and died in Ghana at 95, the day before the March on Washington.",
    significance: "Du Bois's concept of 'double consciousness' — seeing yourself always through the eyes of a world that regards you with contempt — is the immediate philosophical context for Invisible Man. Where European Modernists experience the fractured self as an existential condition, Du Bois locates that fracture in the specific historical violence of American racial hierarchy. Students who understand Du Bois understand what Ellison's narrator is fighting against.",
    portrait: "/images/portraits/portrait-dubois-web.jpg",
  },
  {
    id: "washington",
    name: "Booker T. Washington",
    dates: "1856–1915",
    field: "Educator & Political Leader",
    units: ["05-modernism"],
    bio: "Born enslaved in Virginia, Washington became the most powerful Black American political figure of the late 19th and early 20th centuries through his leadership of the Tuskegee Institute and his policy of accommodation with white supremacy — accepting political disenfranchisement and social segregation in exchange for economic opportunity and vocational education. He wielded influence through a network of patronage that later became known as the 'Tuskegee Machine.'",
    significance: "Washington's Atlanta Exposition Address defines one pole of the debate that structures Invisible Man: work within the system, accept constraints, demonstrate economic value, and gradual dignity will follow. Ellison's Dr. Bledsoe is Washington's strategy taken to its cynical extreme — the man who has mastered the performance of accommodation while wielding real power behind the scenes.",
    portrait: "/images/portraits/portrait-washington-bt.jpg",
  },
  {
    id: "ellison",
    name: "Ralph Ellison",
    dates: "1913–1994",
    field: "Novelist & Essayist",
    units: ["05-modernism"],
    bio: "Born in Oklahoma City, Ellison studied music at Tuskegee Institute before coming to New York in 1936, where he was mentored by Richard Wright and immersed himself in both the Harlem cultural scene and the European modernist tradition. Invisible Man (1952), his only completed novel, won the National Book Award and is consistently ranked among the greatest American novels. He worked on a second novel for forty years without finishing it.",
    significance: "Ellison synthesizes the entire course in a single novel: the medieval question of the individual's place in a divinely ordered hierarchy becomes the specifically American question of race; the Renaissance's self-creating individual confronts a society that denies his existence; the Romantic visionary is rendered invisible by systems of power; the Modernist fragmented self is expressed through a jazz-inflected narrative form that is itself a political act.",
    portrait: "/images/portraits/portrait-ellison-ralph.jpg",
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
  },
  {
    id: "martini",
    name: "Simone Martini",
    dates: "c. 1284–1344",
    field: "Painter",
    units: ["00-medieval"],
    bio: "A Sienese painter who worked at the papal court in Avignon and was a friend of the poet Petrarch, Martini created some of the most refined and courtly images of the late medieval period. His Annunciation altarpiece (1333) achieves an extraordinary elegance within the gold-ground tradition — the angel Gabriel and the Virgin rendered with a delicacy that borders on the Gothic. Petrarch famously asked him to paint a portrait of Laura.",
    significance: "Martini's Annunciation illustrates the defining characteristics of medieval visual theology: gold ground as sacred space, the event happening outside ordinary time and place, figures whose gestures and expressions communicate spiritual states rather than psychological realism. The contrast with Renaissance portraiture — which puts specific individuals in specific spaces — is the visual history of the period shift in one comparison.",
  },
  {
    id: "perotinus",
    name: "Pérotin",
    dates: "c. 1160–c. 1230",
    field: "Composer",
    units: ["00-medieval"],
    bio: "A composer associated with the Notre Dame school in Paris — the first major center of written polyphonic music — Pérotin expanded the two-voice organum of his predecessor Léonin into three and four simultaneous voices. Almost nothing is known of his life; his name appears in a single 13th-century treatise. His surviving works include Viderunt omnes and Sederunt principes, massive four-voice works that were revolutionary in their time.",
    significance: "Pérotin represents the birth of Western harmony: the moment when a single chant melody becomes the foundation for multiple independent voices moving simultaneously. His slow-moving tenor (the original chant) supporting faster, interweaving upper voices establishes the basic texture of Western polyphony — the template that Palestrina will refine and Bach will push to its ultimate complexity.",
  },
  {
    id: "leonardo",
    name: "Leonardo da Vinci",
    dates: "1452–1519",
    field: "Painter, Sculptor & Polymath",
    units: ["01-renaissance"],
    bio: "Born illegitimate in the Tuscan village of Vinci, Leonardo was apprenticed to the Florentine painter Verrocchio and became the most versatile intellect of the Renaissance — painter, sculptor, architect, musician, mathematician, engineer, anatomist, botanist, and geologist. He left only about 15 completed paintings, thousands of notebook pages, and an influence on Western art that has never been surpassed. The Last Supper and the Mona Lisa are two of the most analyzed works in human history.",
    significance: "Leonardo embodies the Renaissance ideal of the uomo universale — the universal man who excels in all domains — that Pico's 'Oration on the Dignity of Man' theorizes. His insistence on direct observation of nature over received authority anticipates Galileo; his anatomical dissections are empirical science applied to the body. He is also the course's first example of individual artistic genius as a cultural value.",
  },
  {
    id: "michelangelo",
    name: "Michelangelo Buonarroti",
    dates: "1475–1564",
    field: "Sculptor, Painter & Architect",
    units: ["01-renaissance"],
    bio: "A Florentine sculptor who spent most of his career in Rome, Michelangelo produced the Pietà, the David, the Sistine Chapel ceiling, and the design of St. Peter's Basilica — four of the most celebrated works in the history of art — each in a different medium and each on an enormous scale. He lived to 88 and worked to the end, outlasting the High Renaissance and becoming an old man in a Mannerist world that had already begun to react against his influence.",
    significance: "The Sistine Chapel ceiling is the Renaissance program made visual: human figures of heroic scale and beauty, bodies expressing the full range of human emotion, the story of Creation rendered as the story of human potential. Michelangelo's nudes are Pico's self-creating human made flesh — and the contrast with medieval sacred art (flat, gold-backed, hierarchically arranged) is the visual measure of the period shift.",
  },
  {
    id: "raphael",
    name: "Raphael",
    dates: "1483–1520",
    field: "Painter & Architect",
    units: ["01-renaissance"],
    bio: "Born Raffaello Sanzio in Urbino, Raphael came to Rome in 1508 and spent the remaining twelve years of his short life producing some of the most harmonious and technically accomplished paintings of the Renaissance. His School of Athens — depicting the great philosophers of antiquity gathered in a single idealized space — is the Renaissance's self-portrait as intellectual program. He died on his 37th birthday, possibly of exhaustion from overwork.",
    significance: "The School of Athens gathers Plato, Aristotle, Socrates, Pythagoras, and Euclid in a single architectural space — the Renaissance dream of recovering and synthesizing all ancient wisdom. The painting embodies the period's confidence that human reason, properly directed, can comprehend the whole of knowledge. The contrast with medieval manuscripts, where ancient authorities appear as texts rather than people, captures the shift in historical self-understanding.",
  },
  {
    id: "josquin",
    name: "Josquin des Prez",
    dates: "c. 1450–1521",
    field: "Composer",
    units: ["01-renaissance"],
    bio: "The most celebrated composer of the Renaissance, Josquin worked at courts and churches across Italy and France — including the Sistine Chapel choir — before retiring to his native Low Countries. Luther praised him as 'master of the notes'; his contemporaries regarded him as the first composer whose personal style was unmistakably his own. More spurious works were attributed to him than to any other composer of the era.",
    significance: "Josquin represents the height of Renaissance polyphony in the secular mode: multiple independent voices of equal importance, weaving together in patterns of extraordinary contrapuntal sophistication while maintaining a clarity and expressiveness that the earlier, more rigid style had not achieved. His Ave Maria demonstrates the same principles as Palestrina — voices in balanced, rational harmony — but with greater expressive freedom.",
  },
  {
    id: "tallis",
    name: "Thomas Tallis",
    dates: "c. 1505–1585",
    field: "Composer",
    units: ["01-renaissance"],
    bio: "An English composer who survived the entire English Reformation — serving Henry VIII, Edward VI, Mary I, and Elizabeth I in turn, navigating the shift from Catholic to Protestant worship with remarkable diplomatic skill. His Spem in Alium (c. 1570) is a motet for 40 independent voices arranged in eight choirs of five voices each — the most technically complex choral work of the Renaissance.",
    significance: "Tallis demonstrates that Renaissance polyphony reached its apex not in Rome but in England, and that the Reformation did not simply destroy the Catholic musical tradition but transformed it. His ability to compose in both Catholic and Protestant styles illustrates the period's central tension between institutional authority and individual conscience — the same tension that Luther dramatized in theology and Shakespeare in drama.",
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
    id: "boucher",
    name: "François Boucher",
    dates: "1703–1770",
    field: "Painter",
    units: ["03-enlightenment"],
    bio: "The premier painter of the French Rococo and court painter to Louis XV, Boucher produced paintings, tapestries, porcelain designs, and theater sets in prodigious quantities. A favorite of Madame de Pompadour, he painted mythological scenes, pastoral idylls, and portraits with an ornamental elegance that became the defining image of Ancien Régime French culture. Diderot criticized him savagely; posterity has been kinder.",
    significance: "Boucher's work represents the Enlightenment aristocratic ideal — decorative, pleasurable, technically brilliant, and deliberately untroubled by the period's deeper questions. His mythological paintings translate classical subjects into the language of contemporary French court life, normalizing privilege and beauty as natural conditions. The contrast with Wollstonecraft's critique of women's ornamental education is the period's central political tension made visual.",
  },
  {
    id: "haydn",
    name: "Joseph Haydn",
    dates: "1732–1809",
    field: "Composer",
    units: ["03-enlightenment"],
    bio: "An Austrian composer who spent nearly 30 years as court musician to the Esterházy family at their remote Hungarian palace — isolated from the musical world but free to experiment without competition. He effectively invented the string quartet and the Classical symphony, establishing the formal structures that Mozart would perfect and Beethoven would explode. In his 60s, freed from Esterházy service after the prince's death, he made two triumphant visits to London.",
    significance: "Haydn is the architect of Classical form — the man who took the emerging sonata principle and systematized it into the string quartet and the symphony. His String Quartet Op. 33 demonstrates the conversational equality that is Classical chamber music's social ideal: four instruments, each with its own voice, debating and agreeing within a structure of transparent rationality. The musical equivalent of polite Enlightenment discourse.",
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
  },
  {
    id: "debussy",
    name: "Claude Debussy",
    dates: "1862–1918",
    field: "Composer",
    units: ["04-romanticism"],
    bio: "A French composer who rejected the German Romantic tradition dominated by Wagner and developed an alternative musical language drawing on pentatonic scales, non-functional harmonies, and the Indonesian gamelan music he heard at the 1889 Paris Exhibition. His Prélude à l'après-midi d'un faune (1894) and La Mer (1905) created a style known as Impressionism — though Debussy disliked the term.",
    significance: "Debussy represents the transition from Romantic to Modern: he dissolves the clear harmonic progressions and goal-directed melodies of the Romantic tradition into textures of color and atmosphere. His music doesn't develop in the direction of resolution — it floats. This suspension of harmonic direction is the musical equivalent of the Romantic fascination with states of feeling that resist analysis — the beginning of the dissolution that Schoenberg will complete.",
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
  // ── COMPOSERS ─────────────────────────────────────────────────────────────
  {
    id: "palestrina",
    name: "Giovanni Pierluigi da Palestrina",
    dates: "c. 1525–1594",
    field: "Composer",
    units: ["01-renaissance"],
    bio: "The most celebrated composer of Renaissance polyphony, Palestrina spent most of his career at various Roman churches including St. Peter's Basilica. His music was held up as the model of correct Catholic sacred style after the Council of Trent — serene, balanced, and controlled. He is the only Renaissance composer to have a legendary narrative attached to his name: the probably false but enduring story that his Missa Papae Marcelli saved polyphony from being banned by the Church.",
    significance: "Palestrina's Sicut Cervus is the course's demonstration of Renaissance polyphony: multiple independent voices woven into seamless, balanced harmony. The sonic equivalent of Renaissance perspective — individual elements, each with their own line, coexisting in rationally ordered space. The shift from this to Baroque chiaroscuro is as dramatic in music as it is in painting.",
  },
  {
    id: "bach",
    name: "Johann Sebastian Bach",
    dates: "1685–1750",
    field: "Composer",
    units: ["02-baroque"],
    bio: "Born in Eisenach into a dynasty of musicians, Bach spent his career as a court musician and church organist in various German cities, working in relative obscurity. He had 20 children (7 survived him), wrote around 1,100 known works, and was largely forgotten after his death until Mendelssohn revived the St. Matthew Passion in 1829. He never traveled far from central Germany, never met Handel, and probably never heard most of his own major works performed well.",
    significance: "Bach's fugues are the musical equivalent of Milton's syntax: a single theme introduced, then taken up, inverted, extended, and combined with countersubjects across multiple voices into structures of staggering intellectual complexity. The Toccata and Fugue demonstrates the Baroque's central tension — expressive freedom (toccata) and intellectual rigor (fugue) — as a single, unified statement.",
    portrait: "/images/portraits/portrait-bach-johann.jpg",
  },
  {
    id: "handel",
    name: "George Frideric Handel",
    dates: "1685–1759",
    field: "Composer",
    units: ["02-baroque"],
    bio: "Born the same year as Bach in Halle, Germany, Handel became the foremost opera composer in Europe before shifting, after a series of commercial failures, to the oratorio form. Messiah (1741) was composed in a legendary 24 days of sustained inspiration and premiered in Dublin to immediate acclaim. He spent most of his adult life in London, became a British citizen, and died one of the most celebrated musicians in Europe.",
    significance: "Where Bach's music rewards solitary study and careful listening, Handel's Messiah is designed for public experience — monumental, dramatic, emotionally overwhelming. The Hallelujah Chorus is the Baroque's democratic sublime: its audience famously rises to its feet and has never quite sat down again.",
    portrait: "/images/portraits/portrait-handel-george.jpg",
  },
  {
    id: "mozart",
    name: "Wolfgang Amadeus Mozart",
    dates: "1756–1791",
    field: "Composer",
    units: ["03-enlightenment"],
    bio: "Born in Salzburg to a court musician who recognized and aggressively cultivated his son's extraordinary gifts, Mozart toured Europe as a child prodigy, then spent his adult years in Vienna, where he achieved fame but not financial security. He died at 35 from an illness that remains disputed, leaving an unfinished Requiem. He composed over 600 works, and every form he touched he improved.",
    significance: "Mozart is the course's sonic equivalent of Austen: wit, clarity, perfect formal control, genuine emotional depth expressed through elegant structure. Eine kleine Nachtmusik is textbook Classical sonata form; the Piano Concerto No. 21's slow movement shows how Classical restraint can produce an almost unbearable beauty. The emotional range is real — but feeling is always shaped by form.",
    portrait: "/images/portraits/portrait-mozart-wolfgang.jpg",
  },
  {
    id: "beethoven",
    name: "Ludwig van Beethoven",
    dates: "1770–1827",
    field: "Composer",
    units: ["04-romanticism"],
    bio: "Born in Bonn, Beethoven moved to Vienna at 22 and spent the rest of his life there. He began losing his hearing in his late 20s and was completely deaf for the final decade of his life — during which he composed the Ninth Symphony, the late string quartets, and the Missa Solemnis, some of the most transcendent music ever written. He never married, had a famously chaotic domestic life, and was a passionate supporter of revolutionary ideals.",
    significance: "Beethoven is the hinge figure between Classical and Romantic: his Fifth Symphony uses Classical sonata form but charges it with Romantic emotional force — those four notes pursued with obsessive intensity through an entire movement. He is the first composer whose inner emotional life is understood as the primary subject of his music, establishing the Romantic ideal of the artist-as-heroic-individual.",
    portrait: "/images/portraits/portrait-beethoven-ludwig.jpg",
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
];

// ─── INDEX BY ID ─────────────────────────────────────────────────────────────
const PEOPLE_INDEX = Object.fromEntries(PEOPLE.map((p) => [p.id, p]));

// ─── UNIT COLOR MAP ──────────────────────────────────────────────────────────
const UNIT_COLORS = {
  "00-medieval":     { bg: "#1a1510", accent: "#8B7355", text: "#C4A878" },
  "01-renaissance":  { bg: "#0f1a10", accent: "#4A7A4A", text: "#7AB87A" },
  "02-baroque":      { bg: "#1a0f0f", accent: "#8B3A3A", text: "#C47A7A" },
  "03-enlightenment":{ bg: "#0f1520", accent: "#3A5A8B", text: "#7AAAC4" },
  "04-romanticism":  { bg: "#1a0f1a", accent: "#7A3A8B", text: "#B47AC4" },
  "05-modernism":    { bg: "#0f0f0f", accent: "#4A4A4A", text: "#AAAAAA" },
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

  const primaryUnit = person.units[0];
  const colors = UNIT_COLORS[primaryUnit] || UNIT_COLORS["05-modernism"];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(4px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(480px, 100vw)",
          height: "100vh",
          backgroundColor: "#111",
          borderLeft: `1px solid ${colors.accent}44`,
          display: "flex",
          flexDirection: "column",
          fontFamily: "'Libre Baskerville', Georgia, serif",
          overflowY: "auto",
          animation: "slideIn 0.25s ease-out",
        }}
      >
        {/* Top accent bar */}
        <div style={{ height: "3px", backgroundColor: colors.accent, flexShrink: 0 }} />

        {/* Header */}
        <div style={{
          padding: "32px 32px 24px",
          borderBottom: `1px solid ${colors.accent}33`,
          flexShrink: 0,
          backgroundColor: colors.bg,
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: "16px", flex: 1, paddingRight: "16px" }}>
              {person.portrait && (
                <img
                  src={person.portrait}
                  alt={person.name}
                  style={{
                    width: "72px",
                    height: "72px",
                    borderRadius: "4px",
                    objectFit: "cover",
                    flexShrink: 0,
                    border: `1px solid ${colors.accent}44`,
                    filter: "grayscale(20%)",
                  }}
                />
              )}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: "11px",
                  color: colors.text,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  fontFamily: "'DM Sans', sans-serif",
                  marginBottom: "8px",
                  fontWeight: 500,
                }}>
                  {person.field}
                </div>
                <h2 style={{
                  fontSize: "clamp(20px, 3vw, 26px)",
                  fontWeight: 700,
                  color: "#F0EAE0",
                  margin: "0 0 6px 0",
                  lineHeight: 1.2,
                }}>
                  {person.name}
                </h2>
                <div style={{
                  fontSize: "14px",
                  color: "#888",
                  fontStyle: "italic",
                  fontFamily: "'DM Sans', sans-serif",
                }}>
                  {person.dates}
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: `1px solid ${colors.accent}44`,
                color: "#888",
                cursor: "pointer",
                fontSize: "18px",
                padding: "6px 10px",
                borderRadius: "3px",
                lineHeight: 1,
                transition: "all 0.15s",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.accent;
                e.currentTarget.style.color = colors.text;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${colors.accent}44`;
                e.currentTarget.style.color = "#888";
              }}
            >
              ✕
            </button>
          </div>

          {/* Unit tags */}
          <div style={{ display: "flex", gap: "6px", marginTop: "14px", flexWrap: "wrap" }}>
            {person.units.map((u) => {
              const c = UNIT_COLORS[u] || UNIT_COLORS["05-modernism"];
              const labels = {
                "00-medieval": "Medieval",
                "01-renaissance": "Renaissance",
                "02-baroque": "Baroque",
                "03-enlightenment": "Enlightenment",
                "04-romanticism": "Romanticism",
                "05-modernism": "Modernism",
              };
              return (
                <span key={u} style={{
                  fontSize: "10px",
                  padding: "3px 8px",
                  borderRadius: "2px",
                  backgroundColor: `${c.accent}22`,
                  border: `1px solid ${c.accent}55`,
                  color: c.text,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                }}>
                  Unit {u.slice(0, 2).replace("0", "").padStart(2, "0")} · {labels[u]}
                </span>
              );
            })}
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "28px 32px", flex: 1 }}>
          {/* Bio */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{
              fontSize: "10px",
              color: colors.text,
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              marginBottom: "12px",
            }}>
              Life & Work
            </div>
            <p style={{
              fontSize: "15px",
              lineHeight: 1.8,
              color: "#C8C0B4",
              margin: 0,
            }}>
              {person.bio}
            </p>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", backgroundColor: `${colors.accent}33`, marginBottom: "28px" }} />

          {/* Significance */}
          <div>
            <div style={{
              fontSize: "10px",
              color: colors.text,
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 600,
              marginBottom: "12px",
            }}>
              Significance for This Course
            </div>
            <p style={{
              fontSize: "15px",
              lineHeight: 1.8,
              color: "#C8C0B4",
              margin: 0,
            }}>
              {person.significance}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          padding: "16px 32px",
          borderTop: `1px solid ${colors.accent}22`,
          fontSize: "12px",
          color: "#555",
          fontFamily: "'DM Sans', sans-serif",
          flexShrink: 0,
        }}>
          Press <kbd style={{ background: "#222", border: "1px solid #444", borderRadius: "3px", padding: "1px 5px", fontSize: "11px" }}>Esc</kbd> to close
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ─── BIO LINK ─────────────────────────────────────────────────────────────────
// Usage: <BioLink id="galileo">Galileo</BioLink>
export function BioLink({ id, children, onOpen }) {
  const person = PEOPLE_INDEX[id];
  if (!person) return <span>{children}</span>;

  const primaryUnit = person.units[0];
  const colors = UNIT_COLORS[primaryUnit] || UNIT_COLORS["05-modernism"];

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
        color: colors.text,
        textDecoration: "underline",
        textDecorationStyle: "dotted",
        textDecorationColor: `${colors.accent}88`,
        textUnderlineOffset: "3px",
        transition: "color 0.15s, text-decoration-color 0.15s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "#F0EAE0";
        e.currentTarget.style.textDecorationColor = colors.accent;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = colors.text;
        e.currentTarget.style.textDecorationColor = `${colors.accent}88`;
      }}
    >
      {children}
    </button>
  );
}

// ─── DEMO APP ─────────────────────────────────────────────────────────────────
// Groups people by period for browsable demo
const UNIT_ORDER = [
  "00-medieval", "01-renaissance", "02-baroque",
  "03-enlightenment", "04-romanticism", "05-modernism",
];
const UNIT_LABELS = {
  "00-medieval": "The High Middle Ages",
  "01-renaissance": "Renaissance & Reformation",
  "02-baroque": "The Baroque",
  "03-enlightenment": "The Enlightenment",
  "04-romanticism": "Romanticism",
  "05-modernism": "Modernism",
};
const UNIT_TEXTS = {
  "00-medieval": "Foundation",
  "01-renaissance": "Hamlet",
  "02-baroque": "Paradise Lost",
  "03-enlightenment": "Pride and Prejudice",
  "04-romanticism": "Moby-Dick",
  "05-modernism": "Invisible Man",
};

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

  const groups = groupByPrimaryUnit(PEOPLE);

  const filteredPeople = searchQuery.trim()
    ? PEOPLE.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.field.toLowerCase().includes(searchQuery.toLowerCase()) ||
        UNIT_LABELS[p.units[0]].toLowerCase().includes(searchQuery.toLowerCase())
      )
    : null;

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#0a0a0a",
      color: "#e8e0d4",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{
        borderBottom: "1px solid #1e1e1e",
        padding: "48px 40px 32px",
        maxWidth: "900px",
        margin: "0 auto",
      }}>
        <p style={{ fontSize: "11px", color: "#555", letterSpacing: "2.5px", textTransform: "uppercase", margin: "0 0 12px", fontWeight: 600 }}>
          AP Literature · Background Materials
        </p>
        <h1 style={{
          fontFamily: "'Libre Baskerville', Georgia, serif",
          fontSize: "clamp(26px, 4vw, 38px)",
          fontWeight: 700,
          margin: "0 0 10px",
          color: "#F0EAE0",
          letterSpacing: "-0.5px",
        }}>
          Biographical Index
        </h1>
        <p style={{ fontSize: "15px", color: "#666", margin: "0 0 28px", lineHeight: 1.6, maxWidth: "540px" }}>
          Writers, philosophers, artists, and composers across the course — click any name to open a biographical sketch.
        </p>

        {/* Search */}
        <div style={{ position: "relative", maxWidth: "360px" }}>
          <span style={{
            position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)",
            color: "#555", fontSize: "14px", pointerEvents: "none",
          }}>⌕</span>
          <input
            type="text"
            placeholder="Search by name, field, or period…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "100%",
              padding: "10px 14px 10px 34px",
              backgroundColor: "#141414",
              border: "1px solid #2a2a2a",
              borderRadius: "4px",
              color: "#e8e0d4",
              fontSize: "14px",
              fontFamily: "'DM Sans', sans-serif",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 40px 80px" }}>

        {filteredPeople ? (
          // Search results
          <div>
            <div style={{ padding: "24px 0 16px", fontSize: "13px", color: "#555" }}>
              {filteredPeople.length} result{filteredPeople.length !== 1 ? "s" : ""}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "8px" }}>
              {filteredPeople.map((p) => (
                <PersonCard key={p.id} person={p} onClick={() => setActivePerson(p.id)} />
              ))}
            </div>
          </div>
        ) : (
          // Grouped by unit
          UNIT_ORDER.map((unitId) => {
            const people = groups[unitId];
            if (!people.length) return null;
            const colors = UNIT_COLORS[unitId];
            return (
              <div key={unitId} style={{ paddingTop: "48px" }}>
                {/* Unit header */}
                <div style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "12px",
                  marginBottom: "20px",
                  paddingBottom: "12px",
                  borderBottom: `1px solid ${colors.accent}33`,
                }}>
                  <h2 style={{
                    fontFamily: "'Libre Baskerville', Georgia, serif",
                    fontSize: "18px",
                    fontWeight: 700,
                    color: colors.text,
                    margin: 0,
                  }}>
                    {UNIT_LABELS[unitId]}
                  </h2>
                  <span style={{ fontSize: "13px", color: "#555", fontStyle: "italic" }}>
                    {UNIT_TEXTS[unitId]}
                  </span>
                </div>

                {/* Person cards */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: "8px",
                }}>
                  {people.map((p) => (
                    <PersonCard key={p.id} person={p} onClick={() => setActivePerson(p.id)} />
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Biography panel */}
      {activePerson && (
        <BiographyPanel
          personId={activePerson}
          onClose={() => setActivePerson(null)}
        />
      )}
    </div>
  );
}

function PersonCard({ person, onClick }) {
  const colors = UNIT_COLORS[person.units[0]] || UNIT_COLORS["05-modernism"];
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? colors.bg : "#111",
        border: hovered ? `1px solid ${colors.accent}88` : "1px solid #1e1e1e",
        borderRadius: "4px",
        padding: "14px 16px",
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.18s",
        transform: hovered ? "translateY(-1px)" : "none",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      {person.portrait ? (
        <img
          src={person.portrait}
          alt={person.name}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "3px",
            objectFit: "cover",
            flexShrink: 0,
            filter: "grayscale(30%)",
            opacity: hovered ? 1 : 0.75,
            transition: "opacity 0.18s",
          }}
        />
      ) : (
        <div style={{
          width: "40px",
          height: "40px",
          borderRadius: "3px",
          flexShrink: 0,
          backgroundColor: `${colors.accent}22`,
          border: `1px solid ${colors.accent}44`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "13px",
          fontWeight: 600,
          color: colors.text,
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: "0.02em",
          opacity: hovered ? 1 : 0.7,
          transition: "opacity 0.18s",
        }}>
          {person.name.split(' ').filter(w => w[0] === w[0]?.toUpperCase()).slice(-2).map(w => w[0]).join('')}
        </div>
      )}
      <div>
        <div style={{
          fontSize: "15px",
          fontFamily: "'Libre Baskerville', Georgia, serif",
          color: hovered ? colors.text : "#D4CCC0",
          marginBottom: "3px",
          transition: "color 0.18s",
        }}>
          {person.name}
        </div>
        <div style={{
          fontSize: "12px",
          color: "#555",
          fontFamily: "'DM Sans', sans-serif",
        }}>
          {person.dates} · {person.field}
        </div>
      </div>
    </button>
  );
}

export { PEOPLE, PEOPLE_INDEX, BiographyPanel };
