import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TmdbFindByIdResponse } from 'src/app/types/tmdb';
import { environment } from 'src/environments/environment';

const { tmdbBearer } = environment;

@Injectable({
  providedIn: 'root'
})
export class TmdbService {

  constructor(private http: HttpClient) { }

  getMovieByImdbId(): Observable<TmdbFindByIdResponse> {
    const url = 'https://api.themoviedb.org/3/find/tt0137523?external_source=imdb_id';

    return this.http.get<TmdbFindByIdResponse>(url);
  }
}
