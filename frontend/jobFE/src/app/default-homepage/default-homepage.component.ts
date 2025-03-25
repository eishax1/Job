import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-default-homepage',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './default-homepage.component.html',
  styleUrl: './default-homepage.component.css'
})
export class DefaultHomepageComponent {
  

}
