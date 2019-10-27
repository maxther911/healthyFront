import {LoginService, UserService, AlertService, SensorsService} from './../../_services/index';
import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import {Data, User} from "../../_models/net/mrsistemas";


@Component({
  moduleId: module.id.toString(),
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private _user: UserService,
    private _alert: AlertService,
    private _login: LoginService,
    private _sensors : SensorsService) { }

  ngOnInit() {
    this._login.checkCredentials();
    this._user.checkTokenValidity();
  }
}
