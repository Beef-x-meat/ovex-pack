import Link from 'next/link';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { ArrowLeft, ArrowRight, Upload } from 'lucide-react';
import SeoHead from '@/components/SeoHead';

function safeQueryValue(value) {
  return typeof value === 'string' ? value : '';
}

export default function GestaltungPage() {
  const router = useRouter();
  const [logoFile, setLogoFile] = useState(null);
  const [designNotes, setDesignNotes] = useState('');

  const config = useMemo(() => {
    if (!router.isReady) return null;

    return {
      productSlug: safeQueryValue(router.query.productSlug),
      productName: safeQueryValue(router.query.productName) || 'Produkt',
      category: safeQueryValue(router.query.category),
      quantity: safeQueryValue(router.query.quantity),
      size: safeQueryValue(router.query.size),
      colorCount: safeQueryValue(router.query.colorCount),
      printColors: safeQueryValue(router.query.printColors),
      itemColor: safeQueryValue(router.query.itemColor),
      stability: safeQueryValue(router.query.stability),
      lidColor: safeQueryValue(router.query.lidColor),
      lidMaterial: safeQueryValue(router.query.lidMaterial),
      sleeveColor: safeQueryValue(router.query.sleeveColor),
      sleeveDesign: safeQueryValue(router.query.sleeveDesign)
    };
  }, [router.isReady, router.query]);

  function onAbort() {
    if (config?.productSlug) {
      router.push(`/produkt/${config.productSlug}`);
      return;
    }
    router.push('/produkte');
  }

  function onContinue() {
    if (!config) return;

    const lines = [
      `Anfrage fuer individualisierte Gestaltung: ${config.productName}`,
      config.category ? `Kategorie: ${config.category}` : '',
      config.size ? `Groesse: ${config.size}` : '',
      config.quantity ? `Menge: ${config.quantity} Stueck` : '',
      config.colorCount ? `Druckoption: ${config.colorCount}` : '',
      config.printColors ? `Druckfarben: ${config.printColors}` : '',
      config.itemColor ? `Artikel Farbe: ${config.itemColor}` : '',
      config.stability ? `Stabilitaet: ${config.stability}` : '',
      config.lidColor ? `Deckel Farbe: ${config.lidColor}` : '',
      config.lidMaterial ? `Deckel Material: ${config.lidMaterial}` : '',
      config.sleeveColor ? `Sleeve Farbe: ${config.sleeveColor}` : '',
      config.sleeveDesign ? `Sleeve Design: ${config.sleeveDesign}` : '',
      logoFile ? `Logo-Datei vorbereitet: ${logoFile.name}` : '',
      '',
      designNotes ? `Designhinweis: ${designNotes}` : '',
      '',
      'Bitte senden Sie uns ein passendes Angebot. Wir melden uns innerhalb von 24 Stunden.'
    ]
      .filter(Boolean)
      .join('\n');

    const query = new URLSearchParams({
      source: 'gestaltung',
      productSlug: config.productSlug,
      productName: config.productName,
      message: lines
    });

    router.push(`/kontakt?${query.toString()}`);
  }

  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-8 py-14" data-testid="page-gestaltung">
      <SeoHead
        title="Gestaltung konfigurieren"
        description="Laden Sie Ihr Logo hoch und uebermitteln Sie Ihre Designwunsche fuer ein individuelles Angebot."
        path="/gestaltung"
      />

      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/produkte" className="hover:text-foreground">Produkte</Link>
        <span>/</span>
        <span className="text-foreground">Gestaltung</span>
      </div>

      <div className="apple-card product-card-premium rounded-3xl p-6 lg:p-8 space-y-6">
        <div>
          <span className="apple-kicker mb-3">Gestaltung</span>
          <h1 className="text-3xl lg:text-5xl font-semibold tracking-tight mb-3">
            Design fuer Ihr Produkt vorbereiten
          </h1>
          <p className="text-sm text-muted-foreground">
            Laden Sie Ihr Logo hoch und erfassen Sie Hinweise. Danach wird Ihre Anfrage mit allen Daten vorbereitet.
          </p>
        </div>

        {config && (
          <div className="rounded-2xl border border-black/10 bg-white/80 p-4 grid sm:grid-cols-2 gap-3 text-sm">
            <p><span className="text-muted-foreground">Produkt:</span> <span className="font-medium">{config.productName}</span></p>
            {config.size && <p><span className="text-muted-foreground">Groesse:</span> <span className="font-medium">{config.size}</span></p>}
            {config.quantity && <p><span className="text-muted-foreground">Menge:</span> <span className="font-medium">{config.quantity}</span></p>}
            {config.colorCount && <p><span className="text-muted-foreground">Druckoption:</span> <span className="font-medium">{config.colorCount}</span></p>}
            {config.itemColor && <p><span className="text-muted-foreground">Artikel Farbe:</span> <span className="font-medium">{config.itemColor}</span></p>}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              <span className="inline-flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Logo / Design hochladen
              </span>
            </label>
            <input
              type="file"
              className="apple-input"
              accept=".pdf,.ai,.eps,.svg,.png,.jpg,.jpeg"
              onChange={(event) => setLogoFile(event.target.files?.[0] || null)}
            />
            {logoFile && (
              <p className="text-xs text-muted-foreground mt-2">Ausgewaehlt: {logoFile.name}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Designhinweise</label>
            <textarea
              className="apple-textarea"
              placeholder="Farben, Platzierung des Logos, Textwunsch, Referenzen..."
              value={designNotes}
              onChange={(event) => setDesignNotes(event.target.value)}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3 pt-2">
          <button type="button" className="apple-btn-secondary h-11 text-base" onClick={onAbort}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Abbrechen
          </button>
          <button type="button" className="apple-btn-primary h-11 text-base" onClick={onContinue}>
            Anfrage vorbereiten
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}
