import type { ApiResponse } from '@/api/modules/types/common';

export interface Galaxy {
  id: number;
  name: string;
  color: string;
  view?: string;
}

export interface Planet {
  id: number;
  name: string;
  color: string;
  note: string;
  view?: string;
  id_galaxy: number;
}

export interface PlanetWithGalaxy extends Planet {
  galaxy: Galaxy;
}

export type GalaxyListResponse = ApiResponse<Galaxy[]>;

export interface GalaxyResponseData extends Galaxy {
  planets: Planet[];
}

export type GalaxyResponse = ApiResponse<GalaxyResponseData>;

export interface CreateGalaxyPayload {
  name: string;
  color: string;
  view?: string;
}

export interface UpdateGalaxyPayload {
  name?: string;
  color?: string;
  view?: string;
}

export type DeleteGalaxyResponse = ApiResponse<undefined>;

export interface CreatePlanetPayload {
  name: string;
  color: string;
  view?: string;
  id_galaxy: number | null;
}

export interface UpdatePlanetPayload {
  name?: string;
  color?: string;
  id_galaxy?: number;
  note?: string;
  view?: string;
}

export type PlanetResponse = ApiResponse<Planet>;

export interface PlanetWithGalaxyData {
  planet: Planet;
  galaxy: Galaxy;
}

export type PlanetWithGalaxyResponse = ApiResponse<PlanetWithGalaxyData>;

export type DeletePlanetResponse = ApiResponse<undefined>;
