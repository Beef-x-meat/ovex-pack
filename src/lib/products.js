const baseByCategory = {
  Pappbecher: {
    leadTime: '7-10 Werktage',
    minOrder: 500,
    priceHint: 'ab CHF 0.21 / Stueck',
    materials: ['FSC-Karton', 'Wasserbasierte Farben'],
    features: ['To-Go tauglich', 'Brandingflaeche', 'Mehrere Groessen']
  },
  Eisbecher: {
    leadTime: '7-10 Werktage',
    minOrder: 800,
    priceHint: 'ab CHF 0.14 / Stueck',
    materials: ['FSC-Karton', 'Lebensmittelbeschichtung'],
    features: ['Kaltgetraenke-geeignet', 'Deckeloption', 'Brandingflaeche']
  },
  Plastikbecher: {
    leadTime: '7-10 Werktage',
    minOrder: 1000,
    priceHint: 'ab CHF 0.12 / Stueck',
    materials: ['rPET', 'PP'],
    features: ['Transparent', 'Stapelbar', 'Event-tauglich']
  },
  Lebensmittelboxen: {
    leadTime: '8-12 Werktage',
    minOrder: 1000,
    priceHint: 'ab CHF 0.24 / Stueck',
    materials: ['Karton', 'Lebensmittelbeschichtung'],
    features: ['Food-safe', 'Stabil', 'Logo-Druck']
  },
  Papiertragetaschen: {
    leadTime: '10-14 Werktage',
    minOrder: 750,
    priceHint: 'ab CHF 0.36 / Stueck',
    materials: ['FSC-Papier'],
    features: ['Verstaerkter Griff', 'Retail-ready', 'Vollflaechig bedruckbar']
  },
  Lebensmittelpapier: {
    leadTime: '5-8 Werktage',
    minOrder: 2000,
    priceHint: 'ab CHF 0.04 / Stueck',
    materials: ['Fettdichtes Papier'],
    features: ['Food-safe', 'Schneller Druck', 'Rollformat']
  },
  Zubehoer: {
    leadTime: '6-9 Werktage',
    minOrder: 1200,
    priceHint: 'ab CHF 0.03 / Stueck',
    materials: ['Diverse Materialien'],
    features: ['Passgenau', 'Kompatibel', 'Grossmengenfaehig']
  }
};

const productSeeds = [
  { name: 'Pappbecher Bestseller', slug: 'pappbecher-bestseller', category: 'Pappbecher' },
  { name: 'Express Pappbecher', slug: 'express-pappbecher', category: 'Pappbecher', leadTime: '4-6 Werktage' },
  { name: 'Digital bedruckte Pappbecher', slug: 'digital-bedruckte-pappbecher', category: 'Pappbecher' },
  { name: 'Grosshandel Pappbecher', slug: 'grosshandel-pappbecher', category: 'Pappbecher', minOrder: 3000, priceHint: 'ab CHF 0.17 / Stueck' },
  { name: 'Premium Pappbecher', slug: 'premium-pappbecher', category: 'Pappbecher', priceHint: 'ab CHF 0.25 / Stueck' },
  { name: 'Pappbecher Deluxe', slug: 'pappbecher-deluxe', category: 'Pappbecher', priceHint: 'ab CHF 0.27 / Stueck' },
  { name: 'Pappbecher mit Deckel', slug: 'pappbecher-mit-deckel', category: 'Pappbecher', priceHint: 'ab CHF 0.29 / Stueck' },
  { name: 'Pappbecher Deckel', slug: 'pappbecher-deckel', category: 'Zubehoer', priceHint: 'ab CHF 0.06 / Stueck' },

  { name: 'Bestseller Eisbecher', slug: 'bestseller-eisbecher', category: 'Eisbecher' },
  { name: 'Eisbecher mit Deckel', slug: 'eisbecher-mit-deckel', category: 'Eisbecher', priceHint: 'ab CHF 0.17 / Stueck' },
  { name: 'Eisbecher Deluxe', slug: 'eisbecher-deluxe', category: 'Eisbecher', priceHint: 'ab CHF 0.19 / Stueck' },
  { name: 'Express Eisbecher', slug: 'express-eisbecher', category: 'Eisbecher', leadTime: '4-6 Werktage' },
  { name: 'Digital bedruckte Eisbecher', slug: 'digital-bedruckte-eisbecher', category: 'Eisbecher' },
  { name: 'Grosshandel Eisbecher', slug: 'grosshandel-eisbecher', category: 'Eisbecher', minOrder: 3500, priceHint: 'ab CHF 0.11 / Stueck' },
  { name: 'Pappschalen Bestseller', slug: 'pappschalen-bestseller', category: 'Eisbecher' },
  { name: 'Deckel fuer Grosshandel Eisbecher', slug: 'deckel-fuer-grosshandel-eisbecher', category: 'Zubehoer', priceHint: 'ab CHF 0.05 / Stueck' },

  { name: 'Plastikbecher Bestseller', slug: 'plastikbecher-bestseller', category: 'Plastikbecher' },
  { name: 'Plastikbecher Grosshandel', slug: 'plastikbecher-grosshandel', category: 'Plastikbecher', minOrder: 4000, priceHint: 'ab CHF 0.09 / Stueck' },
  { name: 'Mehrweg Plastikbecher', slug: 'mehrweg-plastikbecher', category: 'Plastikbecher', priceHint: 'ab CHF 0.22 / Stueck' },
  { name: 'Express Plastikbecher', slug: 'express-plastikbecher', category: 'Plastikbecher', leadTime: '4-6 Werktage' },
  { name: 'Plastikbecher Deckel', slug: 'plastikbecher-deckel', category: 'Zubehoer', priceHint: 'ab CHF 0.05 / Stueck' },

  { name: 'Bestseller Pizzakartons', slug: 'bestseller-pizzakartons', category: 'Lebensmittelboxen', minOrder: 800 },
  { name: 'Pizzakartons Deluxe', slug: 'pizzakartons-deluxe', category: 'Lebensmittelboxen', priceHint: 'ab CHF 0.33 / Stueck' },
  { name: 'Takeaway Boxen', slug: 'takeaway-boxen', category: 'Lebensmittelboxen' },
  { name: 'Nudelboxen', slug: 'nudelboxen', category: 'Lebensmittelboxen' },
  { name: 'Burgerboxen', slug: 'burgerboxen', category: 'Lebensmittelboxen' },
  { name: 'Pommesboxen', slug: 'pommesboxen', category: 'Lebensmittelboxen', priceHint: 'ab CHF 0.16 / Stueck' },
  { name: 'Sushi-Boxen (Schnelle Lieferung)', slug: 'sushi-boxen-schnelle-lieferung', category: 'Lebensmittelboxen', leadTime: '5-7 Werktage' },
  { name: 'Tortenkarton', slug: 'tortenkarton', category: 'Lebensmittelboxen', priceHint: 'ab CHF 0.39 / Stueck' },
  { name: 'Popcorn-Becher', slug: 'popcorn-becher', category: 'Lebensmittelboxen', priceHint: 'ab CHF 0.18 / Stueck' },
  { name: 'Lebensmittelbecher mit Deckel', slug: 'lebensmittelbecher-mit-deckel', category: 'Lebensmittelboxen', priceHint: 'ab CHF 0.23 / Stueck' },
  { name: 'Spitztueten fuer Bubble Waffle', slug: 'spitztueten-fuer-bubble-waffle', category: 'Lebensmittelboxen', priceHint: 'ab CHF 0.05 / Stueck' },

  { name: 'Bestseller-Papiertueten', slug: 'bestseller-papiertueten', category: 'Papiertragetaschen' },
  { name: 'Blockbodenbeutel', slug: 'blockbodenbeutel', category: 'Papiertragetaschen', priceHint: 'ab CHF 0.14 / Stueck' },
  { name: 'Tragetaschen (2 Farben / Vollfarbe)', slug: 'tragetaschen-2-farben-vollfarbe', category: 'Papiertragetaschen', priceHint: 'ab CHF 0.42 / Stueck' },

  { name: 'Fettdichtes Papier', slug: 'fettdichtes-papier', category: 'Lebensmittelpapier' },
  { name: 'Pergamentpapier', slug: 'pergamentpapier', category: 'Lebensmittelpapier', priceHint: 'ab CHF 0.05 / Stueck' },
  { name: 'Lebensmittelpapier', slug: 'lebensmittelpapier', category: 'Lebensmittelpapier' },
  { name: 'Doener-Tueten', slug: 'doener-tueten', category: 'Lebensmittelpapier', priceHint: 'ab CHF 0.06 / Stueck' },
  { name: 'Erfrischungstuecher', slug: 'erfrischungstuecher', category: 'Lebensmittelpapier', priceHint: 'ab CHF 0.03 / Stueck' },

  { name: 'Papierstrohhalme', slug: 'papierstrohhalme', category: 'Zubehoer', priceHint: 'ab CHF 0.02 / Stueck' },
  { name: 'Pappbecher Deckel (Zubehoer)', slug: 'pappbecher-deckel-zubehoer', category: 'Zubehoer', priceHint: 'ab CHF 0.05 / Stueck' },
  { name: 'Plastikdeckel', slug: 'plastikdeckel', category: 'Zubehoer', priceHint: 'ab CHF 0.04 / Stueck' },
  { name: 'Bio Deckel Varianten', slug: 'bio-deckel-varianten', category: 'Zubehoer', priceHint: 'ab CHF 0.06 / Stueck' }
];

export const localProducts = productSeeds.map((seed, index) => {
  const base = baseByCategory[seed.category] || baseByCategory.Zubehoer;
  return {
    id: `sp-${index + 1}`,
    slug: seed.slug,
    name: seed.name,
    category: seed.category,
    shortDescription: seed.shortDescription || `${seed.name} fuer professionelle B2B Verpackungsprojekte.`,
    longDescription:
      seed.longDescription ||
      `${seed.name} ist fuer den professionellen Einsatz im B2B-Umfeld ausgelegt und bietet stabile Qualitaet bei planbarer Lieferung.`,
    leadTime: seed.leadTime || base.leadTime,
    minOrder: seed.minOrder || base.minOrder,
    priceHint: seed.priceHint || base.priceHint,
    materials: seed.materials || base.materials,
    features: seed.features || base.features,
    modelUrl: ''
  };
});

export const categories = ['Alle', ...new Set(localProducts.map((item) => item.category))];

export function getLocalProductBySlug(slug) {
  return localProducts.find((item) => item.slug === slug) || null;
}
