import { Injectable } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  private notifications = [
    { id: 'n1', userId: 'u1', message: 'Your post has a new comment.', read: false, createdAt: new Date().toISOString() },
    { id: 'n2', userId: 'u2', message: 'You have a new follower.', read: true, createdAt: new Date().toISOString() },
  ];

  findAll() {
    return this.notifications;
  }
}