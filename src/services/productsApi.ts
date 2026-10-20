import { api } from './api';
import { TAGS } from '../app/constants';
import { normalizeError } from './normalizeError';
import type { Product } from '../types/api';

const productsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<Product[], void>({
      query: () => '/products',
      providesTags: [TAGS.PRODUCTS],
      transformErrorResponse: (error) => normalizeError(error),
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
