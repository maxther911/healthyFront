import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {tap} from "rxjs/operators";
import {Cookie} from "ng2-cookies";
import {AlertService} from "../_services";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private env = environment;

  constructor(private _alert: AlertService){}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    console.info('Intercept', request.clone().url)

    if (request.clone().url.endsWith(this.env.checkToken)) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Basic ' + btoa(this.env.appConnect)
        },
        url : request.url + '?token='+ currentUser.access_token
      });
    } else {
      if (currentUser && currentUser.access_token) {
        request = request.clone({
          setHeaders: {
            Authorization: 'Bearer ' + currentUser.access_token
          }
        });
      } else {
        request = request.clone({
          setHeaders: {
            Authorization: 'Basic ' + btoa(this.env.appConnect)
          }
        });
      }
    }

    return next.handle(request).pipe(
      tap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && event.status === 401) {
          localStorage.clear();
          Cookie.deleteAll('/');
          this._alert.error('La session ha caducado', false);
          window.location.replace('/login');
          console.log('event.status: ' , event.status);
        }else{
          console.log(event)
        }
      })
    );
  }

}
