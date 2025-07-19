import { Test, TestingModule } from '@nestjs/testing';
import { NewsArticleService } from './news-article.service';

describe('NewsArticleService', () => {
  let service: NewsArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NewsArticleService],
    }).compile();

    service = module.get<NewsArticleService>(NewsArticleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
