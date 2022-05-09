import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICard } from './card.model';
import { Logger } from '@nestjs/common';
import mongoose from 'mongoose';

@Injectable()
export class CardService {
  constructor(@InjectModel('Card') private readonly cardModel: Model<ICard>) {}

  async create() {
    const testId = new mongoose.Types.ObjectId()
    const newCard = new this.cardModel({
      name: 'test',
      type: 'CURSED',
      suit: 'EVIL',
      value: 3,
      modifier: 'MOON',
      creator: testId,
    });
    const createdCard = await newCard.save()
    return createdCard.id as string;
    Logger.log(createdCard);
  }
}
