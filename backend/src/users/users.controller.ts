import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Logger,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Response } from 'express';
import { AddCollectionDto } from './dto/add-collection.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const newUser = await this.usersService.createUser(createUserDto);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'new User successfully created' });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Post('collection')
  @UseGuards(JwtAuthGuard)
  async addCollection(
    @Body() addCollectionDto: AddCollectionDto,
    @Res() res: Response,
  ) {
    try {
      const updateResponse = this.usersService.addCollection(addCollectionDto);
      return res
        .status(HttpStatus.OK)
        .json({ message: 'added new collection' });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
