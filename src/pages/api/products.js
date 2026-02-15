import { fetchProducts } from '@/lib/cms';

export default async function handler(_req, res) {
  const products = await fetchProducts();
  return res.status(200).json({ ok: true, products });
}
