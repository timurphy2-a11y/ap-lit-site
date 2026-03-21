export interface Epigraph {
  quote: string;
  attribution: string;
}

export interface HubIntro {
  intro: string;
  epigraphs: [Epigraph, Epigraph];
  historicalMomentTitle: string;
}

export const HUB_DATA: Record<string, HubIntro> = {
  '00-medieval': {
    intro: 'This unit has no core literary text. Its purpose is different: it establishes the intellectual world that everything else in this course reacts against. Augustine dramatizes the soul\'s agonizing surrender to divine authority. The anonymous monk who wrote \u2018The Cloud of Unknowing\u2019 insists that God can only be reached by abandoning the intellect entirely. Adelard of Bath reasons his way through questions about the physical world \u2014 but within a framework where the answers are already bounded by Aristotle and by faith. The medieval worldview was not the ignorant "Dark Ages" of caricature; it was sophisticated, internally coherent, and profoundly beautiful. But its core commitments \u2014 a divinely ordered universe, humanity in a fixed place within it, knowledge grounded in revelation, the individual\u2019s posture one of obedience and surrender \u2014 are precisely what every subsequent period will challenge, transform, or struggle to replace.',
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
    intro: 'Something shifts in the fifteenth and sixteenth centuries \u2014 not all at once, and not without resistance, but unmistakably. The stable certainties of the medieval world come under pressure from every direction: Pico della Mirandola reimagines humanity as self-creating rather than divinely fixed; Copernicus displaces the earth from the center of the cosmos; Luther sets individual conscience against the authority of the Church; and Galileo insists on seeing for himself rather than trusting inherited texts. By the time Shakespeare writes \u2018Hamlet\u2019 at the turn of the seventeenth century, the old order is cracking open \u2014 and the play registers the exhilaration and the vertigo of living in a world where the familiar certainties no longer hold.',
    epigraphs: [
      {
        quote: 'The true work of art is but a shadow of the divine perfection.',
        attribution: 'Michelangelo Buonarroti',
      },
      {
        quote: 'Therefore, Simplicius, come either with Arguments or Demonstrations and bring us no more Texts and Authorities, for our disputes are about the Sensible World, and not one of Paper.',
        attribution: 'Galileo Galilei, \u2018Dialogue Concerning the Two Chief World Systems\u2019, 1632',
      },
    ],
    historicalMomentTitle: 'The World Splits',
  },

  '02-baroque': {
    intro: 'The Baroque inherits the Renaissance\u2019s daring and pays for it. The Reformation has torn Christendom apart, engendering the Thirty Years\u2019 War that devastates Central Europe. The English Civil War ends with the public beheading of a king. The universe revealed by the telescope turns out to be inconceivably vast, and the comfortable old picture of Earth at the center of a small, orderly cosmos has been permanently destroyed. Pascal places the human being between two infinities and asks whether we can bear it. Hobbes surveys the wreckage of civil war and concludes that only absolute sovereign power can prevent the war of all against all. Lanyer defends Eve against the charge of responsibility for the Fall; Cavendish imagines a woman ruling a world she has reorganized from the ground up. This is the world in which Milton writes \u2018Paradise Lost\u2019: a world where freedom is real but dangerous, knowledge is powerful but insufficient, and the relationship between the individual and authority has become a matter of life and death.',
    epigraphs: [
      {
        quote: '\u00c8 del poeta il fin la meraviglia. (\u201cThe aim of the poet is to astonish.\u201d)',
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
    intro: 'The Enlightenment attempts to resolve the Baroque\u2019s tensions by doubling down on reason. Newton has revealed a universe governed by mathematical laws; Locke has argued that legitimate government rests on consent; Kant has issued his rallying cry: \u2018Sapere aude\u2019 \u2014 dare to know. The battlefield gives way to the drawing room, and the dominant mood is one of confidence that rational inquiry can illuminate everything it touches. But the Enlightenment\u2019s most interesting thinkers know that moral knowledge \u2014 knowledge of other people, knowledge of yourself \u2014 is trickier than physics. Rousseau diagnoses \u2018amour-propre\u2019, the corrosive need to see yourself through others\u2019 eyes. Adam Smith argues that moral judgment depends on sympathetic imagination, not calculation. Austen\u2019s \u2018Pride and Prejudice\u2019 is a laboratory for testing these ideas: a novel in which intelligent people go wrong in their judgments and must learn, painfully, to see past the distortions of vanity and social performance.',
    epigraphs: [
      {
        quote: 'True Wit is Nature to advantage dress\u2019d, / What oft was thought, but ne\u2019er so well express\u2019d.',
        attribution: 'Alexander Pope, \u2018An Essay on Criticism\u2019, 1709',
      },
      {
        quote: 'I came across the subject proposed by the Academy of Dijon as a prize essay for the following year: \u201cHas the progress of the sciences and arts done more to corrupt morals or improve them?\u201d The moment I read this I beheld another universe and became another man.',
        attribution: 'Jean-Jacques Rousseau, \u2018The Confessions\u2019, 1769',
      },
    ],
    historicalMomentTitle: 'The World Shakes',
  },

  '04-romanticism': {
    intro: 'Romanticism begins as a reaction and becomes a revolution. What it reacts against is the Enlightenment\u2019s confidence that reason is the supreme human faculty \u2014 that the world can be understood, organized, and improved through rational analysis. Romanticism is, almost by definition, suspicious of neat summaries. But the core claim is something like this: the most important truths about human experience cannot be reached by reason alone. They require imagination, feeling, and a willingness to confront that which exceeds our capacity to understand. Shelley elevates imagination over reason; Emerson dissolves the boundary between self and nature; Rousseau insists on the authority of individual feeling. This is the intellectual world of Melville\u2019s fiction \u2014 a novel that contains chapters on cetology and the technical details of whaling, but whose deepest subject is something that resists knowledge entirely: the white whale, blank and inscrutable, onto which Ahab projects all his fury and meaning, and which remains, finally, unknowable.',
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
    intro: 'The old certainties are gone. Nietzsche announces that God is dead \u2014 and we have killed him. Freud argues that the self is not a unified rational agent but a battleground of unconscious drives. Einstein demonstrates that space and time are not absolute but relative. Wittgenstein concludes that language itself may be unable to express the things that matter most. The two World Wars have shattered the European confidence in progress and civilization that the Enlightenment bequeathed and the nineteenth century amplified. \u2018Invisible Man\u2019 is a Modernist novel in the European philosophical sense, but it is also a novel written from within a specifically Black American experience \u2014 shaped by the Great Migration, the debate between Washington and Du Bois, and the daily reality of being looked at without being seen. Ellison\u2019s narrator inherits Romanticism\u2019s intensity but discovers that the self is far more complicated, more fractured, and more vulnerable than the Romantics imagined.',
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
