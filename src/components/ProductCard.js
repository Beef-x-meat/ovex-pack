import Link from 'next/link';

export default function ProductCard({ product }) {
  return (
    <article className="product-card lime-card" aria-labelledby={`product-${product.slug}`}>
      <div className="product-visual" aria-hidden="true">
        <span className="product-visual-box" />
      </div>

      <div className="product-meta">
        <span className="badge">{product.category}</span>
        <span className="badge">{product.leadTime}</span>
      </div>

      <h3 id={`product-${product.slug}`}>{product.name}</h3>
      <p>{product.shortDescription}</p>

      <div className="product-meta product-meta-compact">
        <span className="badge">Min. {product.minOrder} Stk.</span>
        <span className="badge">{product.priceHint}</span>
      </div>

      <div className="product-card-actions">
        <Link href={`/produkte/${product.slug}`} className="button-secondary" aria-label={`${product.name} ansehen`}>
          View product
        </Link>
      </div>
    </article>
  );
}
