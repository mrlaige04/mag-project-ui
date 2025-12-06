import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BasePage} from '../../../components/common/base-page/base-page';
import {CardService} from '../../../services/cards/card-service';
import {Card} from 'primeng/card';
import {catchError, of, switchMap, take, tap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {UserCard} from '../../../modeles/cards/Card';
import {DatePipe} from '@angular/common';
import {CardNumberPipe} from '../../../utils/pipes/card-number-pipe';
import {ExpiryPipe} from '../../../utils/pipes/expiry-pipe';
import {PaymentService} from '../../../services/payments/payment-service';
import {Payment} from '../../../modeles/payments/Payment';

@Component({
  selector: 'app-card-details',
  imports: [
    Card,
    DatePipe,
    CardNumberPipe,
    ExpiryPipe
  ],
  templateUrl: './card-details.html',
  styleUrl: './card-details.scss',
})
export class CardDetails extends BasePage implements OnInit {
  private destroyRef = inject(DestroyRef);

  private route = inject(ActivatedRoute);
  private cardService = inject(CardService);
  private paymentsService = inject(PaymentService);
  private cardId = this.route.snapshot.params['id'];

  public card = signal<UserCard | null>(null);
  public payments = signal<Payment[]>([]);

  public ngOnInit() {
    this.cardService.getById(this.cardId).pipe(
      catchError((err) => of(null)),
      tap(card => {
        if (card) {
          this.card.set(card);
        }
      }),
      switchMap(card => this.paymentsService.getPaymentsForCard(card!.cardNumber)),
      tap(payments => {
        this.payments.set(payments);
      }),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe();
  }
}
