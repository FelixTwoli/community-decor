import { Injectable } from '@nestjs/common'; @Injectable()
export class UsersService {
  private users = [
    { id: 'u1', name: 'Felix', email: 'felix @example.com', location: 'Nairobi', interests: ['coding', 'cycling'] },
    { id: 'u2', name: 'Jane', email: 'jane @example.com', location: 'Mombasa', interests: ['events', 'music'] },
  ];

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users.find(u => u.id === id);
  }

  create(user: any) {
    const newUser = { id: `u${this.users.length + 1}`, ...user };
    this.users.push(newUser);
    return newUser;
  }

  update(id: string, data: any) {
    const user = this.findOne(id);
    if (!user) return null;
    Object.assign(user, data);
    return user;
  }

  delete(id: string) {
    this.users = this.users.filter(u => u.id !== id);
    return { deleted: true };
  }
}