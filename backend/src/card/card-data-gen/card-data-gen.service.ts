import { Injectable } from '@nestjs/common';
import { Value, Suit, CardType, Modifier } from '../card.model';

type SuitLookUp = {
  [key: number]: Suit;
};

@Injectable()
export class CardDataGenService {
  public suit(cardType: CardType): Suit {
    let suitsLookup: SuitLookUp = {
      1: 'HAT',
      2: 'EVIL',
      3: 'HPAIR',
      4: 'SPAIR',
      5: 'HAPPY',
      6: 'SAD',
    };
    let suitType!: Suit;
    switch (cardType) {
      case 'BW':
        suitType = suitsLookup[this.numberGen(1, 6) as number];
        break;
      case 'SUN':
        suitType = suitsLookup[this.numberGen(5, 6) as number];
        break;
      case 'MOON':
        suitType = suitsLookup[this.numberGen(5, 6) as number];
        break;
      case 'CURSED':
        suitType = suitsLookup[this.numberGen(1, 2) as number];
        break;
      case 'CRYSTAL':
        suitType = suitsLookup[this.numberGen(3, 4) as number];
        break;
    }
    return suitType;
  }

  public type(date: Date): CardType {
    let cardType!: CardType;
    if (this.numberGen(0, 10, [1, 1])) {
      cardType = 'BW';
    } else {
      let amOrPm: 'AM' | 'PM';
      date.getHours() < 17 ? (amOrPm = 'AM') : (amOrPm = 'PM');
      if (amOrPm === 'AM') {
        this.numberGen(1, 10, [1, 2])
          ? (cardType = 'CRYSTAL')
          : (cardType = 'SUN');
      }
      if (amOrPm === 'PM') {
        this.numberGen(1, 10, [1, 2])
          ? (cardType = 'CURSED')
          : (cardType = 'MOON');
      }
    }
    return cardType;
  }

  public value(): Value {
    return this.numberGen(1, 10) as Value;
  }

  public modifier(type: CardType) {
    let modifier: Modifier = 'NONE';
    if (type === 'SUN' || type === 'MOON') {
      this.numberGen(1, 10, [1, 5]) ? (modifier = 'SUN') : (modifier = 'MOON');
    }
    return modifier;
  }

  private numberGen(
    min: number,
    max: number,
    targetRange?: [number, number],
  ): boolean | number {
    let random = Math.floor(Math.random() * (max - min + 1)) + min;
    if (targetRange) {
      return random >= targetRange[0] && random <= targetRange[1];
    } else {
      return random;
    }
  }

  public cursedName(name: string): string {
    let cursedName: string = '';
    for (let letter of name) {
      if (Math.random() < 0.5) {
        cursedName += letter.toUpperCase();
      } else {
        cursedName += letter.toLowerCase();
      }
    }
    return cursedName;
  }
}
