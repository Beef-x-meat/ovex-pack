import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';

export default function Layout({ children }) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Zum Inhalt springen
      </a>
      <div className="relative min-h-screen flex flex-col">
        <NavBar />
        <main id="main-content" className="relative z-10 flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
