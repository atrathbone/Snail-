import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  UseGuards,
  Patch,
  Get,
  Param,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Response } from 'express';
import { AddCollectionDto } from './dto/add-collection.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getUser(@Param('id') userId: string, @Res() res: Response) {
    await this.usersService
      .findByUserId(userId)
      .then((user) => {
        return res 
          .status(HttpStatus.OK)
          .json({ message: 'user found', data: UserDto.fromEntity(user) });
      })
      .catch((error) => {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: error.message });
      });
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    await this.usersService
      .createUser(createUserDto)
      .then(() => {
        return res
          .status(HttpStatus.OK)
          .json({ message: 'new User successfully created' });
      })
      .catch((error) => {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: error.message });
      });
  }

  @Post('collection')
  @UseGuards(JwtAuthGuard)
  async addCollection(
    @Body() addCollectionDto: AddCollectionDto,
    @Res() res: Response,
  ) {
    this.usersService
      .addCollection(addCollectionDto)
      .then(() => {
        return res
          .status(HttpStatus.OK)
          .json({ message: 'added new collection' });
      })
      .catch((error) => {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: error.message });
      });
  }

  @Patch('collection')
  @UseGuards(JwtAuthGuard)
  async updateCollection(
    @Body() updateCollectionDto: UpdateCollectionDto,
    @Res() res: Response,
  ) {
    await this.usersService
      .updateCollection(updateCollectionDto)
      .then(() => {
        return res
          .status(HttpStatus.OK)
          .json({ message: 'updated collection' });
      })
      .catch((error) => {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({ message: error.message });
      });
  }
}
