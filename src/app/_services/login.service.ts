import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Cookie} from 'ng2-cookies';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {AlertService} from "./alert.service";
import {Observable, of} from "rxjs";
import {UserService} from "./user.service";
import {SensorsService} from "./sensors.service";

@Injectable()
export class LoginService {
  private env = environment;
  public isLogin: Observable<boolean> = of(false);

  constructor(
    private _router: Router,
    private _http: HttpClient,
    private _alert: AlertService,
    private _user: UserService,
    private _sensors: SensorsService) {
  }

  obtainAccessToken(loginData: { username: any; password: any; }) {
    const params = new URLSearchParams();
    params.append('username', loginData.username);
    params.append('password', loginData.password);
    params.append('grant_type', this.env.grandTypePassword);
    params.append('client_id', this.env.appId);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Basic ' + btoa(this.env.appConnect)
      })
    };

    this._http.post(this.env.authenticatedUri + this.env.token, params.toString(), httpOptions)
      .subscribe(
        (data: any) => {
          this._http.get(this.env.clientDetailsURL + this.env.userUri + this.env.userByToken, this._user.getAuthenticated())
            .subscribe(
              (data: any) => {
                this._user.credentials = data;
                console.info(this._user.credentials)
              },
              error => {
                this._alert.error(error, false)
              });
          this.saveToken(data);
        },
        error => {
          this._alert.error('Invalid Credentials', false);
        }
      );
  }

  saveToken(token: { expires_in: number; access_token: string; }) {
    const expireDate = new Date().getTime() + (1000 * token.expires_in);
    Cookie.set('access_token', token.access_token, expireDate);
    this._router.navigate(['/dashboard']);
  }

  getResource(resourceUrl: string) {
    // tslint:disable-next-line:max-line-length
    //const headers = new Headers({ 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Bearer ' + Cookie.get('access_token') });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Bearer ' + Cookie.get('access_token')
      })
    };
    return this._http.get(resourceUrl, httpOptions)
      .subscribe(
        (res: Response) => {
          console.log(res.json());
        },
        error => {
          console.log('Error', error)
        }
      )
  }

  checkCredentials() {
    if (!Cookie.check('access_token')) {
      this._router.navigate(['/login']);
      this.isLogin = of(true);
    } else {
      this.getUserByToken();
      this.isLogin = of(false);
      this._router.navigate(['/dashboard']);
    }
  }

  getUserByToken(): void {
    this._http.get(this.env.clientDetailsURL + this.env.userUri + this.env.userByToken, this._user.getAuthenticated())
      .subscribe(
        (data: any) => {
          this._user.credentials = data;
        },
        error => {
          console.error(error);
          this.logout();
          this._alert.error('La session ha caducado', false);
          this._router.navigate(['/login']);
        })
  }

  logout() {
    this._user.credentials = null;
    Cookie.delete('access_token');
    this._router.navigate(['/login']);
  }
}
