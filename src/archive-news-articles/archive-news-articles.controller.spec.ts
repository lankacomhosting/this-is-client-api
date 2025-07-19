import { Test, TestingModule } from '@nestjs/testing';
import { ArchiveNewsArticlesController } from './archive-news-articles.controller';

describe('ArchiveNewsArticlesController', () => {
  let controller: ArchiveNewsArticlesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArchiveNewsArticlesController],
    }).compile();

    controller = module.get<ArchiveNewsArticlesController>(
      ArchiveNewsArticlesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
