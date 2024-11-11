import { ErrorHandler, inject, Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { TmdbInterceptor } from './shared/services/tmdb/tmdb-interceptor';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { AppErrorHandler } from './shared/services/errors/error-handler';
import { HttpErrorInterceptor } from './shared/services/errors/http-error-interceptor';
import { AuthInterceptor } from './shared/services/auth/auth.interceptor';
import { MatCardAvatar, MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatSnackBarModule,
    FormsModule,
    HeaderComponent,
    FooterComponent,
    MatCardModule,
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: TmdbInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
