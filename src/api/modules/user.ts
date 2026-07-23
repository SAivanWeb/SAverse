import type { AxiosResponse } from 'axios';
import api from '../api';
import { extractErrorMessage } from '@/api/utils';
import {AuthResponse, AuthData, currentUserResponse} from '@/api/modules/types/user';

export default {
  async register(payload: AuthData): Promise<AuthResponse> {
    try {
      const { data }: AxiosResponse<AuthResponse> = await api.post(
        '/auth/register',
        payload
      );
      return data;
    } catch (err) {
      throw extractErrorMessage(err);
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
      throw extractErrorMessage(err);
    }
  },

  async currentUser(): Promise<currentUserResponse> {
    try {
      const { data }: AxiosResponse<currentUserResponse> = await api.get('/auth/me',);
      return data;
    } catch (err) {
      throw extractErrorMessage(err);
    }
  }
};
