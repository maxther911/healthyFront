﻿import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService, CountryService } from '../../_services/index';


import { Observable } from 'rxjs';
import { User } from '../../_models/user';
import { Country } from '../../_models/country';

@Component({
    moduleId: module.id.toString(),
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})

export class RegisterComponent implements OnInit {
    loading = false;
    public user = new User(0, '', '', '', '', '', '', '', '', new Date(), null, null, '');
    countries: Country[]
    inCountry: string
    list: string[]

    // two way binding for input text
    inputItem = '';
    // enable or disable visiblility of dropdown
    listHidden = true;
    showError = false;
    selectedIndex = -1;

    // the list to be shown after filtering
    filteredList: any

    constructor(
        private router: Router,
        private userService: UserService,
        private _country: CountryService,
        private alertService: AlertService) { }


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

    ngOnInit() {
        this._country.getAllCountries().subscribe(
            (data : any)=> {
                this.countries = data
                this.filteredList = data 
                console.log(this.countries)
            },
            error => {
                this.alertService.error(error);
            });
        this.filteredList = this.countries;
    }

    // modifies the filtered list as per input
    getFilteredList() {

        this.listHidden = false;
        // this.selectedIndex = 0;
        if (!this.listHidden && this.inputItem !== undefined) {
            this.filteredList = this.list.filter((item) => item.toLowerCase().startsWith(this.inputItem.toLowerCase()));
        }
    }

    // select highlighted item when enter is pressed or any item that is clicked
    selectItem(ind) {

        this.inputItem = this.filteredList[ind];
        this.listHidden = true;
        this.selectedIndex = ind;
    }

    // navigate through the list of items
    onKeyPress(event) {

        if (!this.listHidden) {
            if (event.key === 'Escape') {
                this.selectedIndex = -1;
                this.toggleListDisplay(0);
            }

            if (event.key === 'Enter') {

                this.toggleListDisplay(0);
            }
            if (event.key === 'ArrowDown') {

                this.listHidden = false;
                this.selectedIndex = (this.selectedIndex + 1) % this.filteredList.length;
                if (this.filteredList.length > 0 && !this.listHidden) {
                    document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView();
                }
            } else if (event.key === 'ArrowUp') {

                this.listHidden = false;
                if (this.selectedIndex <= 0) {
                    this.selectedIndex = this.filteredList.length;
                }
                this.selectedIndex = (this.selectedIndex - 1) % this.filteredList.length;

                if (this.filteredList.length > 0 && !this.listHidden) {

                    document.getElementsByTagName('list-item')[this.selectedIndex].scrollIntoView();
                }
            }
        }
    }

    // show or hide the dropdown list when input is focused or moves out of focus
    toggleListDisplay(sender: number) {

        if (sender === 1) {
            // this.selectedIndex = -1;
            this.listHidden = false;
            this.getFilteredList();
        } else {
            // helps to select item by clicking
            setTimeout(() => {
                this.selectItem(this.selectedIndex);
                this.listHidden = true;
                if (!this.list.includes(this.inputItem)) {
                    this.showError = true;
                    this.filteredList = this.list;
                } else {
                    this.showError = false;
                }
            }, 500);
        }
    }
}
