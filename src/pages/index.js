import Link from 'next/link';
import SeoHead from '@/components/SeoHead';
import ProductCard from '@/components/ProductCard';
import Viewer from '@/components/Viewer';
import { fetchProducts } from '@/lib/cms';

const uspItems = [
  {
    title: 'Built for speed',
    text: 'Receive an offer quickly and keep your launch timeline predictable.'
  },
  {
    title: 'Low MOQs',
    text: 'Start with smaller quantities and scale once demand is proven.'
  },
  {
    title: 'Design support',
    text: 'Upload artwork or collaborate with our team to finalize print-ready files.'
  }
];

const categories = [
  { title: 'Paper Cups', text: 'Single and double wall options for coffee and beverages.' },
  { title: 'Food Boxes', text: 'Take-away and delivery formats with clean print surfaces.' },
  { title: 'Paper Bags', text: 'Retail and food-service bags in multiple handle formats.' },
  { title: 'Ice Cream Cups', text: 'Durable cup formats for frozen and chilled products.' },
  { title: 'Salad Bowls', text: 'Stackable bowls for cold meals and premium presentation.' },
  { title: 'Wrapping Paper', text: 'Food-safe wraps with custom print and color control.' }
];

const steps = [
  {
    title: 'Choose products',
    text: 'Select your packaging type, quantity, and timeline.'
  },
  {
    title: 'Upload artwork',
    text: 'Share your print file or request support from our design team.'
  },
  {
    title: 'Approve and produce',
    text: 'Approve your layout and we move into production and shipping.'
  }
];

const testimonials = [
  {
    quote:
      'The process is much clearer than traditional suppliers. We received an offer fast and launched without delays.',
    author: 'Operations Lead, Nordic Cafe Group'
  },
  {
    quote: 'Simple ordering flow, reliable lead times, and consistent print quality across all batches.',
    author: 'Founder, Urban Street Food'
  },
  {
    quote: 'The product setup is straightforward and the packaging quality has been excellent for our stores.',
    author: 'Procurement Manager, Fresh Bowl Co.'
  }
];

export async function getStaticProps() {
  const products = await fetchProducts();
  return {
    props: {
      featuredProducts: products.slice(0, 6)
    },
    revalidate: 300
  };
}

export default function HomePage({ featuredProducts }) {
  return (
    <>
      <SeoHead
        title="Custom printed packaging"
        description="Limepack-style foundation: custom packaging website with clear product focus, quote flow, and integrated 3D viewer."
        path="/"
      />

      <section className="hero hero-lime">
        <div className="container hero-grid hero-grid-lime">
          <div>
            <p className="eyebrow">Custom printed packaging</p>
            <h1 className="hero-title">Personalized packaging for food and beverage brands.</h1>
            <p className="hero-copy">
              Launch packaging with a cleaner buying flow: fewer distractions, clearer options, and a fast quote path.
            </p>

            <div className="hero-actions">
              <Link href="/kontakt" className="button button-quote">
                Get quote
              </Link>
              <Link href="/produkte" className="button-ghost">
                Browse products
              </Link>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <strong>24h</strong>
                <span>Typical first response</span>
              </div>
              <div className="hero-stat">
                <strong>Low MOQ</strong>
                <span>Flexible first runs</span>
              </div>
              <div className="hero-stat">
                <strong>EU Focus</strong>
                <span>Regional production partners</span>
              </div>
            </div>
          </div>

          <aside className="hero-visual" aria-label="Packaging visual teaser">
            <div className="hero-pack-grid">
              <div className="hero-pack-card pack-a" />
              <div className="hero-pack-card pack-b" />
              <div className="hero-pack-card pack-c" />
            </div>
            <p className="small">Preview cups, boxes, bowls, and bags before production.</p>
          </aside>
        </div>
      </section>

      <section className="trust-band">
        <div className="container trust-inner">
          <span>Trusted by fast-growing food and beverage brands</span>
          <ul className="trust-logos" aria-label="Brand logos">
            <li>Nordic Roasters</li>
            <li>Urban Salad</li>
            <li>Bento Bar</li>
            <li>Coffee Mile</li>
            <li>Fresh Roll</li>
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="usp-grid">
            {uspItems.map((item) => (
              <article className="usp-card" key={item.title}>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft" id="industries">
        <div className="container">
          <p className="eyebrow">Popular categories</p>
          <h2 className="section-title">Products built for restaurants, cafes, and delivery brands</h2>
          <p className="section-copy">
            Keep the catalog easy to scan. Start with your core item, then request matching accessories.
          </p>

          <div className="category-grid">
            {categories.map((category) => (
              <article className="category-card" key={category.title}>
                <div className="category-thumb" aria-hidden="true" />
                <h3>{category.title}</h3>
                <p>{category.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="design-options">
        <div className="container">
          <p className="eyebrow">How it works</p>
          <h2 className="section-title">A straightforward ordering process</h2>
          <div className="how-grid">
            {steps.map((step, index) => (
              <article className="how-card" key={step.title}>
                <span className="how-number">{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container panel">
          <p className="eyebrow">3D preview</p>
          <h2 className="section-title">Review your product before production</h2>
          <p className="section-copy">
            Rotate, zoom, and adjust material properties. On low-power devices a static fallback is shown
            automatically.
          </p>
          <Viewer title="Packaging preview" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">Featured products</p>
              <h2 className="section-title">Start from proven packaging formats</h2>
            </div>
            <Link href="/produkte" className="button-ghost">
              See all products
            </Link>
          </div>

          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft" id="about">
        <div className="container">
          <p className="eyebrow">Testimonials</p>
          <h2 className="section-title">What teams say about working with us</h2>
          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <article className="testimonial-card" key={item.author}>
                <p>"{item.quote}"</p>
                <strong>{item.author}</strong>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container cta-band">
          <div>
            <p className="eyebrow">Ready to start?</p>
            <h2>Get your custom packaging quote today</h2>
            <p>Send your request and receive next-step guidance from our packaging team.</p>
          </div>
          <div className="cta-actions">
            <Link href="/kontakt" className="button button-quote">
              Get quote
            </Link>
            <Link href="/produkte" className="button-ghost button-ghost-light">
              Explore products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
