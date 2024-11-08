import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WatchlistListComponent } from './watchlist-list/watchlist-list.component';
import { WatchlistDetailComponent } from './watchlist-detail/watchlist-detail.component';

const routes: Routes = [
  {
    path: '',
    component: WatchlistListComponent,
  },
  {
    path: ':id',
    component: WatchlistDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WatchlistRoutingModule {}
