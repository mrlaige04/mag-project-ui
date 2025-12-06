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
import {Verification} from './pages/auth/verification/verification';
import {userVerifiedGuard} from './utils/guard/user-verified-guard';
import {ProfileWrapper} from './pages/profile/profile-wrapper/profile-wrapper';

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
        title: 'Login to Global Bank',
        canActivate: [isNotAuthenticatedGuard],
      },
      {
        path: 'register',
        component: Register,
        title: 'Register in Global Bank',
        canActivate: [isNotAuthenticatedGuard],
      },
      {
        path: 'forgot',
        component: ForgotPassword,
        title: 'Password reset',
        canActivate: [isNotAuthenticatedGuard],
      },
      {
        path: 'verification',
        component: Verification,
        title: 'Account verification',
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
    canActivate: [isAuthenticatedGuard, userVerifiedGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        title: 'Dashboard',
        component: MainDashboard
      },
      {
        path: 'cards/:id',
        title: 'Card Details',
        component: CardDetails,
      },
      {
        path: 'profile',
        title: 'Profile',
        component: ProfileWrapper
      }
    ]
  }
];
