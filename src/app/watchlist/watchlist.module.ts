import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchlistRoutingModule } from './watchlist-routing.module';
import { WatchlistListComponent } from './watchlist-list/watchlist-list.component';

console.log('watchlists module');

@NgModule({
  declarations: [ WatchlistListComponent],
  imports: [CommonModule, WatchlistRoutingModule],
})
export class WatchlistModule {}
