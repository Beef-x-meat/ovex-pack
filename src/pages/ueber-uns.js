import { Award, Globe, Heart, Recycle, Users } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import { useScrollReveal } from '@/hooks/useScrollReveal';

const values = [
  {
    icon: Recycle,
    title: 'Nachhaltigkeit',
    description:
      'Wir setzen auf umweltfreundliche Materialien und nachhaltige Produktion für eine bessere Zukunft.'
  },
  {
    icon: Award,
    title: 'Qualität',
    description:
      'Unsere Produkte werden in Europa hergestellt und erfüllen höchste Qualitätsstandards.'
  },
  {
    icon: Heart,
    title: 'Kundenservice',
    description: 'Persönliche Betreuung und kostenloses Design - wir sind für Sie da.'
  },
  {
    icon: Globe,
    title: 'Europaweit',
    description: 'Kostenloser Versand in die gesamte Schweiz und ganz Europa.'
  },
  {
    icon: Recycle,
    title: 'Umweltbewusst',
    description: 'Biologisch abbaubare und recycelbare Verpackungsloesungen.'
  },
  {
    icon: Users,
    title: 'Partnerschaft',
    description: 'Über 6.900 zufriedene Unternehmen vertrauen auf Ovex Pack.'
  }
];

export default function AboutPage() {
  const heroRef = useScrollReveal();
  const storyRef = useScrollReveal();
  const valuesRef = useScrollReveal();

  return (
    <div data-testid="page-about">
      <SeoHead
        title="Über uns"
        description="Erfahren Sie mehr über Ovex Pack - Ihr Partner für individuell bedruckte Verpackungen seit 2021."
        path="/über-uns"
      />

      <section ref={heroRef} className="py-20 lg:py-28 reveal-section">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-6 fade-up">Seit 2021</p>
          <h1 className="section-title mb-5 fade-up-delay-1" data-testid="text-about-title">Über Ovex Pack</h1>
          <p className="section-copy leading-relaxed max-w-2xl mx-auto fade-up-delay-2">
            Ovex Pack ist ein junges Unternehmen, das 2021 gegründet wurde, mit einer klaren Mission:
            Marken durch hochwertige, individuell bedruckte Verpackungen zu stärken.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div ref={storyRef} className="grid lg:grid-cols-2 gap-12 items-center mb-16 reveal-section">
          <div>
            <h2 className="text-2xl font-bold mb-4">Unsere Geschichte</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Ovex Pack ist ein junges Unternehmen, das 2021 gegründet wurde, mit einer klaren Mission:
                Marken durch hochwertige, individuell bedruckte Verpackungen zu stärken.
              </p>
              <p>
                Trotz seiner kurzen Geschichte hat sich Ovex Pack schnell als zuverlässiger Partner für To-Go-Verpackungen etabliert.
                Durch die Zusammenarbeit mit erstklassigen Herstellern in Europa bieten wir innovative Lösungen in höchster Qualität
                zu fairen Preisen.
              </p>
              <p>
                Heute vertrauen zahlreiche Unternehmen von kleinen Cafes bis hin zu aufstrebenden Gastronomieketten auf
                Ovex Pack, um ihre Marke in jeder Verpackung erlebbar zu machen.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <article className="p-6 text-center rounded-2xl apple-card">
              <div className="text-3xl font-bold text-primary mb-1">6.900+</div>
              <div className="text-sm text-muted-foreground">Kunden</div>
            </article>
            <article className="p-6 text-center rounded-2xl apple-card">
              <div className="text-3xl font-bold text-primary mb-1">4.8</div>
              <div className="text-sm text-muted-foreground">Google Rating</div>
            </article>
            <article className="p-6 text-center rounded-2xl apple-card">
              <div className="text-3xl font-bold text-primary mb-1">2021</div>
              <div className="text-sm text-muted-foreground">Gegründet</div>
            </article>
            <article className="p-6 text-center rounded-2xl apple-card">
              <div className="text-3xl font-bold text-primary mb-1">EU</div>
              <div className="text-sm text-muted-foreground">Produktion</div>
            </article>
          </div>
        </div>

        <div ref={valuesRef} className="reveal-section">
          <h2 className="text-2xl font-bold mb-8 text-center">Unsere Werte</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value) => (
              <article key={value.title} className="p-6 rounded-2xl apple-card" data-testid={`card-value-${value.title.toLowerCase()}`}>
                <div className="apple-icon-chip mb-4">
                  <value.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
