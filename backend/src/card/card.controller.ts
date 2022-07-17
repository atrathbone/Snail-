import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import * as Jimp from 'jimp';
import { Res } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { Response } from 'express';
import { CardDto } from './dto/card.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { UsersService } from 'src/users/users.service';

@Controller('card')
export class CardController {
  constructor(
    private readonly cardService: CardService,
    private readonly usersService: UsersService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('imgFile'))
  @Post()
  async createCard(
    @UploadedFile() imgFile: Express.Multer.File,
    @Body() createCardDto: CreateCardDto,
    @Res() res: Response,
  ) {
    const creator = await this.usersService.findByUserId(
      createCardDto.creatorId,
    );
    if (!creator) {
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'User not found' });
    }
    createCardDto.creator = creator.username;
    const img = await Jimp.read(imgFile.buffer);
    await this.cardService
      .create(img, createCardDto)
      .then((newCard) => {
        return res.status(HttpStatus.OK).json({
          message: 'successfully created card',
          data: CardDto.fromEntity(newCard),
        });
      })
      .catch((error) => {
        return res.status(HttpStatus.OK).json({
          message: error.message,
        });
      });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async listCards(@Res() res: Response) {
    await this.cardService
      .listCards()
      .then((cards) => {
        return res.status(HttpStatus.OK).json({
          data: cards.map((card) => {
            return CardDto.fromEntity(card);
          }),
        });
      })
      .catch((error) => {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: error.message });
      });
  }
}
