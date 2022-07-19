import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/core/api/api.service';

type DialogData = {
  cards: string[];
};

@Component({
  selector: 'app-download-dialog',
  templateUrl: './download-dialog.component.html',
  styleUrls: ['./download-dialog.component.css'],
})
export class DownloadDialogComponent {
  public file: any;
  public isLoading = false;
  constructor(
    public dialogRef: MatDialogRef<DownloadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private apiService: ApiService
  ) {}

  public generate() {
    this.isLoading = true;
    this.apiService
      .generateDownload({ cards: this.data.cards })
      .subscribe({
        next: (res: any) => {
          this.file = res.data;
        },
        error: (err) => {
          console.log(err)
          this.dialogRef.close();
        },
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
