import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {AlertService, CountryService, UserService} from '../../_services/index';
import {User} from '../../_models/user';
import {Country} from '../../_models/country';

@Component({
  moduleId: module.id.toString(),
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.css']
})

export class RegisterComponent implements OnInit {
  loading = false;
  public user = new User(0, '', '', '', '', '', '', '', '', new Date(), null, null, '');
  countries: Country[];
  inCountry: string;
  list: string[];

  // two way binding for input text
  inputItem = '';
  // enable or disable visiblility of dropdown
  listHidden = true;
  showError = false;
  selectedIndex = -1;

  // the list to be shown after filtering
  filteredList: any;

  // Variables para la ciudad
  // two way binding for input text
  inputItemCity = '';
  // enable or disable visiblility of dropdown
  listHiddenCity = true;
  showErrorCity = false;
  selectedIndexCity = -1;

  // the list to be shown after filtering
  filteredListCity: any;
  listCity: string[];

  constructor(
    private router: Router,
    private userService: UserService,
    private _country: CountryService,
    private alertService: AlertService) {
  }


  create() {
    this.loading = true;
    console.info();
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
    this.getCountries()

  }

  getCountries() {
    this._country.getAllCountries().subscribe(
      (data: any) => {
        this.filteredList = data;
        console.log(this.countries)
      },
      error => {
        this.alertService.error(error);
      });
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
    console.log(this.inputItem)
    this.filteredListCity = this.filteredList[ind].cities
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

  // apply for all cities in that countries selected
  // modifies the filtered list as per input
  getFilteredListCity() {
    this.listHiddenCity = false;
    // this.selectedIndex = 0;
    if (!this.listHiddenCity && this.inputItemCity !== undefined) {
      this.filteredListCity = this.listCity.filter((item) => item.toLowerCase().startsWith(this.inputItemCity.toLowerCase()));
    }
  }

  // select highlighted item when enter is pressed or any item that is clicked
  selectItemCity(ind) {

    this.inputItemCity = this.filteredListCity[ind].name;
    this.listHiddenCity = true;
    this.selectedIndexCity = ind;
  }

  // navigate through the list of items
  onKeyPressCity(event) {

    if (!this.listHiddenCity) {
      if (event.key === 'Escape') {
        this.selectedIndexCity = -1;
        this.toggleListDisplay(0);
      }

      if (event.key === 'Enter') {

        this.toggleListDisplay(0);
      }
      if (event.key === 'ArrowDown') {

        this.listHiddenCity = false;
        this.selectedIndexCity = (this.selectedIndexCity + 1) % this.filteredListCity.length;
        if (this.filteredList.length > 0 && !this.listHidden) {
          document.getElementsByTagName('list-item')[this.selectedIndexCity].scrollIntoView();
        }
      } else if (event.key === 'ArrowUp') {

        this.listHiddenCity = false;
        if (this.selectedIndexCity <= 0) {
          this.selectedIndexCity = this.filteredListCity.length;
        }
        this.selectedIndexCity = (this.selectedIndexCity - 1) % this.filteredListCity.length;

        if (this.filteredListCity.length > 0 && !this.listHiddenCity) {

          document.getElementsByTagName('list-item')[this.selectedIndexCity].scrollIntoView();
        }
      }
    }
  }

  // show or hide the dropdown list when input is focused or moves out of focus
  toggleListDisplayCity(sender: number) {

    if (sender === 1) {
      // this.selectedIndex = -1;
      this.listHiddenCity = false;
      this.getFilteredListCity();
    } else {
      // helps to select item by clicking
      setTimeout(() => {
        this.selectItemCity(this.selectedIndexCity);
        this.listHiddenCity = true;
        if (!this.listCity.includes(this.inputItemCity)) {
          this.showErrorCity = true;
          this.filteredListCity = this.listCity;
        } else {
          this.showErrorCity = false;
        }
      }, 500);
    }
  }
}
