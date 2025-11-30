import {inject, signal} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {ToastService} from '../../../services/common/toast-service';
import {GlobalLoaderService} from '../../../services/common/global-loader-service';
import {DialogService} from 'primeng/dynamicdialog';
import {Router} from '@angular/router';

export class BasePage {
  protected isLoading = signal(false);
  protected fb = inject(FormBuilder);
  protected toastService = inject(ToastService);
  protected globalLoaderService = inject(GlobalLoaderService);
  protected dialogService = inject(DialogService);
  protected router = inject(Router);
}
