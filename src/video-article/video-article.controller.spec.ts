import { Test, TestingModule } from '@nestjs/testing';
import { VideoArticleController } from './video-article.controller';

describe('VideoArticleController', () => {
  let controller: VideoArticleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoArticleController],
    }).compile();

    controller = module.get<VideoArticleController>(VideoArticleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
