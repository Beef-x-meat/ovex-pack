import Link from 'next/link';
import SeoHead from '@/components/SeoHead';

export default function NotFoundPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 lg:px-8 py-24 text-center">
      <SeoHead title="Seite nicht gefunden" description="Die gesuchte Seite konnte nicht gefunden werden." path="/404" />
      <p className="text-sm font-medium tracking-widest uppercase text-muted-foreground mb-6">404</p>
      <h1 className="text-3xl lg:text-5xl font-bold tracking-tight mb-5">Seite nicht gefunden</h1>
      <p className="text-muted-foreground mb-8">Die Seite existiert nicht oder wurde verschoben.</p>
      <Link href="/" className="apple-btn-primary">
        Zur Startseite
      </Link>
    </div>
  );
}
