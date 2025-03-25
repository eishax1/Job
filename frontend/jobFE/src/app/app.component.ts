import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { JobComponent } from './job.component';
import { NavbarComponent } from './navbar/navbar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JobComponent, NavbarComponent, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'jobFE';
}
