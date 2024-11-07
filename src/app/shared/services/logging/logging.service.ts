import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface ErrorLog {
  message?: string;
  stack?: string;
  date?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class LoggingService {
  constructor(private http: HttpClient) {}

  errorLog: Partial<ErrorLog> = {};

  logError(message: string, stack: string): void {
    this.errorLog.message = message;
    this.errorLog.stack = stack;
    this.errorLog.date = new Date();

    this.http.post('https://movies.api/errors', this.errorLog).subscribe();
  }
}
