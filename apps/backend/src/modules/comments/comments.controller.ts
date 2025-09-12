import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from '../users/entities/user.entity';

@ApiTags('comments')
@ApiBearerAuth()
@Controller('posts/:postId/comments')
@UseGuards(JwtAuthGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  getComments(@Param('postId') postId: string): Comment[] {
    return this.commentsService.findAll(postId);
  }

  @Post()
  createComment(
    @Body() createCommentDto: CreateCommentDto,
    @Req() req: { user: User },
  ): Comment {
    return this.commentsService.create(createCommentDto, req.user);
  }

  @Put(':id')
  updateComment(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
    @Req() req: { user: User },
  ): Comment | null {
    return this.commentsService.update(id, updateCommentDto, req.user);
  }

  @Delete(':id')
  deleteComment(
    @Param('id') id: string,
    @Req() req: { user: User },
  ): { deleted: boolean } {
    return this.commentsService.delete(id, req.user);
  }
}
