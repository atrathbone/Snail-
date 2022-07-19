import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../app-config.service';
import { map, Observable, shareReplay } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Card } from '../Models/card.model';

export type NewUser = {
  name: string;
  username: string;
  password: string;
};

export type GenerateDownload = {
  cards: string[];
};

export type NewCard = {
  name: string;
  file: File;
};

export type NewCollection = {
  name: string;
  cards: string[];
  userId?: string;
};

export type UpdateCollection = {
  userId?: string;
  collectionId: string;
  cards: string[];
};

export type GetUser = {
  userId: string;
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private httpClient: HttpClient,
    private appConfigService: AppConfigService,
    private authService: AuthService
  ) {}
  private backendUrl = this.appConfigService.getBackendUrl();

  public createUser(newUser: NewUser) {
    return this.httpClient
      .post(`${this.backendUrl}/users`, newUser)
      .pipe(shareReplay());
  }

  public generateCard(newCard: NewCard) {
    const formData = new FormData();
    const creatorId = this.authService.getCurrentUser();
    formData.append('imgFile', newCard.file);
    formData.append('creatorId', creatorId);
    formData.append('name', newCard.name);
    return this.httpClient.post(`${this.backendUrl}/card`, formData);
  }

  public addNewCollection(newCollection: NewCollection) {
    const userId = this.authService.getCurrentUser();
    newCollection.userId = userId;
    return this.httpClient.post(
      `${this.backendUrl}/users/collection`,
      newCollection
    );
  }

  public addToExistingCollection(updateCollection: UpdateCollection) {
    const userId = this.authService.getCurrentUser();
    updateCollection.userId = userId;
    return this.httpClient.patch(
      `${this.backendUrl}/users/collection`,
      updateCollection
    );
  }

  public removeFromCollection(updateCollection: UpdateCollection) {
    const userId = this.authService.getCurrentUser();
    updateCollection.userId = userId;
    return this.httpClient.patch(
      `${this.backendUrl}/users/collection/remove`,
      updateCollection
    );
  }

  public getPopulatedCollections() {
    const userId = this.authService.getCurrentUser();
    return this.httpClient.get(`${this.backendUrl}/card/collection/${userId}`);
  }

  public listCards() {
    return this.httpClient
      .get(`${this.backendUrl}/card`)
      .pipe(map((res: any) => res.data));
  }

  public getUser() {
    const userId = this.authService.getCurrentUser();
    return this.httpClient.get(`${this.backendUrl}/users/${userId}`);
  }

  public generateDownload(generateDownload: GenerateDownload) {
    return this.httpClient.post(`${this.backendUrl}/card/download`, generateDownload);
  }
}
