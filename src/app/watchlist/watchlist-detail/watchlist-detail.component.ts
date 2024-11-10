import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WatchlistService } from 'src/app/shared/services/watchlist/watchlist.service';
import { Movie, MovieStatus } from 'src/app/types/movie';
import Datediff from 'src/app/shared/utils/Datediff';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ChooseRatingFormComponent } from 'src/app/shared/components/choose-rating-form/choose-rating-form.component';
import { MatTableDataSource } from '@angular/material/table';

const {
  imdb: { title: imdbTitleUrl },
} = environment;

@Component({
  selector: 'app-watchlist-detail',
  templateUrl: './watchlist-detail.component.html',
  styleUrls: ['./watchlist-detail.component.scss'],
})
export class WatchlistDetailComponent implements OnInit {
  id!: string;
  imageUrl = '';
  itemsCount = 0;
  createdAt!: Date;
  modifiedAt!: Date;
  movies: Movie[] = [];
  private!: boolean;
  title = '';
  displayedColumns: string[] = [
    'movieId',
    'title',
    'startYear',
    'rating',
    'myRating',
    'status',
    'options',
  ];
  dataSource = new MatTableDataSource<Movie>(this.movies);

  constructor(
    private router: ActivatedRoute,
    private watchlistService: WatchlistService,
    public dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      const { id: watchlistId } = params;

      this.getWatchlistData(watchlistId);
    });
  }

  get createdSinceTime(): string {
    const dateDiff = new Datediff(new Date(this.createdAt), new Date());

    return dateDiff.getLargestFormattedDiff();
  }

  get modifiedSinceTime(): string {
    const dateDiff = new Datediff(new Date(this.modifiedAt), new Date());

    return dateDiff.getLargestFormattedDiff();
  }

  getWatchlistData(watchlistId: string) {
    this.watchlistService.getOne(watchlistId).subscribe((res) => {
      this.id = res.data.id;
      this.imageUrl = res.data.imageUrl;
      this.itemsCount = res.data.itemsCount;
      this.createdAt = res.data.createdAt;
      this.modifiedAt = res.data.modifiedAt;
      this.movies = res.data.movies;
      this.private = res.data.private;
      this.title = res.data.title;
      this.dataSource.data = this.movies;
    });
  }

  getMovieStatusClass(status: MovieStatus): string {
    switch (status) {
      case MovieStatus.Watched:
        return 'status-watched';
      case MovieStatus.PlanToWatch:
        return 'status-plan-to-watch';
      case MovieStatus.Watching:
        return 'status-watching';
      default:
        return '';
    }
  }

  getImdbUrl(movieId: string) {
    return `${imdbTitleUrl}/${movieId}`;
  }

  removeMovieFromWatchlist(movie: Movie) {
    this.watchlistService
      .removeFromWatchlist({ watchlistId: this.id, movieId: movie.movieId })
      .subscribe({
        next: () => {
          this.getWatchlistData(this.id);
        },
      });
  }

  rateMovie(movie: Movie) {
    const dialogRef = this.dialog.open(ChooseRatingFormComponent, {
      data: {
        movieId: movie.movieId,
        movieTitle: movie.title,
        movieYear: movie.startYear,
        movieRating: movie.myRating,
      },
    });

    dialogRef.componentInstance.ratingUpdated.subscribe((movie: Movie) => {
      const movieIndex = this.movies.findIndex(
        (m) => m.movieId === movie.movieId
      );

      this.movies[movieIndex] = movie;
      this.dataSource.data = this.movies;
    });
  }
}
