
export interface Galaxy {
  id: number;
  name: string;
  color: string;
}

export interface Planet {
  id: number;
  name: string;
  color: string;
  note: string;
  id_galaxy: number;
}

export interface PlanetWithGalaxy extends Planet {
  galaxy: Galaxy;
}

export interface GalaxyListResponse {
  success: boolean;
  data: GalaxyResponseData[];
}

export interface GalaxyResponseData {
  id: number;
  name: string;
  color: string;
  planets: Planet[];
}

export interface GalaxyResponse {
  success: boolean;
  data: GalaxyResponseData;
}

export interface CreateGalaxyPayload {
  name: string;
  color: string;
}

export interface UpdateGalaxyPayload {
  name?: string;
  color?: string;
}

export interface DeleteGalaxyResponse {
  success: boolean;
  message: string;
}


export interface CreatePlanetPayload {
  name: string;
  color: string;
  id_galaxy: number | null;
}

export interface UpdatePlanetPayload {
  name?: string;
  color?: string;
  id_galaxy?: number;
  note?: string;
}

export interface PlanetResponse {
  success: boolean;
  data: Planet;
}

export interface DeletePlanetResponse {
  success: boolean;
  message: string;
}
