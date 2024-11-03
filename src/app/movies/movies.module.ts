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
import { FormComponent } from '../shared/components/form/form.component';
import { DialogComponent } from '../shared/components/dialog/dialog.component';
import { MovieFiltersFormComponent } from './movie-filters-form/movie-filters-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TmdbService } from '../shared/services/tmdb/tmdb.service';
import { MatSliderModule } from '@angular/material/slider';
import { NouisliderModule } from 'ng2-nouislider';
import { RangeSliderComponent } from '../shared/components/range-slider/range-slider.component';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { MatExpansionModule } from '@angular/material/expansion';

console.log('movies module');

@NgModule({
  providers: [TmdbService],
  declarations: [
    MoviesComponent,
    MoviesListComponent,
    MovieDetailComponent,
    DashboardComponent,
    MovieComponent,
    MoviePaginationComponent,
    MovieFiltersFormComponent,
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatSliderModule,
    NouisliderModule,
    MatExpansionModule,
    RangeSliderComponent,
    SidebarComponent,
    FormComponent,
    DialogComponent,
  ],
})
export class MoviesModule {}
