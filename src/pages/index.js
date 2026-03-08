import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { ArrowRight, BadgeCheck, Building2, Factory, ShieldCheck, Truck } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import { fetchProducts } from '@/lib/cms';
import { getProductImage } from '@/lib/product-images';

function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('revealed'); io.unobserve(el); } },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

/* ── Hero ─────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative h-[92vh] min-h-[560px] max-h-[860px] overflow-hidden flex items-end">
      {/* video bg */}
      <div className="absolute inset-0">
        <video className="w-full h-full object-cover" autoPlay muted loop playsInline preload="metadata"
          poster="/images/hero-boxes-cloth.jpg">
          <source src="/videos/hero-packaging.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
      </div>

      {/* content bottom-left */}
      <div className="relative w-full max-w-7xl mx-auto px-6 lg:px-10 pb-14 lg:pb-20">
        <p className="text-[11px] tracking-[0.22em] uppercase font-semibold text-white/50 mb-3">
          Swiss Packaging Studio · Zürich
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.06] mb-5 max-w-2xl">
          Verpackungen,<br />
          die <span className="hero-gradient-word">Eindruck</span> hinterlassen.
        </h1>
        <p className="text-base text-white/60 mb-7 max-w-md leading-relaxed">
          Individuell bedruckt oder neutral – in Premium-Qualität. Für Gastronomie &amp; Retail.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/produkte" className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all shadow-lg">
            Produkte entdecken <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/kontakt" className="inline-flex items-center h-11 px-6 rounded-full border border-white/25 text-white text-sm font-medium hover:bg-white/10 transition-all backdrop-blur-sm">
            Offerte anfragen
          </Link>
        </div>
      </div>

      {/* trust strip inside hero bottom */}
      <div className="absolute bottom-0 left-0 right-0 hidden lg:block border-t border-white/10 bg-black/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-10 py-3 flex items-center gap-10">
          {[['6.900+', 'Kunden'], ['EU', 'Produktion'], ['48h', 'Reaktionszeit'], ['Kostenlos', 'Versand ab 500 St.']].map(([v, l]) => (
            <div key={l} className="flex items-center gap-2.5">
              <BadgeCheck className="w-4 h-4 text-primary shrink-0" />
              <span className="text-xs text-white/80"><span className="font-semibold text-white">{v}</span> {l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Category Grid ────────────────────────────────────────────── */
const cats = [
  { label: 'Pappbecher', sub: 'ab CHF 0.11 / St.', href: '/produkte/pappbecher', img: '/images/pappbecher-470ml-weiss.png', span: 'col-span-2 row-span-2' },
  { label: 'Plastikbecher', sub: 'ab CHF 0.06 / St.', href: '/produkte/plastikbecher', img: '/images/plastikbecher-470ml-neu.png' },
  { label: 'Eisbecher', sub: 'ab CHF 0.139 / St.', href: '/produkte/eisbecher', img: '/images/eisbecher-100ml-neu.png' },
  { label: 'Burger- & Foodboxen', sub: 'ab CHF 0.09 / St.', href: '/produkte/lebensmittelboxen', img: '/images/burgerboxen.png', span: 'col-span-2' },
  { label: 'Tragtaschen & Tüten', sub: 'ab CHF 0.125 / St.', href: '/produkte/papiertragetaschen', img: '/images/papiertuete-braun-hero.jpg' },
  { label: 'Servietten & Feuchttücher', sub: 'ab CHF 0.01 / St.', href: '/produkte/servietten', img: '/images/serviette-apex-hero.jpg' },
];

function CategoryGrid() {
  const ref = useScrollReveal();
  return (
    <section ref={ref} className="reveal-section max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase font-semibold text-muted-foreground mb-1.5">Sortiment</p>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">Alles für Ihre Gastronomie.</h2>
        </div>
        <Link href="/produkte" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
          Alle ansehen <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] md:auto-rows-[180px] gap-3">
        {cats.map((c) => (
          <Link key={c.label} href={c.href} className={`group relative overflow-hidden rounded-2xl bg-[#f0ede8] ${c.span || ''}`}>
            <img src={c.img} alt={c.label}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white font-semibold text-sm leading-tight">{c.label}</p>
              <p className="text-white/60 text-xs mt-0.5">{c.sub}</p>
            </div>
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-200">
              <span className="flex items-center gap-1 text-[11px] font-semibold bg-white text-black rounded-full px-2.5 py-1">
                Ansehen <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ── Feature Strip ────────────────────────────────────────────── */
const features = [
  { icon: Building2, title: 'Schweizer Unternehmen', desc: 'Sitz in Zürich, direkte Ansprechpartner' },
  { icon: Factory, title: 'EU-Produktion', desc: 'Kurze Lieferketten, geprüfte Qualität' },
  { icon: Truck, title: 'Kostenloser Versand', desc: 'Ab 500 Einheiten in die Schweiz' },
  { icon: ShieldCheck, title: 'FSC-zertifiziert', desc: 'Nachhaltige Materialien & Produktion' },
];

function FeatureStrip() {
  const ref = useScrollReveal();
  return (
    <section ref={ref} className="reveal-section border-y border-border bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {features.map((f) => (
          <div key={f.title} className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#f4f1eb] border border-black/8 flex items-center justify-center shrink-0">
              <f.icon className="w-4 h-4 text-foreground/70" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-snug">{f.title}</p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-snug">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Bestseller ───────────────────────────────────────────────── */
const BESTSELLER_SLUGS = ['pappbecher-basic', 'plastikbecher-standard', 'burgerboxen', 'eisbecher-standard'];

function tierLabel(tier) {
  if (tier === 'premium') return { label: 'Premium', cls: 'bg-amber-50 text-amber-700 border-amber-200' };
  if (tier === 'individual') return { label: 'Individual', cls: 'bg-indigo-50 text-indigo-700 border-indigo-200' };
  return { label: 'Standard', cls: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
}

function Bestsellers({ products }) {
  const ref = useScrollReveal();
  const items = BESTSELLER_SLUGS.map((s) => products.find((p) => p.slug === s)).filter(Boolean);
  if (!items.length) return null;

  return (
    <section ref={ref} className="reveal-section max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase font-semibold text-muted-foreground mb-1.5">Bestseller</p>
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">Meistbestellte Produkte.</h2>
        </div>
        <Link href="/produkte?view=bestseller" className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
          Alle ansehen <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((p) => {
          const img = getProductImage(p);
          const price = String(p.priceHint).replace('ab CHF ', '').replace(' / Stück', '');
          const { label, cls } = tierLabel(p.tier || 'standard');
          return (
            <Link key={p.id} href={`/produkt/${p.slug}`}>
              <article className="group bg-white rounded-2xl border border-border overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
                <div className="aspect-[4/3] bg-[#f4f1eb] overflow-hidden">
                  {img
                    ? <img src={img} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    : <div className="w-full h-full" />}
                </div>
                <div className="p-4">
                  <span className={`inline-block text-[10px] font-semibold border rounded-full px-2 py-0.5 mb-2 ${cls}`}>{label}</span>
                  <p className="text-sm font-semibold leading-snug mb-1 line-clamp-1">{p.name}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-primary">ab CHF {price}</span>
                    <span className="text-[11px] text-muted-foreground">Min. {p.minOrder} St.</span>
                  </div>
                </div>
              </article>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <Link href="/produkte" className="inline-flex items-center gap-2 h-11 px-8 rounded-full bg-foreground text-white text-sm font-semibold hover:bg-foreground/85 transition-all">
          Alle {products.length} Produkte ansehen <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

/* ── Product Showcase (3 photos side by side) ─────────────────── */
function ShowcaseRow() {
  const ref = useScrollReveal();
  return (
    <section ref={ref} className="reveal-section bg-[#f7f4ef]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase font-semibold text-muted-foreground mb-3">Individualisierung</p>
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-4">
              Ihr Logo. Ihre Farben.<br />Ihre Verpackung.
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-sm">
              Von 1 Farbe bis Vollfarb-Druck — wir produzieren Ihre Verpackung genau nach Ihren Vorgaben.
              Mindestabnahme ab 800 Stück.
            </p>
            <div className="flex flex-col gap-3 text-sm">
              {['Druck ab 1 Farbe bis unbegrenzt', 'Lieferzeit 5–14 Werktage', 'Kostenlose Designberatung', 'FSC-zertifizierte Materialien'].map((t) => (
                <div key={t} className="flex items-center gap-2.5">
                  <BadgeCheck className="w-4 h-4 text-primary shrink-0" />
                  <span>{t}</span>
                </div>
              ))}
            </div>
            <Link href="/kontakt" className="mt-8 inline-flex items-center gap-2 h-11 px-6 rounded-full bg-foreground text-white text-sm font-semibold hover:bg-foreground/85 transition-all">
              Jetzt Muster anfragen <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl overflow-hidden aspect-[3/4] bg-[#ebe7e0]">
              <img src="/images/papiertuete-farbig-hero.jpg" alt="Individuelle Papiertüten" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="flex flex-col gap-3">
              <div className="rounded-2xl overflow-hidden aspect-square bg-[#ebe7e0]">
                <img src="/images/serviette-apex-hero.jpg" alt="Individuelle Serviette" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="rounded-2xl overflow-hidden aspect-square bg-[#ebe7e0]">
                <img src="/images/pappbecher-475ml-branded.jpg" alt="Individueller Pappbecher" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CTA dark ─────────────────────────────────────────────────── */
function CtaDark() {
  const ref = useScrollReveal();
  return (
    <section ref={ref} className="reveal-section bg-[#111] text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold mb-1 text-white">Bereit für Ihre Bestellung?</h2>
          <p className="text-white/50 text-sm">Offerte in 24 h – kostenlos und unverbindlich.</p>
        </div>
        <div className="flex gap-3 shrink-0">
          <Link href="/produkte" className="inline-flex items-center gap-2 h-10 px-5 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-all">
            Produkte
          </Link>
          <Link href="/kontakt" className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-all">
            Offerte anfragen <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Page ─────────────────────────────────────────────────────── */
export default function Home({ products = [] }) {
  return (
    <div>
      <SeoHead
        title="Startseite"
        description="OvexPack – Premium Verpackungen aus der Schweiz. Bedruckt oder neutral, für Gastronomie und Retail."
      />
      <Hero />
      <FeatureStrip />
      <CategoryGrid />
      <Bestsellers products={products} />
      <ShowcaseRow />
      <CtaDark />
    </div>
  );
}

export function getStaticProps() {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { localProducts } = require('@/lib/products');
  return { props: { products: localProducts || [] } };
}
