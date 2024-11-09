import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MovieService } from 'src/app/shared/services/movie/movie.service';
import { Movie, FiltrationParams } from 'src/app/types/movie';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChooseWatchlistFormComponent } from '../choose-watchlist-form/choose-watchlist-form.component';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  length: number = 0;
  pageIndex: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent | null = null;
  filtrationParams: Partial<FiltrationParams> = {};
  displayedColumns: string[] = [
    'movieId',
    'title',
    'rating',
    'startYear',
    'options',
  ];
  dialogRef: MatDialogRef<ChooseWatchlistFormComponent> | null = null;

  constructor(private movieService: MovieService, public dialog: MatDialog) {}

  setPageParams(event: PageEvent | null) {
    const { length, pageIndex, pageSize, previousPageIndex } = event || {};

    this.pageEvent = event;
    this.pageIndex = pageIndex || 0;
    this.pageSize = pageSize || 10;

    this.getMovies();
  }

  setFiltrationParams(params: Partial<FiltrationParams>) {
    this.filtrationParams = params;

    this.pageEvent = null;
    this.pageIndex = 0;

    this.getMovies();
  }

  getMovies() {
    this.movieService
      .getFiltered(this.pageIndex + 1, this.pageSize, this.filtrationParams)
      .subscribe((res) => {
        this.movies = res.data;
        this.length = res.total_count;
        this.pageSize = res.per_page;
        this.pageSizeOptions = [res.per_page];
      });
  }

  ngOnInit(): void {
    this.getMovies();
  }

  viewDetails(movie: Movie) {
    console.log('View details', movie);
  }

  openDialog(movie: Movie) {
    this.dialogRef = this.dialog.open(ChooseWatchlistFormComponent, {
      data: { movieId: movie.movieId },
    });
    console.log('Add to watchlist', movie);
  }

  rate(movie: Movie) {
    console.log('Rate movie', movie);
  }
}
