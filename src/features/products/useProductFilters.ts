import { useMemo, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { selectFilters, setPriceRange } from './filtersSlice';
import { getFilterOptions, filterProducts } from './productFilters';
import type { Product } from '../../types/api';

export function useProductFilters(products: Product[]) {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);

  const options = useMemo(() => getFilterOptions(products), [products]);

  const filteredProducts = useMemo(
    () => filterProducts(products, filters),
    [products, filters],
  );

  useEffect(() => {
    if (filters.priceRange === null && options.priceBounds !== null) {
      dispatch(setPriceRange(options.priceBounds));
    }
  }, [filters.priceRange, options.priceBounds, dispatch]);

  return { filters, options, filteredProducts };
}
