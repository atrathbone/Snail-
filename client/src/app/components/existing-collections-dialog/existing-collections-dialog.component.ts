import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs';
import { ApiService } from 'src/app/core/api/api.service';

@Component({
  selector: 'app-existing-collections-dialog',
  templateUrl: './existing-collections-dialog.component.html',
  styleUrls: ['./existing-collections-dialog.component.css'],
})
export class ExistingCollectionsDialogComponent implements OnInit {
  @Output()
  public updated = new EventEmitter<boolean>();
  @Input()
  public cards: string[] = [];
  public userCollections: any[] = [];
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService
      .getUser()
      .pipe(map((res: any) => res.data.collections))
      .subscribe((e) => {
        this.userCollections = e;
      });
  }

  public addToCollection(collectionId: string) {
    this.apiService
      .addToExistingCollection({
        cards: this.cards,
        collectionId,
      })
      .subscribe((e: any) => {
        this.updated.emit(true);
      });
  }
}
