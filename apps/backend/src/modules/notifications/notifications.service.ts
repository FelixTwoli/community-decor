import { Injectable } from '@nestjs/common';
import { Notification } from './entities/notification.entity';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  private notifications: Notification[] = [
    {
      id: 'n1',
      userId: 'u1',
      message: 'Your post has a new comment.',
      read: false,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'n2',
      userId: 'u2',
      message: 'You have a new follower.',
      read: true,
      createdAt: new Date().toISOString(),
    },
  ];

  findAll(): Notification[] {
    return this.notifications;
  }

  findOne(id: string): Notification | undefined {
    return this.notifications.find((n) => n.id === id);
  }

  create(createNotificationDto: CreateNotificationDto): Notification {
    const newNotification: Notification = {
      id: `n${this.notifications.length + 1}`,
      createdAt: new Date().toISOString(),
      ...createNotificationDto,
    };
    this.notifications.push(newNotification);
    return newNotification;
  }

  update(
    id: string,
    updateNotificationDto: UpdateNotificationDto,
  ): Notification | null {
    const notification = this.findOne(id);
    if (!notification) return null;
    Object.assign(notification, updateNotificationDto);
    return notification;
  }

  remove(id: string): { deleted: boolean } {
    this.notifications = this.notifications.filter((n) => n.id !== id);
    return { deleted: true };
  }
}
