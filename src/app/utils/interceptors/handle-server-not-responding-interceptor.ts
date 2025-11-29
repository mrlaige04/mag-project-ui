import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {ToastService} from '../../services/common/toast-service';
import {catchError, throwError} from 'rxjs';

export const handleServerNotRespondingInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(ToastService);

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 0) {
        notificationService.showError('Server Error', 'Currently server is not responding...');
      }

      return throwError(() => err);
    })
  );
};
