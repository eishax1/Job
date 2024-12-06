import { Component } from '@angular/core';
import { RouterOutlet,RouterModule } from '@angular/router';
import { AuthButtonComponent } from "./authbutton.component";
import { AuthService } from '@auth0/auth0-angular';

@Component({
    selector: 'navigation',
    standalone: true,
    imports: [RouterOutlet, RouterModule, AuthButtonComponent],
    templateUrl: './nav.component.html'
})
export class NavComponent { 
    constructor(public _auth:AuthService){}
}