export interface TmdbMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  media_type: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TmdbFindByIdResponse {
  movie_results: TmdbMovie[];
  person_results: any[];
  tv_results: any[];
  tv_episode_results: any[];
  tv_season_results: any[];
}

export interface TmdbVideo {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
}

export interface TmdbVideosResponse {
  id: number;
  results: TmdbVideo[];
}
