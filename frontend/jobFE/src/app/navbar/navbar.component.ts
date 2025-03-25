import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../services/authservice';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [NavbarComponent, CommonModule],
  standalone: true,

})
export class NavbarComponent {
  constructor(private authService: AuthService) {}

  isUserLoggedIn(): boolean {
    // Check if the user is logged in (e.g., check localStorage, sessionStorage, or via a service)
    return this.authService.isLoggedIn();
  }

  isRecruiter(): boolean {
    // Check if the logged-in user is a recruiter
    return this.authService.getUserRole() === 'Recruiter';
  }

  logout(): void {
    // Handle the logout logic, for example clearing tokens and redirecting
    this.authService.logout();
  }
}