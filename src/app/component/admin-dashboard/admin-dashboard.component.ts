import { Component, OnInit } from '@angular/core';
import {UserService} from "../../_services";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private _user: UserService) { }

  ngOnInit() {
    this._user.getAll()
  }

}
