import { api } from './api';
import { TAGS } from '../app/constants';
import { normalizeError, isApiError } from './normalizeError';
import type { Wishlist, WishlistItem, AddToWishlistArgs } from '../types/api';
import type { RootState } from '../app/store';

const wishlistApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getWishlist: builder.query<Wishlist, void>({
      query: () => '/api/wishlist',
      providesTags: [TAGS.WISHLIST],
      transformErrorResponse: (error) => normalizeError(error),
    }),
    addToWishlist: builder.mutation<WishlistItem, AddToWishlistArgs>({
      query: ({ product }) => ({
        url: '/api/wishlist',
        method: 'POST',
        body: { productId: product.id },
      }),
      invalidatesTags: [TAGS.WISHLIST],
      transformErrorResponse: (error) => normalizeError(error),
      async onQueryStarted({ product }, { dispatch, queryFulfilled, getState }) {
        const state = getState() as RootState;
        const userId = state.auth.user?.id ?? 0;

        const patchResult = dispatch(
          wishlistApi.util.updateQueryData('getWishlist', undefined, (draft) => {
            const exists = draft.some((item) => item.productId === product.id);
            if (!exists) {
              draft.push({
                id: -Date.now(),
                userId,
                productId: product.id,
                product,
              });
            }
          }),
        );

        try {
          await queryFulfilled;
        } catch (err: unknown) {
          const apiError =
            err && typeof err === 'object' && 'error' in err
              ? (err as { error: unknown }).error
              : null;

          if (!isApiError(apiError) || apiError.status !== 409) {
            patchResult.undo();
          }
        }
      },
    }),
    removeFromWishlist: builder.mutation<{ message: string }, number>({
      query: (productId) => ({
        url: `/api/wishlist/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TAGS.WISHLIST],
      transformErrorResponse: (error) => normalizeError(error),
      async onQueryStarted(productId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          wishlistApi.util.updateQueryData('getWishlist', undefined, (draft) => {
            const index = draft.findIndex((item) => item.productId === productId);
            if (index !== -1) {
              draft.splice(index, 1);
            }
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useAddToWishlistMutation,
  useRemoveFromWishlistMutation,
} = wishlistApi;
