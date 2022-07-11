import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupLoginComponent } from './components/signup-login/signup-login.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SignupLoginComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
  ],
  exports: [SignupLoginComponent],
})
export class ComponentsModule {}
