import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types/api';
import type { RootState } from '../../app/store';

export interface UiState {
  selectedProduct: Product | null;
  removeFromWishlistAfterAdd: boolean;
}

const initialState: UiState = {
  selectedProduct: null,
  removeFromWishlistAfterAdd: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openAddToCart(
      state,
      action: PayloadAction<{ product: Product; removeFromWishlistAfterAdd?: boolean }>,
    ) {
      state.selectedProduct = action.payload.product;
      state.removeFromWishlistAfterAdd = action.payload.removeFromWishlistAfterAdd ?? false;
    },
    closeAddToCart(state) {
      state.selectedProduct = null;
      state.removeFromWishlistAfterAdd = false;
    },
  },
});

export const { openAddToCart, closeAddToCart } = uiSlice.actions;

export default uiSlice.reducer;

export const selectSelectedProduct = (state: RootState) => state.ui.selectedProduct;
export const selectRemoveFromWishlistAfterAdd = (state: RootState) =>
  state.ui.removeFromWishlistAfterAdd;
