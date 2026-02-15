import { useState } from 'react';
import SeoHead from '@/components/SeoHead';

export default function ContactPage() {
  const [form, setForm] = useState({
    company: '',
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus({ state: 'loading', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || 'Contact request failed.');
      }

      setStatus({
        state: 'success',
        message: `Thanks, request ${payload.inquiryId} was submitted.`
      });

      setForm({ company: '', name: '', email: '', phone: '', message: '' });
    } catch (error) {
      setStatus({
        state: 'error',
        message: error.message
      });
    }
  }

  return (
    <>
      <SeoHead
        title="Contact and quote"
        description="Get in touch for custom packaging offers, lead times, and artwork guidance."
        path="/kontakt"
      />

      <section className="section section-soft">
        <div className="container">
          <p className="eyebrow">Contact</p>
          <h1 className="section-title">Get your packaging quote</h1>
          <p className="section-copy">
            Share your product needs, estimated quantities, and timeline. We will respond with clear next steps.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container detail-layout">
          <article className="panel contact-info-panel">
            <h2 style={{ marginTop: 0 }}>Sales office</h2>
            <p className="form-help">SwissPack Studio AG</p>
            <p className="form-help">Europaallee 12, 8004 Zurich</p>
            <p className="form-help">hello@swisspack-studio.ch</p>
            <p className="form-help">+41 44 600 20 10</p>

            <div className="map-placeholder" role="img" aria-label="Office map placeholder">
              Zurich office map
            </div>
          </article>

          <form className="order-box" onSubmit={handleSubmit} aria-label="Contact form">
            <h2 style={{ margin: 0 }}>Request form</h2>

            <div className="form-row">
              <label htmlFor="company" className="sr-only">
                Company
              </label>
              <input
                id="company"
                className="input"
                required
                value={form.company}
                onChange={(event) => updateField('company', event.target.value)}
                placeholder="Company"
              />

              <label htmlFor="name" className="sr-only">
                Name
              </label>
              <input
                id="name"
                className="input"
                required
                value={form.name}
                onChange={(event) => updateField('name', event.target.value)}
                placeholder="Contact person"
              />
            </div>

            <div className="form-row">
              <label htmlFor="email" className="sr-only">
                E-Mail
              </label>
              <input
                id="email"
                className="input"
                type="email"
                required
                value={form.email}
                onChange={(event) => updateField('email', event.target.value)}
                placeholder="E-Mail"
              />

              <label htmlFor="phone" className="sr-only">
                Phone
              </label>
              <input
                id="phone"
                className="input"
                type="tel"
                value={form.phone}
                onChange={(event) => updateField('phone', event.target.value)}
                placeholder="Phone (optional)"
              />
            </div>

            <label htmlFor="message" className="sr-only">
              Message
            </label>
            <textarea
              id="message"
              className="textarea"
              required
              value={form.message}
              onChange={(event) => updateField('message', event.target.value)}
              placeholder="Product type, quantity, print, preferred delivery window"
            />

            <button type="submit" className="button button-quote" disabled={status.state === 'loading'}>
              {status.state === 'loading' ? 'Sending...' : 'Send request'}
            </button>

            {status.state === 'success' && <p className="success-box">{status.message}</p>}
            {status.state === 'error' && <p className="error-box">{status.message}</p>}
          </form>
        </div>
      </section>
    </>
  );
}
