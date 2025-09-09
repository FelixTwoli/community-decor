import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsService {
  private payments = [
    { id: 'pay1', userId: 'u1', amount: 50, currency: 'KES', status: 'completed', createdAt: new Date().toISOString() },
  ];

  findAll() {
    return this.payments;
  }
}