export interface AuthResponse {
  success: boolean;
  data: {
    access_token: string;
    refresh_token: string;
  };
}

export interface AuthData {
  email: string;
  password: string;
}