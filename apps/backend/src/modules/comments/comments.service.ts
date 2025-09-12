import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CommentsService {
  private comments: Comment[] = [
    {
      id: 'cm1',
      postId: 'p1',
      userId: 'u2',
      content: 'I am interested!',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'cm2',
      postId: 'p2',
      userId: 'u1',
      content: 'What are your rates?',
      createdAt: new Date().toISOString(),
    },
  ];

  findAll(postId: string): Comment[] {
    return this.comments.filter((c) => c.postId === postId);
  }

  findOne(id: string): Comment | undefined {
    return this.comments.find((c) => c.id === id);
  }

  create(createCommentDto: CreateCommentDto, user: User): Comment {
    const newComment: Comment = {
      id: `cm${this.comments.length + 1}`,
      userId: user.id,
      createdAt: new Date().toISOString(),
      ...createCommentDto,
    };
    this.comments.push(newComment);
    return newComment;
  }

  update(
    id: string,
    updateCommentDto: UpdateCommentDto,
    user: User,
  ): Comment | null {
    const comment = this.findOne(id);
    if (!comment) return null;
    if (
      comment.userId !== user.id &&
      user.role !== 'admin' &&
      user.role !== 'moderator'
    ) {
      throw new UnauthorizedException(
        'You are not authorized to update this comment',
      );
    }
    Object.assign(comment, updateCommentDto);
    return comment;
  }

  delete(id: string, user: User): { deleted: boolean } {
    const comment = this.findOne(id);
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    if (
      comment.userId !== user.id &&
      user.role !== 'admin' &&
      user.role !== 'moderator'
    ) {
      throw new UnauthorizedException(
        'You are not authorized to delete this comment',
      );
    }
    this.comments = this.comments.filter((c) => c.id !== id);
    return { deleted: true };
  }
}
