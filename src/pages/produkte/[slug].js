import Link from 'next/link';
import { ChevronRight, Star } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import { fetchProducts } from '@/lib/cms';
import { categoryPageMeta, categorySlugMap, slugToCategoryMap } from '@/lib/product-categories';

const categoryImageMap = {
  Pappbecher: '/images/paper-cups.jpg',
  Eisbecher: '/images/ice-cream-cups.jpg',
  Plastikbecher: '/images/plastic-cups.jpg',
  Lebensmittelboxen: '/images/food-boxes.jpg',
  Papiertragetaschen: '/images/paper-bags.jpg',
  Lebensmittelpapier: '/images/wrapping-paper.jpg',
  Zubehoer: '/images/napkins.jpg'
};

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
          <span className="mx-2 text-black/20">|</span>
          <span className="inline-flex items-center gap-1 text-[#f97316] font-semibold">
            4.8
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
          </span>
          <span>145 Bewertungen</span>
        </div>

        <h1 className="text-4xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-4">{copy.h1}</h1>
        <p className="max-w-4xl text-base lg:text-lg text-muted-foreground leading-relaxed">{copy.description}</p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
        {products.map((product) => {
          const imageUrl = categoryImageMap[product.category] || '';
          const priceValue = String(product.priceHint).replace('ab CHF ', '').replace(' / Stueck', '');
          return (
            <Link key={product.id} href={`/produkt/${product.slug}`}>
              <article className="rounded-2xl overflow-hidden border border-black/10 bg-[#f6f2e9] hover:bg-[#f8f4ed] transition-colors">
                <div className="aspect-[4/3] bg-[#ece8df]">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : null}
                </div>
                <div className="p-4 lg:p-5">
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
