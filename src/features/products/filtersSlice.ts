import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

export interface FiltersState {
  categories: string[];
  brands: string[];
  priceRange: [number, number] | null;
}

const initialState: FiltersState = {
  categories: [],
  brands: [],
  priceRange: null,
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<string[]>) {
      state.categories = action.payload;
    },
    setBrands(state, action: PayloadAction<string[]>) {
      state.brands = action.payload;
    },
    setPriceRange(state, action: PayloadAction<[number, number]>) {
      state.priceRange = action.payload;
    },
    clearFilters(state) {
      state.categories = [];
      state.brands = [];
      state.priceRange = null;
    },
  },
});

export const { setCategories, setBrands, setPriceRange, clearFilters } = filtersSlice.actions;

export default filtersSlice.reducer;

export const selectFilters = (state: RootState) => state.filters;
