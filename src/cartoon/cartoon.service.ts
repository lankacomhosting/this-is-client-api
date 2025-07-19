import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { handleError } from 'src/utils/error-handle';

@Injectable()
export class CartoonService {
  // TODO: add readonly:REVIEW
  constructor(private readonly prisma: PrismaService) {}

  // TODO: add await:REVIEW
  async getAllCartoons(page: number = 1, limit: number = 10) {
    try {
      const offset = (page - 1) * limit;
  
      const cartoons = await this.prisma.cartoon.findMany({
        take: limit,
        skip: offset,
        orderBy: [{ updatedAt: 'desc' }],
      });
  
      const totalCount = await this.prisma.cartoon.count();
  
      const totalPages = Math.ceil(totalCount / limit);
  
      return {
        cartoons,
        totalPages,
        currentPage: page,
      };
    } catch (error) {
      handleError(error);
    }
  }
  

  async getTodaysCartoons() {
    try {
      const currentDate = new Date();
      const startOfDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
      );

      const todaysCartoons = await this.prisma.cartoon.findMany({
        orderBy: [{ updatedAt: 'desc' }],
        where: {
          updatedAt: {
            gte: startOfDay,
          },
        },
      });

      if (todaysCartoons.length > 0) {
        return todaysCartoons;
      }

      const latestCartoons = await this.prisma.cartoon.findMany({
        orderBy: [{ updatedAt: 'desc' }],
        take: 1,
      });

      return latestCartoons;
    } catch (error) {
      handleError(error);
    }
  }

  // TODO: add await:REVIEW
  async getCartoonById(cartoonId: string) {
    try {
      return await this.prisma.cartoon.findUnique({
        where: {
          id: cartoonId,
        },
      });
    } catch (error) {
      handleError(error);
    }
  }
}
