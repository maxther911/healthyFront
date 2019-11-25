import { DashboardComponent } from './component/dashboard/index';
import {AdminDashboardComponent} from "./component/admin-dashboard/index";
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './component/home/index';
import { LoginComponent } from './component/login/index';
import { RegisterComponent } from './component/register/index';
import { AuthGuard } from './_guards/index';
import {ForgotPasswordComponent} from "./component/forgot-password/index";
import {ProfileComponent} from "./component/profile/profile.component";
import {CreateAppComponent} from "./component/create-app/create-app.component";
import {ErrorComponent} from "./component/error/error.component";

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'admin', component: AdminDashboardComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'createApp', component: CreateAppComponent },
  { path: 'error', component: ErrorComponent },
    // otherwise redirect to home
  { path: '**', redirectTo: 'home' }
];

export const routing = RouterModule.forRoot(appRoutes);
