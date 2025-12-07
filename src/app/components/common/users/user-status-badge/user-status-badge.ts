import {Component, computed, input} from '@angular/core';
import {User, UserStatus} from '../../../../modeles/users/User';
import {Tag} from 'primeng/tag';

@Component({
  selector: 'app-user-status-badge',
  imports: [Tag],
  template: `
    @if (statusStyle()) {
      <p-tag [severity]="statusStyle().severity">{{ user()?.status }}</p-tag>
    }
  `
})
export class UserStatusBadge {
  public user = input.required<User>();

  private statusMap: Record<string, StatusBadgeStyle> = {
    'active': { severity: 'success' },
    'blocked': { severity: 'error' },
    'unverified': { severity: 'warn' },
  };

  public statusStyle = computed(() => this.statusMap[this.user().status]);
}

type StatusBadgeStyle = {
  severity: any;
};
