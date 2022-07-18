import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { startWith, Subject } from 'rxjs';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public toggle = new Subject();
  public toggle$ = this.toggle.asObservable();
  public loggedIn$ = this.authService.isLoggedIn$;

  @ViewChild(MatSidenav) sidenav!: MatSidenav;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.toggle$.subscribe(() => this.sidenav.toggle());
  }
}
