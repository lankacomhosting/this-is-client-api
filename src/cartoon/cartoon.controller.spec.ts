import { Test, TestingModule } from '@nestjs/testing';
import { CartoonController } from './cartoon.controller';

describe('CartoonController', () => {
  let controller: CartoonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartoonController],
    }).compile();

    controller = module.get<CartoonController>(CartoonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
