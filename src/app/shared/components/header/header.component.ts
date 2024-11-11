import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user$ = this.authService.user$;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  logout() {
    console.log('logout');
    this.authService.logout();
  }

  login() {
    console.log('login');
    this.authService.login().subscribe({
      next: (res) => {
        console.log('logged in');

        console.log(res);
      },
    });
  }
}
