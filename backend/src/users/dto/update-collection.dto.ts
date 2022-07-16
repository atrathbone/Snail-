import { IsNotEmpty } from 'class-validator';

export class UpdateCollectionDto {
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  collectionId: string;
  @IsNotEmpty()
  cards: Array<string>;
}
