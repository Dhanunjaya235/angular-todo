import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './user.service';
import { ToasterService } from './toaster.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { isPlatformBrowser } from '@angular/common';

export const canActivateRouteGuard: CanActivateFn = (route, state) => {
  const platform = inject(PLATFORM_ID);
  const user = inject(UserService);
  const router = inject(Router);
  const toater = inject(ToasterService);
  const helper = new JwtHelperService();


  if (isPlatformBrowser(platform)) {
    const token = localStorage?.getItem('accessToken');

    if (token && !helper.isTokenExpired(token)) {
      const email = helper.decodeToken(token);
      user.setUsername(email.userId);
      user.setJWTToken(token);
      return true;
    }
    localStorage.removeItem('accessToken');
    user.setJWTToken('');
    user.setUsername('');
    toater.infoToaster('Navigated To Login Page', 'Session Expired')
    router.navigate(['/login'])
    return false;
  }

  return false;

};  
