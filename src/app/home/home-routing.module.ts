import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanActivateLoginSignupService } from '../core/services/can-activate-login-signup.service';
import { CanActivateAuthService } from '../core/services/can-activate-auth.service';
import { HomeComponent } from './home.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', title: 'TestNgFrontend', component: HomepageComponent },
      { path: 'login', title: 'Login', component: LoginComponent, canActivate: [CanActivateLoginSignupService] },
      { path: 'signup', title: 'Signup', component: SignupComponent, canActivate: [CanActivateLoginSignupService] },
      { path: 'profile', title: 'Profile', component: ProfileComponent, canActivate: [CanActivateAuthService] },
      { path: 'messages', title: 'Messages', component: MessagesComponent, canActivate: [CanActivateAuthService] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
