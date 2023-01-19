import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateAuthService implements CanActivate {
  constructor(
    private jwtService: JwtService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const token = this.jwtService.getToken();
    if(token){
      return true;
    }
    else{
      return false;
    }
    // throw new Error('Method not implemented.');
  }
}
