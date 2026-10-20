import { api } from './api';
import { TAGS } from '../app/constants';
import { normalizeError } from './normalizeError';
import { calculateCartTotal } from '../features/cart/cartUtils';
import type {
  Cart,
  CartItem,
  AddToCartArgs,
  AddToCartRequest,
  UpdateCartItemRequest,
} from '../types/api';
import type { RootState } from '../app/store';

const cartApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<Cart, void>({
      query: () => '/api/cart',
      providesTags: [TAGS.CART],
      transformErrorResponse: (error) => normalizeError(error),
    }),
    addToCart: builder.mutation<CartItem, AddToCartArgs>({
      query: ({ product, quantity }) => {
        const body: AddToCartRequest = {
          productId: product.id,
          quantity,
        };
        return {
          url: '/api/cart',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: [TAGS.CART],
      transformErrorResponse: (error) => normalizeError(error),
      async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
        const state = getState() as RootState;
        const userId = state.auth.user?.id ?? 0;

        const patchResult = dispatch(
          cartApi.util.updateQueryData('getCart', undefined, (draft) => {
            const existing = draft.items.find((item) => item.productId === args.product.id);
            if (existing) {
              existing.quantity += args.quantity;
            } else {
              draft.items.push({
                id: -Date.now(),
                userId,
                productId: args.product.id,
                quantity: args.quantity,
                product: args.product,
              });
            }
            draft.total = calculateCartTotal(draft.items);
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    updateCartItem: builder.mutation<CartItem | { message: string }, UpdateCartItemRequest>({
      query: ({ productId, quantity }) => ({
        url: `/api/cart/${productId}`,
        method: 'PATCH',
        body: { quantity },
      }),
      invalidatesTags: [TAGS.CART],
      transformErrorResponse: (error) => normalizeError(error),
      async onQueryStarted({ productId, quantity }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartApi.util.updateQueryData('getCart', undefined, (draft) => {
            if (quantity === 0) {
              draft.items = draft.items.filter((item) => item.productId !== productId);
            } else {
              const item = draft.items.find((item) => item.productId === productId);
              if (item) {
                item.quantity = quantity;
              }
            }
            draft.total = calculateCartTotal(draft.items);
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    removeFromCart: builder.mutation<{ message: string }, number>({
      query: (productId) => ({
        url: `/api/cart/${productId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [TAGS.CART],
      transformErrorResponse: (error) => normalizeError(error),
      async onQueryStarted(productId, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          cartApi.util.updateQueryData('getCart', undefined, (draft) => {
            draft.items = draft.items.filter((item) => item.productId !== productId);
            draft.total = calculateCartTotal(draft.items);
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
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartItemMutation,
  useRemoveFromCartMutation,
} = cartApi;
