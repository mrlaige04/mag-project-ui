import { Component } from '@angular/core';
import {Card} from 'primeng/card';
import {Chip} from 'primeng/chip';
import {DataView} from 'primeng/dataview';
import {BasePage} from '../../../components/common/base-page/base-page';
import {OpenNewCard} from '../../card/open-new-card/open-new-card';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-main-dashboard',
  imports: [
    Card,
    Chip,
    DataView,
    Button,
    RouterLink
  ],
  templateUrl: './main-dashboard.html',
  styleUrl: './main-dashboard.scss',
})
export class MainDashboard extends BasePage {
  private openNewCardDialogRef: DynamicDialogRef<OpenNewCard> | null = null;

  public transactions: Transaction[] = [
    {
      direction: 'incoming',
      money: 100,
      title: "From Deposit",
      date: new Date()
    },
    {
      direction: 'outcoming',
      money: 5000,
      title: "Credit",
      date: new Date()
    },{
      direction: 'outcoming',
      money: 5000,
      title: "Credit",
      date: new Date()
    },{
      direction: 'outcoming',
      money: 5000,
      title: "Credit",
      date: new Date()
    },{
      direction: 'outcoming',
      money: 5000,
      title: "Credit",
      date: new Date()
    },{
      direction: 'outcoming',
      money: 5000,
      title: "Credit",
      date: new Date()
    },{
      direction: 'outcoming',
      money: 5000,
      title: "Credit",
      date: new Date()
    },{
      direction: 'outcoming',
      money: 5000,
      title: "Credit",
      date: new Date()
    }
  ];

  public cards: UserCard[] = [
    {
      number: '4242424242424242',
      balance: 500,
      tags: "Primary",
      isPrimary: true
    },
    {
      number: '4242424242424242',
      balance: 500,
      tags: "Savings",
    },
  ];

  public openNewCardDialog() {
    this.openNewCardDialogRef = this.dialogService.open<OpenNewCard>(OpenNewCard, {
      modal: true,
      header: "Open New Card",
      closable: true,
      style: {
        minWidth: '30vw',
        width: 'min-content'
      }
    });
  }
}

type Transaction = {
  direction: 'outcoming' | 'incoming';
  money: number;
  title: string;
  icon?: string;
  date: Date;
};

type UserCard = {
  number: string;
  balance: number;
  tags: string;
  isPrimary?: boolean;
};
