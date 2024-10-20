import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchlistComponent } from './watchlist.component';

console.log('watchlist module');


@NgModule({
  declarations: [
    WatchlistComponent
  ],
  imports: [
    CommonModule
  ]
})
export class WatchlistModule { }
