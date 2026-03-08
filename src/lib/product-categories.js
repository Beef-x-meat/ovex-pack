export const categorySlugMap = {
  Pappbecher:         'pappbecher',
  Plastikbecher:      'plastikbecher',
  Eisbecher:          'eisbecher',
  Lebensmittelboxen:  'lebensmittelboxen',
  Papiertragetaschen: 'papiertragetaschen',
  Servietten:         'servietten',
  Lebensmittelpapier: 'lebensmittelpapier',
};

export const slugToCategoryMap = Object.fromEntries(
  Object.entries(categorySlugMap).map(([name, slug]) => [slug, name])
);

export const categoryPageMeta = {
  pappbecher: {
    h1: 'Pappbecher & Deckel',
    description: 'FSC-zertifizierte Pappbecher in 5 Größen (100–470 ml), passende Deckel in 5 Materialvarianten – einwandig oder doppelwandig, mit 1–3+ Druckfarben. Ab 2.500 Stück.'
  },
  plastikbecher: {
    h1: 'Plastikbecher & Deckel',
    description: 'rPET-Plastikbecher in 5 Größen (350–700 ml) in Standard- oder Budget-Gewicht, mit passenden Deckeln in 3 Formen. Mit 1–3+ Druckfarben oder ohne Logo. Ab 2.500 Stück.'
  },
  eisbecher: {
    h1: 'Eisbecher',
    description: 'Fettdicht beschichtete Eisbecher aus FSC-Karton in 4 Größen (100–300 ml). Mit 1, 2 oder 3+ Druckfarben für Ihr Branding. Ab 2.500 Stück.'
  },
  lebensmittelboxen: {
    h1: 'Burger- & Foodboxen',
    description: 'Burgerboxen, Pommesboxen, Hamburger Menüboxen, Noodle- & Dönerboxen, Lunchboxen und Pizzaboxen – in Weiss, Kraft oder mit Ihrem Design. Ab 2.500 Stück.'
  },
  papiertragetaschen: {
    h1: 'Tragtaschen & Tüten',
    description: 'Kraft-Papiertragtaschen in 5 Größen (S bis XXL), in 90g oder 70g Papier, in Kraft oder Weiss. Mit 1–3+ Druckfarben auf einer oder mehreren Seiten. Ab 2.500 Stück.'
  },
  servietten: {
    h1: 'Servietten & Feuchttücher',
    description: 'Bedruckte Papiertücher in ¼- oder 1/8-Faltung und bedruckte Feuchttücher in 5 Größen – in Weiss oder Kraft, mit 1–3+ Druckfarben. Ab 10.000 Stück.'
  },
  lebensmittelpapier: {
    h1: 'Verpackungspapier',
    description: 'Fettdichtes Lebensmittelpapier in 5 Größen sowie Take-Away Verpackungspapier – in Weiss oder Kraft, mit 1–3+ Druckfarben. Bestelleinheit: KG.'
  },
};
