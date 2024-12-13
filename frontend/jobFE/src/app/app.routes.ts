import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { JobComponent } from './job.component';
import { singleJobComponent } from './singleJob.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RecruiterViewComponent } from './recruiter-view/recruiter-view.component';
import { RoleGuard } from './guards/role.guard';

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
        component: LoginComponent
    },
    {path:'sign-up',
        component: SignUpComponent
    },
    {
        path: 'recruiter-view',
        component:RecruiterViewComponent
    }

    ];

