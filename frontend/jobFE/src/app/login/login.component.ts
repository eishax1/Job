import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import * as jwt_decode from 'jwt-decode';
import { AuthService } from '../services/authservice';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NavbarComponent]
})
export class LoginComponent {
  logiObj: any = { Username: "", Password: "" };

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    debugger;
    const { Username, Password } = this.logiObj;

    if (!Username || !Password) {
      alert('Please enter both email and password.');
      return;
    }

    this.authService.login(Username, Password).subscribe(
      (res: any) => {
        if (res.message?.includes('Welcome back')) {
          alert("Login Success: " + res.message);
          const token = res['token created'];
     

          try {

            const decodedToken: any = jwt_decode.jwtDecode(token);
            const role = decodedToken.role;
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);
            localStorage.setItem('user_id', decodedToken.user_id);

            // Redirect based on role
            if (role === 'Recruiter') {
              this.router.navigateByUrl('recruiter-view');
            } else {
              this.router.navigate(['/user-dashboard']);
            }
          } catch (error) {
            alert('Error decoding token.');
          }
        } else {
          alert(res.message);
        }
      },
      (error) => {
        alert("Error: " + error.message);
      }
    );
  }
}
