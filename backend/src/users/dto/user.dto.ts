import { ICollection, IUser } from '../user.model';

export class UserDto {
  id: string;
  username: string;
  name: string;
  collections: CollectionDto[];

  public static fromEntity(entity: IUser) {
    const dto = new UserDto();
    dto.id = entity.id;
    dto.username = entity.username;
    dto.name = entity.name;
    dto.collections = entity.collections.map((e) => {
      return new CollectionDto(e.name, e.id, e.cards);
    });
    return dto;
  }
}

export class CollectionDto implements ICollection {
  constructor(name: string, id: string, cards: string[]) {
    this.name = name;
    this.id = id;
    this.cards = cards;
  }
  name: string;
  id: string;
  cards: string[];
}
