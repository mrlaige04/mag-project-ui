import {Component, DestroyRef, inject, Optional} from '@angular/core';
import {BasePage} from '../../../components/common/base-page/base-page';
import {CardService} from '../../../services/cards/card-service';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {SelectButton} from 'primeng/selectbutton';
import {ReactiveFormsModule, Validators} from '@angular/forms';
import {Button} from 'primeng/button';
import {Checkbox} from 'primeng/checkbox';
import {CreateCardRequest} from '../../../modeles/cards/CreateCardRequest';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {finalize, tap} from 'rxjs';

type CardType = {
  name: 'debit' | 'credit';
  displayName?: string;
  description: string;
  icon?: string;
};

type CardProvider = {
  name: 'visa' | 'mastercard';
  displayName?: string;
  description: string;
  icon?: string;
};

@Component({
  selector: 'app-open-new-card',
  imports: [
    SelectButton,
    ReactiveFormsModule,
    Button,
    Checkbox
  ],
  templateUrl: './open-new-card.html',
  styleUrl: './open-new-card.scss',
})
export class OpenNewCard extends BasePage {
  @Optional()
  private dialogRef? = inject(DynamicDialogRef<OpenNewCard>);
  private cardService = inject(CardService);
  private destroyRef = inject(DestroyRef);

  public form = this.fb.group({
    type: this.fb.control('debit', [Validators.required]),
    provider: this.fb.control('visa', [Validators.required]),
    agreeTerms: this.fb.control(false, [Validators.required, Validators.requiredTrue]),
  });

  public availableTypes: CardType[] = [
    {
      name: 'debit',
      displayName: 'Debit',
      description: 'A debit card lets you pay using the money that’s already in your bank account. When you make a purchase, the amount is taken immediately from your balance. It’s a simple and safe way to access your own funds without carrying cash.'
    },
    {
      name: 'credit',
      displayName: 'Credit',
      description: 'A credit card allows you to buy now and pay later. You use the bank’s money up to a set limit and then pay it back, either fully each month or over time. It can help with flexibility in spending and building your credit history when used responsibly.'
    },
  ];

  public availableProviders: CardProvider[] = [
    {
      name: 'visa',
      displayName: 'Visa',
      description: 'Visa is a worldwide payment network that connects your card to millions of merchants and ATMs. When you pay with a Visa card, the Visa network securely processes the transaction and helps ensure it’s fast, reliable, and protected.'
    },
    {
      name: 'mastercard',
      displayName: 'Master Card',
      description: 'Mastercard is a global payment network similar to Visa. It processes transactions made with Mastercard-branded cards and offers secure, fast payments almost anywhere in the world. Many banks issue cards that run on the Mastercard network.'
    },
  ];

  public get activeType() {
    const type = this.availableTypes.find(t => t.name === this.form.get('type')?.value);
    return type ?? this.availableTypes[0];
  }

  public get activeProvider() {
    const provider = this.availableProviders.find(provider => provider.name === this.form.get('provider')?.value);
    return provider ?? this.availableProviders[0];
  }

  public submit() {
    if (!this.form.valid) {
      return;
    }

    const request = this.form.value as CreateCardRequest;
    this.isLoading.set(true);
    this.cardService.openCard(request).pipe(
      tap(card => {
        if (card) {
          this.dialogRef?.close(true);
        }
      }),
      takeUntilDestroyed(this.destroyRef),
      finalize(() => this.isLoading.set(false))
    ).subscribe();
  }
}
