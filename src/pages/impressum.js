import LegalPage from '@/components/LegalPage';

const sections = [
  {
    heading: 'Anbieter',
    body: 'OVEX PACK, Bahnhofstrasse 42, 8001 Zürich, Schweiz. E-Mail: info@ovexpack.ch, Telefon: +41 44 123 45 67.'
  },
  {
    heading: 'Vertretungsberechtigte',
    body: 'Geschaeftsfuehrung OVEX PACK. Für Rueckfragen steht unser Team über die angegebenen Kontaktwege zur Verfuegung.'
  },
  {
    heading: 'Haftungshinweis',
    body: 'Trotz sorgfaeltiger inhaltlicher Kontrolle uebernehmen wir keine Haftung für Inhalte externer Links. Für deren Inhalt sind ausschliesslich deren Betreiber verantwortlich.'
  }
];

export default function ImprintPage() {
  return (
    <LegalPage
      title="Impressum"
      path="/impressum"
      intro="Anbieterkennzeichnung und Kontaktinformationen gemaess den geltenden Vorschriften."
      sections={sections}
    />
  );
}
