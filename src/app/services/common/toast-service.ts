import {inject, Injectable} from '@angular/core';
import {MessageService} from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly messageService = inject(MessageService);

  public showSuccess(title: string, message?: string): void { this.show('success', title, message); }
  public showError(title: string, message?: string): void { this.show('error', title, message); }
  public showWarning(title: string, message?: string): void { this.show('warning', title, message); }
  public showInfo(title: string, message?: string): void { this.show('info', title, message); }
  public showSecondary(title: string, message?: string): void { this.show('secondary', title, message); }
  public showContrast(title: string, message?: string): void { this.show('contrast', title, message); }

  private show(severity: string, title: string, message?: string): void {
    this.messageService.add({
      severity,
      summary: title,
      detail: message,
    });
  }
}
