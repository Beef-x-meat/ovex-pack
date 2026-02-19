import SeoHead from '@/components/SeoHead';

export default function LegalPage({ title, path, intro, sections }) {
  return (
    <div className="max-w-4xl mx-auto px-6 lg:px-8 py-16" data-testid={`page-${path.replace('/', '') || 'legal'}`}>
      <SeoHead title={title} description={intro} path={path} />

      <div className="apple-card rounded-3xl p-8 lg:p-10">
        <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-4">Rechtliches</p>
        <h1 className="section-title mb-4">{title}</h1>
        <p className="section-copy mb-10 leading-relaxed">{intro}</p>

        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-semibold mb-2">{section.heading}</h2>
              <p className="text-sm lg:text-base text-muted-foreground leading-relaxed">{section.body}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
