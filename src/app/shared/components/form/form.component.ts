import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, NgForm } from '@angular/forms';
import { WatchlistService } from '../../services/watchlist/watchlist.service';

const range = (start: any, end: any) => {
  return [...Array(end).keys()].map((i: any) => i + start);
};

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  @ViewChild('addToWatchlistForm') form!: NgForm;

  constructor(private watchlistService: WatchlistService) {}

  username: string = 'Val';
  statuses: string[] = ['Plan to Watch', 'Watching', 'Watched'];
  ratings: number[] = range(1, 10);
  watchlists: { title: string }[] = [];
  currentStatus: string = this.statuses[0];
  currentRating: number | string = 'Unrated';

  ngOnInit(): void {
    this.watchlistService.getUserWatchlists().subscribe((res) => {
      this.watchlists = res.data;
    });
  }

  onSubmit() {
    console.log('Submit');
    console.log(this.form);
  }

  // addWatchlist() {
  //   this.watchlistService.addToWatchlist(); // TODO: pass movie id
  // }
}
