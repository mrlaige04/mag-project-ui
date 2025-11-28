import { Component } from '@angular/core';
import {Toolbar} from 'primeng/toolbar';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {Divider} from 'primeng/divider';

type BankFeature = {
  title: string;
  icon: string;
  description: string;
};

type SocialLink = {
  icon: string;
  link: string;
};

@Component({
  selector: 'app-welcome-page',
  imports: [
    Toolbar,
    Button,
    RouterLink,
    Divider
  ],
  templateUrl: './welcome-page.html',
  styleUrl: './welcome-page.scss',
})
export class WelcomePage {
  public bankFeatures: BankFeature[] = [
    {
      title: 'Credit & Debit Cards',
      icon: 'pi pi-credit-card',
      description: 'Premium cards with exclusive rewards, cashback offers, and worldwide acceptance.',
    },
    {
      title: 'Security',
      icon: 'pi pi-shield',
      description: 'Bank-level security with 256-bit encryption and advanced fraud protection.',
    },
    {
      title: 'Web Banking',
      icon: 'pi pi-wifi',
      description: 'Bank anytime, anywhere with our feature-rich website.',
    },
    {
      title: 'Digital Wallet',
      icon: 'pi pi-bitcoin',
      description: 'Fast, secure payments with our contactless digital wallet technology.',
    }
  ];

  public useCases: BankFeature[] = [
    {
      title: 'Bank-Level Security',
      icon: 'pi pi-lock',
      description: 'Your data is protected with industry-leading encryption',
    },
    {
      title: 'Fully Licensed & Regulated',
      icon: 'pi pi-verified',
      description: 'Authorized and regulated by financial authorities',
    },
    {
      title: 'Award-Winning Service',
      icon: 'pi pi-trophy',
      description: 'Recognized for excellence in customer service',
    },
    {
      title: 'Global Network',
      icon: 'pi pi-globe',
      description: 'Access your money anywhere in the world',
    }
  ];

  public socialLinks: SocialLink[] = [
    {
      icon: 'pi pi-twitter',
      link: ''
    },
    {
      icon: 'pi pi-instagram',
      link: ''
    },
    {
      icon: 'pi pi-linkedin',
      link: ''
    }
  ];
}
