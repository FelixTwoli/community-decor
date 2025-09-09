import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportsService {
  private reports = [
    { id: 'rp1', reporterId: 'u1', contentId: 'p2', reason: 'Spam', createdAt: new Date().toISOString() },
  ];

  findAll() {
    return this.reports;
  }
}