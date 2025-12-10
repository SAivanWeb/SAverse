import type { AxiosError, AxiosResponse } from 'axios';
import api from '../api';
import {AuthResponse, AuthData, currentUserResponse} from '@/api/modules/types/user';

type ErrorResponse = {
  success: boolean;
  error?: string;
};

export default {
  async register(payload: AuthData): Promise<AuthResponse> {
    try {
      const { data }: AxiosResponse<AuthResponse> = await api.post(
        '/auth/register',
        payload
      );
      return data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      throw error.response?.data?.error ?? error.message;
    }
  },

  async login(payload: AuthData): Promise<AuthResponse> {
    try {
      const { data }: AxiosResponse<AuthResponse> = await api.post(
        '/auth/login',
        payload
      );
      return data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      throw error.response?.data?.error ?? error.message;
    }
  },

  async currentUser(): Promise<currentUserResponse> {
    try {
      const { data }: AxiosResponse<currentUserResponse> = await api.get('/auth/me',);
      return data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      throw error.response?.data?.error ?? error.message;
    }
  }
};
