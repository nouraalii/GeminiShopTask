import type { Product } from '../../types/api';

export interface FilterOptions {
  categories: string[];
  brands: string[];
  priceBounds: [number, number] | null;
}

export interface FilterCriteria {
  categories: string[];
  brands: string[];
  priceRange: [number, number] | null;
}

export function getFilterOptions(products: Product[]): FilterOptions {
  if (products.length === 0) {
    return {
      categories: [],
      brands: [],
      priceBounds: null,
    };
  }

  const categorySet = new Set<string>();
  const brandSet = new Set<string>();
  let minPrice = products[0].price;
  let maxPrice = products[0].price;

  for (const product of products) {
    if (product.category) categorySet.add(product.category);
    if (product.brand) brandSet.add(product.brand);
    if (product.price < minPrice) minPrice = product.price;
    if (product.price > maxPrice) maxPrice = product.price;
  }

  const categories = Array.from(categorySet).sort((a, b) => a.localeCompare(b));
  const brands = Array.from(brandSet).sort((a, b) => a.localeCompare(b));
  const priceBounds: [number, number] = [Math.floor(minPrice), Math.ceil(maxPrice)];

  return { categories, brands, priceBounds };
}

export function filterProducts(
  products: Product[],
  filters: FilterCriteria,
): Product[] {
  const { categories, brands, priceRange } = filters;

  return products.filter((product) => {
    if (categories.length > 0 && !categories.includes(product.category)) {
      return false;
    }

    if (brands.length > 0 && !brands.includes(product.brand)) {
      return false;
    }

    if (priceRange !== null) {
      const [minPrice, maxPrice] = priceRange;
      if (product.price < minPrice || product.price > maxPrice) {
        return false;
      }
    }

    return true;
  });
}
