export interface Response {
  results: object[],
  total: number,
  nextPage?: number,
  total_pages?: number
}

export interface Photo {
  user: {
    username: string,
    name: string
  },
  urls: {
    small: string
  },
  description?: string,
  alt_description: string
}