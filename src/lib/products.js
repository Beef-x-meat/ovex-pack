export const localProducts = [
  {
    id: 'sp-cup-350',
    slug: 'classic-cup-350',
    name: 'Classic Cup 350',
    category: 'Becher',
    shortDescription: 'Doppelwandiger To-Go-Becher mit ruhiger, hochwertiger Oberflaeche.',
    longDescription:
      'Optimiert fuer Coffee-Ketten und Boutique-Cafes: hoher Griffkomfort, stabile Waende, klarer Druckbereich fuer Brand-Design.',
    leadTime: '7-10 Werktage',
    minOrder: 500,
    priceHint: 'ab CHF 0.21 / Stueck',
    materials: ['FSC-Karton', 'Wasserbasierte Farben'],
    features: ['Doppelwandig', 'Heissgetraenke-tauglich', '100% individualisierbar'],
    modelUrl: ''
  },
  {
    id: 'sp-box-uni',
    slug: 'unibox-snack',
    name: 'UniBox Snack',
    category: 'Boxen',
    shortDescription: 'Faltbare Snackbox fuer Delivery und Take-away.',
    longDescription:
      'Reduziert Materialeinsatz ohne Stabilitaetsverlust. Geeignet fuer warme und kalte Speisen, ideal fuer urbane Lieferkonzepte.',
    leadTime: '8-12 Werktage',
    minOrder: 1000,
    priceHint: 'ab CHF 0.29 / Stueck',
    materials: ['Recycelter Karton', 'Kompostierbare Beschichtung'],
    features: ['Leak-resistant', 'Stackbar', 'Flat-Pack Versand'],
    modelUrl: ''
  },
  {
    id: 'sp-bag-neo',
    slug: 'neo-bag-medium',
    name: 'Neo Bag Medium',
    category: 'Taschen',
    shortDescription: 'Papiertragetasche mit verstaerktem Griffbereich.',
    longDescription:
      'Fuer Retail und Pop-up Stores. Hohe Markenwirkung bei reduziertem visuellem Laerm und klaren Flaechen fuer Logoanwendungen.',
    leadTime: '10-14 Werktage',
    minOrder: 750,
    priceHint: 'ab CHF 0.36 / Stueck',
    materials: ['FSC-Papier', 'Reissfeste Griffe'],
    features: ['Reinforced Handle', 'Matte Oberflaeche', 'In 3 Groessen erhaeltlich'],
    modelUrl: ''
  },
  {
    id: 'sp-lid-360',
    slug: 'eco-lid-360',
    name: 'Eco Lid 360',
    category: 'Deckel',
    shortDescription: 'Kompostierbarer Deckel fuer Heiss- und Kaltgetraenke.',
    longDescription:
      'Passgenaue Serie fuer Becher im 12oz bis 16oz Segment. Reduziert Leckagen im Alltag und eignet sich fuer schnellere Ausgaben am Counter.',
    leadTime: '6-9 Werktage',
    minOrder: 1200,
    priceHint: 'ab CHF 0.09 / Stueck',
    materials: ['PLA-Biopolymer'],
    features: ['Heat-resistant', 'Spill Control', 'Kompostierbar'],
    modelUrl: ''
  },
  {
    id: 'sp-wrap-200',
    slug: 'wrap-sheet-200',
    name: 'Wrap Sheet 200',
    category: 'Wraps',
    shortDescription: 'Lebensmittelsicheres Einschlagpapier fuer Snack-Konzepte.',
    longDescription:
      'Gleichmaessige Druckqualitaet bei hoher Geschwindigkeit. Besonders geeignet fuer Burger, Sandwiches und Grab-and-go Formate.',
    leadTime: '5-8 Werktage',
    minOrder: 2000,
    priceHint: 'ab CHF 0.04 / Stueck',
    materials: ['Fettresistentes Papier'],
    features: ['Food-safe', 'Schneller Druck', 'Grosses Rollenformat'],
    modelUrl: ''
  }
];

export const categories = ['Alle', ...new Set(localProducts.map((item) => item.category))];

export function getLocalProductBySlug(slug) {
  return localProducts.find((item) => item.slug === slug) || null;
}
