import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/types/movies';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  log() {
    console.log('movie service');
  }

  getMovie(movieId: string): Observable<Movie> {
    return this.http.get<Movie>(`https://movies.api/${movieId}`);
  }
}
