import { useState, useEffect } from 'react';
import { Select, Slider, Button } from 'antd';
import type { FilterOptions } from '../features/products/productFilters';
import type { FiltersState } from '../features/products/filtersSlice';

interface ProductFiltersProps {
  options: FilterOptions;
  filters: FiltersState;
  filteredCount: number;
  totalCount: number;
  onCategoriesChange: (categories: string[]) => void;
  onBrandsChange: (brands: string[]) => void;
  onPriceRangeChange: (priceRange: [number, number]) => void;
  onClearFilters: () => void;
}

export function ProductFilters({
  options,
  filters,
  filteredCount,
  totalCount,
  onCategoriesChange,
  onBrandsChange,
  onPriceRangeChange,
  onClearFilters,
}: ProductFiltersProps) {
  const minPrice = options.priceBounds ? options.priceBounds[0] : 0;
  const maxPrice = options.priceBounds ? options.priceBounds[1] : 1000;

  const [localPrice, setLocalPrice] = useState<[number, number]>(
    filters.priceRange || [minPrice, maxPrice],
  );

  useEffect(() => {
    if (filters.priceRange) {
      setLocalPrice(filters.priceRange);
    } else if (options.priceBounds) {
      setLocalPrice(options.priceBounds);
    }
  }, [filters.priceRange, options.priceBounds]);

  const categoryOptions = options.categories.map((item) => ({
    label: item,
    value: item,
  }));

  const brandOptions = options.brands.map((item) => ({
    label: item,
    value: item,
  }));

  return (
    <div className="bg-white dark:bg-gray-800/90 p-5 sm:p-6 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-xs mb-8">
      <div className="flex flex-col lg:flex-row lg:items-center gap-5">
        <div className="flex-1 min-w-[190px]">
          <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
            Categories
          </label>
          <Select
            mode="multiple"
            placeholder="All Categories"
            value={filters.categories}
            onChange={onCategoriesChange}
            options={categoryOptions}
            className="w-full"
            allowClear
          />
        </div>
        <div className="flex-1 min-w-[190px]">
          <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
            Brands
          </label>
          <Select
            mode="multiple"
            placeholder="All Brands"
            value={filters.brands}
            onChange={onBrandsChange}
            options={brandOptions}
            className="w-full"
            allowClear
          />
        </div>

        <div className="flex-1 min-w-[220px]">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Price Range
            </span>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full">
              ${localPrice[0]} - ${localPrice[1]}
            </span>
          </div>
          <Slider
            range
            min={minPrice}
            max={maxPrice}
            value={localPrice}
            onChange={(val) => setLocalPrice(val as [number, number])}
            onChangeComplete={(val) => onPriceRangeChange(val as [number, number])}
          />
        </div>
        <div className="flex items-center justify-between lg:justify-end gap-3 pt-2 lg:pt-4 border-t lg:border-t-0 border-gray-100 dark:border-gray-700/60">
          <span className="text-xs font-bold text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-700/60 px-3.5 py-2 rounded-full whitespace-nowrap">
            Showing <strong className="text-gray-900 dark:text-white">{filteredCount}</strong> of {totalCount}
          </span>
          <Button onClick={onClearFilters} className="!rounded-full font-semibold">
            Clear filters
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductFilters;
