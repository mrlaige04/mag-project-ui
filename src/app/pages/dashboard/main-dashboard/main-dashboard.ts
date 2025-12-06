import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {Card} from 'primeng/card';
import {Chip} from 'primeng/chip';
import {DataView} from 'primeng/dataview';
import {BasePage} from '../../../components/common/base-page/base-page';
import {OpenNewCard} from '../../card/open-new-card/open-new-card';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {CardService} from '../../../services/cards/card-service';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {PaymentService} from '../../../services/payments/payment-service';
import {tap} from 'rxjs';
import {Payment} from '../../../modeles/payments/Payment';

@Component({
  selector: 'app-main-dashboard',
  imports: [
    Card,
    Chip,
    DataView,
    RouterLink
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

  public ngOnInit(): void {
    this.cardsService.getAllCards().pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe();

    this.paymentService.getAllPayments().pipe(
      tap(payments => {
        this.transactions.set(payments);
      }),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe();
  }

  public cards: UserCard[] = [
    {
      number: '4242424242424242',
      balance: 500,
      tags: "Primary",
      isPrimary: true
    },
    {
      number: '4242424242424242',
      balance: 500,
      tags: "Savings",
    },
  ];

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
        minWidth: '30vw',
        width: 'min-content'
      }
    });
  }

  public async sendMoney() {
    await this.router.navigate(['transfer']);
  }
}

type Transaction = {
  direction: 'outcoming' | 'incoming';
  money: number;
  title: string;
  icon?: string;
  date: Date;
};

type UserCard = {
  number: string;
  balance: number;
  tags: string;
  isPrimary?: boolean;
};

type QuickAction = {
  icon?: string;
  displayName: string;
  onClick: () => void;
};
