import { Component, Input, OnInit } from '@angular/core';

type Movie = {
  movie_id: string;
  title: string;
  start_year: number;
  runtime_minutes: number;
  rating: number;
  votes_count: number;
  genres: string[];
}

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
}
