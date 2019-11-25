import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Country } from "../_models/net/mrsistemas";
import {environment} from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private env = environment;

  constructor(private _http: HttpClient) { }

  getResource(name: string) {
    return this._http.get(this.env.clientDetailsURL+this.env.country+this.env.getCountryLikeByName+name)
  }  
}
