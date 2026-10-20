import { useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Skeleton, App } from 'antd';
import { useAppSelector } from '../app/hooks';
import { selectToken } from '../features/auth/authSlice';
import {
  useGetCartQuery,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
} from '../services/cartApi';
import { calculateCartTotal } from '../features/cart/cartUtils';
import { isApiError } from '../services/normalizeError';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import { CartItemRow } from '../components/CartItemRow';

function CartPage() {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const token = useAppSelector(selectToken);

  const {
    data: cart,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetCartQuery(undefined, {
    skip: !token,
  });

  const [updateCartItem] = useUpdateCartItemMutation();
  const [removeFromCart] = useRemoveFromCartMutation();

  const handleUpdateQuantity = useCallback(
    async (productId: number, quantity: number) => {
      try {
        await updateCartItem({ productId, quantity }).unwrap();
      } catch (err) {
        const errorMsg = isApiError(err) ? err.message : 'Failed to update quantity';
        message.error(errorMsg);
      }
    },
    [updateCartItem, message],
  );

  const handleRemove = useCallback(
    async (productId: number) => {
      try {
        await removeFromCart(productId).unwrap();
        message.success('Item removed from cart');
      } catch (err) {
        const errorMsg = isApiError(err) ? err.message : 'Failed to remove item';
        message.error(errorMsg);
      }
    },
    [removeFromCart, message],
  );

  const total = useMemo(() => {
    return cart?.items ? calculateCartTotal(cart.items) : 0;
  }, [cart]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold tracking-tight mb-6">Shopping Cart</h1>
        <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm">
          <Skeleton active paragraph={{ rows: 3 }} />
        </div>
        <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 shadow-sm">
          <Skeleton active paragraph={{ rows: 3 }} />
        </div>
      </div>
    );
  }

  if (isError) {
    const message = error && isApiError(error) ? error.message : 'Something went wrong';
    return <ErrorState message={message} onRetry={refetch} />;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold tracking-tight mb-6">Shopping Cart</h1>
        <EmptyState
          message="Your cart is empty"
          actionLabel="Go to products"
          onAction={() => navigate('/products')}
        />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Shopping Cart
        </h1>
        <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">
          {cart.items.length} {cart.items.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <CartItemRow
              key={item.id}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemove}
            />
          ))}
        </div>
        <div>
          <div className="rounded-2xl border border-gray-200/80 dark:border-gray-800 bg-white dark:bg-gray-800/90 shadow-sm p-6 sticky top-20">
            <h2 className="font-bold text-lg text-gray-900 dark:text-white mb-4">
              Order Summary
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>Unique items</span>
                <span className="font-semibold text-gray-700 dark:text-gray-200">
                  {cart.items.length}
                </span>
              </div>
              <div className="border-t border-gray-100 dark:border-gray-700/60 pt-3 flex justify-between items-baseline">
                <span className="text-base font-medium text-gray-600 dark:text-gray-300">
                  Total
                </span>
                <span className="text-2xl font-black text-gray-900 dark:text-white">
                  ${total.toLocaleString()}
                </span>
              </div>

              <div className="pt-2">
                <Button
                  type="primary"
                  block
                  size="large"
                  className="rounded-xl font-bold shadow-md shadow-blue-500/20"
                  onClick={() => message.info('Checkout flow can be connected next!')}
                >
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
