import { BadRequestException } from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { HttpException, HttpStatus } from '@nestjs/common';

export function handleError(error: unknown): never {
  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === 'P2025') {
      const errorCause = error?.meta?.cause as string;
      throw new BadRequestException(
        errorCause === 'Record to update not found.'
          ? errorCause
          : `Invalid ${errorCause.match(/No '(.*?)'/)?.[1]} Id`,
      );
    }
    throw new BadRequestException(error.message);
  }
  if (error instanceof PrismaClientValidationError) {
    throw new BadRequestException(error.message);
  }
  throw new BadRequestException('Unknown Error');
}

export function handleErrorHTTP(error: any): never {
  if (error instanceof PrismaClientKnownRequestError) {
    throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  }
  if (error instanceof PrismaClientValidationError) {
    throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
  }
  console.error(error);
  throw new HttpException('Unknown Error', HttpStatus.BAD_REQUEST);
}
