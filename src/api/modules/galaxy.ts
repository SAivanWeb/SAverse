import type { AxiosResponse } from 'axios';
import api from '../api';
import { extractErrorMessage } from '@/api/utils';
import type {
  GalaxyListResponse,
  GalaxyResponse,
  CreateGalaxyPayload,
  UpdateGalaxyPayload,
  DeleteGalaxyResponse,
  CreatePlanetPayload,
  UpdatePlanetPayload,
  PlanetResponse,
  PlanetWithGalaxyResponse,
  DeletePlanetResponse
} from '@/api/modules/types/galaxy';

export default {
  async fetchGalaxies(): Promise<GalaxyListResponse> {
    try {
      const { data }: AxiosResponse<GalaxyListResponse> = await api.get('/galaxies');
      return data;
    } catch (err) {
      throw extractErrorMessage(err);
    }
  },

  async fetchGalaxyById(id: number): Promise<GalaxyResponse> {
    try {
      const { data }: AxiosResponse<GalaxyResponse> = await api.get(`/galaxies/${id}`);
      return data;
    } catch (err) {
      throw extractErrorMessage(err);
    }
  },

  async createGalaxy(payload: CreateGalaxyPayload): Promise<GalaxyResponse> {
    try {
      const { data }: AxiosResponse<GalaxyResponse> = await api.post('/galaxies', payload);
      return data;
    } catch (err) {
      throw extractErrorMessage(err);
    }
  },

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
      throw extractErrorMessage(err);
    }
  },

  async deleteGalaxy(id: number): Promise<DeleteGalaxyResponse> {
    try {
      const { data }: AxiosResponse<DeleteGalaxyResponse> = await api.delete(
        `/galaxies/${id}`
      );
      return data;
    } catch (err) {
      throw extractErrorMessage(err);
    }
  },

  async fetchPlanetById(id: number): Promise<PlanetWithGalaxyResponse> {
    try {
      const { data }: AxiosResponse<PlanetWithGalaxyResponse> = await api.get(`/planets/${id}`);
      return data;
    } catch (err) {
      throw extractErrorMessage(err);
    }
  },

  async createPlanet(payload: CreatePlanetPayload): Promise<PlanetResponse> {
    try {
      const { data }: AxiosResponse<PlanetResponse> = await api.post('/planets', payload);
      return data;
    } catch (err) {
      throw extractErrorMessage(err);
    }
  },

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
      throw extractErrorMessage(err);
    }
  },

  async deletePlanet(id: number): Promise<DeletePlanetResponse> {
    try {
      const { data }: AxiosResponse<DeletePlanetResponse> = await api.delete(
        `/planets/${id}`
      );
      return data;
    } catch (err) {
      throw extractErrorMessage(err);
    }
  }
};
