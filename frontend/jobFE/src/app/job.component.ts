import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WebService } from './services/web.service';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'job',
  standalone: true,
  imports: [RouterOutlet, RouterModule, HttpClientModule, NavbarComponent, CommonModule, FormsModule],
  providers: [WebService],
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent {
  job_list: any[] = [];
  page: number = 1;
  limit: number = 10;
  employment_type: string = '';  
  seniority_level: string = '';  

  seniorityLevels: string[] = [
    'Associate',
    'Director',
    'Entry level',
    'Entry-level',
    'Internship',
    'Mid-Senior level',
    'Not Applicable',
    'entry level',
  ];

  constructor(public dataService: WebService) {}

  ngOnInit() {
    this.loadJobs();
  }

  // Function to load jobs with applied filters
  loadJobs() {
    this.dataService.getJobs(this.page, this.limit, this.employment_type, this.seniority_level).subscribe({
      next: (data: any) => {
        this.job_list = data; // Assuming the API response is an array of jobs
      },
      error: (err) => {
        console.error('Failed to load jobs:', err);
      }
    });
  }

  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.loadJobs();
    }
  }

  nextPage() {
    if (this.page < this.dataService.getLastPageNumber()) {
      this.page++;
      this.loadJobs();
    }
  }

  // Track jobs by ID (assuming _id field)
  trackByJob(index: number, job: any): string {
    return job._id?.$oid || index;
  }

  // Function to apply filters and reload jobs
  applyFilters() {
    this.page = 1; // Reset to first page when applying filters
    this.loadJobs();
  }
}
