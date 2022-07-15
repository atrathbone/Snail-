import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/core/api/api.service';
import { Card } from 'src/app/core/Models/card.model';
import { CardBrowserDialogComponent } from 'src/app/components/card-browser-dialog/card-browser-dialog.component';
import { FormControl, FormGroup } from '@angular/forms';
import { typeofExpr } from '@angular/compiler/src/output/output_ast';
import { combineLatest, startWith } from 'rxjs';
import { AddToCollectionDialogComponent } from '../add-to-collection-dialog/add-to-collection-dialog.component';
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
  public checked: { [key: string]: boolean } = {};
  public filterChips: string[] = [];
  public modifiers = new FormControl();
  public search = new FormControl();
  public suits = new FormControl();
  public cardTypes = new FormControl();
  public suitImgPaths: Lookup = {
    HAT: 'assets/images/small suits/HAT.png',
    EVIL: 'assets/images/small suits/EVIL.png',
    HPAIR: 'assets/images/small suits/HPAIR.png',
    SPAIR: 'assets/images/small suits/SPAIR.png',
    HAPPY: 'assets/images/small suits/HAPPY.png',
    SAD: 'assets/images/small suits/SAD.png',
  };
  public modifierImgPaths: Lookup = {
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
    'check',
  ];
  public cards: Card[] = [];

  ngAfterContentInit(): void {
    combineLatest([
      this.search.valueChanges.pipe(startWith(undefined)),
      this.suits.valueChanges.pipe(startWith(undefined)),
      this.modifiers.valueChanges.pipe(startWith(undefined)),
      this.cardTypes.valueChanges.pipe(startWith(undefined)),
    ]).subscribe(([search, suit, modifier, type]) => {
      const ob: any = { search, suit, modifier, type };
      this.filterChips = [];
      Object.keys(ob).forEach((k) => {
        if (ob[k]) {
          this.filterChips.push(k);
        }
      });
      const temp = [...this.cards];
      if (this.dataSource) {
        this.dataSource.data = temp.filter((card) => {
          if (suit && suit !== card.suit) {
            return false;
          }
          if (modifier && modifier !== card.modifier) {
            return false;
          }
          if (type && type !== card.type) {
            return false;
          }
          if (search) {
            if (
              !(
                card.name.toLowerCase().includes(search.toLowerCase()) ||
                card.creator.toLowerCase().includes(search.toLowerCase())
              )
            ) {
              return false;
            }
          }
          return true;
        });
      }
    });
  }

  constructor(private apiService: ApiService, public dialog: MatDialog) {
    this.apiService.listCards().subscribe((data) => {
      this.cards = data;
      data.forEach((card: Card) => {
        this.checked[card.id] = false;
      });
      this.dataSource = new MatTableDataSource(this.cards);
      this.dataSource.paginator = this.paginator;
    });
  }

  public applyFilters() {}

  public lookup(lookupType: 'MODIFIER' | 'SUIT', key: any) {
    if (lookupType === 'MODIFIER') {
      return this.modifierImgPaths[key.toString()];
    }
    if (lookupType === 'SUIT') {
      return this.suitImgPaths[key.toString()];
    } else {
      return '';
    }
  }

  public openCardDialog(img: any) {
    const dialogRef = this.dialog.open(CardBrowserDialogComponent, {
      data: { imgUrl: img },
    });
  }

  public removeChip(chip: any) {
    const i = this.filterChips.indexOf(chip);
    if (i > -1) {
      this.filterChips.splice(i, 1);
    }
    switch (chip) {
      case 'search':
        this.search.patchValue(undefined);
        break;
      case 'suit':
        this.suits.patchValue(undefined);
        break;
      case 'modifier':
        this.modifiers.patchValue(undefined);
        break;
      case 'type':
        this.cardTypes.patchValue(undefined);
    }
  }

  public addToCollection() {
    const toCollect = Object.keys(this.checked).filter((k) => {
      return this.checked[k] === true;
    });
    if (toCollect.length > 0) {
      const dialogRef = this.dialog.open(AddToCollectionDialogComponent, {
        data: { selectedCards: toCollect },
      });
    }
  }
}
