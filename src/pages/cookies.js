import LegalPage from '@/components/LegalPage';

const sections = [
  {
    heading: 'Was sind Cookies?',
    body: 'Cookies sind kleine Textdateien, die auf Ihrem Endgeraet gespeichert werden und bestimmte Funktionen der Website unterstuetzen.'
  },
  {
    heading: 'Einsatz auf dieser Website',
    body: 'Wir verwenden technisch notwendige Cookies fuer grundlegende Funktionen wie Navigation und Warenkorb. Optionale Cookies werden nur nach Einwilligung eingesetzt.'
  },
  {
    heading: 'Steuerung',
    body: 'Sie koennen Cookies jederzeit in den Browsereinstellungen loeschen oder blockieren. Dies kann die Funktionalitaet einzelner Bereiche beeinflussen.'
  }
];

export default function CookiesPage() {
  return (
    <LegalPage
      title="Cookies"
      path="/cookies"
      intro="Informationen zur Nutzung von Cookies und zur Steuerung Ihrer Cookie-Einstellungen."
      sections={sections}
    />
  );
}
