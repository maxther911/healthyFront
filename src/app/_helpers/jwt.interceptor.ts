import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private env = environment;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser && currentUser.access_token) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer '+currentUser.access_token
        }
      });
    } else {
      request = request.clone({
        setHeaders: {
          Authorization: 'Basic ' + btoa(this.env.appConnect),
          'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
        }
      });
    }
    return next.handle(request);
  }
}
