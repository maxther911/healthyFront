import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Cookie } from 'ng2-cookies';

import { User, Data } from '../_models/net/mrsistemas/index';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
    public  credentials: Observable<User>;
    constructor(private _http: HttpClient,
        private http: HttpClient) { }

    getAll() {
        const httpOptions = {
        headers: new HttpHeaders({
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
          'Authorization': 'Bearer ' + Cookie.get('access_token')
        })
      }

        return this._http.get(environment.userUri + environment.extraMethod , httpOptions)
          .subscribe((res: any) => {
              console.log('Respuesta data' + res.json());
            },
            (error: any) => {error.json().error || 'Server error'});
    }

    getResource() {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
          'Authorization': 'Bearer ' + Cookie.get('access_token')
        })
      }

        return this._http.get(environment.userUri + environment.extraMethod, httpOptions)
        .subscribe((res: Response) => {
          return res.json()
          }, (error: any) => {console.log('error' , error)});
      }

    getById(id: number) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
          'Authorization': 'Bearer ' + Cookie.get('access_token')
        })
      }
        return this._http.get(environment.userUri + environment.userById + id, httpOptions)
        .subscribe((res: any) => {
            this.credentials = res.json();
        },
          (error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    create(user: User) {
        return this.http.post('/api/users', user);
    }

    update(user: User) {
        return this.http.put('/api/users/' + user.id, user);
    }

    delete(id: number) {
        return this.http.delete('/api/users/' + id);
    }

  getAuthenticated(): any {
    const httpAuthenticated = {
      headers: new HttpHeaders({
        'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Bearer ' + Cookie.get('access_token')
      })
    }
    return httpAuthenticated;
  }
}
