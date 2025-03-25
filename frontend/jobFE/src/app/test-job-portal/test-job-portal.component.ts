import { Component } from '@angular/core';
import { WebService } from '../services/web.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-job-portal',
  standalone: true,
  providers: [WebService],
  templateUrl: './test-job-portal.component.html',
  styleUrl: './test-job-portal.component.css'
})
export class TestJobPortalComponent {
  test_output: string[] = [];
  constructor(private webService: WebService) {}

}
