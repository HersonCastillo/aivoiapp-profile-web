export interface IAPIResponse<T> {
  data: T;
  error?: boolean;
  message?: string;
}
