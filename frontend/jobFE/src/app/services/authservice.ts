import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {}

  login(username: string, password: string) {
    const authHeader = 'Basic ' + btoa(username + ':' + password);
    const headers = { Authorization: authHeader };
    return this.http.post("http://localhost:5000/api/v1.0/login", {}, { headers });
  }

  isLoggedIn(): boolean {
    // Check if the platform is a browser
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      return !!token;  // Returns true if token exists, otherwise false
    }
    // Return false if the platform is not a browser
    return false;
  }

  getUserRole(): string {
    // Retrieve the role of the logged-in user (this could come from a JWT or API call)
    return localStorage.getItem('role') || 'user';
  }

  logout(): void {
    // Clear session data and log out
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    // You can also navigate the user to the login page after logout
  }
}

