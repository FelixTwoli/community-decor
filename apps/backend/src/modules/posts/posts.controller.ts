import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PostsService } from './posts.service';

 @Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts() {
    return this.postsService.findAll();
  }

  @Get(':id')
  getPost( @Param('id') id: string) {
    return this.postsService.findOne(id);
  }

  @Post()
  createPost( @Body() post: any) {
    return this.postsService.create(post);
  }

  @Put(':id')
  updatePost( @Param('id') id: string, @Body() data: any) {
    return this.postsService.update(id, data);
  }

  @Delete(':id')
  deletePost( @Param('id') id: string) {
    return this.postsService.delete(id);
  }
}