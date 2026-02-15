import { localProducts, getLocalProductBySlug } from '@/lib/products';

const provider = process.env.NEXT_PUBLIC_CMS_PROVIDER || 'local';

function normalizeProduct(item, index = 0) {
  return {
    id: item.id || `product-${index}`,
    slug: item.slug || `product-${index}`,
    name: item.name || 'Produkt',
    category: item.category || 'Allgemein',
    shortDescription: item.shortDescription || 'Keine Beschreibung vorhanden.',
    longDescription: item.longDescription || item.shortDescription || 'Keine Beschreibung vorhanden.',
    leadTime: item.leadTime || 'Auf Anfrage',
    minOrder: Number(item.minOrder) || 0,
    priceHint: item.priceHint || 'Preis auf Anfrage',
    materials: Array.isArray(item.materials) ? item.materials : [],
    features: Array.isArray(item.features) ? item.features : [],
    modelUrl: item.modelUrl || ''
  };
}

async function fetchContentfulProducts() {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

  if (!spaceId || !accessToken) {
    return localProducts;
  }

  const url = `https://cdn.contentful.com/spaces/${spaceId}/environments/master/entries?content_type=productPackaging&include=0`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error(`Contentful-Fehler: ${response.status}`);
  }

  const payload = await response.json();
  const items = (payload.items || []).map((entry) => {
    const fields = entry.fields || {};
    return {
      id: entry.sys?.id,
      slug: fields.slug,
      name: fields.name,
      category: fields.category,
      shortDescription: fields.shortDescription,
      longDescription: fields.longDescription,
      leadTime: fields.leadTime,
      minOrder: fields.minOrder,
      priceHint: fields.priceHint,
      materials: fields.materials,
      features: fields.features,
      modelUrl: fields.modelUrl
    };
  });

  return items.length ? items.map(normalizeProduct) : localProducts;
}

async function fetchStrapiProducts() {
  const strapiUrl = process.env.STRAPI_URL;
  const token = process.env.STRAPI_API_TOKEN;

  if (!strapiUrl) {
    return localProducts;
  }

  const response = await fetch(`${strapiUrl}/api/products`, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined
  });

  if (!response.ok) {
    throw new Error(`Strapi-Fehler: ${response.status}`);
  }

  const payload = await response.json();
  const items = (payload.data || []).map((entry) => {
    const fields = entry.attributes || entry;
    return {
      id: entry.id,
      slug: fields.slug,
      name: fields.name,
      category: fields.category,
      shortDescription: fields.shortDescription,
      longDescription: fields.longDescription,
      leadTime: fields.leadTime,
      minOrder: fields.minOrder,
      priceHint: fields.priceHint,
      materials: fields.materials,
      features: fields.features,
      modelUrl: fields.modelUrl
    };
  });

  return items.length ? items.map(normalizeProduct) : localProducts;
}

export async function fetchProducts() {
  try {
    if (provider === 'contentful') {
      return await fetchContentfulProducts();
    }
    if (provider === 'strapi') {
      return await fetchStrapiProducts();
    }
    return localProducts.map(normalizeProduct);
  } catch (error) {
    console.warn('CMS-Ladevorgang fehlgeschlagen. Fallback auf lokale Daten.', error.message);
    return localProducts.map(normalizeProduct);
  }
}

export async function fetchProductBySlug(slug) {
  if (provider === 'local') {
    return getLocalProductBySlug(slug);
  }

  const products = await fetchProducts();
  return products.find((item) => item.slug === slug) || null;
}
