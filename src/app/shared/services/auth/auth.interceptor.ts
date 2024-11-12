import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUrl = environment.api.base;

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const authToken = localStorage.getItem('authToken');

    if (req.url.startsWith(apiUrl) && authToken) {
      console.log({ authToken });

      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`),
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}
