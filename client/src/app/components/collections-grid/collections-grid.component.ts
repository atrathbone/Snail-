import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { ApiService } from 'src/app/core/api/api.service';
import { Card } from 'src/app/core/Models/card.model';
import { PopulatedCollection } from 'src/app/core/Models/user.model';

type Lookup = { [key: string]: string };

@Component({
  selector: 'app-collections-grid',
  templateUrl: './collections-grid.component.html',
  styleUrls: ['./collections-grid.component.css'],
})
export class CollectionsGridComponent implements OnInit {
  public collections: PopulatedCollection[] = [];
  public selected: PopulatedCollection | undefined = undefined;
  public checked: { [key: string]: boolean } = {};
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
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.refreshData();
  }

  public navigate(to: string) {
    this.router.navigate([to]);
  }

  public select(collection: any) {
    this.dataSource = collection.cards;
    this.selected = collection;
  }

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

  public removeCards() {
    const cardsToRemove = Object.keys(this.checked).filter((k) => {
      return this.checked[k] === true;
    });
    this.apiService
      .removeFromCollection({
        collectionId: this.selected?.id!,
        cards: cardsToRemove,
      })
      .subscribe({
        next: () => {
          this.checked = {};
          this.selected = undefined;
          this.refreshData();
        },
        error: () => {
          this.checked = {};
        },
      });
  }

  public refreshData() {
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

  public canRemove() {
    const markedToRemove = Object.keys(this.checked).filter((k) => {
      return this.checked[k] === true;
    });
    return (
      this.selected?.cards.length! - markedToRemove.length <= 0 ||
      markedToRemove.length === 0
    );
  }

  public onClickGoBack() {
    this.checked = {};
    this.selected = undefined;
  }
}
