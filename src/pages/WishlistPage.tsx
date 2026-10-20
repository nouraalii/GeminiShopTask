import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { App } from 'antd';
import { useAppSelector } from '../app/hooks';
import { selectToken } from '../features/auth/authSlice';
import {
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} from '../services/wishlistApi';
import { isApiError } from '../services/normalizeError';
import { WishlistCard } from '../components/WishlistCard';
import { ProductCardSkeleton } from '../components/ProductCardSkeleton';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';

function WishlistPage() {
  const navigate = useNavigate();
  const { message } = App.useApp();
  const token = useAppSelector(selectToken);

  const {
    data: wishlist,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetWishlistQuery(undefined, {
    skip: !token,
  });

  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const handleRemove = useCallback(
    async (productId: number) => {
      try {
        await removeFromWishlist(productId).unwrap();
        message.success('Removed from wishlist');
      } catch (err: unknown) {
        const errorMsg = isApiError(err) ? err.message : 'Failed to remove item';
        message.error(errorMsg);
      }
    },
    [removeFromWishlist, message],
  );

  if (isLoading) {
    return (
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Wishlist
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Loading your saved items...
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    const errorMsg = error && isApiError(error) ? error.message : 'Something went wrong';
    return <ErrorState message={errorMsg} onRetry={refetch} />;
  }

  if (!wishlist || wishlist.length === 0) {
    return (
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Wishlist
          </h1>
        </div>
        <EmptyState
          message="Your wishlist is empty"
          actionLabel="Browse products"
          onAction={() => navigate('/products')}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Wishlist
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Items you have saved to purchase later.
          </p>
        </div>
        <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
          {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          <WishlistCard key={item.id} item={item} onRemove={handleRemove} />
        ))}
      </div>
    </div>
  );
}

export default WishlistPage;
