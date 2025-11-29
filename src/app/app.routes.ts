import { Routes } from '@angular/router';
import {LayoutWrapper} from './components/layout/layout-wrapper/layout-wrapper';
import {WelcomePage} from './pages/welcome-page/welcome-page';
import {AuthWrapper} from './pages/auth/auth-wrapper/auth-wrapper';
import {Login} from './pages/auth/login/login';
import {Register} from './pages/auth/register/register';
import {ForgotPassword} from './pages/auth/forgot-password/forgot-password';
import {MainDashboard} from './pages/dashboard/main-dashboard/main-dashboard';
import {inject} from '@angular/core';
import {AuthService} from './services/auth/auth-service';
import {isAuthenticatedGuard} from './utils/guard/is-authenticated-guard';
import {isNotAuthenticatedGuard} from './utils/guard/is-not-authenticated-guard';
import {CardDetails} from './pages/card/card-details/card-details';

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
        canActivate: [isNotAuthenticatedGuard],
      },
      {
        path: 'register',
        component: Register,
        canActivate: [isNotAuthenticatedGuard],
      },
      {
        path: 'forgot',
        component: ForgotPassword,
        canActivate: [isNotAuthenticatedGuard],
      },
      {
        path: 'logout',
        redirectTo: () => {
          const authService = inject(AuthService);
          authService.logout();
          return '/';
        }
      }
    ]
  },
  {
    path: '',
    component: LayoutWrapper,
    canActivate: [],//isAuthenticatedGuard],
    children: [
      {
        path: 'dashboard',
        component: MainDashboard
      },
      {
        path: 'cards/:id',
        component: CardDetails,
      }
    ]
  }
];
