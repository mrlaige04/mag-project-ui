import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {Card} from 'primeng/card';
import {DataView} from 'primeng/dataview';
import {BasePage} from '../../../components/common/base-page/base-page';
import {OpenNewCard} from '../../card/open-new-card/open-new-card';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {RouterLink} from '@angular/router';
import {CardService} from '../../../services/cards/card-service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {PaymentService} from '../../../services/payments/payment-service';
import {forkJoin, switchMap, tap} from 'rxjs';
import {Payment} from '../../../modeles/payments/Payment';
import {UserCard} from '../../../modeles/cards/Card';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-main-dashboard',
  imports: [
    Card,
    DataView,
    RouterLink,
    DecimalPipe
  ],
  templateUrl: './main-dashboard.html',
  styleUrl: './main-dashboard.scss',
})
export class MainDashboard extends BasePage implements OnInit {
  private openNewCardDialogRef: DynamicDialogRef<OpenNewCard> | null = null;
  private cardsService = inject(CardService);
  private paymentService = inject(PaymentService);
  private destroyRef = inject(DestroyRef);

  public transactions = signal<Payment[]>([]);
  public cards = signal<UserCard[]>([]);

  public ngOnInit(): void {
    forkJoin({
      cards: this.loadCards$(),
      transactions: this.loadTransactions$()
    }).pipe(
      tap((res) => {
        this.cards.set(res.cards);
        this.transactions.set(res.transactions);
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  public quickActions: QuickAction[] = [
    {
      icon: 'pi pi-send',
      displayName: 'Send Money',
      onClick: this.sendMoney.bind(this),
    }
  ];

  public openNewCardDialog() {
    this.openNewCardDialogRef = this.dialogService.open<OpenNewCard>(OpenNewCard, {
      modal: true,
      header: "Open New Card",
      closable: true,
      style: {
        minWidth: '50vw',
        width: 'min-content'
      }
    });

    this.openNewCardDialogRef?.onClose.pipe(
      switchMap(() => this.loadCards$()),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  private loadCards$() {
    return this.cardsService.getAllCards().pipe(
      tap(cards => {
        this.cards.set(cards);
      }),
      takeUntilDestroyed(this.destroyRef),
    );
  }

  private loadTransactions$() {
    return this.paymentService.getAllPayments().pipe(
      tap(payments => {
        this.transactions.set(payments);
      }),
      takeUntilDestroyed(this.destroyRef)
    );
  }

  public async sendMoney() {
    await this.router.navigate(['transfer']);
  }

  public get currency() {
    return this.cards().length ? this.cards()[0]?.currency : '$';
  }

  public get totalBalance() {
     return this.cards().reduce((sum, x) => sum + x.balance, 0);
  }
}

type QuickAction = {
  icon?: string;
  displayName: string;
  onClick: () => void;
};
