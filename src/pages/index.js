import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { ArrowRight, BadgePercent, Building2, Factory, Truck, CheckCircle2, ShieldCheck, Euro, PlaneTakeoff } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import { fetchProducts } from '@/lib/cms';

function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

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
  'plastikbecher-standard': '/images/plastikbecher-basic-350ml.png',
  'plastikbecher-individual': '/images/plastikbecher-550ml.png',
  'deckel-plastik': '/images/plastikbecher-deckel-flach-new.png',
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

const trustPoints = [
  {
    title: 'Schweizer Unternehmen',
    description: 'Produktion & Support mit Sitz in Zuerich',
    icon: Building2
  },
  {
    title: 'Herstellung in Europa',
    description: 'Kurze Lieferketten, gepruefte Qualitaet',
    icon: Factory
  },
  {
    title: 'Marktgerechte Preise',
    description: 'Orientiert an fuehrenden Schweizer Anbietern',
    icon: BadgePercent
  },
  {
    title: 'Kostenloser Versand',
    description: 'Ab 500 Einheiten innerhalb der Schweiz',
    icon: Truck
  }
];

function HeroSection() {
  return (
    <section className="relative overflow-hidden" data-testid="section-hero">
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero-boxes-cloth.jpg"
        >
          <source src="/videos/hero-packaging.mp4" type="video/mp4" />
          <source src="/videos/hero-packaging.mov" type="video/quicktime" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-28 lg:py-40">
        <div className="max-w-2xl">
          <p className="text-sm font-medium tracking-widest uppercase text-white/60 mb-6 fade-up" data-testid="badge-hero">
            Premium Verpackungen aus der Schweiz
          </p>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-8 text-white fade-up-delay-1" data-testid="text-hero-title">
            Verpackungen, die <span className="hero-gradient-word">Eindruck</span> hinterlassen.
          </h1>
          <p className="text-lg lg:text-xl text-white/70 mb-10 max-w-lg leading-relaxed fade-up-delay-2" data-testid="text-hero-description">
            Bedruckt oder neutral - immer in Premium-Qualitaet. Ovexpack.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 fade-up-delay-3">
            <Link href="/produkte" className="apple-btn-primary text-base px-8" data-testid="button-hero-products">
              Produkte entdecken
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/kontakt"
              className="inline-flex h-[3.1rem] items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 text-base text-white backdrop-blur-sm hover:bg-white/20 transition-all"
              data-testid="button-hero-contact"
            >
              Kontaktiere uns
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStripSection() {
  const ref = useScrollReveal();
  return (
    <section ref={ref} className="bg-white border-y border-black/10 reveal-section" data-testid="section-trust-strip">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {trustPoints.map((item) => (
            <article key={item.title} className="flex items-start gap-3">
              <div className="relative shrink-0 w-10 h-10 rounded-xl border border-black/10 bg-[#f4f5ef] flex items-center justify-center">
                <item.icon className="w-5 h-5 text-[#2f3a2c]" />
                <CheckCircle2 className="w-4 h-4 text-[#c56b1a] absolute -right-1 -bottom-1 bg-white rounded-full" />
              </div>
              <div>
                <h3 className="text-[1rem] font-semibold leading-tight">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-snug mt-1">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BestsellerSection({ products, totalProducts }) {
  const ref = useScrollReveal();
  const bestsellerSlugs = [
    'pappbecher-basic',
    'plastikbecher-standard',
    'pizzakartons-eco',
    'salatschalen-standard'
  ];
  const bestsellers = bestsellerSlugs
    .map((slug) => products.find((product) => product.slug === slug))
    .filter(Boolean);
  const hasMoreProducts = totalProducts > bestsellers.length;
  const buttonLabel = hasMoreProducts
    ? `Weitere Produkte entdecken (${totalProducts})`
    : 'Alle Produkte ansehen';

  if (!bestsellers.length) {
    return null;
  }

  return (
    <section ref={ref} className="bg-card reveal-section" data-testid="section-bestseller">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="mb-10">
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-3">Unsere Bestseller</h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
            Unsere Bestseller – aus gutem Grund. Diese Produkte werden am häufigsten gewählt.
            Warum? Weil sie zuverlässig liefern, was sie versprechen: stabile Qualität,
            schnelle Verfügbarkeit und faire Preise.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((product) => {
            const imageUrl = getProductImage(product);
            const priceValue = String(product.priceHint).replace('ab CHF ', '').replace(' / Stueck', '');
            const tier = resolveTier(product);
            const imageClass =
              ['pappbecher-basic', 'pappbecher-individual'].includes(product.slug)
                ? 'catalog-shot-pappbecher'
                : 'catalog-shot';

            return (
              <Link key={product.id} href={`/produkt/${product.slug}`}>
                <article
                  className="rounded-xl overflow-hidden border border-border bg-card transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_30px_50px_-34px_rgba(27,18,7,0.45)]"
                  data-testid={`card-bestseller-${product.id}`}
                >
                  <div className="aspect-[4/3] overflow-hidden bg-muted/20">
                    {imageUrl ? (
                      <img src={imageUrl} alt={product.name} className={imageClass} loading="lazy" decoding="async" />
                    ) : (
                      <div className="w-full h-full bg-[#f2eee6]" aria-hidden="true" />
                    )}
                  </div>
                  <div className="p-4">
                    <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold mb-3 ${tierBadgeClass(tier)}`}>
                      {resolveBadgeLabel(product)}
                    </span>
                    <h3 className="font-semibold text-base mb-2 line-clamp-1">{product.name}</h3>
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="text-lg font-semibold">ab CHF {priceValue}</span>
                      <span className="text-xs text-muted-foreground">Min. {product.minOrder} St.</span>
                    </div>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/produkte"
            className="inline-flex h-[4.6rem] items-center justify-center rounded-full border border-[#4f46e5] bg-gradient-to-r from-[#6366f1] via-[#4f46e5] to-[#4338ca] px-10 text-[2rem] font-semibold tracking-tight text-white shadow-[0_22px_38px_-22px_rgba(67,56,202,0.52)]"
            data-testid="button-bestseller-more"
          >
            {buttonLabel}
            <ArrowRight className="w-7 h-7 ml-3" />
          </Link>
        </div>
      </div>
    </section>
  );
}

const whyPoints = [
  { title: 'Schweizer Unternehmen', icon: ShieldCheck },
  { title: 'Produktion in Europa', icon: Factory },
  { title: 'Marktgerechte Preise', icon: Euro },
  { title: 'Kostenloser Versand ab 500 Einheiten', icon: PlaneTakeoff }
];

function WhyOvexPackSection() {
  const ref = useScrollReveal();
  return (
    <section ref={ref} className="bg-card reveal-section" data-testid="section-why-ovex">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-12 lg:pb-14">
        <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight mb-8">Warum OvexPack?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-6">
          {whyPoints.map((item) => (
            <div key={item.title} className="flex items-center gap-3">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-white">
                <item.icon className="h-4 w-4 text-foreground" />
              </span>
              <p className="text-sm lg:text-[0.96rem] font-medium text-foreground/90">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home({ products }) {
  const totalProducts = products.length;

  return (
    <div>
      <SeoHead
        title="Startseite"
        description="Ovex Pack - Verpackungen, die Eindruck hinterlassen. Bedruckt oder neutral, immer in Premium-Qualitaet."
      />
      <HeroSection />
      <TrustStripSection />
      <BestsellerSection products={products} totalProducts={totalProducts} />
      <WhyOvexPackSection />
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
