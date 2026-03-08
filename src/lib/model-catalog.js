const baseSource = 'https://poly.pizza';

export const coreModelFamilies = [
  {
    id: 'cup',
    label: 'Core Cup',
    description: 'Takeaway & Beverage Packaging',
    modelUrl: '/models/premium/core-cup.glb',
    baseTintStrength: 0.24,
    baseRotation: [0, 0.65, 0],
    credit: {
      title: 'Coffee cup',
      author: 'Poly by Google',
      license: 'CC-BY 3.0',
      sourceUrl: `${baseSource}/m/8-L4ibtXS8d`
    },
    variants: [
      {
        id: 'cup-classic',
        label: 'Classic 12oz',
        detail: 'Standardprofil',
        scale: 1,
        rotationY: 0,
        tintStrength: 0.22,
        roughnessBias: 0.04,
        metalnessBias: 0,
        brandOffset: [0, -0.02, 0.82]
      },
      {
        id: 'cup-tall',
        label: 'Tall 16oz',
        detail: 'Mehr Volumen',
        scale: 1.08,
        rotationY: 0.05,
        tintStrength: 0.2,
        roughnessBias: 0.02,
        metalnessBias: 0.02,
        brandOffset: [0, 0.04, 0.86]
      },
      {
        id: 'cup-cold',
        label: 'Cold Cup',
        detail: 'Kaltgetraenke',
        scale: 1.04,
        rotationY: -0.06,
        tintStrength: 0.32,
        roughnessBias: -0.08,
        metalnessBias: 0.08,
        brandOffset: [0, 0.02, 0.84]
      }
    ]
  },
  {
    id: 'bag',
    label: 'Core Bag',
    description: 'Carry & Retail Packaging',
    modelUrl: '/models/premium/core-bag.glb',
    baseTintStrength: 0.32,
    baseRotation: [0, -0.34, 0],
    credit: {
      title: 'Bags',
      author: 'Quaternius',
      license: 'CC0 1.0',
      sourceUrl: `${baseSource}/m/gzvyAQ797z`
    },
    variants: [
      {
        id: 'bag-retail',
        label: 'Retail',
        detail: 'Flachhenkel Look',
        scale: 1,
        rotationY: 0,
        tintStrength: 0.34,
        roughnessBias: 0.05,
        metalnessBias: 0,
        brandOffset: [0, 0.03, 0.82]
      },
      {
        id: 'bag-twist',
        label: 'Twist Handle',
        detail: 'Food Service',
        scale: 1.08,
        rotationY: 0.15,
        tintStrength: 0.28,
        roughnessBias: 0.02,
        metalnessBias: 0.02,
        brandOffset: [0, 0.07, 0.86]
      },
      {
        id: 'bag-premium',
        label: 'Premium',
        detail: 'Luxury Carry',
        scale: 0.94,
        rotationY: -0.14,
        tintStrength: 0.38,
        roughnessBias: -0.08,
        metalnessBias: 0.08,
        brandOffset: [0, 0.12, 0.84]
      }
    ]
  },
  {
    id: 'box',
    label: 'Core Box',
    description: 'Food Box & Delivery Formats',
    modelUrl: '/models/premium/core-box.glb',
    baseTintStrength: 0.2,
    baseRotation: [0, 0.32, 0],
    credit: {
      title: 'Box of Macaroons',
      author: 'Bruno Oliveira',
      license: 'CC-BY 3.0',
      sourceUrl: `${baseSource}/m/4WkEQfHL-9P`
    },
    variants: [
      {
        id: 'box-snack',
        label: 'Snack Box',
        detail: 'Kompakt',
        scale: 1,
        rotationY: 0,
        tintStrength: 0.16,
        roughnessBias: 0.08,
        metalnessBias: 0,
        brandOffset: [0, -0.03, 0.86]
      },
      {
        id: 'box-meal',
        label: 'Meal Box',
        detail: 'Groesseres Format',
        scale: 1.11,
        rotationY: 0.1,
        tintStrength: 0.2,
        roughnessBias: 0.05,
        metalnessBias: 0.02,
        brandOffset: [0, 0.02, 0.88]
      },
      {
        id: 'box-delivery',
        label: 'Delivery Box',
        detail: 'Robustes Profil',
        scale: 1.05,
        rotationY: -0.12,
        tintStrength: 0.26,
        roughnessBias: -0.03,
        metalnessBias: 0.05,
        brandOffset: [0, 0.06, 0.9]
      }
    ]
  }
];

export const productModelCatalog = [
  {
    id: 'pappbecher',
    label: 'Pappbecher',
    description: 'Coffee & Beverage Cups',
    modelUrl: '/models/premium/core-cup.glb',
    type: 'cup',
    defaultCore: 'cup',
    tintStrength: 0.24,
    credit: coreModelFamilies[0].credit
  },
  {
    id: 'plastikbecher',
    label: 'Plastikbecher',
    description: 'Cold Drink Cups',
    modelUrl: '/models/premium/product-plasticcups.glb',
    type: 'cup',
    defaultCore: 'cup',
    tintStrength: 0.2,
    credit: {
      title: 'Cups',
      author: 'Poly by Google',
      license: 'CC-BY 3.0',
      sourceUrl: `${baseSource}/m/8r7h3KYdWe-`
    }
  },
  {
    id: 'eisbecher',
    label: 'Eisbecher',
    description: 'Ice Cream Packaging',
    modelUrl: '/models/premium/product-icecream.glb',
    type: 'cup',
    defaultCore: 'cup',
    tintStrength: 0.18,
    credit: {
      title: 'Ice Cream',
      author: 'Tom Adam',
      license: 'CC-BY 3.0',
      sourceUrl: `${baseSource}/m/8zZVpXq9KVG`
    }
  },
  {
    id: 'papiertueten',
    label: 'Papiertüten',
    description: 'Retail & Carry Bags',
    modelUrl: '/models/premium/core-bag.glb',
    type: 'bag',
    defaultCore: 'bag',
    tintStrength: 0.32,
    credit: coreModelFamilies[1].credit
  },
  {
    id: 'lebensmittelboxen',
    label: 'Lebensmittelboxen',
    description: 'Takeaway Food Boxes',
    modelUrl: '/models/premium/product-foodbox.glb',
    type: 'box',
    defaultCore: 'box',
    tintStrength: 0.22,
    credit: {
      title: 'Box of Cigars',
      author: 'Germano Almeida',
      license: 'CC-BY 3.0',
      sourceUrl: `${baseSource}/m/7ErOQkfAsKD`
    }
  },
  {
    id: 'servietten',
    label: 'Servietten',
    description: 'Napkins & Tissue Products',
    modelUrl: '/models/premium/product-napkin.glb',
    type: 'napkin',
    defaultCore: 'box',
    tintStrength: 0.28,
    credit: {
      title: 'Towel',
      author: 'Poly by Google',
      license: 'CC-BY 3.0',
      sourceUrl: `${baseSource}/m/19oMd_9kHDT`
    }
  },
  {
    id: 'salat-schalen',
    label: 'Salat Schalen',
    description: 'Bowls & Fresh Food',
    modelUrl: '/models/premium/product-saladbowl.glb',
    type: 'box',
    defaultCore: 'box',
    tintStrength: 0.2,
    credit: {
      title: 'Salad Bowl',
      author: 'Jarlan Perez',
      license: 'CC-BY 3.0',
      sourceUrl: `${baseSource}/m/9lnNCNuF5w0`
    }
  },
  {
    id: 'wrapping-paper',
    label: 'Wrapping Paper',
    description: 'Wrapping Sheets',
    modelUrl: '/models/premium/product-wrappaper.glb',
    type: 'sheet',
    defaultCore: 'box',
    tintStrength: 0.16,
    credit: {
      title: 'Various Stacks of Paper',
      author: 'Jarlan Perez',
      license: 'CC-BY 3.0',
      sourceUrl: `${baseSource}/m/0DL5rjkcbTH`
    }
  },
  {
    id: 'deckel',
    label: 'Deckel',
    description: 'Lids & Closures',
    modelUrl: '/models/premium/product-lid.glb',
    type: 'lid',
    defaultCore: 'cup',
    tintStrength: 0.14,
    credit: {
      title: 'Lid',
      author: 'Isa Lousberg',
      license: 'CC0 1.0',
      sourceUrl: `${baseSource}/m/bHEcUK0BDZ`
    }
  },
  {
    id: 'wraps',
    label: 'Wraps',
    description: 'Wrap & Sheet Formats',
    modelUrl: '/models/premium/product-package.glb',
    type: 'sheet',
    defaultCore: 'box',
    tintStrength: 0.18,
    credit: {
      title: 'Package',
      author: 'Username12',
      license: 'CC-BY 3.0',
      sourceUrl: `${baseSource}/m/AcCeVfaVOz`
    }
  }
];

const categoryLookup = {
  Becher: 'pappbecher',
  Boxen: 'lebensmittelboxen',
  Taschen: 'papiertueten',
  Deckel: 'deckel',
  Wraps: 'wraps',
  pappbecher: 'pappbecher',
  papiertueten: 'papiertueten',
  lebensmittelboxen: 'lebensmittelboxen',
  servietten: 'servietten',
  'salat-schalen': 'salat-schalen',
  'wrapping-paper': 'wrapping-paper',
  plastikbecher: 'plastikbecher',
  eisbecher: 'eisbecher'
};

export const productModelLookup = Object.fromEntries(productModelCatalog.map((item) => [item.id, item]));

export function detectProductModelId({ productType = '', productCategory = '', productName = '' }) {
  if (productCategory && categoryLookup[productCategory]) {
    return categoryLookup[productCategory];
  }

  const lowerType = productType.toLowerCase();
  if (lowerType.includes('bag') || lowerType.includes('tuet')) return 'papiertueten';
  if (lowerType.includes('box')) return 'lebensmittelboxen';
  if (lowerType.includes('cup')) return 'pappbecher';

  const name = productName.toLowerCase();
  if (name.includes('becher')) return 'pappbecher';
  if (name.includes('plastik')) return 'plastikbecher';
  if (name.includes('eis')) return 'eisbecher';
  if (name.includes('tuet')) return 'papiertueten';
  if (name.includes('box') || name.includes('schale')) return 'lebensmittelboxen';
  if (name.includes('serviett')) return 'servietten';
  if (name.includes('wrap')) return 'wraps';
  if (name.includes('deckel')) return 'deckel';

  return 'pappbecher';
}

export function getCoreFamily(familyId = 'cup') {
  return coreModelFamilies.find((item) => item.id === familyId) || coreModelFamilies[0];
}

export function getVariant(familyId = 'cup', variantId) {
  const family = getCoreFamily(familyId);
  return family.variants.find((variant) => variant.id === variantId) || family.variants[0];
}

export function getProductModel(productId = 'pappbecher') {
  return productModelLookup[productId] || productModelCatalog[0];
}

export const modelAssetUrls = [
  ...new Set([
    ...coreModelFamilies.map((item) => item.modelUrl),
    ...productModelCatalog.map((item) => item.modelUrl)
  ])
];
