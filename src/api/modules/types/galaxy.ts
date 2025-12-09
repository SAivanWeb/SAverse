export interface Galaxy {
  id: number;
  name: string;
  color: string;
}

// Ответ: список галактик
export interface GalaxyListResponse {
  success: boolean;
  data: Galaxy[];
}

// Ответ: одна галактика
export interface GalaxyResponse {
  success: boolean;
  data: Galaxy;
}

// Пэйлоад для создания галактики
export interface CreateGalaxyPayload {
  name: string;
  color: string;
}

// Пэйлоад для обновления галактики
export interface UpdateGalaxyPayload {
  name?: string;
  color?: string;
}

// Ответ при удалении
export interface DeleteGalaxyResponse {
  success: boolean;
  message: string;
}
