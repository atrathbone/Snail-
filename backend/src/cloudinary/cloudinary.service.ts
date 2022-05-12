import { Injectable } from '@nestjs/common';
import { UploadApiResponse } from 'cloudinary';
import { v2 } from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  imageUploader(image: Buffer): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const cloudinaryStream = v2.uploader.upload_stream(
        { folder: 'snail' },
        (error, result) => {
          resolve(result);
          if (error) {
            reject(error);
          }
        },
      );

      streamifier.createReadStream(image).pipe(cloudinaryStream);
    });
  }
}
