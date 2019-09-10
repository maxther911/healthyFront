import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Cookie } from 'ng2-cookies';

import { User, Usuario, Credentials } from '../_models/net/mrsistemas/index';
import { Router } from '@angular/router';
// tslint:disable-next-line:import-blacklist
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';



@Injectable()
export class UserService {
    public  credentials: User;
    constructor(private _http: Http,
        private http: HttpClient) { }

    getAll() {
        console.log('Consultando datos....');
        const headers = new Headers({ 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Bearer ' + Cookie.get('access_token') });
        const options = new RequestOptions({ headers: headers });
        return this._http.get(environment.userUri + environment.extraMethod , options)
          .map((res: Response) => {

              console.log('Respuesta data' + res.json());
            })
          .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getResource(): Observable<Credentials> {
        const headers = new Headers({ 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Bearer ' + Cookie.get('access_token') });

        const options = new RequestOptions({ headers: headers });
        return this._http.get(environment.userUri + environment.extraMethod, options)
        .map((res: Response) => res.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
      }

    getById(id: number): Observable<User> {
        const headers = new Headers({ 'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Authorization': 'Bearer ' + Cookie.get('access_token') });

        const options = new RequestOptions({ headers: headers });
        return this._http.get(environment.userUri + environment.userByIdMethod + id, options)
        .map((res: Response) => {res.json();
            this.credentials = res.json();
        return res.json(); })
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
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
}
