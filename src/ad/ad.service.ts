import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { handleError } from 'src/utils/error-handle';

@Injectable()
export class AdService {
  // TODO: add readonly:REVIEW
  constructor(private readonly prisma: PrismaService) {}

  // TODO: add await:REVIEW
  async getAdsBySectionAndLabel(sectionName: string, labelName: string) {
    try {
      return await this.prisma.ad.findMany({
        select: {
          id: true,
          redirectURL: true,
          mediaURL: true,
          title: true,
          label: {
            select: {
              id: true,
              name: true,
              section: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
        where: {
          label: {
            section: {
              name: sectionName,
            },
            name: labelName,
          },
          active: true,
        },
        orderBy: [{ updatedAt: 'desc' }],
      });
    } catch (error) {
      handleError(error);
    }
  }

  // add await:REVIEW
  async getAdById(adId: string) {
    try {
      return await this.prisma.ad.findUnique({
        where: {
          id: adId,
        },
      });
    } catch (error) {
      handleError(error);
    }
  }

  async addClickCount(adId: string) {
    try {
      const updatedAd = await this.prisma.ad.update({
        where: {
          id: adId,
          redirectURL: {
            not: null,
          },
        },
        data: {
          clickCount: {
            increment: 1,
          },
        },
      });
      return updatedAd;
    } catch (error) {
      handleError(error);
    }
  }
}
