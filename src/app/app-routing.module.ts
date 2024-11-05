import { NgModule } from '@angular/core';
import { RouterModule, Routes, Resolve } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
    pathMatch: 'full',
  },
  {
    path: 'movies',
    loadChildren: () =>
      import('./movie/movie.module').then((m) => m.MovieModule),
  },
  {
    path: 'watchlists',
    loadChildren: () =>
      import('./watchlist/watchlist.module').then((m) => m.WatchlistModule),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
