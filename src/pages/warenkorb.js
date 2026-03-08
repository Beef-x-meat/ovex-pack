import Link from 'next/link';
import { useMemo } from 'react';
import { ArrowLeft, ArrowRight, Minus, Package, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import { useCart } from '@/hooks/useCart';
import { localProducts } from '@/lib/products';
import { getProductImage } from '@/lib/product-images';

const productMap = new Map(localProducts.map((p) => [p.id, p]));

export default function CartPage() {
  const { items, updateItem, removeItem, cartCount } = useCart();

  const expandedItems = useMemo(() =>
    items.map((item) => {
      const product = productMap.get(item.productId) || null;
      return {
        ...item,
        product,
        imageUrl: product ? (getProductImage(product) || '/images/food-boxes.jpg') : '/images/food-boxes.jpg'
      };
    }),
    [items]
  );

  const total = useMemo(() => {
    return expandedItems.reduce((sum, item) => {
      const price = Number(item.product?.priceHint?.replace('ab CHF ', '').replace(' / Stück', '') || 0);
      return sum + price * item.quantity;
    }, 0);
  }, [expandedItems]);

  if (!expandedItems.length) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center fade-up" data-testid="page-cart-empty">
        <SeoHead title="Warenkorb" description="Ihr Warenkorb bei Ovex Pack" path="/warenkorb" />
        <div className="w-24 h-24 bg-muted/40 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-black/5">
          <ShoppingCart className="w-12 h-12 text-muted-foreground/40" />
        </div>
        <h2 className="text-2xl font-bold mb-3" data-testid="text-cart-empty">
          Ihr Warenkorb ist leer
        </h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Entdecken Sie unsere individuell bedruckten Verpackungen und füllen Sie Ihren Warenkorb.
        </p>
        <Link href="/produkte" className="apple-btn-primary text-base px-8" data-testid="button-shop-now">
          <Package className="w-5 h-5 mr-2" />
          Jetzt Produkte entdecken
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8" data-testid="page-cart">
      <SeoHead title="Warenkorb" description="Ihr Warenkorb bei Ovex Pack" path="/warenkorb" />

      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <h1 className="text-2xl font-bold" data-testid="text-cart-title">
          Warenkorb ({cartCount.toLocaleString()} St.)
        </h1>
        <Link href="/produkte" className="apple-btn-secondary text-sm py-2.5 px-4" data-testid="button-continue-shopping">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Weiter einkaufen
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {expandedItems.map((item) => {
            const price = Number(item.product?.priceHint?.replace('ab CHF ', '').replace(' / Stück', '') || 0);
            const minOrder = item.product?.minOrder || 100;
            return (
              <article key={item.id} className="p-4 rounded-2xl apple-card" data-testid={`card-cart-item-${item.id}`}>
                <div className="flex gap-4">
                  <div className="w-24 h-24 rounded-md overflow-hidden bg-muted/30 shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.product?.name || ''}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link href={`/produkt/${item.product?.slug || ''}`}>
                          <h3 className="font-semibold hover:text-primary transition-colors line-clamp-1">
                            {item.product?.name}
                          </h3>
                        </Link>
                        {item.size && <p className="text-sm text-muted-foreground">Größe: {item.size}</p>}
                      </div>
                      <button
                        type="button"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/60 hover:bg-white"
                        onClick={() => removeItem(item.id)}
                        data-testid={`button-remove-${item.id}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-3 gap-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          className="apple-btn-secondary h-8 w-8 p-0"
                          onClick={() => updateItem(item.id, Math.max(minOrder, item.quantity - minOrder))}
                          disabled={item.quantity <= minOrder}
                          data-testid={`button-cart-minus-${item.id}`}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-medium w-20 text-center" data-testid={`text-qty-${item.id}`}>
                          {item.quantity.toLocaleString()} St.
                        </span>
                        <button
                          type="button"
                          className="apple-btn-secondary h-8 w-8 p-0"
                          onClick={() => updateItem(item.id, item.quantity + minOrder)}
                          data-testid={`button-cart-plus-${item.id}`}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-semibold text-primary" data-testid={`text-item-total-${item.id}`}>
                        CHF {(price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div>
          <article className="p-6 rounded-2xl apple-card sticky top-24" data-testid="card-order-summary">
            <h3 className="font-semibold mb-4">Bestelluebersicht</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground">Zwischensumme</span>
                <span>CHF {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between gap-2">
                <span className="text-muted-foreground">Versand</span>
                <span className="text-primary font-medium">Kostenlos</span>
              </div>
            </div>
            <div className="my-4 border-t" />
            <div className="flex justify-between gap-2 font-semibold">
              <span>Gesamt (Richtwert)</span>
              <span className="text-primary" data-testid="text-cart-total">CHF {total.toFixed(2)}</span>
            </div>
            <Link href="/checkout" className="w-full mt-6 h-11 apple-btn-primary flex items-center justify-center" data-testid="button-checkout">
              Zur Kasse
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <p className="text-xs text-muted-foreground text-center mt-3">
              Der finale Preis wird nach Prüfung der Anforderungen bestätigt.
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}
