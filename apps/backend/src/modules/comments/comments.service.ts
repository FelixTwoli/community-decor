import { Injectable } from '@nestjs/common';

@Injectable()
export class CommentsService {
  private comments = [
    { id: 'cm1', postId: 'p1', userId: 'u2', content: 'I am interested!', createdAt: new Date().toISOString() },
    { id: 'cm2', postId: 'p2', userId: 'u1', content: 'What are your rates?', createdAt: new Date().toISOString() },
  ];

  findAll(postId: string) {
    return this.comments.filter(c => c.postId === postId);
  }

  findOne(id: string) {
    return this.comments.find(c => c.id === id);
  }

  create(comment: any) {
    const newComment = { id: `cm${this.comments.length + 1}`, createdAt: new Date().toISOString(), ...comment };
    this.comments.push(newComment);
    return newComment;
  }

  update(id: string, data: any) {
    const comment = this.findOne(id);
    if (!comment) return null;
    Object.assign(comment, data);
    return comment;
  }

  delete(id: string) {
    this.comments = this.comments.filter(c => c.id !== id);
    return { deleted: true };
  }
}