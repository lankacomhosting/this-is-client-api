import { Test, TestingModule } from '@nestjs/testing';
import { NewsArticleController } from './news-article.controller';

describe('NewsArticleController', () => {
  let controller: NewsArticleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsArticleController],
    }).compile();

    controller = module.get<NewsArticleController>(NewsArticleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
