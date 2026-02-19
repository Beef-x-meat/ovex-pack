import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import {
  ArrowLeft,
  Minus,
  Palette,
  Plus,
  Recycle,
  Shield,
  ShoppingCart,
  Truck
} from 'lucide-react';
import SeoHead from '@/components/SeoHead';
import { categorySlugMap } from '@/lib/product-categories';

const ProductConfigurator3D = dynamic(() => import('@/components/ProductConfigurator3D'), {
  ssr: false
});

const categoryImageMap = {
  Pappbecher: '/images/paper-cups.jpg',
  Eisbecher: '/images/ice-cream-cups.jpg',
  Plastikbecher: '/images/plastic-cups.jpg',
  Lebensmittelboxen: '/images/food-boxes.jpg',
  Papiertragetaschen: '/images/paper-bags.jpg',
  Lebensmittelpapier: '/images/wrapping-paper.jpg',
  Zubehoer: '/images/napkins.jpg'
};

const defaultSizesByCategory = {
  Pappbecher: ['8oz', '12oz', '16oz'],
  Eisbecher: ['90ml', '150ml', '250ml'],
  Plastikbecher: ['250ml', '400ml', '500ml'],
  Lebensmittelboxen: ['500ml', '750ml', '1000ml'],
  Papiertragetaschen: ['S', 'M', 'L'],
  Lebensmittelpapier: ['30x30cm', '35x35cm'],
  Zubehoer: ['Standard']
};

const categoryTypeMap = {
  Pappbecher: 'cup',
  Eisbecher: 'cup',
  Plastikbecher: 'cup',
  Papiertragetaschen: 'bag',
  Lebensmittelboxen: 'box',
  Lebensmittelpapier: 'box',
  Zubehoer: 'cup'
};

export default function ProductDetailPage({ product }) {
  const [quantity, setQuantity] = useState(product.minOrder || 100);
  const [selectedSize, setSelectedSize] = useState('');
  const [status, setStatus] = useState({ state: 'idle', message: '' });

  const categorySlug = categorySlugMap[product.category] || '';
  const categoryImage = categoryImageMap[product.category] || '/images/food-boxes.jpg';
  const eco = product.materials.some((material) => /eco|bio|fsc|recycel|kompost/i.test(material));
  const priceValue = product.priceHint.replace('ab CHF ', '').replace(' / Stueck', '');
  const sizes = useMemo(() => defaultSizesByCategory[product.category] || ['Standard'], [product.category]);
  const selectedProductType = categoryTypeMap[product.category] || 'cup';

  function incrementQty() {
    setQuantity((value) => value + product.minOrder);
  }

  function decrementQty() {
    setQuantity((value) => Math.max(product.minOrder, value - product.minOrder));
  }

  async function addToCart() {
    setStatus({ state: 'loading', message: '' });
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          quantity,
          size: selectedSize || sizes[0]
        })
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || 'Produkt konnte nicht hinzugefuegt werden.');
      }
      setStatus({
        state: 'success',
        message: `${quantity}x ${product.name} wurde hinzugefuegt.`
      });
      window.dispatchEvent(new Event('cart-updated'));
    } catch (error) {
      setStatus({
        state: 'error',
        message: error.message || 'Produkt konnte nicht hinzugefuegt werden.'
      });
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12" data-testid="page-product-detail">
      <SeoHead title={product.name} description={product.shortDescription} path={`/produkt/${product.slug}`} />

      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap">
        <Link href="/" className="hover:text-foreground transition-colors" data-testid="breadcrumb-home">
          Startseite
        </Link>
        <span>/</span>
        <Link href="/produkte" className="hover:text-foreground transition-colors" data-testid="breadcrumb-products">
          Produkte
        </Link>
        {categorySlug && (
          <>
            <span>/</span>
            <Link href={`/produkte/${categorySlug}`} className="hover:text-foreground transition-colors">
              {product.category}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid lg:grid-cols-[1.02fr,0.98fr] gap-12 lg:gap-14 items-start">
        <div className="space-y-7 lg:sticky lg:top-24">
          <div className="rounded-2xl overflow-hidden apple-card product-card-premium border-black/10 brand-frame">
            <img
              src={categoryImage}
              alt={product.name}
              loading="eager"
              decoding="async"
              className="w-full h-[20rem] sm:h-[24rem] object-cover brand-shot"
              data-testid="img-product"
            />
          </div>

          <ProductConfigurator3D
            productType={selectedProductType}
            productName={product.name}
            productCategory={product.category}
          />
        </div>

        <div className="apple-card product-card-premium rounded-3xl p-6 lg:p-8">
          <span className="apple-kicker mb-4">Produktdetail</span>
          <div className="flex items-start gap-2 mb-3 flex-wrap">
            {eco && (
              <span className="inline-flex items-center rounded-full border border-primary/25 bg-primary/10 px-2.5 py-1 text-xs text-primary">
                <Recycle className="w-3 h-3 mr-1" />
                Umweltfreundlich
              </span>
            )}
            <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs text-muted-foreground bg-white/65">
              {product.category}
            </span>
            <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs text-muted-foreground bg-white/65">
              Lieferzeit {product.leadTime}
            </span>
          </div>

          <h1 className="text-3xl lg:text-[2.7rem] font-semibold tracking-tight mb-4" data-testid="text-product-name">
            {product.name}
          </h1>

          <p className="text-muted-foreground leading-relaxed mb-7 text-lg" data-testid="text-product-description">
            {product.longDescription}
          </p>

          {product.features?.length > 0 && (
            <div className="flex flex-wrap gap-2.5 mb-8">
              {product.features.map((feature) => (
                <span
                  key={feature}
                  className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-xs text-muted-foreground"
                >
                  {feature}
                </span>
              ))}
            </div>
          )}

          <div className="product-price text-[2rem] mb-8" data-testid="text-product-price">
            ab CHF {priceValue}
          </div>

          <div className="my-8 border-t border-black/10" />

          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium mb-2 block">Groesse</label>
              <select
                className="apple-select"
                value={selectedSize || sizes[0]}
                onChange={(event) => setSelectedSize(event.target.value)}
                data-testid="select-size"
              >
                {sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Menge (Min. {product.minOrder} Stueck)</label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="apple-btn-secondary h-10 w-10 p-0"
                  onClick={decrementQty}
                  disabled={quantity <= product.minOrder}
                  data-testid="button-qty-minus"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  className="apple-input w-24 text-center px-2"
                  min={product.minOrder}
                  value={quantity}
                  onChange={(event) =>
                    setQuantity(Math.max(product.minOrder, Number(event.target.value) || product.minOrder))
                  }
                  data-testid="input-quantity"
                />
                <button
                  type="button"
                  className="apple-btn-secondary h-10 w-10 p-0"
                  onClick={incrementQty}
                  data-testid="button-qty-plus"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {product.materials?.length > 0 && (
              <div className="text-sm">
                <span className="text-muted-foreground">Material: </span>
                <span className="font-medium" data-testid="text-material">
                  {product.materials[0]}
                </span>
              </div>
            )}
          </div>

          <button
            type="button"
            className="apple-btn-primary w-full h-11 mt-8 text-base"
            onClick={addToCart}
            disabled={status.state === 'loading'}
            data-testid="button-add-to-cart"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            {status.state === 'loading' ? 'Wird hinzugefuegt...' : 'In den Warenkorb'}
          </button>

          {status.state === 'success' && (
            <p className="mt-3 text-sm text-green-700 bg-green-50 rounded-md px-3 py-2">{status.message}</p>
          )}
          {status.state === 'error' && (
            <p className="mt-3 text-sm text-red-700 bg-red-50 rounded-md px-3 py-2">{status.message}</p>
          )}

          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="text-center p-4 rounded-2xl apple-card product-card-premium">
              <Truck className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Gratis Versand</span>
            </div>
            <div className="text-center p-4 rounded-2xl apple-card product-card-premium">
              <Palette className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Gratis Design</span>
            </div>
            <div className="text-center p-4 rounded-2xl apple-card product-card-premium">
              <Shield className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">Preisgarantie</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10">
        <Link href="/produkte" className="apple-btn-ghost" data-testid="button-back-products">
          <ArrowLeft className="w-4 h-4" />
          Zurueck zu Produkten
        </Link>
      </div>
    </div>
  );
}
