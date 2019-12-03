import {Component, OnInit} from '@angular/core';
import {Country, User} from "../../_models";
import {Router} from "@angular/router";
import {AlertService, CountryService, UserService} from "../../_services";
import {Observable} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loading = false;
  public user: Observable<User>;
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
    private _user: UserService,
    private _country: CountryService,
    private alertService: AlertService) {
  }

  ngOnInit() {
    this.user = this._user.credentials
  }

  update() {
    return false;
  }
}
