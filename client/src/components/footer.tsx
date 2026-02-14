import { Link } from "wouter";
import { Package, Mail, Phone, MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="border-t" data-testid="footer">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <Package className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                OVEX<span className="text-primary">PACK</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium-Verpackungen fuer Ihr Unternehmen. Bedruckt oder neutral, immer in hoechster Qualitaet.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Produkte</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/produkte" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-products">Alle Produkte</Link></li>
              <li><Link href="/produkte?cat=pappbecher" className="text-muted-foreground hover:text-foreground transition-colors">Pappbecher</Link></li>
              <li><Link href="/produkte?cat=papiertueten" className="text-muted-foreground hover:text-foreground transition-colors">Papiertueten</Link></li>
              <li><Link href="/produkte?cat=lebensmittelboxen" className="text-muted-foreground hover:text-foreground transition-colors">Lebensmittelboxen</Link></li>
              <li><Link href="/produkte?cat=servietten" className="text-muted-foreground hover:text-foreground transition-colors">Servietten</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Unternehmen</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/ueber-uns" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-about">Ueber uns</Link></li>
              <li><Link href="/kontakt" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-contact">Kontakt</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">AGB</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Datenschutz</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Impressum</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider">Kontakt</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Bahnhofstrasse 42, 8001 Zuerich, Schweiz</span>
              </li>
              <li>
                <a href="tel:+41441234567" className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors">
                  <Phone className="w-4 h-4 shrink-0" />
                  +41 44 123 45 67
                </a>
              </li>
              <li>
                <a href="mailto:info@ovexpack.ch" className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="w-4 h-4 shrink-0" />
                  info@ovexpack.ch
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p data-testid="text-copyright">2026 Ovex Pack. Alle Rechte vorbehalten.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-foreground transition-colors">AGB</a>
            <a href="#" className="hover:text-foreground transition-colors">Datenschutz</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
