let nextCartId = 1;
const cartStore = [];

export function listCartItems() {
  return cartStore.map((item) => ({ ...item }));
}

export function addCartItem({ productId, quantity, size }) {
  const qty = Math.max(1, Number(quantity) || 1);
  const normalizedSize = size || null;

  const existing = cartStore.find((item) => item.productId === productId && item.size === normalizedSize);
  if (existing) {
    existing.quantity += qty;
    return { ...existing };
  }

  const item = {
    id: nextCartId,
    productId,
    quantity: qty,
    size: normalizedSize
  };
  nextCartId += 1;
  cartStore.push(item);
  return { ...item };
}

export function updateCartItem(id, quantity) {
  const item = cartStore.find((entry) => entry.id === id);
  if (!item) {
    return null;
  }
  item.quantity = Math.max(1, Number(quantity) || item.quantity);
  return { ...item };
}

export function removeCartItem(id) {
  const index = cartStore.findIndex((entry) => entry.id === id);
  if (index === -1) {
    return false;
  }
  cartStore.splice(index, 1);
  return true;
}
