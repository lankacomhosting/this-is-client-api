import { Module } from '@nestjs/common';
import { VideoArticleController } from './video-article.controller';
import { VideoArticleService } from './video-article.service';
import { PrismaService } from 'src/prisma.service';
import { PassportModule } from '@nestjs/passport';
import { LoggerService } from 'src/logger/logger.service';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
  ],
  controllers: [VideoArticleController],
  providers: [VideoArticleService, PrismaService, LoggerService],
})
export class VideoArticleModule {}
