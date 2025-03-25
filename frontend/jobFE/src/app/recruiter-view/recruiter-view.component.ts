import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from '../services/job.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-recruiter-view',
  standalone: true,
  imports: [ NavbarComponent, FormsModule, CommonModule],
  templateUrl: './recruiter-view.component.html',
  styleUrl: './recruiter-view.component.css'
})
export class RecruiterViewComponent implements OnInit {
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
        this.fetchJobs(); // Refresh job listings
      },
      (error) => {
        this.errorMessage = error.error.message || 'Failed to add the job.';
      }
    );
  }

  startEditing(job: any) {
    this.editingJob = { ...job };
  }

  updateJob() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.errorMessage = 'Authentication token is missing!';
      return;
    }

    this.jobService.updateJob(this.editingJob._id, this.editingJob, token).subscribe(
      (response) => {
        this.successMessage = 'Job updated successfully!';
        this.fetchJobs();
        this.editingJob = null;
      },
      (error) => {
        this.errorMessage = error.error.message || 'Failed to update the job.';
      }
    );
  }

  deleteJob(jobId: string) {
    const token = localStorage.getItem('token');
    if (!token) {
      this.errorMessage = 'Authentication token is missing!';
      return;
    }

    this.jobService.deleteJob(jobId, token).subscribe(
      (response) => {
        this.successMessage = 'Job deleted successfully!';
        this.fetchJobs();
      },
      (error) => {
        this.errorMessage = error.error.message || 'Failed to delete the job.';
      }
    );
  }

  cancelEditing() {
    this.editingJob = null;
  }
  
}
