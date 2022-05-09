import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CardSchema } from './card.model';
import { CardDataGenService } from './card-data-gen/card-data-gen.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Card', schema: CardSchema }])],
  controllers: [CardController],
  providers: [CardService, CardDataGenService],
})
export class CardModule {}
