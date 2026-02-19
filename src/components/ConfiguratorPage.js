import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import { ArrowRight, Box, Sparkles } from 'lucide-react';

const ProductConfigurator3D = dynamic(() => import('@/components/ProductConfigurator3D'), {
  ssr: false
});

const productTypes = [
  {
    type: 'cup',
    label: 'Pappbecher',
    description: 'Kaffee, Softdrinks, Seasonal Cups',
    image: '/images/paper-cups.jpg'
  },
  {
    type: 'bag',
    label: 'Papiertueten',
    description: 'Retail und Food Take-away',
    image: '/images/paper-bags.jpg'
  },
  {
    type: 'box',
    label: 'Food Boxen',
    description: 'Meal, Snack, Delivery',
    image: '/images/food-boxes.jpg'
  }
];

export default function ConfiguratorPage() {
  const [selectedType, setSelectedType] = useState('cup');

  const selected = useMemo(
    () => productTypes.find((item) => item.type === selectedType) || productTypes[0],
    [selectedType]
  );

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-20" data-testid="page-configurator">
      <section className="mb-14 lg:mb-16">
        <span className="apple-kicker mb-5 inline-flex">
          <Sparkles className="w-3 h-3 mr-1" />
          Packaging Studio
        </span>
        <h1 className="section-title mb-5" data-testid="text-configurator-title">
          Konfigurieren wie im Premium-Produktstudio.
        </h1>
        <p className="section-copy max-w-3xl">
          Waehlen Sie ein Kernmodell, testen Sie Varianten und visualisieren Sie Ihr Branding in einer
          realistischen 3D-Vorschau. Die Struktur bleibt bewusst klar, damit Entscheidungen schneller fallen.
        </p>
      </section>

      <section className="grid xl:grid-cols-[0.95fr,1.05fr] gap-6 lg:gap-8 items-start">
        <div className="space-y-4">
          {productTypes.map((item) => (
            <article
              key={item.type}
              className={`rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 ${
                selectedType === item.type
                  ? 'apple-card product-card-premium border-black/20 shadow-[0_30px_44px_-34px_rgba(28,18,6,0.6)]'
                  : 'bg-white border-black/10 hover:border-black/22 hover:shadow-[0_24px_36px_-30px_rgba(28,18,6,0.48)]'
              }`}
              onClick={() => setSelectedType(item.type)}
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  setSelectedType(item.type);
                }
              }}
              data-testid={`card-type-${item.type}`}
            >
              <div className="grid grid-cols-[120px,1fr] sm:grid-cols-[140px,1fr] gap-0">
                <div className="brand-frame">
                  <img
                    src={item.image}
                    alt={item.label}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover brand-shot"
                  />
                </div>
                <div className="p-4 sm:p-5">
                  <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.1em] text-muted-foreground mb-2">
                    <Box className="w-3.5 h-3.5" />
                    Kernmodell
                  </div>
                  <h2 className="text-lg font-semibold tracking-tight mb-1">{item.label}</h2>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </article>
          ))}

          <div className="rounded-2xl apple-card product-card-premium p-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.11em] text-muted-foreground mb-3">
              Produktnahe Varianten
            </h3>
            <div className="grid grid-cols-3 gap-2.5">
              <div className="rounded-xl overflow-hidden border border-black/[0.08] brand-frame">
                <img src="/images/wrapping-paper.jpg" alt="Wrapping Paper" className="w-full h-24 object-cover brand-shot" loading="lazy" decoding="async" />
              </div>
              <div className="rounded-xl overflow-hidden border border-black/[0.08] brand-frame">
                <img src="/images/salad-bowls.jpg" alt="Salat Schalen" className="w-full h-24 object-cover brand-shot" loading="lazy" decoding="async" />
              </div>
              <div className="rounded-xl overflow-hidden border border-black/[0.08] brand-frame">
                <img src="/images/ice-cream-cups.jpg" alt="Eisbecher" className="w-full h-24 object-cover brand-shot" loading="lazy" decoding="async" />
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Diese Varianten bauen auf den drei Kernmodellen auf und spiegeln typische Verkaufsprodukte wider.
            </p>
          </div>
        </div>

        <ProductConfigurator3D
          productType={selected.type}
          productName={selected.label}
        />
      </section>

      <section className="text-center mt-12">
        <p className="section-copy mb-5">
          Nach der Vorschau koennen Sie nahtlos in den Produktkatalog wechseln.
        </p>
        <Link href="/produkte" className="apple-btn-primary" data-testid="button-to-products">
          Alle Produkte ansehen
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </section>
    </div>
  );
}
