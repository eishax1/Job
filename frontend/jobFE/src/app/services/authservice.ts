import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  getHeaders() {
    const token = localStorage.getItem('auth_token');
    let headers = new HttpHeaders();

    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  // Example of a protected API request
  getProtectedData() {
    const headers = this.getHeaders();
    return this.http.get('http://localhost:5000/api/v1.0/protected', { headers });
  }
}
