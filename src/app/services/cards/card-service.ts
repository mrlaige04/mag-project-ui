import {inject, Injectable} from '@angular/core';
import {BaseHttp} from '../base-http';
import {CreateCardRequest} from '../../modeles/cards/CreateCardRequest';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private base = inject(BaseHttp);
  private readonly baseUrl = '/cards';

  public openCard(request: CreateCardRequest) {
    const url = this.baseUrl + '/open';
    return this.base.post(url, request);
  }
}
