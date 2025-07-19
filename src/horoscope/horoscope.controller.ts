import { Controller, Get, Param } from '@nestjs/common';
import { ApiHeader, ApiOperation } from '@nestjs/swagger';
import { HoroscopeService } from './horoscope.service';
import { LoggerService } from 'src/logger/logger.service';

@ApiHeader({
  name: 'X-API-Key',
  description: 'API key needed to access the endpoints',
})
@Controller('horoscope')
export class HoroscopeController {
  constructor(
    // TODO: add readonly:REVIEW
    private readonly horoscopeService: HoroscopeService,
    private readonly logger: LoggerService,
  ) {}

  @ApiOperation({ summary: "Gets all of today's  Horoscope" })
  @Get('/today')
  async viewTodaysCartoons() {
    this.logger.log("Gets all of today's  Horoscope");
    return this.horoscopeService.getTodaysHoroscope();
  }

  @ApiOperation({ summary: 'Gets all Horoscope' })
  @Get()
  async viewAllHoroscopes() {
    this.logger.log('Gets all Horoscope');
    return this.horoscopeService.getAllHoroscopes();
  }

  @ApiOperation({ summary: 'Get Horoscope by Id' })
  @Get(':id')
  async getHoroscopeById(@Param('id') horoscopeId: string) {
    this.logger.log('Get Horoscope by Id');
    return this.horoscopeService.getHoroscopeById(horoscopeId);
  }
}
