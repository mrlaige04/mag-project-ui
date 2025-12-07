import {inject, Injectable} from '@angular/core';
import {BaseHttp} from '../base-http';
import {Payment} from '../../modeles/payments/Payment';
import {SendPayment} from '../../modeles/payments/SendPayment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private base = inject(BaseHttp);
  private readonly baseUrl = `/payments`;

  public transfer(request: SendPayment) {
    const fullUrl = `${this.baseUrl}/transfer`;
    return this.base.post(fullUrl, request);
  }

  public getAllPayments() {
    const url = `${this.baseUrl}/history`;
    return this.base.get<Payment[]>(url);
  }

  public getPaymentsForCard(number: string) {
    const fullUrl = `${this.baseUrl}/history/${number}`;
    return this.base.get<Payment[]>(fullUrl);
  }

  public getPaymentById() {

  }
}
