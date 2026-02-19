import LegalPage from '@/components/LegalPage';

const sections = [
  {
    heading: 'Verarbeitete Daten',
    body: 'Wir verarbeiten Kontakt-, Bestell- und Kommunikationsdaten nur, soweit dies zur Bearbeitung von Anfragen, Angeboten und Auftraegen erforderlich ist.'
  },
  {
    heading: 'Zweck und Rechtsgrundlage',
    body: 'Die Verarbeitung erfolgt zur Vertragserfuellung, zur Erfuellung gesetzlicher Pflichten und auf Basis berechtigter Interessen im Kundenservice.'
  },
  {
    heading: 'Speicherdauer und Rechte',
    body: 'Daten werden nur so lange gespeichert, wie es fuer die genannten Zwecke oder gesetzlich erforderlich ist. Sie haben Auskunfts-, Berichtigungs- und Loeschungsrechte.'
  }
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Datenschutz"
      path="/datenschutz"
      intro="Informationen zur Verarbeitung personenbezogener Daten in unserer Website und im Kontaktprozess."
      sections={sections}
    />
  );
}
