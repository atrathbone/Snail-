import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import * as Jimp from 'jimp';
import { Logger } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller('card')
export class CardController {
  private testImagePath =
    '/home/atrathbone/dev/snail/backend/src/image-processing-assets/Testimg.jpg';
  private temp =
    '/home/atrathbone/dev/snail/backend/src/image-processing-assets/temp.jpg';
  constructor(private readonly cardService: CardService) {}

  @Get()
  async test() {
    const img = await Jimp.read(this.testImagePath);
    const testCard = await this.cardService.create(img, {
      name: 'test-card',
      creator: 'testId',
    });
    testCard.write(this.temp);
  }
}
