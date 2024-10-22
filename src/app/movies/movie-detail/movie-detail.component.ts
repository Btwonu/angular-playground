import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/shared/services/movie/movie.service';
import { Movie } from 'src/app/types/movies';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  movie: Movie | null = null;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) {}

  ngOnInit(): void {
    console.log(this.route);

    this.route.params.subscribe((params) => {
      this.movieService.getOne(params['id']).subscribe((movie) => {
        this.movie = movie;
      });
    });
  }
}
