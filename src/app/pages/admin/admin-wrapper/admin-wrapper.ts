import {Component, OnInit} from '@angular/core';
import {Tab, TabList, Tabs} from 'primeng/tabs';
import {RouterLink, RouterOutlet} from '@angular/router';
import {BasePage} from '../../../components/common/base-page/base-page';

@Component({
  selector: 'app-admin-wrapper',
  imports: [
    Tabs,
    TabList,
    Tab,
    RouterOutlet
  ],
  templateUrl: './admin-wrapper.html',
  styleUrl: './admin-wrapper.scss',
})
export class AdminWrapper extends BasePage {
  public menuItems: AdminMenuItem[] = [
    {
      icon: 'pi pi-user',
      name: 'Users',
      link: 'users'
    },
    {
      icon: 'pi pi-verified',
      name: 'Verifications',
      link: 'verifications'
    },
    {
      icon: 'pi pi-history',
      name: 'History Logs',
      link: 'history-logs'
    }
  ];

  public activeMenu = this.getActiveMenu();

  public openMenu(menu: AdminMenuItem) {
    this.activeMenu = menu;
    this.router.navigate(['admin', menu.link]);
  }

  public getActiveMenu(): AdminMenuItem {
    const lastPart = this.router.url.split('/').at(-1);
    if (!lastPart) {
      return this.menuItems[0];
    }

    const item = this.menuItems.find(i => i.link === lastPart);
    return item ?? this.menuItems[0];
  }
}

type AdminMenuItem = {
  icon: string;
  name: string;
  link: string;
};
