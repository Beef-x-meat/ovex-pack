import Head from 'next/head';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default function SeoHead({ title, description, path = '/', image = '/images/hero-packaging.jpg' }) {
  const pageTitle = title ? `${title} | OVEX PACK` : 'OVEX PACK';
  const canonical = `${baseUrl}${path}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'OVEX PACK',
    url: baseUrl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Bahnhofstrasse 42',
      postalCode: '8001',
      addressLocality: 'Zuerich',
      addressCountry: 'CH'
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'info@ovexpack.ch'
    }
  };

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index,follow" />
      <link rel="canonical" href={canonical} />

      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={`${baseUrl}${image}`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${baseUrl}${image}`} />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </Head>
  );
}
