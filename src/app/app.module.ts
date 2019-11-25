import { LoginService } from './_services/login.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormBuilder, FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { AlertComponent } from './_directives/index';
import { AuthGuard } from './_guards/index';

import {AlertService, AuthenticationService, SensorsService, UserService, CountryService} from './_services/index';
import { HomeComponent } from './component/home/index';
import { LoginComponent } from './component/login/index';
import { RegisterComponent } from './component/register/index';
import { HeaderComponent } from './component/header/index';
import { FooterComponent } from './component/footer/index';
import { DashboardComponent } from './component/dashboard/index';
import {JwtInterceptor} from "./_helpers";
import { TemperatureComponent } from './component/temperature/temperature.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ProfileComponent } from './component/profile/profile.component';
import { CreateAppComponent } from './component/create-app/create-app.component';
import * as $ from "jquery";
import * as bootstrap from "bootstrap";;
import { ErrorComponent } from './component/error/error.component'
;
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component'
@NgModule({
    imports: [
      BrowserModule,
      FontAwesomeModule,
      FormsModule,
      HttpClientModule,
      routing
    ],
    declarations: [
      AppComponent,
      AlertComponent,
      HomeComponent,
      LoginComponent,
      RegisterComponent,
      HeaderComponent,
      FooterComponent,
      DashboardComponent,
      TemperatureComponent,
      ForgotPasswordComponent,
      ProfileComponent,
      CreateAppComponent,
      ErrorComponent
,
      AdminDashboardComponent    ],
  providers: [
      AuthGuard,
      AlertService,
      AuthenticationService,
      UserService,
      LoginService,
      SensorsService,
      CountryService,
      FormBuilder,
      {
          provide: HTTP_INTERCEPTORS,
          useClass: JwtInterceptor,
          multi: true,
      }
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
