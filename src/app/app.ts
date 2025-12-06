import {Component, DestroyRef, inject, OnInit, signal} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {Toast} from 'primeng/toast';
import {AuthService} from './services/auth/auth-service';
import {UserService} from './services/user/user-service';
import { tap} from 'rxjs';
import {User} from './modeles/users/User';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Toast],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly title = signal('mag-project-ui');
  private authService = inject(AuthService);
  private currentUserService = inject(UserService);
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);

  public currentUser = this.currentUserService.currentUser;

  public ngOnInit() {
    if (this.authService.isAuthenticated()) {
      const token = this.authService.accessToken();

      if (token) {
        this.currentUserService.loadCurrentUser(token).pipe(
          tap((user: User | null) => {
            if (!user) {
              this.router.navigate(['auth', 'login']);
            }
          }),
          takeUntilDestroyed(this.destroyRef)
        ).subscribe();
      }
    }
  }
}
