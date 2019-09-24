import { User } from './../../_models/net/mrsistemas/user';
import {LoginService, UserService} from './../../_services/index';
import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";

@Component({
  moduleId: module.id.toString(),
  selector : 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isActive: Observable<boolean>;
  public model: User;

  constructor(private _user: UserService, private _login : LoginService) { }

  ngOnInit() {
    this.isActive = this._login.getSessionActive();
    this.model = this._user.credentials;
  }

  clearSession() : void{
    this._login.logout();
  }

}
