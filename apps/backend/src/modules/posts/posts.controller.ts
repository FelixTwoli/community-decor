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
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Post as PostEntity } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from '../users/entities/user.entity';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts(): PostEntity[] {
    return this.postsService.findAll();
  }

  @Get(':id')
  getPost(@Param('id') id: string): PostEntity | undefined {
    return this.postsService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  createPost(
    @Body() createPostDto: CreatePostDto,
    @Req() req: { user: User },
  ): PostEntity {
    return this.postsService.create(createPostDto, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Req() req: { user: User },
  ): PostEntity | null {
    return this.postsService.update(id, updatePostDto, req.user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deletePost(
    @Param('id') id: string,
    @Req() req: { user: User },
  ): { deleted: boolean } {
    return this.postsService.delete(id, req.user);
  }
}
