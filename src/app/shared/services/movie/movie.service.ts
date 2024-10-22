import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/types/movies';

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
  }
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  log() {
    console.log('movie service');
  }

  getAll(pageIndex: number = 0, limit: number = 10): Observable<MovieResponse> {
    const url = new URL('https://movies.api/list');

    url.searchParams.append('page', (pageIndex + 1).toString());
    url.searchParams.append('limit', limit.toString());

    console.log(`url: ${url.toString()}`);

    return this.http.get<MovieResponse>(url.toString());
  }

  getOne(movieId: string): Observable<Movie> {
    return this.http.get<Movie>(`https://movies.api/${movieId}`);
  }
}
