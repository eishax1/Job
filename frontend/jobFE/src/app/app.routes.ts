import { Routes } from '@angular/router';
import { JobComponent } from './job.component';
import { singleJobComponent } from './singleJob.component';
import { LoginComponent } from './login/login.component';
import { RecruiterViewComponent } from './recruiter-view/recruiter-view.component';

import { TestJobPortalComponent } from './test-job-portal/test-job-portal.component';
import { DefaultHomepageComponent } from './default-homepage/default-homepage.component';
import { RecruiterAuthGuard } from './guards/role.guard';
import { AddJobComponent } from './recruiter-view/add-job/add-job/add-job.component';

export const routes: Routes = [
    {
    path: '',
    component: DefaultHomepageComponent
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
    
    {
        path: 'recruiter-view',
        component:RecruiterViewComponent,
        canActivate: [RecruiterAuthGuard],
    },
    {
        path: 'app-add-job',
        component:AddJobComponent,
        canActivate: [RecruiterAuthGuard],
    },
    {
        path: 'test',
        component: TestJobPortalComponent
        }

    ];

