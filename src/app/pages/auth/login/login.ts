import { Component } from '@angular/core';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {RouterLink} from '@angular/router';
import {LabeledInput} from '../../../components/forms';

@Component({
  selector: 'app-login',
  imports: [
    Button,
    InputText,
    Password,
    RouterLink,
    LabeledInput
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

}
