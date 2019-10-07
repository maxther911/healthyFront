import { DashboardComponent } from './component/dashboard/index';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './component/home/index';
import { LoginComponent } from './component/login/index';
import { RegisterComponent } from './component/register/index';
import { AuthGuard } from './_guards/index';
import {ForgotPasswordComponent} from "./component/forgot-password/index";

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'forgot', component: ForgotPasswordComponent },


    // otherwise redirect to home
    { path: '**', redirectTo: 'home' }
];

export const routing = RouterModule.forRoot(appRoutes);
