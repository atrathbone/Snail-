import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../app-config.service';
import { shareReplay, tap } from 'rxjs';

export type NewUser = {
  name: string;
  username: string;
  password: string;
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private httpClient: HttpClient,
    private appConfigService: AppConfigService
  ) {}
  private backendUrl = this.appConfigService.getBackendUrl();

  public createUser(newUser: NewUser) {
    return this.httpClient
      .post(`${this.backendUrl}/users`, newUser)
      .pipe(shareReplay());
  }
}
