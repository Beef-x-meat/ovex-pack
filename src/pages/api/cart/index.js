import { localProducts } from '@/lib/products';
import { getProductImage } from '@/lib/product-images';
import { addCartItem, listCartItems } from '@/lib/cart-store';

const productMap = new Map(localProducts.map((p) => [p.id, p]));

function expandCartItems() {
  return listCartItems().map((item) => {
    const product = productMap.get(item.productId) || null;
    return {
      ...item,
      product,
      imageUrl: product ? getProductImage(product) || '/images/food-boxes.jpg' : '/images/food-boxes.jpg'
    };
  });
}

export default function handler(req, res) {
  if (req.method === 'GET') {
    const items = expandCartItems();
    return res.status(200).json({ ok: true, items });
  }

  if (req.method === 'POST') {
    const { productId, quantity, size } = req.body || {};
    const parsedQuantity = Number(quantity);
    if (!productId || !Number.isFinite(parsedQuantity) || parsedQuantity <= 0) {
      return res.status(400).json({ ok: false, error: 'productId und quantity sind erforderlich.' });
    }

    const exists = productMap.has(productId);
    if (!exists) {
      return res.status(404).json({ ok: false, error: 'Produkt nicht gefunden.' });
    }

    const item = addCartItem({ productId, quantity: parsedQuantity, size: size || null });
    return res.status(201).json({ ok: true, item });
  }

  return res.status(405).json({ ok: false, error: 'Methode nicht erlaubt.' });
}
