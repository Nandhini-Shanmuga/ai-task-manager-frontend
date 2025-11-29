import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
 const router = inject(Router);

  const sessionToken = localStorage.getItem('sessionToken');

  if (sessionToken) {
    return true; // Allow access if session_token exists
  }
  router.navigate(['/']);

  return false;
};
