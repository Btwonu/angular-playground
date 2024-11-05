import { Component, OnInit } from '@angular/core';
import { WatchlistService } from 'src/app/shared/services/watchlist/watchlist.service';
import { Watchlist } from 'src/app/types/watchlist';

@Component({
  selector: 'app-watchlist-list',
  templateUrl: './watchlist-list.component.html',
  styleUrls: ['./watchlist-list.component.scss']
})
export class WatchlistListComponent implements OnInit {
  watchlists: Watchlist[] = [];

  constructor(private watchlistService: WatchlistService) {
    this.watchlistService.getUserWatchlists().subscribe((res) => {
      this.watchlists = res.data;
    });
  }

  ngOnInit(): void {
  }
}
