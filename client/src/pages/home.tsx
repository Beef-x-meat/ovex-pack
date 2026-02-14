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
  Recycle,
  ChevronLeft,
  ChevronRight,
  Leaf,
  Award,
} from "lucide-react";
import { useState } from "react";
import { useSEO } from "@/hooks/use-seo";

const features = [
  {
    icon: Palette,
    title: "Designhilfe inklusive",
    description: "Unser Expertenteam erstellt Ihren individuellen Designentwurf - kostenlos und unverbindlich.",
  },
  {
    icon: Shield,
    title: "105% Preisgarantie",
    description: "Finden Sie es guenstiger, erstatten wir 105% der Differenz. Versprochen.",
  },
  {
    icon: Truck,
    title: "Gratis Versand",
    description: "Kostenloser Versand in die gesamte Schweiz. Expressproduktion verfuegbar.",
  },
  {
    icon: Leaf,
    title: "Nachhaltig produziert",
    description: "FSC-zertifizierte und biologisch abbaubare Materialien fuer Ihr Unternehmen.",
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

function HeroSection() {
  return (
    <section className="relative overflow-hidden" data-testid="section-hero">
      <div className="absolute inset-0">
        <img
          src="/images/hero-packaging.jpg"
          alt="Premium Verpackungen"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/30" />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-28 lg:py-40">
        <div className="max-w-2xl">
          <p className="text-sm font-medium tracking-widest uppercase text-white/60 mb-6" data-testid="badge-hero">
            Premium Verpackungen aus der Schweiz
          </p>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-8 text-white" data-testid="text-hero-title">
            Verpackungen, die{" "}
            <span className="text-primary">Eindruck</span>{" "}
            hinterlassen.
          </h1>
          <p className="text-lg lg:text-xl text-white/70 mb-10 max-w-lg leading-relaxed" data-testid="text-hero-description">
            Bedruckt oder neutral – immer in Premium-Qualitaet. Ovexpack.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/produkte">
              <Button size="lg" className="text-base px-8" data-testid="button-hero-products">
                Produkte entdecken
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/kontakt">
              <Button
                variant="outline"
                size="lg"
                className="text-base px-8 bg-white/10 border-white/20 text-white backdrop-blur-sm"
                data-testid="button-hero-contact"
              >
                Kontaktiere uns
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  const stats = [
    { value: "6.900+", label: "Zufriedene Kunden" },
    { value: "4.8/5", label: "Google Bewertung", icon: Star },
    { value: "10-14", label: "Tage Lieferzeit" },
    { value: "100%", label: "Gratis Versand" },
  ];

  return (
    <section data-testid="section-stats">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl lg:text-4xl font-bold tracking-tight mb-1" data-testid={`text-stat-${stat.label}`}>
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
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
    <section className="bg-card" data-testid="section-categories">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-4" data-testid="text-categories-title">
            Unser Sortiment
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Von Bechern bis Tueten – alles individuell bedruckbar.
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-[4/3] rounded-md" />
                <Skeleton className="h-5 w-3/4 mx-auto" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {categories?.map((category) => (
              <Link key={category.id} href={`/produkte?cat=${category.slug}`}>
                <div
                  className="group cursor-pointer"
                  data-testid={`card-category-${category.slug}`}
                >
                  <div className="aspect-[4/3] rounded-md overflow-hidden mb-3 bg-muted/30">
                    <img
                      src={category.imageUrl || ""}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-sm lg:text-base font-medium text-center group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section data-testid="section-features">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-4">Warum Ovex Pack?</h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Qualitaet, Service und Nachhaltigkeit – ohne Kompromisse.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="text-center"
              data-testid={`feature-${feature.title.toLowerCase().replace(/\s/g, '-')}`}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
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
      <section className="bg-card">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <Skeleton className="h-10 w-64 mb-12" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="aspect-[4/3]" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!products?.length) return null;

  return (
    <section className="bg-card" data-testid="section-featured">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="flex items-end justify-between mb-12 gap-4 flex-wrap">
          <div>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-3">Beliebte Produkte</h2>
            <p className="text-muted-foreground text-lg">Unsere meistverkauften Verpackungen</p>
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
                <div className="aspect-[4/3] overflow-hidden bg-muted/20">
                  <img
                    src={product.imageUrl || ""}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold">{product.name}</h3>
                    {product.eco && (
                      <Badge variant="secondary" className="shrink-0">
                        <Recycle className="w-3 h-3 mr-1" />
                        Eco
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {product.shortDescription}
                  </p>
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="font-semibold">
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
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setCurrentIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <section data-testid="section-testimonials">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-3xl mx-auto text-center">
          <div className="flex items-center justify-center gap-1 mb-8">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-primary text-primary" />
            ))}
          </div>
          <blockquote className="text-xl lg:text-2xl leading-relaxed mb-8 font-medium" data-testid="text-testimonial">
            &laquo;{testimonials[currentIndex].text}&raquo;
          </blockquote>
          <div className="mb-8">
            <p className="font-semibold">{testimonials[currentIndex].author}</p>
            <p className="text-sm text-muted-foreground">{testimonials[currentIndex].company}</p>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Button variant="outline" size="icon" onClick={prev} data-testid="button-testimonial-prev">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === currentIndex ? "bg-primary w-6" : "bg-muted-foreground/20"
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
    <section className="bg-card" data-testid="section-cta">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="relative rounded-md overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
          <div className="relative px-8 py-16 lg:px-16 lg:py-24 text-center text-primary-foreground">
            <Award className="w-10 h-10 mx-auto mb-6 opacity-80" />
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-5">
              Bereit loszulegen?
            </h2>
            <p className="max-w-xl mx-auto mb-10 text-lg opacity-90">
              Bestellen Sie Ihre individuellen Verpackungen. Kostenlose Designhilfe und Versand inklusive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/produkte">
                <Button variant="secondary" size="lg" className="text-base px-8" data-testid="button-cta-products">
                  Jetzt loslegen
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/kontakt">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base px-8 bg-transparent border-primary-foreground/30 text-primary-foreground backdrop-blur-sm"
                  data-testid="button-cta-contact"
                >
                  Kontakt aufnehmen
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  useSEO({
    title: "Startseite",
    description: "Ovex Pack - Verpackungen, die Eindruck hinterlassen. Bedruckt oder neutral, immer in Premium-Qualitaet. Kostenloser Versand und Designhilfe.",
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
