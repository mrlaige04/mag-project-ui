import { Component } from '@angular/core';
import {Navbar} from '../navbar/navbar';
import {RouterOutlet} from '@angular/router';
import {Breadcrumb} from 'primeng/breadcrumb';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-layout-wrapper',
  imports: [
    Navbar,
    RouterOutlet,
    Breadcrumb
  ],
  templateUrl: './layout-wrapper.html',
  styleUrl: './layout-wrapper.scss',
})
export class LayoutWrapper {
  public homeItem: MenuItem = {
    icon: 'pi pi-home',
    routerLink: '/dashboard',
  };

  public breadcrumbItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'pi pi-stats', routerLink: '/dashboard' },
  ];
}
