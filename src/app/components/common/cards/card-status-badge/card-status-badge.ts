import {Component, computed, input} from '@angular/core';
import {UserCard} from '../../../../modeles/cards/Card';
import {Tag} from 'primeng/tag';

@Component({
  selector: 'app-card-status-badge',
  imports: [Tag],
  template: `
    @if (statusStyle()) {
      <p-tag [severity]="statusStyle().severity">{{ card()?.status }}</p-tag>
    }
  `
})
export class CardStatusBadge {
  public card = input.required<UserCard>();

  private statusMap: Record<string, StatusBadgeStyle> = {
    'active': { severity: 'info' },
    'blocked': { severity: 'warn' },
    'closed': { severity: 'error' },
  };

  public statusStyle = computed(() => this.statusMap[this.card().status]);
}

type StatusBadgeStyle = {
  severity: any;
};
