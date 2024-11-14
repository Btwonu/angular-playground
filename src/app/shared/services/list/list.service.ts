import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import {
  AddMovieRequest,
  ListListResponse,
  CreateListRequest,
  CreateListResponse,
  ListResponse,
  RemoveFromListRequest,
} from 'src/app/types/list';
import { AppError } from '../../utils/error';
import { MovieStatus } from 'src/app/types/movie';

@Injectable({
  providedIn: 'root',
})
export class ListService {
  constructor(private http: HttpClient) {}

  addToList(data: AddMovieRequest): Observable<any> {
    const { movieId, listId, status, rating } = data;

    console.log(`Add ${movieId} to list`);
    return this.http
      .post(`https://movies.api/lists/${listId}`, {
        movieId,
        status,
        rating,
      })
      .pipe(
        catchError(() =>
          throwError(() => new AppError('Failed to add movie to list'))
        )
      );
  }

  removeFromList(data: RemoveFromListRequest): Observable<any> {
    const { listId, movieId } = data;

    return this.http.delete<any>(
      `https://movies.api/lists/${listId}/movies/${movieId}`
    );
  }

  getUserLists(): Observable<ListListResponse> {
    return this.http.get<ListListResponse>(
      'https://movies.api/users/1/lists'
    );
  }

  createList(
    data: Partial<CreateListRequest>
  ): Observable<CreateListResponse> {
    return this.http.post<CreateListResponse>(
      'https://movies.api/lists',
      data
    );
  }

  getOne(listId: string): Observable<ListResponse> {
    return this.http.get<ListResponse>(
      `https://movies.api/lists/${listId}`
    );
  }

  changeMovieStatus(data: {
    listId: string;
    movieId: string;
    status: MovieStatus;
  }) {
    console.log({ data });

    const { listId, movieId, status } = data;

    return this.http
      .patch(
        `https://movies.api/lists/${listId}/movies/${movieId}/status`,
        { status }
      )
      .pipe(
        catchError(() => {
          return throwError(
            () => new AppError('Failed to change movie status')
          );
        })
      );
  }
}
