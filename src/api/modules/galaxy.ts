import type { AxiosError, AxiosResponse } from 'axios';
import api from '../api';
import type {
  GalaxyListResponse,
  GalaxyResponse,
  CreateGalaxyPayload,
  UpdateGalaxyPayload,
  DeleteGalaxyResponse
} from '@/api/modules/types/galaxy';

type ErrorResponse = {
  success: boolean;
  error?: string;
};

export default {
  // GET /galaxies — список галактик текущего пользователя
  async fetchGalaxies(): Promise<GalaxyListResponse> {
    try {
      const { data }: AxiosResponse<GalaxyListResponse> = await api.get('/galaxies');
      return data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      throw error.response?.data?.error ?? error.message;
    }
  },

  // GET /galaxies/:id — одна галактика
  async fetchGalaxyById(id: number): Promise<GalaxyResponse> {
    try {
      const { data }: AxiosResponse<GalaxyResponse> = await api.get(`/galaxies/${id}`);
      return data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      throw error.response?.data?.error ?? error.message;
    }
  },

  // POST /galaxies — создать галактику
  async createGalaxy(payload: CreateGalaxyPayload): Promise<GalaxyResponse> {
    try {
      const { data }: AxiosResponse<GalaxyResponse> = await api.post('/galaxies', payload);
      return data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      throw error.response?.data?.error ?? error.message;
    }
  },

  // PUT /galaxies/:id — обновить галактику
  async updateGalaxy(
    id: number,
    payload: UpdateGalaxyPayload
  ): Promise<GalaxyResponse> {
    try {
      const { data }: AxiosResponse<GalaxyResponse> = await api.put(
        `/galaxies/${id}`,
        payload
      );
      return data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      throw error.response?.data?.error ?? error.message;
    }
  },

  // DELETE /galaxies/:id — удалить галактику
  async deleteGalaxy(id: number): Promise<DeleteGalaxyResponse> {
    try {
      const { data }: AxiosResponse<DeleteGalaxyResponse> = await api.delete(
        `/galaxies/${id}`
      );
      return data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      throw error.response?.data?.error ?? error.message;
    }
  }
};
