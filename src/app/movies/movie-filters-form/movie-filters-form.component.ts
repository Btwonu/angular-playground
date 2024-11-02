import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, pipe } from 'rxjs';
import { MovieService } from 'src/app/shared/services/movie/movie.service';
import {
  FiltrationParams,
  Genre,
  FiltrationValidationResponse,
} from 'src/app/types/movies';

Validators.min(0);
Validators.max(0);

@Component({
  selector: 'app-movie-filters-form',
  templateUrl: './movie-filters-form.component.html',
  styleUrls: ['./movie-filters-form.component.scss'],
})
export class MovieFiltersFormComponent implements OnInit {
  @Output() filterMovies = new EventEmitter<Partial<FiltrationParams>>();

  formModel!: FormGroup;
  genres: Genre[] = [];

  constructor(private movieService: MovieService) {
    this.movieService.getFiltrationValidationValues().subscribe({
      next: (res) => {
        res.filters.year.min;
        res.filters.year.max;

        this.formModel = this.getForm(res);
        this.addGenresToForm();
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {},
    });
  }

  getForm(validations: FiltrationValidationResponse) {
    const { filters } = validations;

    return new FormGroup({
      year: new FormGroup({
        yearGt: new FormControl('', [
          Validators.min(filters.year.min),
          Validators.max(filters.year.max),
        ]),
        yearLt: new FormControl('', [
          Validators.min(filters.year.min),
          Validators.max(filters.year.max),
        ]),
      }),
      rating: new FormGroup({
        ratingGt: new FormControl('', [
          Validators.min(filters.rating.min),
          Validators.max(filters.rating.max),
        ]),
        ratingLt: new FormControl('', [
          Validators.min(filters.rating.min),
          Validators.max(filters.rating.max),
        ]),
      }),
      runtime: new FormGroup({
        runtimeGt: new FormControl('', [
          Validators.min(filters.runtime.min),
          Validators.max(filters.runtime.max),
        ]),
        runtimeLt: new FormControl('', [
          Validators.min(filters.runtime.min),
          Validators.max(filters.runtime.max),
        ]),
      }),
      votes: new FormGroup({
        votesGt: new FormControl('', [
          Validators.min(filters.votes.min),
          Validators.max(filters.votes.max),
        ]),
        votesLt: new FormControl('', [
          Validators.min(filters.votes.min),
          Validators.max(filters.votes.max),
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
    this.onFormChange();
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
