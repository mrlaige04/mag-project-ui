import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginRequest} from '../../modeles/auth/LoginRequest';
import {BaseHttp} from '../base-http';
import {RegisterRequest} from '../../modeles/auth/RegisterRequest';
import {AccessToken} from '../../modeles/auth/AccessToken';
import {StorageConfig} from '../../config/storage-config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(BaseHttp);
  private readonly baseUrl = '/auth';

  private _accessToken = signal<AccessToken | null>(this.getSavedToken());
  public accessToken = this._accessToken.asReadonly();

  private _isAuthenticated = signal(this._accessToken() !== null);
  public isAuthenticated = this._isAuthenticated.asReadonly();

  public login(request: LoginRequest) {
    const fullUrl = `${this.baseUrl}/login`;
    return this.http.post(fullUrl, request);
  }

  public register(request: RegisterRequest) {
    const fullUrl = `${this.baseUrl}/register`;
    return this.http.post(fullUrl, request);
  }

  public logout() {
    localStorage.removeItem(StorageConfig.ACCESS_TOKEN);
    this._accessToken.set(null);
    this._isAuthenticated.set(false);

    location.reload();
  }

  private getSavedToken(): AccessToken | null {
    const storage = localStorage.getItem(StorageConfig.ACCESS_TOKEN);
    if (!storage) {
      return null;
    }

    const accessToken = JSON.parse(storage) as AccessToken;
    if (!accessToken || !accessToken.access_token || !accessToken.refresh_token) {
      return null;
    }

    return accessToken;
  }
}
