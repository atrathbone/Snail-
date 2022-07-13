import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { ComponentsModule } from '../components/components.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateCardComponent } from './create-card/create-card.component';

@NgModule({
  declarations: [AuthComponent, DashboardComponent, CreateCardComponent],
  imports: [CommonModule, ComponentsModule],
  exports: [AuthComponent],
})
export class PagesModule {}
