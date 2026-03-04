import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle,
  CheckCircle2,
  Minus,
  Palette,
  Plus,
  Recycle,
  Shield,
  ShoppingCart,
  Truck
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import { categorySlugMap } from '@/lib/product-categories';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const categoryImageMap = {
  Pappbecher: '/images/pappbecher-espresso.jpeg',
  Eisbecher: '/images/eisbecher-basic-100ml.png',
  Plastikbecher: '/images/plastikbecher-basic-470ml.png',
  Mehrwegbecher: '/images/plastikbecher-basic-470ml.png',
  Deckel: '/images/food-boxes.jpg',
  Lebensmittelboxen: '/images/food-boxes.jpg',
  Schalen: '/images/food-boxes.jpg',
  Papiertragetaschen: '/images/paper-bags.jpg',
  Lebensmittelpapier: '/images/lebensmittelpapier-standard.png',
  Servietten: '/images/napkins.jpg',
  Zubehoer: '/images/food-boxes.jpg'
};

const productImageMap = {
  'pappbecher-basic': '/images/pappbecher-basic-100ml-weiss.png',
  'pappbecher-individual': '/images/pappbecher-individual-main.png',
  'pappbecher-deckel': '/images/pappbecher-deckel-weiss-new.jpeg',
  'plastikbecher-standard': '/images/plastikbecher-basic-350ml.png',
  'plastikbecher-individual': '/images/plastikbecher-550ml.png',
  'deckel-plastik': '/images/plastikbecher-deckel-flach-new.png',
  'deckel-standard': '/images/plastikbecher-deckel-flach-new.png',
  'deckel-dome-papier': '/images/plastikbecher-deckel-smoothie-new.png',
  'deckel-flat-papier': '/images/plastikbecher-deckel-sip-new.png',
  'eisbecher-standard': '/images/eisbecher-basic-100ml.png',
  'eisbecher-individual': '/images/eisbecher-200ml.png',
  'doener-tuete-klassisch': '/images/doener-tuete-klassisch.png',
  'doener-tuete-individual': '/images/doener-tuete-individual.png'
};

const defaultSizesByCategory = {
  Pappbecher: ['100 ml Espresso', '200 ml', '240 ml', '400 ml', '470 ml'],
  Plastikbecher: ['350 ml', '470 ml', '500 ml', '550 ml', '700 ml'],
  Mehrwegbecher: ['250 ml', '300 ml', '400 ml', '500 ml'],
  Eisbecher: ['100 ml', '200 ml', '250 ml', '300 ml'],
  Deckel: ['Standard'],
  Lebensmittelboxen: ['500 ml', '750 ml', '1000 ml'],
  Schalen: ['750 ml', '1000 ml', '1300 ml'],
  Papiertragetaschen: ['S', 'M', 'L'],
  Lebensmittelpapier: ['500x350', '250x335', '250x167', '167x167'],
  Servietten: ['20x20', '24x24', '33x33', '40x40'],
  Zubehoer: ['Standard']
};

const sizeOptionsBySlug = {
  'pappbecher-basic': ['100 ml Espresso', '200 ml', '240 ml', '400 ml', '470 ml', 'Wunschgroesse (eingeben)'],
  'pappbecher-individual': ['100 ml Espresso', '200 ml', '240 ml', '400 ml', '470 ml', 'Wunschgroesse (eingeben)'],
  'pappbecher-deckel': ['200 ml', '240 ml', '400 ml', '470 ml', 'Wunschgroesse (eingeben)'],
  'eisbecher-standard': ['100 ml', '200 ml', '250 ml', '300 ml', 'Wunschgroesse (eingeben)'],
  'eisbecher-individual': ['100 ml', '200 ml', '250 ml', '300 ml', 'Wunschgroesse (eingeben)']
};

const quantityPresetsBySlug = {
  'pappbecher-basic': [2500, 5000, 7500, 10000],
  'pappbecher-individual': [2500, 5000, 7500, 10000],
  'pappbecher-deckel': [2500, 5000, 7500, 10000],
  'eisbecher-standard': [2500, 5000, 7500, 10000],
  'eisbecher-individual': [2500, 5000, 7500, 10000]
};

const stabilityOptionsBySlug = {
  'pappbecher-basic': ['Einwandig', 'Doppelwandig (ideal fuer Kaffee)'],
  'pappbecher-individual': ['Einwandig', 'Doppelwandig (ideal fuer Kaffee)']
};

const itemColorOptionsBySlug = {
  'pappbecher-basic': ['Weiss', 'Schwarz', 'Natur'],
  'pappbecher-individual': ['Weiss', 'Schwarz', 'Natur']
};

const lidColorOptionsBySlug = {
  'pappbecher-deckel': ['Weiss', 'Schwarz', 'Wunschfarbe (eingeben)']
};

const lidMaterialOptionsBySlug = {
  'pappbecher-deckel': [
    'Standard',
    'Karton (Flachdeckel)',
    'PLA biologisch abbaubar (Bio)',
    'PET flach (transparent)',
    'PET Dome (transparent)'
  ]
};

const pappbecherCupSlugs = ['pappbecher-basic', 'pappbecher-individual'];
const pappbecherTierSlugMap = {
  'pappbecher-basic': { standard: 'pappbecher-basic', individual: 'pappbecher-individual' },
  'pappbecher-individual': { standard: 'pappbecher-basic', individual: 'pappbecher-individual' }
};
const pappbecherConfigSlugs = [...pappbecherCupSlugs, 'pappbecher-deckel'];

const galleryImagesBySlug = {
  'pappbecher-basic': [
    '/images/pappbecher-basic-100ml-weiss.png',
    '/images/pappbecher-basic-200ml-weiss.png',
    '/images/pappbecher-basic-240ml-weiss.png',
    '/images/pappbecher-basic-400ml-weiss.png',
    '/images/pappbecher-basic-470ml-weiss.png'
  ],
  'pappbecher-individual': [
    '/images/pappbecher-espresso.jpeg',
    '/images/pappbecher-200ml.jpeg',
    '/images/pappbecher-individual-main.png',
    '/images/pappbecher-475ml.jpeg',
    '/images/pappbecher-doppelwandig-new.jpeg'
  ],
  'pappbecher-deckel': [
    '/images/pappbecher-deckel-weiss-new.jpeg',
    '/images/pappbecher-deckel-schwarz-new.jpeg',
    '/images/pappbecher-deckel-transparent-new.jpeg',
    '/images/pappbecher-deckel-karton.png'
  ],
  'eisbecher-standard': [
    '/images/eisbecher-basic-100ml.png',
    '/images/eisbecher-basic-200ml.png',
    '/images/eisbecher-basic-300ml.png',
    '/images/eisbecher-basic-mit-deckel.png'
  ],
  'eisbecher-individual': [
    '/images/eisbecher-100ml.png',
    '/images/eisbecher-200ml.png',
    '/images/eisbecher-300ml.png'
  ],
  'plastikbecher-standard': [
    '/images/plastikbecher-basic-350ml.png',
    '/images/plastikbecher-basic-470ml.png',
    '/images/plastikbecher-basic-500ml.png',
    '/images/plastikbecher-basic-550ml.png',
    '/images/plastikbecher-basic-700ml.png'
  ],
  'plastikbecher-individual': [
    '/images/plastikbecher-700ml.png',
    '/images/plastikbecher-550ml.png',
    '/images/plastikbecher-470ml.png',
    '/images/plastikbecher-400ml.png',
    '/images/plastikbecher-350ml.png'
  ],
  'deckel-plastik': [
    '/images/plastikbecher-deckel-flach-new.png',
    '/images/plastikbecher-deckel-smoothie-new.png',
    '/images/plastikbecher-deckel-sip-new.png'
  ]
};

const lidBasePriceByCategory = {
  Pappbecher: 0.06,
  Plastikbecher: 0.04,
  Eisbecher: 0.05,
  Mehrwegbecher: 0.05
};

const lidOptionsByCategory = {
  Pappbecher: [
    { id: 'standard', label: 'Standard Deckel', delta: 0 },
    { id: 'dome-paper', label: 'Dome Deckel (Papier)', delta: 0.01 },
    { id: 'flat-paper', label: 'Flat Deckel (Papier)', delta: 0.005 }
  ],
  Plastikbecher: [
    { id: 'flach', label: 'Flach', delta: 0.004 },
    { id: 'smoothie', label: 'Smoothie Deckel', delta: 0.01 },
    { id: 'sip', label: 'Sip Deckel', delta: 0.004 }
  ],
  Eisbecher: [
    { id: 'mit-deckel', label: 'Mit Deckel', delta: 0.004 },
    { id: 'ohne-deckel', label: 'Ohne Deckel', delta: 0 }
  ],
  Mehrwegbecher: [{ id: 'standard', label: 'Standard Deckel', delta: 0 }]
};

const defaultPrintPalette = [
  { value: 'schwarz', label: 'Schwarz', hex: '#111111' },
  { value: 'weiss', label: 'Weiss', hex: '#f5f5f5' },
  { value: 'kraft', label: 'Kraft Braun', hex: '#b78752' },
  { value: 'blau', label: 'Blau', hex: '#2f58d1' },
  { value: 'rot', label: 'Rot', hex: '#d63b3b' },
  { value: 'orange', label: 'Orange', hex: '#d5842b' },
  { value: 'gruen', label: 'Gruen', hex: '#4f9b55' },
  { value: 'gelb', label: 'Gelb', hex: '#d0ba34' }
];

const categoryPrintPalette = {
  Papiertragetaschen: [
    { value: 'weiss', label: 'Weiss', hex: '#f5f5f5' },
    { value: 'kraft', label: 'Kraft Braun', hex: '#b78752' },
    { value: 'schwarz', label: 'Schwarz', hex: '#111111' },
    { value: 'rot', label: 'Rot', hex: '#d63b3b' }
  ],
  Lebensmittelpapier: [
    { value: 'weiss', label: 'Weiss', hex: '#f5f5f5' },
    { value: 'kraft', label: 'Kraft Braun', hex: '#b78752' },
    { value: 'gefaerbt', label: 'Gefaerbt', hex: '#6c6c6c' },
    { value: 'schwarz', label: 'Schwarz', hex: '#111111' }
  ],
  Servietten: [
    { value: 'weiss', label: 'Weiss', hex: '#f5f5f5' },
    { value: 'schwarz', label: 'Schwarz', hex: '#111111' },
    { value: 'farbig', label: 'Farbig', hex: '#4f9b55' }
  ]
};

function getProductImage(product) {
  if (productImageMap[product.slug]) return productImageMap[product.slug];
  return categoryImageMap[product.category] || '/images/food-boxes.jpg';
}

function getTier(product) {
  if (product.tier) return product.tier;
  const source = `${product.slug || ''} ${product.name || ''}`.toLowerCase();
  if (source.includes('premium')) return 'premium';
  if (source.includes('individual')) return 'individual';
  return 'standard';
}

function getTierBadgeClass(tier) {
  if (tier === 'premium') return 'border-[#7c6a38] bg-[#fff8e8] text-[#5a4720]';
  if (tier === 'individual') return 'border-[#5c5ad6] bg-[#f4f3ff] text-[#3230a3]';
  return 'border-[#85f04b] bg-[#f4ffea] text-[#2e5d17]';
}

function getTierLabel(tier, fallback) {
  if (fallback) return fallback;
  if (tier === 'premium') return 'Premium';
  if (tier === 'individual') return 'Individual';
  return 'Eco / Standard';
}

function getColorOptions(product) {
  if (pappbecherCupSlugs.includes(product.slug)) {
    return ['1 Farbe Logo', '2 Farben Logo', '3 Farben und mehr'];
  }
  if (product.category === 'Eisbecher') {
    return ['1 Farbe', '2 Farben', '3 und mehr Farben'];
  }
  if (product.category === 'Plastikbecher') {
    return ['1 Farbe', '2 Farben', '3 Farben', '4 Farben', '5 Farben', '6 Farben'];
  }
  if (product.category === 'Papiertragetaschen' || product.slug.includes('blockboden') || product.slug.includes('brottueten')) {
    return ['1 Farbe', '2 Farben'];
  }
  if (product.slug.includes('pizza')) {
    return ['1 Farbe', '2 Farben', '3 Farben'];
  }
  return ['1 Farbe', '2 Farben', '3 Farben', '4 Farben'];
}

function getColorSurcharge(index) {
  if (index <= 0) return 0;
  return 0.002 * index;
}

function hasNumericColorModel(options = []) {
  return options.some((item) => /\d+/.test(String(item)));
}

function getPrintPalette(product) {
  if (categoryPrintPalette[product.category]) return categoryPrintPalette[product.category];
  if (product.slug.includes('blockboden') || product.slug.includes('brottueten') || product.slug.includes('doener')) {
    return categoryPrintPalette.Papiertragetaschen;
  }
  return defaultPrintPalette;
}

function parseColorCount(option) {
  const match = String(option || '').match(/\d+/);
  const parsed = match ? Number(match[0]) : 1;
  if (!Number.isFinite(parsed) || parsed < 1) return 1;
  return parsed;
}

function buildColorSelection(previous, count, palette) {
  const safePalette = palette.length ? palette : defaultPrintPalette;
  const next = [];

  for (let index = 0; index < count; index += 1) {
    const current = previous[index];
    const existsInPalette = safePalette.some((item) => item.value === current);
    if (existsInPalette) {
      next.push(current);
      continue;
    }

    const fallback = safePalette.find((item) => !next.includes(item.value)) || safePalette[0];
    next.push(fallback.value);
  }

  return next;
}

export default function ProductDetailPage({ product }) {
  const router = useRouter();
  const pageRef = useScrollReveal();
  const contentRef = useScrollReveal();

  const minOrder = product.minOrder || 100;
  const tier = getTier(product);
  const isCustomizable = tier === 'individual';

  const [quantity, setQuantity] = useState(minOrder);
  const [quantityInput, setQuantityInput] = useState(String(minOrder));
  const [quantityHint, setQuantityHint] = useState('');

  const sizes = useMemo(
    () => sizeOptionsBySlug[product.slug] || defaultSizesByCategory[product.category] || ['Standard'],
    [product.slug, product.category]
  );
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [customSize, setCustomSize] = useState('');

  const colorOptions = useMemo(() => getColorOptions(product), [product]);
  const printPalette = useMemo(() => getPrintPalette(product), [product]);
  const [selectedColorCount, setSelectedColorCount] = useState(colorOptions[0]);
  const [selectedPrintColors, setSelectedPrintColors] = useState(() =>
    buildColorSelection([], parseColorCount(colorOptions[0]), printPalette)
  );
  const colorModelHasNumbers = useMemo(() => hasNumericColorModel(colorOptions), [colorOptions]);
  const isPappbecherCup = pappbecherCupSlugs.includes(product.slug);
  const supportsCustomizationFlow = isCustomizable;
  const hasDesignSelection =
    supportsCustomizationFlow && (isPappbecherCup || product.category === 'Eisbecher');

  const stabilityOptions = stabilityOptionsBySlug[product.slug] || [];
  const [selectedStability, setSelectedStability] = useState(stabilityOptions[0] || '');

  const itemColorOptions = itemColorOptionsBySlug[product.slug] || [];
  const [selectedItemColor, setSelectedItemColor] = useState(itemColorOptions[0] || '');

  const lidColorOptions = lidColorOptionsBySlug[product.slug] || [];
  const [selectedLidColor, setSelectedLidColor] = useState(lidColorOptions[0] || '');
  const [customLidColor, setCustomLidColor] = useState('');

  const lidMaterialOptions = lidMaterialOptionsBySlug[product.slug] || [];
  const [selectedLidMaterial, setSelectedLidMaterial] = useState(lidMaterialOptions[0] || '');

  const quantityPresets = quantityPresetsBySlug[product.slug] || [];
  const galleryImages = useMemo(() => {
    if (product.slug === 'pappbecher-basic' && selectedStability.toLowerCase().includes('doppel')) {
      return [
        '/images/pappbecher-doppelwandig-weiss.png',
        '/images/pappbecher-doppelwandig-schwarz.png',
        '/images/pappbecher-doppelwandig-natur.png'
      ];
    }
    return galleryImagesBySlug[product.slug] || [];
  }, [product.slug, selectedStability]);
  const [activeTab, setActiveTab] = useState('beschreibung');
  const [manualPreviewImage, setManualPreviewImage] = useState('');

  const isCupCategory = ['Pappbecher', 'Plastikbecher', 'Eisbecher', 'Mehrwegbecher'].includes(product.category);
  const isPappbecherCategory = product.category === 'Pappbecher';
  const hideSizeSelection = product.category === 'Deckel';
  const showTierSwitch = isPappbecherCup || !pappbecherConfigSlugs.includes(product.slug);
  const showLegacyLidAddon = isCupCategory && !pappbecherConfigSlugs.includes(product.slug);
  const lidOptions = lidOptionsByCategory[product.category] || [{ id: 'standard', label: 'Standard Deckel', delta: 0 }];
  const [addLid, setAddLid] = useState(false);
  const [lidType, setLidType] = useState(lidOptions[0].id);
  const [lidQuantity, setLidQuantity] = useState(minOrder);

  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const categorySlug = categorySlugMap[product.category] || '';
  const categoryImage = getProductImage(product);

  const priceValue = Number(String(product.priceHint).replace('ab CHF ', '').replace(' / Stueck', '')) || 0;
  const colorIndex = Math.max(0, colorOptions.indexOf(selectedColorCount));
  const colorSurcharge = hasDesignSelection && colorModelHasNumbers ? getColorSurcharge(colorIndex) : 0;
  const selectedColorSlots = parseColorCount(selectedColorCount);
  const colorLabelLookup = useMemo(
    () => Object.fromEntries(printPalette.map((item) => [item.value, item.label])),
    [printPalette]
  );
  const selectedColorLabels = colorModelHasNumbers
    ? selectedPrintColors.slice(0, selectedColorSlots).map((value) => colorLabelLookup[value] || value)
    : [selectedColorCount];
  const designSelectionLabel = isPappbecherCup
    ? 'Druckfarben (Logo)'
    : 'Anzahl der Farben';

  const wantsCustomSize = !hideSizeSelection && selectedSize.toLowerCase().includes('wunschgroesse');
  const resolvedSize = hideSizeSelection ? '' : (wantsCustomSize ? (customSize.trim() || 'Wunschgroesse') : selectedSize);
  const usesColorSlotSelection = hasDesignSelection && colorModelHasNumbers;
  const resolvedPrintColors = usesColorSlotSelection ? selectedColorLabels.join(', ') : '';
  const resolvedItemColor = selectedItemColor || '';
  const resolvedLidColor = selectedLidColor.includes('Wunschfarbe')
    ? (customLidColor.trim() || 'Wunschfarbe')
    : selectedLidColor;

  const selectedLidOption = lidOptions.find((item) => item.id === lidType) || lidOptions[0];
  const lidUnitPrice = (lidBasePriceByCategory[product.category] || 0) + (selectedLidOption?.delta || 0);
  const lidTotalPrice = addLid ? lidQuantity * lidUnitPrice : 0;

  const unitPrice = priceValue + colorSurcharge;

  const baseSlug = product.slug.replace(/-(standard|premium|individual)$/, '');
  const tierSlugFamily = pappbecherTierSlugMap[product.slug] || null;
  const tierOptions = tierSlugFamily
    ? [
      { key: 'standard', label: 'Eco / Standard', className: 'border-[#85f04b] bg-[#f4ffea] text-[#2e5d17]' },
      { key: 'individual', label: 'Individual', className: 'border-[#5c5ad6] bg-[#f4f3ff] text-[#3230a3]' }
    ]
    : [
      { key: 'standard', label: 'Eco / Standard', className: 'border-[#85f04b] bg-[#f4ffea] text-[#2e5d17]' },
      { key: 'premium', label: 'Premium', className: 'border-[#7c6a38] bg-[#fff8e8] text-[#5a4720]' },
      { key: 'individual', label: 'Individual', className: 'border-[#5c5ad6] bg-[#f4f3ff] text-[#3230a3]' }
    ];

  const detailImage = useMemo(() => {
    if (addLid && product.category === 'Plastikbecher' && !hideSizeSelection) {
      const lidId = selectedLidOption?.id || 'standard';
      if (lidId === 'smoothie' || lidId === 'dome-paper' || lidId === 'mit-deckel') {
        return '/images/plastikbecher-deckel-smoothie-new.png';
      }
      if (lidId === 'sip' || lidId === 'flat-paper' || lidId === 'flat-plastic') {
        return '/images/plastikbecher-deckel-sip-new.png';
      }
      return '/images/plastikbecher-deckel-flach-new.png';
    }

    if (addLid && product.category === 'Pappbecher' && !hideSizeSelection) {
      const lidId = selectedLidOption?.id || 'standard';
      if (lidId === 'dome-paper') {
        return '/images/pappbecher-deckel-transparent-new.jpeg';
      }
      if (lidId === 'flat-paper') {
        return '/images/pappbecher-deckel-karton.png';
      }
      return '/images/pappbecher-deckel-weiss-new.jpeg';
    }

    if (addLid && product.category === 'Eisbecher' && !hideSizeSelection) {
      const lidId = selectedLidOption?.id || 'ohne-deckel';
      if (lidId === 'mit-deckel') {
        return '/images/eisbecher-basic-mit-deckel.png';
      }
    }

    if (product.slug === 'pappbecher-deckel') {
      const normalizedMaterial = selectedLidMaterial.toLowerCase();
      if (normalizedMaterial.includes('karton')) {
        return '/images/pappbecher-deckel-weiss-new.jpeg';
      }
      if (normalizedMaterial.includes('pla')) {
        return '/images/pappbecher-deckel-weiss-new.jpeg';
      }
      if (normalizedMaterial.includes('pet flach')) {
        return '/images/pappbecher-deckel-transparent-new.jpeg';
      }
      if (normalizedMaterial.includes('pet dome')) {
        return '/images/pappbecher-deckel-transparent-new.jpeg';
      }
      return resolvedLidColor.toLowerCase().includes('schwarz')
        ? '/images/pappbecher-deckel-schwarz-new.jpeg'
        : '/images/pappbecher-deckel-weiss-new.jpeg';
    }
    if (isPappbecherCup) {
      const normalizedSize = resolvedSize.toLowerCase();
      const normalizedItemColor = resolvedItemColor.toLowerCase();

      if (product.slug === 'pappbecher-basic' && !selectedStability.toLowerCase().includes('doppel')) {
        const colorKey = normalizedItemColor.includes('schwarz')
          ? 'schwarz'
          : normalizedItemColor.includes('natur')
            ? 'natur'
            : 'weiss';

        if (normalizedSize.includes('100')) {
          return `/images/pappbecher-basic-100ml-${colorKey}.png`;
        }
        if (normalizedSize.includes('200')) {
          return `/images/pappbecher-basic-200ml-${colorKey}.png`;
        }
        if (normalizedSize.includes('240')) {
          return `/images/pappbecher-basic-240ml-${colorKey}.png`;
        }
        if (normalizedSize.includes('400')) {
          return `/images/pappbecher-basic-400ml-${colorKey}.png`;
        }
        if (normalizedSize.includes('470')) {
          return `/images/pappbecher-basic-470ml-${colorKey}.png`;
        }
        return '/images/pappbecher-basic-100ml-weiss.png';
      }

      if (selectedStability.toLowerCase().includes('doppel')) {
        if (normalizedItemColor.includes('schwarz')) return '/images/pappbecher-doppelwandig-schwarz.png';
        if (normalizedItemColor.includes('natur')) return '/images/pappbecher-doppelwandig-natur.png';
        return '/images/pappbecher-doppelwandig-weiss.png';
      }
      if (product.slug === 'pappbecher-individual') {
        if (normalizedSize.includes('100')) return '/images/pappbecher-espresso.jpeg';
        if (normalizedSize.includes('200')) return '/images/pappbecher-200ml.jpeg';
        if (normalizedSize.includes('240')) return '/images/pappbecher-individual-main.png';
        if (normalizedSize.includes('400')) return '/images/pappbecher-individual-main.png';
        if (normalizedSize.includes('470')) return '/images/pappbecher-475ml.jpeg';
        return '/images/pappbecher-individual-main.png';
      }
      if (normalizedSize.includes('100')) return '/images/pappbecher-basic-100ml-weiss.png';
      if (normalizedSize.includes('200')) return '/images/pappbecher-basic-200ml-weiss.png';
      if (normalizedSize.includes('240')) return '/images/pappbecher-basic-240ml-weiss.png';
      if (normalizedSize.includes('400')) return '/images/pappbecher-basic-400ml-weiss.png';
      if (normalizedSize.includes('470')) return '/images/pappbecher-basic-470ml-weiss.png';
      if (selectedColorCount.toLowerCase().includes('3 farben')) {
        return '/images/pappbecher-475ml.jpeg';
      }
      if (resolvedItemColor.toLowerCase().includes('schwarz')) return '/images/pappbecher-basic-470ml-schwarz.png';
      if (resolvedItemColor.toLowerCase().includes('weiss')) return '/images/pappbecher-basic-200ml-weiss.png';
      if (product.slug === 'pappbecher-individual') {
        return '/images/pappbecher-doppelwandig-new.jpeg';
      }
      return '/images/pappbecher-basic-100ml-weiss.png';
    }
    if (product.category === 'Eisbecher') {
      const normalizedSize = resolvedSize.toLowerCase();
      if (product.slug === 'eisbecher-individual') {
        if (normalizedSize.includes('100')) return '/images/eisbecher-100ml.png';
        if (normalizedSize.includes('200')) return '/images/eisbecher-200ml.png';
        if (normalizedSize.includes('250')) return '/images/eisbecher-200ml.png';
        if (normalizedSize.includes('300')) return '/images/eisbecher-300ml.png';
        return '/images/eisbecher-200ml.png';
      }
      if (normalizedSize.includes('100')) return '/images/eisbecher-basic-100ml.png';
      if (normalizedSize.includes('200')) return '/images/eisbecher-basic-200ml.png';
      if (normalizedSize.includes('250')) return '/images/eisbecher-basic-200ml.png';
      if (normalizedSize.includes('300')) return '/images/eisbecher-basic-300ml.png';
      return '/images/eisbecher-basic-100ml.png';
    }
    if (product.category === 'Plastikbecher') {
      const normalizedSize = resolvedSize.toLowerCase();
      if (product.slug === 'plastikbecher-individual') {
        if (normalizedSize.includes('350')) return '/images/plastikbecher-350ml.png';
        if (normalizedSize.includes('400')) return '/images/plastikbecher-400ml.png';
        if (normalizedSize.includes('470')) return '/images/plastikbecher-470ml.png';
        if (normalizedSize.includes('500')) return '/images/plastikbecher-550ml.png';
        if (normalizedSize.includes('550')) return '/images/plastikbecher-550ml.png';
        if (normalizedSize.includes('700')) return '/images/plastikbecher-700ml.png';
        return '/images/plastikbecher-550ml.png';
      }
      if (normalizedSize.includes('350')) return '/images/plastikbecher-basic-350ml.png';
      if (normalizedSize.includes('400')) return '/images/plastikbecher-basic-500ml.png';
      if (normalizedSize.includes('470')) return '/images/plastikbecher-basic-470ml.png';
      if (normalizedSize.includes('500')) return '/images/plastikbecher-basic-500ml.png';
      if (normalizedSize.includes('550')) return '/images/plastikbecher-basic-550ml.png';
      if (normalizedSize.includes('700')) return '/images/plastikbecher-basic-700ml.png';
      return '/images/plastikbecher-basic-470ml.png';
    }
    if (product.slug === 'deckel-plastik') {
      if (selectedLidOption?.id === 'smoothie') return '/images/plastikbecher-deckel-smoothie-new.png';
      if (selectedLidOption?.id === 'sip') return '/images/plastikbecher-deckel-sip-new.png';
      return '/images/plastikbecher-deckel-flach-new.png';
    }
    return categoryImage;
  }, [
    product.slug,
    isPappbecherCup,
    resolvedLidColor,
    resolvedSize,
    selectedStability,
    selectedColorCount,
    resolvedItemColor,
    categoryImage,
    selectedLidMaterial,
    selectedLidOption,
    addLid,
    hideSizeSelection
  ]);
  const previewImage = manualPreviewImage || detailImage;

  useEffect(() => {
    setSelectedPrintColors((previous) => buildColorSelection(previous, selectedColorSlots, printPalette));
  }, [selectedColorSlots, printPalette]);

  useEffect(() => {
    const initialOption = colorOptions[0];
    setSelectedColorCount(initialOption);
    setSelectedPrintColors(buildColorSelection([], parseColorCount(initialOption), printPalette));
    setSelectedSize((sizeOptionsBySlug[product.slug] || defaultSizesByCategory[product.category] || ['Standard'])[0]);
    setCustomSize('');
    setSelectedStability((stabilityOptionsBySlug[product.slug] || [])[0] || '');
    setSelectedItemColor((itemColorOptionsBySlug[product.slug] || [])[0] || '');
    setSelectedLidColor((lidColorOptionsBySlug[product.slug] || [])[0] || '');
    setCustomLidColor('');
    setSelectedLidMaterial((lidMaterialOptionsBySlug[product.slug] || [])[0] || '');
    setActiveTab('beschreibung');
    setManualPreviewImage('');
  }, [product.slug, colorOptions, printPalette]);

  useEffect(() => {
    setManualPreviewImage('');
  }, [selectedSize, selectedStability, selectedItemColor, selectedLidColor, selectedLidMaterial]);

  function normalizeQuantity(value) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed) || parsed < minOrder) return minOrder;
    return Math.floor(parsed);
  }

  function commitQuantityInput() {
    if (quantityInput === '') {
      setQuantity(minOrder);
      setQuantityInput(String(minOrder));
      setQuantityHint(`Mindestmenge ist ${minOrder} Stueck.`);
      return;
    }

    const corrected = normalizeQuantity(quantityInput);
    setQuantity(corrected);
    setQuantityInput(String(corrected));
    setQuantityHint(corrected === minOrder && Number(quantityInput) < minOrder ? `Mindestmenge ist ${minOrder} Stueck.` : '');
  }

  function incrementQty() {
    const next = quantity + minOrder;
    setQuantity(next);
    setQuantityInput(String(next));
    setQuantityHint('');
  }

  function decrementQty() {
    const next = Math.max(minOrder, quantity - minOrder);
    setQuantity(next);
    setQuantityInput(String(next));
    if (next === minOrder) {
      setQuantityHint(`Mindestmenge ist ${minOrder} Stueck.`);
    }
  }

  async function addToCart() {
    const corrected = normalizeQuantity(quantityInput);
    setQuantity(corrected);
    setQuantityInput(String(corrected));

    setStatus({ state: 'loading', message: '' });
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          quantity: corrected,
          size: resolvedSize,
          options: {
            stabilitaet: selectedStability || '',
            artikelFarbe: resolvedItemColor || '',
            deckelFarbe: resolvedLidColor || '',
            deckelMaterial: selectedLidMaterial || '',
            druckOption: hasDesignSelection ? selectedColorCount : ''
          },
          addOns: addLid ? [{ type: 'deckel', option: lidType, quantity: lidQuantity }] : []
        })
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || 'Produkt konnte nicht hinzugefuegt werden.');
      }
      setStatus({ state: 'success', message: `${corrected}x ${product.name} wurde hinzugefuegt.` });
      window.dispatchEvent(new Event('cart-updated'));
    } catch (error) {
      setStatus({ state: 'error', message: error.message || 'Produkt konnte nicht hinzugefuegt werden.' });
    }
  }

  function buildPrefilledMessage() {
    const lines = [
      `Anfrage fuer Produkt: ${product.name}`,
      `Kategorie: ${product.category}`,
      `Ausfuehrung: ${getTierLabel(tier, product.badge)}`,
      `Menge: ${quantity} Stueck`
    ];

    if (resolvedSize) {
      lines.splice(3, 0, `Groesse: ${resolvedSize}`);
    }

    if (hasDesignSelection) {
      if (resolvedPrintColors) {
        lines.push(`Druckfarben (Logo): ${selectedColorCount} (${resolvedPrintColors})`);
      } else {
        lines.push(`Druckfarben (Logo): ${selectedColorCount}`);
      }
    }

    if (selectedStability) {
      lines.push(`Stabilitaet: ${selectedStability}`);
    }
    if (resolvedItemColor) {
      lines.push(`Artikel Farbe: ${resolvedItemColor}`);
    }
    if (resolvedLidColor) {
      lines.push(`Deckel Farbe: ${resolvedLidColor}`);
    }
    if (selectedLidMaterial) {
      lines.push(`Deckel Material: ${selectedLidMaterial}`);
    }
    if (addLid) {
      lines.push(`Deckel: ${selectedLidOption.label}, ${lidQuantity} Stueck`);
    }

    lines.push('', 'Bitte um Angebot und Rueckmeldung innerhalb von 24 Stunden.');
    return lines.join('\n');
  }

  function continueToContact() {
    const corrected = normalizeQuantity(quantityInput);
    setQuantity(corrected);
    setQuantityInput(String(corrected));

    const message = buildPrefilledMessage();
    const query = new URLSearchParams({
      source: 'product',
      productSlug: product.slug,
      productName: product.name,
      quantity: String(corrected),
      size: resolvedSize,
      colorCount: selectedColorCount,
      printColors: resolvedPrintColors,
      stability: selectedStability,
      itemColor: resolvedItemColor,
      lidColor: resolvedLidColor,
      lidMaterial: selectedLidMaterial,
      lidType: addLid ? selectedLidOption.label : '',
      lidQuantity: addLid ? String(lidQuantity) : '',
      message
    });

    router.push(`/kontakt?${query.toString()}`);
  }

  function continueToDesignStep() {
    const corrected = normalizeQuantity(quantityInput);
    setQuantity(corrected);
    setQuantityInput(String(corrected));
    if (corrected === minOrder && Number(quantityInput || 0) < minOrder) {
      setQuantityHint(`Mindestmenge ist ${minOrder} Stueck.`);
    }

    const query = new URLSearchParams({
      productSlug: product.slug,
      productName: product.name,
      category: product.category,
      tier: getTierLabel(tier, product.badge),
      quantity: String(corrected),
      size: resolvedSize,
      colorCount: selectedColorCount,
      printColors: resolvedPrintColors,
      stability: selectedStability,
      itemColor: resolvedItemColor,
      lidColor: resolvedLidColor,
      lidMaterial: selectedLidMaterial,
      lidEnabled: addLid ? '1' : '0',
      lidType: addLid ? selectedLidOption.label : '',
      lidQuantity: addLid ? String(lidQuantity) : ''
    });

    router.push(`/gestaltung?${query.toString()}`);
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 reveal-section" data-testid="page-product-detail" ref={pageRef}>
      <SeoHead title={product.name} description={product.shortDescription} path={`/produkt/${product.slug}`} />

      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap fade-up">
        <Link href="/" className="hover:text-foreground transition-colors">Startseite</Link>
        <span>/</span>
        <Link href="/produkte" className="hover:text-foreground transition-colors">Produkte</Link>
        {categorySlug && (
          <>
            <span>/</span>
            <Link href={`/produkte/${categorySlug}`} className="hover:text-foreground transition-colors">{product.category}</Link>
          </>
        )}
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid lg:grid-cols-[1.02fr,0.98fr] gap-12 lg:gap-14 items-start reveal-section" ref={contentRef}>
        <div className="space-y-6">
          <div className="grid grid-cols-[4.5rem,1fr] gap-3 items-start fade-up">
            <div className="space-y-2">
              {(galleryImages.length > 0 ? galleryImages : [detailImage]).map((imageSrc) => {
                const isActive = (manualPreviewImage || detailImage) === imageSrc;
                return (
                  <button
                    key={imageSrc}
                    type="button"
                    className={`w-[4.5rem] h-[4.5rem] rounded-xl overflow-hidden border ${isActive ? 'border-primary shadow-[0_10px_24px_-16px_rgba(0,0,0,0.65)]' : 'border-black/10'
                      }`}
                    onClick={() => setManualPreviewImage(imageSrc)}
                  >
                    <img
                      src={imageSrc}
                      alt={`${product.name} Vorschau`}
                      className={`w-full h-full ${isPappbecherCup
                        ? 'object-cover object-[center_78%] bg-[#f8f6ef]'
                        : isCupCategory
                          ? 'object-contain object-bottom p-1 bg-[#f8f6ef]'
                          : 'object-contain object-center p-1 bg-white'
                        }`}
                    />
                  </button>
                );
              })}
            </div>

            <div className="rounded-2xl overflow-hidden apple-card product-card-premium border-black/10 brand-frame">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt={product.name}
                  loading="eager"
                  decoding="async"
                  className={`w-full h-[24rem] sm:h-[32rem] ${isPappbecherCup
                    ? 'object-cover object-[center_80%] bg-[#f8f6ef]'
                    : isCupCategory
                      ? 'object-contain object-bottom bg-[#f8f6ef] p-3 sm:p-5'
                      : 'object-contain object-center bg-[#f1eee7] p-4'
                    }`}
                />
              ) : (
                <div className="w-full h-[24rem] sm:h-[32rem] bg-[#ece8df]" />
              )}
            </div>
          </div>

          <section className="rounded-2xl border border-black/10 bg-white/75 p-5">
            <div className="flex gap-3 border-b border-black/10 pb-3 mb-4 overflow-x-auto">
              {[
                { id: 'beschreibung', label: 'Beschreibung' },
                { id: 'details', label: 'Produktdetails' },
                ...(supportsCustomizationFlow ? [{ id: 'design', label: 'Design' }] : [])
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`text-sm font-semibold whitespace-nowrap pb-1 border-b-2 ${activeTab === tab.id ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground'
                    }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === 'beschreibung' && (
              <div className="space-y-3">
                <h3 className="text-xl font-semibold tracking-tight">{product.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{product.longDescription}</p>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="space-y-2">
                {(product.features || []).map((feature) => (
                  <p key={feature} className="text-sm text-muted-foreground">
                    • {feature}
                  </p>
                ))}
              </div>
            )}

            {activeTab === 'design' && (
              <div className="space-y-3">
                <h3 className="text-base font-semibold">Individualisierung</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Nach Klick auf "Weiter zur Gestaltung" laden Sie Ihr Logo hoch und definieren die Druckvorgaben.
                  Unser Team meldet sich mit einer konkreten Offerte.
                </p>
              </div>
            )}
          </section>
        </div>

        <div className="apple-card product-card-premium rounded-3xl p-6 lg:p-8">
          <span className="apple-kicker mb-4">Produktdetail</span>
          <div className="flex items-start gap-2 mb-3 flex-wrap">
            <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${getTierBadgeClass(tier)}`}>
              <Recycle className="w-3 h-3 mr-1" />
              {getTierLabel(tier, product.badge)}
            </span>
            <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs text-muted-foreground bg-white/65">{product.category}</span>
            <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs text-muted-foreground bg-white/65">Lieferzeit {product.leadTime}</span>
          </div>

          <h1 className="text-3xl lg:text-[2.7rem] font-semibold tracking-tight mb-4">{product.name}</h1>

          {showTierSwitch && (
            <div className="mb-6">
              <p className="text-sm font-semibold mb-2">Ausfuehrung</p>
              <div className="flex flex-wrap gap-2">
                {tierOptions.map((option) => {
                  const href = tierSlugFamily
                    ? `/produkt/${tierSlugFamily[option.key]}`
                    : `/produkt/${baseSlug}-${option.key}`;
                  const active = tier === option.key;
                  return (
                    <Link
                      key={option.key}
                      href={href}
                      className={`inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${active ? option.className : 'border-black/15 bg-white text-muted-foreground hover:text-foreground'
                        }`}
                    >
                      {option.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          <p className="text-sm text-muted-foreground mb-6">
            {hideSizeSelection
              ? 'Konfigurieren Sie Deckeltyp, Farbe und Menge direkt rechts und senden Sie danach Ihre Anfrage.'
              : supportsCustomizationFlow
                ? 'Konfigurieren Sie Groesse, Variante und Menge direkt rechts und gehen Sie danach zur Gestaltung oder Anfrage.'
                : 'Konfigurieren Sie Groesse, Ausfuehrung und Menge direkt rechts. Fuer Eco / Standard ist keine Gestaltung vorgesehen.'}
          </p>

          <div className="product-price text-[2rem] mb-2">ab CHF {unitPrice.toFixed(3)}</div>
          {hasDesignSelection && colorModelHasNumbers && (
            <p className="text-xs text-muted-foreground mb-6">inkl. Farbaufschlag ({selectedColorCount})</p>
          )}

          <div className="my-8 border-t border-black/10" />

          <div className="space-y-5">
            {!hideSizeSelection && (
              <div>
                <label className="text-sm font-medium mb-2 block">Groesse</label>
                <select
                  className="apple-select"
                  value={selectedSize}
                  onChange={(event) => {
                    setSelectedSize(event.target.value);
                    if (!event.target.value.toLowerCase().includes('wunschgroesse')) {
                      setCustomSize('');
                    }
                  }}
                >
                  {sizes.map((size) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
                {wantsCustomSize && (
                  <input
                    type="text"
                    className="apple-input mt-2"
                    placeholder="Wunschgroesse eingeben (z.B. 520 ml)"
                    value={customSize}
                    onChange={(event) => setCustomSize(event.target.value)}
                  />
                )}
              </div>
            )}

            {itemColorOptions.length > 0 && (
              <div>
                <label className="text-sm font-medium mb-2 block">Becherfarbe (Artikel)</label>
                <select className="apple-select" value={selectedItemColor} onChange={(event) => setSelectedItemColor(event.target.value)}>
                  {itemColorOptions.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>
            )}

            {hasDesignSelection && (
              <div>
                <label className="text-sm font-medium mb-2 block">{designSelectionLabel}</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {colorOptions.map((option, index) => {
                    const active = option === selectedColorCount;
                    const surcharge = getColorSurcharge(index);
                    return (
                      <button
                        key={option}
                        type="button"
                        className={`rounded-xl border px-3 py-2 text-left text-sm ${active ? 'border-primary bg-primary/10 text-foreground' : 'border-black/12 bg-white text-muted-foreground'
                          }`}
                        onClick={() => setSelectedColorCount(option)}
                      >
                        <div className="font-medium">{option}</div>
                        {colorModelHasNumbers && surcharge > 0 && <div className="text-xs mt-0.5">+ CHF {surcharge.toFixed(3)} / St.</div>}
                      </button>
                    );
                  })}
                </div>

                {usesColorSlotSelection && (
                  <div className="mt-3 space-y-2">
                    <label className="text-sm font-medium block">Druckfarben waehlen (optional)</label>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {Array.from({ length: selectedColorSlots }).map((_, slotIndex) => (
                        <div key={`color-slot-${slotIndex}`} className="space-y-1">
                          <label className="text-xs text-muted-foreground">Farbe {slotIndex + 1}</label>
                          <select
                            className="apple-select h-10"
                            value={selectedPrintColors[slotIndex] || printPalette[0].value}
                            onChange={(event) => {
                              const nextValue = event.target.value;
                              setSelectedPrintColors((previous) => {
                                const next = buildColorSelection(previous, selectedColorSlots, printPalette);
                                next[slotIndex] = nextValue;
                                return next;
                              });
                            }}
                          >
                            {printPalette.map((color) => (
                              <option key={color.value} value={color.value}>
                                {color.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {selectedPrintColors.slice(0, selectedColorSlots).map((colorValue, index) => {
                        const color = printPalette.find((item) => item.value === colorValue) || printPalette[0];
                        return (
                          <span
                            key={`selected-color-${index}-${colorValue}`}
                            className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-3 py-1 text-xs font-medium"
                          >
                            <span
                              className="inline-block h-3 w-3 rounded-full border border-black/20"
                              style={{ backgroundColor: color.hex }}
                              aria-hidden="true"
                            />
                            {color.label}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {stabilityOptions.length > 0 && (
              <div>
                <label className="text-sm font-medium mb-2 block">Stabilitaet</label>
                <select className="apple-select" value={selectedStability} onChange={(event) => setSelectedStability(event.target.value)}>
                  {stabilityOptions.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>
            )}

            {lidColorOptions.length > 0 && (
              <div>
                <label className="text-sm font-medium mb-2 block">Farbe</label>
                <select className="apple-select" value={selectedLidColor} onChange={(event) => setSelectedLidColor(event.target.value)}>
                  {lidColorOptions.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
                {selectedLidColor.includes('Wunschfarbe') && (
                  <input
                    type="text"
                    className="apple-input mt-2"
                    placeholder="Wunschfarbe eingeben"
                    value={customLidColor}
                    onChange={(event) => setCustomLidColor(event.target.value)}
                  />
                )}
              </div>
            )}

            {lidMaterialOptions.length > 0 && (
              <div>
                <label className="text-sm font-medium mb-2 block">Deckeltyp</label>
                <select className="apple-select" value={selectedLidMaterial} onChange={(event) => setSelectedLidMaterial(event.target.value)}>
                  {lidMaterialOptions.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="text-sm font-medium mb-2 block">Menge (Min. {minOrder} Stueck)</label>
              <div className="flex items-center gap-2">
                <button type="button" className="apple-btn-secondary h-10 w-10 p-0" onClick={decrementQty} disabled={quantity <= minOrder}>
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  className="apple-input w-28 text-center px-2"
                  min={minOrder}
                  value={quantityInput}
                  onChange={(event) => {
                    setQuantityInput(event.target.value);
                    setQuantityHint('');
                    const raw = event.target.value;
                    if (raw !== '' && Number(raw) >= minOrder) {
                      setQuantity(Math.floor(Number(raw)));
                    }
                  }}
                  onBlur={commitQuantityInput}
                />
                <button type="button" className="apple-btn-secondary h-10 w-10 p-0" onClick={incrementQty}>
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              {quantityHint && <p className="mt-2 text-xs text-muted-foreground">{quantityHint}</p>}
              {quantityPresets.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {quantityPresets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      className="apple-btn-secondary h-9 px-4 text-xs"
                      onClick={() => {
                        setQuantity(preset);
                        setQuantityInput(String(preset));
                        setQuantityHint('');
                      }}
                    >
                      {preset.toLocaleString('de-CH')}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {showLegacyLidAddon && (
              <div className="rounded-2xl border border-black/10 bg-white/65 p-4 space-y-3">
                <label className="inline-flex items-center gap-2 text-sm font-medium">
                  <input type="checkbox" checked={addLid} onChange={(event) => setAddLid(event.target.checked)} />
                  Deckel hinzufuegen
                </label>

                {addLid && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {lidOptions.map((option) => {
                        const active = option.id === lidType;
                        return (
                          <button
                            key={option.id}
                            type="button"
                            className={`rounded-xl border px-3 py-2 text-left text-sm ${active ? 'border-primary bg-primary/10 text-foreground' : 'border-black/12 bg-white text-muted-foreground'
                              }`}
                            onClick={() => setLidType(option.id)}
                          >
                            <div className="font-medium">{option.label}</div>
                            {option.delta > 0 && <div className="text-xs mt-0.5">+ CHF {option.delta.toFixed(3)} / St.</div>}
                          </button>
                        );
                      })}
                    </div>

                    <div>
                      <label className="text-sm font-medium mb-2 block">Deckel Menge</label>
                      <input
                        type="number"
                        className="apple-input w-32"
                        min={minOrder}
                        value={lidQuantity}
                        onChange={(event) => setLidQuantity(Math.max(minOrder, Number(event.target.value) || minOrder))}
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Deckelpreis: ab CHF {lidUnitPrice.toFixed(3)} / Stueck · Zwischensumme CHF {lidTotalPrice.toFixed(2)}
                      </p>
                    </div>
                  </>
                )}
              </div>
            )}

            {product.materials?.length > 0 && !hideSizeSelection && (
              <div className="text-sm">
                <span className="text-muted-foreground">Material: </span>
                <span className="font-medium">{product.materials[0]}</span>
              </div>
            )}
          </div>

          {supportsCustomizationFlow ? (
            <div className="grid sm:grid-cols-2 gap-3 mt-8">
              <button
                type="button"
                className="apple-btn-primary h-11 text-base"
                onClick={continueToDesignStep}
              >
                Weiter zur Gestaltung
              </button>
              <button
                type="button"
                className="apple-btn-secondary h-11 text-base"
                onClick={continueToContact}
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Anfrage senden
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-3 mt-8">
              <button
                type="button"
                className={`apple-btn-secondary h-11 text-base transition-all ${status.state === 'loading' ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                onClick={addToCart}
                disabled={status.state === 'loading'}
              >
                {status.state === 'loading' ? (
                  <>
                    <svg className="animate-spin w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Wird hinzugefuegt...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    In den Warenkorb
                  </>
                )}
              </button>

              <button
                type="button"
                className="apple-btn-primary h-11 text-base"
                onClick={continueToContact}
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Anfrage senden
              </button>
            </div>
          )}

          {status.state === 'success' && (
            <div className="mt-4 flex items-start gap-3 text-sm bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl px-4 py-3 toast-enter">
              <CheckCircle className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600" />
              <p>{status.message}</p>
            </div>
          )}
          {status.state === 'error' && (
            <div className="mt-4 flex items-start gap-3 text-sm bg-red-50 border border-red-200 text-red-800 rounded-xl px-4 py-3 toast-enter">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
              <p>{status.message}</p>
            </div>
          )}

          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="text-center p-4 rounded-2xl apple-card product-card-premium">
              <Truck className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Gratis Versand</span>
            </div>
            <div className="text-center p-4 rounded-2xl apple-card product-card-premium">
              <Palette className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Design-Support</span>
            </div>
            <div className="text-center p-4 rounded-2xl apple-card product-card-premium">
              <Shield className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Preisgarantie</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <Link href="/produkte" className="apple-btn-ghost">
          <ArrowLeft className="w-4 h-4" />
          Zurueck zu Produkten
        </Link>
      </div>
    </div>
  );
}
