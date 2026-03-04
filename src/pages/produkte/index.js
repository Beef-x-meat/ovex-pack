import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Package, Recycle, Search, X } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import { fetchProducts } from '@/lib/cms';
import { categorySlugMap } from '@/lib/product-categories';
import { useScrollReveal } from '@/hooks/useScrollReveal';

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

export default function Products({ products }) {
  const router = useRouter();
  const isBestsellerView = router.query.view === 'bestseller';
  const headerRef = useScrollReveal();
  const filterRef = useScrollReveal();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [materialFilter, setMaterialFilter] = useState('');

  useEffect(() => {
    if (typeof router.query.cat === 'string') {
      setSelectedCategory(router.query.cat);
    }
  }, [router.query.cat]);

  const categories = useMemo(
    () => Object.entries(categorySlugMap).map(([name, slug]) => ({ name, slug })),
    []
  );

  const materials = useMemo(
    () => Array.from(new Set(products.flatMap((product) => product.materials))).filter(Boolean),
    [products]
  );

  const bestsellerSlugs = useMemo(
    () => ['pappbecher-basic', 'pizzakartons-eco', 'salatschalen-standard', 'doenertaschen-standard'],
    []
  );

  const sourceProducts = useMemo(() => {
    if (!isBestsellerView) {
      return products;
    }
    return bestsellerSlugs
      .map((slug) => products.find((product) => product.slug === slug))
      .filter(Boolean);
  }, [isBestsellerView, products, bestsellerSlugs]);

  const filteredProducts = useMemo(() => {
    return sourceProducts.filter((product) => {
      const matchesSearch =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.longDescription.toLowerCase().includes(searchQuery.toLowerCase());
      const productCategorySlug = categorySlugMap[product.category];
      const source = `${product.slug || ''} ${product.name || ''}`.toLowerCase();
      const isLidProduct = product.category === 'Deckel' || source.includes('deckel');
      const isPappbecherLid =
        selectedCategory === 'pappbecher' &&
        isLidProduct &&
        (source.includes('papier') || source.includes('standard') || source.includes('flat') || source.includes('dome'));
      const isPlastikbecherLid =
        selectedCategory === 'plastikbecher' &&
        isLidProduct &&
        (source.includes('plastik') || source.includes('standard') || source.includes('smoothie') || source.includes('dome'));
      const matchesCategory =
        !selectedCategory || productCategorySlug === selectedCategory || isPappbecherLid || isPlastikbecherLid;
      const matchesMaterial = !materialFilter || product.materials.includes(materialFilter);
      return matchesSearch && matchesCategory && matchesMaterial;
    });
  }, [sourceProducts, searchQuery, selectedCategory, materialFilter]);

  function clearFilters() {
    setSearchQuery('');
    setSelectedCategory('');
    setMaterialFilter('');
  }

  const selectedCategoryName = useMemo(() => {
    if (!selectedCategory) {
      return '';
    }
    const category = categories.find((item) => item.slug === selectedCategory);
    return category?.name || selectedCategory;
  }, [categories, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20" data-testid="page-products">
      <SeoHead
        title="Produkte"
        description="Entdecken Sie unsere Auswahl an individuell bedruckbaren Premium-Verpackungen."
        path="/produkte"
      />

      <section ref={headerRef} className="mb-12 lg:mb-14 reveal-section">
        {!isBestsellerView && <span className="apple-kicker mb-4 fade-up">Produktkatalog</span>}
        <h1 className="section-title mb-4 fade-up-delay-1" data-testid="text-products-title">
          {isBestsellerView ? 'Unsere Bestseller' : 'Verpackungen fuer Marken mit Anspruch.'}
        </h1>
        {isBestsellerView ? (
          <p className="section-copy max-w-3xl fade-up-delay-2">
            Unsere Bestseller – aus gutem Grund. Diese Produkte werden am häufigsten gewählt.
            Warum? Weil sie zuverlässig liefern, was sie versprechen: stabile Qualität,
            schnelle Verfügbarkeit und faire Preise.
          </p>
        ) : (
          <p className="section-copy max-w-3xl fade-up-delay-2">
            Klare Kategorien, hochwertige Materialien, praezise Lieferlogik.
            Filtern Sie gezielt und wechseln Sie direkt in die Detailansicht.
          </p>
        )}
      </section>

      {!isBestsellerView && (
        <section ref={filterRef} className="mb-8 reveal-section">
          <p className="text-sm font-semibold mb-3">Kategorien</p>
          <div className="products-category-rail">
            <button
              type="button"
              className={`products-category-pill ${!selectedCategory
                  ? 'border-primary bg-primary text-primary-foreground shadow-[0_16px_26px_-20px_rgba(29,19,8,0.8)]'
                  : 'border-black/14 bg-white/90 hover:border-black/28 hover:bg-white'
                }`}
              onClick={() => setSelectedCategory('')}
              data-testid="chip-category-all"
            >
              Alle
            </button>
            {categories.map((category) => (
              <button
                key={category.slug}
                type="button"
                className={`products-category-pill ${selectedCategory === category.slug
                    ? 'border-primary bg-primary text-primary-foreground shadow-[0_16px_26px_-20px_rgba(29,19,8,0.8)]'
                    : 'border-black/14 bg-white/90 hover:border-black/28 hover:bg-white'
                  }`}
                onClick={() => setSelectedCategory((value) => (value === category.slug ? '' : category.slug))}
                data-testid={`chip-category-${category.slug}`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </section>
      )}

      {!isBestsellerView && (
        <section className="apple-card product-card-premium rounded-2xl p-3.5 flex flex-col sm:flex-row gap-3 mb-4 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              placeholder="Produkte suchen..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="apple-input pl-9 pr-3"
              aria-label="Produkte suchen"
              data-testid="input-search"
            />
          </div>

          <select
            className="apple-select w-full sm:w-52"
            value={materialFilter || 'all'}
            onChange={(event) => setMaterialFilter(event.target.value === 'all' ? '' : event.target.value)}
            aria-label="Nach Material filtern"
            data-testid="select-material"
          >
            <option value="all">Alle Materialien</option>
            {materials.map((material) => (
              <option key={material} value={material}>
                {material}
              </option>
            ))}
          </select>

          {(searchQuery || selectedCategory || materialFilter) && (
            <button
              type="button"
              className="apple-btn-secondary h-10 px-3"
              onClick={clearFilters}
              data-testid="button-clear-filters"
            >
              <X className="w-4 h-4 mr-1" />
              Filter loeschen
            </button>
          )}
        </section>
      )}

      {!isBestsellerView && (searchQuery || selectedCategory || materialFilter) && (
        <section className="products-active-filter-row" data-testid="active-filters">
          {selectedCategory && (
            <button
              type="button"
              className="products-active-chip"
              onClick={() => setSelectedCategory('')}
              data-testid="chip-active-category"
            >
              Kategorie: {selectedCategoryName}
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          {materialFilter && (
            <button
              type="button"
              className="products-active-chip"
              onClick={() => setMaterialFilter('')}
              data-testid="chip-active-material"
            >
              Material: {materialFilter}
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          {searchQuery && (
            <button
              type="button"
              className="products-active-chip"
              onClick={() => setSearchQuery('')}
              data-testid="chip-active-search"
            >
              Suche: {searchQuery}
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </section>
      )}

      {filteredProducts.length === 0 ? (
        <section className="text-center py-20">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-5">
            <Search className="w-7 h-7 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold mb-2" data-testid="text-no-results">
            Keine Produkte gefunden
          </h3>
          <p className="text-muted-foreground mb-6">Versuchen Sie, Ihre Suchkriterien anzupassen.</p>
          <button
            type="button"
            className="apple-btn-secondary"
            onClick={clearFilters}
            data-testid="button-reset-search"
          >
            Filter zuruecksetzen
          </button>
        </section>
      ) : (
        <>
          <p className="text-sm text-muted-foreground mb-6" data-testid="text-result-count">
            {filteredProducts.length} Produkt{filteredProducts.length !== 1 ? 'e' : ''} gefunden
          </p>
          <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const priceValue = product.priceHint.replace('ab CHF ', '').replace(' / Stueck', '');
              const tier = resolveTier(product);
              const imageClass =
                ['pappbecher-basic', 'pappbecher-individual'].includes(product.slug)
                  ? 'catalog-shot-pappbecher brand-shot'
                  : 'catalog-shot brand-shot';
              return (
                <Link key={product.id} href={`/produkt/${product.slug}`}>
                  <article
                    className="overflow-hidden group cursor-pointer rounded-2xl apple-card product-card-premium h-full"
                    data-testid={`card-product-${product.id}`}
                  >
                    <div className="aspect-[4/3] overflow-hidden brand-frame">
                      {getProductImage(product) ? (
                        <img
                          src={getProductImage(product)}
                          alt={product.name}
                          loading="lazy"
                          decoding="async"
                          className={imageClass}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#f6f2ea] to-[#ece4d6] text-muted-foreground">
                          <div className="text-center px-4">
                            <Package className="w-7 h-7 mx-auto mb-2" />
                            <p className="text-xs font-medium tracking-wide uppercase">{product.category}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-5 lg:p-6">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-[1.03rem] font-semibold tracking-tight line-clamp-1">{product.name}</h3>
                        <span
                          className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-semibold shrink-0 ${tierBadgeClass(tier)}`}
                        >
                          <Recycle className="w-3 h-3 mr-1" />
                          {resolveBadgeLabel(product)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{product.shortDescription}</p>
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="product-price">ab CHF {priceValue}</span>
                        <span className="text-xs text-muted-foreground">Min. {product.minOrder} St.</span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </section>
        </>
      )}
    </div>
  );
}

export async function getStaticProps() {
  const products = await fetchProducts();
  return {
    props: { products },
    revalidate: 300
  };
}
