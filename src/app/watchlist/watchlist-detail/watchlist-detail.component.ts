import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormBuilder, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { WatchlistService } from 'src/app/shared/services/watchlist/watchlist.service';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { ChooseRatingFormComponent } from 'src/app/shared/components/choose-rating-form/choose-rating-form.component';
import { AppError } from 'src/app/shared/utils/error';
import { Movie, MovieStatus } from 'src/app/types/movie';
import Datediff from 'src/app/shared/utils/Datediff';

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
  movieStatuses: MovieStatus[] = Object.values(MovieStatus);
  movieStatusControls!: FormArray;

  constructor(
    private router: ActivatedRoute,
    private watchlistService: WatchlistService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      const { id: watchlistId } = params;

      this.initData(watchlistId);
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

  initData(watchlistId: string) {
    this.watchlistService.getOne(watchlistId).subscribe({
      next: (res) => {
        this.id = res.data.id;
        this.imageUrl = res.data.imageUrl;
        this.itemsCount = res.data.itemsCount;
        this.createdAt = res.data.createdAt;
        this.modifiedAt = res.data.modifiedAt;
        this.movies = res.data.movies;
        this.private = res.data.private;
        this.title = res.data.title;
        this.dataSource.data = this.movies;

        this.movieStatusControls = this.fb.array(
          this.movies.map((movie) => new FormControl(movie.status))
        );

        this.subscribeToStatusChange();
      },
    });
  }

  subscribeToStatusChange() {
    this.movieStatusControls.valueChanges.subscribe((statuses) => {
      statuses.forEach((status: any, index: number) => {
        const movie = this.movies[index];
        const previousStatus = movie.status;

        if (movie.status !== status) {
          this.watchlistService
            .changeMovieStatus({
              watchlistId: this.id,
              movieId: movie.movieId,
              status,
            })
            .subscribe({
              next: () => {
                this.notificationService.showSuccess('Changed movie status');
              },
              error: () => {
                this.getStatusFormControl(index).setValue(previousStatus);
                throw new AppError('Failed to change movie status');
              },
            });
        }
      });
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
          this.initData(this.id);
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

  getStatusFormControl(i: number) {
    return this.movieStatusControls.at(i) as FormControl;
  }
}
