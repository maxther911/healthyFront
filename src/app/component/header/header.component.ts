import { User } from './../../_models/net/mrsistemas/user';
import { UserService } from './../../_services/index';
import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id.toString(),
  selector : 'app-header',
  templateUrl: 'header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isActive: boolean;
  public model: User;

  constructor(private _user: UserService) { }

  ngOnInit() {
    this.isActive = false;
    this.model = this._user.credentials;
  }

}
