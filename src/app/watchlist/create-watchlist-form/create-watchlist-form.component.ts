import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { WatchlistService } from 'src/app/shared/services/watchlist/watchlist.service';

@Component({
  selector: 'app-create-watchlist-form',
  templateUrl: './create-watchlist-form.component.html',
  styleUrls: ['./create-watchlist-form.component.scss']
})
export class CreateWatchlistFormComponent implements OnInit {
  form = this.fb.group({
    title: ['', Validators.required],
    description: [''],
    visibility: ['private', Validators.required]
  });
  changes!: Subscription;

  constructor(private watchlistService: WatchlistService, private fb: FormBuilder) { }

  ngOnInit(): void {
    console.log(this.form);

    this.changes = this.form.valueChanges.subscribe(console.log);
  }

  ngOnDestroy(): void {
    console.log('unsubscribe from create-watchlist changes');

    this.changes.unsubscribe();
  }

  get title() {
    return this.form.get('title');
  }

  onSubmit() {
    const { value } = this.form;

    Object.keys(this.form.controls).forEach((key) => {
      console.log(`${key} is valid:`, this.form.controls[key as keyof typeof this.form.controls].valid);
    });
  }
}
