import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { JobService } from '../../../services/job.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../../navbar/navbar.component';

@Component({
  selector: 'app-add-job',
  standalone: true,
  imports: [FormsModule, NavbarComponent, CommonModule, RouterModule],
  templateUrl: './add-job.component.html',
  styleUrl: './add-job.component.css'
})
export class AddJobComponent {
  jobs: any[] = [];
  editingJob: any = null;
  successMessage: string = '';
  errorMessage: string = '';
  page: number = 1;
  limit: number = 10;
    // New job model for the "Add Job" form
    newJob: any = {
      job_title: '',
      company_name: '',
      seniority_level: '',
      posted_date: '',
      employment_type: '',
      job_description: ''
    };

  constructor(
    public jobService: JobService, 
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.fetchJobs();
    }
  }

  fetchJobs() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.errorMessage = 'Authentication token is missing!';
      return;
    }

    this.jobService.getJobsByRecruiter(token).subscribe(
      (response) => {
        this.jobs = response;
      },
      (error) => {
        this.errorMessage = error.error.message || 'Failed to fetch job listings.';
      }
    );
  }
  
  addJob() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.errorMessage = 'Authentication token is missing!';
      return;
    }

    this.jobService.addJob(this.newJob, token).subscribe(
      (response) => {
        this.successMessage = 'Job added successfully!';
        this.newJob = {
          job_title: '',
          company_name: '',
          seniority_level: '',
          posted_date: '',
          employment_type: '',
          job_description: ''
        }; // Reset the form
        // Show success message
        this.successMessage = 'Job successfully added!';
        this.fetchJobs(); // Refresh job listings
        // Hide the message after a few seconds
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
        
      },
      (error) => {
        this.errorMessage = error.error.message || 'Failed to add the job.';
      }
    );
  }
  
  
}
