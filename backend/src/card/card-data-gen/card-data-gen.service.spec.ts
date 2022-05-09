import { Test, TestingModule } from '@nestjs/testing';
import { CardDataGenService } from './card-data-gen.service';

describe('CardDataGenService', () => {
  let service: CardDataGenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardDataGenService],
    }).compile();

    service = module.get<CardDataGenService>(CardDataGenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
