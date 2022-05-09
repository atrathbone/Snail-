import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardModule } from './card/card.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/snail'), CardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
