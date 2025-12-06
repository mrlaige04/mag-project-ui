import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {UserService} from '../../services/user/user-service';
import {AuthService} from '../../services/auth/auth-service';
import {catchError, of, switchMap} from 'rxjs';
import {UserStatus} from '../../modeles/users/User';

export const userVerifiedGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);

  if (!authService.isAuthenticated() || !authService.accessToken()) {
    return false;
  }

  const currentUserService = inject(UserService);
  const router = inject(Router);

  return currentUserService.loadCurrentUser(authService.accessToken()!).pipe(
    catchError((err) => of(null)),
    switchMap((user) => {
      if (user && user.status === UserStatus.active) {
        return of(true);
      }

      return of(router.createUrlTree(['auth', 'verification']));
    })
  );
};
