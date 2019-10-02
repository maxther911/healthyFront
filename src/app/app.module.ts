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

import {AlertService, AuthenticationService, SensorsService, UserService} from './_services/index';
import { HomeComponent } from './home/index';
import { LoginComponent } from './component/login/index';
import { RegisterComponent } from './component/register/index';
import { HeaderComponent } from './component/header/index';
import { FooterComponent } from './component/footer/index';
import { DashboardComponent } from './component/dashboard/index';
import {JwtInterceptor} from "./_helpers";

import * as $ from "jquery";;
import { TemperatureComponent } from './component/temperature/temperature.component'


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
        DashboardComponent
,
        TemperatureComponent
    ],
    providers: [
        AuthGuard,
        AlertService,
        AuthenticationService,
        UserService,
        LoginService,
        SensorsService,
        FormBuilder,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
