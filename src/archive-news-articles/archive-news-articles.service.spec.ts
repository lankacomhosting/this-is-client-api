import { Test, TestingModule } from '@nestjs/testing';
import { ArchiveNewsArticlesService } from './archive-news-articles.service';

describe('ArchiveNewsArticlesService', () => {
  let service: ArchiveNewsArticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArchiveNewsArticlesService],
    }).compile();

    service = module.get<ArchiveNewsArticlesService>(
      ArchiveNewsArticlesService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
