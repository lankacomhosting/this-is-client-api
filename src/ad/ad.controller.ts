import { Controller, Get, Param } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AdService } from './ad.service';
import { LoggerService } from 'src/logger/logger.service';

@ApiTags('Ad')
@ApiHeader({
  name: 'X-API-Key',
  description: 'API key needed to access the endpoints',
})
@Controller('ad')
export class AdController {
  constructor(
    // TODO: add readonly:REVIEW
    private readonly adService: AdService,
    private readonly logger: LoggerService,
  ) {}

  @ApiOperation({ summary: 'Gets all Ads by section and label' })
  @Get('/section/:sectionId/label/:labelId')
  async viewAdsBySectionAndLabel(
    @Param('sectionId') sectionId: string,
    @Param('labelId') labelId: string,
  ) {
    this.logger.log('Gets all Ads by section and label');
    return this.adService.getAdsBySectionAndLabel(sectionId, labelId);
  }

  @ApiOperation({ summary: 'Gets a Ad by Id' })
  @Get(':id')
  async viewAdById(@Param('id') adId: string) {
    this.logger.log('Gets a Ad by Id');
    return this.adService.getAdById(adId);
  }

  @ApiOperation({ summary: 'Increments Click Count' })
  @Get(':id/click-count')
  async addClickCount(@Param('id') adId: string) {
    this.logger.log('Increments Click Count');
    return this.adService.addClickCount(adId);
  }
}
