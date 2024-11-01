export interface Movie {
  movie_id: string;
  title: string;
  start_year: number;
  runtime_minutes: number;
  rating: number;
  votes_count: number;
  genres: string[];
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
  data: Genre[]
}
