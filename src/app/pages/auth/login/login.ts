import {Component, DestroyRef, inject, signal} from '@angular/core';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {RouterLink} from '@angular/router';
import {LabeledInput} from '../../../components/forms';
import {AuthService} from '../../../services/auth/auth-service';
import {BasePage} from '../../../components/common/base-page/base-page';
import {LoginRequest} from '../../../modeles/auth/LoginRequest';
import {ReactiveFormsModule, Validators} from '@angular/forms';
import {catchError, finalize, of, take, tap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {AccessToken} from '../../../modeles/auth/AccessToken';
import {Message} from 'primeng/message';
import {HttpErrorResponse} from '@angular/common/http';
import {ApiError} from '../../../modeles/ApiError';

enum LoginStep {
  PhonePassword,
  TwoFactorCode
}

@Component({
  selector: 'app-login',
  imports: [
    Button,
    InputText,
    Password,
    RouterLink,
    LabeledInput,
    ReactiveFormsModule,
    Message
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login extends BasePage {
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  public state = signal<LoginStep>(LoginStep.PhonePassword);
  private userId = signal<string | null>(null);

  public apiError = signal<ApiError | null>(null);

  public form = this.fb.group({
    phone: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
    twoFactorCode: this.fb.control('')
  });

  public submit() {
    if (!this.form.valid) {
      return;
    }

    this.isLoading.set(true);
    this.apiError.set(null);

    if (this.state() === LoginStep.PhonePassword) {
      this.authService.login(this.form.value as LoginRequest).pipe(
        catchError((err: HttpErrorResponse) => {
          const error = err.error as ApiError;
          this.apiError.set(error);
          return of(null);
        }),
        tap(async res => {
          const fa = res as { require2fa: boolean, userId: string; };
          if (fa.require2fa && fa.userId) {
            this.state.set(LoginStep.TwoFactorCode);
            this.userId.set(fa.userId);

            return;
          }

          const accessToken = res as AccessToken;
          if (accessToken && accessToken.accessToken) {
            await this.router.navigate(['dashboard']);
          }
        }),
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isLoading.set(false))
      ).subscribe();
    } else {
      this.authService.verify2fa(this.userId()!, this.form.value.twoFactorCode!).pipe(
        tap(async res => {
          const accessToken = res as AccessToken;
          if (accessToken && accessToken.accessToken) {
            console.log('redirect')
            await this.router.navigate(['dashboard']);
          }
        }),
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.isLoading.set(false))
      ).subscribe();
    }
  }

  public get phoneErrorMessage() {
    const control = this.form.get('phone');
    if (!control || control.untouched) {
      return null;
    }

    if (control.hasError('required')) {
      return 'Phone is required';
    }

    return null;
  }

  public get passwordErrorMessage() {
    const control = this.form.get('password');
    if (!control || control.untouched) {
      return null;
    }

    if (control.hasError('required')) {
      return 'Password is required';
    }

    return null;
  }

  protected readonly LoginStep = LoginStep;
}
