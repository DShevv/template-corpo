import { NewsItemT } from "./types";

export type ApiSuccess<T> = {
  success: boolean;
  data: T;
};

export type ApiError = {
  message: string;
  status: number;
};

export type NewsResponse = {
  current_page: number;
  data: NewsItemT[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string;
  path: string;
  per_page: number;
  prev_page_url: string;
  to: number;
  total: number;
}

export type ApiResponse<T> = ApiSuccess<T> | ApiError;