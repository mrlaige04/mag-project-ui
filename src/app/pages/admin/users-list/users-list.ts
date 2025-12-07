import {Component, DestroyRef, inject, NgZone, OnInit, signal} from '@angular/core';
import {BasePage} from '../../../components/common/base-page/base-page';
import {UserService} from '../../../services/user/user-service';
import {User} from '../../../modeles/users/User';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {finalize, tap} from 'rxjs';
import {TableModule} from 'primeng/table';
import {DatePipe} from '@angular/common';
import {Button} from 'primeng/button';
import {UserStatusBadge} from '../../../components/common/users/user-status-badge/user-status-badge';
import {ConfirmPopup} from 'primeng/confirmpopup';
import {ConfirmationService} from 'primeng/api';
import {Avatar} from 'primeng/avatar';

@Component({
  selector: 'app-users-list',
  imports: [
    TableModule,
    DatePipe,
    Button,
    UserStatusBadge,
    ConfirmPopup,
    Avatar
  ],
  templateUrl: './users-list.html',
  styleUrl: './users-list.scss',
})
export class UsersList extends BasePage implements OnInit {
  private usersService = inject(UserService);
  private destroyRef = inject(DestroyRef);
  private confirmationService = inject(ConfirmationService);

  public users = signal<User[]>([]);

  public ngOnInit() {
    this.loadUsers();
  }

  public isUserAdmin(user: User) {
    return user.role === 'admin';
  }

  private loadUsers() {
    this.isLoading.set(true);
    this.usersService.getUsers().pipe(
      tap(users => {
        this.users.set(users);
      }),
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.isLoading.set(false))
    ).subscribe();
  }

  public deleteUser(id: string, event: Event) {
    this.confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: 'Are you sure you want to delete this user?',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Cancel'
      },
      acceptButtonProps: {
        label: 'Yes',
        severity: 'danger'
      },
      accept: () => {
        this.isLoading.set(true);
        this.usersService.deleteUser(id).pipe(
          tap(user => {
            if (user) {
              this.loadUsers();
            }
          }),
          takeUntilDestroyed(this.destroyRef),
          finalize(() => this.isLoading.set(false))
        ).subscribe();
      }
    })
  }

  public getAvatarLabel(user: User) {
    const fullName = user?.fullName ?? 'User';
    const names = fullName.split(' ');
    return names.map(n => n.slice(0,1)).join('');
  }
}
