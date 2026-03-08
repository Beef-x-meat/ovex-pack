export const studioImages = {
  hero: '/images/studio/hero-key-visual.svg',
  materialDetail: '/images/studio/detail-material.svg',
  cup: '/images/studio/cups-studio.svg',
  bag: '/images/studio/bags-studio.svg',
  box: '/images/studio/boxes-studio.svg',
  napkin: '/images/studio/napkins-studio.svg',
  bowl: '/images/studio/salad-bowls-studio.svg',
  wrapping: '/images/studio/wrapping-studio.svg',
  plasticCup: '/images/studio/plastic-cups-studio.svg',
  iceCreamCup: '/images/studio/icecream-cups-studio.svg'
};

export const productCategoryImageMap = {
  Becher: studioImages.cup,
  Boxen: studioImages.box,
  Taschen: studioImages.bag,
  Deckel: studioImages.plasticCup,
  Wraps: studioImages.wrapping
};

export const homeCategoryImageMap = [
  { slug: 'pappbecher', name: 'Pappbecher', imageUrl: studioImages.cup },
  { slug: 'papiertueten', name: 'Papiertüten', imageUrl: studioImages.bag },
  { slug: 'lebensmittelboxen', name: 'Lebensmittelboxen', imageUrl: studioImages.box },
  { slug: 'servietten', name: 'Servietten', imageUrl: studioImages.napkin },
  { slug: 'salat-schalen', name: 'Salat Schalen', imageUrl: studioImages.bowl },
  { slug: 'wrapping-paper', name: 'Wrapping Paper', imageUrl: studioImages.wrapping },
  { slug: 'plastikbecher', name: 'Plastikbecher', imageUrl: studioImages.plasticCup },
  { slug: 'eisbecher', name: 'Eisbecher', imageUrl: studioImages.iceCreamCup }
];

export const signatureStudioProducts = [
  {
    title: 'Coffee Series',
    subtitle: 'Hot & cold cups',
    imageUrl: studioImages.cup
  },
  {
    title: 'Retail Carry',
    subtitle: 'Paper carry bags',
    imageUrl: studioImages.bag
  },
  {
    title: 'Food Systems',
    subtitle: 'Folding box range',
    imageUrl: studioImages.box
  }
];

export const fallbackStudioImage = studioImages.box;
