import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Cookie} from 'ng2-cookies';

import {User} from '../_models/index';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';


@Injectable()
export class UserService {
  public credentials: Observable<User>;
  private env = environment;

  constructor(private _http: HttpClient,
    private http: HttpClient) {}

  getAll() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer ' + Cookie.get('access_token')
      })
    };

    return this._http.get(this.env.clientDetailsURL + this.env.userUri + this.env.getAll, httpOptions)
      .subscribe((res: any) => {
            console.log(res)
        },
        (error: any) => {
          error.json().error || 'Server error'
        });
  }

  getResource() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Bearer ' + Cookie.get('access_token')
      })
    };

    return this._http.get(environment.userUri + environment.extraMethod, httpOptions)
      .subscribe((res: Response) => {
        return res.json()
      }, (error: any) => {
        console.error('error', error)
      });
  }

  getById(id: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json;charset=UTF-8',
        'Authorization': 'Bearer ' + Cookie.get('access_token')
      })
    };
    return this._http.get(environment.userUri + environment.userById + id, httpOptions)
      .subscribe((res: any) => {
          this.credentials = res.json();
        },
        (error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  create(user: User) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json;charset=UTF-8'
      })
    };

    return this.http.post(this.env.clientDetailsURL + 'NonUser/save', user, httpOptions);
  }



  update(user: User) {
    return this.http.put('/api/users/' + user.id, user);
  }

  delete(id: number) {
    return this.http.delete('/api/users/' + id);
  }

  checkTokenValidity() : boolean{
    this._http.get(this.env.authenticatedUri + this.env.checkToken)
      .subscribe((res: Response) => {
        console.log(res);
        return true;
      }, (error: any) => {
        console.error('error', error);
        return false;
      });
    return false;
  }
}
