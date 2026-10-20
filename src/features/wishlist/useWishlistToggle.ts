import { useCallback } from 'react';
import { App } from 'antd';
import { useAddToWishlistMutation, useRemoveFromWishlistMutation } from '../../services/wishlistApi';
import { isApiError } from '../../services/normalizeError';
import type { Product } from '../../types/api';

export function useWishlistToggle() {
  const [add] = useAddToWishlistMutation();
  const [remove] = useRemoveFromWishlistMutation();
  const { message } = App.useApp();

  const toggle = useCallback(
    async (product: Product, isWishlisted: boolean) => {
      try {
        if (isWishlisted) {
          await remove(product.id).unwrap();
        } else {
          await add({ product }).unwrap();
        }
      } catch (err: unknown) {
        if (isApiError(err) && err.status === 409) {
          return;
        }
        const errorMsg = isApiError(err) ? err.message : 'Failed to update wishlist';
        message.error(errorMsg);
      }
    },
    [add, remove, message],
  );

  return toggle;
}
