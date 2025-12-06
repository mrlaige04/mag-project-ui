import {Component, DestroyRef, inject} from '@angular/core';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {RouterLink} from '@angular/router';
import {LabeledInput} from '../../../components/forms';
import {AuthService} from '../../../services/auth/auth-service';
import {BasePage} from '../../../components/common/base-page/base-page';
import {LoginRequest} from '../../../modeles/auth/LoginRequest';
import {ReactiveFormsModule, Validators} from '@angular/forms';
import {finalize, take, tap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {AccessToken} from '../../../modeles/auth/AccessToken';

@Component({
  selector: 'app-login',
  imports: [
    Button,
    InputText,
    Password,
    RouterLink,
    LabeledInput,
    ReactiveFormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login extends BasePage {
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  public form = this.fb.group({
    phone: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
    twoFactorCode: this.fb.control('')
  });

  public submit() {
    this.isLoading.set(true);
    this.authService.login(this.form.value as LoginRequest).pipe(
      tap(async res => {
        const fa = res as { require2fa: boolean };
        if (fa.require2fa) {


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
  }
}
