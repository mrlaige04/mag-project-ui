import {inject, Injectable, signal} from '@angular/core';
import {BaseHttp} from '../base-http';
import {AccessToken} from '../../modeles/auth/AccessToken';
import {jwtDecode} from 'jwt-decode';
import {User} from '../../modeles/users/User';
import {of, tap} from 'rxjs';
import {UpdateUser} from '../../modeles/users/UpdateUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private base = inject(BaseHttp);
  private readonly baseUrl = '/users';

  private _currentUser = signal<User | null>(null);
  public currentUser = this._currentUser.asReadonly();

  public loadCurrentUser(accessToken: AccessToken) {
    const decodedToken = jwtDecode(accessToken.accessToken);
    const userId = decodedToken.sub;

    if (!userId) {
      return of(null);
    }

    const fullUrl = `${this.baseUrl}/${userId}`;
    return this.base.get<User>(fullUrl).pipe(
      tap((user: User | null) => {
        if (user) {
          this._currentUser.set(user);
        }
      }),
    );
  }

  public update(id: string, request: Partial<UpdateUser>) {
    const fullUrl = `${this.baseUrl}/${id}`;
    return this.base.patch(fullUrl, request);
  }

  public clearUser() {
    this._currentUser.set(null);
  }
}
