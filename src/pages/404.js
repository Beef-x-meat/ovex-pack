import Link from 'next/link';
import SeoHead from '@/components/SeoHead';

export default function NotFoundPage() {
  return (
    <>
      <SeoHead title="Seite nicht gefunden" description="Die gesuchte Seite konnte nicht gefunden werden." path="/404" />
      <section className="section">
        <div className="container panel" style={{ textAlign: 'center' }}>
          <h1 className="section-title">404</h1>
          <p className="section-copy">Die Seite existiert nicht oder wurde verschoben.</p>
          <Link href="/" className="button">
            Zur Startseite
          </Link>
        </div>
      </section>
    </>
  );
}
