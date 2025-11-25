import { Routes } from '@angular/router';
import {AuthWrapper} from './components/auth/auth-wrapper/auth-wrapper';
import {Login} from './components/auth/login/login';
import {LayoutWrapper} from './components/layout/layout-wrapper/layout-wrapper';
import {Register} from './components/auth/register/register';
import {ForgotPassword} from './components/auth/forgot-password/forgot-password';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthWrapper,
    children: [
      {
        path: 'login',
        component: Login,
      },
      {
        path: 'register',
        component: Register,
      },
      {
        path: 'forgot',
        component: ForgotPassword
      }
    ]
  },
  {
    path: '',
    component: LayoutWrapper,
  }
];
