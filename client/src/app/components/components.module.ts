import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupLoginComponent } from './signup-login/signup-login.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { CardGenComponent } from './card-gen/card-gen.component';
import { SingleCardComponent } from './single-card/single-card.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTableModule } from '@angular/material/table';
import { CardBrowserTableComponent } from './card-browser-table/card-browser-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { CardBrowserDialogComponent } from './card-browser-dialog/card-browser-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MatChipsModule } from '@angular/material/chips';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { AddToCollectionDialogComponent } from './add-to-collection-dialog/add-to-collection-dialog.component';
import { ExistingCollectionsDialogComponent } from './existing-collections-dialog/existing-collections-dialog.component';
import { MatListModule } from '@angular/material/list';
import { CollectionsGridComponent } from './collections-grid/collections-grid.component';
import { CardFanComponent } from './card-fan/card-fan.component';
import { DashboardDisplayComponent } from './dashboard-display/dashboard-display.component';
import { DownloadDialogComponent } from './download-dialog/download-dialog.component';

@NgModule({
  declarations: [
    SignupLoginComponent,
    CardGenComponent,
    SingleCardComponent,
    CardBrowserTableComponent,
    CardBrowserDialogComponent,
    AddToCollectionDialogComponent,
    ExistingCollectionsDialogComponent,
    CollectionsGridComponent,
    CardFanComponent,
    DashboardDisplayComponent,
    DownloadDialogComponent,
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    MatChipsModule,
    MatCheckboxModule,
    FormsModule,
    MatListModule,
  ],
  exports: [
    SignupLoginComponent,
    CardGenComponent,
    CardBrowserTableComponent,
    CardBrowserDialogComponent,
    CollectionsGridComponent,
    DashboardDisplayComponent,
  ],
})
export class ComponentsModule {}
