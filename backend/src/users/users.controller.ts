import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Logger,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Response } from 'express';

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
}
