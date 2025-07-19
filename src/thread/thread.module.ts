import { Module } from '@nestjs/common';
import { ThreadService } from './thread.service';
import { ThreadController } from './thread.controller';
import { PrismaService } from 'src/prisma.service';
import { LoggerService } from 'src/logger/logger.service';

@Module({
  providers: [ThreadService, PrismaService, LoggerService],
  controllers: [ThreadController],
})
export class ThreadModule {}
