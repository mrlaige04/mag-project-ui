import { Component } from '@angular/core';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {RouterLink} from '@angular/router';
import {LabeledInput} from '../../../components/forms';
import {BasePage} from '../../../components/common/base-page/base-page';

@Component({
  selector: 'app-register',
  imports: [
    Button,
    InputText,
    Password,
    RouterLink,
    LabeledInput
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register extends BasePage {

}
