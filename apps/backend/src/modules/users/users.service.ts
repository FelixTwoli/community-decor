import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 'u1',
      name: 'Felix',
      email: 'felix@example.com',
      password: 'hashedpassword1',
      role: 'admin',
      location: 'Nairobi',
      interests: ['coding', 'cycling'],
    },
    {
      id: 'u2',
      name: 'Jane',
      email: 'jane@example.com',
      password: 'hashedpassword2',
      role: 'user',
      location: 'Mombasa',
      interests: ['events', 'music'],
    },
  ];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: string): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  findByEmail(email: string): User | undefined {
    return this.users.find((u) => u.email === email);
  }

  create(createUserDto: CreateUserDto): User {
    const newUser: User = {
      id: `u${this.users.length + 1}`,
      role: 'user',
      ...createUserDto,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: string, updateUserDto: UpdateUserDto): User | null {
    const user = this.findOne(id);
    if (!user) return null;
    Object.assign(user, updateUserDto);
    return user;
  }

  delete(id: string): { deleted: boolean } {
    this.users = this.users.filter((u) => u.id !== id);
    return { deleted: true };
  }
}
