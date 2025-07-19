import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { handleError } from 'src/utils/error-handle';

@Injectable()
export class ThreadService {
  // TODO: add readonly:REVIEW
  constructor(private readonly prisma: PrismaService) {}

  async getThreads(page: number = 1, limit: number = 10) {
    try {
      const skip = (page - 1) * limit;
  
      const threads = await this.prisma.thread.findMany({
        take: limit,
        skip: skip,
        where: {
          active: true,
        },
        orderBy: [{ updatedAt: 'desc' }],
        include: {
          articles: {
            take: 5,
            orderBy: [{ updatedAt: 'desc' }],
            select: {
              title: true,
              category: {
                select: {
                  categoryName: true,
                },
              },
            },
          },
        },
      });
  
      return threads.map((thread: any) => {
        if (thread.articles.length > 0) {
          const categoryMap = {};
          for (const article of thread.articles) {
            categoryMap[article.category.categoryName] =
              (categoryMap[article.category.categoryName] || 0) + 1;
          }
          thread.categoryCount = categoryMap;
          return thread;
        }
        return thread;
      });
    } catch (error) {
      handleError(error);
    }
  }
  

  async getThreadById(threadId: string) {
    try {
      const thread = (await this.prisma.thread.findUnique({
        where: {
          id: threadId,
        },
        include: {
          articles: {
            orderBy: [{ updatedAt: 'desc' }],
            select: {
              id: true,
              title: true,
              content: true,
              summary: true,
              publishedAt: true,
              createdAt: true,
              mediaURL: true,
              category: {
                select: {
                  categoryName: true,
                },
              },
            },
          },
        },
      })) as any;

      const categoryMap = {};
      for (const article of thread.articles) {
        categoryMap[article.category.categoryName] =
          categoryMap[article.category.categoryName] + 1 || 1;
      }
      thread.categoryCount = categoryMap;

      return thread;
    } catch (error) {
      handleError(error);
    }
  }

  async getThreadArticles(
    threadId: string,
    page: number = 1,
    limit: number = 5,
  ) {
    try {
      const skip = (page - 1) * limit;
  
      // Fetch articles directly, using pagination
      return await this.prisma.newsArticle.findMany({
        where: {
          threadId: threadId,
          status: 'Publish',
        },
        take: limit,
        skip: skip,
        orderBy: [{ updatedAt: 'desc' }],
        select: {
          id: true,
          title: true,
          createdAt: true,
          category: {
            select: {
              categoryName: true,
            },
          },
        },
      });
    } catch (error) {
      handleError(error);
    }
  }
  
}
