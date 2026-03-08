import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Cookie } from 'lucide-react';

const STORAGE_KEY = 'ovexpack_cookie_consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        setVisible(true);
      }
    } catch {
      // localStorage not available (SSR or privacy mode)
    }
  }, []);

  function accept() {
    try { localStorage.setItem(STORAGE_KEY, 'accepted'); } catch {}
    setVisible(false);
  }

  function decline() {
    try { localStorage.setItem(STORAGE_KEY, 'declined'); } catch {}
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie-Einstellungen"
      className="fixed bottom-0 left-0 right-0 z-[9990] border-t border-black/10 bg-white/95 backdrop-blur-md shadow-[0_-8px_32px_-8px_rgba(0,0,0,0.12)]"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Cookie className="w-5 h-5 text-primary shrink-0 mt-0.5 sm:mt-0" aria-hidden="true" />
        <p className="flex-1 text-sm text-muted-foreground leading-relaxed">
          Wir verwenden Cookies, um Ihre Erfahrung zu verbessern und Besuche zu analysieren.
          Weitere Infos in unserer{' '}
          <Link href="/datenschutz" className="underline underline-offset-2 hover:text-foreground transition-colors">
            Datenschutzerklaerung
          </Link>
          .
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            type="button"
            onClick={decline}
            className="text-sm px-4 py-2 rounded-full border border-black/15 bg-transparent hover:bg-black/5 transition-colors font-medium"
          >
            Ablehnen
          </button>
          <button
            type="button"
            onClick={accept}
            className="text-sm px-4 py-2 rounded-full bg-foreground text-white hover:bg-foreground/85 transition-colors font-medium"
          >
            Alle akzeptieren
          </button>
        </div>
      </div>
    </div>
  );
}
