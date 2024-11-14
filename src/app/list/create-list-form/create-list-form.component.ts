import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ListService } from 'src/app/shared/services/list/list.service';
import { CreateListRequest } from 'src/app/types/list';

@Component({
  selector: 'app-create-list-form',
  templateUrl: './create-list-form.component.html',
  styleUrls: ['./create-list-form.component.scss'],
})
export class CreateListFormComponent implements OnInit {
  form = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    visibility: ['private', Validators.required],
  });

  constructor(
    private listService: ListService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {}

  get title() {
    return this.form.get('title');
  }

  isVisibility(value: any): value is 'private' | 'public' {
    return value === 'private' || value === 'public';
  }

  onSubmit() {
    const data: Partial<CreateListRequest> = {
      title: this.form.get('title')?.value ?? undefined,
      description: this.form.get('description')?.value ?? undefined,
      visibility: this.form.get('visibility')?.value as 'private' | 'public',
    };

    Object.keys(this.form.controls).forEach((key) => {
      console.log(
        `${key} is valid:`,
        this.form.controls[key as keyof typeof this.form.controls].valid
      );
    });

    if (this.form.valid) {
      this.listService.createList(data).subscribe({
        next: (res) => {
          console.log('next res', res);
        },
        error: (error: HttpErrorResponse) => {
          if (error.status === 0) {
            console.log('client-side network error', error);
          } else {
            console.log('server-side error', error);
          }
        },
      });
    }
  }
}
