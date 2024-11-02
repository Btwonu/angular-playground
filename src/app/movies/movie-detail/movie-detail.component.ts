import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/shared/services/movie/movie.service';
import { TmdbService } from 'src/app/shared/services/tmdb/tmdb.service';
import { Movie } from 'src/app/types/movies';
import { environment } from 'src/environments/environment';

const {
  tmdbImageUrl,
  youtube: { embed },
} = environment;

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  tmdbId!: number;
  movie: Movie | null = null;
  description = '';
  imageUrl = '';
  youtubeEmbedUrl = embed;
  youtubeTrailerEmbedUrl: SafeResourceUrl = '';

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private tmdbService: TmdbService,
    private domSanitizer: DomSanitizer
  ) {}

  private isValidYouTubeKey(key: string): boolean {
    const YOUTUBE_KEY_REGEX = /^[a-zA-Z0-9_-]{11}$/;
    return YOUTUBE_KEY_REGEX.test(key);
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const { id: imdbId } = params;

      this.tmdbService.getMovieByImdbId(imdbId).subscribe((res) => {
        const movie = res['movie_results'][0];

        this.tmdbId = movie.id;
        this.description = movie.overview;
        this.imageUrl = `${tmdbImageUrl}${movie.poster_path}`;

        console.log({ movie });
      });

      this.movieService.getOne(imdbId).subscribe((movie) => {
        this.movie = movie;
      });
    });
  }

  showTrailer() {
    this.movieService.getTrailer(this.tmdbId).subscribe((res) => {
      const youtubeVideos = res.results?.filter(
        (video) => video.site === 'YouTube'
      );

      if (youtubeVideos?.length) {
        const { key } = youtubeVideos[0];

        if (!this.isValidYouTubeKey(key)) {
          throw new Error('Invalid YouTube key');
        }

        this.youtubeTrailerEmbedUrl =
          this.domSanitizer.bypassSecurityTrustResourceUrl(
            `${this.youtubeEmbedUrl}/${key}`
          );
      }
    });
  }
}
