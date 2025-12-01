import {Component, inject, signal} from '@angular/core';
import {Button} from 'primeng/button';
import {Toolbar} from 'primeng/toolbar';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AuthService} from '../../../services/auth/auth-service';

@Component({
  selector: 'app-navbar',
  imports: [Button, Toolbar, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private authService = inject(AuthService);

  public isAuthenticated = this.authService.isAuthenticated;
}
