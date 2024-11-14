import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateListFormComponent } from '../create-list-form/create-list-form.component';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  dialogRef: MatDialogRef<CreateListFormComponent> | null = null;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  openDialog() {
    this.dialogRef = this.dialog.open(CreateListFormComponent);
  }

  createNewList() {}
}
