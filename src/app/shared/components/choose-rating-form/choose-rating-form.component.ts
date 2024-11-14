import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { range } from 'src/app/shared/utils/functions';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovieService } from '../../services/movie/movie.service';
import { Movie } from 'src/app/types/movie';

@Component({
  selector: 'app-choose-rating-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './choose-rating-form.component.html',
  styleUrls: ['./choose-rating-form.component.scss'],
})
export class ChooseRatingFormComponent implements OnInit {
  @Output() ratingUpdated = new EventEmitter<any>();
  movieId = '';
  movieTitle = '';
  movieYear: number;
  movieRating: number;
  minRating = 1;
  maxRating = 10;
  ratingArr = range(this.minRating, this.maxRating);
  isHighlighted = this.ratingArr.map(() => false);

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dialogData: {
      movieId: string;
      movieTitle: string;
      movieYear: number;
      movieRating: number;
    },
    private movieService: MovieService
  ) {
    this.movieId = this.dialogData.movieId;
    this.movieTitle = this.dialogData.movieTitle;
    this.movieYear = this.dialogData.movieYear;
    this.movieRating = this.dialogData.movieRating;
  }

  ngOnInit(): void {
    this.isHighlighted = this.isHighlighted.map((_, i) =>
      Boolean(this.movieRating && i + 1 <= this.movieRating)
    );
  }

  highlightPreviousSiblings(index: number) {
    this.isHighlighted = this.isHighlighted.map((_, i) => i <= index);
  }

  removeHighlight() {
    if (this.movieRating) {
      this.isHighlighted = this.isHighlighted.map(
        (_, i) => i < this.movieRating
      );
      return;
    }

    this.isHighlighted = this.isHighlighted.map(() => false);
  }

  rateMovie(rating: number) {
    this.movieService.rateMovie({ movieId: this.movieId, rating }).subscribe({
      next: (res: Movie) => {
        this.movieRating = res.userRating!;
        this.ratingUpdated.emit(res);
      },
    });
  }
}
