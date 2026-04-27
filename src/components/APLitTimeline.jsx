import { useState, useRef, useEffect, useMemo } from "react";

const ERAS = [
  { id: "renaissance", label: "Renaissance & Reformation", range: [1590, 1660], color: "#C9A24B" },
  { id: "enlightenment", label: "Civil War & Enlightenment", range: [1640, 1720], color: "#6B8CA3" },
  { id: "revolution", label: "Revolution & Romanticism", range: [1750, 1840], color: "#8B7355" },
  { id: "victorian", label: "Industrial Age & Realism", range: [1840, 1900], color: "#5A7A6A" },
  { id: "modern", label: "World Wars & Modernism", range: [1900, 1955], color: "#A03828" },
];

const TEXTS = [
  {
    year: 1601,
    title: "Hamlet",
    author: "Shakespeare",
    era: "renaissance",
    note: "Written during the final years of Elizabeth I's reign, amid anxieties about succession, religious conflict, and the nature of political legitimacy. The play's preoccupation with surveillance, performance, and rotten states reflects a culture saturated with espionage and courtly duplicity.",
  },
  {
    year: 1667,
    title: "Paradise Lost",
    author: "Milton",
    era: "enlightenment",
    note: "Published after the collapse of the English Commonwealth Milton had served. A blind, politically defeated poet reimagines the Fall as a drama of liberty, obedience, and the cost of rebellion — themes inseparable from the Civil War and Restoration he had just lived through.",
  },
  {
    year: 1813,
    title: "Pride and Prejudice",
    author: "Austen",
    era: "revolution",
    note: "Written during the Napoleonic Wars, though the novel's world seems to exist at a careful remove from them. Austen's focus on marriage, property, and social mobility maps the anxieties of a gentry class navigating economic upheaval and the pressures of inherited versus earned status.",
  },
  {
    year: 1851,
    title: "Moby-Dick",
    author: "Melville",
    era: "victorian",
    note: "Published in the shadow of the 1848 European revolutions and amid the American crisis over slavery that would soon erupt into civil war. Melville's doomed ship, crewed by a global labor force under a monomaniacal captain, is an allegory critics have read against empire, capitalism, and democratic failure.",
  },
  {
    year: 1952,
    title: "Invisible Man",
    author: "Ellison",
    era: "modern",
    note: "Arrives in the early Cold War, after two world wars had shattered European confidence in progress and reason. Ellison draws on Modernist fragmentation — Joyce, Dostoevsky, jazz — to narrate Black American experience through a form that insists on complexity over propaganda.",
  },
];

const EVENTS = [
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

  // Civil War & Enlightenment
  { year: 1642, title: "English Civil War begins", type: "political", era: "enlightenment", desc: "Parliament and Crown go to war, a conflict that will produce regicide, republic, and ultimately shape modern ideas about constitutional government." },
  { year: 1649, title: "Execution of Charles I", type: "political", era: "enlightenment", desc: "The king is publicly beheaded — an act of revolutionary violence that shocks Europe and raises fundamental questions about sovereignty and divine right." },
  { year: 1651, title: "Hobbes publishes Leviathan", type: "cultural", era: "enlightenment", desc: "Writing from the wreckage of civil war, Hobbes argues that only absolute sovereign authority can prevent the 'war of all against all.'" },
  { year: 1660, title: "Restoration of Charles II", type: "political", era: "enlightenment", desc: "The monarchy returns after the failed Commonwealth, but on altered terms — Parliament's power is permanently enlarged." },
  { year: 1666, title: "Great Fire of London", type: "political", era: "enlightenment", desc: "The fire destroys medieval London; Christopher Wren's rebuilding — including St. Paul's Cathedral — will physically reshape the city." },
  { year: 1687, title: "Newton's Principia", type: "cultural", era: "enlightenment", desc: "Newton publishes his laws of motion and universal gravitation, providing the mathematical foundation for the scientific revolution." },
  { year: 1688, title: "Glorious Revolution", type: "political", era: "enlightenment", desc: "James II is deposed in favor of William and Mary, establishing parliamentary supremacy and constitutional monarchy in England." },
  { year: 1689, title: "Locke's Two Treatises of Government", type: "cultural", era: "enlightenment", desc: "Locke articulates natural rights and government by consent — ideas that will fuel revolutions in America and France a century later." },
  { year: 1710, title: "Statute of Anne", type: "cultural", era: "enlightenment", desc: "The first modern copyright law, reflecting the emergence of authorship as a legally recognized form of intellectual property." },

  // Revolution & Romanticism
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

  // Industrial Age & Realism
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

function getEraForYear(year) {
  for (const era of ERAS) {
    if (year >= era.range[0] && year <= era.range[1]) return era;
  }
  return ERAS[0];
}

function EventCard({ event, isText, eraColor, onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.72)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "20px",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg-raised)",
          border: "1px solid var(--rule-strong)",
          padding: "32px",
          maxWidth: "520px",
          width: "100%",
          position: "relative",
          boxShadow: "0 24px 64px rgba(0,0,0,.6)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "14px", right: "16px",
            background: "none", border: "none",
            color: "var(--ink-soft)",
            fontSize: "22px", lineHeight: 1, cursor: "pointer", padding: "2px 6px",
          }}
        >
          ✕
        </button>

        {/* Left accent swatch */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0,
          width: "4px",
          background: eraColor || "var(--acc)",
        }} />

        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: "10.5px",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: eraColor || "var(--acc)",
          marginBottom: "10px",
        }}>
          {isText
            ? `AP Literature Text · ${event.year}`
            : `${event.type === "political" ? "Political · Military" : "Intellectual · Cultural"} · ${event.year}`}
        </div>

        <h2 style={{
          fontFamily: "var(--font-display)",
          fontWeight: 400,
          fontSize: "22px",
          lineHeight: 1.2,
          color: "var(--ink)",
          margin: "0 0 16px",
        }}>
          {isText ? <><em>{event.title}</em> — {event.author}</> : event.title}
        </h2>

        <p style={{
          fontFamily: "var(--font-display)",
          fontSize: "15px",
          lineHeight: 1.75,
          color: "var(--ink-mute)",
          margin: 0,
        }}>
          {isText ? event.note : event.desc}
        </p>
      </div>
    </div>
  );
}

export default function APLitTimeline() {
  const [activeEra, setActiveEra] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedIsText, setSelectedIsText] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const scrollRef = useRef(null);

  const filteredEvents = useMemo(() => {
    let evts = activeEra ? EVENTS.filter((e) => e.era === activeEra) : EVENTS;
    if (filterType === "political") evts = evts.filter((e) => e.type === "political");
    if (filterType === "cultural") evts = evts.filter((e) => e.type === "cultural");
    return evts;
  }, [activeEra, filterType]);

  const visibleTexts = useMemo(() => {
    return activeEra ? TEXTS.filter((t) => t.era === activeEra) : TEXTS;
  }, [activeEra]);

  const allItems = useMemo(() => {
    const items = [
      ...filteredEvents.map((e) => ({ ...e, isText: false })),
      ...visibleTexts.map((t) => ({ ...t, isText: true })),
    ];
    items.sort((a, b) => a.year - b.year);
    return items;
  }, [filteredEvents, visibleTexts]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [activeEra, filterType]);

  const activeEraData = ERAS.find((e) => e.id === activeEra);
  const selectedEraColor = selectedEvent
    ? (ERAS.find((e) => e.id === selectedEvent.era)?.color || "var(--acc)")
    : "var(--acc)";

  // shared tab button style factory
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
      {/* Era filter tabs */}
      <div style={{
        borderBottom: "1px solid var(--rule)",
        background: "var(--bg)",
        padding: "0 var(--gutter)",
      }}>
        <div style={{
          maxWidth: "860px",
          margin: "0 auto",
          display: "flex",
          flexWrap: "wrap",
          gap: "2px",
          padding: "12px 0",
        }}>
          <button
            onClick={() => setActiveEra(null)}
            style={tabStyle(activeEra === null, "var(--rule-strong)")}
          >
            All Eras
          </button>
          {ERAS.map((era) => (
            <button
              key={era.id}
              onClick={() => setActiveEra(era.id)}
              style={tabStyle(activeEra === era.id, era.color)}
            >
              {era.label}
            </button>
          ))}
        </div>
      </div>

      {/* Type filter + era range strip */}
      <div style={{
        borderBottom: "1px solid var(--rule)",
        background: activeEraData ? `${activeEraData.color}11` : "var(--bg-sunken)",
        padding: "8px var(--gutter)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "8px",
      }}>
        <div style={{ display: "flex", gap: "2px" }}>
          {[
            { key: "all", label: "All Events" },
            { key: "political", label: "Political · Military" },
            { key: "cultural", label: "Intellectual · Cultural" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilterType(f.key)}
              style={tabStyle(filterType === f.key, "var(--rule-strong)")}
            >
              {f.label}
            </button>
          ))}
        </div>
        {activeEraData && (
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.1em",
            color: "var(--ink-soft)",
          }}>
            {activeEraData.range[0]} – {activeEraData.range[1]}
          </span>
        )}
      </div>

      {/* Timeline */}
      <div ref={scrollRef} style={{
        padding: "32px var(--gutter) 96px",
        maxWidth: "860px",
        margin: "0 auto",
      }}>
        {allItems.map((item, i) => {
          const showYear = i === 0 || item.year !== allItems[i - 1].year;
          const era = ERAS.find((e) => e.id === item.era) || ERAS[0];

          if (item.isText) {
            return (
              <div key={`text-${item.title}`} style={{ display: "flex", gap: "20px", marginBottom: "24px", alignItems: "flex-start" }}>
                {/* Year */}
                <div style={{
                  width: "52px",
                  flexShrink: 0,
                  textAlign: "right",
                  paddingTop: "14px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: era.color,
                }}>
                  {showYear ? item.year : ""}
                </div>

                {/* Dot + line */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: "20px", paddingTop: "16px" }}>
                  <div style={{
                    width: "12px", height: "12px",
                    borderRadius: "50%",
                    background: era.color,
                    border: "2px solid var(--bg)",
                    flexShrink: 0,
                  }} />
                  <div style={{ width: "1px", flex: 1, background: "var(--rule)", minHeight: "20px" }} />
                </div>

                {/* Card */}
                <div
                  onClick={() => { setSelectedEvent(item); setSelectedIsText(true); }}
                  style={{
                    flex: 1,
                    position: "relative",
                    padding: "14px 18px 14px 22px",
                    background: "var(--bg-raised)",
                    border: "1px solid var(--rule)",
                    cursor: "pointer",
                    transition: "background 150ms, border-color 150ms",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#221d19";
                    e.currentTarget.style.borderColor = "var(--rule-strong)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--bg-raised)";
                    e.currentTarget.style.borderColor = "var(--rule)";
                  }}
                >
                  {/* Left accent swatch */}
                  <div style={{
                    position: "absolute", left: 0, top: 0, bottom: 0,
                    width: "4px",
                    background: era.color,
                  }} />

                  <div style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "10.5px",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: era.color,
                    marginBottom: "6px",
                  }}>
                    AP Literature Text
                  </div>
                  <div style={{
                    fontFamily: "var(--font-display)",
                    fontStyle: "italic",
                    fontSize: "17px",
                    color: "var(--ink)",
                    lineHeight: 1.25,
                  }}>
                    {item.title}{" "}
                    <span style={{ fontStyle: "normal", color: "var(--ink-mute)" }}>— {item.author}</span>
                  </div>
                  <div style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    letterSpacing: "0.06em",
                    color: "var(--ink-soft)",
                    marginTop: "6px",
                  }}>
                    Click to read historical context
                  </div>
                </div>
              </div>
            );
          }

          return (
            <div key={`evt-${item.title}-${item.year}`} style={{ display: "flex", gap: "20px", marginBottom: "14px", alignItems: "flex-start" }}>
              {/* Year */}
              <div style={{
                width: "52px",
                flexShrink: 0,
                textAlign: "right",
                paddingTop: "10px",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                color: showYear ? "var(--ink-soft)" : "transparent",
              }}>
                {item.year}
              </div>

              {/* Dot + line */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: "20px", paddingTop: "13px" }}>
                <div style={{
                  width: "7px", height: "7px",
                  borderRadius: "50%",
                  background: item.type === "political" ? "var(--ink-soft)" : "var(--ink-mute)",
                  flexShrink: 0,
                }} />
                <div style={{ width: "1px", flex: 1, background: "var(--rule)", minHeight: "10px" }} />
              </div>

              {/* Card */}
              <div
                onClick={() => { setSelectedEvent(item); setSelectedIsText(false); }}
                style={{
                  flex: 1,
                  padding: "9px 14px",
                  background: "var(--bg-raised)",
                  border: "1px solid var(--rule)",
                  cursor: "pointer",
                  transition: "background 150ms, border-color 150ms",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#221d19";
                  e.currentTarget.style.borderColor = "var(--rule-strong)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--bg-raised)";
                  e.currentTarget.style.borderColor = "var(--rule)";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "9.5px",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--ink-soft)",
                    flexShrink: 0,
                  }}>
                    {item.type === "political" ? "POL" : "CUL"}
                  </span>
                  <span style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "14px",
                    color: "var(--ink-mute)",
                  }}>
                    {item.title}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{
        position: "fixed",
        bottom: 0, left: 0, right: 0,
        background: "var(--bg)",
        borderTop: "1px solid var(--rule)",
        padding: "10px var(--gutter)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "28px",
        backdropFilter: "blur(8px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "var(--acc)", border: "2px solid var(--bg)" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10.5px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-soft)" }}>AP Lit Text</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--ink-soft)" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10.5px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-soft)" }}>Political · Military</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "var(--ink-mute)" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "10.5px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink-soft)" }}>Intellectual · Cultural</span>
        </div>
      </div>

      {selectedEvent && (
        <EventCard
          event={selectedEvent}
          isText={selectedIsText}
          eraColor={selectedEraColor}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}
