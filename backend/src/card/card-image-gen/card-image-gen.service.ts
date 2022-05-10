import { Injectable } from '@nestjs/common';
import Jimp from 'jimp/*';
import { CardDataDto } from '../dto/card-data.dto';
import { ICard } from '../card.model';
import { ImageManipulationService } from '../image-manipulation/image-manipulation.service';

type LoadedImages = {
  cardType: Jimp;
  suitType: Jimp;
  valueType: Jimp;
  modifierType: Jimp;
};

@Injectable()
export class CardImageGenService {
  private cardPaths = {
    BW: 'src/image-processing-assets/CardTypes/BW.png',
    CRYSTAL: 'src/image-processing-assets/CardTypes/CRYSTAL.png',
    CURSED: 'src/image-processing-assets/CardTypes/CURSED.png',
    MOON: 'src/image-processing-assets/CardTypes/MOON.png',
    SUN: 'src/image-processing-assets/CardTypes/SUN.png',
  };

  private suitPaths = {
    EVIL: 'src/image-processing-assets/Suits/EVIL.png',
    HAPPY: 'src/image-processing-assets/Suits/HAPPY.png',
    HAT: 'src/image-processing-assets/Suits/HAT.png',
    HPAIR: 'src/image-processing-assets/Suits/HPAIR.png',
    SAD: 'src/image-processing-assets/Suits/SAD.png',
    SPAIR: 'src/image-processing-assets/Suits/SPAIR.png',
  };

  private valuePaths = {
    1: 'src/image-processing-assets/Values/I.png',
    2: 'src/image-processing-assets/Values/II.png',
    3: 'src/image-processing-assets/Values/III.png',
    4: 'src/image-processing-assets/Values/IV.png',
    5: 'src/image-processing-assets/Values/V.png',
    6: 'src/image-processing-assets/Values/VI.png',
    7: 'src/image-processing-assets/Values/VII.png',
    8: 'src/image-processing-assets/Values/VIII.png',
    9: 'src/image-processing-assets/Values/IX.png',
    10: 'src/image-processing-assets/Values/X.png',
  };

  private modifierPaths = {
    MOON: 'src/image-processing-assets/Modifiers/MOONMOD.png',
    SUN: 'src/image-processing-assets/Modifiers/SUNMOD.png',
    NONE: 'src/image-processing-assets/Modifiers/NONE.png',
  };

  private fontPaths = {
    name: 'src/image-processing-assets/fonts/large/alagard.ttf.fnt',
    creator: 'src/image-processing-assets/fonts/small/alagard.ttf.fnt',
  };

  constructor(
    cardData: CardDataDto,
    cardImage: Jimp,
    private imageManipulator: ImageManipulationService,
  ) {}

  public generateCardImage(
    cardImage: Jimp,
    cardData: CardDataDto,
  ): Promise<Jimp> {
    return new Promise((resolve, reject) => {
      this.loadFromPaths(cardData).then((loadedImages) => {
        this.imageManipulator
          .overlay(loadedImages.cardType, loadedImages.suitType)
          .then((cardPlusSuit) => {
            this.imageManipulator
              .overlay(cardPlusSuit, loadedImages.modifierType)
              .then((cardPlusSuitPlusMod) => {
                this.imageManipulator
                  .overlay(cardPlusSuitPlusMod, loadedImages.valueType)
                  .then((cardPLusSuitPlusModPlusVal) => {
                    this.imageManipulator
                      .processUploadedImage(cardImage)
                      .then((processedImg) => {
                        this.imageManipulator
                          .overlay(
                            cardPLusSuitPlusModPlusVal,
                            processedImg,
                            147,
                            215,
                          )
                          .then((cardPlusSuitPlusModPlusValPlusMain) => {
                            this.imageManipulator
                              .addText(
                                cardPlusSuitPlusModPlusValPlusMain,
                                this.fontPaths.name,
                                cardData.name,
                                150,
                                915,
                              )
                              .then(
                                (
                                  cardPlusSuitPlusModPlusValPlusMainPlusNametxt,
                                ) => {
                                  this.imageManipulator
                                    .addText(
                                      cardPlusSuitPlusModPlusValPlusMainPlusNametxt,
                                      this.fontPaths.creator,
                                      cardData.creator,
                                      470,
                                      1005,
                                    )
                                    .then((compositeCard) => {
                                      resolve(compositeCard);
                                    });
                                },
                              );
                          });
                      });
                  });
              });
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
  }

  private loadFromPaths(cardData: CardDataDto): Promise<LoadedImages> {
    return new Promise((resolve, reject) => {
      this.imageManipulator
        .loadFromPath(this.cardPaths[cardData.type])
        .then((cardImg) => {
          this.imageManipulator
            .loadFromPath(this.suitPaths[cardData.suit])
            .then((suitImg) => {
              this.imageManipulator
                .loadFromPath(this.valuePaths[cardData.value])
                .then((valueImg) => {
                  this.imageManipulator
                    .loadFromPath(this.modifierPaths[cardData.modifier])
                    .then((modifierImg) => {
                      resolve({
                        cardType: cardImg,
                        suitType: suitImg,
                        valueType: valueImg,
                        modifierType: modifierImg,
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
}
