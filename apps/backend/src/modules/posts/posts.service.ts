import { Injectable } from '@nestjs/common'; @Injectable()
export class PostsService {
  private posts = [
    { id: 'p1', userId: 'u1', category: 'events', title: 'Farmers Market', content: 'Saturday 10am', location: 'Nairobi', createdAt: new Date().toISOString() },
    { id: 'p2', userId: 'u2', category: 'services', title: 'Math Tutor Available', content: 'Offering tutoring for high school math.', location: 'Mombasa', createdAt: new Date().toISOString() },
  ];

  findAll() {
    return this.posts;
  }

  findOne(id: string) {
    return this.posts.find(p => p.id === id);
  }

  create(post: any) {
    const newPost = { id: `p${this.posts.length + 1}`, createdAt: new Date().toISOString(), ...post };
    this.posts.push(newPost);
    return newPost;
  }

  update(id: string, data: any) {
    const post = this.findOne(id);
    if (!post) return null;
    Object.assign(post, data);
    return post;
  }

  delete(id: string) {
    this.posts = this.posts.filter(p => p.id !== id);
    return { deleted: true };
  }
}