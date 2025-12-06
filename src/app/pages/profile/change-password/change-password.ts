import {Component, DestroyRef, inject} from '@angular/core';
import {Card} from 'primeng/card';
import {BasePage} from '../../../components/common/base-page/base-page';
import {UserService} from '../../../services/user/user-service';
import {ReactiveFormsModule, Validators} from '@angular/forms';
import {Button} from 'primeng/button';
import {LabeledInput} from '../../../components/forms';
import {Password} from 'primeng/password';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {tap} from 'rxjs';
import {CustomValidators} from '../../../utils/validators/custom-validators';

@Component({
  selector: 'app-change-password',
  imports: [
    Card,
    ReactiveFormsModule,
    Button,
    LabeledInput,
    Password
  ],
  templateUrl: './change-password.html',
  styleUrl: './change-password.scss',
})
export class ChangePassword extends BasePage {
  private currentUserService = inject(UserService);
  private userService = inject(UserService);
  private destroyRef = inject(DestroyRef);

  private currentUser = this.currentUserService.currentUser;

  public form = this.fb.group({
    password: this.fb.control('', [Validators.required]),
    confirmPassword: this.fb.control('', [
      Validators.required,
      CustomValidators.Match('password')
    ]),
  });

  public submit() {
    if (!this.form.valid) {
      return;
    }

    this.userService.update(this.currentUser()!.id, {
      password: this.form.value.password!
    }).pipe(
      tap(() => {
        this.form.reset();
      }),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe();
  }
}
