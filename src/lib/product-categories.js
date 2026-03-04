export const categorySlugMap = {
  Pappbecher: 'pappbecher',
  Plastikbecher: 'plastikbecher',
  Mehrwegbecher: 'mehrwegbecher',
  Eisbecher: 'eisbecher',
  Deckel: 'deckel',
  Lebensmittelpapier: 'lebensmittelpapier',
  Papiertragetaschen: 'papiertragetaschen',
  Schalen: 'schalen',
  Lebensmittelboxen: 'lebensmittelboxen',
  Servietten: 'servietten',
  Zubehoer: 'zubehoer'
};

export const slugToCategoryMap = Object.fromEntries(
  Object.entries(categorySlugMap).map(([name, slug]) => [slug, name])
);

export const categoryPageMeta = {
  pappbecher: {
    h1: 'Pappbecher Kategorie fuer den taeglichen Markenauftritt',
    description:
      'In dieser Kategorie finden Sie Pappbecher und passende Deckel in einer klaren B2B-Struktur. Bechergroessen von 100ml bis 470ml sowie Wunschgroessen lassen sich direkt konfigurieren. Fuer das Branding stehen 1-, 2- oder 3+ Farbkonzepte zur Auswahl, kombiniert mit einwandiger oder doppelwandiger Stabilitaet. Preise starten bei CHF 0.11 pro Becher und bleiben auf planbare Mengenprozesse ausgerichtet.'
  },
  plastikbecher: {
    h1: 'Plastikbecher fuer Events und Systemgastronomie',
    description:
      'Standard und individualisierte Plastikbecher mit konsistenter Materialqualitaet, klarer Markenwirkung und passenden Deckeloptionen fuer skalierbare B2B-Prozesse.'
  },
  mehrwegbecher: {
    h1: 'Mehrwegbecher fuer wiederkehrende B2B-Kreislaufmodelle',
    description:
      'Mehrwegbecher in gaengigen Volumenstufen fuer robuste Umlaufprozesse. Auf Wunsch individualisiert fuer konsistente Markenwahrnehmung am POS.'
  },
  eisbecher: {
    h1: 'Eisbecher mit klarer Markenfuehrung',
    description:
      'Eisbecher und Eisbecher Individual mit klaren Groessenoptionen (100ml, 200ml, 250ml, 300ml), flexibler Wunschgroesse und B2B-konformer Mengenlogik ab 2.500 Stueck.'
  },
  deckel: {
    h1: 'Deckelprogramm fuer alle Becherformate',
    description:
      'Standard-, Dome-, Flat- und Plastikdeckel, filterbar nach Bechergroesse. So bleiben Passform, Handling und Produktbild durchgaengig professionell.'
  },
  lebensmittelpapier: {
    h1: 'Papier und Einschlagmaterial fuer Food-Konzepte',
    description:
      'Fettdichtes Papier und Lebensmittelpapier in mehreren Formaten und Farbvarianten. Voll individualisierbar fuer hygienische, markenkonsistente To-go-Prozesse.'
  },
  papiertragetaschen: {
    h1: 'Tueten und Taschen fuer Take-away und Retail',
    description:
      'Von Doenertaschen ueber Blockboden- bis Brottueten: strukturierte Formate, definierte Druckoptionen und robuste Materialauswahl fuer B2B-Bedarfe.'
  },
  schalen: {
    h1: 'Schalen und Bowls fuer frische Konzepte',
    description:
      'Salatschalen in den gaengigsten Volumen mit passenden Deckeln in Papier oder Kunststoff. Standard und individualisiert fuer einen konsistenten Markenauftritt.'
  },
  lebensmittelboxen: {
    h1: 'Boxenprogramm von Pizza bis Takeaway',
    description:
      'Pizza-, Takeaway-, Nudel-, Burger- und Pommesboxen mit klaren Formaten, drucktechnischen Optionen und planbarer Beschaffung fuer professionelle Ablauforganisation.'
  },
  servietten: {
    h1: 'Servietten und Hygieneprodukte fuer den Gastkontakt',
    description:
      'Servietten, Serviettentaschen und Erfrischungstuecher in standardisierten Formaten und Druckoptionen fuer konsistente Markenfuehrung bis ins Detail.'
  },
  zubehoer: {
    h1: 'Zubehoer fuer Komplettloesungen',
    description:
      'Alle Deckeltypen und erweiterte Verpackungsoptionen als zusaetzliche Module fuer skalierbare B2B-Projekte mit einheitlicher Spezifikation.'
  }
};
