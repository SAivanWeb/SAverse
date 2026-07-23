import type { AxiosError } from 'axios';
import type { ApiErrorBody } from '@/api/modules/types/common';

export function extractErrorMessage(err: unknown): string {
  const error = err as AxiosError<ApiErrorBody>;
  return error.response?.data?.message ?? error.message;
}
