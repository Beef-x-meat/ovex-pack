import Link from 'next/link';
import Script from 'next/script';
import { ArrowRight, BadgePercent, Building2, Factory, Truck, CheckCircle2, ShieldCheck, Euro, PlaneTakeoff } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import { fetchProducts } from '@/lib/cms';

const categoryImageMap = {
  Pappbecher: '/images/paper-cups.jpg',
  Eisbecher: '/images/ice-cream-cups.jpg',
  Plastikbecher: '/images/plastic-cups.jpg',
  Lebensmittelboxen: '/images/food-boxes.jpg',
  Papiertragetaschen: '/images/paper-bags.jpg',
  Lebensmittelpapier: '/images/wrapping-paper.jpg',
  Zubehoer: '/images/napkins.jpg'
};

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
        <img src="/images/hero-packaging.jpg" alt="Premium Verpackungen" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-28 lg:py-40">
        <div className="max-w-2xl">
          <p className="text-sm font-medium tracking-widest uppercase text-white/60 mb-6" data-testid="badge-hero">
            Premium Verpackungen aus der Schweiz
          </p>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-8 text-white" data-testid="text-hero-title">
            Verpackungen, die <span className="text-[#c2cfb7]">Eindruck</span> hinterlassen.
          </h1>
          <p className="text-lg lg:text-xl text-white/70 mb-10 max-w-lg leading-relaxed" data-testid="text-hero-description">
            Bedruckt oder neutral - immer in Premium-Qualitaet. Ovexpack.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/produkte" className="apple-btn-primary text-base px-8" data-testid="button-hero-products">
              Produkte entdecken
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link
              href="/kontakt"
              className="inline-flex h-[3.1rem] items-center justify-center rounded-full border border-white/20 bg-white/10 px-8 text-base text-white backdrop-blur-sm"
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
  return (
    <section className="bg-white border-y border-black/10" data-testid="section-trust-strip">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {trustPoints.map((item) => (
            <article key={item.title} className="flex items-start gap-3">
              <div className="relative shrink-0 w-10 h-10 rounded-xl border border-black/10 bg-[#f4f5ef] flex items-center justify-center">
                <item.icon className="w-5 h-5 text-[#2f3a2c]" />
                <CheckCircle2 className="w-4 h-4 text-[#74c947] absolute -right-1 -bottom-1 bg-white rounded-full" />
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
  const bestsellers = products.slice(0, 4);
  const hasMoreProducts = totalProducts > bestsellers.length;
  const buttonLabel = hasMoreProducts
    ? `Weitere Produkte entdecken (${totalProducts})`
    : 'Alle Produkte ansehen';

  if (!bestsellers.length) {
    return null;
  }

  return (
    <section className="bg-card" data-testid="section-bestseller">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="mb-10">
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-3">Bestseller</h2>
          <p className="text-muted-foreground text-lg">Meistverkaufte Produkte fuer schnelle Entscheidungen.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestsellers.map((product) => {
            const imageUrl = categoryImageMap[product.category] || '';
            const priceValue = String(product.priceHint).replace('ab CHF ', '').replace(' / Stueck', '');

            return (
              <Link key={product.id} href={`/produkt/${product.slug}`}>
                <article
                  className="rounded-xl overflow-hidden border border-border bg-card transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_30px_50px_-34px_rgba(27,18,7,0.45)]"
                  data-testid={`card-bestseller-${product.id}`}
                >
                  <div className="aspect-[4/3] overflow-hidden bg-muted/20">
                    {imageUrl ? (
                      <img src={imageUrl} alt={product.name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                    ) : (
                      <div className="w-full h-full bg-[#f2eee6]" aria-hidden="true" />
                    )}
                  </div>
                  <div className="p-4">
                    <span className="inline-flex items-center rounded-full border border-black/10 bg-secondary px-2 py-0.5 text-xs font-medium mb-3">
                      Bestseller
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
            className="inline-flex h-[4.6rem] items-center justify-center rounded-full border border-black/10 bg-white px-10 text-[2rem] font-semibold tracking-tight text-foreground shadow-[0_18px_34px_-28px_rgba(27,18,7,0.35)]"
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
  return (
    <section className="bg-card" data-testid="section-why-ovex">
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

function ConfiguratorCtaSection() {
  return (
    <section className="bg-card" data-testid="section-configurator-cta">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-16 lg:pb-20">
        <Script
          type="module"
          src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
          strategy="afterInteractive"
        />
        <div className="rounded-3xl border border-black/10 bg-[#f7f3eb] p-6 lg:p-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="rounded-2xl overflow-hidden border border-black/10 bg-[#e9e3d7] aspect-[16/10] relative">
            <model-viewer
              src="/models/premium/core-box.glb"
              poster="/images/food-boxes.jpg"
              camera-controls
              auto-rotate
              auto-rotate-delay="0"
              rotation-per-second="18deg"
              shadow-intensity="1"
              exposure="1"
              environment-image="neutral"
              style={{ width: '100%', height: '100%', backgroundColor: '#e9e3d7' }}
              aria-label="Animierte 3D Vorschau einer Verpackung"
            />
          </div>
          <div className="max-w-xl">
            <h3 className="text-3xl lg:text-4xl font-semibold tracking-tight leading-tight mb-4">
              Designe deine Produkte individuell fuer dein Unternehmen
            </h3>
            <p className="text-muted-foreground text-base lg:text-lg mb-7">
              Erlebe Material, Form und Branding in einer interaktiven Vorschau fuer schnelle, sichere Entscheidungen.
            </p>
            <Link href="/konfigurator" className="apple-btn-primary" data-testid="button-start-configurator">
              3D Konfigurator starten
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
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
      <ConfiguratorCtaSection />
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
