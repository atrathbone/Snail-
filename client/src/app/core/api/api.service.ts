import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../app-config.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private httpClient: HttpClient,
    private appConfigService: AppConfigService
  ) {}
  private backendUrl = this.appConfigService.getBackendUrl();

  
}
