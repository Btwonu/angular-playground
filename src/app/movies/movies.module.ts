import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesComponent } from './movies.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesListComponent } from './list/movies-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

console.log('movies module');

@NgModule({
  declarations: [MoviesComponent, MoviesListComponent, MovieDetailComponent],
  imports: [CommonModule, MoviesRoutingModule],
})
export class MoviesModule {}
