
export interface Movie {
  id: string;
  title: string;
  genre: string;
  date: string;
  language: string;
  poster: string;
  playUrl: string;
  streamUrl: string;
  stream2Url: string;
  stream3Url: string;
  stream4Url: string;
  keywords: string;
  downloadUrl: string;
  description: string;
  content: string;
  director: string[];
  cast: string[];
  castimage?: string[];
  timestamp: number;
  ratingTotal: number;
  ratingCount: number;
  views: number;
}
