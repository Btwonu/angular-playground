import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from './movies.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesListComponent } from './movie-list/movies-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { DashboardComponent } from './movie-dashboard/dashboard.component';
import { MovieComponent } from './movie/movie.component';

console.log('movies module');

@NgModule({
  declarations: [MoviesComponent, MoviesListComponent, MovieDetailComponent, DashboardComponent, MovieComponent],
  imports: [CommonModule, MoviesRoutingModule],
})
export class MoviesModule {}
