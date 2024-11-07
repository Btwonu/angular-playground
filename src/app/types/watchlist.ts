export interface CreateWatchlist {
  movieId: string;
  watchlistId: string;
  status: string;
  rating?: number;
}

export interface Watchlist {
  id: string;
  title: string;
  private: boolean;
  modifiedAt: string;
  itemsCount: number;
  imageUrl: string;
}

export interface CreateWatchlistRequest {
  title: string;
  description?: string;
  visibility: 'private' | 'public';
}

export interface CreateWatchlistResponse {
  id: string;
  title: string;
  description?: string;
  visibility: 'private' | 'public';
  createdAt: Date;
}

export interface WatchlistListResponse {
  data: Watchlist[];
}
