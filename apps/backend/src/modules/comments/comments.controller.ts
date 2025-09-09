import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('posts/:postId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get()
  getComments(@Param('postId') postId: string) {
    return this.commentsService.findAll(postId);
  }

  @Post()
  createComment(@Body() comment: any) {
    return this.commentsService.create(comment);
  }

  @Put(':id')
  updateComment(@Param('id') id: string, @Body() data: any) {
    return this.commentsService.update(id, data);
  }

  @Delete(':id')
  deleteComment(@Param('id') id: string) {
    return this.commentsService.delete(id);
  }
}