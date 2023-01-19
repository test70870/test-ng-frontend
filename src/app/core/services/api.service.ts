import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
import { environment } from '../../../environment/environment';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) { }

  getHttpOptions(){
    let token = this.jwtService.getToken();
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': token,
        // 'Access-Control-Allow-Origin' : '*'
      })
    };
    return httpOptions;
  }

  signup(signupObject: Object): Observable<any>{
    return this.http.post(`${environment.config.apiUrl}users/signup`, signupObject);
  }

  login(loginObject: Object): Observable<any>{
    return this.http.post(`${environment.config.apiUrl}users/login`, loginObject);
  }

  getMyProfile(): Observable<any>{
    return this.http.get(`${environment.config.apiUrl}users/getMyProfile`, this.getHttpOptions());
  }

  listUsers(): Observable<any>{
    return this.http.get(`${environment.config.apiUrl}users/listUsers`, this.getHttpOptions());
  }

  getUserMessages(id: any): Observable<any>{
    return this.http.get(`${environment.config.apiUrl}users/messages/?id=${id}`, this.getHttpOptions());
  }

  createSocketRoom(): Observable<any>{
    return this.http.get(`${environment.config.apiUrl}users/createSocketRoom`);
  }

}
