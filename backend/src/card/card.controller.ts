import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import * as Jimp from 'jimp';
import { Logger, BadRequestException, Res } from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Response } from 'express';
import { CardDto } from './dto/card.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { UsersService } from 'src/users/users.service';

@Controller('card')
export class CardController {
  private testImagePath =
    '/home/atrathbone/dev/snail/backend/src/image-processing-assets/Testimg.jpg';

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
    try {
      const creator = await this.usersService.findByUserId(
        createCardDto.creatorId,
      );
      createCardDto.creator = creator.username;
      const img = await Jimp.read(imgFile.buffer);
      const newCard = await this.cardService.create(img, createCardDto);
      return res.status(HttpStatus.OK).json({
        message: 'successfully created card',
        data: CardDto.fromEntity(newCard),
      });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
