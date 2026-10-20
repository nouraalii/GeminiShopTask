import { STORAGE_KEYS } from '../../app/constants';
import type { User } from '../../types/api';

export function readStoredAuth() {
  const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
  const userJson = localStorage.getItem(STORAGE_KEYS.USER);

  let user: User | null = null;

  try {
    user = userJson ? JSON.parse(userJson) : null;
  } catch {
    user = null;
  }

  return { token, user };
}

export function saveAuth(token: string, user: User) {
  localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem(STORAGE_KEYS.TOKEN);
  localStorage.removeItem(STORAGE_KEYS.USER);
}
