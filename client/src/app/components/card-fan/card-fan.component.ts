import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/core/Models/card.model';
import { PopulatedCollection } from 'src/app/core/Models/user.model';

@Component({
  selector: 'app-card-fan',
  templateUrl: './card-fan.component.html',
  styleUrls: ['./card-fan.component.css'],
})
export class CardFanComponent implements OnInit {
  @Input()
  public cards!: Card[];
  @Input()
  public large = false;
  public cardUrls: string[] = [];
  public loaded = false;

  public ngOnInit(): void {
    this.cardUrls = this.cards.map((card) => {
      return card.imageUrl;
    });
  }

  public imgLoaded() {
    this.loaded = true;
  }
}
