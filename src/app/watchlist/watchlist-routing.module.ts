import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WatchlistListComponent } from './watchlist-list/watchlist-list.component';

const routes: Routes = [
  {
    path: '',
    component: WatchlistListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WatchlistRoutingModule {}
