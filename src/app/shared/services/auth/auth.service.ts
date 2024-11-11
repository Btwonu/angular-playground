import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, shareReplay, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

interface RegisterRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<any>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser));
    }
  }

  register() {
    return this.http
      .post<RegisterRequest>('https://movies.api/auth/register', {
        email: 'btwonu@mail.com',
        password: 'password',
      })
      .pipe(
        tap(this.setToken.bind(this)),
        tap(this.setUser.bind(this)),
        shareReplay(1)
      );
  }

  login() {
    return this.http
      .post<RegisterRequest>('https://movies.api/auth/register', {
        email: 'btwonu@mail.com',
        password: 'password',
      })
      .pipe(
        tap(this.setToken.bind(this)),
        tap(this.setUser.bind(this)),
        shareReplay(1)
      );
  }

  private setToken(res: any) {
    console.log('setToken');

    localStorage.setItem('authToken', res.token);
  }

  private setUser(res: any) {
    console.log('setUser');

    const decoded = jwtDecode(res.token);
    console.log(this.userSubject);

    this.userSubject.next(decoded);
    localStorage.setItem('user', JSON.stringify(decoded));
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }
}
