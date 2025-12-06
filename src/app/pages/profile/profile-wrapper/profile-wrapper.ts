import { Component } from '@angular/core';
import {Card} from 'primeng/card';
import {Button} from 'primeng/button';
import {Setup2fa} from '../setup2fa/setup2fa';
import {ChangePassword} from '../change-password/change-password';
import {UserProfileInfo} from '../user-profile-info/user-profile-info';

@Component({
  selector: 'app-profile-wrapper',
  imports: [
    Setup2fa,
    ChangePassword,
    UserProfileInfo
  ],
  templateUrl: './profile-wrapper.html',
  styleUrl: './profile-wrapper.scss',
})
export class ProfileWrapper {

}
