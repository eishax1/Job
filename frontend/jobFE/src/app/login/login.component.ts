import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import * as jwt_decode from 'jwt-decode';
import { NavbarComponent } from '../navbar/navbar.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NavbarComponent]
})
export class LoginComponent {
  logiObj: any = {
    Username: "", 
    Password: ""   
  };

  http = inject(HttpClient);

  onLogin() {
    const username = this.logiObj.EmailId;
    const password = this.logiObj.Password;
  
    // Basic Authentication: Construct the base64-encoded authorization string
    const authHeader = 'Basic ' + btoa(username + ':' + password);
  
    const headers = new HttpHeaders({
      'Authorization': authHeader  
    });
  
    this.http.post("http://localhost:5000/api/v1.0/login", {}, { headers }).subscribe(
      (res: any) => {
        console.log('Response from backend:', res);  
    
        if (res.message && res.message.includes('Welcome back')) {
          alert("Login Success: " + res.message);
    
          
          const token = res['token created'];  
          console.log('Token:', token);  
    
          if (token) {
            const tokenType = typeof token;
            console.log('Token type:', tokenType);  
    
            if (tokenType === 'string') {
              try {
                const decodedToken: any = jwt_decode.jwtDecode(token);
                console.log('Decoded Token:', decodedToken);  
                const userRole = decodedToken.role;
                console.log('Decoded Role:', userRole);  
                localStorage.setItem('role', userRole);
                localStorage.setItem('user_id', decodedToken.user_id);
              } catch (error) {
                console.error('Error decoding token:', error);
                alert('Error: Invalid token format.');
              }
            } else {
              console.error('Token is not a string:', token);
              alert('Error: Invalid token received.');
            }
          } else {
            console.error('Token not found in response.');
            alert('Error: No token received from backend.');
          }
        } else {
          alert(res.message);  
        }
      },
      (error) => {
        alert("Error: " + error.message);
      }
    );
  }}    