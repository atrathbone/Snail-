import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../app-config.service';

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
    return this.httpClient.post<Credentials>(
      `${this.backendUrl}/auth`,
      credentials
    );
  }
}
