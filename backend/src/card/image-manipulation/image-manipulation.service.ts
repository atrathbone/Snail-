import { Injectable } from '@nestjs/common';
import * as Jimp from 'jimp';
import { ICard } from '../card.model';

@Injectable()
export class ImageManipulationService {
  processUploadedImage(image: Jimp): Promise<Jimp> {
    return new Promise((resolve, reject) => {
      Jimp.read(image)
        .then((img) => {
          return img.cover(450, 450, Jimp.VERTICAL_ALIGN_MIDDLE).quality(50);
        })
        .then((image) => {
          resolve(image);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  createFile(image: Jimp) {
    return new Promise((resolve, reject) => {
      image
        .getBase64Async(Jimp.MIME_JPEG)
        .then((file) => {
          resolve(file);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  loadFromPath(path: string): Promise<Jimp> {
    return new Promise((resolve, reject) => {
      Jimp.read(path)
        .then((jimpImg) => {
          resolve(jimpImg);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  overlay(base: Jimp, overlay: Jimp, x?: number, y?: number): Promise<Jimp> {
    return new Promise((resolve, reject) => {
      let xPos = 0;
      let yPos = 0;
      if (x && y) {
        xPos = x;
        yPos = y;
      }
      Jimp.read(base)
        .then((base) => {
          Jimp.read(overlay)
            .then((top) => {
              return base.composite(top, xPos, yPos);
            })
            .then((img) => {
              resolve(img);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  addText(
    base: Jimp,
    fontPath: string,
    name: string,
    x: number,
    y: number,
  ): Promise<Jimp> {
    return new Promise((resolve, reject) => {
      Jimp.read(base)
        .then((baseImg) => {
          Jimp.loadFont(fontPath)
            .then((loadedFont) => {
              return baseImg.print(loadedFont, x, y, name);
            })
            .then((img) => {
              resolve(img);
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
