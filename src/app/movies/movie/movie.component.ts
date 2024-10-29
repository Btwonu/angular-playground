import { Component, Input, OnInit } from '@angular/core';
import { WatchlistService } from 'src/app/shared/services/watchlist/watchlist.service';
import { Movie } from 'src/app/types/movies';
import { NotificationService } from 'src/app/shared/services/notifications/notification.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  @Input() movie: Movie | null = null;

  ngOnInit(): void {}
}
