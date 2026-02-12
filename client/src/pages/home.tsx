import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import type { Category, Product } from "@shared/schema";
import {
  Palette,
  Shield,
  Truck,
  Star,
  ArrowRight,
  Package,
  Recycle,
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react";
import { useState } from "react";
import { useSEO } from "@/hooks/use-seo";

const features = [
  {
    icon: Palette,
    title: "Kostenlose Designhilfe",
    description: "Unser Expertenteam erstellt Ihnen einen 3D-Designentwurf - kostenlos und unverbindlich.",
  },
  {
    icon: Shield,
    title: "105% Preisgarantie",
    description: "Die besten Preise der Schweiz. Finden Sie es guenstiger, erstatten wir 105% der Differenz.",
  },
  {
    icon: Truck,
    title: "Kostenloser Versand",
    description: "Immer kostenloser Versand in die gesamte Schweiz. Beschleunigte Produktion verfuegbar.",
  },
  {
    icon: Package,
    title: "Nachhaltige Materialien",
    description: "Umweltfreundliche und biologisch abbaubare Optionen fuer Ihr Unternehmen.",
  },
];

const testimonials = [
  {
    text: "Fantastischer Kundenservice, tolle Qualitaetsprodukte. Meine gebrandeten Becher kamen frueh an. Auch guenstiger als viele Alternativen.",
    author: "Daniella M.",
    company: "Cafe Amersham",
    rating: 5,
  },
  {
    text: "Toller Service, freundliches Personal. Das Designteam ist sehr effizient. Hervorragende Becherqualitaet und vorzeitig geliefert.",
    author: "Joanna K.",
    company: "Beanery Coffee",
    rating: 5,
  },
  {
    text: "Wir benoetigten kurzfristig 5.000 Eisbecher. Die Kommunikation und Umsetzung war perfekt. 100% empfehlenswert.",
    author: "Jennifer S.",
    company: "Candy Cuisine",
    rating: 5,
  },
  {
    text: "Bestellte Markenbecher, sie kamen schnell und zu einem guten Preis an. Die Kommunikation war super schnell und freundlich.",
    author: "Jonathan R.",
    company: "Celtic Events",
    rating: 5,
  },
];

const stats = [
  { value: "6.900+", label: "Zufriedene Kunden" },
  { value: "4.8", label: "Google Bewertung" },
  { value: "10-14", label: "Tage Lieferzeit" },
  { value: "100%", label: "Gratis Versand" },
];

function HeroSection() {
  return (
    <section className="relative overflow-hidden" data-testid="section-hero">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/30" />
      <div className="relative max-w-7xl mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="secondary" className="mb-4" data-testid="badge-hero">
              <Package className="w-3 h-3 mr-1" />
              3D Vorschau & Personalisierung
            </Badge>
            <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-tight mb-6" data-testid="text-hero-title">
              To-Go Verpackung mit{" "}
              <span className="text-primary">Ihrem Logo</span>{" "}
              bedrucken
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed" data-testid="text-hero-description">
              Gestalten Sie Verpackungen mit Ihrem Logo in unserer 3D-Vorschau. Kostenloser Versand und Designhilfe inklusive.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/produkte">
                <Button size="lg" data-testid="button-hero-products">
                  Zu den Produkten
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/konfigurator">
                <Button variant="outline" size="lg" data-testid="button-hero-configurator">
                  3D Konfigurator
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-md overflow-hidden">
              <img
                src="/images/hero-packaging.png"
                alt="Individuell bedruckte Verpackungen"
                className="w-full h-auto object-cover"
                data-testid="img-hero"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="border-y bg-card" data-testid="section-stats">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-primary" data-testid={`text-stat-${stat.label}`}>
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoriesSection() {
  const { data: categories, isLoading } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  return (
    <section className="max-w-7xl mx-auto px-4 py-16" data-testid="section-categories">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-3" data-testid="text-categories-title">
          Alle individuell bedruckten Produkte
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Waehlen Sie aus unserer grossen Auswahl an individuell bedruckbaren Verpackungen fuer Ihr Unternehmen.
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="p-4">
              <Skeleton className="aspect-square rounded-md mb-3" />
              <Skeleton className="h-5 w-3/4 mx-auto" />
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories?.map((category) => (
            <Link key={category.id} href={`/produkte?cat=${category.slug}`}>
              <Card
                className="group p-4 hover-elevate cursor-pointer transition-all duration-200"
                data-testid={`card-category-${category.slug}`}
              >
                <div className="aspect-square rounded-md overflow-hidden mb-3 bg-muted/30">
                  <img
                    src={category.imageUrl || ""}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-sm font-medium text-center">{category.name}</h3>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="bg-card border-y" data-testid="section-features">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Warum Ovex Pack?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Kostenlose Designhilfe, kostenloser Versand und Produkte von grossartiger Qualitaet.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="text-center p-6"
              data-testid={`feature-${feature.title.toLowerCase().replace(/\s/g, '-')}`}
            >
              <div className="w-12 h-12 bg-primary/10 rounded-md flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedProducts() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products", "featured"],
  });

  if (isLoading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-16">
        <Skeleton className="h-8 w-64 mb-8" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="aspect-[4/3]" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  if (!products?.length) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 py-16" data-testid="section-featured">
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <div>
          <h2 className="text-3xl font-bold mb-2">Beliebte Produkte</h2>
          <p className="text-muted-foreground">Unsere meistverkauften Verpackungen</p>
        </div>
        <Link href="/produkte">
          <Button variant="outline" data-testid="button-view-all">
            Alle ansehen
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.slice(0, 6).map((product) => (
          <Link key={product.id} href={`/produkt/${product.slug}`}>
            <Card
              className="overflow-hidden group hover-elevate cursor-pointer"
              data-testid={`card-product-${product.id}`}
            >
              <div className="aspect-[4/3] overflow-hidden bg-muted/30">
                <img
                  src={product.imageUrl || ""}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold">{product.name}</h3>
                  {product.eco && (
                    <Badge variant="secondary" className="shrink-0">
                      <Recycle className="w-3 h-3 mr-1" />
                      Eco
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {product.shortDescription}
                </p>
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <span className="font-semibold text-primary">
                    ab CHF {product.basePrice}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Min. {product.minQuantity} Stueck
                  </span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setCurrentIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="bg-card border-y" data-testid="section-testimonials">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Was unsere Kunden sagen</h2>
          <div className="flex items-center justify-center gap-1 mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-muted-foreground">4.8 von 5 Sternen basierend auf 145+ Bewertungen</p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="text-center px-8">
            <Quote className="w-10 h-10 text-primary/20 mx-auto mb-4" />
            <blockquote className="text-lg leading-relaxed mb-6" data-testid="text-testimonial">
              "{testimonials[currentIndex].text}"
            </blockquote>
            <div>
              <p className="font-semibold">{testimonials[currentIndex].author}</p>
              <p className="text-sm text-muted-foreground">{testimonials[currentIndex].company}</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 mt-8">
            <Button variant="outline" size="icon" onClick={prev} data-testid="button-testimonial-prev">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                  data-testid={`button-testimonial-dot-${i}`}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={next} data-testid="button-testimonial-next">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-16" data-testid="section-cta">
      <div className="bg-primary rounded-md p-8 lg:p-12 text-center text-primary-foreground">
        <h2 className="text-2xl lg:text-3xl font-bold mb-4">
          Bereit, Ihre Marke zu staerken?
        </h2>
        <p className="max-w-xl mx-auto mb-6 opacity-90">
          Bestellen Sie individuell bedruckte Verpackungen in nur 60 Sekunden. Kostenlose Designhilfe und Versand inklusive.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/produkte">
            <Button variant="secondary" size="lg" data-testid="button-cta-products">
              Jetzt loslegen
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link href="/kontakt">
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-primary-foreground/30 text-primary-foreground backdrop-blur-sm"
              data-testid="button-cta-contact"
            >
              Kontakt aufnehmen
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useSEO({
    title: "Startseite",
    description: "Ovex Pack - Ihr Partner fuer individuell bedruckte Verpackungen mit 3D-Vorschau und Logo-Personalisierung. Kostenloser Versand und Designhilfe.",
  });

  return (
    <div>
      <HeroSection />
      <StatsSection />
      <CategoriesSection />
      <FeaturesSection />
      <FeaturedProducts />
      <TestimonialsSection />
      <CTASection />
    </div>
  );
}
