import {LoginService, UserService} from '../../_services';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  moduleId: module.id.toString(),
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private _user: UserService,
    private _login: LoginService,
    private _route: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this._login.checkCredentials();
    this._user.checkTokenValidity();
  }
}
