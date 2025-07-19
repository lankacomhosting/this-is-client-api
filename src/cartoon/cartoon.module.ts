import { Module } from '@nestjs/common';
import { CartoonService } from './cartoon.service';
import { PrismaService } from 'src/prisma.service';
import { CartoonController } from './cartoon.controller';
import { LoggerService } from 'src/logger/logger.service';

@Module({
  providers: [CartoonService, PrismaService, LoggerService],
  controllers: [CartoonController],
})
export class CartoonModule {}
