import { CardType, Suit, Value, Modifier, ICard } from '../card.model';
import { CardDataDto } from './card-data.dto';

export class CardDto extends CardDataDto {
  id: string;

  public static fromEntity(entity: ICard) {
    const dto = new CardDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.type = entity.type;
    dto.suit = entity.suit;
    dto.value = entity.value;
    dto.modifier = entity.modifier;
    dto.creator = entity.creator;
    return dto;
  }
}
