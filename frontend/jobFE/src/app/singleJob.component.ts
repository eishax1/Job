import { Component } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { DataService } from './data.service';
import { WebService } from './services/web.service';
import { NavbarComponent } from './navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';


@Component({
selector: 'singleJob',
standalone: true,
imports: [RouterOutlet, NavbarComponent, HttpClientModule],
providers: [WebService],
templateUrl: './singleJob.component.html',
styleUrl: './singleJob.component.css'
})
export class singleJobComponent {
    singlejob_list: any;
    constructor( private WebService: WebService,
        private route: ActivatedRoute) {}
    ngOnInit() {
        this.WebService.getJobById(
            this.route.snapshot.paramMap.get('id')
          ).subscribe((response: any) => {
            this.singlejob_list = [response];
          });
        }          }