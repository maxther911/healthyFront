import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Usuario } from '../_models/net/mrsistemas/index';

export class Foo {
  constructor(
    public id: number,
    public name: string) { }
}

@Injectable()
export class LoginService {

  constructor(
    private _router: Router, private _http: Http) { }

  obtainAccessToken(loginData: { username: any; password: any; }) {
    const params = new URLSearchParams();
    params.append('username', loginData.username);
    params.append('password', loginData.password);
    params.append('grant_type', 'password');
    params.append('client_id', 'fooClientIdPassword');

    const headers = new Headers({ 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
    'Authorization': 'Basic ' + btoa('fooClientIdPassword:password') });
    const options = new RequestOptions({ headers: headers });
    this._http.post('http://localhost:8081/healthyOauthServer/oauth/token', params.toString(), options)
      .map(res => res.json())
      .subscribe(
        data => {
          this.saveToken(data);
        },
        err => alert('Invalid Credentials')
      );
  }

  saveToken(token: { expires_in: number; access_token: string; }) {
    const expireDate = new Date().getTime() + (1000 * token.expires_in);
    Cookie.set('access_token', token.access_token, expireDate);
    this._router.navigate(['/dashboard']);
  }

  getResource(resourceUrl: string): Observable<Foo> {
    // tslint:disable-next-line:max-line-length
    const headers = new Headers({ 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8', 'Authorization': 'Bearer ' + Cookie.get('access_token') });
    const options = new RequestOptions({ headers: headers });
    return this._http.get(resourceUrl, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  checkCredentials() {
    if (!Cookie.check('access_token')) {
      this._router.navigate(['/login']);
    } else {
      this._router.navigate(['/dashboard']);
    }
  }

  isSession() {
    if (!Cookie.check('access_token')) {
      this._router.navigate(['/login']);
    } else {
      this._router.navigate(['/dashboard']);
    }
  }

  logout() {
    Cookie.delete('access_token');
    this._router.navigate(['/login']);
  }
}
