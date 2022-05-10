import { CardType, Suit, Value, Modifier } from '../card.model';

export class CardDataDto {
  name: string;
  type: CardType;
  suit: Suit;
  value: Value;
  modifier: Modifier;
  creator: string;
}
