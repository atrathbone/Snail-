import { IsNotEmpty } from 'class-validator';

export class AddCollectionDto {
  @IsNotEmpty()
  userId: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  cards: Array<string>;
}
