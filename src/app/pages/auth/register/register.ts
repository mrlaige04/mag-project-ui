import {Component, DestroyRef, inject, NgZone} from '@angular/core';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {RouterLink} from '@angular/router';
import {LabeledInput} from '../../../components/forms';
import {BasePage} from '../../../components/common/base-page/base-page';
import {AuthService} from '../../../services/auth/auth-service';
import {ReactiveFormsModule, Validators} from '@angular/forms';
import {RegisterRequest} from '../../../modeles/auth/RegisterRequest';
import {DatePicker} from 'primeng/datepicker';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {catchError, finalize, of, tap} from 'rxjs';
import {CustomValidators} from '../../../utils/validators/custom-validators';

@Component({
  selector: 'app-register',
  imports: [
    Button,
    InputText,
    Password,
    RouterLink,
    LabeledInput,
    DatePicker,
    ReactiveFormsModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register extends BasePage {
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  public form = this.fb.group({
    fullName: this.fb.control('', [Validators.required]),
    email: this.fb.control('', [Validators.required, Validators.email]),
    phone: this.fb.control('', [Validators.required]),
    dateOfBirth: this.fb.control(new Date(), [Validators.required]),
    password: this.fb.control('', [Validators.required]),
    confirmPassword: this.fb.control('', [Validators.required, CustomValidators.Match('password')])
  });

  public register() {
    if (!this.form.valid) {
      return;
    }

    this.isLoading.set(true);
    this.authService.register(this.form.value as RegisterRequest).pipe(
      catchError(() => of(null)),
      tap(async res => {
        if (res) {
          await this.router.navigate(['verification']);
        }
      }),
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.isLoading.set(false))
    ).subscribe();
  }
}
