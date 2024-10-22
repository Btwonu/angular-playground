import { Component, OnInit } from '@angular/core';

import movies from '../../../db/movies';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {
  movies = movies;

  constructor() { }

  ngOnInit(): void {
  }

}
