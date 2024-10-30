export interface Movie {
  movie_id: string;
  title: string;
  start_year: number;
  runtime_minutes: number;
  rating: number;
  votes_count: number;
  genres: string[];
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
