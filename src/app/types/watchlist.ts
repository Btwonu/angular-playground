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

export interface WatchlistListResponse {
  data: Watchlist[];
}
