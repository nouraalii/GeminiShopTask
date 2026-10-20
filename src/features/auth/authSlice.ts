import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User, AuthResponse } from '../../types/api';
import { readStoredAuth, saveAuth, clearAuth } from './authStorage';
import type { RootState } from '../../app/store';

interface AuthState {
  token: string | null;
  user: User | null;
}

const initialState: AuthState = readStoredAuth();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials(state, action: PayloadAction<AuthResponse>) {
      state.token = action.payload.accessToken;
      state.user = action.payload.user;
      saveAuth(action.payload.accessToken, action.payload.user);
    },
    logout(state) {
      state.token = null;
      state.user = null;
      clearAuth();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectToken = (state: RootState) => state.auth.token;
export const selectUser = (state: RootState) => state.auth.user;
