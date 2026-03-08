import LegalPage from '@/components/LegalPage';

const sections = [
  {
    heading: 'Geltungsbereich',
    body: 'Diese Bedingungen gelten für alle Bestellungen, Angebote und Lieferungen von OVEX PACK. Abweichende Bedingungen gelten nur nach schriftlicher Bestätigung.'
  },
  {
    heading: 'Angebot und Bestellung',
    body: 'Angebote sind unverbindlich, sofern nicht anders ausgewiesen. Ein Vertrag kommt mit schriftlicher Auftragsbestaetigung oder Lieferung zustande.'
  },
  {
    heading: 'Lieferung und Zahlung',
    body: 'Liefertermine sind Richtwerte. Rechnungen sind innerhalb der vereinbarten Frist ohne Abzug zahlbar. Es gelten die vereinbarten Versand- und Produktionskosten.'
  }
];

export default function TermsPage() {
  return (
    <LegalPage
      title="AGB"
      path="/agb"
      intro="Übersicht der allgemeinen Geschaeftsbedingungen für Angebote, Bestellungen, Lieferung und Zahlung."
      sections={sections}
    />
  );
}
