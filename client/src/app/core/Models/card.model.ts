

export interface Card {
  creator: string;
  creatorId: string;
  id: string;
  imageUrl: string;
  modifier: Modifier;
  name: string;
  suit: Suit;
  type: CardType;
  value: Value;
}

export type CardType = 'CURSED' | 'CRYSTAL' | 'SUN' | 'MOON' | 'BW';
export type Suit = 'HAT' | 'EVIL' | 'HPAIR' | 'SPAIR' | 'HAPPY' | 'SAD';
export type Value = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export type Modifier = 'SUN' | 'MOON' | 'NONE';
