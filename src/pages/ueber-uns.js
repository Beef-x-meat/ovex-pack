import { Award, Globe, Heart, Recycle, Users } from 'lucide-react';
import SeoHead from '@/components/SeoHead';

const values = [
  {
    icon: Recycle,
    title: 'Nachhaltigkeit',
    description:
      'Wir setzen auf umweltfreundliche Materialien und nachhaltige Produktion fuer eine bessere Zukunft.'
  },
  {
    icon: Award,
    title: 'Qualitaet',
    description:
      'Unsere Produkte werden in Europa hergestellt und erfuellen hoechste Qualitaetsstandards.'
  },
  {
    icon: Heart,
    title: 'Kundenservice',
    description: 'Persoenliche Betreuung und kostenloses Design - wir sind fuer Sie da.'
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
    description: 'Ueber 6.900 zufriedene Unternehmen vertrauen auf Ovex Pack.'
  }
];

export default function AboutPage() {
  return (
    <div data-testid="page-about">
      <SeoHead
        title="Ueber uns"
        description="Erfahren Sie mehr ueber Ovex Pack - Ihr Partner fuer individuell bedruckte Verpackungen seit 2016."
        path="/ueber-uns"
      />

      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-6">Seit 2016</p>
          <h1 className="section-title mb-5" data-testid="text-about-title">Ueber Ovex Pack</h1>
          <p className="section-copy leading-relaxed max-w-2xl mx-auto">
            Wir sind Ihr Partner fuer Premium-Verpackungen in der Schweiz. Qualitaet, Innovation und Nachhaltigkeit
            stehen bei uns an erster Stelle.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">Unsere Geschichte</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Ovex Pack wurde 2016 gegruendet mit einer einfachen Mission: Unternehmen dabei zu helfen, ihre Marke
                durch hochwertige, individuell bedruckte Verpackungen zu staerken.
              </p>
              <p>
                Was als kleine Idee begann, ist heute zu einer fuehrenden Plattform fuer bedruckte To-Go-Verpackungen
                in Europa gewachsen. Wir arbeiten mit den besten Herstellern in Europa zusammen, um Ihnen die hoechste
                Qualitaet zu den besten Preisen zu bieten.
              </p>
              <p>
                Heute vertrauen ueber 6.900 Unternehmen auf Ovex Pack - von kleinen Cafes bis hin zu internationalen
                Ketten wie Delivery Hero und Vapiano.
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
              <div className="text-3xl font-bold text-primary mb-1">2016</div>
              <div className="text-sm text-muted-foreground">Gegruendet</div>
            </article>
            <article className="p-6 text-center rounded-2xl apple-card">
              <div className="text-3xl font-bold text-primary mb-1">EU</div>
              <div className="text-sm text-muted-foreground">Produktion</div>
            </article>
          </div>
        </div>

        <div>
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
