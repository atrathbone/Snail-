import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

type DialogData = {
  imgUrl: string;
};
@Component({
  selector: 'app-card-browser-dialog',
  templateUrl: './card-browser-dialog.component.html',
  styleUrls: ['./card-browser-dialog.component.css'],
})
export class CardBrowserDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CardBrowserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
