import {Component, inject, OnInit} from '@angular/core';
import {Card} from 'primeng/card';
import {BasePage} from '../../../components/common/base-page/base-page';
import {UserService} from '../../../services/user/user-service';

@Component({
  selector: 'app-user-profile-info',
  imports: [
    Card
  ],
  templateUrl: './user-profile-info.html',
  styleUrl: './user-profile-info.scss',
})
export class UserProfileInfo extends BasePage {
  private currentUserService = inject(UserService);

  public currentUser = this.currentUserService.currentUser;
}
