import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth/auth.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [AuthComponent],
  imports: [CommonModule, ComponentsModule],
  exports: [AuthComponent],
})
export class PagesModule {}
