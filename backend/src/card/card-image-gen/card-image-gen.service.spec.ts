import { Test, TestingModule } from '@nestjs/testing';
import { CardImageGenService } from './card-image-gen.service';

describe('CardImageGenService', () => {
  let service: CardImageGenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardImageGenService],
    }).compile();

    service = module.get<CardImageGenService>(CardImageGenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
