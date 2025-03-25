import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object,
  private router:Router ) {}

  login(username: string, password: string) {
    const authHeader = 'Basic ' + btoa(username + ':' + password);
    const headers = { Authorization: authHeader };
    return this.http.post("http://localhost:5000/api/v1.0/login", {}, { headers });
  }

  isLoggedIn(): boolean {
    // Ensure we're running in the browser before accessing localStorage
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      return !!token;  // Returns true if token exists, otherwise false
    }
    // Return false if the platform is not a browser
    return false;
  }

  getUserRole(): string {
    // Ensure we're running in the browser before accessing localStorage
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('role') || 'user';
    }
    return 'user';  // Default role if SSR or platform is not browser
  }

  logout(): void {
    // Ensure we're running in the browser before accessing localStorage
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    }
    this.router.navigate(['/login']);
  }
}
