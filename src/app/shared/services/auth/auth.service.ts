import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shareReplay, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface RegisterRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register() {
    return this.http
      .post<RegisterRequest>('https://movies.api/auth/register', {
        email: 'btwonu@mail.com',
        password: 'password',
      })
      .pipe(tap(this.setSession), tap(this.setUser), shareReplay(1));
  }

  private setSession(res: any) {
    localStorage.setItem('authToken', res.token);
  }

  private setUser(res: any) {
    const decoded = jwtDecode(res.token);
    localStorage.setItem('user', JSON.stringify(decoded));
  }
}
