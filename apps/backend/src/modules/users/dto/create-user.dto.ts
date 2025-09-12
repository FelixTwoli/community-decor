import { User } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements Omit<User, 'id' | 'role'> {
  @ApiProperty({ description: 'The name of the user' })
  name: string;

  @ApiProperty({ description: 'The email of the user', uniqueItems: true })
  email: string;

  @ApiProperty({ description: 'The password of the user' })
  password: string;

  @ApiProperty({ description: 'The location of the user' })
  location: string;

  @ApiProperty({
    description: 'The interests of the user',
    isArray: true,
    type: String,
  })
  interests: string[];
}
