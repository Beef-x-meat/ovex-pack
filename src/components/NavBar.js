import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const navItems = [
  { href: '/produkte', label: 'Products' },
  { href: '/#industries', label: 'Industries' },
  { href: '/#design-options', label: 'Design options' },
  { href: '/#about', label: 'About us' },
  { href: '/kontakt', label: 'Contact' }
];

export default function NavBar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href) => {
    if (href.includes('#')) {
      return false;
    }

    if (href === '/') {
      return router.pathname === '/';
    }
    return router.pathname.startsWith(href);
  };

  return (
    <header className="site-header">
      <div className="container nav-inner">
        <Link href="/" className="brand" aria-label="SwissPack Startseite">
          <span className="brand-mark" aria-hidden="true" />
          <span>SwissPack</span>
          <span className="brand-sub">EU Packaging</span>
        </Link>

        <div className="nav-group">
          <nav aria-label="Hauptnavigation">
            <ul className="nav-links">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link href="/kontakt" className="button button-quote" aria-label="Get quote">
            Get quote
          </Link>

          <button
            type="button"
            className="menu-button"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            Menu
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mobile-nav" id="mobile-nav">
          <nav className="container" aria-label="Mobile Navigation">
            <ul>
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
