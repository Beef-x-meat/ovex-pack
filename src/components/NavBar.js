import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  ChevronDown,
  Coffee,
  CupSoda,
  Flame,
  IceCreamBowl,
  Menu,
  Package,
  PackageOpen,
  Salad,
  ShoppingBag,
  ShoppingCart,
  Square,
  UtensilsCrossed,
  WrapText,
  X
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const navLinks = [
  { href: '/', label: 'Startseite' },
  { href: '/produkte', label: 'Produkte' },
  { href: '/konfigurator', label: '3D Konfigurator' },
  { href: '/ueber-uns', label: 'Ueber uns' },
  { href: '/kontakt', label: 'Kontakt' }
];

const productMenuItems = [
  { label: 'Bestseller', href: '/produkte', icon: Flame },
  { label: 'Pappbecher', href: '/produkte/pappbecher', icon: Coffee },
  { label: 'Plastikbecher', href: '/produkte/plastikbecher', icon: CupSoda },
  { label: 'Eisbecher', href: '/produkte/eisbecher', icon: IceCreamBowl },
  { label: 'Einschlagpapier', href: '/produkte/lebensmittelpapier', icon: WrapText },
  { label: 'Papiertueten', href: '/produkte/papiertragetaschen', icon: ShoppingBag },
  { label: 'Salatschaalen', href: '/produkte/lebensmittelboxen', icon: Salad },
  { label: 'Boxen', href: '/produkte/lebensmittelboxen', icon: PackageOpen },
  { label: 'Servietten', href: '/produkte/zubehoer', icon: Square },
  { label: 'Zubehoer', href: '/produkte/zubehoer', icon: UtensilsCrossed }
];

function isActive(pathname, href) {
  if (href === '/') {
    return pathname === '/';
  }
  return pathname.startsWith(href);
}

export default function NavBar() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadCart() {
      try {
        const response = await fetch('/api/cart');
        const payload = await response.json();
        if (!cancelled && response.ok) {
          setCartItems(payload.items || []);
        }
      } catch {
        if (!cancelled) {
          setCartItems([]);
        }
      }
    }

    loadCart();

    const handleRoute = () => {
      loadCart();
      setMobileOpen(false);
    };
    const handleCartUpdated = () => {
      loadCart();
    };

    router.events.on('routeChangeComplete', handleRoute);
    window.addEventListener('cart-updated', handleCartUpdated);
    return () => {
      cancelled = true;
      router.events.off('routeChangeComplete', handleRoute);
      window.removeEventListener('cart-updated', handleCartUpdated);
    };
  }, [router.events]);

  useEffect(() => {
    if (!mobileOpen) {
      return undefined;
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setMobileOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileOpen]);

  useEffect(() => {
    let lastY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      setIsScrolled(currentY > 14);
      if (currentY > lastY && currentY > 120 && !mobileOpen && !productsOpen) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastY = currentY;
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [mobileOpen, productsOpen]);

  useEffect(() => {
    if (!productsOpen) {
      return undefined;
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setProductsOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [productsOpen]);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0),
    [cartItems]
  );
  const onProductsRoute = router.pathname.startsWith('/produkte');
  const showProductDropdown = productsOpen || onProductsRoute;

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-2xl transition-all duration-300 ${
        isScrolled
          ? 'border-black/12 bg-[#faf8f4]/[0.94] shadow-[0_18px_46px_-34px_rgba(27,18,7,0.38)]'
          : 'border-black/[0.07] bg-[#fdfbf8]/[0.88]'
      } ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}
      data-testid="main-header"
      onMouseLeave={() => {
        if (!onProductsRoute) {
          setProductsOpen(false);
        }
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-[4.1rem] flex items-center justify-between gap-4">
        <Link href="/" data-testid="link-logo" className="flex items-center gap-2.5">
          <span className="w-9 h-9 rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-[0_14px_22px_-16px_rgba(29,19,8,0.85)]">
            <Package className="w-5 h-5 text-primary-foreground" />
          </span>
          <span className="text-[1.03rem] font-semibold tracking-[-0.03em]">
            OVEX<span className="text-foreground font-semibold">PACK</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1.5" data-testid="nav-desktop">
          {navLinks.map((link) => (
            link.href === '/produkte' ? (
              <div key={link.href} className="relative" onMouseEnter={() => setProductsOpen(true)}>
                <button
                  type="button"
                  className={`inline-flex h-9 items-center justify-center rounded-full px-3.5 text-[0.9rem] font-medium transition-all ${
                    isActive(router.pathname, link.href) || productsOpen
                      ? 'bg-primary text-primary-foreground shadow-[0_16px_28px_-20px_rgba(29,19,8,0.8)]'
                      : 'text-muted-foreground hover:text-foreground hover:bg-black/[0.045]'
                  }`}
                  data-testid="link-nav-produkte"
                  aria-expanded={showProductDropdown}
                  onClick={() => setProductsOpen((value) => !value)}
                >
                  Produkte
                  <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showProductDropdown ? 'rotate-180' : ''}`} />
                </button>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex h-9 items-center justify-center rounded-full px-3.5 text-[0.9rem] font-medium transition-all ${
                  isActive(router.pathname, link.href)
                    ? 'bg-primary text-primary-foreground shadow-[0_16px_28px_-20px_rgba(29,19,8,0.8)]'
                    : 'text-muted-foreground hover:text-foreground hover:bg-black/[0.045]'
                }`}
                data-testid={`link-nav-${link.label.toLowerCase()}`}
                aria-current={isActive(router.pathname, link.href) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            )
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/kontakt"
            className="hidden md:inline-flex h-10 items-center justify-center rounded-full border border-black/15 bg-white/94 px-4 text-sm font-medium hover:bg-white"
            data-testid="button-nav-contact"
          >
            Angebot anfragen
          </Link>

          <Link
            href="/warenkorb"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/12 bg-white/92 hover:bg-white"
            data-testid="button-cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span
                className="absolute -top-1 -right-1 min-w-5 h-5 flex items-center justify-center text-xs px-1 rounded-full bg-primary text-primary-foreground"
                data-testid="badge-cart-count"
              >
                {cartCount}
              </span>
            )}
          </Link>

          <button
            type="button"
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/12 bg-white/92 hover:bg-white"
            onClick={() => setMobileOpen(true)}
            aria-label="Navigationsmenue"
            data-testid="button-mobile-menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {showProductDropdown && (
        <div className="hidden md:block border-t border-black/10 bg-[#f0f0ef]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3">
            <div className="products-topdown-rail">
              {productMenuItems.map((item) => (
                <Link
                  key={item.href + item.label}
                  href={item.href}
                  className="products-topdown-item"
                  onClick={() => setProductsOpen(false)}
                  data-testid={`menu-product-${item.label.toLowerCase()}`}
                >
                  <item.icon className="w-9 h-9 mb-2 stroke-[1.6] text-[#5f5f5f]" />
                  <span className="products-topdown-label">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[1px]"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <aside className="fixed right-0 top-0 z-50 h-full w-72 border-l border-black/12 bg-[#fcfaf6] p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <span className="font-semibold">Navigation</span>
              <button
                type="button"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 hover:bg-black/[0.03]"
                onClick={() => setMobileOpen(false)}
                aria-label="Menue schliessen"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <nav className="flex flex-col gap-1" data-testid="nav-mobile">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex h-10 items-center rounded-xl px-3 text-sm font-medium ${
                    isActive(router.pathname, link.href)
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-black/[0.04] text-foreground'
                  }`}
                  onClick={() => setMobileOpen(false)}
                  data-testid={`link-mobile-${link.label.toLowerCase()}`}
                  aria-current={isActive(router.pathname, link.href) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </aside>
        </>
      )}
    </header>
  );
}
