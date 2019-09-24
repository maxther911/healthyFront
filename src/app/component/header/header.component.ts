import {LoginService, UserService} from './../../_services/index';
import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import * as $ from 'jquery';

@Component({
  moduleId: module.id.toString(),
  selector: 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private _user: UserService, private _login: LoginService) {
  }

  clearSession(): void {
    this._login.logout();
  }
}
