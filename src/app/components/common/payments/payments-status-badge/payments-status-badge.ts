import {Component, computed, input} from '@angular/core';
import {Payment} from '../../../../modeles/payments/Payment';
import {Tag} from 'primeng/tag';

@Component({
  selector: 'app-payments-status-badge',
  imports: [
    Tag
  ],
  template: `
    @if (statusStyle()) {
      <p-tag [severity]="statusStyle().severity">{{ payment()?.status }}</p-tag>
    }
  `
})
export class PaymentsStatusBadge {
  public payment = input.required<Payment>();

  private statusMap: Record<string, PaymentStatusStyle> = {
    'pending': { severity: 'info' },
    'completed': { severity: 'success' },
    'failed': { severity: 'danger' },
  };

  public statusStyle = computed(() => this.statusMap[this.payment().status] as any);
}

type PaymentStatusStyle = {
  severity: string,
};
