import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../../services/auth/auth-service';
import {jwtDecode} from 'jwt-decode';

export const isAdminGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    await router.navigate(['auth', 'login']);
    return false;
  }

  const token = authService.accessToken();
  if (!token || !token.accessToken) {
    await router.navigate(['auth', 'login']);
    return false;
  }

  const payload = jwtDecode(token.accessToken);
  const role = (payload as any)['role'];

  if (role !== 'admin') {
    await router.navigate(['auth', 'login']);
    return false;
  }

  return true;
};
