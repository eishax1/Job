import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { JobComponent } from './job.component';
import { singleJobComponent } from './singleJob.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

export const routes: Routes = [
    {
    path: '',
    component: HomeComponent
    },
    {
    path: 'job',
    component: JobComponent
    },
    {
        path: 'job/:id',
        component: singleJobComponent
        },
    {path: 'login',
        component:LoginComponent
    },
    {path:'sign-up',
        component:SignUpComponent
    }
    ];
