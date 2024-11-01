import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TmdbFindByIdResponse } from 'src/app/types/tmdb';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  constructor(private http: HttpClient) { }

  getMovieByImdbId(): Observable<TmdbFindByIdResponse> {
    // const url = 'https://api.themoviedb.org/3/authentication';
    const url = 'https://api.themoviedb.org/3/find/tt0137523?external_source=imdb_id';
    const config = {
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer token'
      }
    };

    return this.http.get<TmdbFindByIdResponse>(url, config);
  }
}
