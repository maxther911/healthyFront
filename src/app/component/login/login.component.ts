import { Component, OnInit } from '@angular/core';

import { LoginService } from '../../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    public model = {username: '', password: ''};

    constructor(private _service : LoginService) {}

    login() {
        this._service.obtainAccessToken(this.model);
    }

    ngOnInit(): void {
        this._service.checkCredentials();
    }

}
