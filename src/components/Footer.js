import Link from 'next/link';
import { Mail, MapPin, Package, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-black/10 bg-[#f5f1e8]" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-[0_16px_26px_-18px_rgba(29,19,8,0.85)]">
                <Package className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-[1.04rem] font-semibold tracking-tight">
                OVEX<span className="text-foreground font-semibold">PACK</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Premium-Verpackungen für anspruchsvolle Unternehmen. Bedruckt oder neutral, immer in höchster Qualität.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Produkte</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/produkte"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-products"
                >
                  Alle Produkte
                </Link>
              </li>
              <li>
                <Link href="/produkte/pappbecher" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pappbecher
                </Link>
              </li>
              <li>
                <Link href="/produkte/plastikbecher" className="text-muted-foreground hover:text-foreground transition-colors">
                  Plastikbecher
                </Link>
              </li>
              <li>
                <Link href="/produkte/lebensmittelboxen" className="text-muted-foreground hover:text-foreground transition-colors">
                  Burger- &amp; Foodboxen
                </Link>
              </li>
              <li>
                <Link href="/produkte/papiertragetaschen" className="text-muted-foreground hover:text-foreground transition-colors">
                  Tragtaschen &amp; Tüten
                </Link>
              </li>
              <li>
                <Link href="/produkte/servietten" className="text-muted-foreground hover:text-foreground transition-colors">
                  Servietten
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Unternehmen</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/ueber-uns"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-about"
                >
                  Über uns
                </Link>
              </li>
              <li>
                <Link
                  href="/kontakt"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="link-footer-contact"
                >
                  Kontakt
                </Link>
              </li>
              <li>
                <Link href="/agb" className="text-muted-foreground hover:text-foreground transition-colors">
                  AGB
                </Link>
              </li>
              <li>
                <Link href="/datenschutz" className="text-muted-foreground hover:text-foreground transition-colors">
                  Datenschutz
                </Link>
              </li>
              <li>
                <Link href="/impressum" className="text-muted-foreground hover:text-foreground transition-colors">
                  Impressum
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm">Kontakt</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>OEV Global Commerce</span>
              </li>
              <li>
                <a
                  href="tel:+41782303008"
                  className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  +41 78 230 30 08
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@ovexpack.ch"
                  className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  info@ovexpack.ch
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="my-10 border-t border-black/12" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p data-testid="text-copyright">2026 Ovex Pack. Alle Rechte vorbehalten.</p>
          <div className="flex items-center gap-3">
            <Link href="/agb" className="apple-btn-ghost">
              AGB
            </Link>
            <Link href="/datenschutz" className="apple-btn-ghost">
              Datenschutz
            </Link>
            <Link href="/cookies" className="apple-btn-ghost">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
