import type { ApiResponse } from '@/api/modules/types/common';

export interface TokensData {
  accessToken: string;
  refreshToken: string;
}

export type AuthResponse = ApiResponse<TokensData>;

export interface AuthData {
  email: string;
  password: string;
}

export type currentUserResponse = ApiResponse<{ email: string }>;
