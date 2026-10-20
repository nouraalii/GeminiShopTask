import { memo } from 'react';
import { Button, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import type { CartItem } from '../types/api';

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemove: (productId: number) => void;
}

export const CartItemRow = memo(function CartItemRow({
  item,
  onUpdateQuantity,
  onRemove,
}: CartItemRowProps) {
  const lineTotal = item.product.price * item.quantity;
  const isMaxStock = item.quantity >= item.product.quantity;

  const handleDecrease = () => {
    onUpdateQuantity(item.productId, item.quantity - 1);
  };

  const handleIncrease = () => {
    if (!isMaxStock) {
      onUpdateQuantity(item.productId, item.quantity + 1);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-100 dark:border-gray-800 bg-white dark:bg-gray-800/90 shadow-xs p-5 mb-4 transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Product Details */}
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 mb-1.5">
            {item.product.brand} · {item.product.category}
          </span>
          <h3 className="font-bold text-base text-gray-900 dark:text-white line-clamp-1">
            {item.product.name}
          </h3>
          <p className="text-xs font-medium text-slate-400 dark:text-gray-400 mt-1">
            Unit price: <span className="text-slate-900 dark:text-white font-bold">${item.product.price.toLocaleString()}</span>
          </p>
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-5 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-gray-700/60">
          <div className="inline-flex items-center gap-1.5 p-1 bg-slate-50 dark:bg-gray-700/50 rounded-full border border-slate-200/60 dark:border-gray-600/60">
            <Button
              size="small"
              type="text"
              onClick={handleDecrease}
              className="!rounded-full font-bold flex items-center justify-center hover:bg-slate-200/60 dark:hover:bg-gray-600 !w-7 !h-7"
            >
              -
            </Button>
            <span className="font-bold text-sm min-w-[24px] text-center text-gray-900 dark:text-white">
              {item.quantity}
            </span>
            <Button
              size="small"
              type="text"
              disabled={isMaxStock}
              onClick={handleIncrease}
              className="!rounded-full font-bold flex items-center justify-center hover:bg-slate-200/60 dark:hover:bg-gray-600 !w-7 !h-7"
            >
              +
            </Button>
          </div>

          <Popconfirm
            title="Remove item"
            description="Remove this item from your cart?"
            onConfirm={() => onRemove(item.productId)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              danger
              type="text"
              icon={<DeleteOutlined />}
              className="!rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
            />
          </Popconfirm>

          <div className="text-right min-w-[90px]">
            <span className="text-[11px] text-slate-400 block font-medium">Subtotal</span>
            <span className="text-base font-black text-blue-600 dark:text-blue-400">
              ${lineTotal.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CartItemRow;
