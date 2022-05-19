import { Component, OnInit } from '@angular/core';
import { AuthService, Credentials } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-signup-login',
  templateUrl: './signup-login.component.html',
  styleUrls: ['./signup-login.component.css'],
})
export class SignupLoginComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onClickLogin(credentials: Credentials) {
    this.authService.login(credentials).subscribe();
  }
}
