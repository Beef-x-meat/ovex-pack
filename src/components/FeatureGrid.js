const features = [
  {
    title: 'Fokus statt Overload',
    text: 'Nur die entscheidenden Schritte im Flow. Nutzer finden schneller zur Preisanfrage.'
  },
  {
    title: '3D vor dem Druck',
    text: 'Modelle koennen vor der Produktion gedreht, gezoomt und materialseitig abgestimmt werden.'
  },
  {
    title: 'Schweizer Prozesslogik',
    text: 'Klare Zustaendigkeiten, kurze Formulare und transparente Lieferzeiten ohne UX-Laerm.'
  }
];

export default function FeatureGrid() {
  return (
    <div className="feature-grid" aria-label="Kernfeatures">
      {features.map((feature) => (
        <article key={feature.title} className="feature-card">
          <h3 className="feature-title">{feature.title}</h3>
          <p>{feature.text}</p>
        </article>
      ))}
    </div>
  );
}
