import { useMemo, useState } from 'react';
import SeoHead from '@/components/SeoHead';
import ProductCard from '@/components/ProductCard';
import { categories as localCategories } from '@/lib/products';
import { fetchProducts } from '@/lib/cms';

export async function getStaticProps() {
  const products = await fetchProducts();
  return {
    props: { products },
    revalidate: 300
  };
}

export default function ProductsPage({ products }) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [maxLeadTime, setMaxLeadTime] = useState('all');

  const categories = useMemo(() => {
    const fromProducts = ['All', ...new Set(products.map((item) => item.category))];
    if (fromProducts.length > 1) {
      return fromProducts;
    }
    return ['All', ...localCategories.filter((item) => item !== 'Alle')];
  }, [products]);

  const filtered = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return products.filter((item) => {
      const categoryMatch = activeCategory === 'All' || item.category === activeCategory;
      const searchMatch =
        !normalizedSearch ||
        item.name.toLowerCase().includes(normalizedSearch) ||
        item.shortDescription.toLowerCase().includes(normalizedSearch);

      if (maxLeadTime === 'all') {
        return categoryMatch && searchMatch;
      }

      const leadNumber = Number(item.leadTime.split('-')[0]) || 99;
      const leadMatch = maxLeadTime === 'fast' ? leadNumber <= 7 : leadNumber <= 12;
      return categoryMatch && searchMatch && leadMatch;
    });
  }, [products, activeCategory, search, maxLeadTime]);

  return (
    <>
      <SeoHead
        title="Products"
        description="Limepack-style product listing with quick filtering and direct paths to quote requests."
        path="/produkte"
      />

      <section className="section section-soft">
        <div className="container">
          <p className="eyebrow">Packaging catalog</p>
          <h1 className="section-title">Custom packaging products</h1>
          <p className="section-copy">
            Browse products by type, compare lead times, and open a product page for request details and 3D preview.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container products-layout">
          <aside className="filter-panel" aria-label="Product filters">
            <h2>Filters</h2>

            <label htmlFor="product-search" className="small">
              Search
            </label>
            <input
              id="product-search"
              className="search-input"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search products..."
            />

            <div className="filter-block">
              <p className="small">Category</p>
              <div className="chips">
                {categories.map((category) => (
                  <button
                    type="button"
                    key={category}
                    className={`chip ${activeCategory === category ? 'is-active' : ''}`}
                    onClick={() => setActiveCategory(category)}
                    aria-pressed={activeCategory === category}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="filter-block">
              <p className="small">Lead time</p>
              <label className="radio-row">
                <input
                  type="radio"
                  name="lead"
                  checked={maxLeadTime === 'all'}
                  onChange={() => setMaxLeadTime('all')}
                />
                <span>All lead times</span>
              </label>
              <label className="radio-row">
                <input
                  type="radio"
                  name="lead"
                  checked={maxLeadTime === 'fast'}
                  onChange={() => setMaxLeadTime('fast')}
                />
                <span>Fast (up to 7 days)</span>
              </label>
              <label className="radio-row">
                <input
                  type="radio"
                  name="lead"
                  checked={maxLeadTime === 'standard'}
                  onChange={() => setMaxLeadTime('standard')}
                />
                <span>Standard (up to 12 days)</span>
              </label>
            </div>
          </aside>

          <div>
            <div className="products-topbar">
              <p className="small">
                Showing <strong>{filtered.length}</strong> products
              </p>
            </div>

            <div className="product-grid" aria-live="polite">
              {filtered.length ? (
                filtered.map((product) => <ProductCard key={product.id} product={product} />)
              ) : (
                <article className="panel">
                  <h2 className="section-title" style={{ fontSize: '1.35rem' }}>
                    No products found
                  </h2>
                  <p className="section-copy">Try another category or reset your search.</p>
                </article>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
