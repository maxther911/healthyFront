import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthenticationService {
    servicsUrl = 'http://192.168.145.1:7101/things/greetings/getUsers';
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.get<any>(this.servicsUrl)
            .pipe(user => {
                 return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
