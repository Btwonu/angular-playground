import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MovieService } from 'src/app/shared/services/movie/movie.service';
import { Movie } from 'src/app/types/movies';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
})
export class MoviesListComponent implements OnInit {
  movies: Movie[] = [];
  length: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent | null = null;

  constructor(private movieService: MovieService) {}

  getMovies(event: PageEvent | null) {
    const { length, pageIndex, pageSize, previousPageIndex } = event || {};

    this.movieService.getAll(pageIndex, pageSize).subscribe((res) => {
      this.movies = res.data;
      this.length = res.total_count;
      this.pageSize = res.per_page;
      this.pageSizeOptions = [res.per_page];
    });

    return event;
  }

  ngOnInit(): void {
    this.getMovies(null);
  }
}
