import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {AuthService} from '../../services/auth/auth-service';
import {catchError, switchMap, throwError} from 'rxjs';

export const handleUnauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && !err.url?.includes('auth')) {
        const token = authService.accessToken();
        if (!token || !token.refreshToken) {
          authService.logout();
          return throwError(() => err);
        }

        return authService.refreshToken(token.refreshToken).pipe(
          catchError((refreshError) => {
            authService.logout();
            return throwError(() => refreshError);
          }),
          switchMap((newToken) => {
            if (newToken && newToken.accessToken) {
              authService.handleSuccessLogin(newToken);

              return next(req.clone({
                setHeaders: {
                  Authorization: `Bearer ${token.accessToken}`
                }
              }));
            } else {
              authService.logout();
              return throwError(() => err);
            }
          })
        );
      }

      return throwError(() => err);
    })
  );
};
