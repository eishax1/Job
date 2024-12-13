import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router, @Inject(PLATFORM_ID) private platformId: Object) {}

  canActivate(): boolean {
    // Check if the code is running in the browser
    if (isPlatformBrowser(this.platformId)) {
      const role = localStorage.getItem('role');

      if (role === 'recruiter') {
        return true; // Allow access to the route
      } else {
        // Redirect to the user dashboard if the role isn't 'recruiter'
        this.router.navigate(['/job']);
        return false;
      }
    } else {
      // SSR environment: prevent access or take necessary action
      // You can choose to handle SSR case differently, for now we just return false.
      return false;
    }
  }
}
