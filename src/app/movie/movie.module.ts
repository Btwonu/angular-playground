import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieRoutingModule } from './movie-routing.module';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { MovieComponent } from './movie/movie.component';
import { MoviePaginationComponent } from './movie-pagination/movie-pagination.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormComponent } from '../shared/components/form/form.component';
import { DialogComponent } from '../shared/components/dialog/dialog.component';
import { MovieFiltersFormComponent } from './movie-filters-form/movie-filters-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TmdbService } from '../shared/services/tmdb/tmdb.service';
import { MatSliderModule } from '@angular/material/slider';
import { NouisliderModule } from 'ng2-nouislider';
import { RangeSliderComponent } from '../shared/components/range-slider/range-slider.component';
import { SidebarComponent } from '../shared/components/sidebar/sidebar.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ChooseWatchlistFormComponent } from './choose-watchlist-form/choose-watchlist-form.component';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

console.log('movies module');

@NgModule({
  providers: [TmdbService],
  declarations: [
    MovieListComponent,
    MovieDetailComponent,
    MovieComponent,
    MoviePaginationComponent,
    MovieFiltersFormComponent,
    ChooseWatchlistFormComponent,
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    MatSliderModule,
    NouisliderModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatCardModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    RangeSliderComponent,
    SidebarComponent,
    FormComponent,
    DialogComponent,
  ],
})
export class MovieModule {}
