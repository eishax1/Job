import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecruiterService {
  private baseUrl = 'http://localhost:5000/api/v1.0/jobs';

  constructor(private http: HttpClient) {}

  getJobs(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }



  updateJob(jobId: string, jobData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${jobId}`, jobData, {
      headers: { 'x-access-token': localStorage.getItem('token') || '' }
    });
  }

  deleteJob(jobId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${jobId}`, {
      headers: { 'x-access-token': localStorage.getItem('token') || '' }
    });
  }
}
