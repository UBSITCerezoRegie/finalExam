import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const managerGuard: CanActivateFn = () => {

  const router = inject(Router);

  if (localStorage.getItem('managerLoggedIn') === 'true') {
    return true;
  }

  router.navigate(['/manager-login']);

  return false;

};