import {inject, Injectable} from '@angular/core';
import {BaseHttp} from '../base-http';
import {RequestVerificationRequest} from '../../modeles/verification/RequestVerificationRequest';

@Injectable({
  providedIn: 'root',
})
export class VerificationService {
  private base = inject(BaseHttp);
  private readonly baseUrl = '/verification';

  public requestVerification(request: RequestVerificationRequest) {
    const fullUrl = this.baseUrl;
    const formData = new FormData();
    formData.append('documentType', request.documentType);
    formData.append('file', request.file);

    return this.base.post(fullUrl, formData);
  }
}
