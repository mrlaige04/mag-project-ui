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
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required])
  });

  public submit() {
    this.isLoading.set(true);
    this.authService.login(this.form.value as LoginRequest).pipe(
      tap(),
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.isLoading.set(false))
    ).subscribe();
  }
}
