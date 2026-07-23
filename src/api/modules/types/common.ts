export interface ApiResponse<T = undefined> {
  code: number;
  message: string;
  data: T;
}

export interface ApiErrorBody {
  code: number;
  message: string;
}
