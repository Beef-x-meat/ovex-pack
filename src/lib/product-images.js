export const categoryImageMap = {
  Pappbecher:         '/images/pappbecher-470ml-weiss.png',
  Eisbecher:          '/images/eisbecher-100ml-neu.png',
  Plastikbecher:      '/images/plastikbecher-470ml-neu.png',
  Lebensmittelboxen:  '/images/burgerboxen.png',
  Papiertragetaschen: '/images/papiertuete-braun-hero.jpg',
  Lebensmittelpapier: '/images/lebensmittelpapier-hero.jpg',
  Servietten:         '/images/serviette-apex-hero.jpg'
};

export const productImageMap = {
  // Pappbecher
  'pappbecher-basic':       '/images/pappbecher-basic-main.png',
  'pappbecher-individual':  '/images/pappbecher-individual-475ml.jpeg',
  'pappbecher-deckel':      '/images/pappbecher-weiss-standarddeckel.png',
  // Plastikbecher
  'plastikbecher-standard':    '/images/plastikbecher-470ml-neu.png',
  'plastikbecher-individual':  '/images/plastikbecher-individual-new-470ml.png',
  'plastikbecher-deckel':      '/images/plastikbecher-deckel-flach-new.png',
  // Eisbecher
  'eisbecher-standard':    '/images/eisbecher-100ml-neu.png',
  'eisbecher-individual':  '/images/eisbecher-individual-100ml.png',
  // Lebensmittelboxen
  'burgerboxen':                  '/images/burgerboxen.png',
  'burgerboxen-individual':       '/images/burgerboxen.png',
  'pommesbox':                    '/images/pommesbox.png',
  'pommesbox-individual':         '/images/pommesbox-individual.png',
  'hamburger-menubox':            '/images/burgerbox-menue-standard.png',
  'hamburger-menubox-individual': '/images/burgerbox-menue-medium.png',
  'noodle-doenerbox':             '/images/doenerbox.png',
  'noodle-doenerbox-individual':  '/images/doener-tuete-individual.png',
  'lunchbox':                     '/images/lunchbox-mittel.png',
  'lunchbox-individual':          '/images/lunchbox-mittel.png',
  'pizzaboxen':                   '/images/pizzaboxen.png',
  'pizzaboxen-individual':        '/images/pizzaboxen.png',
  // Papiertragetaschen
  'papiertragetasche':            '/images/papiertuete-braun-hero.jpg',
  'papiertragetasche-individual': '/images/papiertuete-farbig-hero.jpg',
  // Servietten
  'papiertuecher-bedruckt':   '/images/serviette-apex-hero.jpg',
  'papiertuecher-individual': '/images/serviette-welcome-hero.jpg',
  'feuchttuecher-bedruckt':   '/images/serviette-grateful-hero.jpg',
  'feuchttuecher-individual': '/images/serviette-grateful-hero.jpg',
  // Lebensmittelpapier
  'lebensmittelpapier-bedruckt':  '/images/lebensmittelpapier-standard.png',
  'lebensmittelpapier-individual':'/images/lebensmittelpapier-hero.jpg',
  'verpackungspapier-takeaway':   '/images/verpackungspapier-takeaway-12x28.png',
  'verpackungspapier-individual': '/images/verpackungspapier-fettdicht.png'
};

export function getProductImage(product) {
  if (productImageMap[product.slug]) return productImageMap[product.slug];
  return categoryImageMap[product.category] || '';
}
