import {inject, Injectable} from '@angular/core';
import {BaseHttp} from '../base-http';
import {HistoryItem} from '../../modeles/history/history';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  private base = inject(BaseHttp);
  private readonly baseUrl = '/history';

  public getAll() {
    const fullUrl = `${this.baseUrl}/all`;
    return this.base.get<HistoryItem[]>(fullUrl);
  }

  public getForUser(userId: string) {
    const fullUrl = `${this.baseUrl}/user/${userId}`;
    return this.base.get<HistoryItem[]>(fullUrl);
  }
}
