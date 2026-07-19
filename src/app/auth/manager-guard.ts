import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
export const managerGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (localStorage.getItem('managerLoggedIn') === 'true') {
    return true;
  }

  router.navigate(['/manager-login']);
  return false;
};