import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from '../login-form/login-form.component';
import { RegisterFormComponent } from '../register-form/register-form.component';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatTabsModule, LoginFormComponent, RegisterFormComponent],
  selector: 'app-auth-tabs',
  templateUrl: './auth-tabs.component.html',
  styleUrls: ['./auth-tabs.component.scss'],
})
export class AuthTabsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
