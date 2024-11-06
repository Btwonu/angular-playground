import { Component, Input, OnInit } from '@angular/core';
import { Watchlist } from 'src/app/types/watchlist';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss']
})
export class WatchlistComponent implements OnInit {
  @Input() watchlist!: Watchlist;

  constructor() { }

  ngOnInit(): void {
  }
}
