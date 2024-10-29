import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { WatchlistService } from '../../services/watchlist/watchlist.service';
import { NotificationService } from '../../services/notifications/notification.service';
import { CreateWatchlist } from 'src/app/types/watchlist';

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
export class FormComponent implements OnInit, AfterViewInit {
  @ViewChild('addToWatchlistForm') form!: NgForm;
  @ViewChild('status') status!: NgModel;
  @ViewChild('watchlist') watchlist!: NgModel;
  @Input('movieId') movieId: string | undefined;

  statuses: string[] = ['Plan to Watch', 'Watching', 'Watched'];
  ratings: number[] = range(1, 10);
  watchlists: { id: string; title: string }[] = [];
  currentWatchlist: string = '';
  currentStatus: string = '';
  currentRating: number | string = '';

  constructor(
    private watchlistService: WatchlistService,
    private NotificationService: NotificationService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.watchlistService.getUserWatchlists().subscribe((res) => {
      this.watchlists = res.data;
    });
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  onSubmit() {
    console.log('Submit');

    if (this.form.invalid) {
      this.NotificationService.showError(
        'Please fill out the required form fields'
      );
      return;
    }

    if (!this.movieId) {
      this.NotificationService.showError('Movie id missing');
    }

    const data = {
      movieId: this.movieId,
      watchlistId: this.form.value.watchlist,
      status: this.form.value.status,
      rating: this.form.value.rating,
    } as CreateWatchlist;

    console.log(`Valid: ${this.form.valid}`);
    console.log(this.form.value);

    const observer = {
      next: (res: any) => {
        this.NotificationService.showSuccess('Movie added to watchlist');
      },
      error: (err: any) => {
        this.NotificationService.showError(err.message);
      },
    };

    this.watchlistService.addToWatchlist(data).subscribe(observer);
  }
}
