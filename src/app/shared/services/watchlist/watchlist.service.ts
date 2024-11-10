import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import {
  AddMovieRequest,
  WatchlistListResponse,
  CreateWatchlistRequest,
  CreateWatchlistResponse,
  WatchlistResponse,
  RemoveFromWatchlistRequest,
} from 'src/app/types/watchlist';
import { AppError } from '../../utils/error';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  constructor(private http: HttpClient) {}

  addToWatchlist(data: AddMovieRequest): Observable<any> {
    const { movieId, watchlistId, status, rating } = data;

    console.log(`Add ${movieId} to watchlist`);
    return this.http
      .post(`https://movies.api/watchlists/${watchlistId}`, {
        movieId,
        status,
        rating,
      })
      .pipe(
        catchError(() =>
          throwError(() => new AppError('Failed to add movie to watchlist'))
        )
      );
  }

  removeFromWatchlist(data: RemoveFromWatchlistRequest): Observable<any> {
    const { watchlistId, movieId } = data;

    return this.http.delete<any>(
      `https://movies.api/watchlists/${watchlistId}/movies/${movieId}`
    );
  }

  getUserWatchlists(): Observable<WatchlistListResponse> {
    return this.http.get<WatchlistListResponse>(
      'https://movies.api/users/1/watchlists'
    );
  }

  createWatchlist(
    data: Partial<CreateWatchlistRequest>
  ): Observable<CreateWatchlistResponse> {
    return this.http.post<CreateWatchlistResponse>(
      'https://movies.api/watchlists',
      data
    );
  }

  getOne(watchlistId: string): Observable<WatchlistResponse> {
    return this.http.get<WatchlistResponse>(
      `https://movies.api/watchlists/${watchlistId}`
    );
  }
}
