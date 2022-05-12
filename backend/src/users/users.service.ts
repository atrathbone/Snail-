import {
  BadRequestException,
  Injectable,
  Logger,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { IUser } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

  public async createUser(createUserDto: CreateUserDto) {
    if (createUserDto.password.length < 8) {
      throw new HttpException(
        'invalid password format',
        HttpStatus.BAD_REQUEST,
      );
    }
    const existingUser = await this.userModel.findOne({
      username: createUserDto.username,
    });
    if (existingUser) {
      throw new HttpException('username already taken', HttpStatus.BAD_REQUEST);
    }
    createUserDto.createdAt = new Date();
    createUserDto.updatedAt = new Date();
    createUserDto.password = await bcrypt.hash(createUserDto.password, 8);
    const newUser = await new this.userModel(createUserDto);
    return newUser
      .save()
      .then((user) => {
        user.password = undefined;
        Logger.log(`new User created with id: ${user.id}`);
        return user.id;
      })
      .catch((err) => {
        Logger.log(err);
        throw new HttpException(
          'error creating new user',
          HttpStatus.BAD_REQUEST,
        );
      });
  }
}
