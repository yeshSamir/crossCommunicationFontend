import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  private excludedUrls: string[] = [
    'http://localhost:8082/profile', // Exclude this base URL
    'http://localhost:8082/auth',
  ];

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const shouldExclude = this.excludedUrls.some((url) => req.url.startsWith(url));

    if (shouldExclude) {
      console.log("Exclude Request: "+req.url);
      // Forward the request without adding the Authorization header
      return next.handle(req);
    }
    const token = sessionStorage.getItem('authToken');
    if (token) {
      const clonedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return next.handle(clonedReq);
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token expired or invalid
          this.authService.logout();
          this.router.navigate(['/login']);
        }
        return throwError(() => error);
      })
    );
  }
}
