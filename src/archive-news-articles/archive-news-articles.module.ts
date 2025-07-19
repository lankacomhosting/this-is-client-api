import { Module } from '@nestjs/common';
import { ArchiveNewsArticlesController } from './archive-news-articles.controller';
import { ArchiveNewsArticlesService } from './archive-news-articles.service';
import { PrismaService } from 'src/prisma.service';
import { LoggerService } from 'src/logger/logger.service';

@Module({
  controllers: [ArchiveNewsArticlesController],
  providers: [ArchiveNewsArticlesService, PrismaService, LoggerService],
})
export class ArchiveNewsArticlesModule {}
