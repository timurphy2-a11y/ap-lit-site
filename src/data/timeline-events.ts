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
    { year: 1378, title: 'The Great Schism divides the papacy', type: 'political' },
  ],
  '01-renaissance': [
    { year: 1440, title: 'Gutenberg develops movable-type printing in Europe, c. 1440', type: 'cultural' },
    { year: 1486, title: 'Pico composes the <em>Oration on the Dignity of Man</em>', type: 'cultural' },
    { year: 1517, title: 'Luther circulates the Ninety-Five Theses', type: 'political' },
    { year: 1543, title: 'Copernicus publishes <em>De revolutionibus</em>', type: 'cultural' },
    { year: 1601, title: '<em>Hamlet</em> first performed, c. 1601', type: 'cultural' },
  ],
  '02-baroque': [
    { year: 1618, title: "Defenestration of Prague; the Thirty Years' War begins", type: 'political' },
    { year: 1649, title: 'Charles I is tried and executed, ending the English Civil War in regicide', type: 'political' },
    { year: 1651, title: 'Hobbes publishes <em>Leviathan</em>', type: 'cultural' },
    { year: 1667, title: 'Milton publishes <em>Paradise Lost</em>', type: 'cultural' },
    { year: 1687, title: "Newton publishes <em>Principia</em>", type: 'cultural' },
  ],
  '03-enlightenment': [
    { year: 1748, title: 'Excavations begin at Pompeii', type: 'cultural' },
    { year: 1762, title: "Rousseau's Social Contract", type: 'cultural' },
    { year: 1776, title: 'American Declaration of Independence', type: 'political' },
    { year: 1789, title: 'French Revolution begins', type: 'political' },
    { year: 1793, title: 'Reign of Terror', type: 'political' },
  ],
  '04-romanticism': [
    { year: 1789, title: 'French Revolution begins', type: 'political' },
    { year: 1798, title: 'Wordsworth and Coleridge publish <em>Lyrical Ballads</em>', type: 'cultural' },
    { year: 1818, title: "Mary Shelley publishes <em>Frankenstein</em>", type: 'cultural' },
    { year: 1851, title: 'Great Exhibition opens; Melville publishes <em>Moby-Dick</em>', type: 'cultural' },
    { year: 1859, title: "Darwin publishes <em>On the Origin of Species</em>", type: 'cultural' },
  ],
  '05-modernism': [
    { year: 1903, title: 'W. E. B. Du Bois publishes <em>The Souls of Black Folk</em>', type: 'cultural' },
    { year: 1905, title: 'Albert Einstein publishes the special theory of relativity', type: 'cultural' },
    { year: 1914, title: 'World War I begins', type: 'political' },
    { year: 1916, title: 'The Great Migration accelerates; the Battle of the Somme begins', type: 'political' },
    { year: 1922, title: 'James Joyce publishes <em>Ulysses</em>; T. S. Eliot publishes <em>The Waste Land</em>', type: 'cultural' },
    { year: 1927, title: 'The Supreme Court decides <em>Buck v. Bell</em>', type: 'political' },
    { year: 1931, title: 'Kurt Gödel publishes the first incompleteness theorem', type: 'cultural' },
    { year: 1939, title: 'World War II begins', type: 'political' },
    { year: 1952, title: 'Ralph Ellison publishes <em>Invisible Man</em>', type: 'cultural' },
    { year: 1954, title: 'The Supreme Court decides <em>Brown v. Board of Education</em>', type: 'political' },
  ],
};
