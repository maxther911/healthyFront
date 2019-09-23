import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Cookie } from 'ng2-cookies';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment';

export class Foo {
  constructor(
    public id: number,
    public name: string) { }
}

@Injectable()
export class LoginService {
  private env = environment;

  constructor(
    private _router: Router, private _http: HttpClient) { }

  obtainAccessToken(loginData: { username: any; password: any; }) {
    const params = new URLSearchParams();
    params.append('username', loginData.username);
    params.append('password', loginData.password);
    params.append('grant_type', 'password');
    params.append('client_id', this.env.appId);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Basic ' + btoa(this.env.appConnect)
      })
    };

    this._http.post(this.env.authenticatedUri + this.env.token, params.toString(), httpOptions)
      .subscribe(
        (data : any) => {
          console.log('DataAuthenticated', data);
          console.log('name: ', data.id)
          this.saveToken(data);

          const httpAuthenticated = {
            headers: new HttpHeaders({
              'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
              'Authorization': 'Bearer ' + Cookie.get('access_token')
            })
          }

          this._http.get(this.env.clientDetailsURL + this.env.userUri + this.env.userByIdMethod + data.id, httpAuthenticated)
            .subscribe(
              (data : any) => {
                console.log('DataUsers', data);
              },
              error => {
                console.log('Hay un error' ,error)
              })
        },
        error => {
          alert('Invalid Credentials');
          console.log('Hay un error' ,error)
        }
      );
  }

  saveToken(token: { expires_in: number; access_token: string; }) {
    const expireDate = new Date().getTime() + (1000 * token.expires_in);
    Cookie.set('access_token', token.access_token, expireDate);
    this._router.navigate(['/dashboard']);
  }

  saveData(token: { expires_in: number; access_token: string; }) {
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
