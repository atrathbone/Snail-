import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { ComponentsModule } from '../components/components.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateCardComponent } from './create-card/create-card.component';
import { BrowseCardsComponent } from './browse-cards/browse-cards.component';
import { CollectionsComponent } from './collections/collections.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AuthComponent,
    DashboardComponent,
    CreateCardComponent,
    BrowseCardsComponent,
    CollectionsComponent,
  ],
  imports: [CommonModule, ComponentsModule, MatCardModule],
  exports: [AuthComponent],
})
export class PagesModule {}
