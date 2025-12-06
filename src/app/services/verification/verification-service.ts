import {inject, Injectable} from '@angular/core';
import {BaseHttp} from '../base-http';
import {RequestVerificationRequest} from '../../modeles/verification/RequestVerificationRequest';
import {VerificationStatus} from '../../modeles/verification/VerificationStatus';
import {Document} from '../../modeles/verification/Document';

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

    return this.base.post<{ document: Document }>(fullUrl, formData);
  }

  public checkVerificationStatus() {
    const fullUrl = `${this.baseUrl}/check-verification`;
    return this.base.get<VerificationStatus>(fullUrl);
  }
}
