import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
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
import { CommentDto } from './types/video-article.dto';
import { VideoArticleService } from './video-article.service';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('Video Article')
@ApiHeader({
  name: 'X-API-Key',
  description: 'API key needed to access the endpoints',
})
@UseGuards(ApiKeyGuard)
@Controller('video-article')
export class VideoArticleController {
  constructor(
    // TODO: add readonly:REVIEW
    private readonly videoArticleService: VideoArticleService,
    private readonly logger: LoggerService,
  ) {}

  @ApiOperation({ summary: 'View All Video Articles' })
  @ApiQuery({
    name: 'page',
    type: String,
    description: 'page',
    required: false,
  })
  @Get()
  async getAllVideoArticles(  @Query('page') page: string = '1',
  @Query('limit') limit: string = '10',) {
    this.logger.log('View All Video Articles');

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;

    return this.videoArticleService.getAllVideoArticles(pageNumber, limitNumber);
  }

  @ApiOperation({ summary: 'Get a Video Article by id' })
  @Get(':id')
  // TODO: fix typo convention:REVIEW
  async getVideoArticleById(@Param('id') id: string) {
    this.logger.log('Get a Video Article by id');
    return this.videoArticleService.getVideoArticleById(id);
  }

  @ApiOperation({ summary: 'Get a Video Article Comments by Video Article Id' })
  @ApiQuery({
    name: 'pageId',
    type: String,
    description: 'pageId',
    required: false,
  })
  @Get(':id/comments')
  async getVideoArticleComments(
    @Param('id') id: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    this.logger.log('Get a Video Article Comments by Video Article Id');

    const pageNumber = parseInt(page) || 1;
    const limitNumber = parseInt(limit) || 10;

    return this.videoArticleService.getVideoArticleComments(id, pageNumber, limitNumber);
  }

  //get all video articles by shortVideo boolean value
  @ApiOperation({
    summary: 'Get All Video Articles by shortVideo boolean value',
  })
  @Get('/shortVideo/:shortVideo')
  async getVideoArticleByShortVideo(@Param('shortVideo') shortVideo: boolean) {
    this.logger.log('Get All Video Articles by shortVideo boolean value');
    return this.videoArticleService.getVideoArticlesByShortVideo(shortVideo);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Creates a new comment under Video Article' })
  @ApiBody({
    type: CommentDto,
    description: 'Comment body',
  })
  @Post(':id/comment')
  async createNewsArticleComment(
    @Param('id') articleId: string,
    @Req() req,
    @Body() data,
  ) {
    this.logger.log('Creates a new comment under Video Article');
    return this.videoArticleService.createVideoArticleComment(
      req.user,
      articleId,
      data.body,
    );
  }

  @ApiOperation({
    summary: "Deletes User's Video Article Comment by taking commentId",
  })
  @UseGuards(AuthGuard)
  @Delete('/comment/:id')
  async deleteVideoArticleComment(@Param('id') articleId: string, @Req() req) {
    this.logger.log("Deletes User's Video Article Comment by taking commentId");
    return this.videoArticleService.deleteVideoArticleComment(
      articleId,
      req.user,
    );
  }
}
