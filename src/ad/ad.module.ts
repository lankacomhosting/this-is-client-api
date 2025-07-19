import { Module } from '@nestjs/common';
import { AdService } from './ad.service';
import { AdController } from './ad.controller';
import { PrismaService } from 'src/prisma.service';
import { LoggerService } from 'src/logger/logger.service';

@Module({
  providers: [AdService, PrismaService, LoggerService],
  controllers: [AdController],
})
export class AdModule {}
