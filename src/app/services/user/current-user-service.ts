import {inject, Injectable} from '@angular/core';
import {BaseHttp} from '../base-http';

@Injectable({
  providedIn: 'root',
})
export class CurrentUserService {
  private base = inject(BaseHttp);
  private readonly baseUrl = 'user';
}
