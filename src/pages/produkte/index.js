import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Package, Recycle, Search, X } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import { fetchProducts } from '@/lib/cms';
import { categorySlugMap } from '@/lib/product-categories';

const categoryImageMap = {
  Pappbecher: '/images/paper-cups.jpg',
  Eisbecher: '/images/ice-cream-cups.jpg',
  Plastikbecher: '/images/plastic-cups.jpg',
  Lebensmittelboxen: '/images/food-boxes.jpg',
  Papiertragetaschen: '/images/paper-bags.jpg',
  Lebensmittelpapier: '/images/wrapping-paper.jpg',
  Zubehoer: '/images/napkins.jpg'
};

export default function Products({ products }) {
  const router = useRouter();

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

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.longDescription.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || categorySlugMap[product.category] === selectedCategory;
      const matchesMaterial = !materialFilter || product.materials.includes(materialFilter);
      return matchesSearch && matchesCategory && matchesMaterial;
    });
  }, [products, searchQuery, selectedCategory, materialFilter]);

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

      <section className="mb-12 lg:mb-14">
        <span className="apple-kicker mb-4">Produktkatalog</span>
        <h1 className="section-title mb-4" data-testid="text-products-title">
          Verpackungen fuer Marken mit Anspruch.
        </h1>
        <p className="section-copy max-w-3xl">
          Klare Kategorien, hochwertige Materialien, praezise Lieferlogik.
          Filtern Sie gezielt und wechseln Sie direkt in die Detailansicht.
        </p>
      </section>

      <section className="mb-8">
        <p className="text-sm font-semibold mb-3">Kategorien</p>
        <div className="products-category-rail">
          <button
            type="button"
            className={`products-category-pill ${
              !selectedCategory
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
              className={`products-category-pill ${
                selectedCategory === category.slug
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

      {(searchQuery || selectedCategory || materialFilter) && (
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
              const eco = product.materials.some((material) => /eco|bio|fsc|recycel|kompost/i.test(material));
              const priceValue = product.priceHint.replace('ab CHF ', '').replace(' / Stueck', '');
              return (
                <Link key={product.id} href={`/produkt/${product.slug}`}>
                  <article
                    className="overflow-hidden group cursor-pointer rounded-2xl apple-card product-card-premium h-full"
                    data-testid={`card-product-${product.id}`}
                  >
                    <div className="aspect-[4/3] overflow-hidden brand-frame">
                      {categoryImageMap[product.category] ? (
                        <img
                          src={categoryImageMap[product.category]}
                          alt={product.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover brand-shot"
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
                        {eco && (
                          <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs text-muted-foreground shrink-0">
                            <Recycle className="w-3 h-3 mr-1" />
                            Eco
                          </span>
                        )}
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
