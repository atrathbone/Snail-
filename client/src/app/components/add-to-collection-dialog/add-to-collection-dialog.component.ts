import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/api/api.service';
import { Card } from 'src/app/core/Models/card.model';
import { CardBrowserDialogComponent } from '../card-browser-dialog/card-browser-dialog.component';

type DialogData = {
  selectedCards: string[];
};

@Component({
  selector: 'app-add-to-collection-dialog',
  templateUrl: './add-to-collection-dialog.component.html',
  styleUrls: ['./add-to-collection-dialog.component.css'],
})
export class AddToCollectionDialogComponent {
  public createNewOrAdd: 'CREATE_NEW' | 'ADD' = 'CREATE_NEW';
  public error: string | undefined = undefined;
  public collectionname = new FormControl();
  constructor(
    private apiService: ApiService,
    public dialogRef: MatDialogRef<CardBrowserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  addToNewCollection(cards: string[]) {
    const collectionName = this.collectionname.value;
    this.apiService
      .addNewCollection({ name: collectionName, cards })
      .subscribe({
        next: () => {
          this.dialogRef.close();
        },
        error: () => {
          this.error = 'Error creating new Collection';
        },
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
