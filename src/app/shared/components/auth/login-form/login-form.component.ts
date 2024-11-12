import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginRequest } from 'src/app/types/auth';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { AppError } from 'src/app/shared/utils/error';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public dialogRef: MatDialogRef<LoginFormComponent>
  ) {
    this.loginForm = this.initForm();
  }

  ngOnInit(): void {}

  initForm() {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    const data: LoginRequest = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };

    if (this.loginForm.valid) {
      this.authService.login(data).subscribe({
        next: () => {
          this.dialogRef.close();
        },
        error: () => {
          throw new AppError("Couldn't log in");
        },
      });
    }
  }
}
