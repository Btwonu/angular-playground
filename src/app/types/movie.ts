export enum MovieStatus {
  Watched = "watched",
  PlanToWatch = "plan to watch",
  Watching = "watching",
}

export interface Movie {
  movieId: string;
  title: string;
  startYear: number;
  runtimeMinutes: number;
  rating: number;
  votesCount: number;
  genres: string[];
  myRating: number | undefined;
  status: MovieStatus;
}

export interface MoviesResponse {
  data: Movie[];
  total_count: number;
  page: number;
  per_page: number;
  page_count: number;
  links: {
    self: string | null;
    prev: string | null;
    next: string | null;
    first: string | null;
    last: string | null;
  };
}

export interface FiltrationParams {
  [index: string]: number | string | string[];
  yearGt: number;
  yearLt: number;
  ratingGt: number;
  ratingLt: number;
  runtimeGt: number;
  runtimeLt: number;
  votesGt: number;
  votesLt: number;
  genres: string[];
}

export interface Genre {
  id: string;
  name: string;
}

export interface GenresResponse {
  data: Genre[];
}

export interface FiltrationValidationResponse {
  filters: {
    year: {
      min: number;
      max: number;
    };
    rating: {
      min: number;
      max: number;
    };
    runtime: {
      min: number;
      max: number;
    };
    votes: {
      min: number;
      max: number;
    };
  };
}

export interface UpdateMovieRatingRequest {
  movieId: string;
  rating: number;
}
