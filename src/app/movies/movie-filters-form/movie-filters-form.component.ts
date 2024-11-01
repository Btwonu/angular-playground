import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { debounceTime, distinctUntilChanged, pipe } from 'rxjs';
import { MovieService } from 'src/app/shared/services/movie/movie.service';
import { FiltrationParams, Genre } from 'src/app/types/movies';

@Component({
  selector: 'app-movie-filters-form',
  templateUrl: './movie-filters-form.component.html',
  styleUrls: ['./movie-filters-form.component.scss'],
})
export class MovieFiltersFormComponent implements OnInit {
  @Output() filterMovies = new EventEmitter<Partial<FiltrationParams>>();

  formModel: FormGroup;
  yearGt: string;
  genres: Genre[] = [];

  constructor(private movieService: MovieService) {
    this.formModel = new FormGroup({
      year: new FormGroup({
        yearGt: new FormControl(''),
        yearLt: new FormControl(''),
      }),
      rating: new FormGroup({
        ratingGt: new FormControl(''),
        ratingLt: new FormControl(''),
      }),
      runtime: new FormGroup({
        runtimeGt: new FormControl(''),
        runtimeLt: new FormControl(''),
      }),
      votes: new FormGroup({
        votesGt: new FormControl(''),
        votesLt: new FormControl(''),
      }),
      genres: new FormGroup({}),
    });

    this.yearGt = this.formModel?.get('year.yearGt')?.value;
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
