import type { Product, CartItem } from '../../types/api';

export function getQuantityInCart(items: CartItem[], productId: number): number {
  const item = items.find((i) => i.productId === productId);
  return item ? item.quantity : 0;
}

export function getMaxAddable(product: Product, items: CartItem[]): number {
  const inCart = getQuantityInCart(items, product.id);
  const remaining = product.quantity - inCart;
  return remaining > 0 ? remaining : 0;
}

export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}
