import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MoviesComponent } from "./movies.component";
import { MoviesListComponent } from "./list/movies-list.component";
import { MovieDetailComponent } from "./movie-detail/movie-detail.component";

const routes: Routes = [
  {
    path: '',
    component: MoviesComponent,
    pathMatch: 'full',
  },
  {
    path: ':id',
    component: MovieDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MoviesRoutingModule {}
