import { Movie } from './movie';

export interface AddMovieRequest {
  movieId: string;
  listId: string;
  status: string;
  rating?: number;
}

export interface List {
  id: string;
  title: string;
  private: boolean;
  createdAt: Date;
  modifiedAt: Date;
  itemsCount: number;
  imageUrl: string;
  movies: Movie[];
}

export interface ListResponse {
  data: List;
}

export interface CreateListRequest {
  title: string;
  description?: string;
  visibility: 'private' | 'public';
}

export interface CreateListResponse {
  id: string;
  title: string;
  description?: string;
  visibility: 'private' | 'public';
  createdAt: Date;
}

export interface ListListResponse {
  data: List[];
}

export interface RemoveFromListRequest {
  listId: string;
  movieId: string;
}
