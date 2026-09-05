export interface Epigraph {
  quote: string;
  attribution: string;
  gloss?: string;
}

export interface HubIntro {
  intro: string;
  kicker: string;
  epigraphs: [Epigraph, Epigraph];
  historicalMomentTitle: string;
}

export const HUB_DATA: Record<string, HubIntro> = {
  '00-medieval': {
    kicker: 'Foundation unit \u2014 establishes the intellectual baseline that all subsequent periods react against. Anchored, with the Renaissance unit, to Hamlet.',
    intro: 'The Medieval intellectual world is often caricatured as a \u201cDark Ages\u201d of superstition before science arrived. This is deeply unfair. St. Augustine dramatizes the soul\u2019s agonizing surrender to divine authority with a psychological penetration that anticipates modern autobiography. The anonymous monk who wrote \u201cThe Cloud of Unknowing\u201d explores the interior life with a rigorous precision that the mystics of no other era have surpassed. Adelard of Bath reasons through questions about the physical world with genuine empirical curiosity \u2014 within a framework where the answers are bounded by Aristotle and by faith, but the reasoning is serious. The Medieval worldview was sophisticated, internally coherent, and profoundly beautiful. Its core commitments \u2014 a divinely ordered universe, humanity in a fixed place within it, knowledge grounded in revelation, the individual\u2019s posture one of obedience and surrender \u2014 are precisely what every subsequent period will challenge, transform, or struggle to replace. Hamlet stands at the threshold of that challenge. Shakespeare\u2019s protagonist has a Renaissance mind but inhabits a Medieval world, a world of ghosts with unfinished business, divine judgment, hierarchical duty, and the certainty that the dead have claims on the living.',
    epigraphs: [
      {
        quote: 'In all our actions and thoughts let us give greater weight to divine love than to learning and argument. For love delights the soul and sweetens the conscience, drawing it away from the attraction of lesser delights and the appetite for personal distinction.',
        attribution: 'Richard Rolle, \u2018The Fire of Love\u2019, c.\u00a01343',
      },
      {
        quote: 'For the knowledge of any truth whatsoever man needs Divine help, that the intellect may be moved by God to its act.',
        attribution: 'Thomas Aquinas, \u2018Summa Theologica\u2019, 1274',
      },
    ],
    historicalMomentTitle: 'The World Holds',
  },

  '01-renaissance': {
    kicker: 'Transition unit: humanist recovery, religious division, and new forms of inquiry \u2014 anchored, with the Medieval unit, to Hamlet.',
    intro: 'Fourteenth- and fifteenth-century Italian humanists described their culture as a recovery. Petrarch searched for neglected classical texts and treated the study of language, history, and moral philosophy as preparation for active life. Florentine writers contrasted their own ambitions with an intervening age of decline. Artists and architects studied ancient forms as evidence that achievements lost to time could be attempted again. Palmieri\u2019s \u201cdawn of better things\u201d records the period\u2019s energizing belief that renewal had already begun. The recovery remained deeply Christian. Petrarch measured his worldly ambitions against Augustine; Pico della Mirandola joined Christian theology to Plato, Jewish Kabbalah, and other philosophical traditions; Savonarola demanded the moral purification of Florence. Renaissance culture produced confidence in human ability alongside arguments for stricter religious discipline. Other upheavals widened the conflict. Print accelerated the circulation of texts and disputes. Luther placed Scripture above papal authority and refused to retract teachings he believed the Word of God required. Copernicus reorganized the heavens through mathematics; Galileo used telescopic observation to challenge the inherited division between a changeable earth and perfect celestial spheres. Each controversy raised the same questions: who may interpret an authoritative text, what counts as evidence, and which institution may compel belief?',
    epigraphs: [
      {
        quote: 'It is but in our own day that men dare boast that they see the dawn of better things.',
        attribution: 'Matteo Palmieri, \u2018Della vita civile\u2019, c. 1435',
      },
      {
        quote: 'Therefore, Simplicius, come either with arguments or demonstrations and bring us no more texts and authorities, for our disputes are about the sensible world, and not one of paper.',
        attribution: 'Galileo Galilei, \u2018Dialogue Concerning the Two Chief World Systems\u2019, 1632',
      },
    ],
    historicalMomentTitle: 'The World Splits',
  },

  '02-baroque': {
    kicker: 'Anchor text: Paradise Lost — Milton\'s epic of freedom, obedience, and catastrophic choice.',
    intro: 'The Baroque inherits the Renaissance\u2019s daring and pays for it. The Reformation has torn Christendom apart, engendering the Thirty Years\u2019 War that devastates Central Europe. The English Civil War ends with the public beheading of a king. The universe revealed by the telescope turns out to be inconceivably vast, and the comfortable old picture of Earth at the center of a small, orderly cosmos has been permanently destroyed. Pascal places the human being between two infinities and asks whether we can bear the pressure of such a tenuous position. Hobbes surveys the wreckage of civil war and concludes that only absolute sovereign power can prevent the war of all against all. Lanyer defends Eve against the charge of responsibility for the Fall; Cavendish imagines a woman ruling a world she has reorganized from the ground up. This is the world in which Milton writes \u2018Paradise Lost\u2019: a world where freedom is real but dangerous, knowledge is powerful but insufficient, and the relationship between the individual and authority has become a matter of life and death.',
    epigraphs: [
      {
        quote: '\u00c8 del poeta il fin la meraviglia.',
        gloss: '\u201cThe aim of the poet is to astonish.\u201d',
        attribution: 'Giambattista Marino, \u2018Adone\u2019, 1623',
      },
      {
        quote: 'Man is but a reed, the most feeble thing in nature; but he is a thinking reed.',
        attribution: 'Blaise Pascal, \u2018Pens\u00e9es\u2019, 1670',
      },
    ],
    historicalMomentTitle: 'The World in Crisis',
  },

  '03-enlightenment': {
    kicker: 'Anchor text: Pride and Prejudice — Austen\'s laboratory for rational moral judgment and its limits.',
    intro: 'Enlightenment thinkers increasingly required inherited beliefs and institutions to justify themselves through evidence, argument, and public criticism. Newtonian natural philosophy showed the explanatory power of mathematics; Locke made political authority conditional on consent and the protection of rights; Kant called on readers to use their understanding without depending on another\u2019s direction. Print, periodicals, salons, coffeehouses, academies, and correspondence widened intellectual exchange, although access remained shaped by class, gender, religion, and empire.\n\nThe period never agreed on what reason could accomplish. Hume argued that experience cannot prove the necessary causal connections on which prediction depends. Rousseau traced inequality and vanity to social development. Smith made sympathy and the imagined judgment of an impartial spectator central to moral life. Wollstonecraft exposed the contradiction between universal reason and an education designed to keep women dependent.',
    epigraphs: [
      {
        quote: 'True Wit is Nature to advantage dress\u2019d,\nWhat oft was thought, but ne\u2019er so well express\u2019d.',
        attribution: 'Alexander Pope, \u2018An Essay on Criticism\u2019, 1711',
      },
      {
        quote: 'I came across the subject proposed by the Academy of Dijon as a prize essay for the following year: \u201cHas the progress of the sciences and arts done more to corrupt morals or improve them?\u201d The moment I read this I beheld another universe and became another man.',
        attribution: 'Jean-Jacques Rousseau, \u2018The Confessions\u2019, composed c. 1765\u20131770',
      },
    ],
    historicalMomentTitle: 'The World Shakes',
  },

  '04-romanticism': {
    kicker: 'Anchor text: Moby-Dick — Melville\'s Romantic obsession carried into an industrial world.',
    intro: 'Romanticism begins as a reaction and becomes a revolution. What it reacts against is the Enlightenment\u2019s confidence that reason is the supreme human faculty \u2014 that the world can be understood, organized, and improved through rational analysis. The core Romantic claim is that the most important truths about human experience cannot be reached by reason alone. They require imagination, feeling, and a willingness to confront that which exceeds our capacity to understand. Shelley elevates imagination over reason; Emerson dissolves the boundary between self and nature; Rousseau insists on the authority of individual feeling. This is the intellectual world of Melville\u2019s Moby-Dick \u2014 a novel that contains chapters on cetology and the technical details of whaling, but whose deepest subject is something that resists knowledge entirely: the white whale, blank and inscrutable, onto which Ahab projects all his fury and meaning, and which remains, finally, unknowable.',
    epigraphs: [
      {
        quote: 'For all good poetry is the spontaneous overflow of powerful feelings.',
        attribution: 'William Wordsworth, \u201cA Preface to Lyrical Ballads,\u201d 1800',
      },
      {
        quote: 'God is a poet, not a geometer.',
        attribution: 'Johann Georg Hamann, \u2018Aesthetics in a Nutshell\u2019, 1762',
      },
    ],
    historicalMomentTitle: 'The World Remade',
  },

  '05-modernism': {
    kicker: 'Anchor text: Invisible Man — Ellison\'s Modernist arc told from within the Black American experience.',
    intro: 'Modernism develops amid a crisis in inherited accounts of God, reason, history, and the coherent self. Nietzsche announces the death of God and asks who will create values after divine authority loses its force. Freud describes a mind divided by motives it cannot fully control. Einstein revises the measurements of space and time while preserving invariant physical laws. Wittgenstein asks what language can state clearly and what lies beyond its limits. Two world wars expose the capacity of modern states, industries, and bureaucracies to organize destruction on an unprecedented scale.\n\nThese crises do not produce one Modernist philosophy. They produce competing efforts to reconstruct the human person through psychoanalysis, physics, existentialism, Marxism, nationalism, and racial thought. Invisible Man enters that argument through Black American history: Jim Crow, the Great Migration, the legacies of Booker T. Washington and W. E. B. Du Bois, Harlem politics, and the Communist left. Ellison\u2019s narrator encounters institutions that explain him before they see him. His search for freedom therefore begins with a harder demand: to live within history without accepting any imposed role as his complete identity.',
    epigraphs: [
      {
        quote: 'Colour is the keyboard, the eyes are the hammers, the soul is the piano with its many strings. The artist is the hand which plays, touching one key or another, to cause vibrations in the soul.',
        attribution: 'Vasily Kandinsky, \u2018Concerning the Spiritual in Art\u2019, 1912',
      },
      {
        quote: 'Ours is the first period when man has become completely and totally problematical to himself, when he no longer knows what he is, but at the same time knows that he knows nothing.',
        attribution: 'Max Scheler, \u2018The Human Place in the Cosmos\u2019, 1928',
      },
    ],
    historicalMomentTitle: 'The World Breaks',
  },
};
