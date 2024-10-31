import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, pipe } from 'rxjs';
import { MovieService } from 'src/app/shared/services/movie/movie.service';
import { FiltrationParams } from 'src/app/types/movies';

@Component({
  selector: 'app-movie-filters-form',
  templateUrl: './movie-filters-form.component.html',
  styleUrls: ['./movie-filters-form.component.scss'],
})
export class MovieFiltersFormComponent implements OnInit {
  @Output() filterMovies = new EventEmitter<Partial<FiltrationParams>>();

  formModel: FormGroup;
  yearGt: string;

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
    });

    this.yearGt = this.formModel?.get('year.yearGt')?.value;
  }

  ngOnInit(): void {
    this.formModel.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        const {
          year: { yearGt, yearLt },
          rating: { ratingGt, ratingLt },
          runtime: { runtimeGt, runtimeLt },
          votes: { votesGt, votesLt },
        } = value;

        this.filterMovies.emit({
          yearGt: yearGt || undefined,
          yearLt: yearLt || undefined,
          ratingGt: ratingGt || undefined,
          ratingLt: ratingLt || undefined,
          runtimeGt: runtimeGt || undefined,
          runtimeLt: runtimeLt || undefined,
          votesGt: votesGt || undefined,
          votesLt: votesLt || undefined,
        });
      });
  }
}
