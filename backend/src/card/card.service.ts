import {
  Injectable,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { ICard, Value, Suit, CardType, Modifier } from './card.model';
import mongoose from 'mongoose';
import { CardDataDto } from './dto/card-data.dto';
import { CardDataGenService } from './card-data-gen/card-data-gen.service';
import { CardImageGenService } from './card-image-gen/card-image-gen.service';
import * as Jimp from 'jimp';
import { ImageUploadService } from './image-upload/image-upload.service';
import { IUser } from 'src/users/user.model';

@Injectable()
export class CardService {
  constructor(
    @InjectModel('Card') private readonly cardModel: Model<ICard>,
    private readonly dataGenService: CardDataGenService,
    private readonly imageGenService: CardImageGenService,
    private readonly imageUploadService: ImageUploadService,
  ) {}

  async create(cardImage: Jimp, createCardDto: CreateCardDto) {
    if (createCardDto.name.length > 10) {
      throw new BadRequestException();
    }
    const cardData = await this.dataGenService.generateCardData(createCardDto);
    const cardImg = await this.imageGenService.generateCardImage(
      cardImage,
      cardData,
    );
    if (!cardImg) {
      throw new HttpException('error creating card', HttpStatus.UNAUTHORIZED);
    }
    const cardUrl = await this.upload(cardImg);
    const newCard = new this.cardModel(cardData);
    newCard.imageUrl = cardUrl.url;
    return newCard.save().then((card) => {
      return card;
    });
  }

  async populateCards(cardsArray: string[]) {
    return await this.cardModel.find({
      _id: {
        $in: cardsArray,
      },
    });
  }

  async getPopulatedCollections(user: IUser) {
    const populated = [];
    for (let collection of user.collections) {
      const populatedCards = await this.populateCards(collection.cards);
      populated.push({
        id: collection.id,
        name: collection.name,
        cards: populatedCards,
      });
    }
    return populated;
  }

  async listCards() {
    return await this.cardModel.find({}).exec();
  }

  private async upload(img: Jimp) {
    const buffer = await img.quality(25).getBufferAsync(Jimp.MIME_JPEG);
    return await this.imageUploadService.imageUploader(buffer);
  }
}
