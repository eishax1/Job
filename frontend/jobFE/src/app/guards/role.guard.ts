import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/authservice';


@Injectable({
  providedIn: 'root'
})
export class RecruiterAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    // Check if the user is logged in and has the 'recruiter' role
    if (this.authService.getUserRole() === 'Recruiter') {
      return true;  // Access allowed
    }

    // Redirect the user to login page if they are not logged in or not a recruiter
    this.router.navigate(['/job']);
    return false;  // Access denied
  }
}
