import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'http://localhost:5000/api/v1.0/jobs';
  private recruiterJobsUrl = 'http://localhost:5000/api/v1.0/recruiter/jobs';
  public lastPageNumber = 100;

  constructor(private http: HttpClient) {}

  addJob(jobData: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-access-token': token
    });

    const formData = new FormData();
    for (const key in jobData) {
      if (Array.isArray(jobData[key])) {
        jobData[key].forEach((value: string) => formData.append(`${key}[]`, value));
      } else {
        formData.append(key, jobData[key]);
      }
    }

    return this.http.post(this.apiUrl, formData, { headers });
  }

  getJobsByRecruiter(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-access-token': token
    });
    return this.http.get(this.recruiterJobsUrl, { headers });
  }

  updateJob(jobId: string, jobData: any, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-access-token': token
    });

    const formData = new FormData();
    for (const key in jobData) {
      if (Array.isArray(jobData[key])) {
        jobData[key].forEach((value: string) => formData.append(`${key}[]`, value));
      } else {
        formData.append(key, jobData[key]);
      }
    }

    return this.http.put(`${this.apiUrl}/${jobId}`, formData, { headers });
  }

  deleteJob(jobId: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'x-access-token': token
    });
    return this.http.delete(`${this.apiUrl}/${jobId}`, { headers });
  }
  getLastPageNumber(): number {
    return this.lastPageNumber;
  }
}
