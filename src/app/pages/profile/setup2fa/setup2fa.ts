import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {Button} from 'primeng/button';
import {Card} from 'primeng/card';
import {BasePage} from '../../../components/common/base-page/base-page';
import {UserService} from '../../../services/user/user-service';
import {AuthService} from '../../../services/auth/auth-service';
import {tap} from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {QRCodeComponent} from 'angularx-qrcode';
import {Tag} from 'primeng/tag';
import {Step, StepList, StepPanel, StepPanels, Stepper} from 'primeng/stepper';
import {Divider} from 'primeng/divider';
import {LabeledInput} from '../../../components/forms';
import {InputText} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';

enum SetupState {
  None,
  QRCode,
  Code,
  Finish
}

@Component({
  selector: 'app-setup2fa',
  imports: [
    Button,
    Card,
    QRCodeComponent,
    Tag,
    Stepper,
    StepList,
    Step,
    StepPanels,
    StepPanel,
    Divider,
    LabeledInput,
    InputText,
    FormsModule
  ],
  templateUrl: './setup2fa.html',
  styleUrl: './setup2fa.scss',
})
export class Setup2fa extends BasePage implements OnInit {
  private currentUserService = inject(UserService);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);

  public faEnabled = signal(false);
  public faSetupState = signal(SetupState.None);

  public qrCodeConfig = signal<{
    otpauth_url: string,
    secret: string
  } | null>(null);

  public faCode = signal('');

  public ngOnInit(): void {
    this.faEnabled.set(this.currentUserService.currentUser()?.twoFactorEnabled ?? false);

    if (!this.faEnabled) {
      this.generateSetupConfig();
    }
  }

  public generateSetupConfig() {
    this.authService.setup2fa().pipe(
      tap(res => {
        this.qrCodeConfig.set(res);
        this.faSetupState.set(SetupState.QRCode);
      }),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe();
  }

  public enable2fa() {
    if (!this.faCode() || !this.faCode().length) {
      return;
    }

    this.authService.enable2fa(this.faCode()).pipe(
      tap(() => {
        this.faSetupState.set(SetupState.Finish);
      }),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe();
  }

  public goToStep(step: SetupState) {
    this.faSetupState.set(step);
  }

  public goToCode() {
    this.faSetupState.set(SetupState.Code);
  }

  public copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => this.toastService.showInfo('Copied!'));
  }

  protected readonly SetupState = SetupState;
  protected readonly navigator = navigator;
}
