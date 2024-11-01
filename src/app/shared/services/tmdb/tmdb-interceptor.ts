import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const { tmdbBearer, tmdbUrl } = environment;

@Injectable()
export class TmdbInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let clone = req;

    if (req.url.startsWith(tmdbUrl)) {
      let newHeaders = req.headers.set('Authorization', `Bearer ${tmdbBearer}`);
      newHeaders = newHeaders.set('Accept', 'application/json');

      clone = req.clone({ headers: newHeaders });
    }

    return next.handle(clone);
  }
}
