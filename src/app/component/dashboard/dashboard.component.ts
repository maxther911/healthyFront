import { LoginService, UserService, AlertService } from './../../_services/index';
import { Component, OnInit } from '@angular/core';
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
    private _login: LoginService) { }

  ngOnInit() {
    this._login.checkCredentials();
    /*this._uService.getResource()
      .subscribe(
        data => {
          this.credentials = data;
          console.log(this.credentials);
          this._uService.getById(this.credentials.id).subscribe(
        resp => {
        this.user = resp;
          console.log(this.user);
        },
        error => {
          console.error(error.error);
          this._alert.error(error.error);

        }
      );
        },
        error => {
          this.credentials.user_name = 'Error';
          if (error === 'invalid_token') {
            console.log(error);
            this._login.logout();
          }
        });*/
  }

}
