import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { AlertCircle, CheckCircle, Clock, Mail, MapPin, Phone, Send, Upload } from 'lucide-react';
import SeoHead from '@/components/SeoHead';

const contactInfo = [
  {
    icon: MapPin,
    title: 'Adresse',
    details: ['Bahnhofstrasse 42', '8001 Zuerich, Schweiz']
  },
  {
    icon: Phone,
    title: 'Telefon',
    details: ['+41 44 123 45 67']
  },
  {
    icon: Mail,
    title: 'E-Mail',
    details: ['info@ovex-pack.ch']
  },
  {
    icon: Clock,
    title: 'Oeffnungszeiten',
    details: ['Mo-Fr: 08:00 - 17:00', 'Sa-So: Geschlossen']
  }
];

export default function ContactPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  const [logoFile, setLogoFile] = useState(null);
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const prefills = useMemo(() => {
    if (!router.isReady) return {};
    return {
      message: typeof router.query.message === 'string' ? router.query.message : '',
      company: typeof router.query.company === 'string' ? router.query.company : '',
      productName: typeof router.query.productName === 'string' ? router.query.productName : ''
    };
  }, [router.isReady, router.query]);

  useEffect(() => {
    if (!router.isReady) return;
    setForm((prev) => ({
      ...prev,
      company: prev.company || prefills.company,
      message: prev.message || prefills.message
    }));
  }, [router.isReady, prefills.company, prefills.message]);

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setStatus({ state: 'loading', message: '' });

    try {
      const body = new FormData();
      body.append('company', form.company || form.name);
      body.append('name', form.name);
      body.append('email', form.email);
      body.append('phone', form.phone);
      body.append('message', form.message);
      if (logoFile) {
        body.append('logoFile', logoFile);
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        body
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || 'Nachricht konnte nicht gesendet werden.');
      }

      setStatus({
        state: 'success',
        message: `Vielen Dank! Ihre Anfrage wurde gesendet. Sie erhalten eine Bestaetigung per E-Mail. Ref: ${payload.inquiryId}`
      });
      setForm({ name: '', email: '', company: '', phone: '', message: '' });
      setLogoFile(null);
    } catch (error) {
      setStatus({ state: 'error', message: error.message || 'Senden fehlgeschlagen.' });
    }
  }

  return (
    <div data-testid="page-contact">
      <SeoHead
        title="Kontakt"
        description="Kontaktieren Sie Ovex Pack - wir helfen Ihnen gerne bei Fragen zu individuell bedruckten Verpackungen."
        path="/kontakt"
      />

      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <span className="apple-kicker mb-6">Wir sind fuer Sie da</span>
          <h1 className="section-title mb-5">Sprechen wir ueber Ihr Packaging.</h1>
          <p className="section-copy max-w-2xl mx-auto">
            Anfrage senden, Logo anhängen und in 24 Stunden ein passendes Angebot erhalten.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="p-6 lg:p-8 rounded-3xl apple-card product-card-premium">
              <h2 className="text-xl font-semibold mb-4">Anfrage senden</h2>
              {prefills.productName && (
                <p className="text-sm text-muted-foreground mb-4">
                  Vorbefuellte Anfrage fuer: <span className="font-medium text-foreground">{prefills.productName}</span>
                </p>
              )}

              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground/80">Name *</label>
                    <input
                      className="apple-input"
                      placeholder="Max Muster"
                      value={form.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground/80">E-Mail *</label>
                    <input
                      className="apple-input"
                      placeholder="ihre@email.ch"
                      type="email"
                      value={form.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground/80">Firma *</label>
                    <input
                      className="apple-input"
                      placeholder="Firmenname"
                      value={form.company}
                      onChange={(e) => updateField('company', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-foreground/80">Telefon</label>
                    <input
                      className="apple-input"
                      placeholder="+41 44 123 45 67"
                      value={form.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground/80">Nachricht *</label>
                  <textarea
                    className="apple-textarea"
                    placeholder="Beschreiben Sie Ihr Projekt, gewuenschte Mengen, Designs..."
                    value={form.message}
                    onChange={(e) => updateField('message', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground/80 flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Logo / Designdatei hochladen
                  </label>
                  <div
                    className={`relative rounded-2xl border-2 border-dashed transition-all p-6 text-center cursor-pointer hover:border-primary/40 hover:bg-primary/[0.02] ${logoFile ? 'border-primary/30 bg-primary/[0.03]' : 'border-black/12'
                      }`}
                    onClick={() => document.getElementById('file-upload')?.click()}
                    onDragOver={(e) => { e.preventDefault(); e.currentTarget.classList.add('border-primary/40', 'bg-primary/[0.03]'); }}
                    onDragLeave={(e) => { e.currentTarget.classList.remove('border-primary/40', 'bg-primary/[0.03]'); }}
                    onDrop={(e) => {
                      e.preventDefault();
                      e.currentTarget.classList.remove('border-primary/40', 'bg-primary/[0.03]');
                      const file = e.dataTransfer.files?.[0];
                      if (file) setLogoFile(file);
                    }}
                  >
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      accept=".pdf,.ai,.eps,.svg,.png,.jpg,.jpeg"
                      onChange={(event) => setLogoFile(event.target.files?.[0] || null)}
                    />
                    {logoFile ? (
                      <div className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm font-medium">{logoFile.name}</span>
                        <button
                          type="button"
                          className="text-xs text-muted-foreground hover:text-foreground ml-2 underline"
                          onClick={(e) => { e.stopPropagation(); setLogoFile(null); }}
                        >
                          Entfernen
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground/50" />
                        <p className="text-sm text-muted-foreground">
                          Datei hierher ziehen oder <span className="text-primary font-medium">durchsuchen</span>
                        </p>
                        <p className="text-xs text-muted-foreground/60 mt-1">PDF, AI, EPS, SVG, PNG, JPG</p>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className={`apple-btn-primary w-full sm:w-auto transition-all ${status.state === 'loading' ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  disabled={status.state === 'loading'}
                >
                  {status.state === 'loading' ? (
                    <>
                      <svg className="animate-spin w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Wird gesendet...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Anfrage senden
                    </>
                  )}
                </button>

                {status.state === 'success' && (
                  <div className="flex items-start gap-3 text-sm bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl px-4 py-3 toast-enter">
                    <CheckCircle className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600" />
                    <p>{status.message}</p>
                  </div>
                )}
                {status.state === 'error' && (
                  <div className="flex items-start gap-3 text-sm bg-red-50 border border-red-200 text-red-800 rounded-xl px-4 py-3 toast-enter">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-600" />
                    <p>{status.message}</p>
                  </div>
                )}
              </form>
            </div>
          </div>

          <div className="space-y-4">
            {contactInfo.map((info) => (
              <article key={info.title} className="p-4 rounded-2xl apple-card product-card-premium">
                <div className="flex items-start gap-3">
                  <div className="apple-icon-chip shrink-0">
                    <info.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm mb-1">{info.title}</h3>
                    {info.details.map((detail) => (
                      <p key={detail} className="text-sm text-muted-foreground">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
