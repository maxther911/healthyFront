import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Cookie} from 'ng2-cookies';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AlertService} from "./alert.service";
import {Observable, of} from "rxjs";
import {UserService} from "./user.service";
import {User} from "../_models/net/mrsistemas";
import {map} from "rxjs/operators";
import DataSensors = SensorsData.DataSensors;


@Injectable()
export class SensorsService {
  private env = environment;
  private user : User;
  public isLogin: Observable<boolean> = of(false);
  private _dataSensors :  Array<DataSensors>;

  constructor(
    private _router: Router, private _http: HttpClient, private _alert: AlertService, private _user: UserService) {
  }

  getDataSensorsById() : void {
    // @ts-ignore
    this._http.get(this.env.sensorsDataUrl + this.env.third + this.env.sensors + this.env.getInformationById + this._user.credentials.id/*, this._user.getAuthenticated()*/)
      .subscribe(
        (data: any) => {
          this._dataSensors = data;
        },
        error => {
          console.error(error);
          this._alert.error('La session ha caducado', false);
          this._router.navigate(['/login']);
        })
  }

  get dataSensors(): Array<SensorsData.DataSensors> {
    return this._dataSensors;
  }

  set dataSensors(value: Array<SensorsData.DataSensors>) {
    this._dataSensors = value;
  }

}
