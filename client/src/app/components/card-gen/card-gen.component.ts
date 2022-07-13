import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/api/api.service';
import { Card } from 'src/app/core/Models/card.model';

@Component({
  selector: 'app-card-gen',
  templateUrl: './card-gen.component.html',
  styleUrls: ['./card-gen.component.css'],
})
export class CardGenComponent implements OnInit {
  public card: any = undefined;
  public cantCreate = false;
  public isLoading = false;
  public file!: File | undefined;
  public form = new FormGroup({
    cardname: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
    ]),
  });

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  public setFile(event: any) {
    if (event.target.files[0]) {
      this.file = event.target.files[0];
    }
  }

  public uploadFile() {
    this.isLoading = true;
    this.apiService
      .generateCard({ file: this.file!, name: this.form.value.cardname })
      .subscribe({
        next: (res: any) => {
          const card: Card = res.data;
          this.card = card.imageUrl;
          this.form.patchValue({ cardname: '' });
          this.file = undefined;
          this.isLoading = false;
        },
        error: () => {
          this.cantCreate = true;
        },
      });
  }

  public createAnother() {
    this.card = undefined;
  }
}
