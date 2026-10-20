import { useState, useEffect } from 'react';
import { Modal, InputNumber, Button, Alert, App } from 'antd';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  selectSelectedProduct,
  selectRemoveFromWishlistAfterAdd,
  closeAddToCart,
} from '../features/ui/uiSlice';
import { selectToken } from '../features/auth/authSlice';
import { useGetCartQuery, useAddToCartMutation } from '../services/cartApi';
import { useRemoveFromWishlistMutation } from '../services/wishlistApi';
import { getMaxAddable } from '../features/cart/cartUtils';
import { isApiError } from '../services/normalizeError';

export function AddToCartModal() {
  const dispatch = useAppDispatch();
  const { message } = App.useApp();

  const selectedProduct = useAppSelector(selectSelectedProduct);
  const removeFromWishlistAfterAdd = useAppSelector(selectRemoveFromWishlistAfterAdd);
  const token = useAppSelector(selectToken);

  const { data: cart } = useGetCartQuery(undefined, { skip: !token });
  const cartItems = cart?.items ?? [];

  const [addToCart, { isLoading, error, reset }] = useAddToCartMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const maxAddable = selectedProduct ? getMaxAddable(selectedProduct, cartItems) : 0;
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (selectedProduct) {
      setQuantity(1);
      reset();
    }
  }, [selectedProduct, reset]);

  if (!selectedProduct) {
    return null;
  }

  const handleClose = () => {
    reset();
    dispatch(closeAddToCart());
  };

  const handleQuantityChange = (val: number | null) => {
    reset();
    setQuantity(val || 1);
  };

  const handleConfirm = async () => {
    try {
      await addToCart({ product: selectedProduct, quantity }).unwrap();
      dispatch(closeAddToCart());
      message.success('Added to cart');

      if (removeFromWishlistAfterAdd) {
        try {
          await removeFromWishlist(selectedProduct.id).unwrap();
        } catch {
          message.info('Added to cart, but item could not be removed from wishlist');
        }
      }
    } catch {
      // Error is caught, stays in mutation error state and displayed in Alert
    }
  };

  const liveTotal = selectedProduct.price * quantity;

  return (
    <Modal
      title={
        <div className="flex items-center gap-2 pt-1">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-400" />
          <span className="font-extrabold text-base text-blue-950 dark:text-white">Add to Cart</span>
        </div>
      }
      open={selectedProduct !== null}
      onCancel={handleClose}
      footer={[
        <Button key="cancel" onClick={handleClose} className="!rounded-full font-semibold">
          Cancel
        </Button>,
        <Button
          key="confirm"
          type="primary"
          loading={isLoading}
          disabled={maxAddable === 0}
          onClick={handleConfirm}
          className="!rounded-full !font-bold"
        >
          Confirm
        </Button>,
      ]}
    >
      <div className="py-3 space-y-4">
        {/* Product preview card */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-gray-800/60 border border-slate-100 dark:border-gray-700/60">
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
            {selectedProduct.brand} · {selectedProduct.category}
          </span>
          <h3 className="font-bold text-base text-gray-900 dark:text-white mb-1">
            {selectedProduct.name}
          </h3>
          <p className="text-sm font-extrabold text-gray-800 dark:text-gray-200">
            Unit Price: ${selectedProduct.price.toLocaleString()}
          </p>
        </div>

        {error && isApiError(error) && (
          <Alert
            type="error"
            title={error.message}
            description={
              error.available !== undefined ? `Available: ${error.available}` : undefined
            }
            showIcon
            className="rounded-xl"
          />
        )}

        {maxAddable === 0 ? (
          <div className="p-3 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200/60 dark:border-red-900/40 text-sm font-medium text-red-600 dark:text-red-400">
            All available stock is already in your cart.
          </div>
        ) : (
          <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-50/60 dark:bg-gray-800/40 border border-gray-200/40 dark:border-gray-700/40">
            <div>
              <span className="text-sm font-bold text-gray-800 dark:text-gray-200 block">
                Quantity
              </span>
              <span className="text-xs text-gray-400">
                Max available: {maxAddable}
              </span>
            </div>
            <InputNumber
              min={1}
              max={maxAddable}
              value={quantity}
              onChange={handleQuantityChange}
              size="large"
              className="rounded-xl"
            />
          </div>
        )}

        {/* Live Total Box */}
        <div className="p-4 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 flex justify-between items-center">
          <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
            Total Price
          </span>
          <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
            ${liveTotal.toLocaleString()}
          </span>
        </div>
      </div>
    </Modal>
  );
}

export default AddToCartModal;
