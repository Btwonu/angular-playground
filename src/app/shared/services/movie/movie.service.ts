import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenresResponse, Movie, MoviesResponse } from 'src/app/types/movies';
import { ActivatedRoute, Router } from '@angular/router';
import { FiltrationParams } from 'src/app/types/movies';

function convertCamelToSnake(str: string) {
  return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1_').toLowerCase();
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  log() {
    console.log('movie service');
  }

  getFiltered(
    page: number = 1,
    limit: number = 10,
    data: Partial<FiltrationParams>
  ): Observable<MoviesResponse> {
    const url = new URL('https://movies.api/list');
    const queryParams: Partial<FiltrationParams> = {};

    url.searchParams.append('page', encodeURIComponent(page.toString()));
    url.searchParams.append('limit', encodeURIComponent(limit.toString()));

    queryParams['page'] = page;
    queryParams['limit'] = limit;

    for (const param of Object.keys(data)) {
      const value = data[param];

      if (value !== undefined) {
        if (Array.isArray(value)) {
          url.searchParams.append(
            convertCamelToSnake(param),
            value.map((v) => encodeURIComponent(v)).join(',')
          );
          queryParams[convertCamelToSnake(param)] = value
            .map((v) => encodeURIComponent(v))
            .join(',');
        } else {
          url.searchParams.append(convertCamelToSnake(param), encodeURIComponent(value!.toString()));
          queryParams[convertCamelToSnake(param)] = encodeURIComponent(value!.toString());
        }
      }
    }

    console.log(queryParams);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
    });

    return this.http.get<MoviesResponse>(url.toString());
  }

  getOne(movieId: string): Observable<Movie> {
    return this.http.get<Movie>(`https://movies.api/${movieId}`);
  }

  getGenres(): Observable<GenresResponse> {
    return this.http.get<GenresResponse>('https://movies.api/genres');
  }
}
