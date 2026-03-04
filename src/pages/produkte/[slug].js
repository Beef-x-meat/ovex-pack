import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import { fetchProducts } from '@/lib/cms';
import { categoryPageMeta, categorySlugMap, slugToCategoryMap } from '@/lib/product-categories';

const categoryImageMap = {
  Pappbecher: '/images/pappbecher-basic-main.png',
  Eisbecher: '/images/eisbecher-basic-100ml.png',
  Plastikbecher: '/images/plastikbecher-basic-470ml.png',
  Lebensmittelboxen: '/images/food-boxes.jpg',
  Papiertragetaschen: '/images/paper-bags.jpg',
  Lebensmittelpapier: '/images/lebensmittelpapier-standard.png'
};

const productImageMap = {
  'pappbecher-basic': '/images/pappbecher-basic-main.png',
  'pappbecher-individual': '/images/pappbecher-individual-main.png',
  'pappbecher-deckel': '/images/pappbecher-deckel-weiss-new.jpeg',
  'plastikbecher-standard': '/images/plastikbecher-basic-350ml.png',
  'plastikbecher-individual': '/images/plastikbecher-550ml.png',
  'deckel-plastik': '/images/plastikbecher-deckel-flach-new.png',
  'deckel-standard': '/images/plastikbecher-deckel-flach-new.png',
  'deckel-dome-papier': '/images/plastikbecher-deckel-smoothie-new.png',
  'deckel-flat-papier': '/images/plastikbecher-deckel-sip-new.png',
  papierstrohhalme: '/images/paper-straws.jpg',
  'eisbecher-standard': '/images/eisbecher-basic-100ml.png',
  'eisbecher-individual': '/images/eisbecher-200ml.png',
  'lebensmittelpapier-standard': '/images/lebensmittelpapier-standard.png',
  'lebensmittelpapier-premium': '/images/lebensmittelpapier-premium.png',
  'doener-tuete-klassisch': '/images/doener-tuete-klassisch.png',
  'doener-tuete-individual': '/images/doener-tuete-individual.png'
};

function getProductImage(product) {
  if (productImageMap[product.slug]) {
    return productImageMap[product.slug];
  }
  if (product.category === 'Zubehoer') {
    return '';
  }
  return categoryImageMap[product.category] || '';
}

function tierBadgeClass(tier) {
  if (tier === 'premium') {
    return 'border-[#7c6a38] bg-[#fff8e8] text-[#5a4720]';
  }
  if (tier === 'individual') {
    return 'border-[#5c5ad6] bg-[#f4f3ff] text-[#3230a3]';
  }
  return 'border-[#85f04b] bg-[#f4ffea] text-[#2e5d17]';
}

function resolveTier(product) {
  if (product.tier) return product.tier;
  const source = `${product.slug || ''} ${product.name || ''}`.toLowerCase();
  if (source.includes('premium')) return 'premium';
  if (source.includes('individual')) return 'individual';
  return 'standard';
}

function resolveBadgeLabel(product) {
  const tier = resolveTier(product);
  if (tier === 'premium') return 'Premium';
  if (tier === 'individual') return 'Individual';
  return 'Eco / Standard';
}

export default function ProductCategoryPage({ categorySlug, categoryName, copy, products }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12" data-testid="page-product-category">
      <SeoHead title={copy.h1} description={copy.description} path={`/produkte/${categorySlug}`} />

      <section className="mb-8 lg:mb-10">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <Link href="/produkte" className="hover:text-foreground">
            Produkte
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span>{categoryName}</span>
        </div>

        <h1 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-4">{copy.h1}</h1>
        <p className="max-w-4xl text-base lg:text-lg text-muted-foreground leading-relaxed">{copy.description}</p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        {products.map((product) => {
          const imageUrl = getProductImage(product);
          const priceValue = String(product.priceHint).replace('ab CHF ', '').replace(' / Stueck', '');
          const tier = resolveTier(product);
          const imageClass =
            ['pappbecher-basic', 'pappbecher-individual'].includes(product.slug)
              ? 'catalog-shot-pappbecher'
              : 'catalog-shot';
          return (
            <Link key={product.id} href={`/produkt/${product.slug}`}>
              <article className="rounded-2xl overflow-hidden border border-black/10 bg-[#f6f2e9] hover:bg-[#f8f4ed] transition-colors">
                <div className="aspect-[4/3] bg-[#ece8df]">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className={imageClass}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : null}
                </div>
                <div className="p-4 lg:p-5">
                  <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold mb-3 ${tierBadgeClass(tier)}`}>
                    {resolveBadgeLabel(product)}
                  </span>
                  <h2 className="text-2xl font-semibold mb-2 leading-tight">{product.name}</h2>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.shortDescription}</p>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xl font-semibold">ab CHF {priceValue}</span>
                    <span className="text-xs text-muted-foreground">Min. {product.minOrder} Stk.</span>
                  </div>
                </div>
              </article>
            </Link>
          );
        })}
      </section>
    </div>
  );
}

export async function getStaticPaths() {
  const paths = Object.values(categorySlugMap).map((slug) => ({ params: { slug } }));
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const categorySlug = params.slug;
  const categoryName = slugToCategoryMap[categorySlug];
  if (!categoryName) {
    return { notFound: true };
  }

  const allProducts = await fetchProducts();
  const products = allProducts.filter((item) => item.category === categoryName);
  const copy = categoryPageMeta[categorySlug] || {
    h1: `${categoryName} bedrucken - Hebe deine Marke hervor`,
    description:
      'Diese Kategorie bietet hochwertige Verpackungsoptionen fuer professionelle Markenauftritte im B2B-Umfeld. Die Produkte sind auf planbare Beschaffung, klare Spezifikationen und stabile Qualitaet ausgerichtet. So setzt du dein Branding konsistent ueber alle Kontaktpunkte um. Gleichzeitig bleiben Prozesse im Einkauf einfach und effizient.'
  };

  return {
    props: {
      categorySlug,
      categoryName,
      copy,
      products
    },
    revalidate: 300
  };
}
