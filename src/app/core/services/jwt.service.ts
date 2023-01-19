import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { constant } from '../../../constants/constant';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(
    private router: Router,
  ) { }

  saveToken(token : string){
    localStorage.setItem('jwtToken', token);
  }

  getToken(): any {
    return localStorage.getItem('jwtToken');
  }

  destroyTokenAndLogout(){
    localStorage.clear();
    constant.isLogin = false;
    constant.loggedInUser = {};
    // localStorage.removeItem('jwtToken');
    // localStorage.removeItem('isLoggedin');
    // localStorage.removeItem('username');
    this.router.navigate(['/']);
  }

}
