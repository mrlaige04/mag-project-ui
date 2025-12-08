import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {BasePage} from '../../../components/common/base-page/base-page';
import {CardService} from '../../../services/cards/card-service';
import {UserCard} from '../../../modeles/cards/Card';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {finalize, tap} from 'rxjs';
import {Button} from 'primeng/button';
import {Card} from 'primeng/card';
import {InputText} from 'primeng/inputtext';
import {InputNumber} from 'primeng/inputnumber';
import {Select} from 'primeng/select';
import {FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CardNumberPipe} from '../../../utils/pipes/card-number-pipe';
import {AutoComplete} from 'primeng/autocomplete';
import {PaymentService} from '../../../services/payments/payment-service';
import {SendPayment} from '../../../modeles/payments/SendPayment';
import {SelectButton} from 'primeng/selectbutton';
import {InputMask} from 'primeng/inputmask';

@Component({
  selector: 'app-transfer',
  imports: [
    Button,
    Card,
    InputText,
    InputNumber,
    Select,
    ReactiveFormsModule,
    CardNumberPipe,
    SelectButton,
    FormsModule,
    InputMask
  ],
  templateUrl: './transfer.html',
  styleUrl: './transfer.scss',
})
export class Transfer extends BasePage implements OnInit {
  private cardService = inject(CardService);
  private paymentService = inject(PaymentService);
  private destroyRef = inject(DestroyRef);

  public cards = signal<UserCard[]>([]);

  public currencies = signal<Currency[]>([
    { name: 'UAH', displayName: 'UAH' },
  ]);

  public cardSelectionTypes: CardSelectionType[] = [
    { type: 'own', displayName: 'My card' },
    { type: 'custom', displayName: 'Custom card' },
  ];

  public form = this.fb.group({
    senderCardNumber: this.fb.control('', [
      Validators.required,
      Validators.minLength(16),
      Validators.maxLength(16)
    ]),
    receiverCardNumber: this.fb.control('', [
      Validators.required,
      Validators.pattern('^(?:\\d{4}[\\s-]?){3}\\d{4}$')
    ]),
    cardSelectionType: this.fb.control('own'),
    amount: this.fb.control(0, [Validators.required, Validators.min(1)]),
    currency: this.fb.control(this.currencies()[0].name, [Validators.required]),
  });

  public ngOnInit() {
    this.isLoading.set(true);
    this.cardService.getAllCards().pipe(
      tap(cards => this.cards.set(cards)),
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.isLoading.set(false)),
    ).subscribe();
  }

  public submit() {
    if (!this.form.valid) {
      return;
    }

    const cleanReceiver = this.form.value.receiverCardNumber!.replace(/\D/g, '');

    this.isLoading.set(true);
    this.paymentService.transfer({
      ...this.form.value,
      receiverCardNumber: cleanReceiver,
    } as SendPayment).pipe(
      tap(() => this.router.navigate(['dashboard'])),
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.isLoading.set(false)),
    ).subscribe();
  }
}

type Currency = {
  name: string;
  displayName: string;
};

type CardSelectionType = {
  type: 'own' | 'custom';
  displayName: string;
};
