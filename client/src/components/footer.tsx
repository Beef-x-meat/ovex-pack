import { Link } from "wouter";
import { Leaf, Mail, Phone, MapPin } from "lucide-react";
import { SiInstagram, SiFacebook, SiLinkedin } from "react-icons/si";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-card border-t" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                lime<span className="text-primary">pack</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ihr Lieferant Nr. 1 fuer individuell bedruckte To-Go-Verpackungen in der Schweiz. Qualitaet, die Ihre Marke verdient.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-instagram">
                <SiInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-facebook">
                <SiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-linkedin">
                <SiLinkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Produkte</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/produkte" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-products">Alle Produkte</Link></li>
              <li><Link href="/produkte?cat=pappbecher" className="text-muted-foreground hover:text-foreground transition-colors">Pappbecher</Link></li>
              <li><Link href="/produkte?cat=papiertüten" className="text-muted-foreground hover:text-foreground transition-colors">Papiertueten</Link></li>
              <li><Link href="/produkte?cat=lebensmittelboxen" className="text-muted-foreground hover:text-foreground transition-colors">Lebensmittelboxen</Link></li>
              <li><Link href="/produkte?cat=servietten" className="text-muted-foreground hover:text-foreground transition-colors">Servietten</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Unternehmen</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/ueber-uns" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-about">Ueber uns</Link></li>
              <li><Link href="/kontakt" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-contact">Kontakt</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">AGB</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Datenschutz</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground transition-colors">Impressum</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Kontakt</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Bahnhofstrasse 42, 8001 Zuerich, Schweiz</span>
              </li>
              <li>
                <a href="tel:+41441234567" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Phone className="w-4 h-4 shrink-0" />
                  +41 44 123 45 67
                </a>
              </li>
              <li>
                <a href="mailto:info@limepack.ch" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="w-4 h-4 shrink-0" />
                  info@limepack.ch
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p data-testid="text-copyright">2025 Limepack. Alle Rechte vorbehalten.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-foreground transition-colors">AGB</a>
            <a href="#" className="hover:text-foreground transition-colors">Datenschutz</a>
            <a href="#" className="hover:text-foreground transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
