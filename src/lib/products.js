const baseByCategory = {
  Pappbecher: { leadTime: '7-10 Werktage', minOrder: 2500, basePrice: 0.11, materials: ['FSC-Karton'] },
  Plastikbecher: { leadTime: '7-10 Werktage', minOrder: 1000, basePrice: 0.12, materials: ['rPET', 'PP'] },
  Mehrwegbecher: { leadTime: '10-14 Werktage', minOrder: 500, basePrice: 0.29, materials: ['PP Mehrweg'] },
  Eisbecher: { leadTime: '7-10 Werktage', minOrder: 2500, basePrice: 0.139, materials: ['FSC-Karton'] },
  Deckel: { leadTime: '5-8 Werktage', minOrder: 1000, basePrice: 0.04, materials: ['CPLA', 'PET', 'Papier'] },
  Lebensmittelpapier: { leadTime: '5-8 Werktage', minOrder: 2000, basePrice: 0.04, materials: ['Fettdichtes Papier'] },
  Papiertragetaschen: { leadTime: '8-12 Werktage', minOrder: 1000, basePrice: 0.16, materials: ['Papier Weiss', 'Papier Kraft'] },
  Lebensmittelboxen: { leadTime: '8-12 Werktage', minOrder: 800, basePrice: 0.24, materials: ['Karton Weiss', 'Karton Braun'] },
  Schalen: { leadTime: '7-10 Werktage', minOrder: 1000, basePrice: 0.18, materials: ['Karton', 'Faserverbund'] },
  Servietten: { leadTime: '10-14 Werktage', minOrder: 6000, basePrice: 0.08, materials: ['Papier'] },
  Zubehoer: { leadTime: '5-8 Werktage', minOrder: 1000, basePrice: 0.03, materials: ['Diverse Materialien'] }
};

function price(basePrice, delta = 0) {
  return `ab CHF ${(basePrice + delta).toFixed(2)} / Stueck`;
}

function createProduct({
  id,
  slug,
  name,
  category,
  tier = 'standard',
  badge = 'Eco / Standard',
  shortDescription,
  longDescription,
  leadTime,
  minOrder,
  priceHint,
  materials,
  features
}) {
  const base = baseByCategory[category] || baseByCategory.Zubehoer;
  return {
    id,
    slug,
    name,
    category,
    tier,
    badge,
    shortDescription: shortDescription || `${name} fuer professionelle B2B-Verpackungsprojekte.`,
    longDescription:
      longDescription ||
      `${name} ist auf B2B-Bedarfe mit stabiler Qualitaet, klaren Spezifikationen und planbarer Lieferung ausgelegt.`,
    leadTime: leadTime || base.leadTime,
    minOrder: minOrder || base.minOrder,
    priceHint: priceHint || price(base.basePrice),
    materials: materials || base.materials,
    features: features || [],
    modelUrl: ''
  };
}

const products = [
  // 1) Becher
  createProduct({
    id: 'p-001',
    slug: 'pappbecher-basic',
    name: 'Pappbecher',
    category: 'Pappbecher',
    tier: 'standard',
    badge: 'Eco / Standard',
    minOrder: 2500,
    priceHint: 'ab CHF 0.11 / Stueck',
    shortDescription: 'Pappbecher mit frei waehlbarer Groesse, Stabilitaet und Designstufe fuer den professionellen B2B-Einsatz.',
    features: [
      'Groessen: 100ml Espresso, 200ml, 240ml, 400ml, 470ml',
      'Wunschgroesse als Freitext moeglich',
      'Stabilitaet: Einwandig oder Doppelwandig',
      'Becherfarbe: Weiss, Schwarz oder Natur',
      'Design: 1 Farbe, 2 Farben oder 3+ Farben'
    ]
  }),
  createProduct({
    id: 'p-001i',
    slug: 'pappbecher-individual',
    name: 'Pappbecher Individual',
    category: 'Pappbecher',
    tier: 'individual',
    badge: 'Individual',
    minOrder: 2500,
    priceHint: 'ab CHF 0.17 / Stueck',
    shortDescription: 'Voll individualisierte Pappbecher mit frei waehlbarer Druckgestaltung fuer durchgaengige Markenpraesenz im B2B-Alltag.',
    features: [
      'Groessen: 100ml Espresso, 200ml, 240ml, 400ml, 470ml',
      'Wunschgroesse als Freitext moeglich',
      'Stabilitaet: Einwandig oder Doppelwandig',
      'Becherfarbe: Weiss, Schwarz oder Natur',
      'Design: 1 Farbe, 2 Farben oder 3+ Farben'
    ]
  }),
  createProduct({
    id: 'p-002',
    slug: 'pappbecher-deckel',
    name: 'Deckel fuer Pappbecher',
    category: 'Pappbecher',
    tier: 'standard',
    badge: 'Eco / Standard',
    minOrder: 2500,
    priceHint: 'ab CHF 0.04 / Stueck',
    shortDescription: 'Deckelprogramm fuer Pappbecher mit Deckeltyp- und Farbauswahl fuer den professionellen B2B-Einsatz.',
    materials: ['Standard', 'Karton', 'PLA', 'PET'],
    features: [
      'Groessen: 200ml, 240ml, 400ml, 470ml oder Wunschgroesse',
      'Deckeltyp: Standard, Karton, PLA Bio, PET flach, PET Dome',
      'Farben: Weiss, Schwarz oder Wunschfarbe',
      'Passend fuer professionelle Heissgetraenke-Anwendungen'
    ]
  }),
  createProduct({
    id: 'p-005',
    slug: 'plastikbecher-standard',
    name: 'Plastikbecher Standard',
    category: 'Plastikbecher',
    tier: 'standard',
    badge: 'Eco / Standard',
    features: ['Standard', 'Groessen: 350, 470, 500, 550, 700 ml']
  }),
  createProduct({
    id: 'p-006',
    slug: 'plastikbecher-individual',
    name: 'Plastikbecher Individualisiert',
    category: 'Plastikbecher',
    tier: 'individual',
    badge: 'Individual',
    priceHint: price(baseByCategory.Plastikbecher.basePrice, 0.06),
    leadTime: '6-9 Werktage',
    minOrder: 2000,
    features: ['Individualisiert', 'Max 6 Farben', 'Groessen: 350, 470, 500, 550, 700 ml']
  }),
  createProduct({
    id: 'p-007',
    slug: 'mehrwegbecher-basic',
    name: 'Mehrwegbecher Basic',
    category: 'Mehrwegbecher',
    tier: 'standard',
    badge: 'Eco / Standard',
    features: ['Basic', 'Groessen: 250, 300, 400, 500 ml']
  }),
  createProduct({
    id: 'p-008',
    slug: 'mehrwegbecher-individual',
    name: 'Mehrwegbecher Individualisiert',
    category: 'Mehrwegbecher',
    tier: 'individual',
    badge: 'Individual',
    priceHint: price(baseByCategory.Mehrwegbecher.basePrice, 0.06),
    features: ['Eco Batch', 'Individualisiert', 'Groessen: 250, 300, 400, 500 ml']
  }),
  createProduct({
    id: 'p-009',
    slug: 'eisbecher-standard',
    name: 'Eisbecher',
    category: 'Eisbecher',
    tier: 'standard',
    badge: 'Eco / Standard',
    minOrder: 2500,
    priceHint: 'ab CHF 0.139 / Stueck',
    features: [
      'Groessen: 100ml, 200ml, 250ml, 300ml',
      'Wunschgroesse als Freitext moeglich',
      'Design: 1 Farbe, 2 Farben, 3 und mehr Farben'
    ]
  }),
  createProduct({
    id: 'p-010',
    slug: 'eisbecher-individual',
    name: 'Eisbecher Individual',
    category: 'Eisbecher',
    tier: 'individual',
    badge: 'Individual',
    minOrder: 2500,
    leadTime: '6-9 Werktage',
    priceHint: 'ab CHF 0.169 / Stueck',
    features: [
      'Groessen: 100ml, 200ml, 250ml, 300ml',
      'Wunschgroesse als Freitext moeglich',
      'Design: 1 Farbe, 2 Farben, 3 und mehr Farben'
    ]
  }),

  // 2) Deckel
  createProduct({
    id: 'p-011',
    slug: 'deckel-standard',
    name: 'Standard Deckel',
    category: 'Deckel',
    features: ['Filterbar nach Bechergroesse', 'Passend fuer Papp- und Plastikbecher']
  }),
  createProduct({
    id: 'p-012',
    slug: 'deckel-dome-papier',
    name: 'Dome Deckel (Papier)',
    category: 'Deckel',
    tier: 'premium',
    badge: 'Premium',
    priceHint: price(baseByCategory.Deckel.basePrice, 0.02),
    features: ['Dome Form', 'Papierbasiert', 'Filterbar nach Bechergroesse']
  }),
  createProduct({
    id: 'p-013',
    slug: 'deckel-flat-papier',
    name: 'Flat Deckel (Papier)',
    category: 'Deckel',
    tier: 'premium',
    badge: 'Premium',
    priceHint: price(baseByCategory.Deckel.basePrice, 0.01),
    features: ['Flat Form', 'Papierbasiert', 'Filterbar nach Bechergroesse']
  }),
  createProduct({
    id: 'p-014',
    slug: 'deckel-plastik',
    name: 'Plastik Deckel',
    category: 'Deckel',
    features: ['Standard Kunststoff', 'Filterbar nach Bechergroesse']
  }),

  // 3) Papier & Einschlagmaterial
  createProduct({
    id: 'p-015',
    slug: 'fettdichtes-papier',
    name: 'Fettdichtes Papier',
    category: 'Lebensmittelpapier',
    tier: 'individual',
    badge: 'Individual',
    minOrder: 2000,
    features: ['Groessen: 500x350, 250x335, 250x167, 167x167', 'Farben: Weiss, Kraft, Gefaerbt']
  }),
  createProduct({
    id: 'p-016',
    slug: 'lebensmittelpapier',
    name: 'Lebensmittelpapier',
    category: 'Lebensmittelpapier',
    tier: 'individual',
    badge: 'Individual',
    minOrder: 2000,
    features: ['Groessen: 500x350, 250x335, 250x167, 167x167', 'Farben: Weiss, Kraft, Gefaerbt']
  }),

  // 4) Tueten & Taschen
  createProduct({
    id: 'p-017',
    slug: 'doenertaschen-standard',
    name: 'Doenertaschen Standard',
    category: 'Papiertragetaschen',
    features: ['Doenertaschen', 'Farben: Weiss / Braun']
  }),
  createProduct({
    id: 'p-018',
    slug: 'doenertaschen-individual',
    name: 'Doenertaschen Individualisiert',
    category: 'Papiertragetaschen',
    tier: 'individual',
    badge: 'Individual',
    minOrder: 3000,
    priceHint: price(baseByCategory.Papiertragetaschen.basePrice, 0.08),
    features: ['Doenertaschen', 'Farben: Weiss / Braun', 'Individualisiert']
  }),
  createProduct({
    id: 'p-019',
    slug: 'blockboden-tueten-standard',
    name: 'Blockboden-Tueten Standard',
    category: 'Papiertragetaschen',
    features: ['Groessen: 4L, 6L, 11L, 14L, 18L, 21L', 'Farben: Weiss / Braun']
  }),
  createProduct({
    id: 'p-020',
    slug: 'blockboden-tueten-individual',
    name: 'Blockboden-Tueten Individualisiert',
    category: 'Papiertragetaschen',
    tier: 'individual',
    badge: 'Individual',
    minOrder: 2500,
    priceHint: price(baseByCategory.Papiertragetaschen.basePrice, 0.06),
    features: ['Max 2 Farben Druck', 'Groessen: 4L, 6L, 11L, 14L, 18L, 21L']
  }),
  createProduct({
    id: 'p-021',
    slug: 'papiertueten-ohne-griff',
    name: 'Papiertueten ohne Griff',
    category: 'Papiertragetaschen',
    features: ['Bis 4 Farben Druck']
  }),
  createProduct({
    id: 'p-022',
    slug: 'papiertueten-gedrehter-griff',
    name: 'Papiertueten mit gedrehtem Griff',
    category: 'Papiertragetaschen',
    tier: 'premium',
    badge: 'Premium',
    priceHint: price(baseByCategory.Papiertragetaschen.basePrice, 0.05),
    features: ['Bis 4 Farben Druck', 'Gedrehter Griff']
  }),
  createProduct({
    id: 'p-023',
    slug: 'brottueten-standard',
    name: 'Brottueten Standard',
    category: 'Papiertragetaschen',
    features: ['Groessen: XS, S, M, L, L breit, XL, Sandwich, Baguette, 2x Baguette, Individuell', 'Farben: Weiss / Kraft']
  }),
  createProduct({
    id: 'p-024',
    slug: 'brottueten-individual',
    name: 'Brottueten Individualisiert',
    category: 'Papiertragetaschen',
    tier: 'individual',
    badge: 'Individual',
    minOrder: 3000,
    priceHint: price(baseByCategory.Papiertragetaschen.basePrice, 0.08),
    features: ['Max 2 Druckfarben', 'Farben: Weiss / Kraft']
  }),

  // 5) Schalen & Bowls
  createProduct({
    id: 'p-025',
    slug: 'salatschalen-standard',
    name: 'Salatschalen Standard / Eco',
    category: 'Schalen',
    features: ['Groessen: 750 ml, 1000 ml, 1300 ml', 'Deckel: Plastik oder Papier']
  }),
  createProduct({
    id: 'p-026',
    slug: 'salatschalen-individual',
    name: 'Salatschalen Individualisiert',
    category: 'Schalen',
    tier: 'individual',
    badge: 'Individual',
    minOrder: 1500,
    priceHint: price(baseByCategory.Schalen.basePrice, 0.08),
    features: ['Groessen: 750 ml, 1000 ml, 1300 ml', 'Deckel: Plastik oder Papier']
  }),

  // 6) Boxen
  createProduct({
    id: 'p-027',
    slug: 'pizzakartons-eco',
    name: 'Pizza Kartons Eco',
    category: 'Lebensmittelboxen',
    features: ['Groessen: 26x26 bis 52x52', 'Form: Regulaer oder Hexagon', 'Farben: Braun / Weiss', 'Druck: max 3 Farben']
  }),
  createProduct({
    id: 'p-028',
    slug: 'pizzakartons-premium',
    name: 'Pizza Kartons Premium',
    category: 'Lebensmittelboxen',
    tier: 'premium',
    badge: 'Premium',
    minOrder: 1200,
    priceHint: price(baseByCategory.Lebensmittelboxen.basePrice, 0.09),
    features: ['All-over Druck', 'Premium Karton']
  }),
  createProduct({
    id: 'p-029',
    slug: 'takeaway-boxen-1-farbe',
    name: 'Takeaway Boxen 1 Farbe',
    category: 'Lebensmittelboxen',
    features: ['Groessen: 145x85x60, 175x105x70, 220x120x80', 'Druck: 1 Farbe']
  }),
  createProduct({
    id: 'p-030',
    slug: 'takeaway-boxen-2-farben',
    name: 'Takeaway Boxen 2 Farben',
    category: 'Lebensmittelboxen',
    tier: 'premium',
    badge: 'Premium',
    priceHint: price(baseByCategory.Lebensmittelboxen.basePrice, 0.04),
    features: ['Groessen: 145x85x60, 175x105x70, 220x120x80', 'Druck: 2 Farben']
  }),
  createProduct({
    id: 'p-031',
    slug: 'takeaway-boxen-unbegrenzt',
    name: 'Takeaway Boxen Unbegrenzt',
    category: 'Lebensmittelboxen',
    tier: 'individual',
    badge: 'Individual',
    minOrder: 1800,
    priceHint: price(baseByCategory.Lebensmittelboxen.basePrice, 0.08),
    features: ['Groessen: 145x85x60, 175x105x70, 220x120x80', 'Druck: Unbegrenzt']
  }),
  createProduct({
    id: 'p-032',
    slug: 'nudelboxen-standard',
    name: 'Nudelboxen Standard',
    category: 'Lebensmittelboxen',
    features: ['Groessen: 480 ml, 710 ml']
  }),
  createProduct({
    id: 'p-033',
    slug: 'nudelboxen-individual',
    name: 'Nudelboxen Individualisiert',
    category: 'Lebensmittelboxen',
    tier: 'individual',
    badge: 'Individual',
    minOrder: 1600,
    priceHint: price(baseByCategory.Lebensmittelboxen.basePrice, 0.07),
    features: ['Groessen: 480 ml, 710 ml']
  }),
  createProduct({
    id: 'p-034',
    slug: 'burgerboxen',
    name: 'Burgerboxen',
    category: 'Lebensmittelboxen',
    tier: 'individual',
    badge: 'Individual',
    minOrder: 1200,
    priceHint: price(baseByCategory.Lebensmittelboxen.basePrice, 0.06),
    features: ['Format: 117x117x80', 'Farben: Weiss / Braun', 'Unbegrenzt Druckfarben']
  }),
  createProduct({
    id: 'p-035',
    slug: 'pommes-boxen-standard',
    name: 'Pommes Boxen Standard',
    category: 'Lebensmittelboxen',
    features: ['Format: 107x50x85']
  }),
  createProduct({
    id: 'p-036',
    slug: 'pommes-boxen-individual',
    name: 'Pommes Boxen Individualisiert',
    category: 'Lebensmittelboxen',
    tier: 'individual',
    badge: 'Individual',
    minOrder: 1500,
    priceHint: price(baseByCategory.Lebensmittelboxen.basePrice, 0.05),
    features: ['Format: 107x50x85']
  }),

  // 7) Servietten & Hygiene
  createProduct({
    id: 'p-037',
    slug: 'servietten',
    name: 'Servietten',
    category: 'Servietten',
    features: ['Groessen: 20x20, 24x24, 33x33, 40x40', 'Faltung: 1/4, 1/8', 'Druck: 1-2 Farben']
  }),
  createProduct({
    id: 'p-038',
    slug: 'serviettentaschen',
    name: 'Serviettentaschen',
    category: 'Servietten',
    features: ['Groessen: 33x33, 33x40', 'Druck: 1-2 Farben']
  }),
  createProduct({
    id: 'p-039',
    slug: 'erfrischungstuecher',
    name: 'Erfrischungstuecher',
    category: 'Servietten',
    features: ['Format: 60x100', 'Geschmack: Zitrone oder Seife']
  }),

  // Zubehoer
  createProduct({
    id: 'p-040',
    slug: 'alle-deckel-zubehoer',
    name: 'Alle Deckel (Zubehoer)',
    category: 'Zubehoer',
    features: ['Sortimentsuebersicht aller Deckeltypen']
  }),
  createProduct({
    id: 'p-041',
    slug: 'extra-verpackungsoptionen',
    name: 'Extra Verpackungsoptionen',
    category: 'Zubehoer',
    tier: 'premium',
    badge: 'Premium',
    priceHint: 'Preis auf Anfrage',
    features: ['Sonderoptionen fuer B2B-Projekte']
  })
];

export const localProducts = products;
export const categories = ['Alle', ...new Set(localProducts.map((item) => item.category))];

export function getLocalProductBySlug(slug) {
  return localProducts.find((item) => item.slug === slug) || null;
}
