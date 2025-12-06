import {UserOwnedEntity} from '../BaseEntity';

export type UserCard = UserOwnedEntity & {
  cardNumber: string;
  cardType: CardType;
  provider: CardProvider;
  status: CardStatus;
  expirationDate: Date;
  issuedAt: Date;
  balance: number;
  currency: string;
};

export enum CardType {
  debit = 'debit',
  credit = 'credit',
}

export enum CardStatus {
  active = 'active',
  blocked = 'blocked',
  closed = 'closed',
}

export enum CardProvider {
  visa = 'visa',
  mastercard = 'mastercard',
}
