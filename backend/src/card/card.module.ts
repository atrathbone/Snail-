import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CardSchema } from './card.model';
import { CardDataGenService } from './card-data-gen/card-data-gen.service';
import { CardImageGenService } from './card-image-gen/card-image-gen.service';
import { ImageManipulationService } from './image-manipulation/image-manipulation.service';
import { ImageUploadService } from './image-upload/image-upload.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { UsersModule } from 'src/users/users.module';
import { CardArchiveService } from './card-archive/card-archive.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Card', schema: CardSchema }]),
    CloudinaryModule,
    UsersModule,
  ],
  controllers: [CardController],
  providers: [
    CardService,
    CardDataGenService,
    CardImageGenService,
    ImageManipulationService,
    ImageUploadService,
    CardArchiveService,
  ],
})
export class CardModule {}
