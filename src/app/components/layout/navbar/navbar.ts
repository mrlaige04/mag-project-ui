import {Component, inject, signal} from '@angular/core';
import {Button} from 'primeng/button';
import {Toolbar} from 'primeng/toolbar';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AuthService} from '../../../services/auth/auth-service';
import {Avatar} from 'primeng/avatar';
import {UserService} from '../../../services/user/user-service';
import {Menu} from 'primeng/menu';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-navbar',
  imports: [Button, Toolbar, RouterLink, RouterLinkActive, Avatar, Menu],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private authService = inject(AuthService);
  private currentUserService = inject(UserService);

  public isAuthenticated = this.authService.isAuthenticated;
  public isAdmin = this.authService.isAdmin;
  public currentUser = this.currentUserService.currentUser;

  public userMenuItems: MenuItem[] = [
    { icon: 'pi pi-user', label: 'Profile', routerLink: 'profile' },
    { icon: 'pi pi-sign-out', label: 'Logout', command: () => this.authService.logout() },
  ];

  public get avatarLabel() {
    const fullName = this.currentUser()?.fullName ?? 'User';
    const names = fullName.split(' ');
    return names.map(n => n.slice(0,1)).join('');
  }
}
