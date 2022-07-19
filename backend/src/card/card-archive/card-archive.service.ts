import { Injectable } from '@nestjs/common';
import Jimp from 'jimp/*';
import { CardService } from '../card.service';
import { ImageManipulationService } from '../image-manipulation/image-manipulation.service';

@Injectable()
export class CardArchiveService {
  constructor(
    private imageManipulator: ImageManipulationService,
    private cardService: CardService,
  ) {}

  private generatePageImage(cards: Jimp[]): Promise<Jimp> {
    return new Promise((resolve, reject) => {
      this.imageManipulator
        .loadFromPath('src/image-processing-assets/blank.jpg')
        .then((background) => {
          this.imageManipulator
            .overlay(background, cards[0], 15, 15)
            .then((withOne) => {
              this.imageManipulator
                .overlay(withOne, cards[1], 868, 15)
                .then((withTwo) => {
                  this.imageManipulator
                    .overlay(withTwo, cards[2], 1721, 15)
                    .then((withThree) => {
                      this.imageManipulator
                        .overlay(withThree, cards[3], 15, 1234)
                        .then((withFour) => {
                          this.imageManipulator
                            .overlay(withFour, cards[4], 868, 1234)
                            .then((withFive) => {
                              this.imageManipulator
                                .overlay(withFive, cards[5], 1721, 1234)
                                .then((withSix) => {
                                  this.imageManipulator
                                    .overlay(withSix, cards[6], 15, 2454)
                                    .then((withSeven) => {
                                      this.imageManipulator
                                        .overlay(withSeven, cards[7], 868, 2454)
                                        .then((withEight) => {
                                          this.imageManipulator
                                            .overlay(
                                              withEight,
                                              cards[8],
                                              1721,
                                              2454,
                                            )
                                            .then((page) => {
                                              resolve(page);
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public async generateFile(cardIds: string[]) {
      const images = await this.getCardImages(cardIds);
      const pageImg = await this.generatePageImage(images);
      return await this.imageManipulator.createFile(pageImg)
  }

  private async getCardImages(cardIds: string[]) {
    const paths = (await this.cardService.populateCards(cardIds)).map(
      (card) => {
        return card.imageUrl;
      },
    );
    const images: Jimp[] = [];
    for (let path of paths) {
      const img = await this.imageManipulator.loadFromPath(path);
      images.push(img);
    }
    if (images.length < 9) {
      let blanks = 9 - images.length;
      for (let i = 0; i < blanks; i++) {
        const blank = await this.imageManipulator.loadFromPath(
          'src/image-processing-assets/blank-card.png',
        );
        images.push(blank);
      }
    }
    return images;
  }
}
