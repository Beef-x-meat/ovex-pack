export const categorySlugMap = {
  Pappbecher: 'pappbecher',
  Eisbecher: 'eisbecher',
  Plastikbecher: 'plastikbecher',
  Lebensmittelboxen: 'lebensmittelboxen',
  Papiertragetaschen: 'papiertragetaschen',
  Lebensmittelpapier: 'lebensmittelpapier',
  Zubehoer: 'zubehoer'
};

export const slugToCategoryMap = Object.fromEntries(
  Object.entries(categorySlugMap).map(([name, slug]) => [slug, name])
);

export const categoryPageMeta = {
  pappbecher: {
    h1: 'Pappbecher bedrucken - Hebe deine Marke hervor',
    description:
      'Bedruckte Pappbecher sind ein direkter Kontaktpunkt mit deinen Kunden im Alltag. Mit sauberem Druckbild, stabiler Qualitaet und passender Groesse praesentierst du deine Marke professionell bei jedem Getraenk. Unsere Pappbecher eignen sich fuer heisse und kalte Anwendungen und sind auf planbare B2B-Bestellungen ausgelegt. So kombinierst du Sichtbarkeit, Funktion und wirtschaftliche Beschaffung in einer Linie.'
  },
  eisbecher: {
    h1: 'Eisbecher bedrucken - Mehr Sichtbarkeit fuer dein Konzept',
    description:
      'Individuell bedruckte Eisbecher machen dein Branding direkt am Point of Sale sichtbar. Du erhaeltst belastbare Becherqualitaet, klare Druckergebnisse und abgestimmte Formate fuer den professionellen Einsatz. Unsere Loesung ist auf wiederkehrende Mengen und verlaessliche Lieferprozesse ausgerichtet. Damit staerkst du Wiedererkennung und Prozesssicherheit gleichzeitig.'
  },
  plastikbecher: {
    h1: 'Plastikbecher bedrucken - Klar praesentiert, sauber umgesetzt',
    description:
      'Bedruckte Plastikbecher bieten eine starke Flaeche fuer Logos und Kampagnen in Gastronomie, Events und Retail. Wir liefern konsistente Materialqualitaet und praezise Druckumsetzung fuer professionelle Markenauftritte. Die Produkte sind auf skalierbare B2B-Bedarfe mit klaren Mengenmodellen ausgelegt. So bleibt dein Auftritt hochwertig und der Einkauf effizient.'
  },
  lebensmittelboxen: {
    h1: 'Lebensmittelboxen bedrucken - Starkes Branding fuer Take-away',
    description:
      'Bedruckte Lebensmittelboxen schaffen einen hochwertigen Markenauftritt von der Ausgabe bis zum Verzehr. Unsere Boxen verbinden Stabilitaet, sichere Materialien und klare Druckflaechen fuer dein Corporate Design. Das Sortiment deckt gaengige Formate fuer Delivery und Take-away strukturiert ab. So erhaeltst du eine robuste Verpackungsloesung mit verlaesslicher B2B-Logik.'
  },
  papiertragetaschen: {
    h1: 'Papiertragetaschen bedrucken - Markenwirkung beim Mitnehmen',
    description:
      'Papiertragetaschen mit Druck transportieren Produkte und Markenbotschaft gleichzeitig. Du profitierst von sauber verarbeiteten Materialien, praezisem Druck und einem professionellen Auftritt im Alltag deiner Kunden. Unsere Varianten sind fuer unterschiedliche Tragelasten und Einsatzszenarien konzipiert. Das sorgt fuer verlässliche Qualitaet bei planbarer Beschaffung.'
  },
  lebensmittelpapier: {
    h1: 'Lebensmittelpapier bedrucken - Funktion trifft Markenpraesenz',
    description:
      'Bedrucktes Lebensmittelpapier verbindet hygienische Anforderungen mit klarer Markenfuehrung. Die Materialien sind fuer den direkten Kontakt mit Speisen ausgelegt und bieten gleichzeitig hochwertige Druckergebnisse. Das eignet sich fuer Wraps, Einschlagpapier und weitere To-go-Anwendungen im B2B-Kontext. So bleibt dein Verpackungsauftritt konsistent und professionell.'
  },
  zubehoer: {
    h1: 'Verpackungszubehoer bedrucken - Details mit Markenwirkung',
    description:
      'Passendes Zubehoer komplettiert deinen Verpackungsauftritt und verbessert den operativen Ablauf. Von Deckeln bis Strohhalmen erhaeltst du abgestimmte Komponenten fuer ein einheitliches Markenbild. Die Produkte sind fuer wiederkehrende B2B-Bedarfe mit klaren Spezifikationen aufgebaut. Damit reduzierst du Reibung im Einkauf und staerkst die Markenqualitaet im Detail.'
  }
};
