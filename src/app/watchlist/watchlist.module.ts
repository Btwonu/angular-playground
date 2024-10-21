import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchlistComponent } from './watchlist.component';
import { WatchlistRoutingModule } from './watchlist-routing.module';
import { WatchlistDashboardComponent } from './watchlist-dashboard/watchlist-dashboard.component';
import { WatchlistListComponent } from './watchlist-list/watchlist-list.component';

console.log('watchlist module');

@NgModule({
  declarations: [WatchlistComponent, WatchlistDashboardComponent, WatchlistListComponent],
  imports: [CommonModule, WatchlistRoutingModule],
})
export class WatchlistModule {}
