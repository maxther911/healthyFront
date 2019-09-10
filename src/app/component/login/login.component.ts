﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService, LoginService } from '../../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    loading = false;
    returnUrl: string;

    public model = {username: '', password: ''};

    constructor(private _service: LoginService, private _alert: AlertService) {}

    login() {
        this._service.obtainAccessToken(this.model);
    }

    ngOnInit(): void {
        this._service.checkCredentials();
    }

}
