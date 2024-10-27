import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { WatchlistService } from '../../services/watchlist/watchlist.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatButtonModule, MatSelectModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  constructor(private watchlistService: WatchlistService) {}

  ngOnInit(): void {}

  // addWatchlist() {
  //   this.watchlistService.addToWatchlist(); // TODO: pass movie id
  // }
}
