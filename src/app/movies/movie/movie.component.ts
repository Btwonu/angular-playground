import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/types/movies';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  @Input() movie: Movie | null = null;

  constructor() { }

  ngOnInit(): void {
  }

  addToWatchlist(movieId: string | undefined) {
    if (!movieId) return;

    console.log(`Add ${movieId} to watchlist`);
  }
}
