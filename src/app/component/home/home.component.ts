import { Component, OnInit } from '@angular/core';

import { User } from '../../_models';
import {AlertService, LoginService, UserService} from '../../_services';
import {LoginComponent} from "../login";

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    users: User[] = [];

    constructor(private _user: UserService, private _login : LoginService) {
       //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
      this._login.checkCredentials();
      console.info('home', this._user.credentials);

    }

    deleteUser(id: number) {
        this._user.delete(id).subscribe(() => { this.loadAllUsers(); });
    }

    private loadAllUsers() {
        //this.userService.getAll().subscribe(users => { this.users = users; });
    }
}
