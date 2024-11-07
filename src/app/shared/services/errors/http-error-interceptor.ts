import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { AppError } from '../../utils/error';
import { Router } from '@angular/router';
import { LoggingService } from '../logging/logging.service';

const clientErrorMessages: { [key: string]: string } = {
  '400': 'The request was invalid. Please check your input and try again.',
  '401': 'You are not authorized. Please log in to continue.',
  '403': 'You do not have permission to access this resource.',
  '405': 'The action you attempted is not allowed.',
  '429': 'You have made too many requests. Please try again later.',
};

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap({
        error: this.handleError.bind(this),
      })
    );
  }

  handleError(error: HttpErrorResponse) {
    const status = error?.status?.toString();
    let errorMessage = 'An unknown error occurred';

    if (status.startsWith('4')) {
      if (status === '404') {
        this.router.navigate(['/404']);
        return;
      } else if (status === '418') {
        errorMessage = error.message;
      } else {
        errorMessage =
          clientErrorMessages[status] || 'A client-side error occurred.';
      }
    } else if (status.startsWith('5')) {
      errorMessage =
        'There was an issue with our servers, please try again later.';
    }

    throw new AppError(errorMessage);
  }
}
