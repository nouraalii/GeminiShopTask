import { memo } from 'react';
import { Button } from 'antd';
import { ShoppingCartOutlined, DeleteOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../app/hooks';
import { openAddToCart } from '../features/ui/uiSlice';
import type { WishlistItem } from '../types/api';

interface WishlistCardProps {
  item: WishlistItem;
  onRemove: (productId: number) => void;
}

export const WishlistCard = memo(function WishlistCard({
  item,
  onRemove,
}: WishlistCardProps) {
  const dispatch = useAppDispatch();
  const product = item.product;
  const isOutOfStock = product.quantity === 0;

  const handleMoveToCart = () => {
    dispatch(
      openAddToCart({
        product,
        removeFromWishlistAfterAdd: true,
      }),
    );
  };

  const handleRemove = () => {
    onRemove(item.productId);
  };

  return (
    <div className="group rounded-3xl border border-slate-100 dark:border-gray-800 bg-white dark:bg-gray-800/90 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 flex flex-col justify-between relative">
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100/60 dark:border-blue-900/40">
              {product.category}
            </span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {product.brand}
            </span>
          </div>

          <button
            type="button"
            aria-label="Remove from wishlist"
            onClick={handleRemove}
            className="w-9 h-9 rounded-full bg-slate-50 dark:bg-gray-700/80 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center justify-center hover:scale-110 active:scale-90 transition-all cursor-pointer text-rose-500 hover:text-rose-600 shrink-0"
          >
            <DeleteOutlined className="text-base" />
          </button>
        </div>

        <h3 className="text-lg font-black tracking-tight text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 flex-wrap mb-4">
          {product.color && (
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-slate-300">
              Color: {product.color}
            </span>
          )}

          {isOutOfStock ? (
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400">
              Out of stock
            </span>
          ) : (
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
              In stock: {product.quantity}
            </span>
          )}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 dark:border-gray-800/80 space-y-3">
        <div className="flex items-baseline justify-between">
          <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
            Price
          </span>
          <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
            ${product.price.toLocaleString()}
          </span>
        </div>

        <Button
          type="primary"
          icon={<ShoppingCartOutlined />}
          disabled={isOutOfStock}
          onClick={handleMoveToCart}
          className="!rounded-full !font-bold !h-11 w-full shadow-md shadow-blue-500/20 cursor-pointer"
        >
          Move to cart
        </Button>
      </div>
    </div>
  );
});

export default WishlistCard;
