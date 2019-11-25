import {LoginService, UserService, AlertService, SensorsService} from './../../_services/index';
import {Component, OnInit} from '@angular/core';
// tslint:disable-next-line:import-blacklist



@Component({
  moduleId: module.id.toString(),
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private _user: UserService,
    private _login: LoginService) { }

  ngOnInit() {
    this._login.checkCredentials();
    this._user.checkTokenValidity();
  }
}
