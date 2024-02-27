import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimations(), provideToastr({
    timeOut: 3000, // Time in milliseconds until toast disappears
    closeButton: true, // Display close button
    progressBar: true, // Show progress bar
    positionClass: 'toast-top-right' // Customize position
  }), {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            'your-google-client-id'
          )
        }
      ],
      onError: (error: any) => {
        console.error(error);
      }
    }
  }]
};
