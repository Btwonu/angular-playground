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
  yearGt: number | undefined;
  yearLt: number | undefined;
  ratingGt: number | undefined;
  ratingLt: number | undefined;
  runtimeGt: number | undefined;
  runtimeLt: number | undefined;
  votesGt: number | undefined;
  votesLt: number | undefined;
  genres: string[] | undefined;
}
