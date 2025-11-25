import { Component } from '@angular/core';
import {Navbar} from '../navbar/navbar';

@Component({
  selector: 'app-layout-wrapper',
  imports: [
    Navbar
  ],
  templateUrl: './layout-wrapper.html',
  styleUrl: './layout-wrapper.scss',
})
export class LayoutWrapper {

}
