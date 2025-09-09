import { Injectable } from '@nestjs/common';

@Injectable()
export class ReviewsService {
  private reviews = [
    { id: 'r1', userId: 'u1', reviewerId: 'u2', rating: 5, comment: 'Great to work with!', createdAt: new Date().toISOString() },
    { id: 'r2', userId: 'u2', reviewerId: 'u1', rating: 4, comment: 'Very responsive.', createdAt: new Date().toISOString() },
  ];

  findAll() {
    return this.reviews;
  }
}