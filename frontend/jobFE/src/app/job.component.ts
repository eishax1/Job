import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WebService } from './services/web.service';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';


@Component({
  selector: 'job',
  standalone: true,
  imports: [RouterOutlet, RouterModule,HttpClientModule, NavbarComponent, CommonModule ],
  providers: [WebService],
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent {
  job_list: any[] = [];
  page: number = 1;
  limit: number = 10;

  constructor(public dataService: WebService) {}

  ngOnInit() {
    this.loadJobs();
  }

  loadJobs() {
    this.dataService.getJobs(this.page, this.limit).subscribe({
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
  trackByJob(index: number, job: any): string {
    return job._id?.$oid || index;
  }
  
}
