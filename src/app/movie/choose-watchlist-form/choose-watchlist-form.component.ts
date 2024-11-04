import {
  ChangeDetectorRef,
  Component,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';
import { WatchlistService } from 'src/app/shared/services/watchlist/watchlist.service';
import { CreateWatchlist } from 'src/app/types/watchlist';
import { range } from 'src/app/shared/utils/functions';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-choose-watchlist-form',
  templateUrl: './choose-watchlist-form.component.html',
  styleUrls: ['./choose-watchlist-form.component.scss'],
})
export class ChooseWatchlistFormComponent implements OnInit {
  @ViewChild('chooseWatchlistForm') form!: NgForm;
  @ViewChild('status') status!: NgModel;
  @ViewChild('watchlist') watchlist!: NgModel;

  statuses: string[] = ['Plan to Watch', 'Watching', 'Watched'];
  ratings: number[] = range(1, 10);
  watchlists: { id: string; title: string }[] = [];
  currentWatchlist: string = '';
  currentStatus: string = '';
  currentRating: number | string = '';
  movieId = '';

  constructor(
    private watchlistService: WatchlistService,
    private notificationService: NotificationService,
    private cd: ChangeDetectorRef,
    public dialogRef: MatDialogRef<ChooseWatchlistFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { movieId: string }
  ) {
    this.movieId = data.movieId;
  }

  ngOnInit(): void {
    this.watchlistService.getUserWatchlists().subscribe((res) => {
      this.watchlists = res.data;
    });
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }

  addToWatchlist() {
    console.log('Submit');

    if (this.form.invalid) {
      this.notificationService.showError(
        'Please fill out the required form fields'
      );
      return;
    }

    if (!this.movieId) {
      this.notificationService.showError('Movie id missing');
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
        this.notificationService.showSuccess('Movie added to watchlist');
        this.dialogRef.close();
      },
      error: (err: any) => {
        this.notificationService.showError(err.message);
      },
    };

    this.watchlistService.addToWatchlist(data).subscribe(observer);
  }

  createNewWatchlist() {
    console.log('Create new watchlist');
  }
}
