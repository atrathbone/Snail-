import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ApiService } from 'src/app/core/api/api.service';
import { Collection } from 'src/app/core/Models/user.model';

@Component({
  selector: 'app-collections-grid',
  templateUrl: './collections-grid.component.html',
  styleUrls: ['./collections-grid.component.css'],
})
export class CollectionsGridComponent implements OnInit {
  public collections: Collection[] = [];
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService
      .getPopulatedCollections()
      .pipe(
        map((res: any) => {
          return res.data;
        })
      )
      .subscribe((collections) => {
        this.collections = collections;
      });
  }
}
