import { Component } from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {Card} from 'primeng/card';

@Component({
  selector: 'app-auth-wrapper',
  imports: [
    RouterOutlet,
    Card,
    RouterLink
  ],
  templateUrl: './auth-wrapper.html',
  styleUrl: './auth-wrapper.scss',
})
export class AuthWrapper {
}
