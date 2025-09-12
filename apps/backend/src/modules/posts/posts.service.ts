import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PostsService {
  private posts: Post[] = [
    {
      id: 'p1',
      userId: 'u1',
      category: 'events',
      title: 'Farmers Market',
      content: 'Saturday 10am',
      location: 'Nairobi',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'p2',
      userId: 'u2',
      category: 'services',
      title: 'Math Tutor Available',
      content: 'Offering tutoring for high school math.',
      location: 'Mombasa',
      createdAt: new Date().toISOString(),
    },
  ];

  findAll(): Post[] {
    return this.posts;
  }

  findOne(id: string): Post | undefined {
    return this.posts.find((p) => p.id === id);
  }

  create(createPostDto: CreatePostDto, user: User): Post {
    const newPost: Post = {
      id: `p${this.posts.length + 1}`,
      userId: user.id,
      createdAt: new Date().toISOString(),
      ...createPostDto,
    };
    this.posts.push(newPost);
    return newPost;
  }

  update(id: string, updatePostDto: UpdatePostDto, user: User): Post | null {
    const post = this.findOne(id);
    if (!post) return null;
    if (
      post.userId !== user.id &&
      user.role !== 'admin' &&
      user.role !== 'moderator'
    ) {
      throw new UnauthorizedException(
        'You are not authorized to update this post',
      );
    }
    Object.assign(post, updatePostDto);
    return post;
  }

  delete(id: string, user: User): { deleted: boolean } {
    const post = this.findOne(id);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    if (
      post.userId !== user.id &&
      user.role !== 'admin' &&
      user.role !== 'moderator'
    ) {
      throw new UnauthorizedException(
        'You are not authorized to delete this post',
      );
    }
    this.posts = this.posts.filter((p) => p.id !== id);
    return { deleted: true };
  }
}
