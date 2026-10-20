import { api } from './api';
import { normalizeError } from './normalizeError';
import { setCredentials } from '../features/auth/authSlice';
import type { AuthResponse, RegisterRequest, LoginRequest } from '../types/api';

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (body) => {
        const requestBody: RegisterRequest = {
          email: body.email,
          password: body.password,
        };
        if (body.name && body.name.trim()) {
          requestBody.name = body.name.trim();
        }
        return { url: '/register', method: 'POST', body: requestBody };
      },
      transformErrorResponse: (error) => normalizeError(error),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch {
        }
      },
    }),

    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({ url: '/login', method: 'POST', body }),
      transformErrorResponse: (error) => normalizeError(error),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch {
        }
      },
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
