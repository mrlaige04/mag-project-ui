export type CreateCardRequest = {
  cardType: 'debit' | 'credit';
  provider: 'visa' | 'mastercard';
};
