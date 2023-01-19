import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/core/services/jwt.service';
import { constant } from 'src/constants/constant';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constant: any = constant;
  constructor(
    private router: Router,
    private jwtService: JwtService
  ){

  }

  goToHomepage(){
    this.router.navigate(['/']);
  }

  goToLogin(){
    this.router.navigate(['/login']);
  }

  goToSignup(){
    this.router.navigate(['/signup']);
  }

  goToProfile(){
    this.router.navigate(['/profile']);
  }

  goToMessages(){
    this.router.navigate(['/messages']);
  }

  logOut(){
    this.jwtService.destroyTokenAndLogout();
    this.router.navigate(['/']);
  }

}
