import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService, Credentials } from 'src/app/core/auth/auth.service';
import { confirmPasswordValidator } from 'src/app/core/auth/password.validator';

@Component({
  selector: 'app-signup-login',
  templateUrl: './signup-login.component.html',
  styleUrls: ['./signup-login.component.css'],
})
export class SignupLoginComponent implements OnInit {
  public hide: boolean = true;
  public loginOrSignup: 'LOG_IN' | 'SIGN_UP' = 'LOG_IN';
  public loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  public signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
  }, {validators: confirmPasswordValidator});

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.signupForm.valueChanges.subscribe((e)=>console.log(this.signupForm.errors))
  }

  submit() {
    if (this.loginOrSignup === 'LOG_IN') {
      console.log(this.loginForm.value);
    }
    if (this.loginOrSignup === 'SIGN_UP') {
      console.log(this.signupForm.value);
    }
  }

  // onClickLogin(credentials: Credentials) {
  //   this.authService.login(credentials).subscribe();
  // }
}
