import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthTabsComponent } from '../auth/auth-tabs/auth-tabs.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user$ = this.authService.user$;

  constructor(private authService: AuthService, public dialog: MatDialog) {}

  ngOnInit(): void {}

  logout() {
    console.log('logout');
    this.authService.logout();
  }

  login() {
    this.dialog.open(AuthTabsComponent);
    console.log('login');
  }
}
