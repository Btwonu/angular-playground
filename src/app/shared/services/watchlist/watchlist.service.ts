import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CreateWatchlist } from 'src/app/types/watchlist';
import {
  WatchlistListResponse,
  CreateWatchlistRequest,
  CreateWatchlistResponse,
} from 'src/app/types/watchlist';
import { AppError } from '../../utils/error';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  constructor(private http: HttpClient) {}

  addToWatchlist(data: CreateWatchlist): Observable<any> {
    const { movieId, watchlistId, status, rating } = data;

    console.log(`Add ${movieId} to watchlist`);
    return this.http
      .post(`https://movies.api/watchlists/${watchlistId}`, {
        movieId,
        status,
        rating,
      })
      .pipe(
        catchError((error) =>
          throwError(() => new AppError('Failed to add movie to watchlist'))
        )
      );
  }

  getUserWatchlists(): Observable<WatchlistListResponse> {
    console.log('getUserWatchlists');

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
}
