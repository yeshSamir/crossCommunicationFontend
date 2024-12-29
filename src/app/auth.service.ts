// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper = new JwtHelperService();
  private isAuthenticated = new BehaviorSubject<boolean>(false);

  constructor() {
    this.checkToken();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;
    return this.jwtHelper.isTokenExpired(token);
  }

  checkToken() {
    const token = this.getToken();
    if (token && !this.isTokenExpired()) {
      this.isAuthenticated.next(true);
    } else {
      this.logout();
    }
  }

  logout() {
    sessionStorage.removeItem('token');
    this.isAuthenticated.next(false);
  }

  isLoggedIn() {
    return this.isAuthenticated.asObservable();
  }
}
