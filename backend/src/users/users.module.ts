import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CollectionSchema, UserSchema } from './user.model';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Collection', schema: CollectionSchema },
    ]),
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Collection', schema: CollectionSchema },
    ]),
    UsersService,
  ],
})
export class UsersModule {}
