import { Injectable } from '@nestjs/common';
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

@Injectable()
export class CardService {
  constructor(
    @InjectModel('Card') private readonly cardModel: Model<ICard>,
    private readonly dataGenService: CardDataGenService,
    private readonly imageGenService: CardImageGenService,
    private readonly imageUploadService: ImageUploadService,
  ) {}

  public create(
    cardImage: Jimp,
    createCardDto: CreateCardDto,
  ): Promise<CardDataDto> {
    return new Promise((resolve, reject) => {
      const cardData = this.dataGenService.generateCardData(createCardDto);
      this.imageGenService
        .generateCardImage(cardImage, cardData)
        .then((img) => {
          const newCard = new this.cardModel(cardData);
          newCard.save().then((card) => {
            resolve(card);
            this.upload(img)
              .then(() => {
                Logger.log(
                  `Card named '${card.name}' created by user: ${card.creator}`,
                );
              })
              .catch((err) => {
                Logger.log(err);
              });
          });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  private async upload(img: Jimp) {
    const buffer = await img.quality(25).getBufferAsync(Jimp.MIME_JPEG);
    await this.imageUploadService.imageUploader(buffer);
  }
}
