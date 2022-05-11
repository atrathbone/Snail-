import { Injectable } from '@nestjs/common';
import { UploadApiResponse } from 'cloudinary';
import { unlink } from 'fs/promises';
import { v2 } from 'cloudinary';
@Injectable()
export class CloudinaryService {
  public imageUploader(imagePath: string): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      v2.uploader
        .upload(imagePath, { resource_type: 'image' })
        .then((response: UploadApiResponse) => {
          unlink(imagePath);
          resolve(response);
        })
        .catch((err: Error) => {
          reject(err);
        });
    });
  }
}
