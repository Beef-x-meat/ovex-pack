import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand-block">
          <strong className="footer-brand">SwissPack</strong>
          <p className="small">Custom printed packaging with a clear process and fast response times.</p>
          <p className="small">Europaallee 12, 8004 Zurich, Switzerland</p>
          <p className="small">hello@swisspack-studio.ch</p>
          <p className="small">+41 44 600 20 10</p>
        </div>

        <div className="footer-columns">
          <ul className="footer-links" aria-label="Products">
            <li>
              <strong>Products</strong>
            </li>
            <li>
              <Link href="/produkte">Paper cups</Link>
            </li>
            <li>
              <Link href="/produkte">Food boxes</Link>
            </li>
            <li>
              <Link href="/produkte">Paper bags</Link>
            </li>
            <li>
              <Link href="/produkte">Wrapping paper</Link>
            </li>
          </ul>

          <ul className="footer-links" aria-label="Company">
            <li>
              <strong>Company</strong>
            </li>
            <li>
              <a href="/#about">About us</a>
            </li>
            <li>
              <a href="/#industries">Industries</a>
            </li>
            <li>
              <Link href="/kontakt">Contact</Link>
            </li>
          </ul>

          <ul className="footer-links" aria-label="Legal and social">
            <li>
              <strong>Legal & Social</strong>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms and Conditions</a>
            </li>
            <li>
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <p className="small">(c) {year} SwissPack. All rights reserved.</p>
      </div>
    </footer>
  );
}
