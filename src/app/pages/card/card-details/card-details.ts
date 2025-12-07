import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BasePage} from '../../../components/common/base-page/base-page';
import {CardService} from '../../../services/cards/card-service';
import {Card} from 'primeng/card';
import {catchError, finalize, of, switchMap, tap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {CardStatus, UserCard} from '../../../modeles/cards/Card';
import {CardNumberPipe} from '../../../utils/pipes/card-number-pipe';
import {ExpiryPipe} from '../../../utils/pipes/expiry-pipe';
import {PaymentService} from '../../../services/payments/payment-service';
import {Payment} from '../../../modeles/payments/Payment';
import {DataView} from 'primeng/dataview';
import {CardStatusBadge} from '../../../components/common/cards/card-status-badge/card-status-badge';
import {PaymentListItem} from '../../../components/common/payments/payment-list-item/payment-list-item';

@Component({
  selector: 'app-card-details',
  imports: [
    Card,
    CardNumberPipe,
    ExpiryPipe,
    DataView,
    CardStatusBadge,
    PaymentListItem
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

  public block() {
    this.isLoading.set(true);

    this.cardService.blockCard(this.card()?.id!).pipe(
      tap(() => {
        this.card.update(c => ({ ...c, status: CardStatus.blocked } as UserCard))
      }),
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.isLoading.set(false)),
    ).subscribe();
  }

  public unblock() {
    this.isLoading.set(true);

    this.cardService.unblockCard(this.card()?.id!).pipe(
      tap(() => {
        this.card.update(c => ({ ...c, status: CardStatus.active } as UserCard))
      }),
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.isLoading.set(false)),
    ).subscribe();
  }

  public close() {
    this.isLoading.set(true);

    this.cardService.blockCard(this.card()?.id!).pipe(
      tap(() => {
        this.card.update(c => ({ ...c, status: CardStatus.closed } as UserCard))
      }),
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.isLoading.set(false)),
    ).subscribe();
  }

  protected readonly CardStatus = CardStatus;
}
