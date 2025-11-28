import {Component, signal} from '@angular/core';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {RouterLink} from '@angular/router';
import {InputOtp} from 'primeng/inputotp';
import {Step, StepList, StepPanel, StepPanels, Stepper} from 'primeng/stepper';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {InputNumber} from 'primeng/inputnumber';

enum ForgotPasswordState {
  EMAIL = 1,
  CODE,
  PASSWORD
}

@Component({
  selector: 'app-forgot-password',
  imports: [
    Button,
    InputText,
    Password,
    RouterLink,
    InputOtp,
    Stepper,
    StepList,
    StepPanels,
    StepPanel,
    Step,
    IconField,
    InputIcon,
    InputNumber
  ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {
  public state = signal(ForgotPasswordState.EMAIL);


  public goBack() {
    this.state.update(s => Math.max(s - 1, ForgotPasswordState.EMAIL));
  }

  public goNext() {
    this.state.update(s => s + 1);
  }

  protected readonly ForgotPasswordState = ForgotPasswordState;
}
