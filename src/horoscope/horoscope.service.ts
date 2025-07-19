import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { handleError } from 'src/utils/error-handle';

@Injectable()
export class HoroscopeService {
  // TODO: add readonly:REVIEW
  constructor(private readonly prisma: PrismaService) {}

  // TODO: add await:REVIEW
  async getTodaysHoroscope() {
    try {
      const currentDate = new Date();
      const startOfDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate(),
      );
      const endOfDay = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 1,
      );

      return await this.prisma.horoscope.findMany({
        orderBy: [{ updatedAt: 'desc' }],
        where: {
          createdAt: {
            gte: startOfDay,
            lt: endOfDay,
          },
        },
      });
    } catch (error) {
      handleError(error);
    }
  }

  // TODO: add await:REVIEW
  async getAllHoroscopes() {
    try {
      return await this.prisma.horoscope.findMany();
    } catch (error) {
      handleError(error);
    }
  }

  // TODO: add await:REVIEW
  async getHoroscopeById(horoscopeId: string) {
    try {
      return await this.prisma.horoscope.findUnique({
        where: {
          id: horoscopeId,
        },
      });
    } catch (error) {
      handleError(error);
    }
  }
}
