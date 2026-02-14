import { Link, useLocation } from "wouter";
import { ShoppingCart, Menu, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useQuery } from "@tanstack/react-query";
import type { CartItem } from "@shared/schema";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Startseite" },
  { href: "/produkte", label: "Produkte" },
  { href: "/konfigurator", label: "3D Konfigurator" },
  { href: "/ueber-uns", label: "Ueber uns" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Header() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data: cartItems } = useQuery<CartItem[]>({
    queryKey: ["/api/cart"],
  });

  const cartCount = cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b" data-testid="main-header">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link href="/" data-testid="link-logo">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Package className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              OVEX<span className="text-primary">PACK</span>
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1" data-testid="nav-desktop">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button
                variant="ghost"
                size="sm"
                className={location === link.href ? "text-primary" : "text-muted-foreground"}
                data-testid={`link-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/warenkorb">
            <Button variant="ghost" size="icon" className="relative" data-testid="button-cart">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 min-w-5 h-5 flex items-center justify-center text-xs px-1"
                  data-testid="badge-cart-count"
                >
                  {cartCount}
                </Badge>
              )}
            </Button>
          </Link>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-mobile-menu">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <nav className="flex flex-col gap-1 mt-8" data-testid="nav-mobile">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <Button
                      variant={location === link.href ? "secondary" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setMobileOpen(false)}
                      data-testid={`link-mobile-${link.label.toLowerCase()}`}
                    >
                      {link.label}
                    </Button>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
