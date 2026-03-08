import { useCallback, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'ovexpack_cart';

function readStorage() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

function writeStorage(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

export function useCart() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(readStorage());
    function onUpdate() {
      setItems(readStorage());
    }
    window.addEventListener('cart-updated', onUpdate);
    return () => window.removeEventListener('cart-updated', onUpdate);
  }, []);

  const addItem = useCallback(({ productId, quantity, size }) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId && i.size === (size || null));
      let next;
      if (existing) {
        next = prev.map((i) =>
          i === existing ? { ...i, quantity: i.quantity + quantity } : i
        );
      } else {
        next = [...prev, { id: Date.now(), productId, quantity, size: size || null }];
      }
      writeStorage(next);
      return next;
    });
    window.dispatchEvent(new Event('cart-updated'));
  }, []);

  const updateItem = useCallback((id, quantity) => {
    setItems((prev) => {
      const next = prev.map((i) => (i.id === id ? { ...i, quantity } : i));
      writeStorage(next);
      return next;
    });
    window.dispatchEvent(new Event('cart-updated'));
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => {
      const next = prev.filter((i) => i.id !== id);
      writeStorage(next);
      return next;
    });
    window.dispatchEvent(new Event('cart-updated'));
  }, []);

  const clearCart = useCallback(() => {
    writeStorage([]);
    setItems([]);
    window.dispatchEvent(new Event('cart-updated'));
  }, []);

  const cartCount = useMemo(
    () => items.reduce((sum, i) => sum + i.quantity, 0),
    [items]
  );

  return { items, addItem, updateItem, removeItem, clearCart, cartCount };
}
