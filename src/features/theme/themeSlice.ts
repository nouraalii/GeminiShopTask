import { createSlice } from '@reduxjs/toolkit';
import { STORAGE_KEYS } from '../../app/constants';
import type { RootState } from '../../app/store';

export type ThemeMode = 'light' | 'dark';

interface ThemeState {
  mode: ThemeMode;
}

function getInitialTheme(): ThemeMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.THEME);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  } catch {
  }
  return 'light';
}

const initialState: ThemeState = {
  mode: getInitialTheme(),
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme(state) {
      const nextMode: ThemeMode = state.mode === 'light' ? 'dark' : 'light';
      state.mode = nextMode;
      try {
        localStorage.setItem(STORAGE_KEYS.THEME, nextMode);
      } catch {
      }
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;

export const selectThemeMode = (state: RootState): ThemeMode => state.theme.mode;
