import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiHeader,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ApiKeyGuard } from 'src/apiKey.guard';
import { LoggerService } from 'src/logger/logger.service';
import { NewsArticleService } from './news-article.service';
import { CommentDto } from './types/video-article.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('News Article')
@ApiHeader({
  name: 'X-API-Key',
  description: 'API key needed to access the endpoints',
})
@UseGuards(ApiKeyGuard)
@Controller('news-article')
export class NewsArticleController {
  constructor(
    // TODO: add readonly:REVIEW
    private readonly newsArticleService: NewsArticleService,
    private readonly logger: LoggerService,
  ) {}

  @ApiOperation({ summary: 'View All News Articles' })
  @ApiQuery({
    name: 'pageId',
    type: String,
    description: 'pageId',
    required: false,
  })
  @Get()
  async getAllNewsArticles(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    this.logger.log('View All News Articles');

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;

    return this.newsArticleService.getAllNewsArticles(pageNumber, limitNumber);
  }

  @ApiOperation({ summary: 'View All News Articles' })
  @Get('home')
  async getHomeNewsArticles() {
    this.logger.log('View All News Articles');
    return this.newsArticleService.getHomeNewsArticles();
  }

  @ApiOperation({ summary: 'View All Top Picture News Articles' })
  @ApiQuery({
    name: 'page',
    type: String,
    description: 'page',
    required: false,
  })
  @Get('/topPicture')
  async getAllTopPictureNewsArticles(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '16',
  ) {
    this.logger.log('View All Top Picture News Articles');

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 16;

    return this.newsArticleService.getAllTopPictureNewsArticles(
      pageNumber,
      limitNumber,
    );
  }

  @ApiOperation({ summary: 'Get Related News Article by News Article Id' })
  @Get('/related-news-articles/:id')
  async getRelatedNewsArticles(@Param('id') articleId: string) {
    this.logger.log('Get Related News Article by News Article Id');
    return this.newsArticleService.getRelatedNewsArticles(articleId);
  }

  @ApiOperation({ summary: 'Get Most Viewed News Articles' })
  @Get('/mostViewed')
  async getMostViewedNewsArticles() {
    this.logger.log('Get Most Viewed News Articles');
    return this.newsArticleService.getMostViewedNewsArticles();
  }

  @ApiOperation({ summary: 'Get Pinned News Articles' })
  @Get('/pinned-news')
  async getPinnedNewsArticles() {
    this.logger.log('Get Pinned News Articles');
    return this.newsArticleService.getPinnedNewsArticles();
  }

  @ApiOperation({ summary: 'Get News Article by Id' })
  @Get(':id')
  async getNewsArticleById(@Param('id') articleId: string) {
    this.logger.log('Get News Article by Id');
    return this.newsArticleService.getNewsArticleById(articleId);
  }

  @ApiOperation({ summary: 'Get News Article Reporter by Id' })
  @Get('/reporter/:id')
  async getNewsArticleReporterById(@Param('id') reportorId: string) {
    this.logger.log('Get News Article Reporter by Id');
    return this.newsArticleService.getNewsArticleReportor(reportorId);
  }

  @ApiOperation({ summary: 'Get News Article Comment by News Article Id' })
  @ApiQuery({
    name: 'page',
    type: String,
    description: 'page',
    required: false,
  })
  @Get(':id/comments')
  async getNewsArticleComments(
    @Param('id') articleId: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    this.logger.log('Get News Article Comment by News Article Id');

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;

    return this.newsArticleService.getNewsArticleComments(
      articleId,
      pageNumber,
      limitNumber,
    );
  }

  @ApiOperation({
    summary: 'Get News Article Comment Replies by News Article Comment Id',
  })
  @ApiQuery({
    name: 'pageId',
    type: String,
    description: 'pageId',
    required: false,
  })
  @Get(':id/comments/:commentId/replies')
  async getNewsArticleCommentReplies(
    @Param('commentId') commentId: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    this.logger.log(
      'Get News Article Comment Replies by News Article Comment Id',
    );

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;

    return this.newsArticleService.getNewsArticleCommentReplies(
      commentId,
      pageNumber,
      limitNumber,
    );
  }

  @ApiOperation({ summary: 'Get News Articles by Category Name' })
  @ApiQuery({
    name: 'page',
    type: String,
    description: 'page',
    required: false,
  })
  @Get('category/:categoryName')
  async getNewsArticlesByCategoryName(
    @Param('categoryName') categoryName: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    this.logger.log('Get News Articles by Category Name');

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;

    return this.newsArticleService.getNewsArticlesByCategoryName(
      categoryName,
      pageNumber,
      limitNumber,
    );
  }

  @ApiOperation({ summary: 'Get Latest News Articles by Category Name' })
  @ApiQuery({
    name: 'pageId',
    type: String,
    description: 'pageId',
    required: false,
  })
  @Get('category/latest/:categoryName/:takeCount')
  async getLatestNewsArticlesByCategoryName(
    @Param('categoryName') categoryName: string,
    @Param('takeCount') takeCount: number,
    @Query('pageId') pageId: string,
  ) {
    this.logger.log('Get Latest News Articles by Category Name');
    return this.newsArticleService.getLatestNewsArticlesByCategoryName(
      categoryName,
      takeCount,
      pageId,
    );
  }

  @ApiOperation({ summary: 'Creates a new comment under News Article' })
  @ApiBody({
    type: CommentDto,
    description: 'Comment body',
  })
  @UseGuards(AuthGuard)
  @Post(':id/comment')
  async createNewsArticleComment(
    @Param('id') articleId: string,
    @Req() req,
    @Body() data,
  ) {
    this.logger.log('Creates a new comment under News Article');
    return this.newsArticleService.createNewsArticleComment(
      req.user,
      articleId,
      data,
    );
  }
  8;
  @ApiOperation({
    summary: "Deletes User's News Article Comment by taking commentId",
  })
  @UseGuards(AuthGuard)
  @Delete('/comment/:id')
  async deleteNewsArticleComment(@Param('id') articleId: string, @Req() req) {
    this.logger.log("Deletes User's News Article Comment by taking commentId");
    return this.newsArticleService.deleteNewsArticleComment(
      articleId,
      req.user,
    );
  }

  @ApiOperation({ summary: 'Get News Articles by Title' })
  @ApiQuery({
    name: 'pageId',
    type: String,
    description: 'pageId',
    required: false,
  })
  @Get('title/:title')
  async getNewsArticlesByTitle(
    @Param('title') title: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    this.logger.log('Get News Articles by Title');

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;

    return this.newsArticleService.getNewsArticlesByTitle(
      title,
      pageNumber,
      limitNumber,
    );
  }

  @ApiOperation({ summary: 'Update News Article ViewCount by Id' })
  @Put('viewCount/:id')
  async updateNewsArticleViewCount(@Param('id') articleId: string) {
    this.logger.log('update News Article ViewCount by Id');
    return this.newsArticleService.updateNewsArticleViewCount(articleId);
  }
}
