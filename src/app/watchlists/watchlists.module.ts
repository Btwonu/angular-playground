import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchlistsComponent } from './watchlists.component';
import { WatchlistsRoutingModule } from './watchlists-routing.module';
import { WatchlistDashboardComponent } from './watchlist-dashboard/watchlist-dashboard.component';
import { WatchlistListComponent } from './watchlist-list/watchlist-list.component';

console.log('watchlists module');

@NgModule({
  declarations: [WatchlistsComponent, WatchlistDashboardComponent, WatchlistListComponent],
  imports: [CommonModule, WatchlistsRoutingModule],
})
export class WatchlistsModule {}
