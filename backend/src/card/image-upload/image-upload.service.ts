import { Injectable, Logger } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ImageUploadService {
  constructor(private readonly cloudinaryService: CloudinaryService) {}
  public imageUploader(image: Buffer) {
    this.cloudinaryService.imageUploader(image).catch((err) => {
      Logger.log(err);
    });
  }
}
