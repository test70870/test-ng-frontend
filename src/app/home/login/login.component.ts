import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { constant } from 'src/constants/constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted: Boolean = false;
  disableSubmit: Boolean = false;
  loginErrorMessage: any;
  constant: any = constant;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private apiService: ApiService,
    private jwtService: JwtService,
  ){
    this.loginForm = fb.group({
      email: ['', Validators.compose([
          Validators.required,
          Validators.pattern(constant.regEx.emailRegEx)
      ])],
      password: ['', Validators.compose([
          Validators.required,
      ])]
    });
  }

  public get f() {
    return this.loginForm.controls;
  }

  onSubmit(){
    this.loginErrorMessage = '';
    if(!this.loginForm.valid){
      console.log(this.loginForm.value, '        Invalid this.loginForm.value.........');
      this.submitted = true;
    }
    else{
      console.log(this.loginForm.value, '        Valid this.loginForm.value.........');
      this.disableSubmit = true;
      this.submitted = false;
      this.apiService.login(this.loginForm.value).subscribe(
        res=>{
          if(res.success){
            console.log(res,'   success res of signin');
            this.jwtService.saveToken(res.token);
            localStorage.setItem('isLoggedin', 'true');
            constant.loggedInUser = res.data;
            constant.isLogin = true;
            this.router.navigate(['/profile']);
          }
          else{
            console.log(res,'   error res of signin');
            this.loginErrorMessage = res.message;
            this.disableSubmit = false;
          }
        },
        err=>{
          console.log(err,'   err in signin');
          this.loginErrorMessage = err.error.message;
          this.disableSubmit = false;
        }
      );
    }

  }

}
