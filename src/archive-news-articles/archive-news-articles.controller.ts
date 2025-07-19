import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiKeyGuard } from 'src/apiKey.guard';
import { LoggerService } from 'src/logger/logger.service';
import { ArchiveNewsArticlesService } from './archive-news-articles.service';

@ApiTags('Archive News Articles')
@ApiHeader({
  name: 'X-API-Key',
  description: 'API key needed to access the endpoints',
})
@UseGuards(ApiKeyGuard)
@Controller('archive-news-articles')
export class ArchiveNewsArticlesController {
  constructor(
    // TODO: add readonly:REVIEW
    private readonly archiveNewsArticleService: ArchiveNewsArticlesService,
    private readonly logger: LoggerService,
  ) {}

  @ApiOperation({ summary: 'View All News Articles' })
  @ApiQuery({
    name: 'title',
    type: String,
    description: 'title',
    required: false,
  })
  @Get('')
  async getArchiveNewsArticles(
    @Query('startDate') startDate: Date,
    @Query('endDate') endDate: Date,
    @Query('title') title: string,
  ) {
    this.logger.log('View All News Articles');
    return this.archiveNewsArticleService.getArchiveNewsArticles(
      startDate,
      endDate,
      title,
    );
  }
}
