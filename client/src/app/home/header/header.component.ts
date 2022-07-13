import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public isLoggedIn = this.authService.isLoggedIn();
  @Output()
  toggle = new EventEmitter();
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((v) => {
      this.isLoggedIn = v;
    });
  }

  public logOut() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}
