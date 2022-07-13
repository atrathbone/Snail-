import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../app-config.service';
import { shareReplay, Subject, tap } from 'rxjs';
import * as moment from 'moment';
import jwt_decode from 'jwt-decode';

export type Credentials = {
  username: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private appConfigService: AppConfigService
  ) {}

  public isLoggedIn$ = new Subject<boolean>();

  private backendUrl = this.appConfigService.getBackendUrl();

  public login(credentials: Credentials) {
    return this.httpClient.post(`${this.backendUrl}/auth`, credentials).pipe(
      shareReplay(),
      tap((res) => this.addSession(res))
    );
  }

  private addSession(response: any) {
    const expiresAt = moment().add(response.expiresIn, 'second');
    localStorage.setItem('id_token', response.access_token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  public logout() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.isLoggedIn$.next(false);
  }

  public isLoggedIn() {
    const loggedIn = moment().isBefore(this.getExpiration());
    this.isLoggedIn$.next(loggedIn);
    return loggedIn;
  }

  public getCurrentUser() {
    const jwt = localStorage.getItem('id_token');
    const decoded: any = jwt ? jwt_decode(jwt) : undefined;
    return decoded.userId;
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    if (expiration) {
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
    } else {
      return null;
    }
  }
}
