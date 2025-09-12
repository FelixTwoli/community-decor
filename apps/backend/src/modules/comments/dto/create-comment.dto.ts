import { Comment } from '../entities/comment.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto
  implements Omit<Comment, 'id' | 'createdAt' | 'userId'>
{
  @ApiProperty({ description: 'The ID of the post the comment belongs to' })
  postId: string;

  @ApiProperty({ description: 'The content of the comment' })
  content: string;
}
