import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

export default function Layout({ children }) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Zum Inhalt springen
      </a>
      <NavBar />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
