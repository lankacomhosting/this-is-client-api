import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { handleError, handleErrorHTTP } from 'src/utils/error-handle';

@Injectable()
export class VideoArticleService {
  // TODO: add readonly:REVIEW
  constructor(private readonly prisma: PrismaService) { }

  // TODO: add await:REVIEW
  async getAllVideoArticles(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;
  
    const videoArticles = await this.prisma.videoArticle.findMany({
      take: limit,
      skip: offset,
      orderBy: [{ updatedAt: 'desc' }],
      include: {
        category: {
          select: {
            id: true,
            categoryName: true,
          },
        },
      },
    });
  
    const totalCount = await this.prisma.videoArticle.count();
  
    const totalPages = Math.ceil(totalCount / limit);
  
    return {
      videoArticles,
      totalPages,
      currentPage: page,
    };
  }
  
  // TODO: add await:REVIEW
  async getVideoArticleById(videoArticleId) {
    try {
      return await this.prisma.videoArticle.findUnique({
        where: { id: videoArticleId },
        include: {
          category: true,
          comments: {
            take: 10,
            orderBy: [{ createdAt: 'desc' }],
          },
        },
      });
    } catch (error) {
      handleError(error);
    }
  }

  //get video articles by shortVideo boolean value
  // TODO: add await:REVIEW
  async getVideoArticlesByShortVideo(
    shortVideo: boolean,
    page: number = 1,
    limit: number = 10,
  ) {
    const skip = (page - 1) * limit;
  
    return this.prisma.videoArticle.findMany({
      take: limit,
      skip: skip,
      orderBy: [{ updatedAt: 'desc' }],
      where: {
        shortVideo: shortVideo,
      },
      include: {
        category: {
          select: {
            id: true,
            categoryName: true,
          },
        },
      },
    });
  }

  // TODO: add await:REVIEW
  async getVideoArticleComments(
    videoArticleId: string,
    page: number = 1,
    pageSize: number = 10,
  ) {
    const skip = (page - 1) * pageSize;
  
    return this.prisma.videoArticleComment.findMany({
      take: pageSize,
      skip: skip,
      orderBy: [{ createdAt: 'desc' }],
      where: {
        videoArticleId: videoArticleId,
      },
    });
  }
  

  // TODO: add await:REVIEW
  async createVideoArticleComment(user, articleId, body) {
    try {
      return await this.prisma.videoArticleComment.create({
        data: {
          videoArticle: {
            connect: {
              id: articleId,
            },
          },
          userId: user.id,
          userDisplayName: user.displayName,
          body: body,
        },
      });
    } catch (error) {
      handleErrorHTTP(error);
    }
  }

  async deleteVideoArticleComment(commentId: string, user: any) {
    const comment = await this.prisma.videoArticleComment.findUnique({
      where: { id: commentId },
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.userId !== user.id) {
      throw new ForbiddenException(
        'You are not authorized to delete this comment',
      );
    }

    return await this.prisma.videoArticleComment.delete({
      where: { id: commentId },
    });
  }
}
