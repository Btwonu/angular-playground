import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
      username: new FormControl(''),
    });

    this.yearGt = this.formModel?.get('year.yearGt')?.value;
  }

  ngOnInit(): void {
    this.formModel.valueChanges.subscribe((value) => {
      const {
        year: { yearGt, yearLt },
      } = value;

      this.filterMovies.emit({
        yearGt: yearGt || undefined,
        yearLt: yearLt || undefined,
      });
    });
  }

  onSubmit() {
    console.log(this.formModel.value);
    this.yearGt = this.formModel?.get('year.yearGt')?.value;
  }
}
