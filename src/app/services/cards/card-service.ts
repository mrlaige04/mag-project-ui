import {inject, Injectable} from '@angular/core';
import {BaseHttp} from '../base-http';
import {CreateCardRequest} from '../../modeles/cards/CreateCardRequest';
import {CardApplication} from '../../modeles/cards/CardApplication';
import {UserCard} from '../../modeles/cards/Card';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private base = inject(BaseHttp);
  private readonly baseUrl = '/cards';

  public openCard(request: CreateCardRequest) {
    const url = this.baseUrl + '/open';
    return this.base.post<CardApplication>(url, request);
  }

  public blockCard(id: string) {
    const url = this.baseUrl + `/${id}/block`;
    return this.base.post<UserCard>(url, {});
  }

  public unblockCard(id: string) {
    const url = this.baseUrl + `/${id}/unblock`;
    return this.base.post<UserCard>(url, {});
  }

  public closeCard(id: string) {
    const url = this.baseUrl + `/${id}/close`;
    return this.base.post<UserCard>(url, {});
  }

  public getAllCards() {
    const url = this.baseUrl;
    return this.base.get<UserCard[]>(url);
  }
}
