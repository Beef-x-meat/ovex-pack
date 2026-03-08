const baseByCategory = {
  Pappbecher:        { leadTime: '7–10 Werktage',  minOrder: 2500, basePrice: 0.11,  materials: ['FSC-Karton'] },
  Plastikbecher:     { leadTime: '7–10 Werktage',  minOrder: 2500, basePrice: 0.06,  materials: ['rPET'] },
  Eisbecher:         { leadTime: '7–10 Werktage',  minOrder: 2500, basePrice: 0.139, materials: ['FSC-Karton'] },
  Lebensmittelboxen: { leadTime: '8–12 Werktage',  minOrder: 3000, basePrice: 0.09,  materials: ['Karton', 'Kraft'] },
  Papiertragetaschen:{ leadTime: '8–12 Werktage',  minOrder: 2500, basePrice: 0.125, materials: ['Papier 90g', 'Papier 70g'] },
  Servietten:        { leadTime: '10–14 Werktage', minOrder: 25000,basePrice: 0.01,  materials: ['Papier'] },
  Lebensmittelpapier:{ leadTime: '8–12 Werktage',  minOrder: 250,  basePrice: 3.29,  materials: ['Fettdichtes Papier'] },
};

function price(base) {
  return `ab CHF ${base.toFixed(base < 1 ? 3 : 2)} / Stück`;
}

function createProduct({
  id, slug, name, category, tier = 'standard', badge,
  shortDescription, longDescription, leadTime, minOrder,
  priceHint, materials, features = []
}) {
  const base = baseByCategory[category] || baseByCategory.Lebensmittelboxen;
  return {
    id, slug, name, category, tier,
    badge: badge || 'Standard',
    shortDescription: shortDescription || `${name} – individuell bedruckt oder neutral, für Gastronomie & Retail.`,
    longDescription: longDescription || `${name} für professionelle Gastronomie, Catering und Take-away.`,
    leadTime: leadTime || base.leadTime,
    minOrder: minOrder || base.minOrder,
    priceHint: priceHint || price(base.basePrice),
    materials: materials || base.materials,
    features,
    modelUrl: ''
  };
}

export const localProducts = [

  /* ─── PAPPBECHER ────────────────────────────────────────── */
  createProduct({
    id: 'p-001',
    slug: 'pappbecher-basic',
    name: 'Pappbecher',
    category: 'Pappbecher',
    tier: 'standard',
    badge: 'Standard / Eco',
    minOrder: 2500,
    priceHint: 'ab CHF 0.11 / Stück',
    shortDescription: 'FSC-zertifizierte Pappbecher in 5 Größen – einwandig oder doppelwandig, mit 1–3+ Druckfarben.',
    longDescription: 'Unsere Pappbecher aus FSC-zertifiziertem Karton sind für Gastronomie, Catering und Take-away konzipiert. Wählbar in 5 Standardgrößen von 100 ml Espresso bis 470 ml sowie als Wunschgröße. Mit 1, 2 oder 3+ Druckfarben setzen Sie Ihre Marke gekonnt in Szene. Stabile Einwand- oder Doppelwandkonstruktion für heisse und kalte Getränke. Ab 2.500 Stück, Lieferzeit 7–10 Werktage.',
    features: [
      'Größen: 100 ml Espresso, 200 ml, 240 ml, 400 ml, 470 ml',
      'Wunschgröße als Freitext möglich',
      'Stabilität: Einwandig oder Doppelwandig',
      'Design: 1 Farbe, 2 Farben oder 3+ Farben',
      'Mindestbestellung: 2.500 Stück'
    ]
  }),

  createProduct({
    id: 'p-001i',
    slug: 'pappbecher-individual',
    name: 'Pappbecher Individuell',
    category: 'Pappbecher',
    tier: 'individual',
    badge: 'Individualisiert',
    minOrder: 2500,
    priceHint: 'ab CHF 0.13 / Stück',
    shortDescription: 'Vollständig individuell bedruckte Pappbecher – Ihr Logo, Ihre Farben, in 5 Größen.',
    longDescription: 'Heben Sie Ihre Marke mit vollständig individualisierten Pappbechern hervor. Wählen Sie Größe, Wandstärke und Druckfarben frei – inklusive Farbberatung und Druckfreigabe. FSC-zertifizierter Karton, produziert in der EU. Ab 2.500 Stück, Lieferzeit 7–10 Werktage.',
    features: [
      'Vollständig individuelles Design (unbegrenzte Farben)',
      'Größen: 100 ml Espresso, 200 ml, 240 ml, 400 ml, 470 ml',
      'Stabilität: Einwandig oder Doppelwandig',
      'Kostenlose Designberatung & Druckfreigabe',
      'Mindestbestellung: 2.500 Stück'
    ]
  }),

  createProduct({
    id: 'p-002',
    slug: 'pappbecher-deckel',
    name: 'Deckel für Pappbecher',
    category: 'Pappbecher',
    tier: 'standard',
    badge: 'Zubehör',
    minOrder: 1000,
    priceHint: 'ab CHF 0.04 / Stück',
    shortDescription: 'Passende Deckel für alle Pappbechergrößen – in Weiss, Schwarz oder Wunschfarbe, in 5 Materialvarianten.',
    longDescription: 'Unser Deckelprogramm umfasst alle gängigen Becherformate von 200 ml bis 470 ml. Wählen Sie zwischen Karton-Flachdeckel, PLA-Biodeckel, PET flach (transparent) oder PET Dome – in Weiss, Schwarz oder Ihrer Wunschfarbe. Ab 1.000 Stück, Lieferzeit 5–8 Werktage.',
    features: [
      'Größen: 200 ml, 240 ml, 400 ml, 470 ml, Wunschgröße',
      'Farbe: Weiss, Schwarz, Wunschfarbe',
      'Material: Standard, Karton (Flachdeckel), PLA Bio, PET flach, PET Dome',
      'Mindestbestellung: 1.000 Stück'
    ]
  }),


  /* ─── PLASTIKBECHER ─────────────────────────────────────── */
  createProduct({
    id: 'p-004',
    slug: 'plastikbecher-standard',
    name: 'Plastikbecher',
    category: 'Plastikbecher',
    tier: 'standard',
    badge: 'Standard',
    minOrder: 2500,
    priceHint: 'ab CHF 0.06 / Stück',
    shortDescription: 'Klare rPET-Plastikbecher in 5 Größen – Standard oder Budget-Gewicht, mit 1–3+ Druckfarben.',
    longDescription: 'Unsere Plastikbecher aus recyceltem PET (rPET) sind für kalte Getränke konzipiert. Erhältlich in 5 Größen von 350 ml bis 700 ml, in Standard (12–15g) oder Budget (7–8g) Gewicht. Mit Druck in 1, 2 oder 3+ Farben oder ohne Logo. Ab 2.500 Stück, Lieferzeit 7–10 Werktage.',
    features: [
      'Größen: 350 ml, 400 ml, 470 ml, 550 ml, 700 ml, Wunschgröße',
      'Gewicht: Standard (12–15g), Budget (7–8g)',
      'Design: Ohne Logo, 1 Farbe, 2 Farben, 3+ Farben',
      'Mindestbestellung: 2.500 Stück'
    ]
  }),

  createProduct({
    id: 'p-004i',
    slug: 'plastikbecher-individual',
    name: 'Plastikbecher Individuell',
    category: 'Plastikbecher',
    tier: 'individual',
    badge: 'Individualisiert',
    minOrder: 2500,
    priceHint: 'ab CHF 0.085 / Stück',
    shortDescription: 'Vollständig individuell bedruckte rPET-Plastikbecher – Ihr Design, Ihre Farben, in 5 Größen.',
    longDescription: 'Setzen Sie Ihre Marke auf klaren rPET-Plastikbechern in Szene. Wählen Sie Größe, Gewicht und Druckfarben komplett frei. Inklusive kostenloser Designberatung und Druckfreigabe. Ab 2.500 Stück, Lieferzeit 7–10 Werktage.',
    features: [
      'Vollständig individuelles Design (unbegrenzte Farben)',
      'Größen: 350 ml, 400 ml, 470 ml, 550 ml, 700 ml',
      'Material: rPET recycelt',
      'Kostenlose Designberatung & Druckfreigabe',
      'Mindestbestellung: 2.500 Stück'
    ]
  }),

  createProduct({
    id: 'p-005',
    slug: 'plastikbecher-deckel',
    name: 'Deckel für Plastikbecher',
    category: 'Plastikbecher',
    tier: 'standard',
    badge: 'Zubehör',
    minOrder: 2500,
    priceHint: 'ab CHF 0.035 / Stück',
    shortDescription: 'Passende Deckel für Plastikbecher – in 3 Formen: Standard, Smoothie und Sip.',
    longDescription: 'Transparente Deckel für alle Plastikbechergrößen von 350 ml bis 700 ml. Wählen Sie zwischen Standard gerade, Smoothie (gewölbt) und Sip-Deckel. Ab 2.500 Stück, Lieferzeit 5–8 Werktage.',
    features: [
      'Größen: 350 ml, 400 ml, 470 ml, 550 ml, 700 ml, Wunschgröße',
      'Form: Standard gerade, Smoothie, Sip',
      'Mengen: 2.500 / 5.000 / 7.500 / 10.000 Stück',
      'Mindestbestellung: 2.500 Stück'
    ]
  }),

  /* ─── EISBECHER ─────────────────────────────────────────── */
  createProduct({
    id: 'p-006',
    slug: 'eisbecher-standard',
    name: 'Eisbecher',
    category: 'Eisbecher',
    tier: 'standard',
    badge: 'Standard / Eco',
    minOrder: 2500,
    priceHint: 'ab CHF 0.139 / Stück',
    shortDescription: 'FSC-zertifizierte Eisbecher in 4 Größen – fettdicht beschichtet, mit 1–3+ Druckfarben.',
    longDescription: 'Unsere Eisbecher aus FSC-zertifiziertem Karton sind fettdicht beschichtet und ideal für Softeisanlagen, Eisdielen und Dessert-Counter. Erhältlich in 100 ml, 200 ml, 250 ml und 300 ml sowie auf Wunsch in individueller Größe. Mit 1, 2 oder 3+ Druckfarben für Ihr Branding. Ab 2.500 Stück, Lieferzeit 7–10 Werktage.',
    features: [
      'Größen: 100 ml, 200 ml, 250 ml, 300 ml, Wunschgröße',
      'Design: 1 Farbe, 2 Farben, 3+ Farben',
      'Mengen: 2.500 / 5.000 / 7.500 / 10.000 Stück',
      'Mindestbestellung: 2.500 Stück'
    ]
  }),

  createProduct({
    id: 'p-006i',
    slug: 'eisbecher-individual',
    name: 'Eisbecher Individuell',
    category: 'Eisbecher',
    tier: 'individual',
    badge: 'Individualisiert',
    minOrder: 2500,
    priceHint: 'ab CHF 0.165 / Stück',
    shortDescription: 'Vollständig individuell bedruckte Eisbecher – Ihr Logo, Ihre Farben, in 4 Größen.',
    longDescription: 'Verleihen Sie Ihrer Eistheke eine unverwechselbare Identität. Vollständig individualisierte Eisbecher aus FSC-Karton, fettdicht beschichtet. Mit unbegrenzten Farben und kostenloser Designberatung. Ab 2.500 Stück, Lieferzeit 7–10 Werktage.',
    features: [
      'Vollständig individuelles Design (unbegrenzte Farben)',
      'Größen: 100 ml, 200 ml, 250 ml, 300 ml',
      'FSC-zertifizierter Karton, fettdicht beschichtet',
      'Kostenlose Designberatung & Druckfreigabe',
      'Mindestbestellung: 2.500 Stück'
    ]
  }),

  /* ─── LEBENSMITTELBOXEN ─────────────────────────────────── */
  createProduct({
    id: 'p-007',
    slug: 'burgerboxen',
    name: 'Burgerboxen',
    category: 'Lebensmittelboxen',
    tier: 'standard',
    badge: 'Standard / Eco',
    minOrder: 5000,
    priceHint: 'ab CHF 0.11 / Stück',
    shortDescription: 'Burgerboxen in S / M / L – in Kraft oder Weiss, ab 5.000 Stück.',
    longDescription: 'Unsere Burgerboxen sind in drei Standardgrößen erhältlich: S (9,5×9,5×7,5 cm), M (11,5×11,5×9 cm) und L (13×13×10 cm). Erhältlich in Kraft oder Weiss. Ab 5.000 Stück, Lieferzeit 8–12 Werktage.',
    features: [
      'Größen: S (9,5×9,5×7,5 cm), M (11,5×11,5×9 cm), L (13×13×10 cm)',
      'Ausführung: Kraft (braun), Weiss',
      'Mengen: 5.000 / 7.500 / 10.000 Stück',
      'Mindestbestellung: 5.000 Stück'
    ]
  }),

  createProduct({
    id: 'p-007i',
    slug: 'burgerboxen-individual',
    name: 'Burgerboxen Individuell',
    category: 'Lebensmittelboxen',
    tier: 'individual',
    badge: 'Individualisiert',
    minOrder: 5000,
    priceHint: 'ab CHF 0.135 / Stück',
    shortDescription: 'Individuell bedruckte Burgerboxen in S / M / L – mit Ihrem Design, ab 5.000 Stück.',
    longDescription: 'Burgerboxen mit vollständig individuellem Design. Wählen Sie Größe und Druckfarben frei – mit kostenloser Designberatung. Ab 5.000 Stück, Lieferzeit 8–12 Werktage.',
    features: [
      'Vollständig individuelles Design (unbegrenzte Farben)',
      'Größen: S, M, L, Wunschgröße',
      'Kostenlose Designberatung & Druckfreigabe',
      'Mindestbestellung: 5.000 Stück'
    ]
  }),

  createProduct({
    id: 'p-008',
    slug: 'pommesbox',
    name: 'Pommesbox',
    category: 'Lebensmittelboxen',
    tier: 'standard',
    badge: 'Standard / Eco',
    minOrder: 3000,
    priceHint: 'ab CHF 0.09 / Stück',
    shortDescription: 'Pommesboxen in Small & Standard – in Kraft, Farbe oder neutral.',
    longDescription: 'Pommesboxen in zwei Größen (Small und Standard), erhältlich in Kraft oder Farbe, mit oder ohne Design. Ab 3.000 Stück, Lieferzeit 8–12 Werktage.',
    features: [
      'Größen: Small, Standard',
      'Ausführung: Kraft, Farbige Box',
      'Mengen: 3.000 / 5.000 / 8.000 / 10.000 Stück',
      'Mindestbestellung: 3.000 Stück'
    ]
  }),

  createProduct({
    id: 'p-008i',
    slug: 'pommesbox-individual',
    name: 'Pommesbox Individuell',
    category: 'Lebensmittelboxen',
    tier: 'individual',
    badge: 'Individualisiert',
    minOrder: 3000,
    priceHint: 'ab CHF 0.115 / Stück',
    shortDescription: 'Individuell bedruckte Pommesboxen in Small & Standard – mit Ihrem Logo.',
    longDescription: 'Pommesboxen mit vollständig individuellem Druck auf farbigem Karton oder Kraft. Mit kostenloser Designberatung. Ab 3.000 Stück, Lieferzeit 8–12 Werktage.',
    features: [
      'Vollständig individuelles Design (unbegrenzte Farben)',
      'Größen: Small, Standard',
      'Kostenlose Designberatung & Druckfreigabe',
      'Mindestbestellung: 3.000 Stück'
    ]
  }),

  createProduct({
    id: 'p-009',
    slug: 'hamburger-menubox',
    name: 'Hamburger Menübox',
    category: 'Lebensmittelboxen',
    tier: 'standard',
    badge: 'Standard / Eco',
    minOrder: 3000,
    priceHint: 'ab CHF 0.125 / Stück',
    shortDescription: 'Hamburger Menüboxen in Standard & Medium – in Weiss oder Kraft.',
    longDescription: 'Hamburger Menüboxen in Standard (19×12×8 cm) und Medium (22×12×8 cm), erhältlich in Weiss oder Kraft, ohne Design. Ab 3.000 Stück, Lieferzeit 8–12 Werktage.',
    features: [
      'Größen: Standard (19×12×8 cm), Medium (22×12×8 cm)',
      'Ausführung: Weiss, Kraft',
      'Mengen: 3.000 / 5.000 / 8.000 / 10.000 Stück',
      'Mindestbestellung: 3.000 Stück'
    ]
  }),

  createProduct({
    id: 'p-009i',
    slug: 'hamburger-menubox-individual',
    name: 'Hamburger Menübox Individuell',
    category: 'Lebensmittelboxen',
    tier: 'individual',
    badge: 'Individualisiert',
    minOrder: 3000,
    priceHint: 'ab CHF 0.155 / Stück',
    shortDescription: 'Individuell bedruckte Hamburger Menüboxen – Ihr Logo auf Weiss, Kraft oder Farbe.',
    longDescription: 'Hamburger Menüboxen mit individuellem Branding auf Weiss, bunter Farbe oder Kraft. Kostenlose Designberatung inklusive. Ab 3.000 Stück, Lieferzeit 8–12 Werktage.',
    features: [
      'Vollständig individuelles Design (unbegrenzte Farben)',
      'Größen: Standard, Medium, Wunschgröße',
      'Ausführung: Auf Weiss, Auf bunter Farbe, Auf Kraft',
      'Mindestbestellung: 3.000 Stück'
    ]
  }),

  createProduct({
    id: 'p-010',
    slug: 'noodle-doenerbox',
    name: 'Noodle- & Dönerbox',
    category: 'Lebensmittelboxen',
    tier: 'standard',
    badge: 'Standard / Eco',
    minOrder: 5000,
    priceHint: 'ab CHF 0.115 / Stück',
    shortDescription: 'Döner- und Noodleboxen in Standardgröße – neutral.',
    longDescription: 'Döner- und Noodleboxen in Standardgröße, erhältlich in Standard (neutral). Ab 5.000 Stück, Lieferzeit 8–12 Werktage.',
    features: [
      'Typ: Dönerbox, Noodlebox',
      'Ausführung: Standard (neutral)',
      'Mengen: 5.000 / 10.000 / 15.000 Stück',
      'Mindestbestellung: 5.000 Stück'
    ]
  }),

  createProduct({
    id: 'p-010i',
    slug: 'noodle-doenerbox-individual',
    name: 'Noodle- & Dönerbox Individuell',
    category: 'Lebensmittelboxen',
    tier: 'individual',
    badge: 'Individualisiert',
    minOrder: 5000,
    priceHint: 'ab CHF 0.145 / Stück',
    shortDescription: 'Individuell bedruckte Döner- und Noodleboxen – mit Ihrem Design.',
    longDescription: 'Döner- und Noodleboxen mit vollständig individuellem Design. Mit kostenloser Designberatung. Ab 5.000 Stück, Lieferzeit 8–12 Werktage.',
    features: [
      'Vollständig individuelles Design (unbegrenzte Farben)',
      'Typ: Dönerbox, Noodlebox',
      'Kostenlose Designberatung & Druckfreigabe',
      'Mindestbestellung: 5.000 Stück'
    ]
  }),

  createProduct({
    id: 'p-011',
    slug: 'lunchbox',
    name: 'Lunchbox',
    category: 'Lebensmittelboxen',
    tier: 'standard',
    badge: 'Standard / Eco',
    minOrder: 2500,
    priceHint: 'ab CHF 0.125 / Stück',
    shortDescription: 'Lunchboxen in 3 Größen – Standard, Small und Flat.',
    longDescription: 'Lunchboxen in drei Größen: Standard (12,5×17×9,5 cm), Small (9,5×11×9,5 cm) und Flat (15×21×6,5 cm). Ab 2.500 Stück, Lieferzeit 8–12 Werktage.',
    features: [
      'Größen: Standard (12,5×17×9,5 cm), Small (9,5×11×9,5 cm), Flat (15×21×6,5 cm)',
      'Mengen: 2.500 / 5.000 / 8.000 / 10.000 Stück',
      'Mindestbestellung: 2.500 Stück'
    ]
  }),

  createProduct({
    id: 'p-011i',
    slug: 'lunchbox-individual',
    name: 'Lunchbox Individuell',
    category: 'Lebensmittelboxen',
    tier: 'individual',
    badge: 'Individualisiert',
    minOrder: 2500,
    priceHint: 'ab CHF 0.155 / Stück',
    shortDescription: 'Individuell bedruckte Lunchboxen in 3 Größen – mit Ihrem Branding.',
    longDescription: 'Lunchboxen mit vollständig individuellem Design in drei Größen. Kostenlose Designberatung inklusive. Ab 2.500 Stück, Lieferzeit 8–12 Werktage.',
    features: [
      'Vollständig individuelles Design (unbegrenzte Farben)',
      'Größen: Standard, Small, Flat',
      'Kostenlose Designberatung & Druckfreigabe',
      'Mindestbestellung: 2.500 Stück'
    ]
  }),

  createProduct({
    id: 'p-012',
    slug: 'pizzaboxen',
    name: 'Pizzaboxen',
    category: 'Lebensmittelboxen',
    tier: 'standard',
    badge: 'Standard / Eco',
    minOrder: 3000,
    priceHint: 'ab CHF 0.29 / Stück',
    shortDescription: 'Pizzaboxen in 5 Größen von XXS bis L – in Weiss oder Kraft.',
    longDescription: 'Pizzaboxen in 5 Standardgrößen: XXS (26×26×4 cm), XS (28×28×4 cm), S (30×30×4 cm), M (33×33×4 cm) und L (42×42×4 cm). Erhältlich in Weiss oder Kraft. Ab 3.000 Stück, Lieferzeit 8–12 Werktage.',
    features: [
      'Größen: XXS 26×26, XS 28×28, S 30×30, M 33×33, L 42×42 cm',
      'Ausführung: Weiss, Kraft',
      'Mengen: 3.000 / 5.000 / 8.000 / 10.000 Stück',
      'Mindestbestellung: 3.000 Stück'
    ]
  }),

  createProduct({
    id: 'p-012i',
    slug: 'pizzaboxen-individual',
    name: 'Pizzaboxen Individuell',
    category: 'Lebensmittelboxen',
    tier: 'individual',
    badge: 'Individualisiert',
    minOrder: 3000,
    priceHint: 'ab CHF 0.35 / Stück',
    shortDescription: 'Individuell bedruckte Pizzaboxen in 5 Größen – mit Ihrem Logo und Design.',
    longDescription: 'Pizzaboxen mit vollständig individuellem Design auf Weiss, Kraft oder Vollfarb. Kostenlose Designberatung inklusive. Ab 3.000 Stück, Lieferzeit 8–12 Werktage.',
    features: [
      'Vollständig individuelles Design (unbegrenzte Farben)',
      'Größen: XXS 26×26, XS 28×28, S 30×30, M 33×33, L 42×42 cm',
      'Ausführung: Weiss & Design, Kraft & Design, Ganz bunt',
      'Mindestbestellung: 3.000 Stück'
    ]
  }),

  /* ─── PAPIERTRAGETASCHEN ─────────────────────────────────── */
  createProduct({
    id: 'p-013',
    slug: 'papiertragetasche',
    name: 'Kraft Papiertragtasche',
    category: 'Papiertragetaschen',
    tier: 'standard',
    badge: 'Standard / Eco',
    minOrder: 2500,
    priceHint: 'ab CHF 0.125 / Stück',
    shortDescription: 'Papiertragtaschen in 5 Größen – in Kraft oder Weiss, mit 1–3+ Druckfarben.',
    longDescription: 'Kraft-Papiertragtaschen in 5 Standardgrößen von S bis XXL. Erhältlich in 90g oder 70g Papier, in Kraft (braun) oder Weiss. Druck auf einer oder mehreren Seiten mit 1, 2 oder 3+ Farben. Ab 2.500 Stück, Lieferzeit 8–12 Werktage.',
    features: [
      'Größen: S (24×18×8 cm), M (28×22×10 cm), L (31×25×12 cm), XL (41×31×12 cm), XXL (50,5×45×15 cm)',
      'Papier: 90g, 70g',
      'Farbe: Kraft (braun), Weiss',
      'Logo: 1 Farbe, 2 Farben, Keine Farben',
      'Mindestbestellung: 2.500 Stück'
    ]
  }),

  createProduct({
    id: 'p-013i',
    slug: 'papiertragetasche-individual',
    name: 'Papiertragtasche Individuell',
    category: 'Papiertragetaschen',
    tier: 'individual',
    badge: 'Individualisiert',
    minOrder: 2500,
    priceHint: 'ab CHF 0.155 / Stück',
    shortDescription: 'Vollständig individuell bedruckte Papiertragtaschen – Ihre Farben auf jeder Seite.',
    longDescription: 'Papiertragtaschen mit vollständig individuellem Design auf allen Seiten. Wählen Sie Größe, Papiergewicht und Druckfarben frei. Kostenlose Designberatung inklusive. Ab 2.500 Stück, Lieferzeit 8–12 Werktage.',
    features: [
      'Vollständig individuelles Design (3+ Farben, alle Seiten)',
      'Größen: S, M, L, XL, XXL',
      'Papier: 90g, 70g',
      'Kostenlose Designberatung & Druckfreigabe',
      'Mindestbestellung: 2.500 Stück'
    ]
  }),

  /* ─── SERVIETTEN & FEUCHTTÜCHER ─────────────────────────── */
  createProduct({
    id: 'p-014',
    slug: 'papiertuecher-bedruckt',
    name: 'Bedruckte Papiertücher',
    category: 'Servietten',
    tier: 'standard',
    badge: 'Standard / Eco',
    minOrder: 25000,
    priceHint: 'ab CHF 0.01 / Stück',
    shortDescription: 'Bedruckte Papiertücher in ¼- oder 1/8-Faltung – in Weiss oder Kraft, ab 25.000 Stück.',
    longDescription: 'Bedruckte Papiertücher (90g) in ¼-Faltung (12,5×12,5 cm) oder 1/8-Faltung (6,25×12,5 cm). Erhältlich in Weiss oder Kraft, mit 1–3+ Druckfarben oder ohne Druck. Ab 25.000 Stück, Lieferzeit 10–14 Werktage.',
    features: [
      'Stil: ¼-Faltung (12,5×12,5 cm), 1/8-Faltung (6,25×12,5 cm)',
      'Farbe: Weiss, Kraft',
      'Design: Ohne, 1 Farbe, 2 Farben, 3+ Farben',
      'Mengen: 25.000 / 30.000 / 40.000 / 50.000 Stück'
    ]
  }),

  createProduct({
    id: 'p-014i',
    slug: 'papiertuecher-individual',
    name: 'Papiertücher Individuell',
    category: 'Servietten',
    tier: 'individual',
    badge: 'Individualisiert',
    minOrder: 25000,
    priceHint: 'ab CHF 0.013 / Stück',
    shortDescription: 'Vollständig individuell bedruckte Papiertücher – Ihr Logo auf jeder Serviette.',
    longDescription: 'Papiertücher mit individuellem Vollfarb-Druck. Wählen Sie Faltung, Grundfarbe und Druckfarben frei. Kostenlose Designberatung inklusive. Ab 25.000 Stück, Lieferzeit 10–14 Werktage.',
    features: [
      'Vollständig individuelles Design (unbegrenzte Farben)',
      'Stil: ¼-Faltung, 1/8-Faltung',
      'Farbe: Weiss, Kraft, Wunschfarbe',
      'Mindestbestellung: 25.000 Stück'
    ]
  }),

  createProduct({
    id: 'p-015',
    slug: 'feuchttuecher-bedruckt',
    name: 'Feuchttücher bedruckt',
    category: 'Servietten',
    tier: 'standard',
    badge: 'Standard / Eco',
    minOrder: 10000,
    priceHint: 'ab CHF 0.03 / Stück',
    shortDescription: 'Bedruckte Feuchttücher in 5 Größen – in Weiss, Schwarz oder Wunschfarbe.',
    longDescription: 'Bedruckte Feuchttücher in 5 Größenvarianten, erhältlich in Weiss, Schwarz oder Ihrer Wunschfarbe. Mit 1, 2 oder 3+ Designfarben, in Dick oder Dünn. Ab 10.000 Stück, Lieferzeit 10–14 Werktage.',
    features: [
      'Größen: 8×6 cm, 10×5 cm, 12×5 cm, 13×5 cm, 14×6 cm',
      'Grundfarbe: Weiss, Schwarz, Wunschfarbe',
      'Design: 1 Farbe, 2 Farben, 3+ Farben',
      'Mengen: 10.000 / 20.000 / 30.000 / 50.000 Stück'
    ]
  }),

  createProduct({
    id: 'p-015i',
    slug: 'feuchttuecher-individual',
    name: 'Feuchttücher Individuell',
    category: 'Servietten',
    tier: 'individual',
    badge: 'Individualisiert',
    minOrder: 10000,
    priceHint: 'ab CHF 0.04 / Stück',
    shortDescription: 'Vollständig individuell bedruckte Feuchttücher – Ihr Design auf jeder Packung.',
    longDescription: 'Feuchttücher mit vollständig individuellem Design. Wählen Sie Größe, Grundfarbe und Druckfarben frei. Kostenlose Designberatung inklusive. Ab 10.000 Stück, Lieferzeit 10–14 Werktage.',
    features: [
      'Vollständig individuelles Design (unbegrenzte Farben)',
      'Größen: 8×6 cm, 10×5 cm, 12×5 cm, 13×5 cm, 14×6 cm',
      'Grundfarbe: Weiss, Schwarz, Wunschfarbe',
      'Mindestbestellung: 10.000 Stück'
    ]
  }),

  /* ─── VERPACKUNGSPAPIER ─────────────────────────────────── */
  createProduct({
    id: 'p-016',
    slug: 'lebensmittelpapier-bedruckt',
    name: 'Fettdichtes Lebensmittelpapier',
    category: 'Lebensmittelpapier',
    tier: 'standard',
    badge: 'Standard / Eco',
    minOrder: 250,
    priceHint: 'ab CHF 3.29 / kg',
    shortDescription: 'Fettdichtes Lebensmittelpapier in 5 Größen – in Weiss oder Braun, mit 1–3+ Druckfarben.',
    longDescription: 'Fettdichtes Lebensmittelpapier für Food-Konzepte, erhältlich in 5 Größen von XXS bis Large sowie als Wunschgröße. In Weiss (40g) oder Braun/Kraft (42g), mit 1, 2, 3 oder mehr Druckfarben. Bestelleinheit: KG. Ab 250 kg, Lieferzeit 8–12 Werktage.',
    features: [
      'Größen: XXS 25×17 cm, XS 25×34 cm, S 20×30 cm, M 30×40 cm, L 40×50 cm',
      'Papier: Weiss (40g), Braun/Kraft (42g)',
      'Druckfarben: 1, 2, 3, 3+ Farben',
      'Preis: ab CHF 3.29 / kg'
    ]
  }),

  createProduct({
    id: 'p-016i',
    slug: 'lebensmittelpapier-individual',
    name: 'Lebensmittelpapier Individuell',
    category: 'Lebensmittelpapier',
    tier: 'individual',
    badge: 'Individualisiert',
    minOrder: 250,
    priceHint: 'ab CHF 3.89 / kg',
    shortDescription: 'Vollständig individuell bedrucktes Lebensmittelpapier – Ihr Design, Ihre Farben.',
    longDescription: 'Lebensmittelpapier mit vollständig individuellem Design auf Weiss oder Kraft. Kostenlose Designberatung inklusive. Bestelleinheit: KG. Ab 250 kg, Lieferzeit 8–12 Werktage.',
    features: [
      'Vollständig individuelles Design (unbegrenzte Farben)',
      'Größen: XXS bis L, Wunschgröße',
      'Papier: Weiss, Braun/Kraft',
      'Kostenlose Designberatung & Druckfreigabe'
    ]
  }),

  createProduct({
    id: 'p-017',
    slug: 'verpackungspapier-takeaway',
    name: 'Verpackungspapier Take-Away',
    category: 'Lebensmittelpapier',
    tier: 'standard',
    badge: 'Standard / Eco',
    minOrder: 20,
    priceHint: 'ab CHF 13.65 / kg',
    shortDescription: 'Bedruckte Take-Away Verpackungspapiere in 3 Größen – in Weiss oder Braun, ab 20 kg.',
    longDescription: 'Bedrucktes Take-Away-Verpackungspapier in 3 Standardgrößen (12×23 cm, 12×28 cm, 12×25 cm). In Weiss oder Braun (Kraft), mit 1, 2 oder 3 Druckfarben. Bestelleinheit: KG. Ab 20 kg, Lieferzeit 8–12 Werktage.',
    features: [
      'Größen: 12×23 cm, 12×28 cm, 12×25 cm, Wunschgröße',
      'Papier: Weiss, Braun (Kraft)',
      'Design: 1 Farbe, 2 Farben, 3 Farben',
      'Mengen: 20 kg / 30 kg / 50 kg / 100 kg'
    ]
  }),

  createProduct({
    id: 'p-017i',
    slug: 'verpackungspapier-individual',
    name: 'Verpackungspapier Individuell',
    category: 'Lebensmittelpapier',
    tier: 'individual',
    badge: 'Individualisiert',
    minOrder: 20,
    priceHint: 'ab CHF 16.50 / kg',
    shortDescription: 'Vollständig individuell bedrucktes Take-Away Verpackungspapier – Ihr Logo auf jeder Rolle.',
    longDescription: 'Take-Away Verpackungspapier mit vollständig individuellem Design. Wählen Sie Größe und Druckfarben frei. Kostenlose Designberatung inklusive. Ab 20 kg, Lieferzeit 8–12 Werktage.',
    features: [
      'Vollständig individuelles Design (unbegrenzte Farben)',
      'Größen: 12×23 cm, 12×28 cm, 12×25 cm, Wunschgröße',
      'Papier: Weiss, Braun (Kraft)',
      'Mindestbestellung: 20 kg'
    ]
  }),
];

export function getLocalProductBySlug(slug) {
  return localProducts.find((p) => p.slug === slug) || null;
}
