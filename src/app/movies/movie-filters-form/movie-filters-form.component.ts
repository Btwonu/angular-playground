import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-movie-filters-form',
  templateUrl: './movie-filters-form.component.html',
  styleUrls: ['./movie-filters-form.component.scss'],
})
export class MovieFiltersFormComponent implements OnInit {
  formModel: FormGroup;

  constructor() {
    this.formModel = new FormGroup({
      year: new FormGroup({
        yearGt: new FormControl(''),
        yearLt: new FormControl(''),
      }),
      username: new FormControl(''),
    });
  }

  ngOnInit(): void {
    console.log(this.formModel);
  }

  onSubmit() {
    console.log(this.formModel.value);
  }
}
