import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginRequest} from '../../modeles/auth/LoginRequest';
import {BaseHttp} from '../base-http';
import {RegisterRequest} from '../../modeles/auth/RegisterRequest';
import {AccessToken} from '../../modeles/auth/AccessToken';
import {StorageConfig} from '../../config/storage-config';
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(BaseHttp);
  private readonly baseUrl = '/auth';

  private _isAuthenticated = signal(false);
  public isAuthenticated = this._isAuthenticated.asReadonly();

  public login(request: LoginRequest) {
    const fullUrl = `${this.baseUrl}/login`;
    return this.http.post(fullUrl, request, {
      withCredentials: true
    });
  }

  public register(request: RegisterRequest) {
    const fullUrl = `${this.baseUrl}/register`;
    return this.http.post(fullUrl, request);
  }

  public logout() {
    const fullUrl = `${this.baseUrl}/logout`;
    return this.http.post(fullUrl, {}).pipe(
      tap(res => {
        if (res) {
          location.reload();
        }
      })
    );
  }
}
