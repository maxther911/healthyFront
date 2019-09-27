import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {LoginService} from "../../_services";

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    loading = false;
    returnUrl: string;

    public model = {username: '', password: ''};

    constructor(private _service : LoginService) {}

    login() {
        this._service.obtainAccessToken(this.model);
    }

    ngOnInit(): void {
        this._service.checkCredentials();
    }

}
