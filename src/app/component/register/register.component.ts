import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService, CountryService } from '../../_services/index';
import { User, Country } from "../../_models/net/mrsistemas";
import { Observable } from 'rxjs';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'register.component.html'
})

export class RegisterComponent implements OnInit {
    loading = false;
    private _user: User;
    country: Observable<Country>
    inCountry: string

    constructor(
        private router: Router,
        private userService: UserService,
        private _country: CountryService,
        private alertService: AlertService) { }

    loadCountry() {
        console.log('cargando....' + this.inCountry)
        this._country.getResource(this.user.birth_city.country.name).subscribe(
            (res: any) => {
                this.country = res.json()
                console.info(this.country)
            },
            error => {
                console.error('Error', error)
            })
    }

    create() {
        this.loading = true;
        console.info()
        this.userService.create(this.user)
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

    ngOnInit(): void { }

    public get user(): User {
        return this._user;
    }
    public set user(value: User) {
        this._user = value;
    }
}
