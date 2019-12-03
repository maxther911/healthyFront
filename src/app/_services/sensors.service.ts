import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AlertService} from "./alert.service";
import {Observable, of} from "rxjs";
import {UserService} from "./user.service";
import {User} from "../_models/index";
import DataSensors = SensorsData.DataSensors;
import Data = Patient.User;
import {Location} from '@angular/common';


@Injectable()
export class SensorsService {
  private env = environment;
  private user: User;
  public isLogin: Observable<boolean> = of(false);
  private _dataSensors: Array<DataSensors>;
  private _patient: Data;

  constructor(
    private _router: Router,
    private _http: HttpClient,
    private _alert: AlertService,
    private _user: UserService,
    private _location: Location
  ) {
  }

  getDataSensorsById(id: string): void {
    // @ts-ignore
    this._http.get(this.env.sensorsDataUrl + this.env.third + this.env.sensors + this.env.getInformationById + id/*, this._user.getAuthenticated()*/)
      .subscribe(
        (data: any) => {
          this._dataSensors = data;
          if (data === null) {
            this._alert.error('usuario no tiene información médica o física registrada')
          }
        },
        (error: any) => {
          this._dataSensors = null;
          console.error(error.status);
          this._alert.error('La session ha caducado', false);
          this._router.navigate(['/login']);
        })
  }

  getDiagnosticById(id: string): void {
    // @ts-ignore
    this._http.get(this.env.sensorsDataUrl + this.env.userUri + this.env.get + id/*, this._user.getAuthenticated()*/)
      .subscribe(
        (data: any) => {
          this._patient = data;
          console.log(this._patient);
          if (data === null) {
            this._alert.error('usuario no tiene información médica o física registrada')
          }
        },
        (error: any) => {
            this._patient = null;
            this._alert.error('usuario no tiene información médica o física registrada', true);
            this._location.back();
        })
  }

  get dataSensors(): Array<SensorsData.DataSensors> {
    return this._dataSensors;
  }

  set dataSensors(value: Array<SensorsData.DataSensors>) {
    this._dataSensors = value;
  }

  get patient(): Patient.User {
    return this._patient;
  }

  set patient(value: Patient.User) {
    this._patient = value;
  }

}
