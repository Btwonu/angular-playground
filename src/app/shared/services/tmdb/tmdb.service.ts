import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TmdbFindByIdResponse } from 'src/app/types/tmdb';
import { environment } from 'src/environments/environment';

const { tmdbBearer, tmdbUrl } = environment;

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  constructor(private http: HttpClient) { }

  getMovieByImdbId(imdbId: string): Observable<TmdbFindByIdResponse> {
    const url = `${tmdbUrl}/find/${imdbId}?external_source=imdb_id`;

    return this.http.get<TmdbFindByIdResponse>(url);
  }
}
