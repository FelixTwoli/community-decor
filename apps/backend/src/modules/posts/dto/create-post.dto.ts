import { Post } from '../entities/post.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto
  implements Omit<Post, 'id' | 'createdAt' | 'userId'>
{
  @ApiProperty({ description: 'The category of the post' })
  category: string;

  @ApiProperty({ description: 'The title of the post' })
  title: string;

  @ApiProperty({ description: 'The content of the post' })
  content: string;

  @ApiProperty({ description: 'The location relevant to the post' })
  location: string;
}
