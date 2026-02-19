import { useState } from 'react';
import { Clock, Mail, MapPin, Phone, Send } from 'lucide-react';
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
    details: ['info@ovexpack.ch']
  },
  {
    icon: Clock,
    title: 'Oeffnungszeiten',
    details: ['Mo-Fr: 08:00 - 17:00', 'Sa-So: Geschlossen']
  }
];

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setStatus({ state: 'loading', message: '' });
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          company: form.company || form.name,
          name: form.name,
          email: form.email,
          message: form.message
        })
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || 'Nachricht konnte nicht gesendet werden.');
      }
      setStatus({
        state: 'success',
        message: `Vielen Dank! Wir melden uns innerhalb von 24 Stunden. Ref: ${payload.inquiryId}`
      });
      setForm({ name: '', email: '', company: '', phone: '', message: '' });
    } catch (error) {
      setStatus({ state: 'error', message: error.message });
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
          <h1 className="section-title mb-5" data-testid="text-contact-title">Sprechen wir ueber Ihr Packaging.</h1>
          <p className="section-copy max-w-2xl mx-auto">
            Teilen Sie uns Ihr Projektziel mit. Wir melden uns mit einer klaren Empfehlung und realistischem Zeitplan.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="p-6 lg:p-8 rounded-3xl apple-card product-card-premium">
              <h2 className="text-xl font-semibold mb-6">Nachricht senden</h2>
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <label htmlFor="contact-name" className="sr-only">
                    Ihr Name
                  </label>
                  <input
                    id="contact-name"
                    className="apple-input"
                    placeholder="Ihr Name"
                    value={form.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    required
                    data-testid="input-name"
                  />
                  <label htmlFor="contact-email" className="sr-only">
                    E-Mail
                  </label>
                  <input
                    id="contact-email"
                    className="apple-input"
                    placeholder="ihre@email.ch"
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    required
                    data-testid="input-email"
                  />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label htmlFor="contact-company" className="sr-only">
                    Firmenname
                  </label>
                  <input
                    id="contact-company"
                    className="apple-input"
                    placeholder="Firmenname"
                    value={form.company}
                    onChange={(e) => updateField('company', e.target.value)}
                    data-testid="input-company"
                  />
                  <label htmlFor="contact-phone" className="sr-only">
                    Telefon
                  </label>
                  <input
                    id="contact-phone"
                    className="apple-input"
                    placeholder="+41..."
                    value={form.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    data-testid="input-phone"
                  />
                </div>
                <label htmlFor="contact-message" className="sr-only">
                  Nachricht
                </label>
                <textarea
                  id="contact-message"
                  className="apple-textarea"
                  placeholder="Ihre Nachricht..."
                  value={form.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  required
                  data-testid="input-message"
                />
                <button
                  type="submit"
                  className="apple-btn-primary"
                  disabled={status.state === 'loading'}
                  data-testid="button-send"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {status.state === 'loading' ? 'Wird gesendet...' : 'Nachricht senden'}
                </button>
                {status.state === 'success' && (
                  <p className="text-sm text-green-700 bg-green-50 rounded-md px-3 py-2">{status.message}</p>
                )}
                {status.state === 'error' && (
                  <p className="text-sm text-red-700 bg-red-50 rounded-md px-3 py-2">{status.message}</p>
                )}
              </form>
            </div>
          </div>

          <div className="space-y-4">
            {contactInfo.map((info) => (
              <article
                key={info.title}
                className="p-4 rounded-2xl apple-card product-card-premium"
                data-testid={`card-contact-${info.title.toLowerCase()}`}
              >
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
