import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/user.model';

@Module({
  imports: [UsersModule],
  providers: [AuthService, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
