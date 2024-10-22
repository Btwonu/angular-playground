import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WatchlistsComponent } from './watchlists.component';
import { WatchlistDashboardComponent } from './watchlist-dashboard/watchlist-dashboard.component';
import { WatchlistListComponent } from './watchlist-list/watchlist-list.component';

const routes: Routes = [
  {
    path: '',
    component: WatchlistsComponent,
    children: [
      {
        path: 'list',
        component: WatchlistListComponent,
      },
      {
        path: 'dashboard',
        component: WatchlistDashboardComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WatchlistsRoutingModule {}
