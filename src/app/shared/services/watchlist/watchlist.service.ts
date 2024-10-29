import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CreateWatchlist } from 'src/app/types/watchlist';

@Injectable({
  providedIn: 'root',
})
export class WatchlistService {
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.log('client-side network error', error.error);
    } else {
      console.log('server-side error', error.error);
    }

    return throwError(() => new Error('Could not add movie to watchlist'));
  }

  addToWatchlist(data: CreateWatchlist): Observable<any> {
    const { movieId, watchlistId, status, rating } = data;

    console.log(`Add ${movieId} to watchlist`);
    return this.http
      .post(`https://movies.api/watchlists/${watchlistId}`, {
        movieId,
        status,
        rating
      })
      .pipe(catchError(this.handleError));
  }

  getUserWatchlists(): Observable<any> {
    return this.http
      .get('https://movies.api/users/1/watchlists')
      .pipe(catchError(this.handleError));
  }
}
