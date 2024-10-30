import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MovieService } from 'src/app/shared/services/movie/movie.service';
import { Movie, FiltrationParams } from 'src/app/types/movies';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
})
export class MoviesListComponent implements OnInit {
  movies: Movie[] = [];
  length: number = 0;
  pageIndex: number = 1;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent | null = null;

  constructor(private movieService: MovieService) {}

  getMovies(event: PageEvent | null) {
    const { length, pageIndex, pageSize, previousPageIndex } = event || {};

    // FIX: Fix pageIndex coming up as undefined
    console.log({pageIndex});

    this.movieService
      .getFiltered(pageIndex ? pageIndex + 1 : 0, pageSize, {
        yearGt: 2000,
        yearLt: 2010,
        ratingGt: 8,
        ratingLt: 10,
        runtimeGt: 90,
        runtimeLt: 150,
        votesGt: 10000,
        votesLt: 20000,
        genres: ['Adventure', 'Comedy'],
      })
      .subscribe((res) => {
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
