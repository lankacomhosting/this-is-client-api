// health.controller.ts
import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  HealthCheck,
  HealthCheckResult,
  HealthCheckService,
  HealthIndicatorResult,
  PrismaHealthIndicator,
} from '@nestjs/terminus';
import { PrismaClient } from '@prisma/client';
import { LoggerService } from 'src/logger/logger.service';

const prisma = new PrismaClient();

@ApiTags('health')
@Controller({
  version: '1',
  path: 'auth/healthz',
})
export class HealthController {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly database: PrismaHealthIndicator,
    private readonly logger: LoggerService,
  ) {}

  @Get('')
  @HealthCheck()
  async checkReadiness(): Promise<HealthCheckResult> {
    this.logger.log('Health Check the Apis');
    return this.healthCheckService.check([
      async (): Promise<HealthIndicatorResult> =>
        this.database.pingCheck('', prisma),
    ]);
  }
}
