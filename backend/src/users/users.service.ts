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
import { ICollection, IUser } from './user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { AddCollectionDto } from './dto/add-collection.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<IUser>,
    @InjectModel('Collection')
    private readonly collectionModel: Model<ICollection>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    if (createUserDto.password.length < 8) {
      throw new HttpException(
        'invalid password format',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (createUserDto.username.length > 10) {
      throw new HttpException('username too long', HttpStatus.BAD_REQUEST);
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

  async addCollection(addCollectionDto: AddCollectionDto) {
    if (addCollectionDto.cards.length > 45) {
      throw new HttpException(
        'Collection exceeds maximum (45 cards)',
        HttpStatus.BAD_REQUEST,
      );
    }
    const newCollection = await new this.collectionModel({
      name: addCollectionDto.name,
      cards: addCollectionDto.cards,
    });
    const updatedUser = await this.userModel.findByIdAndUpdate(
      { _id: addCollectionDto.userId },
      { $push: { collections: newCollection } },
      { new: true },
    );
    return updatedUser.save().catch((err) => {
      Logger.log(err);
      throw new HttpException(
        'Error adding collection',
        HttpStatus.BAD_REQUEST,
      );
    });
  }

  async findByUsername(username: string) {
    return await this.userModel.findOne({ username: username });
  }

  async findByUserId(userId: string) {
    return await this.userModel.findById(userId);
  }

  async validatePassword(password: string, dBPassword: string) {
    return bcrypt.compare(password, dBPassword);
  }
}
