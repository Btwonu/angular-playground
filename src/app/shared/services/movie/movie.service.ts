import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import {
  GenresResponse,
  Movie,
  MoviesResponse,
  FiltrationParams,
  FiltrationValidationResponse,
  UpdateMovieRatingRequest,
} from 'src/app/types/movie';
import { ActivatedRoute, Router } from '@angular/router';
import { TmdbVideosResponse } from 'src/app/types/tmdb';
import { environment } from 'src/environments/environment';
import { convertCamelToSnake } from 'src/app/shared/utils/functions';

const {
  tmdb: { base: tmdbBase },
  api: { base, movies, genres, filtrationValidation },
} = environment;

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  baseUrl = base;
  tmdbBaseUrl = tmdbBase;
  moviesUrl = `${base}${movies}`;
  genresUrl = `${base}${genres}`;
  filtrationValidationUrl = `${base}${filtrationValidation}`;

  private cache = new Map<number, any>();

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
    const url = new URL(this.moviesUrl);
    const queryParams: Partial<FiltrationParams> = {};

    if (page > 1) {
      url.searchParams.append('page', encodeURIComponent(page.toString()));
      queryParams['page'] = page;
    }

    if (limit !== 10) {
      url.searchParams.append('limit', encodeURIComponent(limit.toString()));
      queryParams['limit'] = limit;
    }

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
          url.searchParams.append(
            convertCamelToSnake(param),
            encodeURIComponent(value!.toString())
          );
          queryParams[convertCamelToSnake(param)] = encodeURIComponent(
            value!.toString()
          );
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
    return this.http.get<Movie>(`${this.moviesUrl}/${movieId}`);
  }

  getGenres(): Observable<GenresResponse> {
    return this.http.get<GenresResponse>(this.genresUrl);
  }

  getTrailer(tmdbId: number): Observable<TmdbVideosResponse> {
    if (this.cache.has(tmdbId)) {
      return of(this.cache.get(tmdbId));
    }

    return this.http
      .get<TmdbVideosResponse>(`${this.tmdbBaseUrl}/movie/${tmdbId}/videos`)
      .pipe(tap((data) => this.cache.set(tmdbId, data)));
  }

  getFiltrationValidationValues(): Observable<FiltrationValidationResponse> {
    return this.http.get<FiltrationValidationResponse>(
      this.filtrationValidationUrl
    );
  }

  rateMovie(data: UpdateMovieRatingRequest): Observable<Movie> {
    const { movieId, rating } = data;

    return this.http.patch<Movie>(`${this.moviesUrl}/${movieId}/rate`, {
      rating,
    });
  }
}
