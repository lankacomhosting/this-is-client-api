import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiHeader, ApiQuery } from '@nestjs/swagger';
import { CartoonService } from './cartoon.service';
import { LoggerService } from 'src/logger/logger.service';

@ApiTags('Cartoon')
@ApiHeader({
  name: 'X-API-Key',
  description: 'API key needed to access the endpoints',
})
@Controller('cartoon')
export class CartoonController {
  constructor(
    // TODO: add readonly:REVIEW
    private readonly cartoonService: CartoonService,
    private readonly logger: LoggerService,
  ) {}

  @ApiOperation({ summary: 'Gets all  Cartoon' })
  @ApiQuery({
    name: 'page',
    type: String,
    description: 'page',
    required: false,
  })
  @Get('/')
  async viewAllCartoon(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    this.logger.log('Gets all  Cartoon');

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;

    return this.cartoonService.getAllCartoons(pageNumber, limitNumber);
  }

  @ApiOperation({ summary: "Gets all of today's  Cartoon" })
  @Get('/todays')
  async viewTodaysCartoons() {
    this.logger.log("Gets all of today's  Cartoon");
    return this.cartoonService.getTodaysCartoons();
  }

  @ApiOperation({ summary: 'Gets a  Cartoon by Id' })
  @Get(':id')
  async viewCartoonById(@Param('id') CartoonId: string) {
    this.logger.log('Gets a  Cartoon by Id');
    return this.cartoonService.getCartoonById(CartoonId);
  }
}
