import {
  Controller,
  Post,
  Body,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public async createUser(@Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.usersService.createUser(createUserDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
