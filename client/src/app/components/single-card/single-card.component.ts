import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-single-card',
  templateUrl: './single-card.component.html',
  styleUrls: ['./single-card.component.css'],
})
export class SingleCardComponent implements OnInit {
  @Input()
  public cardUrl: string | undefined;
  public loaded = false;

  constructor() {}

  ngOnInit(): void {}

  public imgLoaded() {
    this.loaded = true;
  }
}
