import { bootstrapApplication } from'@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideAuth0 } from '@auth0/auth0-angular';
import { provideHttpClient } from '@angular/common/http';
bootstrapApplication(AppComponent, {
  providers: [
    provideAuth0({
      domain: 'dev-58ozaqqmvdqelwz1.us.auth0.com',
      clientId: 'hBEb8c545dXnOPCinwuvgR2UbcD1FG24',
      authorizationParams: {
      redirect_uri: window.location.origin
}
}),
provideHttpClient(),
appConfig.providers
]
}).catch((err) => console.error(err));