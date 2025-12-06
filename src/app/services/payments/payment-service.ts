import {inject, Injectable} from '@angular/core';
import {BaseHttp} from '../base-http';
import {Payment} from '../../modeles/payments/Payment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private base = inject(BaseHttp);
  private readonly baseUrl = `/payments`;

  public transfer() {

  }

  public getAllPayments() {
    const url = `${this.baseUrl}/history`;
    return this.base.get<Payment[]>(url);
  }

  public getPaymentsForCard() {

  }

  public getPaymentById() {

  }
}
