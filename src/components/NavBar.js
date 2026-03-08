import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Boxes,
  ChevronDown,
  Coffee,
  CupSoda,
  IceCreamBowl,
  Menu,
  Package,
  PackageOpen,
  ShoppingBag,
  ShoppingCart,
  Square,
  WrapText,
  X
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useCart } from '@/hooks/useCart';

const navLinks = [
  { href: '/', label: 'Startseite' },
  { href: '/produkte', label: 'Produkte' },
  { href: '/ueber-uns', label: 'Über uns' },
  { href: '/kontakt', label: 'Kontakt' }
];

const productMenuItems = [
  { label: 'Alle Produkte', href: '/produkte', icon: Boxes },
  { label: 'Pappbecher', href: '/produkte/pappbecher', icon: Coffee },
  { label: 'Plastikbecher', href: '/produkte/plastikbecher', icon: CupSoda },
  { label: 'Eisbecher', href: '/produkte/eisbecher', icon: IceCreamBowl },
  { label: 'Burger- & Foodboxen', href: '/produkte/lebensmittelboxen', icon: PackageOpen },
  { label: 'Tragtaschen & Tüten', href: '/produkte/papiertragetaschen', icon: ShoppingBag },
  { label: 'Servietten & Feuchttücher', href: '/produkte/servietten', icon: Square },
  { label: 'Verpackungspapier', href: '/produkte/lebensmittelpapier', icon: WrapText },
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [productsPinned, setProductsPinned] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const handleRoute = (url) => {
      setMobileOpen(false);
      const path = typeof url === 'string' ? url.split('?')[0] : router.pathname;
      const inProductsContext = path.startsWith('/produkte') || path.startsWith('/produkt');
      setProductsPinned(inProductsContext);
      setProductsOpen(inProductsContext);
    };

    router.events.on('routeChangeComplete', handleRoute);
    return () => {
      router.events.off('routeChangeComplete', handleRoute);
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

  const onProductsRoute = router.pathname.startsWith('/produkte') || router.pathname.startsWith('/produkt');
  const showProductDropdown = productsOpen || onProductsRoute || productsPinned;

  function handleProductsClick() {
    if (!onProductsRoute) {
      setProductsPinned(true);
      setProductsOpen(true);
      router.push('/produkte');
      return;
    }

    if (productsPinned) {
      setProductsPinned(false);
      setProductsOpen(false);
      return;
    }

    setProductsPinned(true);
    setProductsOpen(true);
  }

  return (
    <>
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-2xl transition-all duration-300 ${isScrolled
          ? 'border-black/12 bg-[#faf8f4]/[0.94] shadow-[0_18px_46px_-34px_rgba(27,18,7,0.38)]'
          : 'border-black/[0.07] bg-[#fdfbf8]/[0.88]'
        } ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}
      data-testid="main-header"
      onMouseLeave={() => {
        if (!onProductsRoute && !productsPinned) {
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
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => {
                  setProductsOpen(true);
                }}
              >
                <button
                  type="button"
                  className={`inline-flex h-9 items-center justify-center rounded-full px-3.5 text-[0.9rem] font-medium transition-all ${isActive(router.pathname, link.href) || showProductDropdown
                      ? 'bg-primary text-primary-foreground shadow-[0_16px_28px_-20px_rgba(29,19,8,0.8)]'
                      : 'text-muted-foreground hover:text-foreground hover:bg-black/[0.045]'
                    }`}
                  data-testid="link-nav-produkte"
                  aria-expanded={showProductDropdown}
                  onClick={handleProductsClick}
                >
                  Produkte
                  <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${showProductDropdown ? 'rotate-180' : ''}`} />
                </button>
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex h-9 items-center justify-center rounded-full px-3.5 text-[0.9rem] font-medium transition-all ${isActive(router.pathname, link.href)
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
                  onClick={() => {
                    setProductsPinned(true);
                    setProductsOpen(true);
                  }}
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
    </header>

    {mobileOpen && (
      <>
        <div
          className="fixed inset-0 z-[998] bg-black/40 backdrop-blur-[2px] mobile-overlay-enter"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
        <aside className="fixed right-0 top-0 z-[999] h-full w-80 border-l border-black/12 bg-[#fcfaf6] shadow-2xl mobile-menu-enter overflow-y-auto">
          <div className="flex items-center justify-between p-6 pb-4 sticky top-0 bg-[#fcfaf6]/95 backdrop-blur-md z-10 border-b border-black/5">
            <span className="font-semibold">Navigation</span>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 hover:bg-black/[0.03] transition-colors"
              onClick={() => setMobileOpen(false)}
              aria-label="Menü schließen"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <nav className="flex flex-col gap-0.5 px-4 pt-4 pb-2" data-testid="nav-mobile">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`inline-flex h-11 items-center rounded-xl px-3.5 text-[0.92rem] font-medium transition-all ${isActive(router.pathname, link.href)
                    ? 'bg-primary text-primary-foreground shadow-sm'
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

          <div className="px-4 pb-6">
            <div className="border-t border-black/8 pt-4 mt-2">
              <p className="text-xs font-semibold tracking-wider uppercase text-muted-foreground mb-3 px-3.5">Kategorien</p>
              <nav className="grid grid-cols-2 gap-1.5">
                {productMenuItems.map((item) => (
                  <Link
                    key={item.href + item.label}
                    href={item.href}
                    className="flex flex-col items-center gap-1.5 rounded-xl border border-black/6 bg-white/60 p-3 text-center transition-all hover:bg-white hover:border-black/12 hover:shadow-sm active:scale-[0.97]"
                    onClick={() => setMobileOpen(false)}
                    data-testid={`link-mobile-cat-${item.label.toLowerCase()}`}
                  >
                    <item.icon className="w-6 h-6 stroke-[1.5] text-[#5f5f5f]" />
                    <span className="text-[0.72rem] font-semibold leading-tight text-[#595959]">{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </aside>
      </>
    )}
    </>
  );
}

