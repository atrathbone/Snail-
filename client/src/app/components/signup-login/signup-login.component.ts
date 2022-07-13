import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/core/api/api.service';
import { AuthService, Credentials } from 'src/app/core/auth/auth.service';
import { confirmPasswordValidator } from 'src/app/core/auth/password.validator';

@Component({
  selector: 'app-signup-login',
  templateUrl: './signup-login.component.html',
  styleUrls: ['./signup-login.component.css'],
})
export class SignupLoginComponent implements OnInit {
  public badCredentials = false;
  public cantCreate = false;
  public hide: boolean = true;
  public loginOrSignup: 'LOG_IN' | 'SIGN_UP' = 'LOG_IN';
  public loginForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  public signupForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
    },
    { validators: confirmPasswordValidator }
  );

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm.valueChanges.subscribe(() => (this.badCredentials = false));
  }

  submit() {
    if (this.loginOrSignup === 'LOG_IN') {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['']);
        },
        error: () => {
          this.badCredentials = true;
        },
      });
    }
    if (this.loginOrSignup === 'SIGN_UP') {
      this.apiService.createUser(this.signupForm.value).subscribe({
        next: () => {
          this.loginOrSignup = 'LOG_IN';
        },
        error: () => {
          this.cantCreate = true;
        },
      });
      console.log(this.signupForm.value);
    }
  }

  onClickLogin(credentials: Credentials) {
    this.authService.login(credentials).subscribe();
  }
}
