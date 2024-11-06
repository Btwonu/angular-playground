import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateWatchlistFormComponent } from '../create-watchlist-form/create-watchlist-form.component';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  dialogRef: MatDialogRef<CreateWatchlistFormComponent> | null = null;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  openDialog() {
    this.dialogRef = this.dialog.open(CreateWatchlistFormComponent);
  }

  createNewWatchlist() {}
}
