import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideRouter, RouterModule } from '@angular/router';
import { routes } from './app/app.routes';  // Import the routes file

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withFetch()),
    provideHttpClient(),
    appConfig.providers,
    provideRouter(routes)  // Configure routes with RouterModule
  ]
}).catch((err) => console.error(err));
