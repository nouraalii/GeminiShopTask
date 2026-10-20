import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { ApiError } from '../types/api';

export function normalizeError(error: FetchBaseQueryError): ApiError {
  const status = error.status;

  if (status === 'FETCH_ERROR') {
    return { status, message: 'Cannot reach the server. Please try again.' };
  }

  const data = 'data' in error ? error.data : null;

  if (typeof data === 'string') {
    return { status, message: data };
  }

  if (data !== null && typeof data === 'object' && 'message' in data) {
    const obj = data as Record<string, unknown>;
    const message = typeof obj.message === 'string' ? obj.message : 'Something went wrong';
    const available = typeof obj.available === 'number' ? obj.available : undefined;
    return { status, message, available };
  }

  return { status, message: 'Something went wrong' };
}

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === 'object' &&
    error !== null &&
    'status' in error &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}
