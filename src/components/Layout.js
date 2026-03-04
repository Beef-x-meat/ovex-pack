import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ArrowUp } from 'lucide-react';
import Footer from '@/components/Footer';
import NavBar from '@/components/NavBar';

function ScrollToTop() {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => router.events.off('routeChangeComplete', handleRouteChange);
  }, [router.events]);

  return null;
}

function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="back-to-top-btn"
      aria-label="Zurück nach oben"
      data-testid="button-back-to-top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}

function PageTransition({ children }) {
  const router = useRouter();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState('enter');

  useEffect(() => {
    const handleStart = () => setTransitionStage('exit');
    const handleComplete = () => {
      setTransitionStage('enter');
    };

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router.events]);

  useEffect(() => {
    if (transitionStage === 'enter') {
      setDisplayChildren(children);
    }
  }, [children, transitionStage]);

  return (
    <div className={`page-transition page-transition-${transitionStage}`}>
      {displayChildren}
    </div>
  );
}

export default function Layout({ children }) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Zum Inhalt springen
      </a>
      <ScrollToTop />
      <div className="relative min-h-screen flex flex-col">
        <NavBar />
        <main id="main-content" className="relative z-10 flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </div>
      <BackToTopButton />
    </>
  );
}
