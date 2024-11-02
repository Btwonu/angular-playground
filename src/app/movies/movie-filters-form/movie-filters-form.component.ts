import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, pipe } from 'rxjs';
import { MovieService } from 'src/app/shared/services/movie/movie.service';
import {
  FiltrationParams,
  Genre,
  FiltrationValidationResponse,
} from 'src/app/types/movies';

@Component({
  selector: 'app-movie-filters-form',
  templateUrl: './movie-filters-form.component.html',
  styleUrls: ['./movie-filters-form.component.scss'],
})
export class MovieFiltersFormComponent implements OnInit {
  @Output() filterMovies = new EventEmitter<Partial<FiltrationParams>>();

  formModel!: FormGroup;
  genres: Genre[] = [];
  year!: {
    min: number;
    max: number;
  };
  rating!: {
    min: number;
    max: number;
  };
  runtime!: {
    min: number;
    max: number;
  };
  votes!: {
    min: number;
    max: number;
  };
  yearLt!: number;
  yearGt!: number;
  ratingGt!: number;
  runtimeGt!: number;
  votesGt!: number;

  constructor(private movieService: MovieService) {}

  setValidationValues(validations: FiltrationValidationResponse) {
    const { filters } = validations;

    this.year = {
      min: filters.year.min,
      max: filters.year.max,
    };

    this.rating = {
      min: filters.rating.min,
      max: filters.rating.max,
    };

    this.runtime = {
      min: filters.runtime.min,
      max: 400,
    };

    this.votes = {
      min: filters.votes.min,
      max: filters.votes.max,
    };
  }

  initForm() {
    return new FormGroup({
      year: new FormGroup({
        yearGt: new FormControl('', [
          Validators.min(this.year.min),
          Validators.max(this.year.max),
        ]),
        yearLt: new FormControl('', [
          Validators.min(this.year.min),
          Validators.max(this.year.max),
        ]),
      }),
      rating: new FormGroup({
        ratingGt: new FormControl('', [
          Validators.min(this.rating.min),
          Validators.max(this.rating.max),
        ]),
        ratingLt: new FormControl('', [
          Validators.min(this.rating.min),
          Validators.max(this.rating.max),
        ]),
      }),
      runtime: new FormGroup({
        runtimeGt: new FormControl('', [
          Validators.min(this.runtime.min),
          Validators.max(this.runtime.max),
        ]),
        runtimeLt: new FormControl('', [
          Validators.min(this.runtime.min),
          Validators.max(this.runtime.max),
        ]),
      }),
      votes: new FormGroup({
        votesGt: new FormControl('', [
          Validators.min(this.votes.min),
          Validators.max(this.votes.max),
        ]),
        votesLt: new FormControl('', [
          Validators.min(this.votes.min),
          Validators.max(this.votes.max),
        ]),
      }),
      genres: new FormGroup({}),
    });
  }

  addGenresToForm() {
    this.movieService.getGenres().subscribe((res) => {
      this.genres = res.data;

      const genresGroup = this.formModel.controls['genres'] as FormGroup;

      for (const genre of this.genres) {
        genresGroup.addControl(genre.name, new FormControl(false));
      }
    });
  }

  ngOnInit(): void {
    this.movieService.getFiltrationValidationValues().subscribe({
      next: (res) => {
        this.setValidationValues(res);
        this.formModel = this.initForm();
        this.addGenresToForm();
        this.onFormChange();
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {},
    });
  }

  onFormChange() {
    this.formModel.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        Object.keys(this.formModel.controls).forEach((key) => {
          console.log(`${key} is valid:`, this.formModel.controls[key].valid);
        });

        const {
          year: { yearGt, yearLt },
          rating: { ratingGt, ratingLt },
          runtime: { runtimeGt, runtimeLt },
          votes: { votesGt, votesLt },
          genres,
        } = value;

        this.yearLt = yearLt;
        this.yearGt = yearGt;
        this.ratingGt = ratingGt;
        this.runtimeGt = runtimeGt;
        this.votesGt = votesGt;

        const truthyGenres = Object.keys(genres).filter((key) => genres[key]);

        this.filterMovies.emit({
          yearGt: yearGt || undefined,
          yearLt: yearLt || undefined,
          ratingGt: ratingGt || undefined,
          ratingLt: ratingLt || undefined,
          runtimeGt: runtimeGt || undefined,
          runtimeLt: runtimeLt || undefined,
          votesGt: votesGt || undefined,
          votesLt: votesLt || undefined,
          genres: truthyGenres.length ? truthyGenres : undefined,
        });
      });
  }

  getGenreId(genre: Genre) {
    return `genre-${genre.id}`;
  }
}
