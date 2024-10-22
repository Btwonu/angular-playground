import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {
    console.log(this.snackBar);
  }

  showError(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['notification-error'],
    });
  }

  showSuccess(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['notification-success'],
    });
  }
}
