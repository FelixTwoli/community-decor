import { Notification } from '../entities/notification.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificationDto
  implements Omit<Notification, 'id' | 'createdAt'>
{
  @ApiProperty({ description: 'The ID of the user the notification is for' })
  userId: string;

  @ApiProperty({ description: 'The message content of the notification' })
  message: string;

  @ApiProperty({
    description: 'Whether the notification has been read',
    default: false,
  })
  read: boolean;
}
