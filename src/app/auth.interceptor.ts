import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {

  private excludedUrls: string[] = [
    'http://localhost:8082/profile', // Exclude this base URL
    'http://localhost:8082/auth',    // Exclude this base URL
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
        },
      });
      return next.handle(clonedReq);
    }
    return next.handle(req);
  }
}
