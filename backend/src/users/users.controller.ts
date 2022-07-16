import {
  Controller,
  Post,
  Body,
  Res,
  HttpStatus,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Response } from 'express';
import { AddCollectionDto } from './dto/add-collection.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { rejects } from 'assert';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    const newUser = await this.usersService
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
    const updateResponse = this.usersService
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
    const updateResponse = await this.usersService
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
