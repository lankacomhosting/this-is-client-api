import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { TerminusModule } from '@nestjs/terminus';
import { PrismaService } from 'src/prisma.service';
import { LoggerService } from 'src/logger/logger.service';
@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [PrismaService, LoggerService],
})
export class HealthModule {}
