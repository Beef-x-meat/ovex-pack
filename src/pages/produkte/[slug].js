import { useState } from 'react';
import Link from 'next/link';
import SeoHead from '@/components/SeoHead';
import Viewer from '@/components/Viewer';
import { fetchProductBySlug, fetchProducts } from '@/lib/cms';

export async function getStaticPaths() {
  const products = await fetchProducts();
  return {
    paths: products.map((product) => ({
      params: { slug: product.slug }
    })),
    fallback: 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const product = await fetchProductBySlug(params.slug);
  if (!product) {
    return { notFound: true };
  }
  return {
    props: { product },
    revalidate: 300
  };
}

export default function ProductDetailPage({ product }) {
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [quantity, setQuantity] = useState(product.minOrder || 500);
  const [printType, setPrintType] = useState('Digital print');
  const [note, setNote] = useState('');
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ state: 'loading', message: '' });

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productName: product.name,
          company,
          email,
          quantity,
          printType,
          note
        })
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || 'Request failed.');
      }

      setStatus({
        state: 'success',
        message: `Request ${payload.requestId} has been submitted.`
      });
    } catch (error) {
      setStatus({ state: 'error', message: error.message });
    }
  }

  return (
    <>
      <SeoHead title={product.name} description={product.shortDescription} path={`/produkte/${product.slug}`} />

      <section className="section section-soft">
        <div className="container">
          <p className="small breadcrumb">
            <Link href="/produkte">Products</Link> / {product.name}
          </p>
          <h1 className="section-title">{product.name}</h1>
          <p className="section-copy">{product.shortDescription}</p>
        </div>
      </section>

      <section className="section">
        <div className="container detail-layout detail-layout-lime">
          <article className="panel">
            <Viewer title={product.name} modelUrl={product.modelUrl} />
          </article>

          <aside className="order-box">
            <h2 style={{ margin: 0 }}>Product details</h2>
            <div className="product-meta">
              <span className="badge">{product.category}</span>
              <span className="badge">{product.leadTime}</span>
            </div>
            <p className="section-copy">{product.longDescription}</p>
            <div className="product-meta">
              <span className="badge">MOQ: {product.minOrder}</span>
              <span className="badge">{product.priceHint}</span>
            </div>
            <Link href="#quote-form" className="button button-quote">
              Request quote
            </Link>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container detail-layout">
          <article className="panel">
            <h2 style={{ marginTop: 0 }}>Materials and print options</h2>
            <div className="product-meta">
              {product.materials.map((material) => (
                <span className="badge" key={material}>
                  {material}
                </span>
              ))}
            </div>

            <h3>Included features</h3>
            <ul className="feature-list">
              {product.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </article>

          <form id="quote-form" className="order-box" onSubmit={handleSubmit} aria-label="Quote request">
            <h2 style={{ margin: 0 }}>Get a quote</h2>

            <div className="form-grid">
              <label htmlFor="company" className="sr-only">
                Company
              </label>
              <input
                id="company"
                className="input"
                required
                value={company}
                onChange={(event) => setCompany(event.target.value)}
                placeholder="Company"
              />

              <label htmlFor="email" className="sr-only">
                E-Mail
              </label>
              <input
                id="email"
                className="input"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="E-Mail"
              />

              <label htmlFor="quantity" className="sr-only">
                Quantity
              </label>
              <input
                id="quantity"
                className="input"
                type="number"
                min={product.minOrder || 1}
                value={quantity}
                onChange={(event) => setQuantity(Number(event.target.value))}
                placeholder="Quantity"
              />

              <label htmlFor="printType" className="sr-only">
                Print type
              </label>
              <select
                id="printType"
                className="select"
                value={printType}
                onChange={(event) => setPrintType(event.target.value)}
              >
                <option>Digital print</option>
                <option>Offset print</option>
                <option>Flexo print</option>
              </select>

              <label htmlFor="note" className="sr-only">
                Note
              </label>
              <textarea
                id="note"
                className="textarea"
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Artwork details, delivery window, certifications"
              />
            </div>

            <button type="submit" className="button button-quote" disabled={status.state === 'loading'}>
              {status.state === 'loading' ? 'Sending...' : 'Send request'}
            </button>

            {status.state === 'success' && <p className="success-box">{status.message}</p>}
            {status.state === 'error' && <p className="error-box">{status.message}</p>}
          </form>
        </div>
      </section>
    </>
  );
}
