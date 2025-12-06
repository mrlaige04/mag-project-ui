import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {Card} from 'primeng/card';
import {BasePage} from '../../../components/common/base-page/base-page';
import {UserService} from '../../../services/user/user-service';
import {ReactiveFormsModule, Validators} from '@angular/forms';
import {LabeledInput} from '../../../components/forms';
import {InputText} from 'primeng/inputtext';
import {Button} from 'primeng/button';
import {DatePicker} from 'primeng/datepicker';
import {UpdateUser} from '../../../modeles/users/UpdateUser';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {tap} from 'rxjs';
import {Tag} from 'primeng/tag';
import {UserStatus} from '../../../modeles/users/User';

@Component({
  selector: 'app-user-profile-info',
  imports: [
    Card,
    LabeledInput,
    InputText,
    ReactiveFormsModule,
    Button,
    DatePicker,
    Tag
  ],
  templateUrl: './user-profile-info.html',
  styleUrl: './user-profile-info.scss',
})
export class UserProfileInfo extends BasePage implements OnInit {
  private currentUserService = inject(UserService);
  private destroyRef = inject(DestroyRef);

  public currentUser = this.currentUserService.currentUser;

  public form = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    phone: this.fb.control('', [Validators.required]),
    fullName: this.fb.control(''),
    dateOfBirth: this.fb.control(new Date()),
    role: this.fb.control(''),
    status: this.fb.control(''),
  });

  public ngOnInit(): void {
    this.form.patchValue({
      email: this.currentUser()?.email,
      phone: this.currentUser()?.phone,
      fullName: this.currentUser()?.fullName,
      dateOfBirth: new Date(this.currentUser()?.dateOfBirth!),
      role: this.currentUser()?.role,
      status: this.currentUser()?.status
    });

    this.form.get('fullName')?.disable();
    this.form.get('dateOfBirth')?.disable();
    this.form.get('role')?.disable();
    this.form.get('status')?.disable();
  }

  public submit() {
    if (!this.form.valid) {
      return;
    }

    this.currentUserService.update(
      this.currentUser()?.id!,
      this.form.value as Partial<UpdateUser>
    ).pipe(
      tap(success => {
        this.toastService.showInfo('Profile updated successfully.');
      }),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe();
  }

  public get userStatusTagSeverity() {
    return (() => {
      switch (this.currentUser()?.status) {
        case UserStatus.active:
          return 'success';
        case UserStatus.unverified:
          return 'warning';
        case UserStatus.blocked:
          return 'error';
        default:
          return 'info';
      }
    })() as any;
  }

  protected readonly UserStatus = UserStatus;
}
