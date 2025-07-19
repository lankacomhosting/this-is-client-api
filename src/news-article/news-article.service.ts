import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { NewsArticleStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { handleError, handleErrorHTTP } from 'src/utils/error-handle';

@Injectable()
export class NewsArticleService {
  // TODO: add readonly:REVIEW
  constructor(private readonly prisma: PrismaService) {}

  // TODO: add await:REVIEW
  async getAllNewsArticles(page: number = 1, limit: number = 10) {
    const offset = (page - 1) * limit;

    const articles = await this.prisma.newsArticle.findMany({
      take: limit,
      skip: offset,
      orderBy: [{ createdAt: 'desc' }],
      where: {
        status: NewsArticleStatus.Publish,
        topPicture: false,
      },
      select: {
        id: true,
        title: true,
        mediaURL: true,
        updateNews: true,
        publishedAt: true,
        createdAt: true,
        hotNews: true,
        breakingNews: true,
        videoNews: true,
        photoNews: true,
        leadNews: true,
        category: {
          select: {
            categoryName: true,
          },
        },
        thread: {
          select: {
            id: true,
            headerTitle: true,
          },
        },
        pinNewsArticle: {
          select: {
            id: true,
          },
        },
      },
    });

    const totalCount = await this.prisma.newsArticle.count({
      where: {
        status: NewsArticleStatus.Publish,
        topPicture: false,
      },
    });

    const totalPages = Math.ceil(totalCount / limit);

    return {
      articles,
      totalPages,
      currentPage: page,
    };
  }

  // TODO: add await:REVIEW
  async getHomeNewsArticles() {
    try {
      return await this.prisma.newsArticle.findMany({
        take: 12,
        orderBy: [{ createdAt: 'desc' }],
        where: {
          status: NewsArticleStatus.Publish,
          leadNews: true,
        },
        select: {
          id: true,
          title: true,
          mediaURL: true,
          updateNews: true,
          publishedAt: true,
          createdAt: true,
          hotNews: true,
          breakingNews: true,
          videoNews: true,
          photoNews: true,
          leadNews: true,
          category: {
            select: {
              categoryName: true,
            },
          },
          thread: {
            select: {
              id: true,
              headerTitle: true,
            },
          },
          pinNewsArticle: {
            select: {
              id: true,
            },
          },
        },
      });
    } catch (error) {
      handleError(error);
    }
  }

  // TODO: add await:REVIEW
  async getAllTopPictureNewsArticles(page: number = 1, limit: number = 16) {
    const skip = (page - 1) * limit;

    return this.prisma.newsArticle.findMany({
      where: {
        topPicture: true,
        status: NewsArticleStatus.Publish,
      },
      take: limit,
      skip: skip,
      orderBy: [{ createdAt: 'desc' }],
      include: {
        category: {
          select: {
            id: true,
            categoryName: true,
          },
        },
        thread: {
          select: {
            id: true,
            headerTitle: true,
            innerTitle: true,
          },
        },
      },
    });
  }

  // TODO: add await:REVIEW
  async getNewsArticleById(newsArticleId: string) {
    return await this.prisma.newsArticle.findFirst({
      take: 10,
      where: {
        AND: [{ id: newsArticleId }, { status: NewsArticleStatus.Publish }],
      },
      orderBy: [{ createdAt: 'desc' }],
      include: {
        category: true,
        _count: {
          select: {
            comments: true,
          },
        },
      },
    });
  }

  // TODO: add await:REVIEW
  // TODO: fix typo:REVIEW
  async getNewsArticleReportor(reportorId: string) {
    return await this.prisma.editors.findFirst({
      where: {
        id: reportorId,
      },
    });
  }

  // TODO: add await:REVIEW
  async getNewsArticlesByCategoryName(
    categoryName: string,
    page: number = 1,
    limit: number = 10,
  ) {
    const offset = (page - 1) * limit;

    const articles = await this.prisma.newsArticle.findMany({
      take: limit,
      skip: offset,
      orderBy: [{ createdAt: 'desc' }],
      where: {
        status: NewsArticleStatus.Publish,
        category: {
          categoryName: categoryName,
        },
        topPicture: false,
      },
      select: {
        id: true,
        title: true,
        mediaURL: true,
        updateNews: true,
        publishedAt: true,
        createdAt: true,
        hotNews: true,
        breakingNews: true,
        videoNews: true,
        photoNews: true,
        leadNews: true,
        category: {
          select: {
            categoryName: true,
          },
        },
        thread: {
          select: {
            id: true,
            headerTitle: true,
          },
        },
        pinNewsArticle: {
          select: {
            id: true,
          },
        },
      },
    });

    const totalCount = await this.prisma.newsArticle.count({
      where: {
        status: NewsArticleStatus.Publish,
        category: {
          categoryName: categoryName,
        },
        topPicture: false,
      },
    });

    const totalPages = Math.ceil(totalCount / limit);

    return {
      articles,
      totalPages,
      currentPage: page,
    };
  }

  // TODO: add await:REVIEW
  async getLatestNewsArticlesByCategoryName(
    categoryName: string,
    takeCount: number,
    cursor?: string,
  ) {
    if (cursor) {
      return await this.prisma.newsArticle.findMany({
        take: takeCount, // Use the takeCount parameter
        skip: 1,
        cursor: {
          id: cursor,
        },
        orderBy: [{ createdAt: 'desc' }],
        where: {
          status: NewsArticleStatus.Publish,
          category: {
            categoryName: categoryName,
          },
          topPicture: false,
        },
        select: {
          id: true,
          title: true,
          mediaURL: true,
          updateNews: true,
          publishedAt: true,
          createdAt: true,
          hotNews: true,
          breakingNews: true,
          videoNews: true,
          photoNews: true,
          leadNews: true,
          category: {
            select: {
              categoryName: true,
            },
          },
          thread: {
            select: {
              id: true,
              headerTitle: true,
            },
          },
          pinNewsArticle: {
            select: {
              id: true,
            },
          },
        },
      });
    }

    return await this.prisma.newsArticle.findMany({
      take: takeCount, // Use the takeCount parameter
      orderBy: [{ createdAt: 'desc' }],
      where: {
        status: NewsArticleStatus.Publish,
        category: {
          categoryName: categoryName,
        },
        topPicture: false,
      },
      include: {
        category: true,
        thread: true,
      },
    });
  }

  // TODO: add await:REVIEW
  async getNewsArticleComments(
    newNewsArticleId: string,
    page: number = 1,
    limit: number = 10,
  ) {
    const skip = (page - 1) * limit;

    return this.prisma.newsArticleComment.findMany({
      take: limit,
      skip: skip,
      orderBy: [{ createdAt: 'desc' }],
      where: {
        newsArticleId: newNewsArticleId,
        newsArticleComment: null, // Return only top level comments
        approved: true,
      },
    });
  }

  async getRelatedNewsArticles(newsArticleId: string) {
    const newsArticle = await this.prisma.newsArticle.findUnique({
      where: { id: newsArticleId },
    });

    if (
      newsArticle?.relatedNewsArticleIds &&
      typeof newsArticle?.relatedNewsArticleIds === 'object' &&
      Array.isArray(newsArticle?.relatedNewsArticleIds)
    ) {
      const relatedNewsArticleIds =
        newsArticle?.relatedNewsArticleIds as string[];

      // TODO: add await:REVIEW
      return await this.prisma.newsArticle.findMany({
        where: {
          AND: {
            id: {
              in: relatedNewsArticleIds,
            },
            status: NewsArticleStatus.Publish,
          },
        },
      });
    }
  }

  // TODO: add await:REVIEW
  async getNewsArticleCommentReplies(
    commentId: string,
    page: number = 1,
    limit: number = 10,
  ) {
    const skip = (page - 1) * limit;

    return this.prisma.newsArticleComment.findMany({
      take: limit,
      skip: skip,
      orderBy: [{ createdAt: 'desc' }],
      where: {
        newsArticleCommentId: commentId,
        approved: true,
      },
    });
  }

  // TODO: add await:REVIEW
  async createNewsArticleComment(
    user,
    articleId: string,
    data: { body: string; newsArticleCommentId?: string },
  ) {
    try {
      const comment = await this.prisma.newsArticleComment.create({
        data: {
          newsArticle: {
            connect: {
              id: articleId,
            },
          },
          userDisplayName: user.displayName,
          userId: user.id,
          newsArticleComment: data.newsArticleCommentId
            ? {
                connect: {
                  id: data.newsArticleCommentId,
                },
              }
            : undefined,
          body: data.body,
        },
      });

      return comment;
    } catch (error) {
      handleErrorHTTP(error);
    }
  }

  async updateNewsArticleViewCount(articleId: string) {
    try {
      const viewCount = await this.prisma.newsArticle.findUnique({
        where: {
          id: articleId,
        },
        select: {
          viewCount: true,
        },
      });

      if (!viewCount) {
        throw new BadRequestException('Article is not found');
      }

      // TODO: add await:REVIEW
      return await this.prisma.newsArticle.update({
        where: {
          id: articleId,
        },
        data: {
          viewCount: viewCount.viewCount + 1,
        },
      });
    } catch (error) {
      handleErrorHTTP(error);
    }
  }

  // TODO: add await:REVIEW
  async getMostViewedNewsArticles() {
    try {
      return await this.prisma.newsArticle.findMany({
        take: 10,
        orderBy: [
          {
            viewCount: 'desc',
          },
        ],
        where: {
          status: NewsArticleStatus.Publish,
          topPicture: false,
        },
        select: {
          id: true,
          title: true,
          createdAt: true,
          mediaURL: true,
          publishedAt: true,
          viewCount: true,
        },
      });
    } catch (error) {
      handleErrorHTTP(error);
    }
  }

  async deleteNewsArticleComment(commentId: string, user: any) {
    const comment = await this.prisma.newsArticleComment.findUnique({
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

    return await this.prisma.newsArticleComment.delete({
      where: { id: commentId },
    });
  }

  // TODO: add await:REVIEW
  async getNewsArticlesByTitle(
    title: string,
    page: number = 1,
    limit: number = 30,
  ) {
    const skip = (page - 1) * limit;

    return this.prisma.newsArticle.findMany({
      take: limit,
      skip: skip,
      orderBy: [{ updatedAt: 'desc' }],
      where: {
        status: NewsArticleStatus.Publish,
        title: {
          contains: title,
          mode: 'insensitive',
        },
        topPicture: false,
      },
      include: {
        category: true,
        thread: true,
      },
    });
  }

  async getPinnedNewsArticles() {
    try {
      return await this.prisma.pinNewsArticle.findMany({
        orderBy: { order: 'asc' },
        include: {
          newsArticle: {
            include: {
              category: true,
              editors: true,
              thread: true,
            },
          },
        },
      });
    } catch (error) {
      handleError(error);
    }
  }
}
