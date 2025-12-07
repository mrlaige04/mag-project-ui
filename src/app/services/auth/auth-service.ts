import {inject, Injectable, signal} from '@angular/core';
import {LoginRequest} from '../../modeles/auth/LoginRequest';
import {BaseHttp} from '../base-http';
import {RegisterRequest} from '../../modeles/auth/RegisterRequest';
import {tap} from 'rxjs';
import {User} from '../../modeles/users/User';
import {AccessToken} from '../../modeles/auth/AccessToken';
import {StorageConfig} from '../../config/storage-config';
import {UserService} from '../user/user-service';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserService = inject(UserService);
  private http = inject(BaseHttp);
  private readonly baseUrl = '/auth';

  private _accessToken = signal<AccessToken | null>(this.getSavedToken());
  public accessToken = this._accessToken.asReadonly();

  private _isAuthenticated = signal(this.accessToken() !== null);
  public isAuthenticated = this._isAuthenticated.asReadonly();

  private _isAdmin = signal(this.getSavedIsAdmin());
  public isAdmin = this._isAdmin.asReadonly();

  public login(request: LoginRequest) {
    const fullUrl = `${this.baseUrl}/login`;
    return this.http.post<AccessToken | { require2fa: boolean }>(fullUrl, request).pipe(
      tap(token => {
        const accessToken = token as AccessToken;
        if (accessToken && accessToken.accessToken) {
          this.handleSuccessLogin(accessToken);
        }
      })
    );
  }

  public register(request: RegisterRequest) {
    const fullUrl = `${this.baseUrl}/register`;
    return this.http.post<Partial<User>>(fullUrl, request);
  }

  public setup2fa() {
    const fullUrl = `${this.baseUrl}/2fa/setup`;
    return this.http.post<{
      otpauth_url: string,
      secret: string
    }>(fullUrl, {});
  }

  public enable2fa(code: string) {
    const fullUrl = `${this.baseUrl}/2fa/enable`;
    return this.http.post(fullUrl, { code });
  }

  public disable2fa() {
    const fullUrl = `${this.baseUrl}/2fa/disable`;
    return this.http.post(fullUrl, {});
  }

  public verify2fa(userId: string, code: string) {
    const fullUrl = `${this.baseUrl}/2fa/verify`;
    return this.http.post(fullUrl, { userId, code });
  }

  public refreshToken(refreshToken: string) {
    const fullUrl = `${this.baseUrl}/refresh`;
    return this.http.post<AccessToken>(fullUrl, { refreshToken });
  }

  public requestPasswordReset(email: string) {
    const fullUrl = `${this.baseUrl}/password-reset/request`;
    return this.http.post<{
      token: string;
      expiresAt: Date;
    }>(fullUrl, { email });
  }

  public confirmPasswordReset(token: string, newPassword: string) {
    const fullUrl = `${this.baseUrl}/password-reset/confirm`;
    return this.http.post(fullUrl, { token, newPassword });
  }

  public logout() {
    this._accessToken.set(null);
    this._isAuthenticated.set(false);

    localStorage.removeItem(StorageConfig.ACCESS_TOKEN);

    this.currentUserService.clearUser();

    location.reload();
  }

  public handleSuccessLogin(token: AccessToken) {
    localStorage.setItem(StorageConfig.ACCESS_TOKEN, JSON.stringify(token));

    this._accessToken.set(token);
    this._isAuthenticated.set(true);

    const decodedToken= jwtDecode<any>(token.accessToken);
    this._isAdmin.set(decodedToken?.role === 'admin');
  }

  private getSavedToken(): AccessToken | null {
    const storageItem = localStorage.getItem(StorageConfig.ACCESS_TOKEN);
    if (!storageItem) {
      return null;
    }

    return JSON.parse(storageItem) as AccessToken;
  }

  private getSavedIsAdmin() {
    const token = this.getSavedToken();
    if (!token) {
      return false;
    }

    const decodedToken = jwtDecode<any>(token.accessToken);
    return decodedToken?.role === 'admin';
  }
}
