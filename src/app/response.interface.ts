import { ApiResponse } from 'unsplash-js/dist/helpers/response';

export interface Response {
  results: Photo[],
  total: number,
  nextPage?: number,
  total_pages?: number,
  apiType?: string,
  query?: string
}

export interface Photo {
  id: string,
  user: {
    username: string,
    name: string
  },
  urls: {
    small: string
  },
  description?: string,
  alt_description: string,
  favorite?: boolean
}