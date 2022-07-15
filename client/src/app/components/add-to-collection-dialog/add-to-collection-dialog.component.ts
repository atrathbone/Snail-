import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Card } from 'src/app/core/Models/card.model';
import { CardBrowserDialogComponent } from '../card-browser-dialog/card-browser-dialog.component';

type DialogData = {
  selectedCards: Card[];
};

@Component({
  selector: 'app-add-to-collection-dialog',
  templateUrl: './add-to-collection-dialog.component.html',
  styleUrls: ['./add-to-collection-dialog.component.css'],
})
export class AddToCollectionDialogComponent {
  public collectionname = new FormControl();
  constructor(
    public dialogRef: MatDialogRef<CardBrowserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
