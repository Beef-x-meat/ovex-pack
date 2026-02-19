import LegalPage from '@/components/LegalPage';

const sections = [
  {
    heading: 'Anbieter',
    body: 'OVEX PACK, Bahnhofstrasse 42, 8001 Zuerich, Schweiz. E-Mail: info@ovexpack.ch, Telefon: +41 44 123 45 67.'
  },
  {
    heading: 'Vertretungsberechtigte',
    body: 'Geschaeftsfuehrung OVEX PACK. Fuer Rueckfragen steht unser Team ueber die angegebenen Kontaktwege zur Verfuegung.'
  },
  {
    heading: 'Haftungshinweis',
    body: 'Trotz sorgfaeltiger inhaltlicher Kontrolle uebernehmen wir keine Haftung fuer Inhalte externer Links. Fuer deren Inhalt sind ausschliesslich deren Betreiber verantwortlich.'
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
