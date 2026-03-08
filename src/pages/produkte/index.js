import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Package, Recycle, Search, X } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import { categorySlugMap } from '@/lib/product-categories';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { getProductImage } from '@/lib/product-images';

function tierBadgeClass(tier) {
  if (tier === 'individual') {
    return 'border-[#5c5ad6] bg-[#f4f3ff] text-[#3230a3]';
  }
  return 'border-[#85f04b] bg-[#f4ffea] text-[#2e5d17]';
}

function resolveTier(product) {
  if (product.tier) return product.tier;
  if ((product.slug || '').includes('individual')) return 'individual';
  return 'standard';
}

function resolveBadgeLabel(product) {
  const tier = resolveTier(product);
  if (tier === 'individual') return 'Individualisiert';
  if (product.category === 'Plastikbecher') return 'Standard';
  return 'Standard / Eco';
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
          {isBestsellerView ? 'Unsere Bestseller' : 'Verpackungen für Marken mit Anspruch.'}
        </h1>
        {isBestsellerView ? (
          <p className="section-copy max-w-3xl fade-up-delay-2">
            Unsere Bestseller – aus gutem Grund. Diese Produkte werden am häufigsten gewählt.
            Warum? Weil sie zuverlässig liefern, was sie versprechen: stabile Qualität,
            schnelle Verfügbarkeit und faire Preise.
          </p>
        ) : (
          <p className="section-copy max-w-3xl fade-up-delay-2">
            Klare Kategorien, hochwertige Materialien, präzise Lieferlogik.
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
          <section className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product) => {
              const priceValue = product.priceHint.replace('ab CHF ', '').replace(' / Stück', '');
              const tier = resolveTier(product);
              const img = getProductImage(product);
              return (
                <Link key={product.id} href={`/produkt/${product.slug}`}>
                  <article
                    className="group cursor-pointer rounded-2xl bg-white border border-border overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 h-full flex flex-col"
                    data-testid={`card-product-${product.id}`}
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-[#f4f1eb] shrink-0">
                      {img ? (
                        <img
                          src={img}
                          alt={product.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <Package className="w-7 h-7" />
                        </div>
                      )}
                    </div>
                    <div className="p-3.5 flex flex-col flex-1">
                      <div className="flex items-start justify-between gap-1.5 mb-1.5">
                        <h3 className="text-sm font-semibold leading-snug line-clamp-1">{product.name}</h3>
                        <span className={`inline-flex items-center rounded-full border px-1.5 py-0.5 text-[10px] font-semibold shrink-0 ${tierBadgeClass(tier)}`}>
                          {resolveBadgeLabel(product)}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 flex-1 mb-3 leading-relaxed">{product.shortDescription}</p>
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-bold text-primary">ab CHF {priceValue}</span>
                        <span className="text-[11px] text-muted-foreground">Min. {product.minOrder}</span>
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

export function getStaticProps() {
  const { localProducts } = require('@/lib/products');
  return {
    props: { products: localProducts || [] }
  };
}
