import { Component } from '@angular/core';
import {Button} from 'primeng/button';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [
    Button,
    InputText,
    Password,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

}
