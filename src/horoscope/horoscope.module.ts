import { Module } from '@nestjs/common';
import { HoroscopeService } from './horoscope.service';
import { HoroscopeController } from './horoscope.controller';
import { PrismaService } from 'src/prisma.service';
import { LoggerService } from 'src/logger/logger.service';

@Module({
  providers: [HoroscopeService, PrismaService, LoggerService],
  controllers: [HoroscopeController],
})
export class HoroscopeModule {}
