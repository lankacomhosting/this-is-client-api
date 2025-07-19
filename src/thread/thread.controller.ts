import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ThreadService } from './thread.service';
import { LoggerService } from 'src/logger/logger.service';

@ApiTags('Thread')
@ApiHeader({
  name: 'X-API-Key',
  description: 'API key needed to access the endpoints',
})
@Controller('thread')
export class ThreadController {
  constructor(
    // TODO: add readonly:REVIEW
    private readonly threadService: ThreadService,
    private readonly logger: LoggerService,
  ) {}

  @ApiOperation({ summary: 'Gets all Threads' })
  @ApiQuery({
    name: 'page',
    type: String,
    description: 'page',
    required: false,
  })
  @Get()
  async viewThreads(@Query('page') page: string = '1', @Query('limit') limit: string = '10') {
    this.logger.log('Gets all Threads');

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;

    return this.threadService.getThreads(pageNumber, limitNumber);
  }

  @ApiOperation({ summary: 'Gets a Thread by id' })
  @Get(':id')
  async viewThread(@Param('id') threadId: string) {
    this.logger.log('Gets a Thread by id');
    return this.threadService.getThreadById(threadId);
  }

  @ApiOperation({ summary: 'Gets a Thread Articles by Thread Id' })
  @ApiQuery({
    name: 'page',
    type: String,
    description: 'page',
    required: false,
  })
  @Get(':id/articles')
  async viewThreadArticles(
    @Param('id') threadId: string,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    this.logger.log('Gets a Thread Articles by Thread Id');

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;

    return this.threadService.getThreadArticles(threadId, pageNumber, limitNumber);
  }
}
