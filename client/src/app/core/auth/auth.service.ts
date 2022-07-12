import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../app-config.service';
import { map, shareReplay, tap } from 'rxjs';
import * as moment from 'moment';

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
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    if (expiration) {
      const expiresAt = JSON.parse(expiration);
      return moment(expiresAt);
    } else {
      return undefined;
    }
  }
}
