import {Component, input} from '@angular/core';
import {Payment} from '../../../../modeles/payments/Payment';
import {UserCard} from '../../../../modeles/cards/Card';
import {Card} from 'primeng/card';
import {CardNumberPipe} from '../../../../utils/pipes/card-number-pipe';
import {PaymentsStatusBadge} from '../payments-status-badge/payments-status-badge';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-payment-list-item',
  imports: [
    Card,
    CardNumberPipe,
    PaymentsStatusBadge,
    DatePipe
  ],
  templateUrl: './payment-list-item.html',
  styleUrl: './payment-list-item.scss',
})
export class PaymentListItem {
  public transaction = input.required<Payment>();
  public cards = input<UserCard[]>([]);

  public showSenderNumber = input<boolean>(true);
  public showReceiverNumber = input<boolean>(true);

  public isOutcomingPayment(payment: Payment) {
    return this.cards().some(c => c.cardNumber === payment.senderCardNumber);
  }

  public isIncomingPayment(payment: Payment) {
    return this.cards().some(c => c.cardNumber === payment.receiverCardNumber);
  }
}
