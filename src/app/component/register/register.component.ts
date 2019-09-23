import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import {AlertService, LoginService, UserService} from '../../_services/index';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'register.component.html'
})

export class RegisterComponent implements  OnInit{
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private _login: LoginService,
        private alertService: AlertService) { }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }

  ngOnInit(): void {
      this._login.checkCredentials();
  }
}
