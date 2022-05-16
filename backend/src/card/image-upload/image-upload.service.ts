import { Injectable, Logger } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ImageUploadService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}
  async imageUploader(image: Buffer) {
    try {
      return await this.cloudinaryService.imageUploader(image);
    } catch (err) {
      Logger.log(err);
    }
  }
}
