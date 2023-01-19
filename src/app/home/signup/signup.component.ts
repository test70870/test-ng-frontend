import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/services/api.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { constant } from 'src/constants/constant';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup;
  submitted: Boolean = false;
  disableSubmit: Boolean = false;
  loginErrorMessage: any;
  constant: any = constant;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private jwtService: JwtService,
    private router: Router
  ){
    this.signupForm = fb.group({
      firstName: ['', Validators.compose([
        Validators.required,
      ])],
      lastName: ['', Validators.compose([
        Validators.required,
      ])],
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
    return this.signupForm.controls;
  }

  onSubmit(){
    this.loginErrorMessage = '';
    if(!this.signupForm.valid){
      console.log(this.signupForm.value, '        Invalid this.signupForm.value.........');
      this.submitted = true;
    }
    else{
      console.log(this.signupForm.value, '        Valid this.signupForm.value.........');
      this.disableSubmit = true;
      this.submitted = false;
      this.apiService.signup(this.signupForm.value).subscribe(
        res=>{
          if(res.success){
            console.log(res,'   success res of signupForm');
            this.jwtService.saveToken(res.token);
            localStorage.setItem('isLoggedin', 'true');
            constant.loggedInUser = res.data;
            constant.isLogin = true;
            this.router.navigate(['/profile']);
          }
          else{
            console.log(res,'   error res of signupForm');
            this.loginErrorMessage = res.message;
            this.disableSubmit = false;
          }
        },
        err=>{
          console.log(err,'   err in signupForm');
          this.loginErrorMessage = err.error.message;
          this.disableSubmit = false;
        }
      );
    }

  }

}
