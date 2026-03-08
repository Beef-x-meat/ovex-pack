import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Loader2, Package, Paperclip, ShoppingCart, Upload } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import { useCart } from '@/hooks/useCart';
import { localProducts } from '@/lib/products';
import { getProductImage } from '@/lib/product-images';

const productMap = new Map(localProducts.map((p) => [p.id, p]));

const STEPS = ['Kontaktdaten', 'Bestelluebersicht', 'Bestätigung'];

function StepIndicator({ current }) {
  return (
    <div className="flex items-center gap-0 mb-10" aria-label="Bestellschritte">
      {STEPS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all
                  ${done ? 'bg-emerald-500 border-emerald-500 text-white' : active ? 'bg-primary border-primary text-white' : 'bg-white border-muted text-muted-foreground'}`}
                aria-current={active ? 'step' : undefined}
              >
                {done ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <p className={`text-xs mt-1.5 font-medium whitespace-nowrap ${active ? 'text-foreground' : 'text-muted-foreground'}`}>
                {label}
              </p>
            </div>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 mb-5 rounded-full transition-all ${done ? 'bg-emerald-400' : 'bg-border'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

function ContactStep({ data, onChange, onNext, logoFile, onLogoChange }) {
  const [errors, setErrors] = useState({});

  function validate() {
    const e = {};
    if (!data.name.trim()) e.name = 'Name ist erforderlich';
    if (!data.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Gültige E-Mail erforderlich';
    if (!data.company.trim()) e.company = 'Firmenname ist erforderlich';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) onNext();
  }

  const fields = [
    { key: 'name', label: 'Name *', type: 'text', placeholder: 'Max Mustermann' },
    { key: 'email', label: 'E-Mail *', type: 'email', placeholder: 'max@beispiel.ch' },
    { key: 'company', label: 'Firma *', type: 'text', placeholder: 'Muster AG' },
    { key: 'phone', label: 'Telefon', type: 'tel', placeholder: '+41 79 000 00 00' },
    { key: 'address', label: 'Lieferadresse', type: 'text', placeholder: 'Musterstraße 1, 8001 Zürich' }
  ];

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 className="text-xl font-semibold mb-6">Ihre Kontaktdaten</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {fields.map(({ key, label, type, placeholder }) => (
          <div key={key} className={key === 'address' || key === 'name' ? 'sm:col-span-2' : ''}>
            <label className="block text-sm font-medium mb-1.5" htmlFor={`checkout-${key}`}>
              {label}
            </label>
            <input
              id={`checkout-${key}`}
              type={type}
              value={data[key]}
              onChange={(e) => onChange({ ...data, [key]: e.target.value })}
              placeholder={placeholder}
              className={`apple-input ${errors[key] ? 'border-red-400 focus:ring-red-400' : ''}`}
              aria-describedby={errors[key] ? `err-${key}` : undefined}
            />
            {errors[key] && (
              <p id={`err-${key}`} className="text-xs text-red-500 mt-1">{errors[key]}</p>
            )}
          </div>
        ))}
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1.5" htmlFor="checkout-message">
            Anmerkungen zur Bestellung
          </label>
          <textarea
            id="checkout-message"
            rows={3}
            value={data.message}
            onChange={(e) => onChange({ ...data, message: e.target.value })}
            placeholder="Besondere Wünsche, Druckvorgaben oder Fragen..."
            className="apple-textarea"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-medium mb-1.5">
            Logo / Design-Datei <span className="text-muted-foreground font-normal">(optional)</span>
          </label>
          <label
            htmlFor="checkout-logo"
            className="flex items-center gap-3 cursor-pointer rounded-xl border border-dashed border-black/20 bg-white/60 px-4 py-3 hover:border-primary hover:bg-primary/5 transition-colors"
          >
            <Upload className="w-4 h-4 text-muted-foreground shrink-0" />
            {logoFile ? (
              <span className="text-sm font-medium text-foreground flex items-center gap-1.5">
                <Paperclip className="w-3.5 h-3.5" />
                {logoFile.name}
              </span>
            ) : (
              <span className="text-sm text-muted-foreground">Logo hochladen (PNG, JPG, PDF, AI, SVG)</span>
            )}
            <input
              id="checkout-logo"
              type="file"
              accept=".png,.jpg,.jpeg,.pdf,.ai,.svg,.eps"
              className="sr-only"
              onChange={(e) => onLogoChange(e.target.files?.[0] || null)}
            />
          </label>
          {logoFile && (
            <button
              type="button"
              className="text-xs text-muted-foreground mt-1 hover:text-red-500"
              onClick={() => onLogoChange(null)}
            >
              Datei entfernen
            </button>
          )}
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        <button type="submit" className="apple-btn-primary px-8">
          Weiter zur Übersicht
          <ArrowRight className="w-4 h-4 ml-2" />
        </button>
      </div>
    </form>
  );
}

function SummaryStep({ contact, cartItems, total, onBack, onSubmit, submitting }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Bestelluebersicht</h2>

      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Kontakt</h3>
          <div className="apple-card rounded-xl p-4 space-y-1.5 text-sm">
            <p><span className="font-medium">Name:</span> {contact.name}</p>
            <p><span className="font-medium">E-Mail:</span> {contact.email}</p>
            <p><span className="font-medium">Firma:</span> {contact.company}</p>
            {contact.phone && <p><span className="font-medium">Telefon:</span> {contact.phone}</p>}
            {contact.address && <p><span className="font-medium">Adresse:</span> {contact.address}</p>}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
            Artikel ({cartItems.length})
          </h3>
          <div className="apple-card rounded-xl divide-y">
            {cartItems.map((item) => {
              const price = Number(item.product?.priceHint?.replace('ab CHF ', '').replace(' / Stück', '') || 0);
              return (
                <div key={item.id} className="flex items-center gap-3 p-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted/30 shrink-0">
                    <img src={item.imageUrl || '/images/food-boxes.jpg'} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-1">{item.product?.name}</p>
                    {item.size && <p className="text-xs text-muted-foreground">{item.size}</p>}
                    <p className="text-xs text-muted-foreground">{item.quantity} St.</p>
                  </div>
                  <p className="text-sm font-semibold shrink-0">CHF {(price * item.quantity).toFixed(2)}</p>
                </div>
              );
            })}
            <div className="p-3 flex justify-between font-semibold">
              <span>Gesamt (Richtwert)</span>
              <span className="text-primary">CHF {total.toFixed(2)}</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Der finale Preis wird nach Prüfung Ihrer Anforderungen bestätigt.
          </p>
        </div>
      </div>

      {contact.message && (
        <div className="mt-4">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Anmerkungen</h3>
          <div className="apple-card rounded-xl p-4 text-sm text-muted-foreground">{contact.message}</div>
        </div>
      )}

      <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
        <button type="button" onClick={onBack} className="apple-btn-secondary px-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Zurück
        </button>
        <button
          type="button"
          onClick={onSubmit}
          disabled={submitting}
          className="apple-btn-primary px-8 min-w-[180px]"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Wird gesendet...
            </>
          ) : (
            <>
              Anfrage absenden
              <ArrowRight className="w-4 h-4 ml-2" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function ConfirmationStep({ inquiryId, contact }) {
  return (
    <div className="text-center py-8">
      <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center mx-auto mb-6">
        <CheckCircle2 className="w-10 h-10 text-emerald-500" />
      </div>
      <h2 className="text-2xl font-bold mb-3">Anfrage eingegangen!</h2>
      <p className="text-muted-foreground mb-2">
        Vielen Dank, <strong>{contact.name}</strong>. Wir haben Ihre Bestellanfrage erhalten.
      </p>
      <p className="text-muted-foreground mb-6">
        Wir melden uns innerhalb von 24 Stunden unter <strong>{contact.email}</strong>.
      </p>
      {inquiryId && (
        <div className="inline-block bg-muted/50 rounded-xl px-4 py-2 mb-8">
          <p className="text-xs text-muted-foreground">Ihre Anfrage-Nr.</p>
          <p className="font-mono font-semibold text-lg">{inquiryId}</p>
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/produkte" className="apple-btn-secondary px-6">
          <Package className="w-4 h-4 mr-2" />
          Weitere Produkte ansehen
        </Link>
        <Link href="/" className="apple-btn-primary px-6">
          Zur Startseite
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [inquiryId, setInquiryId] = useState('');

  const { items, clearCart } = useCart();

  const cartItems = useMemo(() =>
    items.map((item) => {
      const product = productMap.get(item.productId) || null;
      return {
        ...item,
        product,
        imageUrl: product ? (getProductImage(product) || '/images/food-boxes.jpg') : '/images/food-boxes.jpg'
      };
    }),
    [items]
  );

  const [contact, setContact] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    address: '',
    message: ''
  });
  const [logoFile, setLogoFile] = useState(null);

  const total = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const price = Number(item.product?.priceHint?.replace('ab CHF ', '').replace(' / Stück', '') || 0);
      return sum + price * item.quantity;
    }, 0);
  }, [cartItems]);

  async function handleSubmit() {
    setSubmitting(true);
    try {
      const cartSummary = cartItems
        .map((item) => `- ${item.product?.name} (${item.quantity} St., ${item.size || 'Standard'})`)
        .join('\n');

      const message = `BESTELLANFRAGE\n\nArtikel:\n${cartSummary}\n\nRichtwert Total: CHF ${total.toFixed(2)}\n\nLieferadresse: ${contact.address || '–'}\n\nAnmerkungen: ${contact.message || '–'}`;

      const form = new FormData();
      form.append('name', contact.name);
      form.append('email', contact.email);
      form.append('company', contact.company);
      form.append('phone', contact.phone || '');
      form.append('message', message);
      if (logoFile) {
        form.append('logoFile', logoFile);
      }

      const res = await fetch('/api/contact', { method: 'POST', body: form });
      const data = await res.json();
      if (data.ok) {
        setInquiryId(data.inquiryId || '');
        clearCart();
        setStep(2);
      } else {
        alert('Fehler beim Senden. Bitte versuchen Sie es erneut.');
      }
    } catch {
      alert('Netzwerkfehler. Bitte prüfen Sie Ihre Verbindung.');
    } finally {
      setSubmitting(false);
    }
  }

  if (!cartItems.length && step < 2) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center" data-testid="checkout-empty">
        <SeoHead title="Kasse" description="Ihre Bestellung abschließen" path="/checkout" />
        <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-muted-foreground/40" />
        <h1 className="text-2xl font-bold mb-3">Ihr Warenkorb ist leer</h1>
        <p className="text-muted-foreground mb-8">Fügen Sie zuerst Produkte in den Warenkorb.</p>
        <Link href="/produkte" className="apple-btn-primary px-8">
          Produkte entdecken
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 lg:py-16" data-testid="page-checkout">
      <SeoHead title="Kasse" description="Ihre Bestellung bei OvexPack abschließen" path="/checkout" />

      <div className="mb-8 flex items-center gap-3">
        <Link href="/warenkorb" className="apple-btn-secondary h-9 w-9 p-0 shrink-0" aria-label="Zurück zum Warenkorb">
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <h1 className="text-2xl font-bold">Kasse</h1>
      </div>

      <StepIndicator current={step} />

      <div className="apple-card rounded-2xl p-6 lg:p-8">
        {step === 0 && (
          <ContactStep data={contact} onChange={setContact} onNext={() => setStep(1)} logoFile={logoFile} onLogoChange={setLogoFile} />
        )}
        {step === 1 && (
          <SummaryStep
            contact={contact}
            cartItems={cartItems}
            total={total}
            onBack={() => setStep(0)}
            onSubmit={handleSubmit}
            submitting={submitting}
          />
        )}
        {step === 2 && (
          <ConfirmationStep inquiryId={inquiryId} contact={contact} />
        )}
      </div>
    </div>
  );
}
