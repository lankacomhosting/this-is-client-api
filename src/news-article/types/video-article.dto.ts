import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CommentDto {
  @ApiProperty()
  @IsNotEmpty()
  body: string;

  @ApiProperty()
  newsArticleCommentId: string;
}
