import { Test, TestingModule } from '@nestjs/testing';
import { VideoArticleService } from './video-article.service';

describe('VideoArticleService', () => {
  let service: VideoArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideoArticleService],
    }).compile();

    service = module.get<VideoArticleService>(VideoArticleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
