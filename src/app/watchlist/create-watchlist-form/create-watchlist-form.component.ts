import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { WatchlistService } from 'src/app/shared/services/watchlist/watchlist.service';
import { CreateWatchlistRequest } from 'src/app/types/watchlist';

@Component({
  selector: 'app-create-watchlist-form',
  templateUrl: './create-watchlist-form.component.html',
  styleUrls: ['./create-watchlist-form.component.scss'],
})
export class CreateWatchlistFormComponent implements OnInit {
  form = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    visibility: ['private', Validators.required],
  });

  constructor(
    private watchlistService: WatchlistService,
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
    const data: Partial<CreateWatchlistRequest> = {
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
      this.watchlistService.createWatchlist(data).subscribe({
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
