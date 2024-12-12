import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,

})
export class NavbarComponent {
  isAdmin = false;
  isRecruiter = false;
  isUser = false;



  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    window.location.href = '/login'; // Redirect to login page after logout
  }
}
