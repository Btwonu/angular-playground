import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/shared/services/movie/movie.service';
import { TmdbService } from 'src/app/shared/services/tmdb/tmdb.service';
import { Movie } from 'src/app/types/movies';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  movie: Movie | null = null;
  description: string = '';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private tmdbService: TmdbService
  ) {
    this.tmdbService.getMovieByImdbId().subscribe((res) => {
      const movie = res['movie_results'][0];

      this.description = movie.overview;
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.movieService.getOne(params['id']).subscribe((movie) => {
        this.movie = movie;
      });
    });
  }
}
