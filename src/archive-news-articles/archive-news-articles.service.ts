import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { handleError } from 'src/utils/error-handle';

@Injectable()
export class ArchiveNewsArticlesService {
  // TODO: add readonly:REVIEW
  constructor(private readonly prisma: PrismaService) {}

  async getArchiveNewsArticles(startDate: Date, endDate: Date, title: string) {
    try {
      const oneDay = 24 * 60 * 60 * 1000;
      const startDateObject = new Date(startDate);
      const endDateObject = new Date(endDate);
      const startDateTimestamp = startDateObject.getTime();
      const endDateTimestamp = endDateObject.getTime();

      const diffInDays = Math.round(
        Math.abs((startDateTimestamp - endDateTimestamp) / oneDay),
      );

      // TODO: Requirement Optimization:REVIEW
      // Query results from NewsArticles table to get archive from current news articles
      // First query from NewsArticles as it has the latests articles, and then get the results from ArchiveNewsArticles
      if (diffInDays <= 7) {
        // Query latest News Articles
        const latestNewsArticles = await this.prisma.newsArticle.findMany({
          where: {
            publishedAt: {
              gte: startDateObject,
              lte: endDateObject,
            },
            title: {
              contains: title,
            },
          },
          orderBy: {
            publishedAt: 'desc', // Latest first
          },
        });

        // Query Archive News Articles
        const archiveNewsArticles =
          await this.prisma.archiveNewsArticle.findMany({
            where: {
              updatedAt: {
                gte: startDateObject,
                lte: endDateObject,
              },
              title: {
                contains: title,
              },
            },
            orderBy: {
              updatedAt: 'desc',
            },
          });

        const combinedResults = [
          ...latestNewsArticles,
          ...archiveNewsArticles,
        ].sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        );

        return combinedResults;
      } else {
        throw new BadRequestException(
          'Start Date and End Date are more than 7 days apart',
        );
      }
    } catch (error) {
      handleError(error);
    }
  }
}
