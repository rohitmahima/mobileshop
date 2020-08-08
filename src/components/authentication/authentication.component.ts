import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationResponseModel } from './../../models/authenticationResponse.model';
import { AuthenticationService } from './../../Services/authentication.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})

export class AuthenticationComponent implements OnInit {
  isLogin = true;
  isLoading = false;
  error: string = null;
  loginForm: FormGroup;
  passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$!%*?&])[A-Za-z\\d@#$!%*?&]{8,}$';
  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern(this.passwordPattern)]),
      confirmPassword: new FormControl(null, [Validators.required, this.passwordConfirming.bind(this),
      Validators.pattern(this.passwordPattern)])
    });
  }

  onToggleButton() {
    this.isLogin = !this.isLogin;
  }

  onSubmit() {
    if (this.isLogin) {
      this.loginForm.controls['confirmPassword'].setValue(this.loginForm?.get('password').value);
    }
    if (!this.loginForm.valid) {
      return;
    }
    this.isLoading = true;
    const email = this.loginForm?.get('email').value;
    const password = this.loginForm?.get('password').value;

    let authObservable = new Observable<AuthenticationResponseModel>();

    if (this.isLogin) {
      authObservable = this.authenticationService.signIn(email, password);
    }
    else {
      authObservable = this.authenticationService.signUp(email, password);
    }

    authObservable.subscribe(resData => {
      this.isLoading = false;
      this.error = null;
      this.router.navigate(['']);
    }, errorRes => {
      this.error = errorRes;
      this.isLoading = false;

    });
    this.loginForm.reset();
  }

  passwordConfirming(control: FormControl): { confirmPasswordNotMatch: boolean } {

    if (control.value !== this.loginForm?.get('password').value) {
      return { confirmPasswordNotMatch: true };
    }
  }
}
