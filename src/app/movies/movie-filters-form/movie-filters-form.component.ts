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
      year: new FormControl(
        [this.year.min, this.year.max],
        [Validators.min(this.rating.min), Validators.max(this.rating.max)]
      ),
      rating: new FormControl(
        [this.rating.min, this.rating.max],
        [Validators.min(this.rating.min), Validators.max(this.rating.max)]
      ),
      runtime: new FormControl(
        [this.runtime.min, this.runtime.max],
        [Validators.min(this.runtime.min), Validators.max(this.runtime.max)]
      ),
      votes: new FormControl(
        [this.votes.min, this.votes.max],
        [Validators.min(this.votes.min), Validators.max(this.votes.max)]
      ),
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
        console.log('this.formModel', this.formModel);

        Object.keys(this.formModel.controls).forEach((key) => {
          console.log(`${key} is valid:`, this.formModel.controls[key].valid);
        });

        const {
          year: [yearGt, yearLt],
          rating: [ratingGt, ratingLt],
          runtime: [runtimeGt, runtimeLt],
          votes: [votesGt, votesLt],
          genres,
        } = value;

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

  onChange(event: any) {
    console.log(event);
  }

  onMinYearChange(event: any) {
    const { value } = event.target;
    this.formModel
      .get('year')
      ?.setValue([parseInt(value), this.formModel.get('year')?.value[1]]);
  }

  onMaxYearChange(event: any) {
    const { value } = event.target;
    this.formModel
      .get('year')
      ?.setValue([this.formModel.get('year')?.value[0], parseInt(value)]);
  }
}
