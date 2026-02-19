import { removeCartItem, updateCartItem } from '@/lib/cart-store';

export default function handler(req, res) {
  const id = Number(req.query.id);
  if (!id) {
    return res.status(400).json({ ok: false, error: 'Ungueltige ID.' });
  }

  if (req.method === 'PATCH') {
    const { quantity } = req.body || {};
    const parsedQuantity = Number(quantity);
    if (!Number.isFinite(parsedQuantity) || parsedQuantity <= 0) {
      return res.status(400).json({ ok: false, error: 'quantity ist erforderlich.' });
    }

    const item = updateCartItem(id, parsedQuantity);
    if (!item) {
      return res.status(404).json({ ok: false, error: 'Artikel nicht gefunden.' });
    }
    return res.status(200).json({ ok: true, item });
  }

  if (req.method === 'DELETE') {
    const removed = removeCartItem(id);
    if (!removed) {
      return res.status(404).json({ ok: false, error: 'Artikel nicht gefunden.' });
    }
    return res.status(200).json({ ok: true });
  }

  return res.status(405).json({ ok: false, error: 'Methode nicht erlaubt.' });
}
