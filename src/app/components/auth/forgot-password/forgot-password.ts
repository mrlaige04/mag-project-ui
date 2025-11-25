import {Component, signal} from '@angular/core';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {RouterLink} from '@angular/router';
import {InputOtp} from 'primeng/inputotp';

enum ForgotPasswordState {
  EMAIL,
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
    InputOtp
  ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {
  public state = signal(ForgotPasswordState.EMAIL);

  public goNext() {
    this.state.update(s => s + 1);
  }

  protected readonly ForgotPasswordState = ForgotPasswordState;
}
