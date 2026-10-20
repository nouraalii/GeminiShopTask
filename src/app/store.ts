import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import themeReducer from '../features/theme/themeSlice';
import filtersReducer from '../features/products/filtersSlice';
import uiReducer from '../features/ui/uiSlice';
import { api } from '../services/api';

const store = configureStore({
  reducer: {
    auth: authReducer,
    theme: themeReducer,
    filters: filtersReducer,
    ui: uiReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
