import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebService {
  private apiUrl = 'http://localhost:5000/api/v1.0/jobs'; 
  private lastPageNumber = 100; 

  constructor(private http: HttpClient) {}

  // to get all the vacancies in the database
  getJobs(page: number, limit: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('pn', page.toString())
      .set('limit', limit.toString());

    return this.http.get(this.apiUrl, { params });
  }
 
  //to get specific vacancies depending on the jobID
  getJobById(id: any) {
    return this.http.get<any>('http://localhost:5000/api/v1.0/jobs/'+id); 
  }

  getLastPageNumber(): number {
    return this.lastPageNumber;
  }
}
