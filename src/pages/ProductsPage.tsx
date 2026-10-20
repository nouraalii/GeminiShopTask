import { useMemo, useCallback } from 'react';
import { useGetProductsQuery } from '../services/productsApi';
import { useGetWishlistQuery } from '../services/wishlistApi';
import { isApiError } from '../services/normalizeError';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectToken } from '../features/auth/authSlice';
import {
  setCategories,
  setBrands,
  setPriceRange,
  clearFilters,
} from '../features/products/filtersSlice';
import { openAddToCart } from '../features/ui/uiSlice';
import { useProductFilters } from '../features/products/useProductFilters';
import { useWishlistToggle } from '../features/wishlist/useWishlistToggle';
import { ProductCard } from '../components/ProductCard';
import { ProductCardSkeleton } from '../components/ProductCardSkeleton';
import { ProductFilters } from '../components/ProductFilters';
import { EmptyState } from '../components/EmptyState';
import { ErrorState } from '../components/ErrorState';
import type { Product } from '../types/api';

function ProductsPage() {
  const dispatch = useAppDispatch();
  const token = useAppSelector(selectToken);

  const { data: products, isLoading, isError, error, refetch } = useGetProductsQuery();
  const { data: wishlist } = useGetWishlistQuery(undefined, { skip: !token });
  const toggleWishlist = useWishlistToggle();

  const wishlistIds = useMemo(
    () => new Set(wishlist?.map((item) => item.productId)),
    [wishlist],
  );

  const handleAddToCart = useCallback(
    (product: Product) => {
      dispatch(openAddToCart({ product }));
    },
    [dispatch],
  );

  const { filters, options, filteredProducts } = useProductFilters(products || []);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="w-full h-64 sm:h-80 bg-blue-50 dark:bg-slate-900/60 rounded-3xl animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    const message = error && isApiError(error) ? error.message : 'Something went wrong';
    return <ErrorState message={message} onRetry={refetch} />;
  }

  if (!products || products.length === 0) {
    return (
      <div>
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-blue-950 dark:text-white">
            Products
          </h1>
        </div>
        <EmptyState message="No products available" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Static Hero Banner in Cohesive Blue Theme */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-50/90 via-sky-50/60 to-indigo-50/80 dark:from-slate-900 dark:via-blue-950/40 dark:to-slate-900 border border-blue-100 dark:border-blue-900/40 shadow-xs flex flex-col md:flex-row items-center justify-between min-h-[300px] md:min-h-[360px]">
        {/* Left Content */}
        <div className="p-8 sm:p-12 md:max-w-xl z-10 flex flex-col items-start justify-center">
          <span className="text-xs uppercase tracking-widest font-black text-blue-600 dark:text-blue-400 bg-blue-100/70 dark:bg-blue-950/70 px-3.5 py-1 rounded-full mb-4">
            Exclusive Limited Offer
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-blue-950 dark:text-white leading-[1.15] mb-4">
            Grab Upto 50% Off On Selected Products
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 font-medium mb-6 max-w-md">
            Discover cutting-edge audio, smartphones, and notebooks designed for seamless work and entertainment.
          </p>
          <a
            href="#products-section"
            className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-bold text-sm sm:text-base px-8 py-3.5 rounded-full shadow-md shadow-blue-500/25 hover:shadow-lg transition-all duration-200"
          >
            Buy Now
          </a>
        </div>

        {/* Right Image Banner */}
        <div className="relative w-full md:w-1/2 h-64 md:h-[360px] flex items-center justify-center md:justify-end overflow-hidden">
          <img
            src="/images/hero-banner.jpg"
            alt="Grab Upto 50% Off On Selected Headphone"
            className="w-full h-full object-cover object-top md:object-right transition-transform duration-500 hover:scale-105"
          />
        </div>
      </section>

      {/* Products & Filters Section */}
      <div id="products-section" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-blue-950 dark:text-white">
              Headphones & Tech For You!
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              Showing top verified items matching your lifestyle
            </p>
          </div>
        </div>

        <ProductFilters
          options={options}
          filters={filters}
          filteredCount={filteredProducts.length}
          totalCount={products.length}
          onCategoriesChange={(categories) => dispatch(setCategories(categories))}
          onBrandsChange={(brands) => dispatch(setBrands(brands))}
          onPriceRangeChange={(range) => dispatch(setPriceRange(range))}
          onClearFilters={() => dispatch(clearFilters())}
        />

        {filteredProducts.length === 0 ? (
          <EmptyState
            message="No products match your filters"
            actionLabel="Clear filters"
            onAction={() => dispatch(clearFilters())}
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlistIds.has(product.id)}
                onAddToCart={handleAddToCart}
                onToggleWishlist={toggleWishlist}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductsPage;
