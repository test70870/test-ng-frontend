import { Component } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { JwtService } from '../core/services/jwt.service';
import { constant } from '../../constants/constant';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    private router: Router,
    private apiService: ApiService,
    private jwtService: JwtService,
  ){

  }

  getMyProfile(){
    this.apiService.getMyProfile().subscribe(
      res=>{
        console.log(res, '   res of getMyProfile in home component');
        if(res.success){
          constant.loggedInUser = res.data;
          constant.isLogin = true;
          this.router.navigate([`${this.router.url}`]);
        }
        else{
          this.jwtService.destroyTokenAndLogout();
        }
      },
      err=>{
        this.jwtService.destroyTokenAndLogout();
      }
    );
  }

  ngOnInit() {
    this.getMyProfile();
  }

}
