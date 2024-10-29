import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/types/movies';
import { ActivatedRoute, Router } from '@angular/router';
import { FiltrationParams } from 'src/app/types/movies';

interface MovieResponse {
  data: Movie[];
  total_count: number;
  page: number;
  per_page: number;
  page_count: number;
  links: {
    self: string | null;
    prev: string | null;
    next: string | null;
    first: string | null;
    last: string | null;
  };
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

  getFiltered(page: number = 1, limit: number = 10, data: Partial<FiltrationParams>): Observable<MovieResponse> {
    const url = new URL('https://movies.api/list');
    const queryParams = {};

    url.searchParams.append('page', page.toString());
    url.searchParams.append('limit', limit.toString());

    for (const param of Object.keys(data) as (keyof FiltrationParams)[]) {
      if (data[param] !== undefined) {
        url.searchParams.append(param, data[param]!.toString());
      }
    }

    console.log(url);
    console.log(`url: ${url.toString()}`);

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });

    console.log(`url: ${url.toString()}`);

    return this.http.get<MovieResponse>(url.toString());
  }

  getOne(movieId: string): Observable<Movie> {
    return this.http.get<Movie>(`https://movies.api/${movieId}`);
  }
}
