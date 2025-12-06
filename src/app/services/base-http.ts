import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {RequestOptions} from '../modeles/http/request-options.type';

@Injectable({
  providedIn: 'root',
})
export class BaseHttp {
  private baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  public get<T = unknown>(path: string, options?: RequestOptions) {
    return this.http.get<T>(this.getFullUrl(path), options);
  }

  public post<T = unknown, B = unknown>(
    path: string,
    body: B,
    options?: RequestOptions
  ) {
    return this.http.post<T>(this.getFullUrl(path), body, options);
  }

  public put<T = unknown, B = unknown>(
    path: string,
    body: B,
    options?: RequestOptions
  ) {
    return this.http.put<T>(this.getFullUrl(path), body, options);
  }

  public patch<T = unknown, B = unknown>(
    path: string,
    body?: B,
    options?: RequestOptions
  ) {
    return this.http.patch<T>(this.getFullUrl(path), body, options);
  }

  public delete<T = unknown>(path: string, options?: RequestOptions) {
    return this.http.delete<T>(this.getFullUrl(path), options);
  }

  private getFullUrl(path: string) {
    return new URL(this.baseUrl + path).toString().replace('//', '/');
  }
}
