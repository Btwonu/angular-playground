import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WatchlistRoutingModule } from './watchlist-routing.module';
import { WatchlistListComponent } from './watchlist-list/watchlist-list.component';
import { MatCardModule } from '@angular/material/card';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { HeroComponent } from './hero/hero.component';
import { MatButtonModule } from '@angular/material/button';
import { CreateWatchlistFormComponent } from './create-watchlist-form/create-watchlist-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';

console.log('watchlists module');

@NgModule({
  declarations: [
    WatchlistListComponent,
    WatchlistComponent,
    HeroComponent,
    CreateWatchlistFormComponent,
  ],
  imports: [
    CommonModule,
    WatchlistRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
})
export class WatchlistModule {}
