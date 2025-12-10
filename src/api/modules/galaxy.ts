// src/api/modules/galaxy.ts
import type { AxiosError, AxiosResponse } from 'axios';
import api from '../api';
import type {
  GalaxyListResponse,
  GalaxyResponse,
  CreateGalaxyPayload,
  UpdateGalaxyPayload,
  DeleteGalaxyResponse,
  CreatePlanetPayload,
  UpdatePlanetPayload,
  PlanetResponse,
  DeletePlanetResponse
} from '@/api/modules/types/galaxy';

type ErrorResponse = {
  success: boolean;
  error?: string;
};

export default {
  /* ===== ГАЛАКТИКИ ===== */

  // список галактик текущего пользователя
  async fetchGalaxies(): Promise<GalaxyListResponse> {
    try {
      const { data }: AxiosResponse<GalaxyListResponse> = await api.get('/galaxies');
      return data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      throw error.response?.data?.error ?? error.message;
    }
  },

  // одна галактика
  async fetchGalaxyById(id: number): Promise<GalaxyResponse> {
    try {
      const { data }: AxiosResponse<GalaxyResponse> = await api.get(`/galaxies/${id}`);
      return data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      throw error.response?.data?.error ?? error.message;
    }
  },

  // создать галактику
  async createGalaxy(payload: CreateGalaxyPayload): Promise<GalaxyResponse> {
    try {
      const { data }: AxiosResponse<GalaxyResponse> = await api.post('/galaxies', payload);
      return data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      throw error.response?.data?.error ?? error.message;
    }
  },

  // обновить галактику
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

  // удалить галактику
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
  },

  /* ===== ПЛАНЕТЫ ===== */

  // получить планету по id
  async fetchPlanetById(id: number): Promise<PlanetResponse> {
    try {
      const { data }: AxiosResponse<PlanetResponse> = await api.get(`/planets/${id}`);
      return data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      throw error.response?.data?.error ?? error.message;
    }
  },

  // создать планету
  async createPlanet(payload: CreatePlanetPayload): Promise<PlanetResponse> {
    try {
      const { data }: AxiosResponse<PlanetResponse> = await api.post('/planets', payload);
      return data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      throw error.response?.data?.error ?? error.message;
    }
  },

  // обновить планету
  async updatePlanet(
    id: number,
    payload: UpdatePlanetPayload
  ): Promise<PlanetResponse> {
    try {
      const { data }: AxiosResponse<PlanetResponse> = await api.put(
        `/planets/${id}`,
        payload
      );
      return data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      throw error.response?.data?.error ?? error.message;
    }
  },

  // удалить планету
  async deletePlanet(id: number): Promise<DeletePlanetResponse> {
    try {
      const { data }: AxiosResponse<DeletePlanetResponse> = await api.delete(
        `/planets/${id}`
      );
      return data;
    } catch (err) {
      const error = err as AxiosError<ErrorResponse>;
      throw error.response?.data?.error ?? error.message;
    }
  }
};
