import { Component, ViewChild } from '@angular/core';
import {
  MatDialog,
} from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/core/api/api.service';
import { Card } from 'src/app/core/Models/card.model';
import {CardBrowserDialogComponent} from 'src/app/components/card-browser-dialog/card-browser-dialog.component'
type DialogData = {
  imgUrl?: string;
};
type Lookup = { [key: string]: string };
@Component({
  selector: 'app-card-browser-table',
  templateUrl: './card-browser-table.component.html',
  styleUrls: ['./card-browser-table.component.css'],
})
export class CardBrowserTableComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public imgPaths: Lookup = {
    HAT: 'assets/images/small suits/HAT.png',
    EVIL: 'assets/images/small suits/EVIL.png',
    HPAIR: 'assets/images/small suits/HPAIR.png',
    SPAIR: 'assets/images/small suits/SPAIR.png',
    HAPPY: 'assets/images/small suits/HAPPY.png',
    SAD: 'assets/images/small suits/SAD.png',
    MOON: 'assets/images/small modifiers/MOONMOD.png',
    SUN: 'assets/images/small modifiers/SUNMOD.png',
    NONE: 'assets/images/small modifiers/NONE.png',
  };
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

  constructor(private apiService: ApiService, public dialog: MatDialog) {
    this.apiService.listCards().subscribe((data) => {
      this.cards = data;
      this.dataSource = new MatTableDataSource(this.cards);
      this.dataSource.paginator = this.paginator;
    });
  }

  public lookup(key: any) {
    return this.imgPaths[key.toString()];
  }

  public openDialog(img: any) {
    const dialogRef = this.dialog.open( CardBrowserDialogComponent, {
      data: { imgUrl: img },
    });
  }
}

