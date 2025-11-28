import { Routes } from '@angular/router';
import {LayoutWrapper} from './components/layout/layout-wrapper/layout-wrapper';
import {WelcomePage} from './pages/welcome-page/welcome-page';
import {AuthWrapper} from './pages/auth/auth-wrapper/auth-wrapper';
import {Login} from './pages/auth/login/login';
import {Register} from './pages/auth/register/register';
import {ForgotPassword} from './pages/auth/forgot-password/forgot-password';

export const routes: Routes = [
  {
    path: 'welcome',
    component: WelcomePage,
  },
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
