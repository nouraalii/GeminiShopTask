import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { RootState } from '../app/store';
import { TAGS } from '../app/constants';
import { selectToken, logout } from '../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  prepareHeaders: (headers, { getState }) => {
    const token = selectToken(getState() as RootState);
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  apiContext,
  extraOptions,
) => {
  const result = await baseQuery(args, apiContext, extraOptions);

  if (result.error?.status === 401) {
    const token = selectToken(apiContext.getState() as RootState);
    if (token) {
      apiContext.dispatch(logout());
      apiContext.dispatch(api.util.resetApiState());
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithAuth,
  tagTypes: [TAGS.PRODUCTS, TAGS.CART, TAGS.WISHLIST],
  endpoints: () => ({}),
});