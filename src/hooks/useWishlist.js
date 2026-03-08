import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'ovexpack_wishlist';

function readStorage() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
}

export function useWishlist() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(readStorage());
  }, []);

  const toggle = useCallback((slug) => {
    setItems((prev) => {
      const next = prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug];
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);

  const isWishlisted = useCallback((slug) => items.includes(slug), [items]);

  return { items, toggle, isWishlisted };
}
