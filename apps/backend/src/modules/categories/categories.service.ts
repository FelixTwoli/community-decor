import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  private categories = [
    { id: 'c1', name: 'events' },
    { id: 'c2', name: 'services' },
    { id: 'c3', name: 'for-sale' },
    { id: 'c4', name: 'jobs' },
    { id: 'c5', name: 'housing' },
  ];

  findAll() {
    return this.categories;
  }
}