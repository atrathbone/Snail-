import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api/api.service';
import { Card } from 'src/app/core/Models/card.model';

@Component({
  selector: 'app-card-browser-table',
  templateUrl: './card-browser-table.component.html',
  styleUrls: ['./card-browser-table.component.css'],
})
export class CardBrowserTableComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public dataSource!: MatTableDataSource<Card>;
  public displayedColumns: string[] = [
    'imgUrl',
    'name',
    'type',
    'suit',
    'modifier',
    'value',
    'creator',
  ];
  public cards!: Card[];

  constructor(private apiService: ApiService) {
    this.apiService.listCards().subscribe((data) => {
      this.cards = data;
      this.dataSource = new MatTableDataSource(this.cards);
      this.dataSource.paginator = this.paginator;
    });
  }
}
