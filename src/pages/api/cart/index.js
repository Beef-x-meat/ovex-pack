import { fetchProducts } from '@/lib/cms';
import { addCartItem, listCartItems } from '@/lib/cart-store';

const categoryImageMap = {
  Pappbecher: '/images/pappbecher-eco-paper.jpeg',
  Plastikbecher: '/images/plastikbecher-basic-470ml.png',
  Mehrwegbecher: '/images/plastikbecher-basic-470ml.png',
  Eisbecher: '/images/eisbecher-100ml.png',
  Lebensmittelboxen: '/images/food-boxes.jpg',
  Papiertragetaschen: '/images/paper-bags.jpg',
  Lebensmittelpapier: '/images/lebensmittelpapier-standard.png',
  Schalen: '/images/food-boxes.jpg',
  Servietten: '/images/napkins.jpg',
  Deckel: '/images/pappbecher-deckel-weiss-new.jpeg',
  Zubehoer: '/images/food-boxes.jpg'
};

async function expandCartItems() {
  const products = await fetchProducts();
  const productMap = new Map(products.map((product) => [product.id, product]));

  return listCartItems().map((item) => {
    const product = productMap.get(item.productId) || null;
    return {
      ...item,
      product,
      imageUrl: product ? categoryImageMap[product.category] || '/images/food-boxes.jpg' : '/images/food-boxes.jpg'
    };
  });
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const items = await expandCartItems();
    return res.status(200).json({ ok: true, items });
  }

  if (req.method === 'POST') {
    const { productId, quantity, size } = req.body || {};
    const parsedQuantity = Number(quantity);
    if (!productId || !Number.isFinite(parsedQuantity) || parsedQuantity <= 0) {
      return res.status(400).json({ ok: false, error: 'productId und quantity sind erforderlich.' });
    }

    const products = await fetchProducts();
    const exists = products.some((product) => product.id === productId);
    if (!exists) {
      return res.status(404).json({ ok: false, error: 'Produkt nicht gefunden.' });
    }

    const item = addCartItem({ productId, quantity: parsedQuantity, size: size || null });
    return res.status(201).json({ ok: true, item });
  }

  return res.status(405).json({ ok: false, error: 'Methode nicht erlaubt.' });
}
