import { Component, OnInit } from '@angular/core';

import {AlertService, LoginService, UserService} from '../../_services/index';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    public model = {username: '', password: ''};
    public loading : boolean = true;
    private env = environment;

    constructor(private _login : LoginService,
                private _http: HttpClient,
                private _alert: AlertService,
                private _user: UserService) {}

    login() {
      $('#myModal').modal('show');
        this._login.obtainAccessToken(this.model)
          .subscribe(
            (data: any) => {
              this._http.get(this.env.clientDetailsURL + this.env.userUri + this.env.userByToken, this._user.getAuthenticated())
                .subscribe(
                  (data: any) => {
                    this._user.credentials = data;
                  },
                  error => {
                    this._alert.error('Error: LoginComponent 33' + error.message, false)
                  });
              this._login.saveToken(data);
              $('#myModal').modal('hide');
            },
            error => {
              $('#myModal').modal('hide');
              this._alert.error('Invalid Credentials', false);
            }
          );
    }

    hideModalMessage(){
      $('#myModal').modal('hide');
    }

    ngOnInit(): void {
        this._login.checkCredentials();
    }

}
