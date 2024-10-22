import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from './movies.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesListComponent } from './movie-list/movies-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { DashboardComponent } from './movie-dashboard/dashboard.component';
import { MovieComponent } from './movie/movie.component';
import { MoviePaginationComponent } from './movie-pagination/movie-pagination.component';

import { MatPaginatorModule } from '@angular/material/paginator';

console.log('movies module');

@NgModule({
  declarations: [
    MoviesComponent,
    MoviesListComponent,
    MovieDetailComponent,
    DashboardComponent,
    MovieComponent,
    MoviePaginationComponent,
  ],
  imports: [CommonModule, MoviesRoutingModule, MatPaginatorModule],
})
export class MoviesModule {}
